const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
const apiBaseUrl =
  process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:3900";

export const appConfig = {
  title: "Simple CRM",
  description:
    "A lightweight CRM to manage customer relationships, improve communication, and enhance business productivity effectively.",
  appUrl,
  apiBaseUrl,
  robots: "noindex, nofollow",
  author: {
    name: "Biprodas Roy",
    website: "https://biprodas.me",
  },
  links: {
    linkedIn: "https://www.linkedin.com/in/biprodas-roy",
    github: "https://github.com/biprodas/simple-crm",
  },
};

export type AppConfig = typeof appConfig;
