import { chariowDesignSystem } from "@/config/design-system";

export const siteConfig = {
  name: "Chariow",
  description: chariowDesignSystem.brandName,
  url: process.env.AUTH_URL ?? "http://localhost:3000",
  links: {
    pricing: "/pricing",
    features: "/features",
    login: "/login",
    register: "/register",
    dashboard: "/dashboard",
  },
};
