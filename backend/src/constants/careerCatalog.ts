import { CareerCatalogEntry, CareerRoadmap } from "../types/domain";

export const careerCatalog: CareerCatalogEntry[] = [
  {
    id: "data-scientist",
    title: "Data Scientist",
    description:
      "Analyze data, build predictive models, and help organizations make evidence-based decisions.",
    weights: { analytical: 0.45, creative: 0.1, social: 0.1, practical: 0.35 },
    interestTags: ["technology", "science", "finance", "engineering"],
    requiredSkills: [
      "Python or R",
      "Statistics",
      "Machine Learning",
      "SQL",
      "Data Visualization",
    ],
    pros: [
      "High demand across industries",
      "Strong salary growth",
      "Intellectually challenging work",
      "Good remote-friendly opportunities",
    ],
    cons: [
      "Requires strong math foundations",
      "Continuous learning is essential",
      "Some projects can become repetitive",
    ],
    alternatives: ["Machine Learning Engineer", "Business Analyst", "Quantitative Analyst"],
  },
  {
    id: "ux-designer",
    title: "UX/UI Designer",
    description:
      "Design digital products that are intuitive, engaging, and aligned with user needs.",
    weights: { analytical: 0.15, creative: 0.45, social: 0.25, practical: 0.15 },
    interestTags: ["arts & design", "technology", "writing", "marketing"],
    requiredSkills: [
      "Figma",
      "User Research",
      "Wireframing",
      "Prototyping",
      "Visual Design",
    ],
    pros: [
      "Creative and user-centered work",
      "Growing product ecosystem demand",
      "Portfolio-based career progression",
      "Strong freelance and remote market",
    ],
    cons: [
      "Feedback can be subjective",
      "Requires balancing aesthetics and usability",
      "Deadlines can be intense",
    ],
    alternatives: ["Product Designer", "Graphic Designer", "Brand Strategist"],
  },
  {
    id: "product-manager",
    title: "Product Manager",
    description:
      "Coordinate product strategy, user needs, and delivery across business, design, and engineering teams.",
    weights: { analytical: 0.25, creative: 0.1, social: 0.45, practical: 0.2 },
    interestTags: ["business", "technology", "marketing", "finance"],
    requiredSkills: [
      "Communication",
      "Roadmapping",
      "Stakeholder Management",
      "Analytics",
      "Prioritization",
    ],
    pros: [
      "High-impact cross-functional role",
      "Excellent leadership track",
      "Strong exposure to business strategy",
      "Works across many industries",
    ],
    cons: [
      "High ownership and pressure",
      "Requires balancing many stakeholders",
      "Ambiguity is part of the role",
    ],
    alternatives: ["Project Manager", "Business Analyst", "Operations Manager"],
  },
  {
    id: "software-engineer",
    title: "Software Engineer",
    description:
      "Build software systems, applications, and digital products that solve practical problems.",
    weights: { analytical: 0.35, creative: 0.05, social: 0.1, practical: 0.5 },
    interestTags: ["technology", "engineering", "science"],
    requiredSkills: [
      "Programming",
      "Data Structures",
      "System Design",
      "Databases",
      "Version Control",
    ],
    pros: [
      "Strong hiring market",
      "Excellent pay progression",
      "Lots of specialization paths",
      "Remote work is common",
    ],
    cons: [
      "Fast-changing tools and frameworks",
      "Can be mentally demanding",
      "Deadlines and production issues can be stressful",
    ],
    alternatives: ["Backend Engineer", "DevOps Engineer", "Full-Stack Developer"],
  },
  {
    id: "digital-marketer",
    title: "Digital Marketing Specialist",
    description:
      "Grow brands through content, campaigns, social channels, and measurable digital strategy.",
    weights: { analytical: 0.15, creative: 0.35, social: 0.35, practical: 0.15 },
    interestTags: ["marketing", "business", "writing", "arts & design"],
    requiredSkills: [
      "Content Strategy",
      "SEO",
      "Campaign Planning",
      "Analytics",
      "Social Media",
    ],
    pros: [
      "Fast-moving and creative field",
      "Visible campaign outcomes",
      "Works well for freelancers and agencies",
      "Easy to build a practical portfolio",
    ],
    cons: [
      "Platform algorithms change often",
      "Results pressure can be high",
      "Can become metrics-heavy",
    ],
    alternatives: ["Content Strategist", "Brand Manager", "Growth Marketer"],
  },
];

