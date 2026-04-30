import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Progress } from "../components/ui/progress";
import { useUser } from "../contexts/UserContext";
import { ArrowRight, ArrowLeft } from "lucide-react";

const interests = [
    "Technology",
    "Arts & Design",
    "Science",
    "Business",
    "Healthcare",
    "Engineering",
    "Education",
    "Sports",
    "Music",
    "Writing",
    "Social Work",
    "Environment",
    "Finance",
    "Marketing",
    "Law",
];

const careerGoals = [
    { value: "confused", label: "I'm Confused", emoji: "🤔" },
    { value: "exploring", label: "Just Exploring", emoji: "🔍" },
    { value: "switching", label: "Switching Career", emoji: "🔄" },
];

export const Onboarding = () => {
    const navigate = useNavigate();
    const { updateUser } = useUser();
    const [step, setStep] = useState(1);
    const totalSteps = 3;

    // Form state
    const [age, setAge] = useState("");
    const [classLevel, setClassLevel] = useState("");
    const [stream, setStream] = useState("");
    const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
    const [selectedGoal, setSelectedGoal] = useState("");

    const progress = (step / totalSteps) * 100;

    const handleInterestToggle = (interest: string) => {
        setSelectedInterests((prev) =>
            prev.includes(interest)
                ? prev.filter((i) => i !== interest)
                : [...prev, interest]
        );
    };

    const handleNext = () => {
        if (step < totalSteps) {
            setStep(step + 1);
        }
    };

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

    const handleComplete = () => {
        updateUser({
            age: parseInt(age),
            class: classLevel,
            stream,
            interests: selectedInterests,
            careerGoal: selectedGoal,
        });
        navigate("/quiz");
    };

    const isStep1Valid = age && classLevel && stream;
    const isStep2Valid = selectedInterests.length > 0;
    const isStep3Valid = selectedGoal;

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-white p-6">
            <div className="max-w-3xl mx-auto pt-12">
                {/* Progress Bar */}
                <div className="mb-12">
                    <div className="flex justify-between mb-4">
                        <h2 className="text-2xl font-bold">Let's Get to Know You</h2>
                        <span className="text-gray-600">
                            Step {step} of {totalSteps}
                        </span>
                    </div>
                    <Progress value={progress} className="h-3" />
                </div>

                {/* Steps */}
                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="bg-white rounded-3xl shadow-xl p-10 border border-purple-100"
                        >
                            <h3 className="text-3xl font-bold mb-2">Basic Information</h3>
                            <p className="text-gray-600 mb-8">
                                Tell us a bit about your academic background
                            </p>

                            <div className="space-y-6">
                                <div>
                                    <Label htmlFor="age">Age</Label>
                                    <Input
                                        id="age"
                                        type="number"
                                        placeholder="18"
                                        value={age}
                                        onChange={(e) => setAge(e.target.value)}
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="class">Current Class / Year</Label>
                                    <Input
                                        id="class"
                                        type="text"
                                        placeholder="12th Grade / Undergraduate / Graduate"
                                        value={classLevel}
                                        onChange={(e) => setClassLevel(e.target.value)}
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="stream">Stream / Major</Label>
                                    <Input
                                        id="stream"
                                        type="text"
                                        placeholder="Science / Commerce / Arts / Engineering"
                                        value={stream}
                                        onChange={(e) => setStream(e.target.value)}
                                        className="mt-2"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end mt-8">
                                <Button
                                    onClick={handleNext}
                                    disabled={!isStep1Valid}
                                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                                >
                                    Next <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </div>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="bg-white rounded-3xl shadow-xl p-10 border border-purple-100"
                        >
                            <h3 className="text-3xl font-bold mb-2">Your Interests</h3>
                            <p className="text-gray-600 mb-8">
                                Select all areas that interest you (choose at least one)
                            </p>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {interests.map((interest) => (
                                    <motion.button
                                        key={interest}
                                        onClick={() => handleInterestToggle(interest)}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`p-4 rounded-xl border-2 transition-all ${selectedInterests.includes(interest)
                                                ? "border-purple-600 bg-gradient-to-br from-purple-50 to-blue-50"
                                                : "border-gray-200 hover:border-purple-300"
                                            }`}
                                    >
                                        <span className="font-medium">{interest}</span>
                                    </motion.button>
                                ))}
                            </div>

                            <div className="flex justify-between mt-8">
                                <Button onClick={handleBack} variant="outline">
                                    <ArrowLeft className="w-4 h-4 mr-2" /> Back
                                </Button>
                                <Button
                                    onClick={handleNext}
                                    disabled={!isStep2Valid}
                                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                                >
                                    Next <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="bg-white rounded-3xl shadow-xl p-10 border border-purple-100"
                        >
                            <h3 className="text-3xl font-bold mb-2">Career Goals</h3>
                            <p className="text-gray-600 mb-8">
                                Where are you in your career journey?
                            </p>

                            <div className="space-y-4">
                                {careerGoals.map((goal) => (
                                    <motion.button
                                        key={goal.value}
                                        onClick={() => setSelectedGoal(goal.value)}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className={`w-full p-6 rounded-2xl border-2 transition-all flex items-center gap-4 ${selectedGoal === goal.value
                                                ? "border-purple-600 bg-gradient-to-br from-purple-50 to-blue-50"
                                                : "border-gray-200 hover:border-purple-300"
                                            }`}
                                    >
                                        <span className="text-4xl">{goal.emoji}</span>
                                        <div className="text-left">
                                            <div className="text-xl font-semibold">{goal.label}</div>
                                        </div>
                                    </motion.button>
                                ))}
                            </div>

                            <div className="flex justify-between mt-8">
                                <Button onClick={handleBack} variant="outline">
                                    <ArrowLeft className="w-4 h-4 mr-2" /> Back
                                </Button>
                                <Button
                                    onClick={handleComplete}
                                    disabled={!isStep3Valid}
                                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                                >
                                    Continue to Quiz <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
