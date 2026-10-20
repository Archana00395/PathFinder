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
import { AppShell, CareerCard, PageHeader } from "../components/design-system";

export const Recommendations = () => {
    const navigate = useNavigate();
    const { user } = useUser();

    if (!user?.recommendations || user.recommendations.length === 0) {
        navigate("/chat");
        return null;
    }

    return (
        <AppShell>
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <PageHeader
                    eyebrow="AI-generated results"
                    title="Your career matches"
                    description="Based on your personality assessment and conversation, here are the top paths that align with your strengths and goals."
                    action={
                        <Button onClick={() => navigate("/chat")} variant="outline" size="sm">
                            Back to chat
                        </Button>
                    }
                />

                <div className="space-y-8">
                    {user.recommendations.map((career, index) => (
                        <motion.div
                            key={career.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                            className="rounded-[28px] border border-slate-200 bg-white/90 p-2 shadow-[0_30px_80px_-50px_rgba(15,23,42,0.5)]"
                        >
                            <CareerCard
                                title={career.title}
                                description={career.description}
                                matchPercentage={career.matchPercentage}
                                skills={career.requiredSkills}
                                onAction={() => navigate(`/roadmap/${career.id}`)}
                            />

                            <div className="p-6 pt-2">
                                <div className="grid gap-8 md:grid-cols-2">
                                    <div>
                                        <div className="mb-4 flex items-center gap-2">
                                            <Target className="w-5 h-5 text-indigo-600" />
                                            <h3 className="text-xl font-bold text-slate-900">Why this suits you</h3>
                                        </div>
                                        <p className="rounded-2xl bg-indigo-50 p-4 text-sm leading-6 text-slate-700">
                                            {career.whySuitsYou}
                                        </p>
                                    </div>

                                    <div>
                                        <div className="mb-4 flex items-center gap-2">
                                            <CheckCircle2 className="w-5 h-5 text-indigo-600" />
                                            <h3 className="text-xl font-bold text-slate-900">Required skills</h3>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {career.requiredSkills.map((skill, i) => (
                                                <Badge key={i} variant="outline" className="border-indigo-200 bg-indigo-50 text-indigo-700">
                                                    {skill}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 grid gap-8 md:grid-cols-2">
                                    <div>
                                        <div className="mb-4 flex items-center gap-2">
                                            <TrendingUp className="w-5 h-5 text-emerald-600" />
                                            <h3 className="text-xl font-bold text-slate-900">Pros</h3>
                                        </div>
                                        <ul className="space-y-2">
                                            {career.pros.map((pro, i) => (
                                                <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                                                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                                    {pro}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div>
                                        <div className="mb-4 flex items-center gap-2">
                                            <AlertCircle className="w-5 h-5 text-amber-600" />
                                            <h3 className="text-xl font-bold text-slate-900">Considerations</h3>
                                        </div>
                                        <ul className="space-y-2">
                                            {career.cons.map((con, i) => (
                                                <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                                                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-amber-500" />
                                                    {con}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <h3 className="mb-3 text-lg font-bold text-slate-900">Alternative paths</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {career.alternatives.map((alt, i) => (
                                            <Badge key={i} variant="outline" className="border-violet-200 bg-violet-50 text-violet-700">{alt}</Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-10 flex flex-col justify-center gap-4 sm:flex-row"
                >
                    <Button onClick={() => navigate("/chat")} variant="outline" size="lg">
                        Back to chat
                    </Button>
                    <Button onClick={() => navigate("/dashboard")} size="lg">
                        Go to dashboard
                    </Button>
                </motion.div>
            </div>
        </AppShell>
    );
};
