# Ximler GraphQL API Documentation

## Technology Stack

### Core Technologies

-    **Node.js** with **Apollo Server**
-    **TypeScript** for type safety
-    **MongoDB** with **Mongoose** ODM
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
          "jsonwebtoken": "^9.0.0",
          "bcryptjs": "^2.4.3",
          "stripe": "^13.0.0",
          "redis": "^4.6.0",
          "@sendgrid/mail": "^7.7.0",
          "nodemailer": "^6.9.0",
          "uuid": "^9.0.0",
          "moment": "^2.29.0",
          "winston": "^3.10.0",
          "helmet": "^7.0.0",
          "cors": "^2.8.5",
          "express": "^4.18.0"
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

## GraphQL Schema

### 1. Type Definitions

```graphql
# schema.graphql
type User {
     id: ID!
     name: String!
     email: String!
     avatar: String
     emailVerified: Boolean!
     createdAt: DateTime!
     updatedAt: DateTime!
     lastLogin: DateTime
     subscription: Subscription
     usage: UsageStats
     projects: [Project!]!
     apiKeys: [ApiKey!]!
     notifications: [Notification!]!
}

type Subscription {
     id: ID!
     plan: Plan!
     status: SubscriptionStatus!
     startDate: DateTime!
     endDate: DateTime
     autoRenew: Boolean!
     price: Float!
     currency: String!
     stripeSubscriptionId: String
     stripeCustomerId: String
}

type Plan {
     id: ID!
     name: String!
     description: String
     price: Float!
     currency: String!
     interval: PlanInterval!
     features: [String!]!
     limits: PlanLimits!
     active: Boolean!
}

type PlanLimits {
     projects: Int!
     storage: Float! # in GB
     apiCalls: Int!
}

type UsageStats {
     current: UsageCurrent!
     limits: PlanLimits!
     usage: UsagePercentages!
     period: UsagePeriod!
}

type UsageCurrent {
     projects: Int!
     storage: Float!
     apiCalls: Int!
}

type UsagePercentages {
     projects: Float!
     storage: Float!
     apiCalls: Float!
}

type UsagePeriod {
     start: DateTime!
     end: DateTime!
}

type Project {
     id: ID!
     name: String!
     description: String
     settings: JSON
     canvasData: JSON
     storageSize: Float!
     createdAt: DateTime!
     updatedAt: DateTime!
     user: User!
}

type Payment {
     id: ID!
     amount: Float!
     currency: String!
     status: PaymentStatus!
     description: String
     stripePaymentIntentId: String
     stripeInvoiceId: String
     invoiceUrl: String
     paidAt: DateTime
     createdAt: DateTime!
     user: User!
     subscription: Subscription
}

type ApiKey {
     id: ID!
     name: String!
     keyHash: String!
     permissions: [String!]!
     lastUsed: DateTime
     expiresAt: DateTime
     createdAt: DateTime!
     revokedAt: DateTime
     user: User!
}

type Notification {
     id: ID!
     type: NotificationType!
     title: String!
     message: String!
     readAt: DateTime
     metadata: JSON
     createdAt: DateTime!
     user: User!
}

type Coupon {
     id: ID!
     code: String!
     name: String!
     description: String
     type: CouponType!
     value: Float!
     currency: String!
     maxUses: Int
     usedCount: Int!
     validFrom: DateTime!
     validUntil: DateTime!
     applicablePlans: [String!]!
     active: Boolean!
}

# Enums
enum SubscriptionStatus {
     ACTIVE
     CANCELLED
     EXPIRED
     PAST_DUE
}

enum PlanInterval {
     MONTH
     YEAR
}

enum PaymentStatus {
     PENDING
     PAID
     FAILED
     REFUNDED
}

enum NotificationType {
     BILLING
     SECURITY
     PRODUCT
     SYSTEM
}

enum CouponType {
     PERCENTAGE
     FIXED
}

# Scalars
scalar DateTime
scalar JSON

# Input Types
input RegisterInput {
     name: String!
     email: String!
     password: String!
     confirmPassword: String!
}

input LoginInput {
     email: String!
     password: String!
     rememberMe: Boolean
}

input UpdateUserInput {
     name: String
     email: String
}

input ChangePasswordInput {
     currentPassword: String!
     newPassword: String!
}

input CreateSubscriptionInput {
     planId: ID!
     paymentMethodId: String!
     couponCode: String
}

input UpdateSubscriptionInput {
     planId: ID!
}

input CancelSubscriptionInput {
     reason: String
     feedback: String
}

input CreateProjectInput {
     name: String!
     description: String
     settings: JSON
}

input UpdateProjectInput {
     name: String
     description: String
     settings: JSON
     canvasData: JSON
}

input CreateApiKeyInput {
     name: String!
     permissions: [String!]!
     expiresAt: DateTime
}

input UsageCheckInput {
     resourceType: String!
     amount: Int!
}

input IncrementUsageInput {
     resourceType: String!
     amount: Int!
     metadata: JSON
}

input NotificationSettingsInput {
     email: EmailNotificationSettings
     push: PushNotificationSettings
}

input EmailNotificationSettings {
     productUpdates: Boolean!
     billingAlerts: Boolean!
     securityAlerts: Boolean!
}

input PushNotificationSettings {
     enabled: Boolean!
     productUpdates: Boolean!
}

# Queries
type Query {
     # Auth
     me: User

     # Plans
     plans: [Plan!]!
     plan(id: ID!): Plan

     # Usage
     usageStats(period: String): UsageStats!
     checkUsageLimit(input: UsageCheckInput!): UsageLimitCheck!

     # Projects
     projects(page: Int, limit: Int): ProjectConnection!
     project(id: ID!): Project

     # Billing
     paymentHistory(page: Int, limit: Int): PaymentConnection!
     paymentMethods: [PaymentMethod!]!

     # API Keys
     apiKeys: [ApiKey!]!

     # Notifications
     notifications(unread: Boolean): [Notification!]!

     # Coupons
     validateCoupon(code: String!, planId: ID!): CouponValidation!
}

# Mutations
type Mutation {
     # Auth
     register(input: RegisterInput!): AuthPayload!
     login(input: LoginInput!): AuthPayload!
     logout: Boolean!
     verifyEmail(token: String!): MessagePayload!
     forgotPassword(email: String!): MessagePayload!
     resetPassword(token: String!, newPassword: String!): MessagePayload!

     # User
     updateUser(input: UpdateUserInput!): User!
     changePassword(input: ChangePasswordInput!): MessagePayload!
     updateNotificationSettings(input: NotificationSettingsInput!): User!

     # Subscription
     createSubscription(input: CreateSubscriptionInput!): SubscriptionPayload!
     updateSubscription(input: UpdateSubscriptionInput!): SubscriptionPayload!
     cancelSubscription(input: CancelSubscriptionInput!): MessagePayload!

     # Projects
     createProject(input: CreateProjectInput!): Project!
     updateProject(id: ID!, input: UpdateProjectInput!): Project!
     deleteProject(id: ID!): Boolean!

     # Usage
     incrementUsage(input: IncrementUsageInput!): MessagePayload!

     # API Keys
     createApiKey(input: CreateApiKeyInput!): ApiKey!
     revokeApiKey(id: ID!): Boolean!

     # Notifications
     markNotificationAsRead(id: ID!): Notification!
     markAllNotificationsAsRead: Boolean!

     # Payment Methods
     addPaymentMethod(paymentMethodId: String!): PaymentMethod!
     removePaymentMethod(id: ID!): Boolean!
     setDefaultPaymentMethod(id: ID!): PaymentMethod!
}

# Subscriptions
type Subscription {
     # Real-time updates
     userUpdated: User!
     subscriptionUpdated: Subscription!
     usageUpdated: UsageStats!
     notificationAdded: Notification!
}

# Response Types
type AuthPayload {
     user: User!
     token: String!
     refreshToken: String
}

type MessagePayload {
     message: String!
}

type SubscriptionPayload {
     subscription: Subscription!
     invoice: Payment
}

type UsageLimitCheck {
     allowed: Boolean!
     current: Int!
     limit: Int!
     remaining: Int!
}

type CouponValidation {
     valid: Boolean!
     coupon: Coupon
     discount: Float
     message: String
}

type ProjectConnection {
     projects: [Project!]!
     totalCount: Int!
     pageInfo: PageInfo!
}

type PaymentConnection {
     payments: [Payment!]!
     totalCount: Int!
     pageInfo: PageInfo!
}

type PageInfo {
     page: Int!
     limit: Int!
     totalPages: Int!
     hasNextPage: Boolean!
     hasPreviousPage: Boolean!
}

type PaymentMethod {
     id: ID!
     type: String!
     last4: String!
     brand: String!
     expMonth: Int!
     expYear: Int!
     isDefault: Boolean!
}
```

