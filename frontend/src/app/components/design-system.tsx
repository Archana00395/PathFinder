import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
    ArrowRight,
    CheckCircle2,
    ChevronDown,
    Globe2,
    Loader2,
    Moon,
    Sparkles,
    SunMedium,
} from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { cn } from "./ui/utils";

const appLinks = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Chat", href: "/chat" },
    { label: "Recommendations", href: "/recommendations" },
    { label: "Roadmap", href: "/dashboard" },
];

export function Navbar({ actions }: { actions?: ReactNode }) {
    const navigate = useNavigate();

    return (
        <header className="border-b border-slate-200/80 bg-white/70 px-4 py-3 backdrop-blur-xl sm:px-6">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
                <button
                    type="button"
                    onClick={() => navigate("/")}
                    className="flex items-center gap-3 text-left transition-transform duration-200 hover:-translate-y-0.5"
                >
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 via-violet-600 to-cyan-500 shadow-[0_18px_40px_-20px_rgba(99,102,241,0.9)]">
                        <Sparkles className="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <div className="text-lg font-black tracking-[0.18em] text-slate-900">
                            PATHFINDERS
                        </div>
                        <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-500">
                            Where Dreams Meet Direction
                        </div>
                    </div>
                </button>

                <nav className="hidden items-center gap-6 md:flex">
                    {appLinks.map((link) => (
                        <button
                            key={link.label}
                            type="button"
                            onClick={() => navigate(link.href)}
                            className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
                        >
                            {link.label}
                        </button>
                    ))}
                </nav>

                <div className="flex items-center gap-2 sm:gap-3">
                    <ThemeToggle />
                    <LanguageSelector />
                    {actions ?? (
                        <PrimaryButton onClick={() => navigate("/signup")} size="sm">
                            Get started
                        </PrimaryButton>
                    )}
                </div>
            </div>
        </header>
    );
}

export function Sidebar({ className }: { className?: string }) {
    const navigate = useNavigate();

    return (
        <aside
            className={cn(
                "hidden w-72 border-r border-slate-200/80 bg-slate-50/80 p-5 lg:block",
                className,
            )}
        >
            <div className="mb-6 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/90 p-3 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-500">
                    <Sparkles className="h-4 w-4 text-white" />
                </div>
                <div>
                    <div className="text-sm font-semibold text-slate-900">Career workspace</div>
                    <div className="text-xs text-slate-500">Progress overview</div>
                </div>
            </div>

            <div className="space-y-2">
                {appLinks.map((link) => (
                    <button
                        key={link.label}
                        type="button"
                        onClick={() => navigate(link.href)}
                        className="flex w-full items-center justify-between rounded-xl border border-transparent px-3 py-2 text-left text-sm font-medium text-slate-600 transition-all hover:border-indigo-100 hover:bg-white hover:text-slate-900"
                    >
                        <span>{link.label}</span>
                        <ArrowRight className="h-4 w-4 opacity-60" />
                    </button>
                ))}
            </div>
        </aside>
    );
}

