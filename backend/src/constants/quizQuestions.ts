import { QuizQuestion } from "../types/domain";

export const quizQuestions: QuizQuestion[] = [
  {
    id: "q1",
    prompt: "When faced with a complex problem, you prefer to:",
    options: [
      {
        id: "q1o1",
        text: "Break it down logically and analyze each part",
        scores: { analytical: 3, creative: 0, social: 0, practical: 1 },
      },
      {
        id: "q1o2",
        text: "Think outside the box and find creative solutions",
        scores: { analytical: 0, creative: 3, social: 0, practical: 1 },
      },
      {
        id: "q1o3",
        text: "Discuss it with others and get different perspectives",
        scores: { analytical: 1, creative: 0, social: 3, practical: 0 },
      },
      {
        id: "q1o4",
        text: "Try a hands-on approach and learn by doing",
        scores: { analytical: 0, creative: 1, social: 0, practical: 3 },
      },
    ],
  },
  {
    id: "q2",
    prompt: "In a group project, you naturally tend to:",
    options: [
      {
        id: "q2o1",
        text: "Organize data and create detailed plans",
        scores: { analytical: 3, creative: 0, social: 1, practical: 1 },
      },
      {
        id: "q2o2",
        text: "Come up with innovative ideas and designs",
        scores: { analytical: 0, creative: 3, social: 1, practical: 0 },
      },
      {
        id: "q2o3",
        text: "Facilitate communication and keep everyone motivated",
        scores: { analytical: 0, creative: 0, social: 3, practical: 1 },
      },
      {
        id: "q2o4",
        text: "Execute tasks and ensure things get done",
        scores: { analytical: 1, creative: 0, social: 1, practical: 3 },
      },
    ],
  },
  {
    id: "q3",
    prompt: "What type of activities do you enjoy most?",
    options: [
      {
        id: "q3o1",
        text: "Solving puzzles, coding, or analyzing data",
        scores: { analytical: 3, creative: 0, social: 0, practical: 1 },
      },
      {
        id: "q3o2",
        text: "Drawing, writing, or creating content",
        scores: { analytical: 0, creative: 3, social: 0, practical: 1 },
      },
      {
        id: "q3o3",
        text: "Teaching, volunteering, or organizing events",
        scores: { analytical: 0, creative: 1, social: 3, practical: 1 },
      },
      {
        id: "q3o4",
        text: "Building things, sports, or hands-on projects",
        scores: { analytical: 0, creative: 1, social: 0, practical: 3 },
      },
    ],
  },
  {
    id: "q4",
    prompt: "Your ideal work environment would be:",
    options: [
      {
        id: "q4o1",
        text: "A quiet space with focus on research and analysis",
        scores: { analytical: 3, creative: 0, social: 0, practical: 1 },
      },
      {
        id: "q4o2",
        text: "A creative studio with freedom to innovate",
        scores: { analytical: 0, creative: 3, social: 1, practical: 0 },
      },
      {
        id: "q4o3",
        text: "A collaborative space with lots of interaction",
        scores: { analytical: 0, creative: 1, social: 3, practical: 0 },
      },
      {
        id: "q4o4",
        text: "A dynamic environment with practical challenges",
        scores: { analytical: 1, creative: 0, social: 0, practical: 3 },
      },
    ],
  },
  {
    id: "q5",
    prompt: "When learning something new, you prefer:",
    options: [
      {
        id: "q5o1",
        text: "Reading detailed documentation and understanding theory",
        scores: { analytical: 3, creative: 0, social: 0, practical: 1 },
      },
      {
        id: "q5o2",
        text: "Experimenting and exploring different approaches",
        scores: { analytical: 0, creative: 3, social: 0, practical: 2 },
      },
      {
        id: "q5o3",
        text: "Learning from others through discussion and collaboration",
        scores: { analytical: 0, creative: 0, social: 3, practical: 1 },
      },
      {
        id: "q5o4",
        text: "Jumping in and learning through practice",
        scores: { analytical: 0, creative: 1, social: 0, practical: 3 },
      },
    ],
  },
  {
    id: "q6",
    prompt: "Which statement resonates with you most?",
    options: [
      {
        id: "q6o1",
        text: "I love finding patterns and solving complex equations",
        scores: { analytical: 3, creative: 0, social: 0, practical: 1 },
      },
      {
        id: "q6o2",
        text: "I express myself best through art and innovation",
        scores: { analytical: 0, creative: 3, social: 0, practical: 0 },
      },
      {
        id: "q6o3",
        text: "I thrive when helping and connecting with people",
        scores: { analytical: 0, creative: 0, social: 3, practical: 1 },
      },
      {
        id: "q6o4",
        text: "I enjoy working with my hands and seeing tangible results",
        scores: { analytical: 0, creative: 1, social: 0, practical: 3 },
      },
    ],
  },
  {
    id: "q7",
    prompt: "In your free time, you're most likely to:",
    options: [
      {
        id: "q7o1",
        text: "Read research papers or watch documentaries",
        scores: { analytical: 3, creative: 0, social: 0, practical: 0 },
      },
      {
        id: "q7o2",
        text: "Work on creative projects or explore new ideas",
        scores: { analytical: 0, creative: 3, social: 0, practical: 1 },
      },
      {
        id: "q7o3",
        text: "Hang out with friends or engage in social activities",
        scores: { analytical: 0, creative: 0, social: 3, practical: 1 },
      },
      {
        id: "q7o4",
        text: "Play sports or work on DIY projects",
        scores: { analytical: 0, creative: 0, social: 1, practical: 3 },
      },
    ],
  },
  {
    id: "q8",
    prompt: "What motivates you most in your work?",
    options: [
      {
        id: "q8o1",
        text: "Discovering insights and solving difficult problems",
        scores: { analytical: 3, creative: 0, social: 0, practical: 1 },
      },
      {
        id: "q8o2",
        text: "Creating something unique and original",
        scores: { analytical: 0, creative: 3, social: 0, practical: 0 },
      },
      {
        id: "q8o3",
        text: "Making a positive impact on people's lives",
        scores: { analytical: 0, creative: 1, social: 3, practical: 1 },
      },
      {
        id: "q8o4",
        text: "Building functional solutions that work",
        scores: { analytical: 1, creative: 0, social: 0, practical: 3 },
      },
    ],
  },
  {
    id: "q9",
    prompt: "How do you approach decision-making?",
    options: [
      {
        id: "q9o1",
        text: "Analyze all data and make logical decisions",
        scores: { analytical: 3, creative: 0, social: 0, practical: 1 },
      },
      {
        id: "q9o2",
        text: "Trust my intuition and creative instincts",
        scores: { analytical: 0, creative: 3, social: 0, practical: 0 },
      },
      {
        id: "q9o3",
        text: "Consult with others and consider everyone's input",
        scores: { analytical: 0, creative: 0, social: 3, practical: 1 },
      },
      {
        id: "q9o4",
        text: "Focus on what's practical and achievable",
        scores: { analytical: 1, creative: 0, social: 0, practical: 3 },
      },
    ],
  },
  {
    id: "q10",
    prompt: "Which of these best describes your strengths?",
    options: [
      {
        id: "q10o1",
        text: "Critical thinking, logic, and attention to detail",
        scores: { analytical: 3, creative: 0, social: 0, practical: 1 },
      },
      {
        id: "q10o2",
        text: "Imagination, originality, and artistic vision",
        scores: { analytical: 0, creative: 3, social: 0, practical: 0 },
      },
      {
        id: "q10o3",
        text: "Empathy, communication, and leadership",
        scores: { analytical: 0, creative: 1, social: 3, practical: 0 },
      },
      {
        id: "q10o4",
        text: "Problem-solving, efficiency, and execution",
        scores: { analytical: 1, creative: 0, social: 0, practical: 3 },
      },
    ],
  },
];
