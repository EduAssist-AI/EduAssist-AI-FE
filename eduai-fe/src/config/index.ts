export const siteConfig = {
  name: "EduAssist AI",
  description: "Upload educational videos and get AI-generated summaries, interactive Q&A, and personalized quizzes to enhance your learning.",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
  links: {
    github: "https://github.com/EduAssist-AI",
  },
};

export const isDev = process.env.NODE_ENV === "development";