export function AppShell({
    children,
    className,
    showSidebar = false,
}: {
    children: ReactNode;
    className?: string;
    showSidebar?: boolean;
}) {
    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(165,180,252,0.20),transparent_30%),linear-gradient(135deg,#f8faff_0%,#eef2ff_35%,#f8fafc_100%)] text-slate-900">
            <div className="mx-auto max-w-[1600px] px-4 py-4 sm:px-6 lg:px-8">
                <div className="overflow-hidden rounded-[28px] border border-slate-200/80 bg-white/75 shadow-[0_30px_100px_-45px_rgba(15,23,42,0.35)] backdrop-blur-2xl">
                    <Navbar />
                    <div className={cn("flex", showSidebar && "min-h-[calc(100vh-92px)]")}> 
                        {showSidebar && <Sidebar />}
                        <main className={cn("flex-1", className)}>{children}</main>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function PageHeader({
    eyebrow,
    title,
    description,
    action,
    align = "left",
}: {
    eyebrow?: string;
    title: string;
    description?: string;
    action?: ReactNode;
    align?: "left" | "center";
}) {
    return (
        <div
            className={cn(
                "mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
                align === "center" && "items-center text-center sm:flex-col",
            )}
        >
            <div className={cn("space-y-3", align === "center" && "mx-auto max-w-2xl") }>
                {eyebrow && (
                    <StatusBadge variant="info" className="inline-flex">
                        {eyebrow}
                    </StatusBadge>
                )}
                <div>
                    <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                        {title}
                    </h1>
                    {description && (
                        <p className="mt-2 max-w-2xl text-base text-slate-600 sm:text-lg">
                            {description}
                        </p>
                    )}
                </div>
            </div>
            {action}
        </div>
    );
}

export function SectionHeader({
    title,
    description,
    action,
}: {
    title: string;
    description?: string;
    action?: ReactNode;
}) {
    return (
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
                <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                    {title}
                </h2>
                {description && <p className="mt-1 text-sm text-slate-600">{description}</p>}
            </div>
            {action}
        </div>
    );
}

export function StatCard({
    label,
    value,
    sublabel,
}: {
    label: string;
    value: string;
    sublabel?: string;
}) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-[0_20px_45px_-35px_rgba(15,23,42,0.4)]">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                {label}
            </div>
            <div className="mt-4 text-3xl font-black text-slate-900">{value}</div>
            {sublabel && <div className="mt-1 text-sm text-slate-600">{sublabel}</div>}
        </div>
    );
}

export function ProgressCard({
    title,
    value,
    description,
    tone = "indigo",
}: {
    title: string;
    value: number;
    description?: string;
    tone?: "indigo" | "cyan" | "emerald" | "amber";
}) {
    const accentClass = {
        indigo: "from-indigo-600 to-violet-500",
        cyan: "from-cyan-500 to-sky-500",
        emerald: "from-emerald-500 to-teal-500",
        amber: "from-amber-500 to-orange-500",
    }[tone];

    return (
        <div className="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-[0_18px_40px_-32px_rgba(15,23,42,0.35)]">
            <div className="mb-3 flex items-center justify-between gap-2">
                <span className="text-sm font-semibold text-slate-700">{title}</span>
                <StatusBadge variant={value >= 70 ? "success" : value >= 40 ? "warning" : "neutral"}>
                    {value}%
                </StatusBadge>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                <div
                    className={cn("h-full rounded-full bg-gradient-to-r", accentClass)}
                    style={{ width: `${Math.min(value, 100)}%` }}
                />
            </div>
            {description && <p className="mt-3 text-sm text-slate-600">{description}</p>}
        </div>
    );
}

