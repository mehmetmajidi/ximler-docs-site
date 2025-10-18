# Ximler Backend Implementation Guide

## Technology Stack

### Core Technologies

-    **Node.js** with **Apollo Server** (GraphQL)
-    **TypeScript** for type safety
-    **MongoDB** with **Mongoose** ODM for primary database
-    **Redis** for caching and session management
-    **JWT** for authentication
-    **Stripe** for payment processing
-    **SendGrid** or **AWS SES** for email services

### Recommended Packages

```json
{
     "dependencies": {
          "@apollo/server": "^4.9.0",
          "@apollo/client": "^3.8.0",
          "graphql": "^16.8.0",
          "mongoose": "^8.0.0",
          "@types/node": "^20.0.0",
          "@types/jsonwebtoken": "^9.0.0",
          "@types/bcryptjs": "^2.4.0",
          "@types/stripe": "^8.0.0",
          "express": "^4.18.0",
          "helmet": "^7.0.0",
          "cors": "^2.8.5",
          "bcryptjs": "^2.4.3",
          "jsonwebtoken": "^9.0.0",
          "redis": "^4.6.0",
          "stripe": "^13.0.0",
          "@sendgrid/mail": "^7.7.0",
          "nodemailer": "^6.9.0",
          "uuid": "^9.0.0",
          "moment": "^2.29.0",
          "winston": "^3.10.0"
     },
     "devDependencies": {
          "typescript": "^5.0.0",
          "ts-node": "^10.9.0",
          "nodemon": "^3.0.0",
          "jest": "^29.0.0",
          "@types/jest": "^29.0.0",
          "supertest": "^6.3.0"
     }
}
```

## Project Structure

```
src/
├── config/
│   ├── database.ts
│   ├── redis.ts
│   ├── stripe.ts
│   └── email.ts
├── controllers/
│   ├── auth.controller.ts
│   ├── user.controller.ts
│   ├── subscription.controller.ts
│   ├── billing.controller.ts
│   ├── usage.controller.ts
│   └── project.controller.ts
├── middleware/
│   ├── auth.middleware.ts
│   ├── rateLimit.middleware.ts
│   ├── validation.middleware.ts
│   └── error.middleware.ts
├── models/
│   ├── User.ts
│   ├── Subscription.ts
│   ├── Project.ts
│   ├── Payment.ts
│   └── Usage.ts
├── routes/
│   ├── auth.routes.ts
│   ├── user.routes.ts
│   ├── subscription.routes.ts
│   ├── billing.routes.ts
│   └── project.routes.ts
├── services/
│   ├── auth.service.ts
│   ├── subscription.service.ts
│   ├── billing.service.ts
│   ├── usage.service.ts
│   ├── email.service.ts
│   └── storage.service.ts
├── utils/
│   ├── jwt.ts
│   ├── encryption.ts
│   ├── validation.ts
│   └── logger.ts
├── types/
│   ├── auth.types.ts
│   ├── user.types.ts
│   └── subscription.types.ts
└── app.ts
```

## Core Implementation Examples

### 1. Authentication Service

