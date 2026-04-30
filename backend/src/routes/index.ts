import { Router } from "express";
import { authRouter } from "./auth.routes";
import { chatRouter } from "./chat.routes";
import { dashboardRouter } from "./dashboard.routes";
import { profileRouter } from "./profile.routes";
import { quizRouter } from "./quiz.routes";
import { recommendationRouter } from "./recommendation.routes";
import { roadmapRouter } from "./roadmap.routes";

export const apiRouter = Router();

apiRouter.get("/health", (_request, response) => {
  response.json({
    success: true,
    data: {
      name: "PATHFINDERS backend",
      status: "ok",
      timestamp: new Date().toISOString(),
    },
  });
});

apiRouter.use("/auth", authRouter);
apiRouter.use("/profile", profileRouter);
apiRouter.use("/quiz", quizRouter);
apiRouter.use("/chat", chatRouter);
apiRouter.use("/recommendations", recommendationRouter);
apiRouter.use("/roadmaps", roadmapRouter);
apiRouter.use("/dashboard", dashboardRouter);
