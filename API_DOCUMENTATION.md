# Ximler API Documentation

## Authentication APIs

### 1. User Registration

```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "confirmPassword": "securePassword123"
}
```

**Response:**

```json
{
     "success": true,
     "message": "User registered successfully",
     "data": {
          "user": {
               "id": "user_123",
               "name": "John Doe",
               "email": "john@example.com",
               "subscription": {
                    "plan": "Free",
                    "status": "active",
                    "startDate": "2024-01-15T00:00:00Z",
                    "endDate": null,
                    "autoRenew": false,
                    "price": 0,
                    "currency": "USD"
               }
          },
          "token": "jwt_token_here"
     }
}
```

### 2. User Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123",
  "rememberMe": true
}
```

**Response:**

```json
{
     "success": true,
     "message": "Login successful",
     "data": {
          "user": {
               "id": "user_123",
               "name": "John Doe",
               "email": "john@example.com",
               "subscription": {
                    "plan": "Pro",
                    "status": "active",
                    "startDate": "2024-01-01T00:00:00Z",
                    "endDate": "2024-12-31T23:59:59Z",
                    "autoRenew": true,
                    "price": 29,
                    "currency": "USD"
               }
          },
          "token": "jwt_token_here",
          "refreshToken": "refresh_token_here"
     }
}
```

### 3. Social Login (Google/GitHub)

```http
POST /api/auth/social-login
Content-Type: application/json

{
  "provider": "google", // or "github"
  "token": "social_provider_token"
}
```

### 4. Password Reset

```http
POST /api/auth/forgot-password
Content-Type: application/json

{
  "email": "john@example.com"
}
```

```http
POST /api/auth/reset-password
Content-Type: application/json

{
  "token": "reset_token",
  "newPassword": "newSecurePassword123"
}
```

### 5. Email Verification

```http
POST /api/auth/verify-email
Content-Type: application/json

{
  "token": "verification_token"
}
```

## User Profile APIs

### 6. Get User Profile

```http
GET /api/user/profile
Authorization: Bearer jwt_token
```

**Response:**

```json
{
     "success": true,
     "data": {
          "user": {
               "id": "user_123",
               "name": "John Doe",
               "email": "john@example.com",
               "avatar": "https://api.ximler.com/avatars/user_123.jpg",
               "createdAt": "2024-01-01T00:00:00Z",
               "lastLogin": "2024-01-15T10:30:00Z",
               "subscription": {
                    "plan": "Pro",
                    "status": "active",
                    "startDate": "2024-01-01T00:00:00Z",
                    "endDate": "2024-12-31T23:59:59Z",
                    "autoRenew": true,
                    "price": 29,
                    "currency": "USD"
               },
               "usage": {
                    "projects": 15,
                    "maxProjects": 100,
                    "storage": 2.5,
                    "maxStorage": 50,
                    "apiCalls": 12500,
                    "maxApiCalls": 100000,
                    "lastReset": "2024-01-01T00:00:00Z"
               }
          }
     }
}
```

### 7. Update User Profile

```http
PUT /api/user/profile
Authorization: Bearer jwt_token
Content-Type: application/json

{
  "name": "John Smith",
  "email": "johnsmith@example.com"
}
```

### 8. Change Password

```http
PUT /api/user/password
Authorization: Bearer jwt_token
Content-Type: application/json