```typescript
// src/services/auth.service.ts
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { EmailService } from "./email.service";

export class AuthService {
     private emailService: EmailService;

     constructor() {
          this.emailService = new EmailService();
     }

     async register(userData: { name: string; email: string; password: string }) {
          // Check if user already exists
          const existingUser = await User.findByEmail(userData.email);
          if (existingUser) {
               throw new Error("User already exists");
          }

          // Hash password
          const saltRounds = 12;
          const passwordHash = await bcrypt.hash(userData.password, saltRounds);

          // Create user
          const user = await User.create({
               ...userData,
               password: passwordHash,
               emailVerificationToken: this.generateToken(),
          });

          // Send verification email
          await this.emailService.sendVerificationEmail(user.email, user.emailVerificationToken);

          // Generate JWT token
          const token = this.generateJWT(user);

          return {
               user: this.sanitizeUser(user),
               token,
          };
     }

     async login(email: string, password: string, rememberMe: boolean = false) {
          // Find user
          const user = await User.findByEmail(email);
          if (!user) {
               throw new Error("Invalid credentials");
          }

          // Verify password
          const isValidPassword = await bcrypt.compare(password, user.password);
          if (!isValidPassword) {
               throw new Error("Invalid credentials");
          }

          // Check if email is verified
          if (!user.emailVerified) {
               throw new Error("Email not verified");
          }

          // Update last login
          await User.updateLastLogin(user.id);

          // Generate JWT token
          const token = this.generateJWT(user, rememberMe);

          return {
               user: this.sanitizeUser(user),
               token,
          };
     }

     async verifyEmail(token: string) {
          const user = await User.findByVerificationToken(token);
          if (!user) {
               throw new Error("Invalid verification token");
          }

          await User.verifyEmail(user.id);
          return { message: "Email verified successfully" };
     }

     async forgotPassword(email: string) {
          const user = await User.findByEmail(email);
          if (!user) {
               // Don't reveal if user exists
               return { message: "If the email exists, a reset link has been sent" };
          }

          const resetToken = this.generateToken();
          const resetExpires = new Date(Date.now() + 3600000); // 1 hour

          await User.setPasswordResetToken(user.id, resetToken, resetExpires);
          await this.emailService.sendPasswordResetEmail(user.email, resetToken);

          return { message: "If the email exists, a reset link has been sent" };
     }

     async resetPassword(token: string, newPassword: string) {
          const user = await User.findByPasswordResetToken(token);
          if (!user || user.passwordResetExpires < new Date()) {
               throw new Error("Invalid or expired reset token");
          }

          const saltRounds = 12;
          const passwordHash = await bcrypt.hash(newPassword, saltRounds);

          await User.updatePassword(user.id, passwordHash);
          await User.clearPasswordResetToken(user.id);

          return { message: "Password reset successfully" };
     }

     private generateJWT(user: any, rememberMe: boolean = false) {
          const payload = {
               userId: user.id,
               email: user.email,
               plan: user.subscription?.plan || "free",
          };

          const expiresIn = rememberMe ? "30d" : "7d";
          return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn });
     }

     private generateToken(): string {
          return require("crypto").randomBytes(32).toString("hex");
     }

     private sanitizeUser(user: any) {
          const { password, emailVerificationToken, passwordResetToken, ...sanitized } = user;
          return sanitized;
     }
}
```

### 2. Subscription Service

```typescript
// src/services/subscription.service.ts
import Stripe from "stripe";
import { Subscription } from "../models/Subscription";
import { User } from "../models/User";
import { UsageService } from "./usage.service";

export class SubscriptionService {
     private stripe: Stripe;
     private usageService: UsageService;

     constructor() {
          this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
          this.usageService = new UsageService();
     }

     async createSubscription(userId: string, planId: string, paymentMethodId: string, couponCode?: string) {
          const user = await User.findById(userId);
          if (!user) {
               throw new Error("User not found");
          }

          const plan = await this.getPlanById(planId);
          if (!plan) {
               throw new Error("Invalid plan");
          }

          // Check if user already has an active subscription
          const existingSubscription = await Subscription.findActiveByUserId(userId);
          if (existingSubscription) {
               throw new Error("User already has an active subscription");
          }

          // Create or get Stripe customer
          let customerId = user.stripeCustomerId;
          if (!customerId) {
               const customer = await this.stripe.customers.create({
                    email: user.email,
                    name: user.name,
               });
               customerId = customer.id;
               await User.updateStripeCustomerId(userId, customerId);
          }

          // Attach payment method
          await this.stripe.paymentMethods.attach(paymentMethodId, {
               customer: customerId,
          });

          // Set as default payment method
          await this.stripe.customers.update(customerId, {
               invoice_settings: {
                    default_payment_method: paymentMethodId,
               },
          });

          // Apply coupon if provided
          let couponId: string | undefined;
          if (couponCode) {
               const coupon = await this.validateCoupon(couponCode, planId);
               if (coupon) {
                    couponId = coupon.stripeCouponId;
               }
          }

          // Create Stripe subscription
          const stripeSubscription = await this.stripe.subscriptions.create({
               customer: customerId,
               items: [{ price: plan.stripePriceId }],
               default_payment_method: paymentMethodId,
               coupon: couponId,
               expand: ["latest_invoice.payment_intent"],
          });

          // Create local subscription record
          const subscription = await Subscription.create({
               userId,
               planId,
               status: "active",
               startDate: new Date(),
               endDate: new Date(stripeSubscription.current_period_end * 1000),
               autoRenew: true,
               price: plan.price,
               currency: plan.currency,
               stripeSubscriptionId: stripeSubscription.id,
               stripeCustomerId: customerId,
          });

          // Update user's plan limits
          await this.updateUserLimits(userId, plan.limits);

          return {
               subscription,
               invoice: stripeSubscription.latest_invoice,
          };
     }

     async cancelSubscription(userId: string, reason?: string) {
          const subscription = await Subscription.findActiveByUserId(userId);
          if (!subscription) {
               throw new Error("No active subscription found");
          }

          // Cancel Stripe subscription
          await this.stripe.subscriptions.update(subscription.stripeSubscriptionId, {
               cancel_at_period_end: true,
          });

          // Update local subscription
          await Subscription.update(subscription.id, {
               status: "cancelled",
               autoRenew: false,
          });

          // Log cancellation reason
          if (reason) {
               await this.logSubscriptionEvent(subscription.id, "cancelled", { reason });
          }

          return { message: "Subscription cancelled successfully" };
     }

     async updateSubscription(userId: string, newPlanId: string) {
          const subscription = await Subscription.findActiveByUserId(userId);
          if (!subscription) {
               throw new Error("No active subscription found");
          }

          const newPlan = await this.getPlanById(newPlanId);
          if (!newPlan) {
               throw new Error("Invalid plan");
          }

          // Update Stripe subscription
          await this.stripe.subscriptions.update(subscription.stripeSubscriptionId, {
               items: [
                    {
                         id: subscription.stripeSubscriptionId,
                         price: newPlan.stripePriceId,
                    },
               ],
               proration_behavior: "create_prorations",
          });

          // Update local subscription
          await Subscription.update(subscription.id, {
               planId: newPlanId,
               price: newPlan.price,
          });

          // Update user's plan limits
          await this.updateUserLimits(userId, newPlan.limits);

          return { message: "Subscription updated successfully" };
     }

     private async updateUserLimits(userId: string, limits: any) {
          // Update user's usage limits based on plan
          await User.updateLimits(userId, limits);
     }

     private async getPlanById(planId: string) {
          // Fetch plan from database
          return await Plan.findById(planId);
     }

     private async validateCoupon(couponCode: string, planId: string) {
          // Validate coupon code and check if applicable to plan
          return await Coupon.validate(couponCode, planId);
     }

     private async logSubscriptionEvent(subscriptionId: string, event: string, metadata: any) {
          // Log subscription events for analytics
          await AuditLog.create({
               subscriptionId,
               action: event,
               metadata,
          });
     }
}
```

