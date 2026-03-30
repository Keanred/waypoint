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
    bash scripts/startup-banner.sh
    set -a; source .env.local; set +a; npm run dev 2>&1 | cat

typecheck:
    npm run typecheck --workspace=server

test: db-up
        @set -a; source .env.local; set +a; \
        for i in {1..30}; do \
            if docker compose --env-file .env.local exec -T postgres pg_isready -U "$$POSTGRES_USER" -d "$$POSTGRES_DB" >/dev/null 2>&1; then \
                echo "Postgres is healthy"; \
                break; \
            fi; \
            if [ "$$i" -eq 30 ]; then \
                echo "Postgres did not become healthy in time"; \
                docker compose --env-file .env.local logs --tail=50 postgres; \
                exit 1; \
            fi; \
            sleep 2; \
        done
        set -a; source .env.local; set +a; npm run test:workspaces
