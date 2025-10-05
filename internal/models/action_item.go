package models

import "time"

// ActionItem represents a tracked task from Discord messages
type ActionItem struct {
	ID         uint       `gorm:"primaryKey"`
	Title      string     `gorm:"type:text;not null"`
	DueAt      *time.Time `gorm:"index"`
	Status     string     `gorm:"type:varchar(32);default:'pending';index"`
	NotifiedAt *time.Time
	CreatedAt  time.Time
	UpdatedAt  time.Time
}

func (ActionItem) TableName() string { return "action_items" }
