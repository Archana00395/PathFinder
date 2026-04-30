export type UserCareerIntent = "confused" | "exploring" | "switching";
export type ChatRole = "system" | "assistant" | "user";

export interface PersonalityScores {
  analytical: number;
  creative: number;
  social: number;
  practical: number;
}

export interface TraitWeights {
  analytical: number;
  creative: number;
  social: number;
  practical: number;
}

export interface QuizOption {
  id: string;
  text: string;
  scores: PersonalityScores;
}

export interface QuizQuestion {
  id: string;
  prompt: string;
  options: QuizOption[];
}

export interface QuizAnswer {
  questionId: string;
  optionId: string;
}

export interface UserProfile {
  age: number;
  educationLevel: string;
  stream: string;
  interests: string[];
  careerIntent: UserCareerIntent;
}

export interface UserRecord {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  profile?: UserProfile;
  personalityScores?: PersonalityScores;
  quizCompletedAt?: string;
  currentChatSessionId?: string;
  latestRecommendationSnapshotId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface QuizResultRecord {
  id: string;
  userId: string;
  answers: QuizAnswer[];
  rawScores: PersonalityScores;
  normalizedScores: PersonalityScores;
  completedAt: string;
}

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  createdAt: string;
}

export interface ChatSessionRecord {
  id: string;
  userId: string;
  messages: ChatMessage[];
  summary: string;
  readyForRecommendations: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CareerCatalogEntry {
  id: string;
  title: string;
  description: string;
  weights: TraitWeights;
  interestTags: string[];
  requiredSkills: string[];
  pros: string[];
  cons: string[];
  alternatives: string[];
}

export interface CareerRecommendation {
  careerId: string;
  title: string;
  description: string;
  matchPercentage: number;
  whySuitsYou: string;
  requiredSkills: string[];
  pros: string[];
  cons: string[];
  alternatives: string[];
}

export interface RecommendationSnapshotRecord {
  id: string;
  userId: string;
  chatSessionId?: string;
  recommendations: CareerRecommendation[];
  createdAt: string;
}

export interface RoadmapItem {
  title: string;
  description: string;
  resources?: string[];
}

export interface RoadmapStage {
  phase: string;
  duration: string;
  items: RoadmapItem[];
}

export interface CareerRoadmap {
  careerId: string;
  title: string;
  overview: string;
  stages: RoadmapStage[];
}
