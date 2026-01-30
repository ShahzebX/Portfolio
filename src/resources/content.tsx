import {
  About,
  Blog,
  Gallery,
  Home,
  Newsletter,
  Person,
  Social,
  Work,
} from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Muhammad",
  lastName: "Shahzeb",
  name: `Muhammad Shahzeb`,
  role: "Full-Stack Developer & Computer Vision Engineer",
  avatar: "/images/avatar.png",
  email: "muhammadsfk@gmail.com",
  location: "Asia/Karachi", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["English", "Urdu"], // optional: Leave the array empty if you don't want to display languages
};

const newsletter: Newsletter = {
  display: false,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: <>Updates on AI/ML projects and full-stack development</>,
};

const social: Social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  // Set essentials: true for links you want to show on the about page
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/ShahzebX",
    essential: true,
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/muhammad-shahzeb-cs",
    essential: true,
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Full-Stack Developer & Computer Vision Engineer</>,
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">FYP</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          Featured work
        </Text>
      </Row>
    ),
    href: "/work/solar-panel-segmentation-fyp",
  },
  subline: (
    <>
      I build AI-powered web applications — from deep learning models to
      scalable deployment and clean user interfaces.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        I'm a Computer Science undergraduate focused on bridging full-stack
        software engineering with applied computer vision and machine learning.
        I build systems — not just notebooks.
        <br />
        <br />
        From training CNNs and self-supervised models to deploying them via APIs
        and polished frontends, I combine engineering discipline with practical
        AI.
        <br />
        <br />
        My work includes:
        <br />
        📌 Low-Light Image Enhancer built with Flask + MIRNet + React
        <br />
        📌 Solar Panel Segmentation (FYP) exploring BYOL and self-supervised
        learning
        <br />
        📌 Enterprise Full-Stack Apps using the MERN stack
        <br />
        <br />
        I'm currently seeking roles where I can build AI-augmented products,
        deploy models to production, and contribute to real engineering systems.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "Artificial Intelligence Community of Pakistan",
        timeframe: "Jan 2025 - Present",
        role: "Campus Co-Lead",
        achievements: [
          <>
            Lead a diverse team to organize two monthly webinars with industry
            experts, democratizing AI education for students across the region.
          </>,
          <>
            Manage cross-departmental teams and facilitate knowledge-sharing
            sessions on AI/ML topics.
          </>,
        ],
        images: [],
      },
      {
        company: "Artificial Intelligence Community of Pakistan",
        timeframe: "Jan 2025 - Present",
        role: "Campus Co-Lead",
        achievements: [
          <>
            Lead a diverse team to organize two monthly webinars with industry
            experts, democratizing AI education for students across the region.
          </>,
          <>
            Manage cross-departmental teams and facilitate knowledge-sharing
            sessions on AI/ML topics.
          </>,
        ],
        images: [],
      },
      {
        company: "National Assembly of Pakistan",
        timeframe: "Jun 2025 - Aug 2025",
        role: "Intern",
        achievements: [
          <>
            Gained experience in operational management and cross-functional
            collaboration in a government setting.
          </>,
        ],
        images: [],
      },
      {
        company: "Sukkur IBA University",
        timeframe: "Jan 2025 - Jun 2025",
        role: "Hostel Coordinator",
        achievements: [
          <>
            Ensured smooth daily operations and resolved operational challenges
            while acting as a bridge between residents, staff, and management.
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true, // set to false to hide this section
    title: "Education",
    institutions: [
      {
        name: "Sukkur IBA University",
        description: (
          <>
            Bachelor of Science in Computer Science (Sep 2022 - Jun 2026)
            <br />
            Specialized in Deep Learning, Computer Vision, and Full-Stack
            Development.
          </>
        ),
      },
      {
        name: "Google AI Essentials Specialization",
        description: (
          <>
            Completed certifications in AI fundamentals, responsible AI usage,
            and AI productivity tools.
          </>
        ),
      },
    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Technical Skills",
    skills: [
      {
        title: "Languages & Tools",
        description: (
          <>
            Core programming languages and development tools for building modern
            applications.
          </>
        ),
        tags: [
          { name: "JavaScript", icon: "javascript" },
          { name: "TypeScript" },
          { name: "Python" },
          { name: "Git", icon: "github" },
        ],
        images: [],
      },
      {
        title: "Frontend Development",
        description: (
          <>
            Building responsive and performant user interfaces with modern
            frameworks.
          </>
        ),
        tags: [
          { name: "React" },
          { name: "Next.js", icon: "nextjs" },
          { name: "Tailwind CSS" },
          { name: "Axios" },
        ],
        images: [],
      },
      {
        title: "Backend Development",
        description: (
          <>Creating scalable server-side applications and RESTful APIs.</>
        ),
        tags: [
          { name: "Node.js" },
          { name: "Express.js" },
          { name: "Flask" },
          { name: "MongoDB" },
        ],
        images: [],
      },
      {
        title: "AI / Computer Vision",
        description: (
          <>
            Implementing deep learning models for computer vision tasks and
            deploying them to production.
          </>
        ),
        tags: [
          { name: "PyTorch" },
          { name: "CNNs" },
          { name: "Self-Supervised Learning" },
          { name: "MIRNet" },
          { name: "BYOL" },
          { name: "MoCo v2" },
          { name: "Model Deployment" },
          { name: "RAG" },
          { name: "LLM Fine-Tuning" },
        ],
        images: [],
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about design and tech...",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

/**
 * Metadata for the "Work" page and its navigation entry.
 *
 * @remarks
 * - `path`: route for the Work page ("/work").
 * - `label`: navigation label shown in the UI.
 * - `title` / `description`: page metadata that interpolate `person.name`.
 * - Comment indicates project pages are added as `.mdx` files in `app/blog/posts` and are listed on `/home` and `/work`.
 *
 * @note
 * From this isolated snippet it is not possible to determine whether this object is actually imported/used in the UI elsewhere in the project. To confirm usage, search the codebase for:
 * - imports/references to the identifier `work`
 * - the literal string `"/work"`
 * - references to its fields (e.g., `.path`, `.label`, `.title`, `.description`)
 */
const work: Work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Design and dev projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  // Images by https://lorant.one
  // These are placeholder images, replace with your own
  images: [
    {
      src: "/images/gallery/horizontal-1.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-4.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-3.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-1.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-2.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-2.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-4.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-3.jpg",
      alt: "image",
      orientation: "vertical",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
