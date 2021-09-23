DC=docker-compose
MC=bot
UTC=unitary-test

all:start

init: ## Init the project after a git clone
	@echo "INIT PROJECT"
	@cp .env.dist .env

start: ## Build and launch the project in background
	@echo "Launch dettached projet and build\n"
	$(DC) up -d --build

clean: ## Stop and delete the project stack
	$(DC) down

logs: ## Attach to standard output of containers (to see logs)
	$(DC) -f docker-compose.yml logs -f $(MC)

re: clean start

exec: ## Execute command inside api container, need to use command=
	$(DC) exec $(MC) sh

migrate_new: ## Create new migrations inside /migrations folder, need to use name=
	$(DC) exec $(MC) ./node_modules/knex/bin/cli.js migrate:make $(name)

.DEFAULT_GOAL := start