### 3. Usage Service

```typescript
// src/services/usage.service.ts
import { Usage } from "../models/Usage";
import { User } from "../models/User";
import { Subscription } from "../models/Subscription";

export class UsageService {
     async checkUsageLimit(userId: string, resourceType: string, amount: number = 1) {
          const user = await User.findById(userId);
          if (!user) {
               throw new Error("User not found");
          }

          const subscription = await Subscription.findActiveByUserId(userId);
          const plan = subscription ? await Plan.findById(subscription.planId) : await Plan.findById("free");

          const currentUsage = await this.getCurrentUsage(userId, resourceType);
          const limit = plan.limits[resourceType];

          if (limit === -1) {
               // Unlimited
               return { allowed: true, current: currentUsage, limit: -1, remaining: -1 };
          }

          const remaining = limit - currentUsage;
          const allowed = remaining >= amount;

          return {
               allowed,
               current: currentUsage,
               limit,
               remaining: Math.max(0, remaining),
          };
     }

     async incrementUsage(userId: string, resourceType: string, amount: number, metadata?: any) {
          // Check if usage is allowed
          const limitCheck = await this.checkUsageLimit(userId, resourceType, amount);
          if (!limitCheck.allowed) {
               throw new Error(`Usage limit exceeded for ${resourceType}`);
          }

          // Record usage
          await Usage.create({
               userId,
               resourceType,
               amount,
               periodStart: this.getCurrentPeriodStart(),
               periodEnd: this.getCurrentPeriodEnd(),
               metadata,
          });

          return { message: "Usage recorded successfully" };
     }

     async getUsageStatistics(userId: string, period: string = "month") {
          const periodStart = this.getPeriodStart(period);
          const periodEnd = this.getPeriodEnd(period);

          const usage = await Usage.getByUserIdAndPeriod(userId, periodStart, periodEnd);
          const subscription = await Subscription.findActiveByUserId(userId);
          const plan = subscription ? await Plan.findById(subscription.planId) : await Plan.findById("free");

          const statistics = {
               current: {
                    projects: 0,
                    storage: 0,
                    apiCalls: 0,
               },
               limits: plan.limits,
               usage: {
                    projects: 0,
                    storage: 0,
                    apiCalls: 0,
               },
               period: {
                    start: periodStart,
                    end: periodEnd,
               },
          };

          // Calculate current usage
          usage.forEach((record) => {
               switch (record.resourceType) {
                    case "projects":
                         statistics.current.projects += record.amount;
                         break;
                    case "storage":
                         statistics.current.storage += record.amount;
                         break;
                    case "api_calls":
                         statistics.current.apiCalls += record.amount;
                         break;
               }
          });

          // Calculate usage percentages
          Object.keys(statistics.current).forEach((key) => {
               const current = statistics.current[key];
               const limit = statistics.limits[key];
               if (limit > 0) {
                    statistics.usage[key] = (current / limit) * 100;
               }
          });

          return statistics;
     }

     private getCurrentPeriodStart(): Date {
          const now = new Date();
          return new Date(now.getFullYear(), now.getMonth(), 1);
     }

     private getCurrentPeriodEnd(): Date {
          const now = new Date();
          return new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
     }

     private getPeriodStart(period: string): Date {
          const now = new Date();
          switch (period) {
               case "day":
                    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
               case "week":
                    const startOfWeek = new Date(now);
                    startOfWeek.setDate(now.getDate() - now.getDay());
                    return startOfWeek;
               case "month":
                    return new Date(now.getFullYear(), now.getMonth(), 1);
               case "year":
                    return new Date(now.getFullYear(), 0, 1);
               default:
                    return this.getCurrentPeriodStart();
          }
     }

     private getPeriodEnd(period: string): Date {
          const now = new Date();
          switch (period) {
               case "day":
                    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
               case "week":
                    const endOfWeek = new Date(now);
                    endOfWeek.setDate(now.getDate() - now.getDay() + 6);
                    return new Date(endOfWeek.getFullYear(), endOfWeek.getMonth(), endOfWeek.getDate(), 23, 59, 59, 999);
               case "month":
                    return new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
               case "year":
                    return new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);
               default:
                    return this.getCurrentPeriodEnd();
          }
     }
}
```

