import {
  DisplayConfig,
  MailchimpConfig,
  RoutesConfig,
  ProtectedRoutesConfig,
  FontsConfig,
  StyleConfig,
  SchemaConfig,
  SameAsConfig,
  SocialSharingConfig,
  EffectsConfig,
  DataStyleConfig,
} from "@/types";

// IMPORTANT: Replace with your own domain address - it's used for SEO in meta tags and schema
const baseURL: string = "https://shahzebx.dev";

const routes: RoutesConfig = {
  "/": true,
  "/about": true,
  "/work": true,
  "/blog": false,
  "/gallery": false,
  "/contact": true,
};

const display: DisplayConfig = {
  location: true,
  time: true,
  themeSwitcher: true,
};

const protectedRoutes: ProtectedRoutesConfig = {};

const mailchimp: MailchimpConfig = {
  action: "",
  effects: {
    display: false,
    position: "bottom",
    duration: 3,
    on: "route",
  },
};

const fonts: FontsConfig = {
  heading: { className: "" } as any,
  body: { className: "" } as any,
  label: { className: "" } as any,
  code: { className: "" } as any,
};

const style: StyleConfig = {
  theme: "system",
  neutral: "gray",
  brand: "cyan",
  accent: "red",
  solid: "contrast",
  solidStyle: "flat",
  border: "playful",
  surface: "translucent",
  transition: "all",
  scaling: "100",
};

const dataStyle: DataStyleConfig = {
  variant: "gradient",
  mode: "categorical",
  height: 24,
  axis: {
    stroke: "var(--neutral-alpha-weak)",
  },
  tick: {
    fill: "var(--neutral-on-background-weak)",
    fontSize: 11,
    line: false,
  },
};

const effects: EffectsConfig = {
  mask: {
    cursor: true,
    x: 0,
    y: 0,
    radius: 200,
  },
  gradient: {
    display: true,
    opacity: 1,
    x: 50,
    y: 50,
    width: 500,
    height: 500,
    tilt: 0,
    colorStart: "#3b82f6",
    colorEnd: "#8b5cf6",
  },
  dots: {
    display: false,
    opacity: 0.4,
    size: "24",
    color: "#666",
  },
  grid: {
    display: false,
    opacity: 0.2,
    color: "#666",
    width: "20px",
    height: "20px",
  },
  lines: {
    display: false,
    opacity: 0.2,
    color: "#666",
    size: "20px",
    thickness: 1,
    angle: 45,
  },
};

const schema: SchemaConfig = {
  logo: "",
  type: "Person",
  name: "Muhammad Shahzeb",
  description: "Full-Stack Developer & Computer Vision Engineer",
  email: "muhammadsfk@gmail.com",
};

const sameAs: SameAsConfig = {
  threads: "",
  linkedin: "https://www.linkedin.com/in/shahzebx",
  discord: "",
};

const socialSharing: SocialSharingConfig = {
  display: true,
  platforms: {
    x: true,
    linkedin: true,
    facebook: false,
    pinterest: false,
    whatsapp: false,
    reddit: false,
    telegram: false,
    email: true,
    copyLink: true,
  },
};

export {
  baseURL,
  routes,
  display,
  protectedRoutes,
  mailchimp,
  fonts,
  style,
  effects,
  dataStyle,
  schema,
  sameAs,
  socialSharing,
};
