import { motion } from "motion/react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useUser } from "../contexts/UserContext";
import { Send, Sparkles, ArrowRight } from "lucide-react";
import { ChatMessage as ChatMessageType } from "../contexts/UserContext";

export const Chat = () => {
    const navigate = useNavigate();
    const { user, addChatMessage, saveRecommendations } = useUser();
    const [messages, setMessages] = useState<ChatMessageType[]>([
        {
            role: "assistant",
            content: `Hi ${user?.name || "there"}! 👋 I'm your AI Career Counsellor. I've reviewed your personality assessment, and I can see you have great strengths! Let me help you explore the perfect career path.\n\nBased on your profile:\n${getPersonalityInsight(user?.personalityScores)}\n\nLet's dive deeper! What excites you most about your future career?`,
            timestamp: Date.now(),
        },
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [quickReplies, setQuickReplies] = useState<string[]>([
        "Innovation and creativity",
        "Helping people",
        "Solving complex problems",
        "Financial stability",
    ]);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage: ChatMessageType = {
            role: "user",
            content: input,
            timestamp: Date.now(),
        };

        setMessages((prev) => [...prev, userMessage]);
        addChatMessage(userMessage);
        setInput("");
        setQuickReplies([]); // Clear quick replies after sending
        setIsTyping(true);

        // Simulate AI response delay
        setTimeout(() => {
            const aiResponse = generateAIResponse(input, messages.length, user);
            const assistantMessage: ChatMessageType = {
                role: "assistant",
                content: aiResponse,
                timestamp: Date.now(),
            };
            setMessages((prev) => [...prev, assistantMessage]);
            addChatMessage(assistantMessage);
            setIsTyping(false);

            // Update quick replies based on conversation progress
            updateQuickReplies(messages.length);
        }, 1500);
    };

    const updateQuickReplies = (messageCount: number) => {
        const replySets = [
            ["Technical skills", "Creative abilities", "Leadership skills"],
            ["Innovation", "Stability", "Impact on society", "Financial growth"],
            ["Independently", "Small teams", "Leading groups"],
            ["Technology", "Healthcare", "Finance", "Arts & Design"],
            ["Very comfortable", "Somewhat comfortable", "Prefer stable tools"],
        ];

        const index = Math.min(Math.floor(messageCount / 2), replySets.length - 1);
        setQuickReplies(replySets[index]);
    };

    const handleQuickReply = (reply: string) => {
        setInput(reply);
        setTimeout(() => handleSend(), 100);
    };

    const handleGenerateRecommendations = () => {
        const recommendations = generateCareerRecommendations(user);
        saveRecommendations(recommendations);
        navigate("/recommendations");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-white">
            <div className="max-w-5xl mx-auto h-screen flex flex-col">
                {/* Header */}
                <div className="bg-white border-b border-purple-100 px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                                <Sparkles className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold">AI Career Counsellor</h2>
                                <p className="text-sm text-gray-600">
                                    Your personal career guide
                                </p>
                            </div>
                        </div>
                        <Button
                            onClick={() => navigate("/dashboard")}
                            variant="outline"
                        >
                            Dashboard
                        </Button>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {messages.map((message, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"
                                }`}
                        >
                            <div
                                className={`max-w-2xl rounded-3xl px-6 py-4 ${message.role === "user"
                                        ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                                        : "bg-white border border-purple-100 shadow-md"
                                    }`}
                            >
                                <p className="whitespace-pre-wrap">{message.content}</p>
                            </div>
                        </motion.div>
                    ))}

                    {isTyping && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex justify-start"
                        >
                            <div className="bg-white border border-purple-100 rounded-3xl px-6 py-4 shadow-md">
                                <div className="flex gap-2">
                                    <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" />
                                    <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce delay-100" />
                                    <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce delay-200" />
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {messages.length >= 6 && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex justify-center"
                        >
                            <Button
                                onClick={handleGenerateRecommendations}
                                size="lg"
                                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                            >
                                Generate Career Recommendations{" "}
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                        </motion.div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="bg-white border-t border-purple-100 p-6">
                    {/* Quick Replies */}
                    {quickReplies.length > 0 && !isTyping && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-4 flex gap-2 overflow-x-auto pb-2"
                        >
                            {quickReplies.map((reply, index) => (
                                <motion.button
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleQuickReply(reply)}
                                    className="px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 hover:from-purple-200 hover:to-blue-200 text-purple-700 rounded-full text-sm font-medium whitespace-nowrap border border-purple-200 transition-all"
                                >
                                    {reply}
                                </motion.button>
                            ))}
                        </motion.div>
                    )}

                    {/* Input Field */}
                    <div className="flex gap-3">
                        <Input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && handleSend()}
                            placeholder="Type your message..."
                            className="flex-1 rounded-full px-6 bg-gray-50 border-gray-200"
                        />
                        <Button
                            onClick={handleSend}
                            disabled={!input.trim() || isTyping}
                            className="rounded-full w-12 h-12 p-0 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg"
                        >
                            <Send className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const getPersonalityInsight = (scores: any) => {
    if (!scores) return "";
    const traits = [
        { name: "Analytical", value: scores.analytical },
        { name: "Creative", value: scores.creative },
        { name: "Social", value: scores.social },
        { name: "Practical", value: scores.practical },
    ];
    const top = traits.sort((a, b) => b.value - a.value)[0];
    return `• Your strongest trait is **${top.name}** (${top.value}%)`;
};

const generateAIResponse = (
    userInput: string,
    messageCount: number,
    user: any
): string => {
    const responses = [
        "That's great! 🎯 Understanding what excites you is the first step. Can you tell me more about the skills you'd like to develop? For example, are you more interested in technical skills, creative abilities, or people management?",

        `Excellent! Based on what you've shared and your personality profile, I'm seeing some really promising directions. ${user?.interests && user.interests.length > 0
            ? `Your interests in ${user.interests.slice(0, 2).join(" and ")} align well with several career paths.`
            : ""
        }\n\nWhat's most important to you in a career: innovation, stability, impact on society, or financial growth?`,

        "I love your perspective! 💡 Let me ask you this: do you see yourself working independently, in small teams, or leading large groups? This will help me narrow down the best fit for you.",

        `That's very insightful! ${user?.personalityScores?.creative > 60
            ? "Your creative strength suggests you'd thrive in innovative environments."
            : user?.personalityScores?.analytical > 60
                ? "Your analytical mindset would be perfect for data-driven fields."
                : user?.personalityScores?.social > 60
                    ? "Your social skills would shine in people-oriented careers."
                    : "Your practical approach would excel in hands-on fields."
        }\n\nAre there any specific industries you're curious about? (Tech, Healthcare, Finance, Arts, etc.)`,

        "Perfect! I'm getting a clear picture now. 🌟 One more thing: how do you feel about continuous learning and adapting to new technologies? This is important for future-proofing your career.",

        "Wonderful! I have enough information to provide you with personalized career recommendations. Click the button below to see your top career matches with detailed roadmaps! 🚀",
    ];

    return responses[Math.min(messageCount, responses.length - 1)];
};

const generateCareerRecommendations = (user: any) => {
    const scores = user?.personalityScores || {
        analytical: 25,
        creative: 25,
        social: 25,
        practical: 25,
    };

    const careers = [];

    // Generate recommendations based on personality scores
    if (scores.analytical >= 40) {
        careers.push({
            id: "data-scientist",
            title: "Data Scientist",
            matchPercentage: scores.analytical,
            whySuitsYou: `Your strong analytical skills (${scores.analytical}%) make you perfect for working with complex data sets and deriving meaningful insights.`,
            requiredSkills: [
                "Python/R Programming",
                "Statistics & Mathematics",
                "Machine Learning",
                "Data Visualization",
                "SQL",
            ],
            pros: [
                "High demand and excellent salary",
                "Intellectually challenging work",
                "Work across various industries",
                "Remote work opportunities",
            ],
            cons: [
                "Requires continuous learning",
                "Can be deadline-intensive",
                "May involve repetitive tasks",
            ],
            alternatives: ["Machine Learning Engineer", "Business Analyst", "Quantitative Analyst"],
            description: "Analyze complex data to help organizations make better decisions using statistical methods and machine learning.",
        });
    }

    if (scores.creative >= 40) {
        careers.push({
            id: "ux-designer",
            title: "UX/UI Designer",
            matchPercentage: scores.creative,
            whySuitsYou: `Your creative mindset (${scores.creative}%) combined with problem-solving abilities makes you ideal for designing user experiences.`,
            requiredSkills: [
                "Figma/Adobe XD",
                "User Research",
                "Prototyping",
                "Visual Design",
                "Psychology",
            ],
            pros: [
                "Highly creative and fulfilling",
                "Growing demand",
                "Directly impact user satisfaction",
                "Flexible work arrangements",
            ],
            cons: [
                "Can face subjective criticism",
                "Tight deadlines",
                "Need to balance aesthetics with functionality",
            ],
            alternatives: ["Product Designer", "Graphic Designer", "Brand Strategist"],
            description: "Create intuitive and beautiful digital experiences that delight users and solve real problems.",
        });
    }

    if (scores.social >= 40) {
        careers.push({
            id: "product-manager",
            title: "Product Manager",
            matchPercentage: scores.social,
            whySuitsYou: `Your social skills (${scores.social}%) and ability to work with diverse teams make you a natural fit for product management.`,
            requiredSkills: [
                "Communication",
                "Project Management",
                "Market Analysis",
                "Leadership",
                "Technical Understanding",
            ],
            pros: [
                "High-impact role",
                "Excellent career growth",
                "Work with diverse teams",
                "Strategic thinking opportunities",
            ],
            cons: [
                "High pressure and responsibility",
                "Need to balance multiple stakeholders",
                "Long working hours possible",
            ],
            alternatives: ["Project Manager", "Scrum Master", "Business Development Manager"],
            description: "Lead product development from conception to launch, coordinating between teams and stakeholders.",
        });
    }

    if (scores.practical >= 40) {
        careers.push({
            id: "software-engineer",
            title: "Software Engineer",
            matchPercentage: scores.practical,
            whySuitsYou: `Your practical approach (${scores.practical}%) to problem-solving is perfect for building real-world software solutions.`,
            requiredSkills: [
                "Programming (Java/Python/JavaScript)",
                "Data Structures & Algorithms",
                "System Design",
                "Git/Version Control",
                "Problem Solving",
            ],
            pros: [
                "Excellent salary potential",
                "High job security",
                "Remote work friendly",
                "Constantly evolving field",
            ],
            cons: [
                "Can be mentally demanding",
                "Need continuous skill updates",
                "Long hours during deadlines",
            ],
            alternatives: ["DevOps Engineer", "Full Stack Developer", "Backend Engineer"],
            description: "Design, develop, and maintain software applications that power modern technology.",
        });
    }

    // Ensure we have at least 3 recommendations
    if (careers.length < 3) {
        careers.push({
            id: "digital-marketer",
            title: "Digital Marketing Specialist",
            matchPercentage: Math.max(scores.creative, scores.social),
            whySuitsYou: "Your blend of creativity and social skills makes you great at connecting brands with audiences.",
            requiredSkills: [
                "SEO/SEM",
                "Content Marketing",
                "Social Media",
                "Analytics",
                "Copywriting",
            ],
            pros: [
                "Creative and dynamic work",
                "Variety of industries",
                "Measurable impact",
                "Remote opportunities",
            ],
            cons: [
                "Fast-paced changes",
                "Algorithm dependencies",
                "Can be metrics-driven",
            ],
            alternatives: ["Content Strategist", "Social Media Manager", "Brand Manager"],
            description: "Create and execute digital strategies to grow brand awareness and drive business results.",
        });
    }

    return careers.slice(0, 5);
};
