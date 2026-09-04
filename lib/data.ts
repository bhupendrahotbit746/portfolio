export const profile = {
  nameFirst: "Shubham",
  nameLast: "Dixit",
  role: "Senior Software Engineer",
  focusTag: "FULL-STACK × WEB3",
  tagline:
    "Senior full-stack developer, 9+ years shipping scalable web apps — from React interfaces to Web3 smart contracts.",
  status: "Currently a Full Stack Developer at Nutcake, building a three-sided influencer marketing marketplace",
  location: "Indore, India",
  availability: "Remote worldwide",
  coordinatesLat: "22.7196°N",
  coordinatesLng: "75.8577°E",
  city: "IST",
  brandTag: "SD.PORTFOLIO",
  email: "shubhamdixit5314@gmail.com",
  phone: "+91 8827708602",
  github: "https://github.com/CodeCraftsman5314",
  linkedin: "https://www.linkedin.com/in/shubham-dixit-499b46249/",
  cvUrl: "/Shubham-Dixit-CV.pdf",
  timezone: "IST",
};

export const navItems = [
  { id: "profile", index: "01", label: "PROFILE", href: "/#profile" },
  { id: "blog", index: "02", label: "BLOG", href: "/#writing" },
  { id: "experience", index: "03", label: "EXPERIENCE", href: "/#experience" },
  { id: "stack", index: "04", label: "STACK", href: "/#stack" },
  { id: "contact", index: "05", label: "CONTACT", href: "/#contact" },
];

export const skillsCarousel = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "NestJS",
  "PostgreSQL",
  "MongoDB",
  "Docker",
  "AWS",
  "Solidity",
  "Web3.js",
  "Kafka",
  "Trigger.dev",
  "Turborepo",
];

export const whatIDo = {
  heading: "What I do",
  paragraphs: [
    {
      text: "I design and deploy scalable, high-performance web applications end to end — React.js and Next.js on the frontend, Node.js and NestJS APIs behind them, backed by PostgreSQL, MongoDB, and Redis.",
      highlights: ["end to end", "React.js and Next.js", "Node.js and NestJS"],
    },
    {
      text: "Nine years in, I've led distributed teams through Agile and SCRUM, mentored developers, and delivered solutions where user experience, performance, and maintainability all have to hold up together.",
      highlights: ["Agile and SCRUM", "user experience, performance, and maintainability"],
    },
    {
      text: "I also build in Web3 — smart contracts, wallets, tokens, and decentralized apps — connecting blockchain networks to real, usable products.",
      highlights: ["smart contracts, wallets, tokens, and decentralized apps"],
    },
  ],
};

