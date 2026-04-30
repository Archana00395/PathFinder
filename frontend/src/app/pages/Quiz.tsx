import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import { useUser } from "../contexts/UserContext";
import { ArrowRight, Brain } from "lucide-react";

interface Question {
    id: number;
    question: string;
    options: {
        text: string;
        scores: {
            analytical: number;
            creative: number;
            social: number;
            practical: number;
        };
    }[];
}

const questions: Question[] = [
    {
        id: 1,
        question: "When faced with a complex problem, you prefer to:",
        options: [
            {
                text: "Break it down logically and analyze each part",
                scores: { analytical: 3, creative: 0, social: 0, practical: 1 },
            },
            {
                text: "Think outside the box and find creative solutions",
                scores: { analytical: 0, creative: 3, social: 0, practical: 1 },
            },
            {
                text: "Discuss it with others and get different perspectives",
                scores: { analytical: 1, creative: 0, social: 3, practical: 0 },
            },
            {
                text: "Try a hands-on approach and learn by doing",
                scores: { analytical: 0, creative: 1, social: 0, practical: 3 },
            },
        ],
    },
    {
        id: 2,
        question: "In a group project, you naturally tend to:",
        options: [
            {
                text: "Organize data and create detailed plans",
                scores: { analytical: 3, creative: 0, social: 1, practical: 1 },
            },
            {
                text: "Come up with innovative ideas and designs",
                scores: { analytical: 0, creative: 3, social: 1, practical: 0 },
            },
            {
                text: "Facilitate communication and keep everyone motivated",
                scores: { analytical: 0, creative: 0, social: 3, practical: 1 },
            },
            {
                text: "Execute tasks and ensure things get done",
                scores: { analytical: 1, creative: 0, social: 1, practical: 3 },
            },
        ],
    },
    {
        id: 3,
        question: "What type of activities do you enjoy most?",
        options: [
            {
                text: "Solving puzzles, coding, or analyzing data",
                scores: { analytical: 3, creative: 0, social: 0, practical: 1 },
            },
            {
                text: "Drawing, writing, or creating content",
                scores: { analytical: 0, creative: 3, social: 0, practical: 1 },
            },
            {
                text: "Teaching, volunteering, or organizing events",
                scores: { analytical: 0, creative: 1, social: 3, practical: 1 },
            },
            {
                text: "Building things, sports, or hands-on projects",
                scores: { analytical: 0, creative: 1, social: 0, practical: 3 },
            },
        ],
    },
    {
        id: 4,
        question: "Your ideal work environment would be:",
        options: [
            {
                text: "A quiet space with focus on research and analysis",
                scores: { analytical: 3, creative: 0, social: 0, practical: 1 },
            },
            {
                text: "A creative studio with freedom to innovate",
                scores: { analytical: 0, creative: 3, social: 1, practical: 0 },
            },
            {
                text: "A collaborative space with lots of interaction",
                scores: { analytical: 0, creative: 1, social: 3, practical: 0 },
            },
            {
                text: "A dynamic environment with practical challenges",
                scores: { analytical: 1, creative: 0, social: 0, practical: 3 },
            },
        ],
    },
    {
        id: 5,
        question: "When learning something new, you prefer:",
        options: [
            {
                text: "Reading detailed documentation and understanding theory",
                scores: { analytical: 3, creative: 0, social: 0, practical: 1 },
            },
            {
                text: "Experimenting and exploring different approaches",
                scores: { analytical: 0, creative: 3, social: 0, practical: 2 },
            },
            {
                text: "Learning from others through discussion and collaboration",
                scores: { analytical: 0, creative: 0, social: 3, practical: 1 },
            },
            {
                text: "Jumping in and learning through practice",
                scores: { analytical: 0, creative: 1, social: 0, practical: 3 },
            },
        ],
    },
    {
        id: 6,
        question: "Which statement resonates with you most?",
        options: [
            {
                text: "I love finding patterns and solving complex equations",
                scores: { analytical: 3, creative: 0, social: 0, practical: 1 },
            },
            {
                text: "I express myself best through art and innovation",
                scores: { analytical: 0, creative: 3, social: 0, practical: 0 },
            },
            {
                text: "I thrive when helping and connecting with people",
                scores: { analytical: 0, creative: 0, social: 3, practical: 1 },
            },
            {
                text: "I enjoy working with my hands and seeing tangible results",
                scores: { analytical: 0, creative: 1, social: 0, practical: 3 },
            },
        ],
    },
    {
        id: 7,
        question: "In your free time, you're most likely to:",
        options: [
            {
                text: "Read research papers or watch documentaries",
                scores: { analytical: 3, creative: 0, social: 0, practical: 0 },
            },
            {
                text: "Work on creative projects or explore new ideas",
                scores: { analytical: 0, creative: 3, social: 0, practical: 1 },
            },
            {
                text: "Hang out with friends or engage in social activities",
                scores: { analytical: 0, creative: 0, social: 3, practical: 1 },
            },
            {
                text: "Play sports or work on DIY projects",
                scores: { analytical: 0, creative: 0, social: 1, practical: 3 },
            },
        ],
    },
    {
        id: 8,
        question: "What motivates you most in your work?",
        options: [
            {
                text: "Discovering insights and solving difficult problems",
                scores: { analytical: 3, creative: 0, social: 0, practical: 1 },
            },
            {
                text: "Creating something unique and original",
                scores: { analytical: 0, creative: 3, social: 0, practical: 0 },
            },
            {
                text: "Making a positive impact on people's lives",
                scores: { analytical: 0, creative: 1, social: 3, practical: 1 },
            },
            {
                text: "Building functional solutions that work",
                scores: { analytical: 1, creative: 0, social: 0, practical: 3 },
            },
        ],
    },
    {
        id: 9,
        question: "How do you approach decision-making?",
        options: [
            {
                text: "Analyze all data and make logical decisions",
                scores: { analytical: 3, creative: 0, social: 0, practical: 1 },
            },
            {
                text: "Trust my intuition and creative instincts",
                scores: { analytical: 0, creative: 3, social: 0, practical: 0 },
            },
            {
                text: "Consult with others and consider everyone's input",
                scores: { analytical: 0, creative: 0, social: 3, practical: 1 },
            },
            {
                text: "Focus on what's practical and achievable",
                scores: { analytical: 1, creative: 0, social: 0, practical: 3 },
            },
        ],
    },
    {
        id: 10,
        question: "Which of these best describes your strengths?",
        options: [
            {
                text: "Critical thinking, logic, and attention to detail",
                scores: { analytical: 3, creative: 0, social: 0, practical: 1 },
            },
            {
                text: "Imagination, originality, and artistic vision",
                scores: { analytical: 0, creative: 3, social: 0, practical: 0 },
            },
            {
                text: "Empathy, communication, and leadership",
                scores: { analytical: 0, creative: 1, social: 3, practical: 0 },
            },
            {
                text: "Problem-solving, efficiency, and execution",
                scores: { analytical: 1, creative: 0, social: 0, practical: 3 },
            },
        ],
    },
];

