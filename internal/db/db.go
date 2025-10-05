package db

import (
	"context"
	"fmt"
	"os"
	"time"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

type Config struct {
	Host    string
	Port    string
	User    string
	Pass    string
	Name    string
	SSLMode string
}

func LoadConfigFromEnv() Config {
	return Config{
		Host:    getenv("DB_HOST", "localhost"),
		Port:    getenv("DB_PORT", "5432"),
		User:    getenv("DB_USER", "app"),
		Pass:    getenv("DB_PASSWORD", "app"),
		Name:    getenv("DB_NAME", "discord_bot"),
		SSLMode: getenv("DB_SSLMODE", "disable"),
	}
}

func OpenGorm(ctx context.Context, cfg Config) (*gorm.DB, error) {
	dsn := fmt.Sprintf(
		"host=%s port=%s user=%s password=%s dbname=%s sslmode=%s TimeZone=UTC",
		cfg.Host, cfg.Port, cfg.User, cfg.Pass, cfg.Name, cfg.SSLMode,
	)

	gormCfg := &gorm.Config{Logger: logger.Default.LogMode(logger.Info)}
	db, err := gorm.Open(postgres.Open(dsn), gormCfg)
	if err != nil {
		return nil, err
	}

	sqlDB, err := db.DB()
	if err != nil {
		return nil, err
	}
	sqlDB.SetMaxIdleConns(5)
	sqlDB.SetMaxOpenConns(10)
	sqlDB.SetConnMaxLifetime(30 * time.Minute)

	// Verify connectivity with a context
	if err := sqlDB.PingContext(ctx); err != nil {
		return nil, err
	}
	return db, nil
}

func getenv(key, def string) string {
	v := os.Getenv(key)
	if v == "" {
		return def
	}
	return v
}
