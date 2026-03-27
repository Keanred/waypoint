set shell := ["bash", "-eu", "-o", "pipefail", "-c"]

default:
    @just --list

env-init:
    @if [ -f .env.local ]; then \
      echo ".env.local already exists"; \
    else \
      cp .env.example .env.local; \
      echo "Created .env.local from .env.example"; \
      echo "Edit POSTGRES_PASSWORD and DATABASE_URL before running dev."; \
    fi

install:
    npm install

db-up: env-init
    docker compose --env-file .env.local up -d postgres

db-down:
    docker compose down

db-logs:
    docker compose logs -f postgres

dev: db-up
    set -a; source .env.local; set +a; npm run dev

typecheck:
    npm run typecheck --workspace=server

test:
    npm test
