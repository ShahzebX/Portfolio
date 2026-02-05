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
  // Import new icons in /resources/icons.ts
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
    link: "https://www.linkedin.com/in/shahzebx",
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
      <div className="flex items-center gap-3">
        <strong className="ml-4">New</strong>
        <span className="w-px h-5 bg-blue-400/50" />
        <span className="mr-1 text-blue-500">Featured Case Study</span>
      </div>
    ),
    href: "/work/solar-panel-segmentation-fyp",
  },
  subline: (
    <>
      Architecting high-performance web applications and computer vision
      systems. Specialized in deep learning, Next.js, and scalable cloud
      infrastructure.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "About Me",
  title: `About Me – ${person.name}`,
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
        I am a Software Engineer with a specialized focus on Full-Stack
        Development and Computer Vision. With an experience of two years, I
        bridge the gap between complex AI models and user-centric web
        applications. My expertise spans building scalable distributed systems,
        training state-of-the-art deep learning models, and crafting intuitive
        frontend experiences.
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
          { name: "React", icon: "react" },
          { name: "Next.js", icon: "nextjs" },
          { name: "Tailwind CSS", icon: "tailwind" },
          { name: "Axios", icon: "axios" },
        ],
        images: [],
      },
      {
        title: "Backend Development",
        description: (
          <>Creating scalable server-side applications and RESTful APIs.</>
        ),
        tags: [
          { name: "Node.js", icon: "nodejs" },
          { name: "Express.js", icon: "express" },
          { name: "Flask", icon: "flask" },
          { name: "MongoDB", icon: "mongodb" },
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
          { name: "PyTorch", icon: "pytorch" },
          { name: "CNNs", icon: "cnn" },
          { name: "Self-Supervised Learning", icon: "ssl" },
          { name: "MIRNet", icon: "mirnet" },
          { name: "BYOL", icon: "byol" },
          { name: "MoCo v2", icon: "mocov2" },
          { name: "Model Deployment", icon: "modeldeployment" },
          { name: "RAG", icon: "rag" },
          { name: "LLM Fine-Tuning", icon: "llmfine-tuning" },
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
 * Metadata for the Projects page and its navigation entry.
 */
const work: Work = {
  path: "/work",
  label: "Projects",
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