## MongoDB Schema (Mongoose Models)

### 1. User Model

```typescript
// models/User.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
     _id: string;
     name: string;
     email: string;
     password: string;
     avatar?: string;
     emailVerified: boolean;
     emailVerificationToken?: string;
     passwordResetToken?: string;
     passwordResetExpires?: Date;
     lastLogin?: Date;
     stripeCustomerId?: string;
     createdAt: Date;
     updatedAt: Date;
     deletedAt?: Date;
}

const UserSchema = new Schema<IUser>(
     {
          name: { type: String, required: true, trim: true },
          email: { type: String, required: true, unique: true, lowercase: true },
          password: { type: String, required: true },
          avatar: { type: String },
          emailVerified: { type: Boolean, default: false },
          emailVerificationToken: { type: String },
          passwordResetToken: { type: String },
          passwordResetExpires: { type: Date },
          lastLogin: { type: Date },
          stripeCustomerId: { type: String },
          deletedAt: { type: Date },
     },
     {
          timestamps: true,
          toJSON: { virtuals: true },
          toObject: { virtuals: true },
     }
);

// Indexes
UserSchema.index({ email: 1 });
UserSchema.index({ emailVerificationToken: 1 });
UserSchema.index({ passwordResetToken: 1 });
UserSchema.index({ deletedAt: 1 });

// Virtual for subscription
UserSchema.virtual("subscription", {
     ref: "Subscription",
     localField: "_id",
     foreignField: "userId",
     justOne: true,
});

// Virtual for projects
UserSchema.virtual("projects", {
     ref: "Project",
     localField: "_id",
     foreignField: "userId",
});

export const User = mongoose.model<IUser>("User", UserSchema);
```

