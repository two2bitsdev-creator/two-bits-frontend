import type {
  ContactInfoRow,
  ContactNeed,
  ProcessStep,
  ServiceGroup,
  StackColumn,
  TrustLogo,
} from "@/types";

export const heroIndex = [
  { code: "00", label: "WEB" },
  { code: "01", label: "MOBILE" },
  { code: "10", label: "PENTEST" },
  { code: "11", label: "TRAINING" },
];

export const terminalLines = [
  { prompt: true, text: "twobits init --stack next,ts", delay: 0.4, steps: 26 },
  {
    prompt: false,
    text: "✓ app router, typed api, ci",
    tone: "muted" as const,
    delay: 1.2,
    steps: 24,
  },
  { prompt: true, text: "twobits scan --target stg", delay: 2.0, steps: 24 },
  {
    prompt: false,
    text: "! 3 findings — 1 critical",
    tone: "warn" as const,
    delay: 2.8,
    steps: 26,
  },
  { prompt: true, text: "twobits patch && ship", delay: 3.6, steps: 20 },
  {
    prompt: false,
    text: "✓ live — 0 open criticals",
    tone: "muted" as const,
    delay: 4.3,
    steps: 22,
    cursorDelay: 4.9,
  },
];

export const serviceGroups: ServiceGroup[] = [
  {
    track: "build",
    digit: "1",
    label: "WE BUILD IT",
    sublabel: "set bit",
    services: [
      {
        code: "00",
        icon: "web",
        title: "WEB DEVELOPMENT",
        description:
          "Next.js and TypeScript, front to back. Server-rendered pages, typed APIs, and a deploy pipeline your team can run without us.",
        tags: [
          "Next.js",
          "React",
          "JavaScript",
          "TypeScript",
          "Tailwind",
          "shadcn/ui",
          "Node",
          "Postgres",
          "MySQL",
          "MongoDB",
          "Elastic/OpenSearch",
          "Redis",
          "Kafka",
          "RabbitMQ",
          "AWS",
          "Azure",
          "GCP",
          "Docker",
          "Kubernetes",
          "CI/CD",
          "DevOps",
          "Monitoring",
          "Logging",
          "Alerting",
          "Performance",
          "Security",
          "Compliance",
          "Accessibility",
          "Internationalization",
          "Localization",
        ],
      },
      {
        code: "01",
        icon: "mobile",
        title: "MOBILE APPLICATIONS",
        description:
          "One Flutter codebase for both stores, native modules where performance demands it, over-the-air updates so fixes land the same day.",
        tags: ["Flutter", "Dart", "iOS", "Android","Native Modules", "Firebase", "Amplify", "App Center", "App Store Connect", "Google Play Console"],
      },
    ],
  },
  {
    track: "secure",
    digit: "0",
    label: "WE BREAK IT",
    sublabel: "clear bit",
    services: [
      {
        code: "10",
        icon: "pentest",
        title: "PENETRATION TESTING",
        description:
          "Black-box and authenticated testing across web, mobile and API surfaces. Findings ranked by what an attacker could actually reach, with a free retest after you patch.",
        tags: ["Web & API", "Mobile", "Cloud", "Retest", "Burp Suite", "Nmap", "Metasploit", "OWASP ZAP", "Semgrep", "Frida", "Wireshark"],
      },
      {
        code: "11",
        icon: "training",
        title: "TRAINING & CONSULTANCY",
        description:
          "Secure-coding workshops for your engineers, architecture and threat-model reviews for your leads. In-house or remote, using your own codebase as the material.",
        tags: ["Workshops", "Threat models", "Code review", "Roadmaps", "Security", "Compliance", "Accessibility", "Internationalization", "Localization"],
      },
    ],
  },
];

export const processSteps: ProcessStep[] = [
  {
    state: "00",
    code: "00",
    title: "SMART CONSULTING & ANALYZING",
    description:
      "We sit with your workflows before we write a line of code — what the work actually is, where it stalls, and which parts are ready to automate.",
    bullets: [
      "Business process mapping",
      "Systems and data audit",
      "Automation roadmap, signed off",
    ],
  },
  {
    state: "01",
    code: "01",
    title: "INTELLIGENT AUTOMATION",
    description:
      "Our team builds intelligent automation systems tailored to your business processes.",
    bullets: [
      "Workflows fitted to how you work",
      "Integrations with the tools you already run",
      "Staging URL from day one",
    ],
  },
  {
    state: "10",
    code: "10",
    title: "REFINE & INSIGHTS",
    description:
      "We refine performance, analyze insights, and enhance automation for long-term growth.",
    bullets: [
      "Latency and throughput tuning",
      "Dashboards on the live flows",
      "Iterate from real usage, not guesses",
    ],
  },
  {
    state: "11",
    code: "11",
    title: "CONTINUOUS OPTIMIZATION",
    description:
      "We refine performance, analyze insights, and enhance automation for long-term growth.",
    bullets: [
      "Ongoing performance reviews",
      "New automations as the business shifts",
      "A system your team can keep improving",
    ],
  },
];

