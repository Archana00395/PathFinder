import fs from "fs";
import path from "path";
import cors from "cors";
import express from "express";
import { env } from "./config/env";
import { errorHandler } from "./middlewares/errorHandler";
import { notFound } from "./middlewares/notFound";
import { apiRouter } from "./routes";

export const app = express();

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || !env.clientOrigin || env.clientOrigin === "*" || origin === env.clientOrigin) {
        callback(null, true);
        return;
      }

      callback(new Error("Origin not allowed by CORS."));
    },
  }),
);
app.use(express.json());

app.use("/api", apiRouter);

const frontendDistPath = path.resolve(__dirname, "..", "..", "frontend", "dist");
const frontendIndexPath = path.join(frontendDistPath, "index.html");

if (fs.existsSync(frontendIndexPath)) {
  app.use(express.static(frontendDistPath));

  app.get(/^\/(?!api).*/, (_req, res) => {
    res.sendFile(frontendIndexPath);
  });
}

app.use(notFound);
app.use(errorHandler);
