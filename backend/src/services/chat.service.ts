import { env } from "../config/env";
import { db } from "../repositories/inMemoryDb";
import { ChatMessage, ChatSessionRecord, UserRecord } from "../types/domain";
import { AppError } from "../utils/appError";
import { createId } from "../utils/id";
import { personalitySummary } from "../utils/personality";

const introMessage = (user: UserRecord) =>
  `Hi ${user.name}! I'm your PATHFINDERS AI counsellor. ${personalitySummary(
    user.personalityScores,
  )} Tell me what you want most from your future career so I can guide you clearly.`;

const fallbackReply = (user: UserRecord, session: ChatSessionRecord, message: string) => {
  const step = Math.floor(session.messages.filter((item) => item.role === "user").length / 2);
  const interestList = user.profile?.interests?.slice(0, 2).join(" and ");

  const prompts = [
    `That helps. ${interestList ? `I can already see a link to ${interestList}.` : ""} What kind of work energizes you more: creating, solving, leading, or helping?`,
    "Good signal. What matters most to you right now: stability, creativity, impact, income growth, or flexibility?",
    "Nice. Tell me about the environment you imagine for yourself: independent work, collaborative teams, or leading people?",
    "That gives me a much better picture. Are there industries you feel drawn to already, even if you're not fully sure yet?",
    "You're building a solid profile. One last piece: how comfortable are you with continuous learning and adapting to new tools or technology?",
  ];

  const readyForRecommendations = session.messages.filter((item) => item.role === "user").length >= 4;
  const reply =
    prompts[Math.min(step, prompts.length - 1)] +
    (readyForRecommendations
      ? " I now have enough context to generate tailored recommendations whenever you're ready."
      : "");

  if (message.toLowerCase().includes("confused")) {
    return `That's completely normal. Career confusion usually means you haven't had enough structured input yet, not that you're behind. ${reply}`;
  }

  return reply;
};

const callGemini = async (user: UserRecord, session: ChatSessionRecord) => {
  if (!env.geminiApiKey) {
    return null;
  }

  const transcript = session.messages
    .slice(-8)
    .map((item) => `${item.role.toUpperCase()}: ${item.content}`)
    .join("\n");

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${env.geminiModel}:generateContent`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": env.geminiApiKey,
      },
      body: JSON.stringify({
        system_instruction: {
          parts: [
            {
              text: "You are a professional, empathetic career counsellor for students and early professionals. Ask one focused follow-up at a time, explain things clearly, and keep replies concise but thoughtful. If enough information is available, say that recommendations can now be generated.",
            },
          ],
        },
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `User profile: ${JSON.stringify(user.profile ?? {})}\nPersonality: ${personalitySummary(
                  user.personalityScores,
                )}\nRecent transcript:\n${transcript}`,
              },
            ],
          },
        ],
        generationConfig: {
          responseMimeType: "text/plain",
          temperature: 0.7,
        },
      }),
    },
  );

  if (!response.ok) {
    return null;
  }

  const data = (await response.json()) as {
    candidates?: Array<{
      content?: {
        parts?: Array<{ text?: string }>;
      };
    }>;
  };

  const text = data.candidates?.[0]?.content?.parts
    ?.map((item) => item.text?.trim())
    .filter((item): item is string => Boolean(item))
    .join("\n")
    .trim();

  return text || null;
};

export const chatService = {
  createSession(userId: string) {
    const user = db.users.get(userId);
    if (!user) {
      throw new AppError("User not found.", 404);
    }

    const now = new Date().toISOString();
    const assistantMessage: ChatMessage = {
      id: createId(),
      role: "assistant",
      content: introMessage(user),
      createdAt: now,
    };

    const session: ChatSessionRecord = {
      id: createId(),
      userId,
      messages: [assistantMessage],
      summary: "Session started",
      readyForRecommendations: false,
      createdAt: now,
      updatedAt: now,
    };

    user.currentChatSessionId = session.id;
    user.updatedAt = now;
    db.users.set(user.id, user);
    db.chatSessions.set(session.id, session);

    return session;
  },

  getCurrentSession(userId: string) {
    const user = db.users.get(userId);
    if (!user) {
      throw new AppError("User not found.", 404);
    }

    if (!user.currentChatSessionId) {
      return this.createSession(userId);
    }

    const session = db.chatSessions.get(user.currentChatSessionId);
    if (!session) {
      return this.createSession(userId);
    }

    return session;
  },

  async addMessage(userId: string, content: string) {
    const user = db.users.get(userId);
    if (!user) {
      throw new AppError("User not found.", 404);
    }

    const session = this.getCurrentSession(userId);
    const timestamp = new Date().toISOString();
    const userMessage: ChatMessage = {
      id: createId(),
      role: "user",
      content: content.trim(),
      createdAt: timestamp,
    };

    session.messages.push(userMessage);
    session.updatedAt = timestamp;

    const geminiReply = await callGemini(user, session).catch(() => null);
    const assistantReplyText = geminiReply ?? fallbackReply(user, session, content);
    const readyForRecommendations = session.messages.filter((item) => item.role === "user").length >= 4;

    const assistantMessage: ChatMessage = {
      id: createId(),
      role: "assistant",
      content: assistantReplyText,
      createdAt: new Date().toISOString(),
    };

    session.messages.push(assistantMessage);
    session.readyForRecommendations = readyForRecommendations;
    session.summary = session.messages
      .filter((item) => item.role !== "system")
      .slice(-6)
      .map((item) => `${item.role}: ${item.content}`)
      .join(" | ");
    session.updatedAt = assistantMessage.createdAt;

    db.chatSessions.set(session.id, session);

    return {
      session,
      reply: assistantMessage,
      readyForRecommendations,
    };
  },
};
