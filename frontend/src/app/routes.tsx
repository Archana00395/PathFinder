import { createBrowserRouter } from "react-router";
import { Landing } from "./pages/Landing";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Onboarding } from "./pages/Onboarding";
import { Quiz } from "./pages/Quiz";
import { Chat } from "./pages/Chat";
import { Recommendations } from "./pages/Recommendations";
import { Roadmap } from "./pages/Roadmap";
import { Dashboard } from "./pages/Dashboard";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: Landing,
    },
    {
        path: "/login",
        Component: Login,
    },
    {
        path: "/signup",
        Component: Signup,
    },
    {
        path: "/onboarding",
        Component: Onboarding,
    },
    {
        path: "/quiz",
        Component: Quiz,
    },
    {
        path: "/chat",
        Component: Chat,
    },
    {
        path: "/recommendations",
        Component: Recommendations,
    },
    {
        path: "/roadmap/:careerSlug",
        Component: Roadmap,
    },
    {
        path: "/dashboard",
        Component: Dashboard,
    },
]);