### 2. Subscription Model

```typescript
// models/Subscription.ts
import mongoose, { Schema, Document } from "mongoose";

export interface ISubscription extends Document {
     _id: string;
     userId: string;
     planId: string;
     status: "ACTIVE" | "CANCELLED" | "EXPIRED" | "PAST_DUE";
     startDate: Date;
     endDate?: Date;
     autoRenew: boolean;
     price: number;
     currency: string;
     stripeSubscriptionId?: string;
     stripeCustomerId?: string;
     createdAt: Date;
     updatedAt: Date;
}

const SubscriptionSchema = new Schema<ISubscription>(
     {
          userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
          planId: { type: String, required: true },
          status: {
               type: String,
               enum: ["ACTIVE", "CANCELLED", "EXPIRED", "PAST_DUE"],
               required: true,
          },
          startDate: { type: Date, required: true },
          endDate: { type: Date },
          autoRenew: { type: Boolean, default: true },
          price: { type: Number, required: true },
          currency: { type: String, default: "USD" },
          stripeSubscriptionId: { type: String },
          stripeCustomerId: { type: String },
     },
     {
          timestamps: true,
     }
);

// Indexes
SubscriptionSchema.index({ userId: 1, status: 1 });
SubscriptionSchema.index({ stripeSubscriptionId: 1 });
SubscriptionSchema.index({ status: 1 });

// Virtual for plan
SubscriptionSchema.virtual("plan", {
     ref: "Plan",
     localField: "planId",
     foreignField: "id",
     justOne: true,
});

export const Subscription = mongoose.model<ISubscription>("Subscription", SubscriptionSchema);
```

