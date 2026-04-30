import { motion } from "motion/react";
import { useNavigate, useParams } from "react-router";
import { Button } from "../components/ui/button";
import { useUser } from "../contexts/UserContext";
import {
    GraduationCap,
    Code,
    Award,
    Briefcase,
    BookOpen,
    Target,
    CheckCircle2,
    ArrowLeft,
} from "lucide-react";
import { Badge } from "../components/ui/badge";

interface RoadmapStep {
    phase: string;
    duration: string;
    icon: any;
    items: {
        title: string;
        description: string;
        resources?: string[];
    }[];
}

const roadmapData: Record<string, RoadmapStep[]> = {
    "data-scientist": [
        {
            phase: "Foundation (6-12 months)",
            duration: "6-12 months",
            icon: GraduationCap,
            items: [
                {
                    title: "Mathematics & Statistics",
                    description:
                        "Master linear algebra, calculus, probability, and statistics",
                    resources: ["Khan Academy", "MIT OpenCourseWare", "3Blue1Brown"],
                },
                {
                    title: "Programming Fundamentals",
                    description: "Learn Python and R for data analysis",
                    resources: ["Codecademy", "DataCamp", "Python.org tutorials"],
                },
                {
                    title: "SQL & Databases",
                    description: "Understand relational databases and query optimization",
                    resources: ["SQLZoo", "Mode Analytics SQL Tutorial"],
                },
            ],
        },
        {
            phase: "Core Skills (6-12 months)",
            duration: "6-12 months",
            icon: Code,
            items: [
                {
                    title: "Machine Learning",
                    description:
                        "Study supervised, unsupervised learning, and neural networks",
                    resources: ["Coursera ML by Andrew Ng", "Fast.ai", "Scikit-learn docs"],
                },
                {
                    title: "Data Visualization",
                    description: "Master tools like Matplotlib, Seaborn, Tableau, and Power BI",
                    resources: ["Tableau Public", "D3.js tutorials"],
                },
                {
                    title: "Big Data Technologies",
                    description: "Learn Spark, Hadoop, and distributed computing",
                    resources: ["Apache Spark docs", "Databricks tutorials"],
                },
            ],
        },
        {
            phase: "Certifications (3-6 months)",
            duration: "3-6 months",
            icon: Award,
            items: [
                {
                    title: "Professional Certifications",
                    description: "Earn industry-recognized credentials",
                    resources: [
                        "Google Data Analytics Certificate",
                        "IBM Data Science Professional",
                        "AWS Certified Machine Learning",
                    ],
                },
            ],
        },
        {
            phase: "Projects & Portfolio (Ongoing)",
            duration: "Ongoing",
            icon: Target,
            items: [
                {
                    title: "Build Real Projects",
                    description: "Create 5-10 portfolio projects showcasing your skills",
                    resources: [
                        "Kaggle competitions",
                        "UCI Machine Learning Repository",
                        "GitHub",
                    ],
                },
                {
                    title: "Contribute to Open Source",
                    description: "Contribute to data science libraries and tools",
                },
            ],
        },
        {
            phase: "Career Launch (3-6 months)",
            duration: "3-6 months",
            icon: Briefcase,
            items: [
                {
                    title: "Entry-Level Positions",
                    description:
                        "Apply for Junior Data Analyst, ML Engineer, or Data Scientist roles",
                    resources: ["LinkedIn", "Indeed", "AngelList"],
                },
                {
                    title: "Networking",
                    description: "Attend meetups, conferences, and build connections",
                    resources: ["Meetup.com", "Data Science conferences"],
                },
            ],
        },
    ],
    "ux-designer": [
        {
            phase: "Foundation (3-6 months)",
            duration: "3-6 months",
            icon: GraduationCap,
            items: [
                {
                    title: "Design Principles",
                    description: "Learn color theory, typography, layout, and visual hierarchy",
                    resources: ["Refactoring UI", "Design Better podcast"],
                },
                {
                    title: "User Research Basics",
                    description: "Understand user interviews, surveys, and usability testing",
                    resources: ["Nielsen Norman Group", "UX Research courses"],
                },
                {
                    title: "Design Tools",
                    description: "Master Figma, Adobe XD, and prototyping tools",
                    resources: ["Figma tutorials", "Adobe XD resources"],
                },
            ],
        },
        {
            phase: "Core Skills (6-9 months)",
            duration: "6-9 months",
            icon: Code,
            items: [
                {
                    title: "Interaction Design",
                    description: "Create engaging user flows and micro-interactions",
                    resources: ["Interaction Design Foundation"],
                },
                {
                    title: "Wireframing & Prototyping",
                    description: "Build low and high-fidelity prototypes",
                    resources: ["ProtoPie", "Principle for Mac"],
                },
                {
                    title: "Design Systems",
                    description: "Learn to create and maintain scalable design systems",
                    resources: ["Material Design", "Apple HIG"],
                },
            ],
        },
        {
            phase: "Specialization (3-6 months)",
            duration: "3-6 months",
            icon: Target,
            items: [
                {
                    title: "Advanced UX",
                    description: "Dive into accessibility, mobile design, and psychology",
                    resources: ["A11y Project", "Laws of UX"],
                },
                {
                    title: "Front-end Basics",
                    description: "Learn HTML, CSS, and basic JavaScript for better collaboration",
                    resources: ["FreeCodeCamp", "CSS Tricks"],
                },
            ],
        },
        {
            phase: "Portfolio & Projects (Ongoing)",
            duration: "Ongoing",
            icon: BookOpen,
            items: [
                {
                    title: "Build Portfolio",
                    description: "Create 5-8 case studies showcasing your process",
                    resources: ["Behance", "Dribbble", "Personal website"],
                },
                {
                    title: "Redesign Projects",
                    description: "Improve existing apps/websites as practice",
                },
            ],
        },
        {
            phase: "Career Launch (2-4 months)",
            duration: "2-4 months",
            icon: Briefcase,
            items: [
                {
                    title: "Job Applications",
                    description: "Apply for UX Designer, Product Designer positions",
                    resources: ["Behance Jobs", "Dribbble Jobs", "LinkedIn"],
                },
                {
                    title: "Design Community",
                    description: "Join design communities and attend events",
                    resources: ["Designer Hangout", "UX conferences"],
                },
            ],
        },
    ],
    "product-manager": [
        {
            phase: "Foundation (4-6 months)",
            duration: "4-6 months",
            icon: GraduationCap,
            items: [
                {
                    title: "Product Management Fundamentals",
                    description: "Understand product lifecycle, roadmaps, and strategy",
                    resources: ["Product School", "Reforge courses"],
                },
                {
                    title: "Technical Literacy",
                    description: "Learn basics of software development and APIs",
                    resources: ["Codecademy", "Technical PM resources"],
                },
                {
                    title: "Business & Analytics",
                    description: "Master metrics, KPIs, and data-driven decision making",
                    resources: ["Google Analytics", "Mixpanel courses"],
                },
            ],
        },
        {
            phase: "Core Skills (6-9 months)",
            duration: "6-9 months",
            icon: Code,
            items: [
                {
                    title: "User Research & Design Thinking",
                    description: "Conduct user interviews and validate product ideas",
                    resources: ["IDEO resources", "Jobs to be Done framework"],
                },
                {
                    title: "Agile & Scrum",
                    description: "Learn sprint planning, backlog management, and ceremonies",
                    resources: ["Scrum.org", "Agile Alliance"],
                },
                {
                    title: "Stakeholder Management",
                    description: "Develop communication and negotiation skills",
                    resources: ["Crucial Conversations book"],
                },
            ],
        },
        {
            phase: "Certifications (2-4 months)",
            duration: "2-4 months",
            icon: Award,
            items: [
                {
                    title: "PM Certifications",
                    description: "Earn recognized product management credentials",
                    resources: [
                        "Certified Scrum Product Owner (CSPO)",
                        "Product Management Certificate (PMC)",
                    ],
                },
            ],
        },
        {
            phase: "Experience Building (Ongoing)",
            duration: "Ongoing",
            icon: Target,
            items: [
                {
                    title: "Side Projects",
                    description: "Build and launch your own products or features",
                    resources: ["Product Hunt", "Indie Hackers"],
                },
                {
                    title: "Case Studies",
                    description: "Document product decisions and outcomes",
                },
            ],
        },
        {
            phase: "Career Launch (3-6 months)",
            duration: "3-6 months",
            icon: Briefcase,
            items: [
                {
                    title: "Entry Roles",
                    description:
                        "Start as Associate PM, Junior PM, or Product Analyst",
                    resources: ["LinkedIn PM jobs", "AngelList"],
                },
                {
                    title: "PM Community",
                    description: "Network with other product managers",
                    resources: ["Product School community", "Mind the Product"],
                },
            ],
        },
    ],
    "software-engineer": [
        {
            phase: "Foundation (6-12 months)",
            duration: "6-12 months",
            icon: GraduationCap,
            items: [
                {
                    title: "Programming Fundamentals",
                    description: "Master one language deeply (Python, Java, or JavaScript)",
                    resources: ["CS50", "FreeCodeCamp", "The Odin Project"],
                },
                {
                    title: "Data Structures & Algorithms",
                    description: "Learn arrays, trees, graphs, sorting, and searching",
                    resources: ["LeetCode", "HackerRank", "Cracking the Coding Interview"],
                },
                {
                    title: "Version Control",
                    description: "Master Git and GitHub workflows",
                    resources: ["Git documentation", "GitHub Learning Lab"],
                },
            ],
        },
        {
            phase: "Core Development (6-12 months)",
            duration: "6-12 months",
            icon: Code,
            items: [
                {
                    title: "Web Development",
                    description: "Learn frontend (React) and/or backend (Node.js, Django)",
                    resources: ["MDN Web Docs", "React documentation", "Node.js guides"],
                },
                {
                    title: "Databases",
                    description: "Understand SQL and NoSQL databases",
                    resources: ["PostgreSQL tutorial", "MongoDB University"],
                },
                {
                    title: "System Design",
                    description: "Learn to design scalable systems and architectures",
                    resources: ["System Design Primer", "Grokking System Design"],
                },
            ],
        },
        {
            phase: "Advanced Topics (4-8 months)",
            duration: "4-8 months",
            icon: Target,
            items: [
                {
                    title: "DevOps & Cloud",
                    description: "Learn Docker, Kubernetes, AWS/Azure/GCP",
                    resources: ["Docker documentation", "AWS tutorials"],
                },
                {
                    title: "Testing & CI/CD",
                    description: "Master unit testing, integration testing, and pipelines",
                    resources: ["Jest docs", "GitHub Actions"],
                },
            ],
        },
        {
            phase: "Portfolio Projects (Ongoing)",
            duration: "Ongoing",
            icon: BookOpen,
            items: [
                {
                    title: "Build Real Applications",
                    description: "Create 5-10 full-stack projects",
                    resources: ["GitHub", "Deploy on Vercel/Netlify"],
                },
                {
                    title: "Open Source Contributions",
                    description: "Contribute to popular open-source projects",
                    resources: ["First Timers Only", "Good First Issue"],
                },
            ],
        },
        {
            phase: "Job Ready (3-6 months)",
            duration: "3-6 months",
            icon: Briefcase,
            items: [
                {
                    title: "Interview Prep",
                    description: "Practice coding interviews and system design",
                    resources: ["LeetCode", "Pramp", "Interviewing.io"],
                },
                {
                    title: "Apply & Network",
                    description: "Target startups, tech companies, and network actively",
                    resources: ["LinkedIn", "AngelList", "Tech meetups"],
                },
            ],
        },
    ],
    "digital-marketer": [
        {
            phase: "Foundation (3-6 months)",
            duration: "3-6 months",
            icon: GraduationCap,
            items: [
                {
                    title: "Marketing Fundamentals",
                    description: "Understand customer journey, funnels, and positioning",
                    resources: ["HubSpot Academy", "Google Digital Garage"],
                },
                {
                    title: "Content Creation",
                    description: "Learn copywriting, visual content, and storytelling",
                    resources: ["Copyblogger", "Canva Design School"],
                },
            ],
        },
        {
            phase: "Core Channels (6-9 months)",
            duration: "6-9 months",
            icon: Code,
            items: [
                {
                    title: "SEO & SEM",
                    description: "Master search engine optimization and paid search",
                    resources: ["Moz Beginner's Guide", "Google Ads certification"],
                },
                {
                    title: "Social Media Marketing",
                    description: "Learn platform strategies for Instagram, LinkedIn, Twitter",
                    resources: ["Meta Blueprint", "Hootsuite Academy"],
                },
                {
                    title: "Email Marketing",
                    description: "Build campaigns, automation, and nurture sequences",
                    resources: ["Mailchimp resources", "Really Good Emails"],
                },
            ],
        },
        {
            phase: "Analytics & Tools (3-6 months)",
            duration: "3-6 months",
            icon: Target,
            items: [
                {
                    title: "Marketing Analytics",
                    description: "Track metrics, attribution, and ROI",
                    resources: ["Google Analytics certification", "Data Studio"],
                },
                {
                    title: "Marketing Automation",
                    description: "Use tools like HubSpot, Marketo, or ActiveCampaign",
                },
            ],
        },
        {
            phase: "Portfolio & Experience (Ongoing)",
            duration: "Ongoing",
            icon: BookOpen,
            items: [
                {
                    title: "Campaign Projects",
                    description: "Run campaigns for small businesses or personal projects",
                    resources: ["Fiverr", "Upwork for practice"],
                },
            ],
        },
        {
            phase: "Career Launch (2-4 months)",
            duration: "2-4 months",
            icon: Briefcase,
            items: [
                {
                    title: "Marketing Roles",
                    description: "Apply for Digital Marketing Specialist, Social Media Manager",
                    resources: ["LinkedIn Jobs", "Marketing agencies"],
                },
            ],
        },
    ],
};

