import { careerCatalog } from "../constants/careerCatalog";
import { db } from "../repositories/inMemoryDb";
import {
  CareerCatalogEntry,
  CareerRecommendation,
  PersonalityScores,
  RecommendationSnapshotRecord,
  UserRecord,
} from "../types/domain";
import { AppError } from "../utils/appError";
import { createId } from "../utils/id";

const normalizeInterests = (interests: string[]) => interests.map((item) => item.trim().toLowerCase());

const keywordBoosts: Record<string, string[]> = {
  "data-scientist": ["data", "analysis", "analytics", "machine learning", "research"],
  "ux-designer": ["design", "user experience", "ui", "ux", "creative", "visual"],
  "product-manager": ["leadership", "product", "strategy", "startup", "team"],
  "software-engineer": ["coding", "software", "developer", "backend", "frontend", "technology"],
  "digital-marketer": ["marketing", "content", "social media", "brand", "campaign"],
};

const personalityScoreForCareer = (
  scores: PersonalityScores,
  career: CareerCatalogEntry,
) => {
  return (
    scores.analytical * career.weights.analytical +
    scores.creative * career.weights.creative +
    scores.social * career.weights.social +
    scores.practical * career.weights.practical
  );
};

const interestScoreForCareer = (interests: string[], career: CareerCatalogEntry) => {
  const normalized = normalizeInterests(interests);
  const matches = career.interestTags.filter((tag) => normalized.includes(tag.toLowerCase())).length;
  return matches * 8;
};

const conversationScoreForCareer = (conversation: string, career: CareerCatalogEntry) => {
  const normalizedConversation = conversation.toLowerCase();
  const keywords = keywordBoosts[career.id] ?? [];
  return keywords.reduce((score, keyword) => {
    return normalizedConversation.includes(keyword) ? score + 4 : score;
  }, 0);
};

const careerIntentScore = (careerIntent?: string, career?: CareerCatalogEntry) => {
  if (!careerIntent || !career) {
    return 0;
  }

  if (careerIntent === "switching") {
    return ["product-manager", "digital-marketer", "ux-designer"].includes(career.id) ? 5 : 2;
  }

  if (careerIntent === "exploring") {
    return 4;
  }

  return ["software-engineer", "data-scientist"].includes(career.id) ? 4 : 2;
};

const buildWhyItFits = (user: UserRecord, career: CareerCatalogEntry, matchPercentage: number) => {
  const topInterest = user.profile?.interests?.[0];
  const strongestTrait = Object.entries(user.personalityScores ?? {})
    .sort(([, left], [, right]) => Number(right) - Number(left))[0]?.[0];

  const reasonParts = [
    strongestTrait
      ? `Your ${strongestTrait} profile gives you a strong base for this path.`
      : "Your quiz and onboarding signals align well with this path.",
    topInterest ? `Your interest in ${topInterest} also reinforces the fit.` : "",
    `Overall match score: ${matchPercentage}%.`,
  ].filter(Boolean);

  return reasonParts.join(" ");
};

export const recommendationService = {
  generate(userId: string) {
    const user = db.users.get(userId);
    if (!user) {
      throw new AppError("User not found.", 404);
    }

    if (!user.profile || !user.personalityScores) {
      throw new AppError("Profile and quiz must be completed before generating recommendations.", 400);
    }

    const activeChatSession = user.currentChatSessionId
      ? db.chatSessions.get(user.currentChatSessionId)
      : undefined;
    const conversationText = activeChatSession?.messages.map((item) => item.content).join(" ") ?? "";

    const recommendations = careerCatalog
      .map((career) => {
        const totalScore =
          personalityScoreForCareer(user.personalityScores!, career) +
          interestScoreForCareer(user.profile!.interests, career) +
          conversationScoreForCareer(conversationText, career) +
          careerIntentScore(user.profile?.careerIntent, career);

        const matchPercentage = Math.max(45, Math.min(98, Math.round(totalScore)));

        const recommendation: CareerRecommendation = {
          careerId: career.id,
          title: career.title,
          description: career.description,
          matchPercentage,
          whySuitsYou: buildWhyItFits(user, career, matchPercentage),
          requiredSkills: career.requiredSkills,
          pros: career.pros,
          cons: career.cons,
          alternatives: career.alternatives,
        };

        return recommendation;
      })
      .sort((left, right) => right.matchPercentage - left.matchPercentage)
      .slice(0, 5);

    const snapshot: RecommendationSnapshotRecord = {
      id: createId(),
      userId,
      chatSessionId: activeChatSession?.id,
      recommendations,
      createdAt: new Date().toISOString(),
    };

    db.recommendations.set(snapshot.id, snapshot);
    user.latestRecommendationSnapshotId = snapshot.id;
    user.updatedAt = snapshot.createdAt;
    db.users.set(user.id, user);

    return snapshot;
  },

  getLatest(userId: string) {
    const user = db.users.get(userId);
    if (!user) {
      throw new AppError("User not found.", 404);
    }

    if (!user.latestRecommendationSnapshotId) {
      return null;
    }

    return db.recommendations.get(user.latestRecommendationSnapshotId) ?? null;
  },
};