### 3. Plan Model

```typescript
// models/Plan.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IPlan extends Document {
     _id: string;
     id: string; // Custom ID for GraphQL
     name: string;
     description?: string;
     price: number;
     currency: string;
     interval: "MONTH" | "YEAR";
     features: string[];
     limits: {
          projects: number;
          storage: number;
          apiCalls: number;
     };
     stripePriceId?: string;
     active: boolean;
     createdAt: Date;
     updatedAt: Date;
}

const PlanSchema = new Schema<IPlan>(
     {
          id: { type: String, unique: true, required: true },
          name: { type: String, required: true },
          description: { type: String },
          price: { type: Number, required: true },
          currency: { type: String, default: "USD" },
          interval: { type: String, enum: ["MONTH", "YEAR"], required: true },
          features: [{ type: String }],
          limits: {
               projects: { type: Number, required: true },
               storage: { type: Number, required: true },
               apiCalls: { type: Number, required: true },
          },
          stripePriceId: { type: String },
          active: { type: Boolean, default: true },
     },
     {
          timestamps: true,
     }
);

// Indexes
PlanSchema.index({ active: 1 });
PlanSchema.index({ stripePriceId: 1 });

export const Plan = mongoose.model<IPlan>("Plan", PlanSchema);
```

### 4. Usage Model

```typescript
// models/Usage.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IUsage extends Document {
     _id: string;
     userId: string;
     resourceType: "projects" | "storage" | "apiCalls";
     amount: number;
     periodStart: Date;
     periodEnd: Date;
     metadata?: any;
     createdAt: Date;
}

const UsageSchema = new Schema<IUsage>(
     {
          userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
          resourceType: {
               type: String,
               enum: ["projects", "storage", "apiCalls"],
               required: true,
          },
          amount: { type: Number, required: true },
          periodStart: { type: Date, required: true },
          periodEnd: { type: Date, required: true },
          metadata: { type: Schema.Types.Mixed },
     },
     {
          timestamps: { createdAt: true, updatedAt: false },
     }
);

// Indexes
UsageSchema.index({ userId: 1, resourceType: 1, periodStart: 1 });
UsageSchema.index({ periodStart: 1, periodEnd: 1 });

export const Usage = mongoose.model<IUsage>("Usage", UsageSchema);
```

### 5. Project Model

```typescript
// models/Project.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
     _id: string;
     userId: string;
     name: string;
     description?: string;
     settings?: any;
     canvasData?: any;
     storageSize: number;
     createdAt: Date;
     updatedAt: Date;
     deletedAt?: Date;
}

const ProjectSchema = new Schema<IProject>(
     {
          userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
          name: { type: String, required: true, trim: true },
          description: { type: String },
          settings: { type: Schema.Types.Mixed },
          canvasData: { type: Schema.Types.Mixed },
          storageSize: { type: Number, default: 0 },
          deletedAt: { type: Date },
     },
     {
          timestamps: true,
     }
);

// Indexes
ProjectSchema.index({ userId: 1, deletedAt: 1 });
ProjectSchema.index({ createdAt: -1 });
ProjectSchema.index({ deletedAt: 1 });

// Text search index
ProjectSchema.index({ name: "text", description: "text" });

export const Project = mongoose.model<IProject>("Project", ProjectSchema);
```

## GraphQL Resolvers

### 1. Auth Resolvers

