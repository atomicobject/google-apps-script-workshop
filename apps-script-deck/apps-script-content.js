// ============================================================
// apps-script-content.js
// ── Edit THIS file to update the deck content ──
// No CSS or layout knowledge required.
// Source: ../apps-script-presentation.md
// ============================================================

export const config = {
  title: "Google Apps Script",
  org: "Atomic Object",
  format: "letter-landscape",
  brand: {
    primary: "#F96167",
    dark: "#2A2A2E",
    secondary: "#1A9CA0",
    warning: "#E8A838",
    success: "#3BA55D",
    font: "Inter",
  },
};

export const pages = [
  // ── 01 COVER ────────────────────────────────────────────
  {
    type: "cover",
    title: "Google\nApps Script", // \n = line break
    subtitle: "Automations and web apps, without leaving your Google account",
    meta: [
      { label: "Presenter", value: "Valerie Graybeal" },
      { label: "Format", value: "Workshop + live build" },
      { label: "Demo", value: "Recipe Box App" },
    ],
    footerLabel: "Workshop · Atomic Object",
    ghost: "{ }",
  },

  // ── 02 OVERVIEW ─────────────────────────────────────────
  {
    type: "content",
    eyebrow: "Overview",
    title: "What is Google Apps Script?",
    layout: "full-text",
    statement:
      "Google Apps Script allows you to harness your Google platforms to create <strong>embedded automations</strong> or <strong>web applications</strong> without leaving the environment of your Google account.",
    tiles: [
      { icon: "bolt", iconColor: "coral", title: "Embedded automations" },
      { icon: "browser", iconColor: "teal", title: "Web applications" },
      { icon: "lock", iconColor: "green", title: "Inside your Google account" },
    ],
  },

  // ── 03 BENEFITS ─────────────────────────────────────────
  {
    type: "content",
    eyebrow: "Benefits",
    title: "Google features, built in",
    layout: "card-grid-3",
    lead: "Compared to writing a fully custom web app outside Google's platform, this tool has the advantage of built-in Google features.",
    items: [
      { icon: "grid", iconColor: "green", title: "Google Sheets", body: "Access to Google Sheets data." },
      { icon: "calendar", iconColor: "teal", title: "Google Calendar", body: "Connection to Google Calendar." },
      { icon: "mail", iconColor: "coral", title: "Gmail", body: "Control of your Gmail account." },
      { icon: "users", iconColor: "amber", title: "People API", body: "Access to the company directory." },
      { icon: "doc", iconColor: "teal", title: "Google Docs", body: "Create and edit Google Docs." },
      { icon: "lock", iconColor: "coral", title: "SSO", body: "Access control exactly how you control Google resources like Google Docs." },
    ],
  },

  // ── 04 DIVIDER ──────────────────────────────────────────
  {
    type: "divider",
    sectionNum: "01",
    eyebrow: "Section One",
    title: "Writing with AI",
    description: "Two ways to build Apps Script applications with AI, and the one I chose.",
  },

  // ── 05 TWO WAYS TO BUILD ────────────────────────────────
  {
    type: "content",
    eyebrow: "Writing with AI",
    title: "Two ways to build",
    layout: "option-compare",
    options: [
      {
        icon: "sparkle",
        title: "Google AI Studio",
        badge: "Not what I chose",
        chosen: false,
        body: [
          "Google encourages you to use their own development environment, Google AI Studio. This is not necessary.",
          "I chose not to do this because I already have my own development environment I like to use.",
        ],
        links: [{ text: "ai.google.dev/aistudio", url: "https://ai.google.dev/aistudio" }],
      },
      {
        icon: "terminal",
        title: "Claude Code + clasp",
        badge: "My chosen method",
        chosen: true,
        body: [
          "You can build Google Apps Script applications on your computer using Claude Code or similar programming agents.",
          "I built using Claude Code and <code>clasp</code>, Google's open source tool for pushing updates to the Apps Script workspace.",
        ],
        links: [
          { text: "developers.google.com/apps-script/guides/clasp", url: "https://developers.google.com/apps-script/guides/clasp" },
          { text: "github.com/google/clasp", url: "https://github.com/google/clasp" },
        ],
      },
    ],
  },

  // ── 06 TRADE-OFFS ───────────────────────────────────────
  {
    type: "content",
    eyebrow: "Writing with AI",
    title: "Claude Code + clasp: the trade-offs",
    layout: "two-col",
    columns: [
      {
        heading: "Upsides",
        tone: "success",
        items: [
          "Use your favorite coding agents.",
          "Popular agents already understand Apps Script APIs well enough to build with very few issues.",
        ],
      },
      {
        heading: "Downsides",
        tone: "warning",
        items: [
          "You can't test integrations with Google services until you push them to the Google Apps Script environment.",
          "The Apps Script environment can have a lag between pushing and being able to see your changes.",
        ],
      },
    ],
  },

  // ── 07 AI FEATURES ──────────────────────────────────────
  {
    type: "content",
    eyebrow: "AI Features",
    title: "Built-in AI features",
    layout: "card-grid-2",
    lead: "Google Apps Script also has built-in AI features. Here are a few of them.",
    items: [
      { icon: "chat", iconColor: "teal", title: "Dialogflow", body: "Chat bot system." },
      { icon: "sparkle", iconColor: "coral", title: "Gemini", body: "LLM agent." },
    ],
    callout: {
      color: "amber",
      text: "<strong>Heads up:</strong> I have not explored this yet.",
    },
    links: [
      {
        text: "developers.google.com/workspace/guides/ai-overview#samples",
        url: "https://developers.google.com/workspace/guides/ai-overview#samples",
      },
    ],
  },

  // ── 08 REAL USE CASES ───────────────────────────────────
  {
    type: "content",
    eyebrow: "In Practice",
    title: "A few of my real use cases",
    layout: "card-grid-2",
    items: [
      {
        icon: "clipboard",
        iconColor: "coral",
        title: "Check-in agenda creation",
        body: "Including custom updates for each person I manage.",
        badge: "Quick demo",
      },
      {
        icon: "mail",
        iconColor: "teal",
        title: "Onboarding email generation",
        body: "Uses Google Calendar events and creates an email draft in my Gmail, ready to review.",
        badge: "Quick demo",
      },
    ],
  },

  // ── 09 DIVIDER ──────────────────────────────────────────
  {
    type: "divider",
    sectionNum: "02",
    eyebrow: "Today's Use Case",
    title: "Recipe Box App",
    description:
      "I use a real, physical recipe box with index cards in it. Today I'm going to demo building the app version.",
  },

  // ── 10 WEEKLY PLANNING ──────────────────────────────────
  {
    type: "content",
    eyebrow: "Today's Use Case",
    title: "How I plan meals for my family each week",
    layout: "journey-map",
    steps: [
      { title: "Look ahead", body: "Look ahead one week in my calendar." },
      { title: "Find time", body: "Check which days I have time to cook." },
      { title: "Review dinners", body: "Look at my list of regular family dinners." },
      { title: "Choose", body: "Choose a meal to make each day." },
    ],
    callout: {
      color: "coral",
      text: "<strong>No time to cook?</strong> On those days, we just default to getting takeout.",
    },
  },

  // ── 11 APP REQUIREMENTS ─────────────────────────────────
  {
    type: "content",
    eyebrow: "Today's Use Case",
    title: "What the app needs to do",
    layout: "checklist",
    items: [
      { text: "Maintain a list of regular dinners I like to make", tag: "Google Sheets", tagColor: "green" },
      { text: "Check for days that have enough time to cook", tag: "Google Calendar", tagColor: "teal" },
      { text: "Choose from my list of dinners for each day with time", tag: "Web app", tagColor: "coral" },
      { text: "Record my chosen meal onto that day in my calendar", tag: "Google Calendar", tagColor: "teal" },
    ],
  },

  // ── 12 CLOSING ──────────────────────────────────────────
  {
    type: "closing",
    eyebrow: "Live Build",
    title: "Let's Build!",
    description:
      "I'm going to build this step-by-step in the browser. This is a little more straightforward than building using <code>clasp</code>.",
    highlight: "You will be able to follow along on your own computer!",
  },
];
