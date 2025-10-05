# discord_bot

Minimal Go app scaffold for a Discord bot with Postgres and hot-reload via Air, runnable locally using Docker Compose.

## Prerequisites
- Docker Desktop or Docker Engine + Compose V2

## Quick Start
1. Copy environment file:
   - `cp .env.example .env`
   - Optionally set `DISCORD_BOT_TOKEN` if you want to connect to Discord locally (not required to boot the app).
2. Start services:
   - `docker compose up --build`
3. Verify the app is running:
   - Open `http://localhost:8080/healthz` → should return `ok`.
4. Open pgAdmin:
   - Go to `http://localhost:5050` (email: `admin@example.com`, password: `admin` by default)
   - Add a new server:
     - Name: `Local DB`
     - Host: `db`
     - Port: `5432`
     - Username: `app`
     - Password: `app`

## Services
- App (Go 1.22)
  - Hot reload via Air. Source changes under the project directory trigger rebuild and restart in the container.
  - HTTP health endpoint at `/healthz`.
- Postgres (16-alpine)
  - Database name/user/password loaded from `.env`.
  - Data persisted in the `pgdata` Docker volume.

## Environment
See `.env.example` for defaults. Key variables:
- `APP_PORT` (default: 8080)
- `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `DB_SSLMODE`
- `DISCORD_BOT_TOKEN` (optional)
 - `PGADMIN_DEFAULT_EMAIL`, `PGADMIN_DEFAULT_PASSWORD`, `PGADMIN_PORT` (pgAdmin)

## Project Structure
- `cmd/bot/` – application entrypoint
- `internal/db/` – database configuration (GORM)
- `internal/models/` – data models (e.g., `ActionItem`)

## Migrations
On startup, the app auto-migrates the `ActionItem` model using GORM.

## Stopping
`Ctrl+C` to stop; containers can be removed with `docker compose down`.