export const experience = [
  {
    tag: "INFLUENCER MARKETING",
    company: "Nutcake (DRPCRD)",
    role: "Full Stack Developer",
    period: "2026 — Now",
    current: true,
    description:
      "Building core modules of a three-sided marketplace connecting brands, creators, and talent agencies — an 11-app pnpm/Turborepo monorepo spanning the Mission → Deal Memo → Contract lifecycle. Implemented event-driven backend workflows with Trigger.dev and integrated HubSpot, Stripe, PandaDoc, Clerk, Twilio, Resend, SendGrid, and Meilisearch.",
  },
  {
    tag: "TICKETING & GIVEAWAYS",
    company: "Bet On Talent",
    role: "Frontend Engineer",
    period: "2025 — 2026",
    current: false,
    description:
      "Shipped a production Next.js 16 app (App Router, React 19, TypeScript) with authenticated member flows and an admin console. Diagnosed and fixed a production security issue around Link prefetching hitting GET-accessible logout routes, and built a 60+ component design system with Storybook, Jest/RTL coverage thresholds, and a full CI quality pipeline.",
  },
  {
    tag: "MUSIC STREAMING",
    company: "Vialma",
    role: "Frontend Engineer",
    period: "Jul 2024 — Mid 2025",
    current: false,
    description:
      "Developed a music streaming platform using Next.js, React.js, Node.js, and REST APIs. Improved playback performance through lazy loading and optimized API calls, and delivered responsive multi-device experiences with a global team.",
  },
  {
    tag: "FULL-STACK CONSULTING",
    company: "Confidential Jobs",
    role: "Full-stack Developer",
    period: "Jan 2024 — Jun 2024",
    current: false,
    description:
      "Delivered web applications using React.js, Next.js, Node.js, and TypeScript for multiple clients. Built scalable APIs, integrated third-party services, and optimized frontend performance with on-time remote delivery.",
  },
  {
    tag: "LEGAL TECH",
    company: "Legitify",
    role: "Senior Frontend Engineer",
    period: "May 2023 — Dec 2023",
    current: false,
    description:
      "Built a secure, real-time notarization platform using React.js, Redux-Saga, and TypeScript. Integrated Socket.IO for live collaboration and optimized performance for multi-tenant systems, maintaining high code quality with Jest.",
  },
  {
    tag: "FULL-STACK · WEB3",
    company: "Oveun Software & Tech",
    role: "Senior Full Stack Developer",
    period: "2020 — 2023",
    current: false,
    description:
      "Engineered modular React components, led UI transformations from wireframes to production, and enhanced backend architecture and database performance. Developed Web3 solutions with smart contracts and dApps — cutting frontend dev time by 35%, boosting load speed by 50%, and reducing API response time by 40%.",
  },
  {
    tag: "FULL-STACK",
    company: "Yonder",
    role: "Full Stack Developer",
    period: "2017 — 2019",
    current: false,
    description:
      "Developed high-performance React applications, reducing load times by 25%. Led UI/UX optimizations, ensured seamless API integration, and implemented caching that decreased API latency by 45% and lifted customer satisfaction by 18%.",
  },
];

export const education = [
  {
    school: "RGPV, Indore, India",
    detail: "Bachelor's in Computer Science, 2011 — 2015",
  },
  {
    school: "Choithram School, Indore, India",
    detail: "Higher Secondary, 2010 — 2011",
  },
];

export type StackPosition = "CLIENT" | "SERVER" | "DATA" | "CLOUD";

export type TechStackItem = {
  id: string;
  title: string;
  eyebrow: string;
  description: string;
  position: { start: StackPosition; end: StackPosition };
};

export type TechStackGroup = {
  category: string;
  code: string;
  items: TechStackItem[];
};

