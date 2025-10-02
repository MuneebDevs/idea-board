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

## API Endpoints
- `GET /api/ideas` — list ideas (newest first)
- `POST /api/ideas` — create idea `{ text: string }`
- `POST /api/ideas/:id/upvote` — increment upvote

## Development (without Docker)
```
npm install
echo "DATABASE_URL=postgresql://postgres:postgres@localhost:5432/ideaboard?schema=public" > .env
npx prisma migrate dev --name init
npm run dev
```

## Development with Docker Compose Watch
```
docker compose -f docker-compose.dev.yml up -d
docker compose -f docker-compose.dev.yml watch
```
- Edits sync to the container and Next.js reloads automatically.
- Changing `package.json` triggers an automatic image rebuild.

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
