package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	appdb "discord_bot/internal/db"
	"discord_bot/internal/discordapp"
	"discord_bot/internal/models"
)

func main() {
	ctx, stop := signal.NotifyContext(context.Background(), syscall.SIGINT, syscall.SIGTERM)
	defer stop()

	// Database
	dbCfg := appdb.LoadConfigFromEnv()
	gormDB, err := appdb.OpenGorm(ctx, dbCfg)
	if err != nil {
		log.Fatalf("failed to connect database: %v", err)
	}
	if err := gormDB.AutoMigrate(&models.ActionItem{}); err != nil {
		log.Fatalf("failed to run migrations: %v", err)
	}
	log.Println("database connected and migrated")

	// Discord session (optional for now)
	token := os.Getenv("DISCORD_BOT_TOKEN")
	if token != "" {
		sess, err := discordapp.NewSession(token)
		if err != nil {
			log.Fatalf("failed to create discord session: %v", err)
		}
		if err := sess.Open(); err != nil {
			log.Fatalf("failed to open discord session: %v", err)
		}
		defer sess.Close()
		log.Println("discord session opened")
	} else {
		log.Println("DISCORD_BOT_TOKEN not set; starting without Discord connection")
	}

	// Health server
	mux := http.NewServeMux()
	mux.HandleFunc("/healthz", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		_, _ = w.Write([]byte("ok"))
	})

	port := os.Getenv("APP_PORT")
	if port == "" {
		port = "8080"
	}

	srv := &http.Server{Addr: ":" + port, Handler: mux}

	go func() {
		log.Printf("http server listening on :%s", port)
		if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("http server error: %v", err)
		}
	}()

	// Wait for shutdown signal
	<-ctx.Done()
	log.Println("shutting down...")
	shutdownCtx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	if err := srv.Shutdown(shutdownCtx); err != nil {
		log.Printf("server shutdown error: %v", err)
	}
	log.Println("goodbye")
}
