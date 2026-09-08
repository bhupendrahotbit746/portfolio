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

export type ExperienceEntry = {
  tag: string;
  company: string;
  role: string;
  location: string;
  period: string;
  current: boolean;
  tags: string[];
  problems: string[];
  context: string;
  challenge: string;
  approach: string;
  decisions: string[];
  flow: string[];
  impact: string;
};

export const experience: ExperienceEntry[] = [
  {
    tag: "INFLUENCER MARKETING",
    company: "Nutcake (DRPCRD)",
    role: "Full Stack Developer",
    location: "Remote",
    period: "2026 — Now",
    current: true,
    tags: ["Next.js", "TypeScript", "pnpm", "Turborepo", "Trigger.dev", "Clerk", "Stripe"],
    problems: ["Distributed Systems", "Workflow Automation", "Microservices"],
    context:
      "Nutcake is a three-sided marketplace connecting brands, content creators, and talent agencies to run influencer marketing campaigns end-to-end — from creator discovery and outreach through contract negotiation, content delivery, and payout.",
    challenge:
      "Delivering consistent UX and rapid feature velocity across 11 separate TypeScript/Next.js applications (Brand, Creator, Talent Agency, Admin, and supporting public-facing apps), while keeping long-running, non-blocking work off the critical request path for every one of those apps.",
    approach:
      "Built and maintain core platform modules within a pnpm/Turborepo monorepo sharing a common component library and data layer, so each user-facing surface stays consistent by construction rather than by convention.",
    decisions: [
      "Modeled the domain around a Mission → Deal Memo → Contract lifecycle, where a brand's campaign (Mission) fans out into individually-tracked creator agreements (Deal Memos), each progressing through its own commercial and delivery status ladder.",
      "Implemented async, event- and schedule-driven backend workflows on Trigger.dev (nightly sync jobs, batched messaging, social-media scraping, CRM push) instead of blocking request-time work.",
      "Integrated the third-party service layer — HubSpot (CRM/sales sync), Stripe (payouts), PandaDoc (e-signature contracts), Clerk (auth), Twilio/Resend/SendGrid (creator messaging), and Meilisearch (creator/ad search) — as wrapped, shared clients consumed across every app.",
      "Built UI features against a shared, Storybook-documented design system to ensure pixel-accurate, consistent presentation of complex workflow state to non-technical end users.",
    ],
    flow: ["Mission Created", "Deal Memo Sent", "Contract Signed", "Content Delivered", "Payout Processed"],
    impact:
      "Consistent UX and rapid feature delivery across every user-facing surface of an 11-app monorepo, with long-running backend work fully decoupled from the request path.",
  },
  {
    tag: "TICKETING & GIVEAWAYS",
    company: "Bet On Talent",
    role: "Frontend Engineer",
    location: "Remote",
    period: "2025 — 2026",
    current: false,
    tags: ["Next.js", "React", "TypeScript", "TanStack Query", "Storybook", "Jest/RTL"],
    problems: ["Authentication", "Production Reliability", "Frontend Architecture"],
    context:
      "A production Next.js 16 (App Router, React 19, TypeScript) member portal — authenticated flows for login, profile, ticket transactions, giveaway entry, and referrals — plus a full admin console for role/permission management, audit logs, and platform analytics, backed by an Express/TypeORM API designed end-to-end.",
    challenge:
      "A silent-logout defect traced to Next.js's automatic <Link> prefetching triggering a GET-accessible logout/token-revocation route on Amplify SSR — a framework-level, CSRF-adjacent vulnerability class, not an isolated bug.",
    approach:
      "Diagnosed the root cause rather than patching the symptom, then refactored all destructive actions off GET routes across the app to close the entire vulnerability class.",
    decisions: [
      "Architected the server/client data boundary so async Server Components fetch through server-only authenticated clients, keeping httpOnly JWT cookies out of the browser entirely.",
      "Used TanStack Query to drive client-side caching, polling, and invalidation, replacing ad-hoc useEffect fetching with a consistent, typed pattern shared across both layers.",
      "Built a 60+ component design system (UI primitives → layout → feature components) with light/dark theming, documented and visually tested in Storybook with a11y addon coverage.",
      "Enforced 60+ Jest/React Testing Library suites with coverage thresholds, Husky/lint-staged pre-commit hooks, and ESLint 9 flat-config + Prettier — the same zero-warning discipline as the backend API this frontend consumes.",
    ],
    flow: ["GET Route Identified", "Root-Cause Traced", "Destructive Actions Refactored", "Vulnerability Class Closed"],
    impact:
      "Closed a CSRF-adjacent vulnerability class at the framework level, and shipped a 60+ component design system with enforced test coverage and CI hygiene across the whole frontend.",
  },
  {
    tag: "MUSIC STREAMING",
    company: "Vialma",
    role: "Frontend Engineer",
    location: "France · Remote",
    period: "Jul 2024 — Mid 2025",
    current: false,
    tags: ["Next.js", "React.js", "Node.js", "REST APIs"],
    problems: ["Performance", "Rendering"],
    context:
      "Vialma runs a music streaming platform built with Next.js, React.js, Node.js, and REST APIs, serving listeners across a range of devices with a small, globally-distributed engineering team behind it.",
    challenge:
      "Playback-heavy views were sensitive to both initial load weight and API call volume, and any performance work had to hold up consistently across device types rather than just on a reference desktop setup — all while coordinating changes with a team spread across time zones.",
    approach:
      "Treated playback performance as an ongoing scalability concern rather than a one-off fix: paired lazy loading of playback-heavy assets with optimized API call patterns, then validated the result across devices before rolling changes out through the team's shared deployment process.",
    decisions: [
      "Applied lazy loading to reduce initial load weight on playback-heavy views.",
      "Optimized API call patterns for scalability under concurrent listeners.",
      "Delivered responsive, multi-device experiences coordinated across a global team.",
    ],
    flow: ["Playback Request", "Lazy-Loaded Assets", "Optimized API Calls", "Responsive Playback"],
    impact:
      "Responsive, multi-device streaming experiences delivered with seamless deployments across a distributed team.",
  },
  {
    tag: "FULL-STACK CONSULTING",
    company: "Confidential Jobs",
    role: "Full-stack Developer",
    location: "New York · Remote",
    period: "Jan 2024 — Jun 2024",
    current: false,
    tags: ["React.js", "Next.js", "Node.js", "TypeScript"],
    problems: ["Frontend Architecture", "Deployment"],
    context:
      "Worked as a remote full-stack consultant delivering web applications for multiple clients in parallel, using a consistent React.js, Next.js, Node.js, and TypeScript stack across each engagement rather than adapting to a different toolset per client.",
    challenge:
      "Each client came with its own third-party integrations and performance expectations, so the work had to stay scalable and on-time across concurrent engagements without letting one client's timeline slip because of another's scope.",
    approach:
      "Standardized the delivery stack across clients so architectural decisions and code patterns carried over between engagements, then built scalable APIs and integrated each client's specific third-party services on top of that shared foundation, keeping frontend performance and responsive design consistent throughout.",
    decisions: [
      "Standardized on React.js, Next.js, Node.js, and TypeScript across client engagements.",
      "Built scalable APIs and integrated third-party services per client requirements.",
      "Ensured responsive designs and coordinated remotely with global teams for on-time delivery.",
    ],
    flow: ["Client Requirements", "API Built", "Frontend Integrated", "Delivered On Time"],
    impact:
      "Multiple client web applications delivered on time with optimized frontend performance and scalable APIs.",
  },
  {
    tag: "LEGAL TECH",
    company: "Legitify",
    role: "Senior Frontend Engineer",
    location: "Stockholm · Remote",
    period: "May 2023 — Dec 2023",
    current: false,
    tags: ["React.js", "Redux-Saga", "TypeScript", "Socket.IO", "Jest"],
    problems: ["Real-Time Communication", "Distributed Systems"],
    context:
      "Legitify's platform handles secure, real-time document notarization, built with React.js, Redux-Saga for predictable state across complex session flows, and TypeScript throughout, serving multiple tenants on the same underlying system.",
    challenge:
      "Notarization sessions require live collaboration between multiple parties in real time, and because the platform served multiple tenants at once, any performance work had to account for concurrent sessions rather than assume a single-tenant load profile — all while keeping the security and reliability bar high enough for legal document handling.",
    approach:
      "Integrated Socket.IO specifically for the live-collaboration requirements of a notarization session, then optimized performance with multi-tenant load explicitly in mind rather than tuning for a single-tenant baseline and hoping it held up under real usage.",
    decisions: [
      "Integrated Socket.IO to support live, real-time collaboration during notarization sessions.",
      "Optimized performance for multi-tenant systems rather than single-tenant defaults.",
      "Converted complex designs into responsive, reusable UI components.",
      "Maintained high code quality with Jest test coverage.",
    ],
    flow: ["Session Started", "Live Collaboration", "Multi-Tenant Handling", "Notarization Completed"],
    impact:
      "A secure, real-time notarization platform with reusable UI components and multi-tenant performance validated by Jest test coverage.",
  },
  {
    tag: "FULL-STACK · WEB3",
    company: "Oveun Software & Tech",
    role: "Senior Full Stack Developer",
    location: "Spain · Remote",
    period: "2020 — 2023",
    current: false,
    tags: ["React", "Web3", "Solidity", "Smart Contracts", "dApps"],
    problems: ["Legacy Systems", "Frontend Architecture"],
    context:
      "Worked across the full stack at Oveun — modular React component systems on the frontend, backend architecture and database performance underneath, and Web3 functionality (smart contracts, dApps) layered on top as products moved from design to production.",
    challenge:
      "Wireframes had to become production-ready applications without the backend architecture and database layer becoming the bottleneck as Web3 functionality — smart contracts, wallet integrations, dApp features — kept expanding scope.",
    approach:
      "Engineered modular React components so the frontend could scale with new features rather than being rebuilt for each one, while enhancing backend architecture, database performance, and third-party integrations in parallel so the two layers evolved together instead of one lagging behind the other.",
    decisions: [
      "Led UI transformations, converting wireframes into production-ready applications.",
      "Enhanced backend architecture, optimizing databases and integrating third-party services.",
      "Developed Web3 solutions, incorporating smart contracts and dApps.",
    ],
    flow: ["Wireframe", "Modular Components", "Backend Integration", "Production App"],
    impact:
      "Cut frontend development time by 35%, increased load speed by 50%, reduced API response time by 40%, and improved blockchain efficiency by 20%.",
  },
  {
    tag: "FULL-STACK",
    company: "Yonder",
    role: "Full Stack Developer",
    location: "Ireland · Remote",
    period: "2017 — 2019",
    current: false,
    tags: ["React", "REST APIs", "Caching"],
    problems: ["Performance", "Legacy Systems"],
    context:
      "Built high-performance React applications at Yonder where load time, API latency, and overall UI/UX quality were treated as one connected problem rather than three separate workstreams competing for priority.",
    challenge:
      "Load times and API latency both needed to come down, but not at the cost of UI/UX quality or the reliability of API integrations — a common failure mode where performance work degrades the experience it's meant to improve.",
    approach:
      "Paired caching mechanisms with UI/UX optimizations in the same effort rather than sequencing them as separate initiatives, so performance gains and interface improvements landed together and reinforced each other instead of trading off.",
    decisions: [
      "Developed high-performance React applications focused on reducing load times.",
      "Led UI/UX optimizations while ensuring seamless API integration.",
      "Implemented caching mechanisms to boost API efficiency.",
    ],
    flow: ["Request", "Cache Check", "API Call (if needed)", "Optimized Response"],
    impact:
      "Reduced load times by 25%, decreased API latency by 45%, enhanced page load speed by 25%, and improved customer satisfaction by 18%.",
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
        id: "tanstack-query",
        title: "TanStack Query",
        eyebrow: "FRONTEND / SERVER STATE",
        description:
          "Client-side caching, polling, and invalidation for server state — replaced ad-hoc useEffect fetching at Bet On Talent.",
        position: { start: "CLIENT", end: "SERVER" },
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
        id: "rest-apis",
        title: "REST APIs",
        eyebrow: "BACKEND / API DESIGN",
        description:
          "Resource-oriented API design powering client-server communication across every product shipped since 2017.",
        position: { start: "SERVER", end: "SERVER" },
      },
      {
        id: "socketio",
        title: "Socket.IO",
        eyebrow: "BACKEND / REAL-TIME",
        description:
          "Live, real-time collaboration between multiple parties during notarization sessions at Legitify.",
        position: { start: "SERVER", end: "CLIENT" },
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
        id: "pnpm",
        title: "pnpm",
        eyebrow: "TOOLS / PACKAGE MANAGER",
        description:
          "Disk-efficient, strict dependency management across an 11-app monorepo at Nutcake.",
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

const flatTechStack = techStack.flatMap((group) => group.items);

// Maps a tag label used elsewhere (Experience/Projects tags) to its
// canonical Stack entry id, so tags with slightly different naming
// (e.g. "Redux Toolkit", "React", "TurboRepo") still resolve to the
// right "Tools I Think In" card.
const TAG_ALIASES: Record<string, string> = {
  react: "react",
  "react.js": "react",
  "redux toolkit": "redux",
  "redux-saga": "redux",
  turborepo: "turborepo",
  "node.js": "nodejs",
  "next.js": "nextjs",
  "jest/rtl": "jest",
  "react query": "tanstack-query",
  "tanstack query": "tanstack-query",
  "rest apis": "rest-apis",
  "socket.io": "socketio",
  "aws s3": "aws",
};

export function resolveTechId(tag: string): string | null {
  const key = tag.trim().toLowerCase();
  const alias = TAG_ALIASES[key];
  if (alias) return alias;
  const direct = flatTechStack.find((item) => item.title.toLowerCase() === key);
  return direct ? direct.id : null;
}

export const projects = [
  {
    name: "Credit Card Risk Profiler",
    highlights: [
      "Fintech dashboard for a UAE-based startup — Figma-based UI, JWT/PassportJS auth, and WebSocket communication.",
      "Built the frontend from Figma specs into a React + Redux Toolkit dashboard, with a NestJS API layer backing risk-scoring workflows.",
      "Session and auth state relied on JWT with PassportJS strategies, while a WebSocket channel pushed live risk updates to analysts without polling.",
      "MongoDB held applicant records and Redis cached frequently-read risk profiles to keep dashboard load times low under concurrent analyst sessions.",
    ],
    tags: ["React", "Redux Toolkit", "NestJS", "MongoDB", "Redis"],
    url: "#",
  },
  {
    name: "Cost Estimator",
    highlights: [
      "Migrated a legacy jQuery frontend to React with bundle splitting, caching, and AWS S3 document storage.",
      "The rewrite replaced a monolithic jQuery codebase with a modular React + TypeScript app, splitting route-level bundles to cut initial load weight.",
      "A PostgreSQL backend replaced ad-hoc data storage, and Kafka handled asynchronous estimate-processing events between services.",
      "Generated cost documents were stored and served from AWS S3 rather than the application server.",
    ],
    tags: ["React", "TypeScript", "PostgreSQL", "Kafka", "AWS S3"],
    url: "#",
  },
  {
    name: "Notarization Platform",
    highlights: [
      "Remote document notarization platform with role-based access, Stripe payments, and Veriff identity verification.",
      "Built with React, TypeScript, and TurboRepo to share code across the notary and client-facing apps in one monorepo.",
      "Role-based access control separated notary, client, and admin permissions across the document workflow.",
      "Stripe handled session payments, Veriff verified signer identity before a session could proceed, and React Query managed server state and caching for real-time session data.",
    ],
    tags: ["React", "TypeScript", "TurboRepo", "React Query"],
    url: "#",
  },
  {
    name: "Web3 Marketplace",
    highlights: [
      "Decentralized NFT marketplace with wallet integration, Ethereum & BSC smart contracts, and IPFS storage.",
      "Smart contracts were written in Solidity and deployed across Ethereum and BSC to support minting, listing, and trading NFTs.",
      "The frontend connected to MetaMask for wallet auth and transaction signing, with Web3.js and Ethers.js handling on-chain reads and writes.",
      "NFT metadata and media were stored on IPFS to keep asset ownership decentralized rather than tied to a single server.",
    ],
    tags: ["Solidity", "Web3.js", "Ethers.js", "IPFS", "MetaMask"],
    url: "#",
  },
];
