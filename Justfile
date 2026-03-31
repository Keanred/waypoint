set shell := ["bash", "-eu", "-o", "pipefail", "-c"]

default:
    @just --list

env-init:
    @if [ -f .env ]; then \
        echo ".env already exists"; \
    elif [ -f .env.example ]; then \
        cp .env.example .env; \
        echo "Created .env from .env.example"; \
        echo "Edit POSTGRES_PASSWORD and DATABASE_URL before running dev."; \
    else \
        printf '%s\n' \
            'POSTGRES_USER=waypoint_user' \
            'POSTGRES_PASSWORD=waypoint_password' \
            'POSTGRES_DB=waypoint' \
            'POSTGRES_HOST=localhost' \
            'POSTGRES_PORT=5432' \
            'REMINDER_EMAIL_RECIPIENT=test@example.com' \
            'RESEND_API_KEY=test' \
            'DATABASE_URL_DEV=postgresql://waypoint_user:waypoint_password@localhost:5432/waypoint' \
            'DATABASE_URL_PROD=postgresql://waypoint_user:waypoint_password@localhost:5432/waypoint' > .env; \
        echo "Created .env with local development defaults"; \
    fi

install:
    npm install

build:
    npm run build --workspace=schemas
    npm run build --workspace=server
    npm run build --workspace=client

lint:
    npm run lint

format:
    npm run format

db-up: env-init
    docker compose --env-file .env up -d postgres

db-down:
    docker compose down

db-logs:
    docker compose logs -f postgres

db-wait: db-up
    @set -a; source .env; set +a; \
        for i in {1..30}; do \
            if docker compose --env-file .env exec -T postgres pg_isready -U "$POSTGRES_USER" -d "$POSTGRES_DB" >/dev/null 2>&1; then \
                echo "Postgres is healthy"; \
                break; \
            fi; \
            if [ "$i" -eq 30 ]; then \
                echo "Postgres did not become healthy in time"; \
                docker compose --env-file .env logs --tail=50 postgres; \
                exit 1; \
            fi; \
            sleep 2; \
        done

db-migrate: db-wait
    set -a; source .env; set +a; npm run build --workspace=schemas
    set -a; source .env; set +a; npm run db:migrate --workspace=server

db-generate: db-wait
    set -a; source .env; set +a; npm run db:generate --workspace=server

db-push: db-wait
    set -a; source .env; set +a; npm run db:push --workspace=server

dev: db-wait
    set -a; source .env; set +a; \
        server_port="${PORT:-3001}"; \
        bash scripts/startup-banner.sh; \
        cat server/src/db/seed.sql | docker compose --env-file .env exec -T postgres psql -v ON_ERROR_STOP=1 -U "$POSTGRES_USER" -d "$POSTGRES_DB"; \
        cleanup_seeded_entries() { \
            cat server/src/db/cleanup-seed.sql | docker compose --env-file .env exec -T postgres psql -v ON_ERROR_STOP=1 -U "$POSTGRES_USER" -d "$POSTGRES_DB" >/dev/null; \
            echo "Seeded task cleanup complete."; \
        }; \
        npm run dev --workspace=server & \
        server_pid=$!; \
        trap 'cleanup_seeded_entries; kill "$server_pid" >/dev/null 2>&1 || true' EXIT INT TERM; \
        npm run dev --workspace=client

typecheck:
    npm run typecheck --workspace=server

test: db-wait
    set -a; source .env; set +a; npm test --workspace=server
    npm test --workspace=client