export const Roadmap = () => {
    const navigate = useNavigate();
    const { careerSlug } = useParams();
    const { user } = useUser();

    const career = user?.recommendations?.find((c) => c.id === careerSlug);
    const roadmap = roadmapData[careerSlug || ""];

    if (!career || !roadmap) {
        navigate("/recommendations");
        return null;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-white p-6">
            <div className="max-w-5xl mx-auto py-12">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <Button
                        onClick={() => navigate("/recommendations")}
                        variant="ghost"
                        className="mb-6"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Recommendations
                    </Button>

                    <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-10 text-white mb-12">
                        <h1 className="text-4xl font-bold mb-4">{career.title} Roadmap</h1>
                        <p className="text-xl text-purple-100 mb-6">
                            Your step-by-step path to becoming a {career.title}
                        </p>
                        <div className="flex gap-3">
                            <Badge className="bg-white/20 text-white border-white/30">
                                {career.matchPercentage}% Match
                            </Badge>
                            <Badge className="bg-white/20 text-white border-white/30">
                                18-36 months timeline
                            </Badge>
                        </div>
                    </div>
                </motion.div>

                {/* Roadmap Steps */}
                <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-300 via-blue-300 to-purple-300" />

                    <div className="space-y-12">
                        {roadmap.map((step, stepIndex) => (
                            <motion.div
                                key={stepIndex}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: stepIndex * 0.2 }}
                                className="relative"
                            >
                                {/* Phase Icon */}
                                <div className="absolute left-0 w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg z-10">
                                    <step.icon className="w-8 h-8 text-white" />
                                </div>

                                {/* Content Card */}
                                <div className="ml-24 bg-white rounded-3xl shadow-xl border border-purple-100 p-8">
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-2xl font-bold">{step.phase}</h2>
                                        <Badge variant="outline" className="text-purple-700 border-purple-300">
                                            {step.duration}
                                        </Badge>
                                    </div>

                                    <div className="space-y-6">
                                        {step.items.map((item, itemIndex) => (
                                            <div
                                                key={itemIndex}
                                                className="border-l-4 border-purple-200 pl-6 py-2"
                                            >
                                                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                                                    <CheckCircle2 className="w-5 h-5 text-purple-600" />
                                                    {item.title}
                                                </h3>
                                                <p className="text-gray-700 mb-3">{item.description}</p>
                                                {item.resources && (
                                                    <div className="flex flex-wrap gap-2">
                                                        {item.resources.map((resource, i) => (
                                                            <Badge
                                                                key={i}
                                                                variant="outline"
                                                                className="bg-blue-50 border-blue-200 text-blue-700"
                                                            >
                                                                {resource}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Footer Actions */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-12 text-center"
                >
                    <div className="bg-white rounded-3xl shadow-xl border border-purple-100 p-8 mb-6">
                        <h3 className="text-2xl font-bold mb-4">Ready to Start?</h3>
                        <p className="text-gray-600 mb-6">
                            Remember, this is a guide - you can adapt it to your pace and circumstances.
                            The key is consistent progress!
                        </p>
                        <div className="flex justify-center gap-4">
                            <Button
                                onClick={() => navigate("/recommendations")}
                                variant="outline"
                                size="lg"
                            >
                                View Other Careers
                            </Button>
                            <Button
                                onClick={() => navigate("/dashboard")}
                                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                                size="lg"
                            >
                                Go to Dashboard
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};