export const processTabLabels = ["CONSULT", "BUILD", "REFINE", "OPTIMIZE"];

export const stackColumns: StackColumn[] = [
  {
    label: "Build",
    filled: true,
    tools: ["Next.js", "React", "TypeScript", "Node", "Flutter"],
  },
  {
    label: "Backend",
    filled: true,
    tools: [
      "Express",
      "Django",
      "FastAPI",
      "Prisma",
      "Postgres",
      "MongoDB",
      "Elastic/OpenSearch",
    ],
  },
  {
    label: "Ship & Connect",
    filled: true,
    tools: [
      "Google Cloud",
      "Docker",
      "GitHub Actions",
      "Infobip",
      "Twilio",
      "Meta",
    ],
  },
  {
    label: "Break",
    filled: false,
    tools: [
      "Burp Suite",
      "Nmap",
      "Metasploit",
      "OWASP ZAP",
      "Semgrep",
      "Frida",
      "Wireshark",
    ],
  },
];

export const marqueeItems = [
  { label: "WEB", bit: "1" },
  { label: "MOBILE", bit: "0" },
  { label: "PENTEST", bit: "1" },
  { label: "TRAINING", bit: "0" },
];

export const contactNeeds: ContactNeed[] = [
  { value: "web", label: "Web development" },
  { value: "mobile", label: "Mobile app" },
  { value: "pentest", label: "Penetration test" },
  { value: "training", label: "Training" },
];

/**
 * Static info rows for the contact card. The "email" row is appended at
 * render time from `siteConfig.contactEmail` so it stays in sync with the
 * `NEXT_PUBLIC_CONTACT_EMAIL` env var instead of being duplicated here.
 */
export const contactInfoRows: ContactInfoRow[] = [
  { label: "reply time", value: "within one working day" },
  { label: "nda", value: "signed before the first call" },
];

/**
 * Three different relationships — do not collapse them into one "clients"
 * wall. Partners are companies we work alongside; trusted-by are teams we
 * ship work for; research is public bounty / VDP programs we report to
 * (not a client claim).
 */
export const trustGroups: {
  kind: TrustLogo["kind"];
  label: string;
  sublabel: string;
  logos: TrustLogo[];
}[] = [
  {
    kind: "partner",
    label: "Our partners",
    sublabel: "companies we build with",
    logos: [
      {
        kind: "partner",
        name: "Electro S Lab",
        src: "/partners/electro-s-lab.jpg",
      },
      { kind: "partner", name: "Hash", src: "/partners/hash.jpg" },
      { kind: "partner", name: "Ping", src: "/partners/ping.png" },
    ],
  },
  {
    kind: "client",
    label: "Trusted by",
    sublabel: "teams we ship and support",
    logos: [
      {
        kind: "client",
        name: "Annual Robotic Competition",
        src: "/clients/arc.png",
      },
      {
        kind: "client",
        name: "EdTech Syndicate in Lebanon",
        src: "/clients/edtechs.jpg",
      },
      {
        kind: "client",
        name: "Interactive Education Technology",
        src: "/clients/iet.jpg",
      },
      {
        kind: "client",
        name: "Kalimat Educational Scientific Association",
        src: "/clients/kalimat.jpg",
      },
      {
        kind: "client",
        name: "Al-Imam Al-Rida High School",
        src: "/clients/ridha.jpg",
      },
      {
        kind: "client",
        name: "Imam Al-Sadiq International High School",
        src: "/clients/sadiq.jpg",
      },
      { kind: "client", name: "SUC IT Solutions", src: "/clients/suc.jpg" },
    ],
  },
  {
    kind: "research",
    label: "Research",
    sublabel: "programs we submit reports to",
    logos: [
      {
        kind: "research",
        name: "Vodafone",
        src: "/research/vodafone.png",
      },
    ],
  },
];
