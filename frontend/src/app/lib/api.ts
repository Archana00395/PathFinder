const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:4000/api";

let authToken: string | null = null;

export const setApiAuthToken = (token: string | null) => {
  authToken = token;
};

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface RequestOptions {
  method?: HttpMethod;
  body?: unknown;
  token?: string | null;
}

export interface ApiEnvelope<T> {
  success: boolean;
  data: T;
  message?: string;
}

export const apiRequest = async <T>(path: string, options: RequestOptions = {}) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: options.method ?? "GET",
    headers: {
      "Content-Type": "application/json",
      ...(options.token || authToken
        ? { Authorization: `Bearer ${options.token ?? authToken}` }
        : {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const payload = (await response.json()) as ApiEnvelope<T> | { success: false; message: string };

  if (!response.ok || !("success" in payload) || !payload.success) {
    const message = "message" in payload ? payload.message : "Request failed.";
    throw new Error(message);
  }

  return payload.data;
};

export const api = {
  signup: (body: { name: string; email: string; password: string }) =>
    apiRequest<{ token: string; user: unknown }>("/auth/signup", {
      method: "POST",
      body,
    }),
  login: (body: { email: string; password: string }) =>
    apiRequest<{ token: string; user: unknown }>("/auth/login", {
      method: "POST",
      body,
    }),
  getMe: () => apiRequest<unknown>("/auth/me"),
  getProfile: () => apiRequest<unknown>("/profile/me"),
  saveProfile: (body: {
    age: number;
    educationLevel: string;
    stream: string;
    interests: string[];
    careerIntent: string;
  }) =>
    apiRequest<unknown>("/profile/me", {
      method: "PUT",
      body,
    }),
  getQuizQuestions: () => apiRequest<unknown[]>("/quiz/questions"),
  submitQuiz: (body: { answers: Array<{ questionId: string; optionId: string }> }) =>
    apiRequest<unknown>("/quiz/submit", {
      method: "POST",
      body,
    }),
  getCurrentChat: () => apiRequest<unknown>("/chat/session/current"),
  startChat: () =>
    apiRequest<unknown>("/chat/session", {
      method: "POST",
    }),
  sendChatMessage: (message: string) =>
    apiRequest<unknown>("/chat/session/current/messages", {
      method: "POST",
      body: { message },
    }),
  generateRecommendations: () =>
    apiRequest<unknown>("/recommendations/generate", {
      method: "POST",
    }),
  getLatestRecommendations: () => apiRequest<unknown>("/recommendations/latest"),
  getRoadmap: (careerId: string) => apiRequest<unknown>(`/roadmaps/${careerId}`),
  getDashboard: () => apiRequest<unknown>("/dashboard/overview"),
};