export const roadmaps: Record<string, CareerRoadmap> = {
  "data-scientist": {
    careerId: "data-scientist",
    title: "Data Scientist Roadmap",
    overview: "A strong path for analytical learners who enjoy data, models, and problem solving.",
    stages: [
      {
        phase: "Foundation",
        duration: "6-12 months",
        items: [
          {
            title: "Math and Statistics",
            description: "Build confidence in probability, statistics, linear algebra, and calculus.",
            resources: ["Khan Academy", "3Blue1Brown", "MIT OpenCourseWare"],
          },
          {
            title: "Python Fundamentals",
            description: "Learn Python syntax, data structures, and notebooks for analysis.",
            resources: ["Python.org", "DataCamp", "FreeCodeCamp"],
          },
        ],
      },
      {
        phase: "Core Skills",
        duration: "6-9 months",
        items: [
          {
            title: "Data Analysis",
            description: "Use Pandas, NumPy, SQL, and visualization tools for real datasets.",
            resources: ["Kaggle", "Mode SQL Tutorial", "Tableau Public"],
          },
          {
            title: "Machine Learning",
            description: "Study supervised and unsupervised models and how to evaluate them.",
            resources: ["Scikit-learn docs", "Coursera ML", "Fast.ai"],
          },
        ],
      },
      {
        phase: "Portfolio and Launch",
        duration: "3-6 months",
        items: [
          {
            title: "Project Portfolio",
            description: "Create 4-6 projects that show business understanding, modeling, and storytelling.",
            resources: ["GitHub", "Kaggle Competitions"],
          },
          {
            title: "Apply to Roles",
            description: "Target analyst and junior data roles while practicing case-based interviews.",
            resources: ["LinkedIn", "Interview Query"],
          },
        ],
      },
    ],
  },
  "ux-designer": {
    careerId: "ux-designer",
    title: "UX/UI Designer Roadmap",
    overview: "A creative, human-centered path for students who want to design meaningful digital experiences.",
    stages: [
      {
        phase: "Design Foundations",
        duration: "3-6 months",
        items: [
          {
            title: "Visual and Interaction Principles",
            description: "Learn typography, spacing, color, hierarchy, and user flows.",
            resources: ["Refactoring UI", "Laws of UX", "Nielsen Norman Group"],
          },
          {
            title: "Tooling",
            description: "Become comfortable with Figma, prototyping, and design handoff.",
            resources: ["Figma Learn", "DesignCourse"],
          },
        ],
      },
      {
        phase: "Research and Product Thinking",
        duration: "4-6 months",
        items: [
          {
            title: "User Research",
            description: "Practice interviews, surveys, persona creation, and usability reviews.",
            resources: ["Interaction Design Foundation", "Maze guides"],
          },
          {
            title: "Case Studies",
            description: "Document your process, decisions, tradeoffs, and outcomes clearly.",
            resources: ["Behance", "Dribbble", "Medium"],
          },
        ],
      },
      {
        phase: "Portfolio and Entry Roles",
        duration: "3-5 months",
        items: [
          {
            title: "Portfolio",
            description: "Publish 3-5 strong case studies with clear business and user outcomes.",
            resources: ["Notion", "Framer", "Webflow"],
          },
          {
            title: "Apply and Network",
            description: "Target internships, apprenticeships, and junior product design roles.",
            resources: ["LinkedIn", "ADPList"],
          },
        ],
      },
    ],
  },
  "product-manager": {
    careerId: "product-manager",
    title: "Product Manager Roadmap",
    overview: "A leadership path for people who enjoy strategy, users, communication, and execution.",
    stages: [
      {
        phase: "Product Basics",
        duration: "3-5 months",
        items: [
          {
            title: "Product Lifecycle",
            description: "Learn discovery, validation, prioritization, roadmaps, and launches.",
            resources: ["Product School", "Mind the Product"],
          },
          {
            title: "Metrics",
            description: "Understand north-star metrics, funnels, retention, and experimentation.",
            resources: ["Amplitude Academy", "Mixpanel guides"],
          },
        ],
      },
      {
        phase: "Cross-functional Execution",
        duration: "4-6 months",
        items: [
          {
            title: "Work with Design and Engineering",
            description: "Practice writing PRDs, defining scope, and aligning on delivery.",
            resources: ["Atlassian guides", "Linear docs"],
          },
          {
            title: "Communication",
            description: "Develop storytelling, stakeholder alignment, and prioritization habits.",
            resources: ["Crucial Conversations", "Reforge essays"],
          },
        ],
      },
      {
        phase: "Proof of Work",
        duration: "3-6 months",
        items: [
          {
            title: "Product Teardowns",
            description: "Publish thoughtful analyses of real apps and possible product improvements.",
            resources: ["Notion", "Substack", "Medium"],
          },
          {
            title: "Associate PM Roles",
            description: "Apply to internships, APM, analyst, or operations roles as the bridge into PM.",
            resources: ["LinkedIn", "Wellfound"],
          },
        ],
      },
    ],
  },
  "software-engineer": {
    careerId: "software-engineer",
    title: "Software Engineer Roadmap",
    overview: "A practical path for builders who like coding, systems, and turning ideas into working products.",
    stages: [
      {
        phase: "Programming Foundation",
        duration: "6-9 months",
        items: [
          {
            title: "Pick a Core Language",
            description: "Learn JavaScript, Python, or Java deeply before branching out.",
            resources: ["MDN", "CS50", "The Odin Project"],
          },
          {
            title: "Problem Solving",
            description: "Study data structures, algorithms, debugging, and code reading.",
            resources: ["LeetCode", "NeetCode", "GeeksforGeeks"],
          },
        ],
      },
      {
        phase: "Application Development",
        duration: "6-9 months",
        items: [
          {
            title: "Build Full Projects",
            description: "Create apps with frontend, backend, APIs, and data storage.",
            resources: ["React docs", "Node.js docs", "MongoDB University"],
          },
          {
            title: "Testing and Deployment",
            description: "Learn Git, unit testing, CI basics, and cloud deployment.",
            resources: ["GitHub", "Jest docs", "Render or Vercel"],
          },
        ],
      },
      {
        phase: "Career Launch",
        duration: "3-6 months",
        items: [
          {
            title: "Portfolio and Resume",
            description: "Show 3-5 strong projects with clear technical decisions and outcomes.",
            resources: ["GitHub", "LinkedIn"],
          },
          {
            title: "Interviews",
            description: "Prepare for DSA, projects discussion, and system basics for internships or junior roles.",
            resources: ["Pramp", "Interviewing.io"],
          },
        ],
      },
    ],
  },
  "digital-marketer": {
    careerId: "digital-marketer",
    title: "Digital Marketing Specialist Roadmap",
    overview: "A strong fit for creative communicators who enjoy campaigns, storytelling, and audience growth.",
    stages: [
      {
        phase: "Marketing Foundations",
        duration: "2-4 months",
        items: [
          {
            title: "Funnels and Positioning",
            description: "Understand how audiences discover, trust, and buy from brands.",
            resources: ["HubSpot Academy", "Google Digital Garage"],
          },
          {
            title: "Content Basics",
            description: "Practice copywriting, storytelling, and content planning.",
            resources: ["Copyblogger", "Canva Design School"],
          },
        ],
      },
      {
        phase: "Channel Skills",
        duration: "4-6 months",
        items: [
          {
            title: "SEO and Social",
            description: "Learn content optimization, organic growth, and platform-specific strategy.",
            resources: ["Moz", "Meta Blueprint", "Ahrefs blog"],
          },
          {
            title: "Campaign Analytics",
            description: "Track CTR, CAC, retention, and channel performance.",
            resources: ["GA4 Academy", "Looker Studio"],
          },
        ],
      },
      {
        phase: "Campaign Portfolio",
        duration: "2-4 months",
        items: [
          {
            title: "Real Campaign Work",
            description: "Run projects for a club, creator, small business, or your own brand.",
            resources: ["Notion", "Canva", "Buffer"],
          },
          {
            title: "Apply to Growth Roles",
            description: "Target digital marketing, content, and social roles with measurable case studies.",
            resources: ["LinkedIn", "Internshala"],
          },
        ],
      },
    ],
  },
};
