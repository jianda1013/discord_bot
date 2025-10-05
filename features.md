# Development Configuration

Language: Go
Database: postgres
ORM: GORM
Major Package: discordgo


# major feature:

- sumarizing TODO list and save it to the database
- notify when due date or due time
- the notification message from discord can marked as start, done, ignore or disable with buttons
- create a thread if pressing the button `start`

# Infrastructure

container base application for easy deploying to EKS


## Local development
: Docker Compose

- Application Container
  - app can auto reload when save
- Postgres for database
  - data are in volumns



# connecting to postgres db

- save the action item to the database
- check if any notification that not been notified or have been ignored


---

# below part is draft

# System Dashboard

- showing the configuration when reading specific terms: `/dashboard`

