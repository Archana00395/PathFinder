import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { useUser } from "../contexts/UserContext";
import {
    User,
    MessageSquare,
    Target,
    TrendingUp,
    LogOut,
    Sparkles,
    ArrowRight,
    Brain,
    Award,
    Zap,
} from "lucide-react";
import { Badge } from "../components/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../components/ui/card";
import { useEffect } from "react";

export const Dashboard = () => {
    const navigate = useNavigate();
    const { user, logout, isAuthenticated } = useUser();

    useEffect(() => {
        if (!isAuthenticated || !user) {
            navigate("/login");
        }
    }, [isAuthenticated, user, navigate]);

    if (!isAuthenticated || !user) {
        return null;
    }

    const hasCompletedOnboarding = user.age && user.interests;
    const hasCompletedQuiz = user.quizCompleted;
    const hasRecommendations = user.recommendations && user.recommendations.length > 0;

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-white">
            {/* Header */}
            <div className="bg-white border-b border-purple-100">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                                <Sparkles className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold">CareerPath AI</h1>
                                <p className="text-sm text-gray-600">Your Career Dashboard</p>
                            </div>
                        </div>
                        <Button onClick={handleLogout} variant="outline">
                            <LogOut className="w-4 h-4 mr-2" /> Logout
                        </Button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Welcome Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <h2 className="text-4xl font-bold mb-2">
                        Welcome back, {user.name}! 👋
                    </h2>
                    <p className="text-xl text-gray-600">
                        Continue your journey to finding the perfect career path
                    </p>
                </motion.div>

                {/* Progress Cards */}
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <Card className="border-purple-200 hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <User className="w-8 h-8 text-purple-600" />
                                    {hasCompletedOnboarding && (
                                        <Badge className="bg-green-100 text-green-700 border-green-300">
                                            Completed
                                        </Badge>
                                    )}
                                </div>
                                <CardTitle>Profile Setup</CardTitle>
                                <CardDescription>
                                    {hasCompletedOnboarding
                                        ? "Your profile is complete"
                                        : "Complete your onboarding"}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {!hasCompletedOnboarding ? (
                                    <Button
                                        onClick={() => navigate("/onboarding")}
                                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                                    >
                                        Complete Profile
                                    </Button>
                                ) : (
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Age:</span>
                                            <span className="font-medium">{user.age}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Class:</span>
                                            <span className="font-medium">{user.class}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Stream:</span>
                                            <span className="font-medium">{user.stream}</span>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Card className="border-purple-200 hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <Brain className="w-8 h-8 text-purple-600" />
                                    {hasCompletedQuiz && (
                                        <Badge className="bg-green-100 text-green-700 border-green-300">
                                            Completed
                                        </Badge>
                                    )}
                                </div>
                                <CardTitle>Personality Quiz</CardTitle>
                                <CardDescription>
                                    {hasCompletedQuiz
                                        ? "Your personality profile"
                                        : "Discover your strengths"}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {!hasCompletedQuiz ? (
                                    <Button
                                        onClick={() => navigate("/quiz")}
                                        disabled={!hasCompletedOnboarding}
                                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                                    >
                                        Take Quiz
                                    </Button>
                                ) : (
                                    <div className="space-y-2">
                                        <PersonalityBar
                                            label="Analytical"
                                            value={user.personalityScores?.analytical || 0}
                                            color="bg-blue-500"
                                        />
                                        <PersonalityBar
                                            label="Creative"
                                            value={user.personalityScores?.creative || 0}
                                            color="bg-purple-500"
                                        />
                                        <PersonalityBar
                                            label="Social"
                                            value={user.personalityScores?.social || 0}
                                            color="bg-pink-500"
                                        />
                                        <PersonalityBar
                                            label="Practical"
                                            value={user.personalityScores?.practical || 0}
                                            color="bg-green-500"
                                        />
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <Card className="border-purple-200 hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <Target className="w-8 h-8 text-purple-600" />
                                    {hasRecommendations && (
                                        <Badge className="bg-green-100 text-green-700 border-green-300">
                                            {user.recommendations?.length} Careers
                                        </Badge>
                                    )}
                                </div>
                                <CardTitle>Career Match</CardTitle>
                                <CardDescription>
                                    {hasRecommendations
                                        ? "View your career recommendations"
                                        : "Get personalized recommendations"}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {!hasRecommendations ? (
                                    <Button
                                        onClick={() => navigate("/chat")}
                                        disabled={!hasCompletedQuiz}
                                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                                    >
                                        Start AI Chat
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={() => navigate("/recommendations")}
                                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                                    >
                                        View Recommendations
                                    </Button>
                                )}
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>

                {/* Interests Section */}
                {hasCompletedOnboarding && user.interests && user.interests.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mb-12"
                    >
                        <Card className="border-purple-200">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Sparkles className="w-5 h-5 text-purple-600" />
                                    Your Interests
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    {user.interests.map((interest, i) => (
                                        <Badge
                                            key={i}
                                            variant="outline"
                                            className="bg-purple-50 border-purple-200 text-purple-700 text-sm px-4 py-2"
                                        >
                                            {interest}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                )}

                {/* Career Recommendations */}
                {hasRecommendations && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="mb-12"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-2xl font-bold">Your Career Matches</h3>
                            <Button
                                onClick={() => navigate("/recommendations")}
                                variant="outline"
                            >
                                View All <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {user.recommendations?.slice(0, 3).map((career, index) => (
                                <motion.div
                                    key={career.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.6 + index * 0.1 }}
                                    whileHover={{ scale: 1.02 }}
                                    onClick={() => navigate(`/roadmap/${career.id}`)}
                                    className="cursor-pointer"
                                >
                                    <Card className="border-purple-200 hover:shadow-xl transition-shadow h-full">
                                        <CardHeader>
                                            <div className="flex items-center justify-between mb-2">
                                                <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                                                    {career.matchPercentage}% Match
                                                </Badge>
                                            </div>
                                            <CardTitle>{career.title}</CardTitle>
                                            <CardDescription className="line-clamp-2">
                                                {career.description}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <Button
                                                className="w-full"
                                                variant="outline"
                                            >
                                                View Roadmap
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Chat History */}
                {user.chatHistory && user.chatHistory.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                    >
                        <Card className="border-purple-200">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="flex items-center gap-2">
                                        <MessageSquare className="w-5 h-5 text-purple-600" />
                                        Recent Conversations
                                    </CardTitle>
                                    <Button onClick={() => navigate("/chat")} variant="outline">
                                        Resume Chat
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600">
                                    {user.chatHistory.length} messages exchanged with your AI
                                    counsellor
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>
                )}

                {/* Quick Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="mt-12"
                >
                    <h3 className="text-2xl font-bold mb-6">Quick Actions</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <Button
                            onClick={() => navigate("/chat")}
                            variant="outline"
                            className="h-auto py-6 justify-start"
                        >
                            <MessageSquare className="w-5 h-5 mr-3" />
                            <div className="text-left">
                                <div className="font-semibold">Continue AI Chat</div>
                                <div className="text-sm text-gray-600">
                                    Ask more career questions
                                </div>
                            </div>
                        </Button>
                        <Button
                            onClick={() => navigate("/recommendations")}
                            variant="outline"
                            className="h-auto py-6 justify-start"
                            disabled={!hasRecommendations}
                        >
                            <TrendingUp className="w-5 h-5 mr-3" />
                            <div className="text-left">
                                <div className="font-semibold">Explore Careers</div>
                                <div className="text-sm text-gray-600">
                                    View detailed career paths
                                </div>
                            </div>
                        </Button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

const PersonalityBar = ({
    label,
    value,
    color,
}: {
    label: string;
    value: number;
    color: string;
}) => {
    return (
        <div className="flex items-center gap-3">
            <span className="text-sm font-medium w-20">{label}</span>
            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${value}%` }}
                    transition={{ duration: 0.5 }}
                    className={`h-full ${color}`}
                />
            </div>
            <span className="text-sm font-semibold w-10 text-right">{value}%</span>
        </div>
    );
};
