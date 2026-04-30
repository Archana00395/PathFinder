import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Sparkles, Target, TrendingUp, Users, ArrowRight } from "lucide-react";
import { useUser } from "../contexts/UserContext";
import { useEffect } from "react";

export const Landing = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useUser();

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/dashboard");
        }
    }, [isAuthenticated, navigate]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-white relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                    }}
                    transition={{ duration: 20, repeat: Infinity }}
                    className="absolute top-20 right-20 w-72 h-72 bg-purple-300/20 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        rotate: [90, 0, 90],
                    }}
                    transition={{ duration: 15, repeat: Infinity }}
                    className="absolute bottom-20 left-20 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl"
                />
            </div>

            {/* Header */}
            <header className="container mx-auto px-6 py-6 relative z-10">
                <div className="flex items-center justify-between">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex flex-col"
                    >
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                                <Sparkles className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                PATHFINDERS
                            </span>
                        </div>
                        <p className="text-xs text-gray-600 ml-12 italic">Where Dreams Meet Direction</p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex gap-3"
                    >
                        <Button variant="ghost" onClick={() => navigate("/login")}>
                            Login
                        </Button>
                        <Button
                            onClick={() => navigate("/signup")}
                            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg"
                        >
                            Get Started
                        </Button>
                    </motion.div>
                </div>
            </header>

            {/* Hero Section */}
            <main className="container mx-auto px-6 py-20 relative z-10">
                <div className="text-center max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="inline-block px-6 py-3 bg-white/60 backdrop-blur-md rounded-full mb-6 border border-purple-200/50 shadow-lg">
                            <span className="text-purple-700 font-medium flex items-center gap-2">
                                <Sparkles className="w-4 h-4" />
                                AI-Powered Career Guidance
                            </span>
                        </div>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-7xl font-bold mb-4"
                    >
                        <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                            PATHFINDERS
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-2xl text-gray-700 mb-4 font-medium italic"
                    >
                        Where Dreams Meet Direction
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto"
                    >
                        Your personal AI mentor that deeply understands you and guides you
                        toward the perfect career path with clarity, confidence, and structure.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="flex gap-4 justify-center"
                    >
                        <Button
                            size="lg"
                            onClick={() => navigate("/signup")}
                            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-8 py-6 shadow-xl hover:shadow-2xl transition-all"
                        >
                            Start Your Journey
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            onClick={() => navigate("/login")}
                            className="text-lg px-8 py-6 bg-white/60 backdrop-blur-md border-purple-200 hover:bg-white/80"
                        >
                            Login
                        </Button>
                    </motion.div>
                </div>

                {/* Features Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="grid md:grid-cols-3 gap-8 mt-24"
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 + index * 0.1 }}
                            whileHover={{ scale: 1.05, y: -5 }}
                            className="bg-white/60 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-purple-100/50 hover:shadow-2xl transition-all"
                        >
                            <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                                <feature.icon className="w-7 h-7 text-purple-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Stats Section */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1 }}
                    className="mt-24 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-12 text-white shadow-2xl relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-white/5 backdrop-blur-sm" />
                    <div className="grid md:grid-cols-3 gap-8 text-center relative z-10">
                        <div>
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 1.3, type: "spring" }}
                                className="text-5xl font-bold mb-2"
                            >
                                10K+
                            </motion.div>
                            <div className="text-purple-100">Students Guided</div>
                        </div>
                        <div>
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 1.4, type: "spring" }}
                                className="text-5xl font-bold mb-2"
                            >
                                500+
                            </motion.div>
                            <div className="text-purple-100">Career Paths</div>
                        </div>
                        <div>
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 1.5, type: "spring" }}
                                className="text-5xl font-bold mb-2"
                            >
                                95%
                            </motion.div>
                            <div className="text-purple-100">Satisfaction Rate</div>
                        </div>
                    </div>
                </motion.div>
            </main>
        </div>
    );
};

const features = [
    {
        icon: Sparkles,
        title: "AI-Powered Assessment",
        description:
            "Take our smart personality quiz and get instant analysis of your strengths across analytical, creative, social, and practical dimensions.",
    },
    {
        icon: Target,
        title: "Personalized Recommendations",
        description:
            "Receive top career matches with detailed insights on why they suit you, required skills, pros & cons, and alternative paths.",
    },
    {
        icon: TrendingUp,
        title: "Career Roadmaps",
        description:
            "Get step-by-step guidance on education paths, skills to learn, certifications, projects, and job roles for your chosen career.",
    },
];