{
  "currentPassword": "oldPassword123",
  "newPassword": "newPassword123"
}
```

## Subscription & Billing APIs

### 9. Get Subscription Plans

```http
GET /api/subscription/plans
```

**Response:**

```json
{
     "success": true,
     "data": {
          "plans": [
               {
                    "id": "free",
                    "name": "Free",
                    "price": 0,
                    "currency": "USD",
                    "interval": "month",
                    "features": ["Basic 2D drawing tools", "Limited shape storage", "Community support", "Standard performance"],
                    "limits": {
                         "projects": 5,
                         "storage": 1,
                         "apiCalls": 1000
                    }
               },
               {
                    "id": "pro",
                    "name": "Pro",
                    "price": 29,
                    "currency": "USD",
                    "interval": "month",
                    "features": [
                         "All Free features",
                         "Advanced 2D drawing tools",
                         "Unlimited shape storage",
                         "Email support",
                         "High performance",
                         "Basic map integration",
                         "2.5D isometric view",
                         "Architectural grid system"
                    ],
                    "limits": {
                         "projects": 100,
                         "storage": 50,
                         "apiCalls": 100000
                    }
               },
               {
                    "id": "enterprise",
                    "name": "Enterprise",
                    "price": 99,
                    "currency": "USD",
                    "interval": "month",
                    "features": [
                         "All Pro features",
                         "Custom feature development",
                         "Dedicated support manager",
                         "On-premise deployment options",
                         "Advanced 3D rendering",
                         "Real-time collaboration",
                         "SLA and priority support"
                    ],
                    "limits": {
                         "projects": -1, // unlimited
                         "storage": 500,
                         "apiCalls": 1000000
                    }
               }
          ]
     }
}
```

### 10. Create Subscription

```http
POST /api/subscription/create
Authorization: Bearer jwt_token
Content-Type: application/json

{
  "planId": "pro",
  "paymentMethodId": "pm_1234567890",
  "couponCode": "WELCOME20" // optional
}
```

**Response:**

```json
{
     "success": true,
     "message": "Subscription created successfully",
     "data": {
          "subscription": {
               "id": "sub_123",
               "planId": "pro",
               "status": "active",
               "startDate": "2024-01-15T00:00:00Z",
               "endDate": "2024-02-15T23:59:59Z",
               "autoRenew": true,
               "price": 29,
               "currency": "USD"
          },
          "invoice": {
               "id": "inv_123",
               "amount": 29,
               "status": "paid",
               "downloadUrl": "https://api.ximler.com/invoices/inv_123.pdf"
          }
     }
}
```

### 11. Update Subscription

```http
PUT /api/subscription/update
Authorization: Bearer jwt_token
Content-Type: application/json

{
  "planId": "enterprise",
  "paymentMethodId": "pm_1234567890"
}
```

### 12. Cancel Subscription

```http
POST /api/subscription/cancel
Authorization: Bearer jwt_token
Content-Type: application/json

{
  "reason": "Too expensive",
  "feedback": "Would like to see more features in Pro plan"
}
```

### 13. Get Payment History

```http
GET /api/billing/history?page=1&limit=10
Authorization: Bearer jwt_token
```

**Response:**

```json
{
     "success": true,
     "data": {
          "payments": [
               {
                    "id": "inv_001",
                    "date": "2024-01-01T00:00:00Z",
                    "amount": 29,
                    "currency": "USD",
                    "status": "paid",
                    "description": "Pro Plan - Monthly",
                    "downloadUrl": "https://api.ximler.com/invoices/inv_001.pdf"
               }
          ],
          "pagination": {
               "page": 1,
               "limit": 10,
               "total": 25,
               "pages": 3
          }
     }
}
```

### 14. Get Payment Methods

```http
GET /api/billing/payment-methods
Authorization: Bearer jwt_token
```

### 15. Add Payment Method

```http
POST /api/billing/payment-methods
Authorization: Bearer jwt_token
Content-Type: application/json

{
  "type": "card",
  "card": {
    "number": "4242424242424242",
    "expMonth": 12,
    "expYear": 2025,
    "cvc": "123"
  }
}
```

## Usage & Limits APIs

### 16. Get Usage Statistics

```http
GET /api/usage/statistics?period=month
Authorization: Bearer jwt_token
```

**Response:**

```json
{
     "success": true,
     "data": {
          "current": {
               "projects": 15,
               "storage": 2.5,
               "apiCalls": 12500
          },
          "limits": {
               "projects": 100,
               "storage": 50,
               "apiCalls": 100000
          },
          "usage": {
               "projects": 15,
               "storage": 5,
               "apiCalls": 12.5
          },
          "period": {
               "start": "2024-01-01T00:00:00Z",
               "end": "2024-01-31T23:59:59Z"
          }
     }
}
```

### 17. Check Usage Limits

```http
POST /api/usage/check
Authorization: Bearer jwt_token
Content-Type: application/json