export function CareerCard({
    title,
    description,
    matchPercentage,
    skills,
    onAction,
}: {
    title: string;
    description: string;
    matchPercentage: number;
    skills?: string[];
    onAction?: () => void;
}) {
    return (
        <div className="group overflow-hidden rounded-[26px] border border-slate-200 bg-white/90 shadow-[0_30px_70px_-44px_rgba(15,23,42,0.38)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_38px_90px_-48px_rgba(79,70,229,0.5)]">
            <div className="bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 p-5 text-white sm:p-6">
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <div className="mb-3 flex flex-wrap gap-2">
                            <StatusBadge variant="light">#{matchPercentage}% match</StatusBadge>
                        </div>
                        <h3 className="text-2xl font-black tracking-tight">{title}</h3>
                    </div>
                    <div className="rounded-2xl border border-white/25 bg-white/10 px-3 py-2 text-right backdrop-blur-sm">
                        <div className="text-2xl font-black">{matchPercentage}%</div>
                        <div className="text-[10px] uppercase tracking-[0.2em] text-indigo-100">
                            Fit
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-5 p-5 sm:p-6">
                <p className="text-sm leading-6 text-slate-600">{description}</p>

                {skills && skills.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {skills.slice(0, 5).map((skill) => (
                            <span
                                key={skill}
                                className="rounded-full border border-indigo-100 bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                )}

                <PrimaryButton className="w-full" onClick={onAction}>
                    Explore path <ArrowRight className="h-4 w-4" />
                </PrimaryButton>
            </div>
        </div>
    );
}

export function EmptyState({
    title,
    description,
    action,
}: {
    title: string;
    description: string;
    action?: ReactNode;
}) {
    return (
        <div className="rounded-[28px] border border-dashed border-slate-300 bg-slate-50/80 p-10 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                <Sparkles className="h-7 w-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">{title}</h3>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600">{description}</p>
            {action && <div className="mt-6 flex justify-center">{action}</div>}
        </div>
    );
}

export function LoadingState({ label = "Loading your path..." }: { label?: string }) {
    return (
        <div className="flex min-h-[220px] items-center justify-center rounded-[28px] border border-slate-200 bg-white/80 p-8">
            <div className="flex items-center gap-3 text-slate-600">
                <Loader2 className="h-5 w-5 animate-spin text-indigo-600" />
                <span className="text-sm font-medium">{label}</span>
            </div>
        </div>
    );
}

export function StatusBadge({
    children,
    variant = "neutral",
    className,
}: {
    children: ReactNode;
    variant?: "neutral" | "success" | "warning" | "info" | "light";
    className?: string;
}) {
    const variants = {
        neutral: "border-slate-200 bg-slate-100 text-slate-700",
        success: "border-emerald-200 bg-emerald-50 text-emerald-700",
        warning: "border-amber-200 bg-amber-50 text-amber-700",
        info: "border-indigo-200 bg-indigo-50 text-indigo-700",
        light: "border-white/25 bg-white/10 text-white",
    } as const;

    return (
        <span
            className={cn(
                "inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em]",
                variants[variant],
                className,
            )}
        >
            {children}
        </span>
    );
}

export function PrimaryButton({
    children,
    className,
    ...props
}: React.ComponentProps<typeof Button>) {
    return (
        <Button
            className={cn(
                "bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 text-white shadow-[0_18px_45px_-18px_rgba(99,102,241,0.9)] hover:brightness-110",
                className,
            )}
            {...props}
        >
            {children}
        </Button>
    );
}

export function ThemeToggle() {
    const [isDark, setIsDark] = useState<boolean>(() =>
        document.documentElement.classList.contains("dark"),
    );

    useEffect(() => {
        document.documentElement.classList.toggle("dark", isDark);
        localStorage.setItem("pathfinders-theme", isDark ? "dark" : "light");
    }, [isDark]);

    return (
        <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label="Toggle theme"
            onClick={() => setIsDark((prev) => !prev)}
            className="rounded-full border-slate-200 bg-white/80 text-slate-700 shadow-sm hover:bg-slate-50"
        >
            {isDark ? <SunMedium className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
    );
}

export function LanguageSelector() {
    const [language, setLanguage] = useState("EN");

    return (
        <div className="relative">
            <label className="sr-only">Select language</label>
            <select
                aria-label="Select language"
                value={language}
                onChange={(event) => setLanguage(event.target.value)}
                className="appearance-none rounded-full border border-slate-200 bg-white/80 px-3 py-2 pr-9 text-sm font-medium text-slate-700 shadow-sm outline-none transition focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
            >
                <option value="EN">EN</option>
                <option value="HI">HI</option>
                <option value="ES">ES</option>
            </select>
            <Globe2 className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <ChevronDown className="pointer-events-none absolute right-1 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
        </div>
    );
}

export function CheckItem({ label }: { label: string }) {
    return (
        <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3">
            <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <CheckCircle2 className="h-3.5 w-3.5" />
            </span>
            <span className="text-sm font-medium text-slate-700">{label}</span>
        </div>
    );
}
