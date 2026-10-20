import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Sparkles, Target, TrendingUp, Users, ArrowRight } from "lucide-react";
import { useUser } from "../contexts/UserContext";
import { useEffect } from "react";
import { Navbar, PrimaryButton, StatusBadge } from "../components/design-system";

export const Landing = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useUser();

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/dashboard");
        }
    }, [isAuthenticated, navigate]);

    return (
        <div className="min-h-screen overflow-hidden">
            <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                    }}
                    transition={{ duration: 20, repeat: Infinity }}
                    className="absolute right-20 top-24 h-72 w-72 rounded-full bg-violet-300/20 blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        rotate: [90, 0, 90],
                    }}
                    transition={{ duration: 15, repeat: Infinity }}
                    className="absolute bottom-16 left-20 h-96 w-96 rounded-full bg-cyan-300/20 blur-3xl"
                />
            </div>

            <Navbar
                actions={
                    <>
                        <Button variant="ghost" onClick={() => navigate("/login")}>
                            Login
                        </Button>
                        <PrimaryButton onClick={() => navigate("/signup")}>
                            Get started
                        </PrimaryButton>
                    </>
                }
            />

            <main className="relative z-10 mx-auto max-w-6xl px-4 pb-20 pt-12 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-4xl text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <StatusBadge variant="info" className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-indigo-700 shadow-sm">
                            <Sparkles className="h-3.5 w-3.5" />
                            AI-Powered Career Guidance
                        </StatusBadge>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mt-8 bg-gradient-to-r from-slate-900 via-indigo-700 to-cyan-600 bg-clip-text text-transparent"
                    >
                        PATHFINDERS
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mt-4 text-xl font-medium italic text-slate-600 sm:text-2xl"
                    >
                        Where Dreams Meet Direction
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="mx-auto mt-6 max-w-2xl text-base text-slate-600 sm:text-xl"
                    >
                        Your personal AI mentor that understands your strengths, interests, and ambitions — and helps you turn uncertainty into a confident career plan.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="mt-10 flex flex-col justify-center gap-4 sm:flex-row"
                    >
                        <PrimaryButton size="lg" onClick={() => navigate("/signup")} className="px-8 py-6 text-base sm:text-lg">
                            Start your journey
                            <ArrowRight className="h-5 w-5" />
                        </PrimaryButton>
                        <Button size="lg" variant="outline" onClick={() => navigate("/login")} className="px-8 py-6 text-base sm:text-lg">
                            Login
                        </Button>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="mt-20 grid gap-6 md:grid-cols-3"
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 + index * 0.1 }}
                            whileHover={{ y: -6 }}
                            className="rounded-[28px] border border-slate-200/80 bg-white/75 p-7 shadow-[0_24px_60px_-40px_rgba(15,23,42,0.5)] backdrop-blur-sm"
                        >
                            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-100 to-cyan-100 text-indigo-700 shadow-inner">
                                <feature.icon className="h-7 w-7" />
                            </div>
                            <h3 className="mb-3 text-xl font-bold text-slate-900">{feature.title}</h3>
                            <p className="text-sm leading-6 text-slate-600">{feature.description}</p>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1 }}
                    className="mt-20 overflow-hidden rounded-[32px] bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 p-8 text-white shadow-[0_35px_90px_-45px_rgba(79,70,229,0.9)] sm:p-10"
                >
                    <div className="grid gap-8 text-center md:grid-cols-3">
                        <div>
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.3, type: "spring" }} className="text-4xl font-black sm:text-5xl">
                                10K+
                            </motion.div>
                            <div className="mt-2 text-sm uppercase tracking-[0.2em] text-indigo-100">Students guided</div>
                        </div>
                        <div>
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.4, type: "spring" }} className="text-4xl font-black sm:text-5xl">
                                500+
                            </motion.div>
                            <div className="mt-2 text-sm uppercase tracking-[0.2em] text-indigo-100">Career paths</div>
                        </div>
                        <div>
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.5, type: "spring" }} className="text-4xl font-black sm:text-5xl">
                                95%
                            </motion.div>
                            <div className="mt-2 text-sm uppercase tracking-[0.2em] text-indigo-100">Satisfaction</div>
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