### 4. Rate Limiting Middleware

```typescript
// src/middleware/rateLimit.middleware.ts
import { Request, Response, NextFunction } from "express";
import Redis from "redis";

export class RateLimitMiddleware {
     private redis: Redis.RedisClient;

     constructor() {
          this.redis = Redis.createClient({
               url: process.env.REDIS_URL,
          });
     }

     createRateLimit(options: { windowMs: number; maxRequests: number; keyGenerator?: (req: Request) => string }) {
          return async (req: Request, res: Response, next: NextFunction) => {
               const key = options.keyGenerator ? options.keyGenerator(req) : this.defaultKeyGenerator(req);
               const window = Math.floor(Date.now() / options.windowMs);

               try {
                    const current = await this.redis.get(`${key}:${window}`);
                    const count = current ? parseInt(current) : 0;

                    if (count >= options.maxRequests) {
                         return res.status(429).json({
                              success: false,
                              error: {
                                   code: "RATE_LIMITED",
                                   message: "Too many requests",
                              },
                         });
                    }

                    await this.redis.setex(`${key}:${window}`, Math.ceil(options.windowMs / 1000), count + 1);

                    res.set({
                         "X-RateLimit-Limit": options.maxRequests.toString(),
                         "X-RateLimit-Remaining": (options.maxRequests - count - 1).toString(),
                         "X-RateLimit-Reset": ((window + 1) * options.windowMs).toString(),
                    });

                    next();
               } catch (error) {
                    console.error("Rate limiting error:", error);
                    next(); // Continue on error
               }
          };
     }

     private defaultKeyGenerator(req: Request): string {
          // Use user ID if authenticated, otherwise IP address
          const userId = (req as any).user?.id;
          return userId ? `user:${userId}` : `ip:${req.ip}`;
     }
}

// Usage in routes
const rateLimit = new RateLimitMiddleware();

// Free plan: 100 requests/hour
const freeRateLimit = rateLimit.createRateLimit({
     windowMs: 60 * 60 * 1000, // 1 hour
     maxRequests: 100,
});

// Pro plan: 1000 requests/hour
const proRateLimit = rateLimit.createRateLimit({
     windowMs: 60 * 60 * 1000, // 1 hour
     maxRequests: 1000,
});

// Enterprise plan: 10000 requests/hour
const enterpriseRateLimit = rateLimit.createRateLimit({
     windowMs: 60 * 60 * 1000, // 1 hour
     maxRequests: 10000,
});
```

### 5. Webhook Handler for Stripe

