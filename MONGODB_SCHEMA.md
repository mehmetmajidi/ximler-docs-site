# Ximler MongoDB Database Schema

## Database Design Overview

This document outlines the MongoDB database schema for the Ximler platform using Mongoose ODM with TypeScript.

## Collections (Tables)

### 1. Users Collection

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
     notificationSettings: {
          email: {
               productUpdates: boolean;
               billingAlerts: boolean;
               securityAlerts: boolean;
          };
          push: {
               enabled: boolean;
               productUpdates: boolean;
          };
     };
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
          notificationSettings: {
               email: {
                    productUpdates: { type: Boolean, default: true },
                    billingAlerts: { type: Boolean, default: true },
                    securityAlerts: { type: Boolean, default: true },
               },
               push: {
                    enabled: { type: Boolean, default: false },
                    productUpdates: { type: Boolean, default: true },
               },
          },
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
UserSchema.index({ stripeCustomerId: 1 });

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

// Virtual for usage
UserSchema.virtual("usage", {
     ref: "Usage",
     localField: "_id",
     foreignField: "userId",
});

export const User = mongoose.model<IUser>("User", UserSchema);
```

### 2. Plans Collection

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
          storage: number; // in GB
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
PlanSchema.index({ id: 1 });

export const Plan = mongoose.model<IPlan>("Plan", PlanSchema);
```

### 3. Subscriptions Collection

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
SubscriptionSchema.index({ endDate: 1 });

// Virtual for plan
SubscriptionSchema.virtual("plan", {
     ref: "Plan",
     localField: "planId",
     foreignField: "id",
     justOne: true,
});

export const Subscription = mongoose.model<ISubscription>("Subscription", SubscriptionSchema);
```

### 4. Payments Collection

```typescript
// models/Payment.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IPayment extends Document {
     _id: string;
     userId: string;
     subscriptionId?: string;
     amount: number;
     currency: string;
     status: "PENDING" | "PAID" | "FAILED" | "REFUNDED";
     description?: string;
     stripePaymentIntentId?: string;
     stripeInvoiceId?: string;
     invoiceUrl?: string;
     paidAt?: Date;
     createdAt: Date;
     updatedAt: Date;
}

const PaymentSchema = new Schema<IPayment>(
     {
          userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
          subscriptionId: { type: Schema.Types.ObjectId, ref: "Subscription" },
          amount: { type: Number, required: true },
          currency: { type: String, default: "USD" },
          status: {
               type: String,
               enum: ["PENDING", "PAID", "FAILED", "REFUNDED"],
               required: true,
          },
          description: { type: String },
          stripePaymentIntentId: { type: String },
          stripeInvoiceId: { type: String },
          invoiceUrl: { type: String },
          paidAt: { type: Date },
     },
     {
          timestamps: true,
     }
);

// Indexes
PaymentSchema.index({ userId: 1 });
PaymentSchema.index({ subscriptionId: 1 });
PaymentSchema.index({ status: 1 });
PaymentSchema.index({ stripePaymentIntentId: 1 });
PaymentSchema.index({ stripeInvoiceId: 1 });
PaymentSchema.index({ createdAt: -1 });

export const Payment = mongoose.model<IPayment>("Payment", PaymentSchema);
```

### 5. Usage Collection

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
UsageSchema.index({ resourceType: 1 });

export const Usage = mongoose.model<IUsage>("Usage", UsageSchema);
```

### 6. Projects Collection

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

### 7. API Keys Collection

```typescript
// models/ApiKey.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IApiKey extends Document {
     _id: string;
     userId: string;
     name: string;
     keyHash: string;
     permissions: string[];
     lastUsed?: Date;
     expiresAt?: Date;
     createdAt: Date;
     revokedAt?: Date;
}

const ApiKeySchema = new Schema<IApiKey>(
     {
          userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
          name: { type: String, required: true },
          keyHash: { type: String, required: true },
          permissions: [{ type: String }],
          lastUsed: { type: Date },
          expiresAt: { type: Date },
          revokedAt: { type: Date },
     },
     {
          timestamps: { createdAt: true, updatedAt: false },
     }
);

// Indexes
ApiKeySchema.index({ userId: 1 });
ApiKeySchema.index({ keyHash: 1 });
ApiKeySchema.index({ expiresAt: 1 });
ApiKeySchema.index({ revokedAt: 1 });

export const ApiKey = mongoose.model<IApiKey>("ApiKey", ApiKeySchema);
```

### 8. Notifications Collection

```typescript
// models/Notification.ts
import mongoose, { Schema, Document } from "mongoose";

export interface INotification extends Document {
     _id: string;
     userId: string;
     type: "BILLING" | "SECURITY" | "PRODUCT" | "SYSTEM";
     title: string;
     message: string;
     readAt?: Date;
     metadata?: any;
     createdAt: Date;
}

const NotificationSchema = new Schema<INotification>(
     {
          userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
          type: {
               type: String,
               enum: ["BILLING", "SECURITY", "PRODUCT", "SYSTEM"],
               required: true,
          },
          title: { type: String, required: true },
          message: { type: String, required: true },
          readAt: { type: Date },
          metadata: { type: Schema.Types.Mixed },
     },
     {
          timestamps: { createdAt: true, updatedAt: false },
     }
);

// Indexes
NotificationSchema.index({ userId: 1, readAt: 1 });
NotificationSchema.index({ type: 1 });
NotificationSchema.index({ createdAt: -1 });

export const Notification = mongoose.model<INotification>("Notification", NotificationSchema);
```