```typescript
// resolvers/auth.ts
import { Resolvers } from "../generated/graphql";
import { User } from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { EmailService } from "../services/email.service";

export const authResolvers: Resolvers = {
     Query: {
          me: async (_, __, { user }) => {
               if (!user) throw new Error("Not authenticated");
               return user;
          },
     },

     Mutation: {
          register: async (_, { input }) => {
               const { name, email, password, confirmPassword } = input;

               // Validation
               if (password !== confirmPassword) {
                    throw new Error("Passwords do not match");
               }

               // Check if user exists
               const existingUser = await User.findOne({ email });
               if (existingUser) {
                    throw new Error("User already exists");
               }

               // Hash password
               const saltRounds = 12;
               const passwordHash = await bcrypt.hash(password, saltRounds);

               // Create user
               const user = await User.create({
                    name,
                    email,
                    password: passwordHash,
                    emailVerificationToken: require("crypto").randomBytes(32).toString("hex"),
               });

               // Send verification email
               const emailService = new EmailService();
               await emailService.sendVerificationEmail(user.email, user.emailVerificationToken);

               // Generate JWT token
               const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET!, { expiresIn: "7d" });

               return {
                    user: user.toJSON(),
                    token,
               };
          },

          login: async (_, { input }) => {
               const { email, password, rememberMe } = input;

               // Find user
               const user = await User.findOne({ email });
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
               user.lastLogin = new Date();
               await user.save();

               // Generate JWT token
               const expiresIn = rememberMe ? "30d" : "7d";
               const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET!, { expiresIn });

               return {
                    user: user.toJSON(),
                    token,
               };
          },

          logout: async (_, __, { user }) => {
               // In a real implementation, you might want to blacklist the token
               return true;
          },

          verifyEmail: async (_, { token }) => {
               const user = await User.findOne({ emailVerificationToken: token });
               if (!user) {
                    throw new Error("Invalid verification token");
               }

               user.emailVerified = true;
               user.emailVerificationToken = undefined;
               await user.save();

               return { message: "Email verified successfully" };
          },

          forgotPassword: async (_, { email }) => {
               const user = await User.findOne({ email });
               if (!user) {
                    // Don't reveal if user exists
                    return { message: "If the email exists, a reset link has been sent" };
               }

               const resetToken = require("crypto").randomBytes(32).toString("hex");
               const resetExpires = new Date(Date.now() + 3600000); // 1 hour

               user.passwordResetToken = resetToken;
               user.passwordResetExpires = resetExpires;
               await user.save();

               const emailService = new EmailService();
               await emailService.sendPasswordResetEmail(user.email, resetToken);

               return { message: "If the email exists, a reset link has been sent" };
          },

          resetPassword: async (_, { token, newPassword }) => {
               const user = await User.findOne({
                    passwordResetToken: token,
                    passwordResetExpires: { $gt: new Date() },
               });

               if (!user) {
                    throw new Error("Invalid or expired reset token");
               }

               const saltRounds = 12;
               const passwordHash = await bcrypt.hash(newPassword, saltRounds);

               user.password = passwordHash;
               user.passwordResetToken = undefined;
               user.passwordResetExpires = undefined;
               await user.save();

               return { message: "Password reset successfully" };
          },
     },
};
```

### 2. Subscription Resolvers