```typescript
// src/controllers/webhook.controller.ts
import { Request, Response } from "express";
import Stripe from "stripe";
import { Subscription } from "../models/Subscription";
import { Payment } from "../models/Payment";

export class WebhookController {
     private stripe: Stripe;

     constructor() {
          this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
     }

     async handleStripeWebhook(req: Request, res: Response) {
          const sig = req.headers["stripe-signature"] as string;
          const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

          let event: Stripe.Event;

          try {
               event = this.stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
          } catch (err) {
               console.error("Webhook signature verification failed:", err);
               return res.status(400).send("Webhook Error");
          }

          try {
               switch (event.type) {
                    case "customer.subscription.created":
                         await this.handleSubscriptionCreated(event.data.object as Stripe.Subscription);
                         break;

                    case "customer.subscription.updated":
                         await this.handleSubscriptionUpdated(event.data.object as Stripe.Subscription);
                         break;

                    case "customer.subscription.deleted":
                         await this.handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
                         break;

                    case "invoice.payment_succeeded":
                         await this.handlePaymentSucceeded(event.data.object as Stripe.Invoice);
                         break;

                    case "invoice.payment_failed":
                         await this.handlePaymentFailed(event.data.object as Stripe.Invoice);
                         break;

                    default:
                         console.log(`Unhandled event type: ${event.type}`);
               }

               res.json({ received: true });
          } catch (error) {
               console.error("Webhook handler error:", error);
               res.status(500).json({ error: "Webhook handler failed" });
          }
     }

     private async handleSubscriptionCreated(subscription: Stripe.Subscription) {
          // Update subscription status
          await Subscription.updateByStripeId(subscription.id, {
               status: "active",
               endDate: new Date(subscription.current_period_end * 1000),
          });
     }

     private async handleSubscriptionUpdated(subscription: Stripe.Subscription) {
          const status = subscription.status === "active" ? "active" : "cancelled";

          await Subscription.updateByStripeId(subscription.id, {
               status,
               endDate: new Date(subscription.current_period_end * 1000),
          });
     }

     private async handleSubscriptionDeleted(subscription: Stripe.Subscription) {
          await Subscription.updateByStripeId(subscription.id, {
               status: "cancelled",
               autoRenew: false,
          });
     }

     private async handlePaymentSucceeded(invoice: Stripe.Invoice) {
          if (invoice.subscription) {
               // Create payment record
               await Payment.create({
                    userId: invoice.customer as string,
                    subscriptionId: invoice.subscription as string,
                    amount: invoice.amount_paid / 100, // Convert from cents
                    currency: invoice.currency,
                    status: "paid",
                    description: `Subscription payment - ${invoice.lines.data[0]?.description}`,
                    stripePaymentIntentId: invoice.payment_intent as string,
                    stripeInvoiceId: invoice.id,
                    invoiceUrl: invoice.invoice_pdf,
                    paidAt: new Date(),
               });
          }
     }

     private async handlePaymentFailed(invoice: Stripe.Invoice) {
          if (invoice.subscription) {
               // Create failed payment record
               await Payment.create({
                    userId: invoice.customer as string,
                    subscriptionId: invoice.subscription as string,
                    amount: invoice.amount_due / 100,
                    currency: invoice.currency,
                    status: "failed",
                    description: `Failed subscription payment - ${invoice.lines.data[0]?.description}`,
                    stripeInvoiceId: invoice.id,
               });

               // Update subscription status
               await Subscription.updateByStripeId(invoice.subscription as string, {
                    status: "past_due",
               });
          }
     }
}
```

## Environment Variables

```env
# Database
DATABASE_URL=postgresql://username:password@localhost:5432/ximler
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_REFRESH_SECRET=your-super-secret-refresh-key

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Email
SENDGRID_API_KEY=SG...
FROM_EMAIL=noreply@ximler.com

# Storage
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_REGION=us-east-1
S3_BUCKET=ximler-storage

# App
NODE_ENV=production
PORT=3000
API_BASE_URL=https://api.ximler.com
FRONTEND_URL=https://ximler.com
```

## Deployment Considerations

### 1. Security

-    Use HTTPS everywhere
-    Implement CORS properly
-    Use Helmet.js for security headers
-    Validate all inputs with Joi
-    Implement proper error handling
-    Use environment variables for secrets

### 2. Performance

-    Implement Redis caching
-    Use database connection pooling
-    Implement proper indexing
-    Use CDN for static assets
-    Implement request compression

### 3. Monitoring

-    Use Winston for logging
-    Implement health checks
-    Monitor API response times
-    Set up error tracking (Sentry)
-    Monitor database performance

### 4. Scalability

-    Use horizontal scaling
-    Implement load balancing
-    Use microservices architecture
-    Implement proper caching strategies
-    Use message queues for async tasks