### 9. Coupons Collection

```typescript
// models/Coupon.ts
import mongoose, { Schema, Document } from "mongoose";

export interface ICoupon extends Document {
     _id: string;
     code: string;
     name: string;
     description?: string;
     type: "PERCENTAGE" | "FIXED";
     value: number;
     currency: string;
     maxUses?: number;
     usedCount: number;
     validFrom: Date;
     validUntil: Date;
     applicablePlans: string[];
     active: boolean;
     createdAt: Date;
     updatedAt: Date;
}

const CouponSchema = new Schema<ICoupon>(
     {
          code: { type: String, required: true, unique: true, uppercase: true },
          name: { type: String, required: true },
          description: { type: String },
          type: { type: String, enum: ["PERCENTAGE", "FIXED"], required: true },
          value: { type: Number, required: true },
          currency: { type: String, default: "USD" },
          maxUses: { type: Number },
          usedCount: { type: Number, default: 0 },
          validFrom: { type: Date, required: true },
          validUntil: { type: Date, required: true },
          applicablePlans: [{ type: String }],
          active: { type: Boolean, default: true },
     },
     {
          timestamps: true,
     }
);

// Indexes
CouponSchema.index({ code: 1 });
CouponSchema.index({ active: 1 });
CouponSchema.index({ validFrom: 1, validUntil: 1 });
CouponSchema.index({ applicablePlans: 1 });

export const Coupon = mongoose.model<ICoupon>("Coupon", CouponSchema);
```

### 10. Audit Logs Collection

```typescript
// models/AuditLog.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IAuditLog extends Document {
     _id: string;
     userId?: string;
     action: string;
     resource: string;
     resourceId?: string;
     metadata?: any;
     ipAddress?: string;
     userAgent?: string;
     createdAt: Date;
}

const AuditLogSchema = new Schema<IAuditLog>(
     {
          userId: { type: Schema.Types.ObjectId, ref: "User" },
          action: { type: String, required: true },
          resource: { type: String, required: true },
          resourceId: { type: String },
          metadata: { type: Schema.Types.Mixed },
          ipAddress: { type: String },
          userAgent: { type: String },
     },
     {
          timestamps: { createdAt: true, updatedAt: false },
     }
);

// Indexes
AuditLogSchema.index({ userId: 1 });
AuditLogSchema.index({ action: 1 });
AuditLogSchema.index({ resource: 1, resourceId: 1 });
AuditLogSchema.index({ createdAt: -1 });

export const AuditLog = mongoose.model<IAuditLog>("AuditLog", AuditLogSchema);
```

## Database Indexes Summary

### Performance Indexes

```javascript
// Users
db.users.createIndex({ email: 1 });
db.users.createIndex({ emailVerificationToken: 1 });
db.users.createIndex({ passwordResetToken: 1 });
db.users.createIndex({ deletedAt: 1 });
db.users.createIndex({ stripeCustomerId: 1 });

// Subscriptions
db.subscriptions.createIndex({ userId: 1, status: 1 });
db.subscriptions.createIndex({ stripeSubscriptionId: 1 });
db.subscriptions.createIndex({ status: 1 });
db.subscriptions.createIndex({ endDate: 1 });

// Payments
db.payments.createIndex({ userId: 1 });
db.payments.createIndex({ subscriptionId: 1 });
db.payments.createIndex({ status: 1 });
db.payments.createIndex({ stripePaymentIntentId: 1 });
db.payments.createIndex({ createdAt: -1 });

// Usage
db.usage.createIndex({ userId: 1, resourceType: 1, periodStart: 1 });
db.usage.createIndex({ periodStart: 1, periodEnd: 1 });
db.usage.createIndex({ resourceType: 1 });

// Projects
db.projects.createIndex({ userId: 1, deletedAt: 1 });
db.projects.createIndex({ createdAt: -1 });
db.projects.createIndex({ deletedAt: 1 });
db.projects.createIndex({ name: "text", description: "text" });

// API Keys
db.apikeys.createIndex({ userId: 1 });
db.apikeys.createIndex({ keyHash: 1 });
db.apikeys.createIndex({ expiresAt: 1 });
db.apikeys.createIndex({ revokedAt: 1 });

// Notifications
db.notifications.createIndex({ userId: 1, readAt: 1 });
db.notifications.createIndex({ type: 1 });
db.notifications.createIndex({ createdAt: -1 });

// Coupons
db.coupons.createIndex({ code: 1 });
db.coupons.createIndex({ active: 1 });
db.coupons.createIndex({ validFrom: 1, validUntil: 1 });
db.coupons.createIndex({ applicablePlans: 1 });

// Audit Logs
db.auditlogs.createIndex({ userId: 1 });
db.auditlogs.createIndex({ action: 1 });
db.auditlogs.createIndex({ resource: 1, resourceId: 1 });
db.auditlogs.createIndex({ createdAt: -1 });
```