```typescript
// resolvers/subscription.ts
import { Resolvers } from "../generated/graphql";
import { Subscription } from "../models/Subscription";
import { Plan } from "../models/Plan";
import { User } from "../models/User";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const subscriptionResolvers: Resolvers = {
     Query: {
          plans: async () => {
               return await Plan.find({ active: true });
          },

          plan: async (_, { id }) => {
               return await Plan.findOne({ id });
          },
     },

     Mutation: {
          createSubscription: async (_, { input }, { user }) => {
               if (!user) throw new Error("Not authenticated");

               const { planId, paymentMethodId, couponCode } = input;

               // Get plan
               const plan = await Plan.findOne({ id: planId });
               if (!plan) {
                    throw new Error("Invalid plan");
               }

               // Check if user already has an active subscription
               const existingSubscription = await Subscription.findOne({
                    userId: user._id,
                    status: "ACTIVE",
               });
               if (existingSubscription) {
                    throw new Error("User already has an active subscription");
               }

               // Create or get Stripe customer
               let customerId = user.stripeCustomerId;
               if (!customerId) {
                    const customer = await stripe.customers.create({
                         email: user.email,
                         name: user.name,
                    });
                    customerId = customer.id;
                    user.stripeCustomerId = customerId;
                    await user.save();
               }

               // Attach payment method
               await stripe.paymentMethods.attach(paymentMethodId, {
                    customer: customerId,
               });

               // Set as default payment method
               await stripe.customers.update(customerId, {
                    invoice_settings: {
                         default_payment_method: paymentMethodId,
                    },
               });

               // Apply coupon if provided
               let couponId: string | undefined;
               if (couponCode) {
                    // Validate coupon logic here
                    couponId = couponCode; // Simplified
               }

               // Create Stripe subscription
               const stripeSubscription = await stripe.subscriptions.create({
                    customer: customerId,
                    items: [{ price: plan.stripePriceId }],
                    default_payment_method: paymentMethodId,
                    coupon: couponId,
                    expand: ["latest_invoice.payment_intent"],
               });

               // Create local subscription record
               const subscription = await Subscription.create({
                    userId: user._id,
                    planId,
                    status: "ACTIVE",
                    startDate: new Date(),
                    endDate: new Date(stripeSubscription.current_period_end * 1000),
                    autoRenew: true,
                    price: plan.price,
                    currency: plan.currency,
                    stripeSubscriptionId: stripeSubscription.id,
                    stripeCustomerId: customerId,
               });

               return {
                    subscription: subscription.toJSON(),
                    invoice: stripeSubscription.latest_invoice,
               };
          },

          updateSubscription: async (_, { input }, { user }) => {
               if (!user) throw new Error("Not authenticated");

               const { planId } = input;

               const subscription = await Subscription.findOne({
                    userId: user._id,
                    status: "ACTIVE",
               });
               if (!subscription) {
                    throw new Error("No active subscription found");
               }

               const newPlan = await Plan.findOne({ id: planId });
               if (!newPlan) {
                    throw new Error("Invalid plan");
               }

               // Update Stripe subscription
               await stripe.subscriptions.update(subscription.stripeSubscriptionId!, {
                    items: [
                         {
                              id: subscription.stripeSubscriptionId!,
                              price: newPlan.stripePriceId,
                         },
                    ],
                    proration_behavior: "create_prorations",
               });

               // Update local subscription
               subscription.planId = planId;
               subscription.price = newPlan.price;
               await subscription.save();

               return {
                    subscription: subscription.toJSON(),
               };
          },

          cancelSubscription: async (_, { input }, { user }) => {
               if (!user) throw new Error("Not authenticated");

               const subscription = await Subscription.findOne({
                    userId: user._id,
                    status: "ACTIVE",
               });
               if (!subscription) {
                    throw new Error("No active subscription found");
               }

               // Cancel Stripe subscription
               await stripe.subscriptions.update(subscription.stripeSubscriptionId!, {
                    cancel_at_period_end: true,
               });

               // Update local subscription
               subscription.status = "CANCELLED";
               subscription.autoRenew = false;
               await subscription.save();

               return { message: "Subscription cancelled successfully" };
          },
     },
};
```

### 3. Usage Resolvers

