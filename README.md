---
title: PathFinders
emoji: "🧭"
colorFrom: red
colorTo: blue
sdk: docker
pinned: false
---

# PathFinders

PathFinders is a full-stack career guidance app with:

- a React + Vite frontend
- an Express + TypeScript backend
- authentication, onboarding, quiz, chat, recommendations, roadmaps, and dashboard APIs

This Space uses Docker. The container builds both the frontend and backend, then serves the built frontend from the backend on the Hugging Face Space port.

## Local structure

- `frontend/` contains the React client
- `backend/` contains the Express API

## Environment variables

Recommended Space secrets:

- `JWT_SECRET`
- `GEMINI_API_KEY` (optional)
- `GEMINI_MODEL` (optional)

If `GEMINI_API_KEY` is not set, the backend falls back to its deterministic offline counsellor response flow.
