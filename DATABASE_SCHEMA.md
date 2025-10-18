# Ximler Database Schema

## Users Table

```sql
CREATE TABLE users (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    avatar_url VARCHAR(500),
    email_verified BOOLEAN DEFAULT FALSE,
    email_verification_token VARCHAR(255),
    password_reset_token VARCHAR(255),
    password_reset_expires TIMESTAMP,
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,

    INDEX idx_email (email),
    INDEX idx_email_verification_token (email_verification_token),
    INDEX idx_password_reset_token (password_reset_token)
);
```

## Subscriptions Table

```sql
CREATE TABLE subscriptions (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    plan_id VARCHAR(50) NOT NULL,
    status ENUM('active', 'cancelled', 'expired', 'past_due') NOT NULL,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP,
    auto_renew BOOLEAN DEFAULT TRUE,
    price DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    stripe_subscription_id VARCHAR(255),
    stripe_customer_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_stripe_subscription_id (stripe_subscription_id),
    INDEX idx_status (status)
);
```

## Plans Table

```sql
CREATE TABLE plans (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    interval ENUM('month', 'year') NOT NULL,
    features JSON,
    limits JSON,
    stripe_price_id VARCHAR(255),
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    INDEX idx_active (active),
    INDEX idx_stripe_price_id (stripe_price_id)
);
```

## Usage Table

```sql
CREATE TABLE usage (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    resource_type ENUM('projects', 'storage', 'api_calls') NOT NULL,
    amount DECIMAL(15,6) NOT NULL,
    period_start TIMESTAMP NOT NULL,
    period_end TIMESTAMP NOT NULL,
    metadata JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_resource_period (user_id, resource_type, period_start),
    INDEX idx_period (period_start, period_end)
);
```

## Projects Table

```sql
CREATE TABLE projects (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    settings JSON,
    canvas_data JSON,
    storage_size DECIMAL(15,6) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,

    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_created_at (created_at),
    INDEX idx_deleted_at (deleted_at)
);
```

## Payments Table

```sql
CREATE TABLE payments (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    subscription_id VARCHAR(36),
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    status ENUM('pending', 'paid', 'failed', 'refunded') NOT NULL,
    description VARCHAR(500),
    stripe_payment_intent_id VARCHAR(255),
    stripe_invoice_id VARCHAR(255),
    invoice_url VARCHAR(500),
    paid_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (subscription_id) REFERENCES subscriptions(id) ON DELETE SET NULL,
    INDEX idx_user_id (user_id),
    INDEX idx_subscription_id (subscription_id),
    INDEX idx_status (status),
    INDEX idx_stripe_payment_intent_id (stripe_payment_intent_id)
);
```

## API Keys Table

```sql
CREATE TABLE api_keys (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    name VARCHAR(255) NOT NULL,
    key_hash VARCHAR(255) NOT NULL,
    permissions JSON,
    last_used TIMESTAMP NULL,
    expires_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    revoked_at TIMESTAMP NULL,

    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_key_hash (key_hash),
    INDEX idx_revoked_at (revoked_at)
);
```

## Notifications Table

```sql
CREATE TABLE notifications (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    type ENUM('billing', 'security', 'product', 'system') NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    read_at TIMESTAMP NULL,
    metadata JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_type (type),
    INDEX idx_read_at (read_at),
    INDEX idx_created_at (created_at)
);
```

## User Settings Table

```sql
CREATE TABLE user_settings (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    notification_settings JSON,
    privacy_settings JSON,
    preferences JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_settings (user_id)
);
```

## Coupons Table

```sql
CREATE TABLE coupons (
    id VARCHAR(36) PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    type ENUM('percentage', 'fixed') NOT NULL,
    value DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    max_uses INTEGER,
    used_count INTEGER DEFAULT 0,
    valid_from TIMESTAMP NOT NULL,
    valid_until TIMESTAMP NOT NULL,
    applicable_plans JSON,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    INDEX idx_code (code),
    INDEX idx_active (active),
    INDEX idx_valid_period (valid_from, valid_until)
);
```

## Coupon Usage Table

```sql
CREATE TABLE coupon_usage (
    id VARCHAR(36) PRIMARY KEY,
    coupon_id VARCHAR(36) NOT NULL,
    user_id VARCHAR(36) NOT NULL,
    subscription_id VARCHAR(36),
    discount_amount DECIMAL(10,2) NOT NULL,
    used_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (coupon_id) REFERENCES coupons(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (subscription_id) REFERENCES subscriptions(id) ON DELETE SET NULL,
    INDEX idx_coupon_id (coupon_id),
    INDEX idx_user_id (user_id),
    INDEX idx_subscription_id (subscription_id)
);
```

## Audit Logs Table

```sql
CREATE TABLE audit_logs (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36),
    action VARCHAR(100) NOT NULL,
    resource_type VARCHAR(50),
    resource_id VARCHAR(36),
    old_values JSON,
    new_values JSON,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_user_id (user_id),
    INDEX idx_action (action),
    INDEX idx_resource (resource_type, resource_id),
    INDEX idx_created_at (created_at)
);
```

