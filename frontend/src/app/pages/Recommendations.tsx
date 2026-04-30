import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { useUser } from "../contexts/UserContext";
import {
    Target,
    TrendingUp,
    AlertCircle,
    Sparkles,
    ArrowRight,
    CheckCircle2,
} from "lucide-react";
import { Badge } from "../components/ui/badge";

export const Recommendations = () => {
    const navigate = useNavigate();
    const { user } = useUser();

    if (!user?.recommendations || user.recommendations.length === 0) {
        navigate("/chat");
        return null;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-white p-6">
            <div className="max-w-7xl mx-auto py-12">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md mb-4">
                        <Sparkles className="w-5 h-5 text-purple-600" />
                        <span className="font-medium">AI-Generated Results</span>
                    </div>
                    <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                        Your Career Matches
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Based on your personality assessment and our conversation, here are
                        the top career paths perfect for you.
                    </p>
                </motion.div>

                {/* Career Cards */}
                <div className="space-y-8">
                    {user.recommendations.map((career, index) => (
                        <motion.div
                            key={career.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                            className="bg-white rounded-3xl shadow-xl border border-purple-100 overflow-hidden"
                        >
                            {/* Card Header */}
                            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-8 text-white">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <Badge className="bg-white/20 text-white border-white/30">
                                                #{index + 1} Match
                                            </Badge>
                                            <Badge className="bg-white/20 text-white border-white/30">
                                                {career.matchPercentage}% Match
                                            </Badge>
                                        </div>
                                        <h2 className="text-3xl font-bold mb-3">{career.title}</h2>
                                        <p className="text-purple-100 text-lg">
                                            {career.description}
                                        </p>
                                    </div>
                                    <div className="text-center bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                                        <div className="text-5xl font-bold mb-1">
                                            {career.matchPercentage}%
                                        </div>
                                        <div className="text-sm text-purple-100">Match Score</div>
                                    </div>
                                </div>
                            </div>

                            {/* Card Body */}
                            <div className="p-8">
                                <div className="grid md:grid-cols-2 gap-8 mb-8">
                                    {/* Why This Suits You */}
                                    <div>
                                        <div className="flex items-center gap-2 mb-4">
                                            <Target className="w-5 h-5 text-purple-600" />
                                            <h3 className="text-xl font-semibold">
                                                Why This Suits You
                                            </h3>
                                        </div>
                                        <p className="text-gray-700 bg-purple-50 p-4 rounded-xl">
                                            {career.whySuitsYou}
                                        </p>
                                    </div>

                                    {/* Required Skills */}
                                    <div>
                                        <div className="flex items-center gap-2 mb-4">
                                            <CheckCircle2 className="w-5 h-5 text-purple-600" />
                                            <h3 className="text-xl font-semibold">Required Skills</h3>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {career.requiredSkills.map((skill, i) => (
                                                <Badge
                                                    key={i}
                                                    variant="outline"
                                                    className="bg-blue-50 border-blue-200 text-blue-700"
                                                >
                                                    {skill}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-8 mb-8">
                                    {/* Pros */}
                                    <div>
                                        <div className="flex items-center gap-2 mb-4">
                                            <TrendingUp className="w-5 h-5 text-green-600" />
                                            <h3 className="text-xl font-semibold">Pros</h3>
                                        </div>
                                        <ul className="space-y-2">
                                            {career.pros.map((pro, i) => (
                                                <li key={i} className="flex items-start gap-2">
                                                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2" />
                                                    <span className="text-gray-700">{pro}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Cons */}
                                    <div>
                                        <div className="flex items-center gap-2 mb-4">
                                            <AlertCircle className="w-5 h-5 text-orange-600" />
                                            <h3 className="text-xl font-semibold">Considerations</h3>
                                        </div>
                                        <ul className="space-y-2">
                                            {career.cons.map((con, i) => (
                                                <li key={i} className="flex items-start gap-2">
                                                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2" />
                                                    <span className="text-gray-700">{con}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* Alternative Careers */}
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold mb-3">
                                        Alternative Paths
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {career.alternatives.map((alt, i) => (
                                            <Badge
                                                key={i}
                                                variant="outline"
                                                className="bg-purple-50 border-purple-200 text-purple-700"
                                            >
                                                {alt}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                {/* Action Button */}
                                <Button
                                    onClick={() => navigate(`/roadmap/${career.id}`)}
                                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                                    size="lg"
                                >
                                    View Career Roadmap <ArrowRight className="w-5 h-5 ml-2" />
                                </Button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Footer Actions */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="flex justify-center gap-4 mt-12"
                >
                    <Button onClick={() => navigate("/chat")} variant="outline" size="lg">
                        Back to Chat
                    </Button>
                    <Button onClick={() => navigate("/dashboard")} size="lg">
                        Go to Dashboard
                    </Button>
                </motion.div>
            </div>
        </div>
    );
};