## Sample Data

### Default Plans

```javascript
// Insert default plans
db.plans.insertMany([
     {
          id: "free",
          name: "Free",
          description: "Perfect for getting started",
          price: 0,
          currency: "USD",
          interval: "MONTH",
          features: ["Up to 3 projects", "1GB storage", "1,000 API calls/month", "Community support"],
          limits: {
               projects: 3,
               storage: 1,
               apiCalls: 1000,
          },
          active: true,
     },
     {
          id: "pro",
          name: "Pro",
          description: "For professional developers",
          price: 29,
          currency: "USD",
          interval: "MONTH",
          features: ["Up to 100 projects", "50GB storage", "100,000 API calls/month", "Priority support", "Advanced analytics", "Custom integrations"],
          limits: {
               projects: 100,
               storage: 50,
               apiCalls: 100000,
          },
          stripePriceId: "price_pro_monthly",
          active: true,
     },
     {
          id: "enterprise",
          name: "Enterprise",
          description: "For large organizations",
          price: 99,
          currency: "USD",
          interval: "MONTH",
          features: ["Unlimited projects", "500GB storage", "1,000,000 API calls/month", "24/7 dedicated support", "Custom SLA", "On-premise deployment", "Advanced security"],
          limits: {
               projects: -1, // Unlimited
               storage: 500,
               apiCalls: 1000000,
          },
          stripePriceId: "price_enterprise_monthly",
          active: true,
     },
]);
```

### Sample Coupons

```javascript
// Insert sample coupons
db.coupons.insertMany([
     {
          code: "WELCOME20",
          name: "Welcome Discount",
          description: "20% off your first month",
          type: "PERCENTAGE",
          value: 20,
          currency: "USD",
          maxUses: 1000,
          usedCount: 0,
          validFrom: new Date(),
          validUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
          applicablePlans: ["pro", "enterprise"],
          active: true,
     },
     {
          code: "STUDENT50",
          name: "Student Discount",
          description: "50% off for students",
          type: "PERCENTAGE",
          value: 50,
          currency: "USD",
          maxUses: 500,
          usedCount: 0,
          validFrom: new Date(),
          validUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
          applicablePlans: ["pro"],
          active: true,
     },
]);
```

## Database Connection Setup

```typescript
// config/database.ts
import mongoose from "mongoose";

export async function connectDB() {
     try {
          const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/ximler";

          await mongoose.connect(mongoUri, {
               maxPoolSize: 10,
               serverSelectionTimeoutMS: 5000,
               socketTimeoutMS: 45000,
          });

          console.log("✅ Connected to MongoDB");

          // Handle connection events
          mongoose.connection.on("error", (err) => {
               console.error("❌ MongoDB connection error:", err);
          });

          mongoose.connection.on("disconnected", () => {
               console.log("⚠️ MongoDB disconnected");
          });

          mongoose.connection.on("reconnected", () => {
               console.log("✅ MongoDB reconnected");
          });
     } catch (error) {
          console.error("❌ MongoDB connection error:", error);
          process.exit(1);
     }
}

export async function disconnectDB() {
     try {
          await mongoose.disconnect();
          console.log("✅ Disconnected from MongoDB");
     } catch (error) {
          console.error("❌ Error disconnecting from MongoDB:", error);
     }
}
```

## Environment Variables

```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/ximler
MONGODB_TEST_URI=mongodb://localhost:27017/ximler_test

# For production with MongoDB Atlas
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ximler?retryWrites=true&w=majority
```

## Advantages of MongoDB for Ximler

### 1. **Flexible Schema**

-    Easy to modify data structure as requirements change
-    Support for nested objects and arrays
-    No need for complex migrations

### 2. **JSON-like Documents**

-    Natural fit for JavaScript/TypeScript applications
-    Easy serialization/deserialization
-    GraphQL-friendly data structure

### 3. **Horizontal Scaling**

-    Built-in sharding capabilities
-    Automatic load balancing
-    Easy to scale as user base grows

### 4. **Rich Query Capabilities**

-    Complex aggregation pipelines
-    Text search capabilities
-    Geospatial queries for future features

### 5. **GridFS Integration**

-    Built-in file storage for large files
-    Perfect for canvas data and assets
-    Automatic chunking and streaming

### 6. **MongoDB Atlas**

-    Managed cloud service
-    Automatic backups and monitoring
-    Global clusters for low latency

## Performance Considerations

### 1. **Indexing Strategy**

-    Compound indexes for common query patterns
-    Text indexes for search functionality
-    TTL indexes for temporary data

### 2. **Aggregation Pipelines**

-    Efficient data processing
-    Real-time analytics
-    Complex reporting queries

### 3. **Connection Pooling**

-    Mongoose connection pooling
-    Optimal pool size configuration
-    Connection monitoring

### 4. **Caching Strategy**

-    Redis for frequently accessed data
-    MongoDB query result caching
-    Session management

This MongoDB schema provides a solid foundation for the Ximler platform with excellent performance, scalability, and developer experience.