## Rate Limiting Table

```sql
CREATE TABLE rate_limits (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36),
    api_key_id VARCHAR(36),
    endpoint VARCHAR(255) NOT NULL,
    requests_count INTEGER DEFAULT 1,
    window_start TIMESTAMP NOT NULL,
    window_end TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (api_key_id) REFERENCES api_keys(id) ON DELETE CASCADE,
    UNIQUE KEY unique_rate_limit (user_id, api_key_id, endpoint, window_start),
    INDEX idx_window (window_start, window_end)
);
```

## Sample Data Insertion

### Insert Default Plans

```sql
INSERT INTO plans (id, name, description, price, currency, interval, features, limits, active) VALUES
('free', 'Free', 'Perfect for hobbyists and small projects', 0, 'USD', 'month',
 '["Basic 2D drawing tools", "Limited shape storage", "Community support", "Standard performance"]',
 '{"projects": 5, "storage": 1, "apiCalls": 1000}', TRUE),

('pro', 'Pro', 'Ideal for professional developers and small teams', 29, 'USD', 'month',
 '["All Free features", "Advanced 2D drawing tools", "Unlimited shape storage", "Email support", "High performance", "Basic map integration", "2.5D isometric view", "Architectural grid system"]',
 '{"projects": 100, "storage": 50, "apiCalls": 100000}', TRUE),

('enterprise', 'Enterprise', 'Tailored solutions for large organizations', 99, 'USD', 'month',
 '["All Pro features", "Custom feature development", "Dedicated support manager", "On-premise deployment options", "Advanced 3D rendering", "Real-time collaboration", "SLA and priority support"]',
 '{"projects": -1, "storage": 500, "apiCalls": 1000000}', TRUE);
```

### Insert Sample Coupons

```sql
INSERT INTO coupons (id, code, name, description, type, value, max_uses, valid_from, valid_until, active) VALUES
('welcome20', 'WELCOME20', 'Welcome Discount', '20% off for new users', 'percentage', 20, 1000, '2024-01-01 00:00:00', '2024-12-31 23:59:59', TRUE),
('student50', 'STUDENT50', 'Student Discount', '50% off for students', 'percentage', 50, 500, '2024-01-01 00:00:00', '2024-12-31 23:59:59', TRUE),
('firstmonth', 'FIRSTMONTH', 'First Month Free', 'First month free for Pro plan', 'fixed', 29, 2000, '2024-01-01 00:00:00', '2024-12-31 23:59:59', TRUE);
```

## Database Indexes for Performance

### Additional Performance Indexes

```sql
-- Composite indexes for common queries
CREATE INDEX idx_users_email_active ON users(email, deleted_at);
CREATE INDEX idx_subscriptions_user_status ON subscriptions(user_id, status);
CREATE INDEX idx_projects_user_updated ON projects(user_id, updated_at);
CREATE INDEX idx_payments_user_status ON payments(user_id, status);
CREATE INDEX idx_usage_user_resource ON usage(user_id, resource_type);
CREATE INDEX idx_notifications_user_unread ON notifications(user_id, read_at);

-- Full-text search indexes
CREATE FULLTEXT INDEX idx_projects_search ON projects(name, description);
CREATE FULLTEXT INDEX idx_users_search ON users(name, email);
```

## Database Views for Analytics

### User Analytics View

```sql
CREATE VIEW user_analytics AS
SELECT
    u.id,
    u.name,
    u.email,
    u.created_at,
    s.plan_id,
    s.status as subscription_status,
    COUNT(p.id) as project_count,
    SUM(p.storage_size) as total_storage,
    MAX(p.updated_at) as last_project_update
FROM users u
LEFT JOIN subscriptions s ON u.id = s.user_id AND s.status = 'active'
LEFT JOIN projects p ON u.id = p.user_id AND p.deleted_at IS NULL
GROUP BY u.id, u.name, u.email, u.created_at, s.plan_id, s.status;
```

### Usage Analytics View

```sql
CREATE VIEW usage_analytics AS
SELECT
    u.id as user_id,
    u.name,
    s.plan_id,
    SUM(CASE WHEN us.resource_type = 'projects' THEN us.amount ELSE 0 END) as total_projects,
    SUM(CASE WHEN us.resource_type = 'storage' THEN us.amount ELSE 0 END) as total_storage,
    SUM(CASE WHEN us.resource_type = 'api_calls' THEN us.amount ELSE 0 END) as total_api_calls,
    COUNT(DISTINCT us.resource_type) as resource_types_used
FROM users u
LEFT JOIN subscriptions s ON u.id = s.user_id AND s.status = 'active'
LEFT JOIN usage us ON u.id = us.user_id
WHERE us.created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
GROUP BY u.id, u.name, s.plan_id;
```