export const Quiz = () => {
    const navigate = useNavigate();
    const { updateUser } = useUser();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [scores, setScores] = useState({
        analytical: 0,
        creative: 0,
        social: 0,
        practical: 0,
    });

    const progress = ((currentQuestion + 1) / questions.length) * 100;

    const handleAnswer = (optionScores: typeof scores) => {
        const newScores = {
            analytical: scores.analytical + optionScores.analytical,
            creative: scores.creative + optionScores.creative,
            social: scores.social + optionScores.social,
            practical: scores.practical + optionScores.practical,
        };
        setScores(newScores);

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            // Quiz completed - calculate percentages
            const total =
                newScores.analytical +
                newScores.creative +
                newScores.social +
                newScores.practical;
            const percentages = {
                analytical: Math.round((newScores.analytical / total) * 100),
                creative: Math.round((newScores.creative / total) * 100),
                social: Math.round((newScores.social / total) * 100),
                practical: Math.round((newScores.practical / total) * 100),
            };
            updateUser({ personalityScores: percentages, quizCompleted: true });
            navigate("/chat");
        }
    };

    const currentScorePercentages = () => {
        const total = scores.analytical + scores.creative + scores.social + scores.practical;
        if (total === 0) return { analytical: 0, creative: 0, social: 0, practical: 0 };
        return {
            analytical: Math.round((scores.analytical / total) * 100),
            creative: Math.round((scores.creative / total) * 100),
            social: Math.round((scores.social / total) * 100),
            practical: Math.round((scores.practical / total) * 100),
        };
    };

    const percentages = currentScorePercentages();

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-white p-6">
            <div className="max-w-6xl mx-auto pt-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md mb-4">
                        <Brain className="w-5 h-5 text-purple-600" />
                        <span className="font-medium">Personality Assessment</span>
                    </div>
                    <h2 className="text-3xl font-bold mb-2">Discover Your Strengths</h2>
                    <p className="text-gray-600">
                        Question {currentQuestion + 1} of {questions.length}
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Quiz Section */}
                    <div className="lg:col-span-2">
                        <div className="mb-6">
                            <Progress value={progress} className="h-3" />
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentQuestion}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="bg-white rounded-3xl shadow-xl p-10 border border-purple-100"
                            >
                                <h3 className="text-2xl font-semibold mb-8">
                                    {questions[currentQuestion].question}
                                </h3>

                                <div className="space-y-4">
                                    {questions[currentQuestion].options.map((option, index) => (
                                        <motion.button
                                            key={index}
                                            onClick={() => handleAnswer(option.scores)}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="w-full p-6 rounded-2xl border-2 border-gray-200 hover:border-purple-600 hover:bg-gradient-to-br hover:from-purple-50 hover:to-blue-50 transition-all text-left"
                                        >
                                            <span className="text-lg">{option.text}</span>
                                        </motion.button>
                                    ))}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Real-time Analysis Section */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-3xl shadow-xl p-8 border border-purple-100 sticky top-6">
                            <h4 className="text-xl font-semibold mb-6">
                                Your Profile So Far
                            </h4>

                            <div className="space-y-6">
                                <AnalysisBar
                                    label="Analytical"
                                    percentage={percentages.analytical}
                                    color="from-blue-500 to-blue-600"
                                />
                                <AnalysisBar
                                    label="Creative"
                                    percentage={percentages.creative}
                                    color="from-purple-500 to-purple-600"
                                />
                                <AnalysisBar
                                    label="Social"
                                    percentage={percentages.social}
                                    color="from-pink-500 to-pink-600"
                                />
                                <AnalysisBar
                                    label="Practical"
                                    percentage={percentages.practical}
                                    color="from-green-500 to-green-600"
                                />
                            </div>

                            <div className="mt-8 p-4 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl">
                                <p className="text-sm text-gray-600">
                                    💡 Your personality profile updates as you answer each
                                    question. This helps us recommend the best careers for you!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const AnalysisBar = ({
    label,
    percentage,
    color,
}: {
    label: string;
    percentage: number;
    color: string;
}) => {
    return (
        <div>
            <div className="flex justify-between mb-2">
                <span className="font-medium">{label}</span>
                <span className="font-semibold">{percentage}%</span>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.5 }}
                    className={`h-full bg-gradient-to-r ${color}`}
                />
            </div>
        </div>
    );
};
