init: down up
up:
	docker-compose -f docker-compose.dev.yaml up -d
down:
	docker-compose -f docker-compose.dev.yaml down -v --remove-orphans
build:
	docker-compose -f docker-compose.dev.yaml build