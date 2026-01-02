<?php
// Database Schema Setup for My CV
require_once 'config.php';

try {
    $db = getDB();

    // Users Table
    $db->exec("
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255),
            name VARCHAR(255),
            google_id VARCHAR(255),
            avatar VARCHAR(500),
            token VARCHAR(255),
            token_expires TIMESTAMP,
            subscription_type VARCHAR(50) DEFAULT 'free',
            subscription_expires TIMESTAMP,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ");

    // CVs Table
    $db->exec("
        CREATE TABLE IF NOT EXISTS cvs (
            id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
            name VARCHAR(255) DEFAULT 'سيرتي الذاتية',
            template VARCHAR(50) DEFAULT 'modern',
            primary_color VARCHAR(20) DEFAULT '#6366f1',
            secondary_color VARCHAR(20) DEFAULT '#ec4899',
            font_family VARCHAR(100) DEFAULT 'Cairo',
            data JSONB NOT NULL DEFAULT '{}',
            is_default BOOLEAN DEFAULT false,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ");

    // Payments Table
    $db->exec("
        CREATE TABLE IF NOT EXISTS payments (
            id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
            payment_type VARCHAR(50) NOT NULL,
            amount DECIMAL(10,2) NOT NULL,
            currency VARCHAR(10) DEFAULT 'USD',
            payment_method VARCHAR(50),
            transaction_id VARCHAR(255),
            status VARCHAR(50) DEFAULT 'pending',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ");

    // Downloads Table
    $db->exec("
        CREATE TABLE IF NOT EXISTS downloads (
            id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
            cv_id INTEGER REFERENCES cvs(id) ON DELETE SET NULL,
            with_watermark BOOLEAN DEFAULT true,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ");

    // Purchases Table (for tracking purchases with coupons)
    $db->exec("
        CREATE TABLE IF NOT EXISTS purchases (
            id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
            plan VARCHAR(50) NOT NULL,
            amount DECIMAL(10,2) NOT NULL,
            original_amount DECIMAL(10,2),
            currency VARCHAR(10) DEFAULT 'SAR',
            payment_method VARCHAR(50),
            transaction_id VARCHAR(255),
            coupon_code VARCHAR(50),
            discount_amount DECIMAL(10,2) DEFAULT 0,
            status VARCHAR(50) DEFAULT 'completed',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ");

    // Coupon Usage Table
    $db->exec("
        CREATE TABLE IF NOT EXISTS coupon_usage (
            id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
            coupon_code VARCHAR(50) NOT NULL,
            purchase_id INTEGER REFERENCES purchases(id) ON DELETE SET NULL,
            discount_applied DECIMAL(10,2),
            used_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ");

    echo json_encode(['success' => true, 'message' => 'Database schema created successfully']);

} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
