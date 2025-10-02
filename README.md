IdeaBoard is a two-part web application: a responsive marketing landing page and a mini-app to post and upvote ideas.

## Stack
- Next.js (App Router, TypeScript)
- Tailwind CSS
- Prisma ORM + PostgreSQL
- Docker + docker-compose

## Running with Docker Compose

1. The compose file injects `DATABASE_URL` for local dev. You can also create an `.env` and override it:
```
DATABASE_URL=postgresql://postgres:postgres@db:5432/ideaboard?schema=public
```
2. Build and start services:
```
docker compose up --build
```
3. Run database migrations inside the `web` container (first boot only):
```
docker compose exec web npx prisma migrate deploy
```
4. Open `http://localhost:3000` for the landing page. The app lives at `/app`.

### Prerequisites
- Docker Desktop (with Compose v2)
- Ports 3000 and 5432 available locally

### Environment Variables
- `DATABASE_URL` must point to Postgres. The compose files provide a default. To override, create `.env` at repo root:
```
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/ideaboard?schema=public
```

### Database Migrations (production-friendly)
- Generate and apply migrations in dev, then deploy them:
```
# Dev: create first migration
docker compose -f docker-compose.dev.yml exec web npx prisma migrate dev --name init

# Prod/CI: apply migrations
docker compose exec web npx prisma migrate deploy
```

## API Endpoints
- `GET /api/ideas` — list ideas (newest first)
- `POST /api/ideas` — create idea `{ text: string }`
- `POST /api/ideas/:id/upvote` — increment upvote

Request/response examples:
```
# Create
curl -X POST -H 'Content-Type: application/json' \
  -d '{"text":"My idea"}' http://localhost:3000/api/ideas

# List
curl http://localhost:3000/api/ideas

# Upvote
curl -X POST http://localhost:3000/api/ideas/<ID>/upvote
```

## Development (without Docker)
```
npm install
echo "DATABASE_URL=postgresql://postgres:postgres@localhost:5432/ideaboard?schema=public" > .env
npx prisma migrate dev --name init
npm run dev
```

Common scripts:
```
npm run prisma:generate
npm run prisma:migrate
npm run prisma:deploy
```

## Development with Docker Compose Watch
```
docker compose -f docker-compose.dev.yml up -d
docker compose -f docker-compose.dev.yml watch
```
- Edits sync to the container and Next.js reloads automatically.
- Changing `package.json` triggers an automatic image rebuild.

### Reseeding local data
- Seed script (kept separate and safe to re-run):
```
docker compose -f docker-compose.dev.yml exec web node prisma/seed.js
```
- Refresh the app: `http://localhost:3000/app` to see example ideas.

### Restarting Watch cleanly
If you see a lock error like "cannot take exclusive lock for project ...":
```
cd idea-board-app
docker compose -f docker-compose.dev.yml down
docker compose -f docker-compose.dev.yml up -d
docker compose -f docker-compose.dev.yml watch
```

## Production build locally (Docker)
```
docker compose up -d --build
# Apply migrations if not yet applied
docker compose exec web npx prisma migrate deploy
```

## Troubleshooting
- 500 on `/api/ideas`: ensure schema is applied:
```
docker compose exec web npx prisma db push
```
- Database connection errors: confirm Postgres is running, and `DATABASE_URL` matches compose service name (`db`) when inside containers.
- Port already in use: change host port mapping in the compose file (`3000:3000`, `5432:5432`).

## Notes / Trade-offs
- Polling every 5s for a "live" feel; can be upgraded to websockets.
- Simple schema and REST API for speed; GraphQL is possible.
- Production image uses Next.js standalone output.

## Repository Structure
```
.
├─ src/
│  ├─ app/
│  ├─ components/
│  └─ lib/
├─ prisma/
├─ k8s/
├─ Dockerfile
└─ docker-compose.yml
```

## Deployment Notes
- Build the production image: `docker build -t ideaboard-web .`
- Push and update the Kubernetes `image` field before applying manifests.
- Apply manifests: `kubectl apply -f k8s/` (requires an Ingress controller).