export const techStack: TechStackGroup[] = [
  {
    category: "Frontend",
    code: "S/01",
    items: [
      {
        id: "react",
        title: "React.js",
        eyebrow: "FRONTEND / COMPONENT SYSTEMS",
        description:
          "Component systems and complex product interfaces, built for predictable state, performance, and maintainability.",
        position: { start: "CLIENT", end: "CLIENT" },
      },
      {
        id: "nextjs",
        title: "Next.js",
        eyebrow: "FRONTEND / FULL-STACK REACT",
        description:
          "Production React apps with server rendering and routing — the Vialma streaming platform runs on it.",
        position: { start: "CLIENT", end: "CLIENT" },
      },
      {
        id: "redux",
        title: "Redux",
        eyebrow: "FRONTEND / STATE MANAGEMENT",
        description:
          "Predictable state for multi-tenant dashboards, including Redux-Saga for real-time flows at Legitify.",
        position: { start: "CLIENT", end: "CLIENT" },
      },
      {
        id: "typescript",
        title: "TypeScript",
        eyebrow: "FRONTEND / TYPE SAFETY",
        description:
          "Strongly typed application architecture across frontend, APIs, and shared domain models.",
        position: { start: "CLIENT", end: "SERVER" },
      },
      {
        id: "tailwind",
        title: "Tailwind CSS",
        eyebrow: "FRONTEND / STYLING",
        description:
          "Utility-first styling for fast, consistent UI work across client and production builds.",
        position: { start: "CLIENT", end: "CLIENT" },
      },
      {
        id: "material-ui",
        title: "Material UI",
        eyebrow: "FRONTEND / COMPONENT LIBRARY",
        description:
          "Production-ready components for fintech dashboards, tuned to match custom design systems.",
        position: { start: "CLIENT", end: "CLIENT" },
      },
    ],
  },
  {
    category: "Backend",
    code: "S/02",
    items: [
      {
        id: "nodejs",
        title: "Node.js",
        eyebrow: "BACKEND / RUNTIME",
        description:
          "Backend services, APIs, and asynchronous workloads powering every product shipped since 2017.",
        position: { start: "SERVER", end: "SERVER" },
      },
      {
        id: "expressjs",
        title: "Express.js",
        eyebrow: "BACKEND / API FRAMEWORK",
        description:
          "Lightweight REST APIs and middleware chains for services that need to stay fast and simple.",
        position: { start: "SERVER", end: "SERVER" },
      },
      {
        id: "nestjs",
        title: "NestJS",
        eyebrow: "BACKEND / ARCHITECTURE",
        description:
          "Structuring scalable backend architecture — used to build the Credit Card Risk Profiler's API layer.",
        position: { start: "SERVER", end: "DATA" },
      },
      {
        id: "hapijs",
        title: "Hapi.js",
        eyebrow: "BACKEND / API FRAMEWORK",
        description:
          "Configuration-driven APIs for services that need strict validation and plugin-based structure.",
        position: { start: "SERVER", end: "SERVER" },
      },
      {
        id: "grpc",
        title: "gRPC",
        eyebrow: "BACKEND / SERVICE COMMUNICATION",
        description:
          "Typed, high-performance contracts between internal services beyond plain REST.",
        position: { start: "SERVER", end: "SERVER" },
      },
      {
        id: "websockets",
        title: "WebSockets",
        eyebrow: "BACKEND / REAL-TIME",
        description:
          "Real-time collaboration and live updates — Socket.IO integration for the Legitify notarization platform.",
        position: { start: "SERVER", end: "CLIENT" },
      },
      {
        id: "triggerdev",
        title: "Trigger.dev",
        eyebrow: "BACKEND / WORKFLOWS",
        description:
          "Event-driven and schedule-driven backend workflows at Nutcake — nightly sync, batched messaging, CRM sync.",
        position: { start: "SERVER", end: "CLOUD" },
      },
    ],
  },
  {
    category: "Data & Infra",
    code: "S/03",
    items: [
      {
        id: "postgresql",
        title: "PostgreSQL",
        eyebrow: "DATA / RELATIONAL",
        description:
          "Relational data for the Cost Estimator platform and other production systems, tuned for performance.",
        position: { start: "DATA", end: "DATA" },
      },
      {
        id: "mongodb",
        title: "MongoDB",
        eyebrow: "DATA / DOCUMENT STORE",
        description:
          "Document storage behind multi-tenant systems and fintech dashboards, paired with Mongoose for schema safety.",
        position: { start: "DATA", end: "DATA" },
      },
      {
        id: "redis",
        title: "Redis",
        eyebrow: "DATA / CACHE",
        description:
          "Caching and session storage that cut API response times by 40% on production systems.",
        position: { start: "SERVER", end: "DATA" },
      },
      {
        id: "docker",
        title: "Docker",
        eyebrow: "INFRA / CONTAINERS",
        description:
          "Containerized services for consistent environments from local development through to deployment.",
        position: { start: "SERVER", end: "CLOUD" },
      },
      {
        id: "aws",
        title: "AWS",
        eyebrow: "INFRA / CLOUD",
        description:
          "S3 for document storage, deployment infrastructure, and cloud services across client and production apps.",
        position: { start: "CLOUD", end: "CLOUD" },
      },
      {
        id: "kafka",
        title: "Kafka",
        eyebrow: "INFRA / MESSAGING",
        description:
          "Event streaming for the Cost Estimator platform, decoupling services under production load.",
        position: { start: "SERVER", end: "CLOUD" },
      },
    ],
  },
  {
    category: "Web3 / Blockchain",
    code: "S/04",
    items: [
      {
        id: "solidity",
        title: "Solidity",
        eyebrow: "WEB3 / SMART CONTRACTS",
        description:
          "Smart contracts on Ethereum and Binance Smart Chain — the core of the Web3 Marketplace NFT platform.",
        position: { start: "SERVER", end: "CLOUD" },
      },
      {
        id: "web3js",
        title: "Web3.js",
        eyebrow: "WEB3 / CLIENT LIBRARY",
        description:
          "Connecting frontend apps to blockchain networks — wallets, transactions, and contract calls.",
        position: { start: "CLIENT", end: "SERVER" },
      },
      {
        id: "ethersjs",
        title: "Ethers.js",
        eyebrow: "WEB3 / CLIENT LIBRARY",
        description:
          "Lightweight contract interaction and wallet integration for the Web3 Marketplace dApp.",
        position: { start: "CLIENT", end: "SERVER" },
      },
      {
        id: "metamask",
        title: "MetaMask",
        eyebrow: "WEB3 / WALLET",
        description:
          "Wallet connection and transaction signing for decentralized marketplace users.",
        position: { start: "CLIENT", end: "CLIENT" },
      },
      {
        id: "ipfs",
        title: "IPFS",
        eyebrow: "WEB3 / STORAGE",
        description:
          "Decentralized storage for NFT assets and metadata, optimized to keep gas fees down.",
        position: { start: "DATA", end: "CLOUD" },
      },
      {
        id: "hardhat",
        title: "Hardhat",
        eyebrow: "WEB3 / TOOLING",
        description:
          "Smart contract development, testing, and deployment tooling for Ethereum and BSC.",
        position: { start: "SERVER", end: "SERVER" },
      },
    ],
  },
  {
    category: "Platforms & Integrations",
    code: "S/05",
    items: [
      {
        id: "stripe",
        title: "Stripe",
        eyebrow: "PLATFORMS / PAYMENTS",
        description:
          "Payment processing for the Notarization Platform and payout flows across marketplace products.",
        position: { start: "SERVER", end: "CLOUD" },
      },
      {
        id: "hubspot",
        title: "HubSpot",
        eyebrow: "PLATFORMS / CRM",
        description:
          "CRM synchronization workflows at Nutcake, keeping brand and creator data in sync across systems.",
        position: { start: "SERVER", end: "CLOUD" },
      },
      {
        id: "clerk",
        title: "Clerk",
        eyebrow: "PLATFORMS / AUTH",
        description:
          "Authenticated member flows and role-based access — login, profiles, and admin permissions.",
        position: { start: "CLIENT", end: "SERVER" },
      },
      {
        id: "twilio",
        title: "Twilio",
        eyebrow: "PLATFORMS / MESSAGING",
        description:
          "Batched messaging workflows connecting brands, creators, and talent agencies at Nutcake.",
        position: { start: "SERVER", end: "CLOUD" },
      },
      {
        id: "pandadoc",
        title: "PandaDoc",
        eyebrow: "PLATFORMS / CONTRACTS",
        description:
          "Deal Memo and Contract lifecycle automation for influencer marketing campaigns.",
        position: { start: "SERVER", end: "CLOUD" },
      },
      {
        id: "meilisearch",
        title: "Meilisearch",
        eyebrow: "PLATFORMS / SEARCH",
        description:
          "Fast, relevant search across creator discovery and campaign data at Nutcake.",
        position: { start: "SERVER", end: "DATA" },
      },
    ],
  },
  {
    category: "Testing",
    code: "S/06",
    items: [
      {
        id: "jest",
        title: "Jest",
        eyebrow: "TESTING / UNIT",
        description:
          "Unit and integration test suites that kept code quality high on multi-tenant systems.",
        position: { start: "SERVER", end: "SERVER" },
      },
      {
        id: "mocha",
        title: "Mocha",
        eyebrow: "TESTING / UNIT",
        description:
          "Flexible test runner for backend services with custom assertion and reporting needs.",
        position: { start: "SERVER", end: "SERVER" },
      },
      {
        id: "chai",
        title: "Chai",
        eyebrow: "TESTING / ASSERTIONS",
        description:
          "Expressive assertions paired with Mocha for readable, maintainable backend test suites.",
        position: { start: "SERVER", end: "SERVER" },
      },
      {
        id: "cypress",
        title: "Cypress",
        eyebrow: "TESTING / END-TO-END",
        description:
          "End-to-end coverage for critical user flows — checkout, auth, and multi-step forms.",
        position: { start: "CLIENT", end: "CLIENT" },
      },
      {
        id: "rtl",
        title: "React Testing Library",
        eyebrow: "TESTING / COMPONENT",
        description:
          "Component tests written the way users interact with them, not implementation details.",
        position: { start: "CLIENT", end: "CLIENT" },
      },
      {
        id: "enzyme",
        title: "Enzyme",
        eyebrow: "TESTING / COMPONENT",
        description:
          "Component-level testing on legacy React codebases ahead of migration to newer tooling.",
        position: { start: "CLIENT", end: "CLIENT" },
      },
    ],
  },
  {
    category: "Tools",
    code: "S/07",
    items: [
      {
        id: "git",
        title: "Git",
        eyebrow: "TOOLS / VERSION CONTROL",
        description:
          "Branch strategy and code review workflows across every distributed team I've worked with.",
        position: { start: "CLIENT", end: "CLOUD" },
      },
      {
        id: "postman",
        title: "Postman",
        eyebrow: "TOOLS / API TESTING",
        description:
          "API testing and documentation during development of every backend service shipped.",
        position: { start: "SERVER", end: "SERVER" },
      },
      {
        id: "swagger",
        title: "Swagger",
        eyebrow: "TOOLS / API DOCS",
        description:
          "OpenAPI documentation that keeps frontend and backend teams in sync on contract changes.",
        position: { start: "SERVER", end: "SERVER" },
      },
      {
        id: "pm2",
        title: "PM2",
        eyebrow: "TOOLS / PROCESS MANAGER",
        description:
          "Process management and zero-downtime restarts for Node.js services in production.",
        position: { start: "SERVER", end: "CLOUD" },
      },
      {
        id: "figma",
        title: "Figma",
        eyebrow: "TOOLS / DESIGN",
        description:
          "Converting wireframes and Envision designs into production-ready UI, end to end.",
        position: { start: "CLIENT", end: "CLIENT" },
      },
      {
        id: "jira",
        title: "Jira",
        eyebrow: "TOOLS / PROJECT MANAGEMENT",
        description:
          "Agile and SCRUM delivery tracking across distributed teams and multiple concurrent projects.",
        position: { start: "CLIENT", end: "CLOUD" },
      },
      {
        id: "turborepo",
        title: "Turborepo",
        eyebrow: "TOOLS / MONOREPO",
        description:
          "Managing an 11-app pnpm/Turborepo monorepo at Nutcake across Brand, Creator, Agency, and Admin surfaces.",
        position: { start: "CLIENT", end: "CLOUD" },
      },
      {
        id: "storybook",
        title: "Storybook",
        eyebrow: "TOOLS / COMPONENT DOCS",
        description:
          "Documenting and visually testing 60+ component design systems, with accessibility checks built in.",
        position: { start: "CLIENT", end: "CLIENT" },
      },
    ],
  },
];

export const techStackItemCount = techStack.reduce(
  (sum, group) => sum + group.items.length,
  0
);

export const projects = [
  {
    name: "Credit Card Risk Profiler",
    description:
      "Fintech dashboard for a UAE-based startup — Figma-based UI, JWT/PassportJS auth, and WebSocket communication.",
    tags: ["React", "Redux Toolkit", "NestJS", "MongoDB", "Redis"],
    url: "#",
  },
  {
    name: "Cost Estimator",
    description:
      "Migrated a legacy jQuery frontend to React with bundle splitting, caching, and AWS S3 document storage.",
    tags: ["React", "TypeScript", "PostgreSQL", "Kafka", "AWS S3"],
    url: "#",
  },
  {
    name: "Notarization Platform",
    description:
      "Remote document notarization platform with role-based access, Stripe payments, and Veriff identity verification.",
    tags: ["React", "TypeScript", "TurboRepo", "React Query"],
    url: "#",
  },
  {
    name: "Web3 Marketplace",
    description:
      "Decentralized NFT marketplace with wallet integration, Ethereum & BSC smart contracts, and IPFS storage.",
    tags: ["Solidity", "Web3.js", "Ethers.js", "IPFS", "MetaMask"],
    url: "#",
  },
];