```typescript
// resolvers/usage.ts
import { Resolvers } from "../generated/graphql";
import { Usage } from "../models/Usage";
import { Subscription } from "../models/Subscription";
import { Plan } from "../models/Plan";

export const usageResolvers: Resolvers = {
     Query: {
          usageStats: async (_, { period = "month" }, { user }) => {
               if (!user) throw new Error("Not authenticated");

               const periodStart = getPeriodStart(period);
               const periodEnd = getPeriodEnd(period);

               const usage = await Usage.find({
                    userId: user._id,
                    periodStart: { $gte: periodStart },
                    periodEnd: { $lte: periodEnd },
               });

               const subscription = await Subscription.findOne({
                    userId: user._id,
                    status: "ACTIVE",
               });
               const plan = subscription ? await Plan.findOne({ id: subscription.planId }) : await Plan.findOne({ id: "free" });

               const statistics = {
                    current: { projects: 0, storage: 0, apiCalls: 0 },
                    limits: plan!.limits,
                    usage: { projects: 0, storage: 0, apiCalls: 0 },
                    period: { start: periodStart, end: periodEnd },
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
                         case "apiCalls":
                              statistics.current.apiCalls += record.amount;
                              break;
                    }
               });

               // Calculate usage percentages
               Object.keys(statistics.current).forEach((key) => {
                    const current = statistics.current[key as keyof typeof statistics.current];
                    const limit = statistics.limits[key as keyof typeof statistics.limits];
                    if (limit > 0) {
                         statistics.usage[key as keyof typeof statistics.usage] = (current / limit) * 100;
                    }
               });

               return statistics;
          },

          checkUsageLimit: async (_, { input }, { user }) => {
               if (!user) throw new Error("Not authenticated");

               const { resourceType, amount } = input;

               const subscription = await Subscription.findOne({
                    userId: user._id,
                    status: "ACTIVE",
               });
               const plan = subscription ? await Plan.findOne({ id: subscription.planId }) : await Plan.findOne({ id: "free" });

               const currentUsage = await getCurrentUsage(user._id, resourceType);
               const limit = plan!.limits[resourceType as keyof typeof plan.limits];

               if (limit === -1) {
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
          },
     },

     Mutation: {
          incrementUsage: async (_, { input }, { user }) => {
               if (!user) throw new Error("Not authenticated");

               const { resourceType, amount, metadata } = input;

               // Check if usage is allowed
               const limitCheck = await checkUsageLimit(user._id, resourceType, amount);
               if (!limitCheck.allowed) {
                    throw new Error(`Usage limit exceeded for ${resourceType}`);
               }

               // Record usage
               await Usage.create({
                    userId: user._id,
                    resourceType,
                    amount,
                    periodStart: getCurrentPeriodStart(),
                    periodEnd: getCurrentPeriodEnd(),
                    metadata,
               });

               return { message: "Usage recorded successfully" };
          },
     },
};

// Helper functions
async function getCurrentUsage(userId: string, resourceType: string): Promise<number> {
     const periodStart = getCurrentPeriodStart();
     const periodEnd = getCurrentPeriodEnd();

     const usage = await Usage.find({
          userId,
          resourceType,
          periodStart: { $gte: periodStart },
          periodEnd: { $lte: periodEnd },
     });

     return usage.reduce((total, record) => total + record.amount, 0);
}

function getCurrentPeriodStart(): Date {
     const now = new Date();
     return new Date(now.getFullYear(), now.getMonth(), 1);
}

function getCurrentPeriodEnd(): Date {
     const now = new Date();
     return new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
}

function getPeriodStart(period: string): Date {
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
               return getCurrentPeriodStart();
     }
}

function getPeriodEnd(period: string): Date {
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
               return getCurrentPeriodEnd();
     }
}
```

## Apollo Server Setup

### 1. Server Configuration

```typescript
// server.ts
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";
import { connectDB } from "./config/database";
import { authMiddleware } from "./middleware/auth";

async function startServer() {
     // Connect to MongoDB
     await connectDB();

     // Create Apollo Server
     const server = new ApolloServer({
          typeDefs,
          resolvers,
          context: async ({ req }) => {
               // Get user from JWT token
               const user = await authMiddleware(req);
               return { user };
          },
     });

     // Start server
     const { url } = await startStandaloneServer(server, {
          listen: { port: 4000 },
     });

     console.log(`🚀 Server ready at: ${url}`);
}

startServer().catch(console.error);
```

### 2. Database Connection

```typescript
// config/database.ts
import mongoose from "mongoose";

export async function connectDB() {
     try {
          await mongoose.connect(process.env.MONGODB_URI!);
          console.log("✅ Connected to MongoDB");
     } catch (error) {
          console.error("❌ MongoDB connection error:", error);
          process.exit(1);
     }
}
```

### 3. Authentication Middleware

```typescript
// middleware/auth.ts
import jwt from "jsonwebtoken";
import { User } from "../models/User";

export async function authMiddleware(req: any) {
     try {
          const token = req.headers.authorization?.replace("Bearer ", "");
          if (!token) return null;

          const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
          const user = await User.findById(decoded.userId);

          return user;
     } catch (error) {
          return null;
     }
}
```

