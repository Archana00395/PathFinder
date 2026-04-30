# PATHFINDERS Backend

This backend turns the current React-only prototype into a structured API for:

- authentication
- onboarding/profile storage
- personality quiz delivery and scoring
- AI counselling chat sessions
- recommendation generation
- roadmap retrieval
- dashboard aggregation

## Stack

- Node.js
- Express
- TypeScript
- JWT auth
- In-memory repositories by default

The repository layer is intentionally isolated so you can swap it to MongoDB or Firestore later without changing the controllers or route contracts.

## Run

1. Install dependencies:

```bash
cd backend
npm install
```

If PowerShell blocks `npm` with an execution-policy error, use:

```powershell
npm.cmd install
```

2. Copy `.env.example` to `.env` and set at least `JWT_SECRET`.

3. Start the server:

```bash
npm run dev
```

If you are using PowerShell and hit the same issue, run:

```powershell
npm.cmd run dev
```

The API will start on `http://localhost:4000` by default.

## Frontend Connection

Recommended frontend env:

```bash
VITE_API_BASE_URL=http://localhost:4000/api
```

## Route Map

### Auth

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/auth/me`

### Profile

- `GET /api/profile/me`
- `PUT /api/profile/me`

### Quiz

- `GET /api/quiz/questions`
- `POST /api/quiz/submit`
- `GET /api/quiz/result`

### Chat

- `POST /api/chat/session`
- `GET /api/chat/session/current`
- `POST /api/chat/session/current/messages`

### Recommendations

- `POST /api/recommendations/generate`
- `GET /api/recommendations/latest`

### Roadmaps

- `GET /api/roadmaps/:careerId`

### Dashboard

- `GET /api/dashboard/overview`

## Notes

- If `GEMINI_API_KEY` is configured, the chat service attempts a Gemini `generateContent` API call.
- If no API key is present, the app falls back to a deterministic career counsellor response engine so development still works offline.
- The current frontend still uses localStorage. This backend now gives you a clean migration target.
