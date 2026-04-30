import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface UserData {
    name: string;
    email: string;
    age?: number;
    class?: string;
    stream?: string;
    interests?: string[];
    careerGoal?: string;
    personalityScores?: {
        analytical: number;
        creative: number;
        social: number;
        practical: number;
    };
    quizCompleted?: boolean;
    recommendations?: CareerRecommendation[];
    chatHistory?: ChatMessage[];
}

export interface CareerRecommendation {
    id: string;
    title: string;
    matchPercentage: number;
    whySuitsYou: string;
    requiredSkills: string[];
    pros: string[];
    cons: string[];
    alternatives: string[];
    description: string;
}

export interface ChatMessage {
    role: "user" | "assistant";
    content: string;
    timestamp: number;
}

interface UserContextType {
    user: UserData | null;
    isAuthenticated: boolean;
    login: (email: string, name: string) => void;
    signup: (email: string, name: string, password: string) => void;
    logout: () => void;
    updateUser: (data: Partial<UserData>) => void;
    addChatMessage: (message: ChatMessage) => void;
    saveRecommendations: (recommendations: CareerRecommendation[]) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserData | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Load user from localStorage
        const storedUser = localStorage.getItem("careerCounselUser");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            setIsAuthenticated(true);
        }
    }, []);

    const login = (email: string, name: string) => {
        const userData: UserData = { email, name };
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem("careerCounselUser", JSON.stringify(userData));
    };

    const signup = (email: string, name: string, password: string) => {
        const userData: UserData = { email, name };
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem("careerCounselUser", JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem("careerCounselUser");
    };

    const updateUser = (data: Partial<UserData>) => {
        const updatedUser = { ...user, ...data } as UserData;
        setUser(updatedUser);
        localStorage.setItem("careerCounselUser", JSON.stringify(updatedUser));
    };

    const addChatMessage = (message: ChatMessage) => {
        const updatedUser = {
            ...user,
            chatHistory: [...(user?.chatHistory || []), message],
        } as UserData;
        setUser(updatedUser);
        localStorage.setItem("careerCounselUser", JSON.stringify(updatedUser));
    };

    const saveRecommendations = (recommendations: CareerRecommendation[]) => {
        const updatedUser = {
            ...user,
            recommendations,
        } as UserData;
        setUser(updatedUser);
        localStorage.setItem("careerCounselUser", JSON.stringify(updatedUser));
    };

    return (
        <UserContext.Provider
            value={{
                user,
                isAuthenticated,
                login,
                signup,
                logout,
                updateUser,
                addChatMessage,
                saveRecommendations,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};