## Frontend Integration (Apollo Client)

### 1. Apollo Client Setup

```typescript
// apollo-client.ts
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
     uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || "http://localhost:4000/graphql",
});

const authLink = setContext((_, { headers }) => {
     const token = localStorage.getItem("token");
     return {
          headers: {
               ...headers,
               authorization: token ? `Bearer ${token}` : "",
          },
     };
});

export const client = new ApolloClient({
     link: authLink.concat(httpLink),
     cache: new InMemoryCache(),
});
```

### 2. GraphQL Queries and Mutations

```typescript
// graphql/queries.ts
import { gql } from "@apollo/client";

export const GET_USER = gql`
     query GetUser {
          me {
               id
               name
               email
               subscription {
                    plan {
                         name
                         limits {
                              projects
                              storage
                              apiCalls
                         }
                    }
                    status
                    endDate
               }
               usage {
                    current {
                         projects
                         storage
                         apiCalls
                    }
                    limits {
                         projects
                         storage
                         apiCalls
                    }
               }
          }
     }
`;

export const LOGIN = gql`
     mutation Login($input: LoginInput!) {
          login(input: $input) {
               user {
                    id
                    name
                    email
               }
               token
          }
     }
`;

export const CREATE_PROJECT = gql`
     mutation CreateProject($input: CreateProjectInput!) {
          createProject(input: $input) {
               id
               name
               description
               createdAt
          }
     }
`;

export const GET_USAGE_STATS = gql`
     query GetUsageStats($period: String) {
          usageStats(period: $period) {
               current {
                    projects
                    storage
                    apiCalls
               }
               limits {
                    projects
                    storage
                    apiCalls
               }
               usage {
                    projects
                    storage
                    apiCalls
               }
          }
     }
`;
```

### 3. React Hooks with Apollo

```typescript
// hooks/useAuth.ts
import { useMutation, useQuery } from "@apollo/client";
import { LOGIN, GET_USER } from "../graphql/queries";

export function useAuth() {
     const { data: userData, loading, error } = useQuery(GET_USER);
     const [loginMutation] = useMutation(LOGIN);

     const login = async (email: string, password: string) => {
          const { data } = await loginMutation({
               variables: {
                    input: { email, password },
               },
          });

          localStorage.setItem("token", data.login.token);
          return data.login.user;
     };

     return {
          user: userData?.me,
          loading,
          error,
          login,
     };
}
```

## Environment Variables

```env
# Database
MONGODB_URI=mongodb://localhost:27017/ximler

# JWT
JWT_SECRET=your-super-secret-jwt-key

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Email
SENDGRID_API_KEY=SG...
FROM_EMAIL=noreply@ximler.com

# Redis
REDIS_URL=redis://localhost:6379

# App
NODE_ENV=production
PORT=4000
API_BASE_URL=https://api.ximler.com
FRONTEND_URL=https://ximler.com
```

## Advantages of GraphQL + MongoDB

### GraphQL Benefits:

-    ✅ **Single Endpoint** - One endpoint for all operations
-    ✅ **Type Safety** - Strong typing with TypeScript
-    ✅ **Real-time Subscriptions** - WebSocket support
-    ✅ **Efficient Data Fetching** - Request only what you need
-    ✅ **Introspection** - Self-documenting API
-    ✅ **Client-side Caching** - Apollo Client cache

### MongoDB Benefits:

-    ✅ **Flexible Schema** - Easy to modify data structure
-    ✅ **JSON-like Documents** - Natural fit for JavaScript/TypeScript
-    ✅ **Horizontal Scaling** - Built-in sharding
-    ✅ **Rich Queries** - Complex aggregation pipelines
-    ✅ **GridFS** - File storage capabilities
-    ✅ **Atlas Cloud** - Managed MongoDB service

**آیا می‌خواهید این GraphQL + MongoDB implementation را پیاده‌سازی کنیم؟**
