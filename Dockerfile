FROM node:20-bookworm-slim

WORKDIR /app

COPY backend/package*.json backend/
COPY frontend/package*.json frontend/

RUN npm --prefix backend ci
RUN npm --prefix frontend ci

COPY backend backend
COPY frontend frontend

ENV VITE_API_BASE_URL=/api

RUN npm --prefix frontend run build
RUN npm --prefix backend run build

ENV NODE_ENV=production
ENV PORT=7860

EXPOSE 7860

CMD ["node", "backend/dist/server.js"]