{
  "resource": "projects", // projects, storage, apiCalls
  "amount": 1
}
```

**Response:**

```json
{
     "success": true,
     "data": {
          "allowed": true,
          "current": 15,
          "limit": 100,
          "remaining": 85
     }
}
```

### 18. Increment Usage

```http
POST /api/usage/increment
Authorization: Bearer jwt_token
Content-Type: application/json

{
  "resource": "projects",
  "amount": 1,
  "metadata": {
    "projectId": "proj_123",
    "action": "create"
  }
}
```

## Project Management APIs

### 19. Create Project

```http
POST /api/projects
Authorization: Bearer jwt_token
Content-Type: application/json

{
  "name": "My Canvas Project",
  "description": "A new canvas project",
  "settings": {
    "width": 800,
    "height": 600,
    "backgroundColor": "#ffffff"
  }
}
```

**Response:**

```json
{
     "success": true,
     "data": {
          "project": {
               "id": "proj_123",
               "name": "My Canvas Project",
               "description": "A new canvas project",
               "createdAt": "2024-01-15T10:30:00Z",
               "updatedAt": "2024-01-15T10:30:00Z",
               "settings": {
                    "width": 800,
                    "height": 600,
                    "backgroundColor": "#ffffff"
               },
               "usage": {
                    "shapes": 0,
                    "storage": 0.1
               }
          }
     }
}
```

### 20. Get Projects

```http
GET /api/projects?page=1&limit=20
Authorization: Bearer jwt_token
```

### 21. Update Project

```http
PUT /api/projects/proj_123
Authorization: Bearer jwt_token
Content-Type: application/json

{
  "name": "Updated Project Name",
  "settings": {
    "width": 1000,
    "height": 800
  }
}
```

### 22. Delete Project

```http
DELETE /api/projects/proj_123
Authorization: Bearer jwt_token
```

## API Key Management

### 23. Get API Keys

```http
GET /api/keys
Authorization: Bearer jwt_token
```

### 24. Create API Key

```http
POST /api/keys
Authorization: Bearer jwt_token
Content-Type: application/json

{
  "name": "Production API Key",
  "permissions": ["read", "write"],
  "expiresAt": "2024-12-31T23:59:59Z" // optional
}
```

### 25. Revoke API Key

```http
DELETE /api/keys/key_123
Authorization: Bearer jwt_token
```

## Notification APIs

### 26. Get Notifications

```http
GET /api/notifications?unread=true
Authorization: Bearer jwt_token
```

### 27. Mark Notification as Read

```http
PUT /api/notifications/notif_123/read
Authorization: Bearer jwt_token
```

### 28. Update Notification Settings

```http
PUT /api/user/notification-settings
Authorization: Bearer jwt_token
Content-Type: application/json

{
  "email": {
    "productUpdates": true,
    "billingAlerts": true,
    "securityAlerts": true
  },
  "push": {
    "enabled": true,
    "productUpdates": false
  }
}
```

## Analytics APIs

### 29. Get Usage Analytics

```http
GET /api/analytics/usage?period=30d&granularity=day
Authorization: Bearer jwt_token
```

### 30. Get Project Analytics

```http
GET /api/analytics/projects/proj_123?period=7d
Authorization: Bearer jwt_token
```

## Error Responses

All APIs return consistent error responses:

```json
{
     "success": false,
     "error": {
          "code": "VALIDATION_ERROR",
          "message": "Invalid email format",
          "details": {
               "field": "email",
               "value": "invalid-email"
          }
     }
}
```

## Common Error Codes

-    `VALIDATION_ERROR`: Invalid input data
-    `UNAUTHORIZED`: Invalid or missing authentication
-    `FORBIDDEN`: Insufficient permissions
-    `NOT_FOUND`: Resource not found
-    `RATE_LIMITED`: Too many requests
-    `SUBSCRIPTION_REQUIRED`: Subscription required for this action
-    `USAGE_LIMIT_EXCEEDED`: Usage limit exceeded
-    `PAYMENT_FAILED`: Payment processing failed
-    `SERVER_ERROR`: Internal server error

## Rate Limiting

-    Free Plan: 100 requests/hour
-    Pro Plan: 1000 requests/hour
-    Enterprise Plan: 10000 requests/hour

Rate limit headers:

```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1640995200
```
