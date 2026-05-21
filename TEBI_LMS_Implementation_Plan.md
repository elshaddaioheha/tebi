# TEBI LMS — Developer Implementation Plan

**Project:** The Event Business Institute — Landing Page → LMS Refactor  
**Stack:** Next.js 16, TypeScript, Tailwind CSS v4, Framer Motion (light), Prisma + PostgreSQL  
**Estimated Total:** ~6–8 weeks solo, ~3–4 weeks with one collaborator

---

## Overview of Changes

| What | Before | After |
|---|---|---|
| Site type | Marketing landing page | LMS + marketing hybrid |
| Animations | Heavy (blur, scale, stagger) | CSS-only fade transitions |
| Tagline pill | Static branded badge | Carousel text (fade left→right) |
| Dark mode | None | Toggle with `next-themes` |
| Navigation labels | Philosophy / The Reset / Resources | Learn / Courses / About / Login |
| Language | Formal/aspirational | Clear, direct, benefit-first |
| SEO | Basic metadata | Full structured data + OG + sitemap |
| Performance | Framer Motion everywhere | Motion only where strictly needed |
| LMS features | None | Course pages, lessons, progress tracking |

---

## Phase 0 — Foundations (Day 1–3)

### 0.1 Install Core Dependencies

```bash
pnpm add next-themes @prisma/client prisma
pnpm add -D @types/node
pnpm add slugify date-fns
```

Remove heavy unused packages or defer until needed:
- Keep `framer-motion` but **restrict imports** to a single `<FadeIn>` wrapper component only.
- Remove `lucide-react` bulk imports — import icons one at a time from `lucide-react/dist/esm/icons/`.

### 0.2 Folder Structure

```
src/
├── app/
│   ├── (marketing)/          ← Landing page route group
│   │   └── page.tsx
│   ├── (lms)/                ← Authenticated LMS routes
│   │   ├── dashboard/
│   │   ├── courses/
│   │   │   └── [slug]/
│   │   │       ├── page.tsx
│   │   │       └── lessons/
│   │   │           └── [lessonSlug]/
│   │   │               └── page.tsx
│   │   └── layout.tsx
│   ├── api/
│   │   ├── auth/
│   │   └── progress/
│   └── layout.tsx
├── components/
│   ├── marketing/            ← All current landing page components (refactored)
│   ├── lms/                  ← New LMS-specific components
│   └── shared/               ← Dark mode toggle, Navbar, Footer, FadeIn
├── lib/
│   ├── utils.ts
│   ├── db.ts                 ← Prisma client singleton
│   └── seo.ts                ← generateMetadata helpers
└── content/
    └── courses/              ← MDX or JSON course content files
```

### 0.3 Environment Setup

```bash
# .env.local
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="..."
NEXTAUTH_URL="http://localhost:3000"
```

---

## Phase 1 — Performance & Animation Cleanup (Day 3–5)

### 1.1 Replace Heavy Framer Imports

**Create one shared lightweight wrapper** — `src/components/shared/FadeIn.tsx`:

```tsx
"use client";
import { useEffect, useRef, useState } from "react";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export default function FadeIn({ children, delay = 0, className = "" }: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
```

**Rule:** Every `motion.div` in existing components gets replaced with `<FadeIn delay={n * 100}>`. Remove `framer-motion` imports from all marketing components. Keep framer-motion ONLY for the mobile menu toggle animation in `Navbar.tsx` — that is the only place complex animation is justified.

### 1.2 Replace the AI-Looking Pill Badge

The static `<span>` pill ("SYSTEMS. STRATEGY. PRICING...") gets replaced with a **CSS carousel**.

**Create `src/components/shared/TaglineCarousel.tsx`:**

```tsx
"use client";
import { useEffect, useState } from "react";

const TAGS = [
  "Build a real business, not just bookings.",
  "Pricing that reflects your value.",
  "Systems that free up your time.",
  "CEO thinking, not freelancer hustle.",
  "Structure first. Growth follows.",
];

export default function TaglineCarousel() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % TAGS.length);
        setVisible(true);
      }, 400); // fade out then swap
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <span
      aria-live="polite"
      className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wide 
                 text-secondary border border-secondary/30 rounded-full bg-secondary/5
                 min-w-[280px] text-center"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(24px)",
        transition: "opacity 0.35s ease, transform 0.35s ease",
      }}
    >
      {TAGS[index]}
    </span>
  );
}
```

Replace the static `<motion.span>` in `Hero.tsx` with `<TaglineCarousel />`.

### 1.3 Remove Decorative Background Animations

In `Hero.tsx`, delete the two `motion.div` blur orbs that use `animate={{ scale, rotate }}` with infinite loops — these are the #1 cause of jank on low-end devices. Replace with static CSS:

```tsx
{/* Replace animated orbs with static CSS gradients */}
<div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-accent/15 rounded-full blur-3xl pointer-events-none" />
<div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-secondary/8 rounded-full blur-3xl pointer-events-none" />
```

Also remove the external texture background URL:
```tsx
// DELETE THIS LINE from Hero.tsx
<div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/...')] ..." />
```
This is a network request that will fail on slow connections. Replace with a CSS `background-image` using an inline SVG noise pattern if texture is needed.

### 1.4 Image Optimization Audit

- All `<Image>` components: add `loading="lazy"` except `/tebi-logo.png` (above fold, keep `priority`)
- Add explicit `width` and `height` to every image to prevent CLS
- `/ceo.jpg` — add `sizes="(max-width: 768px) 100vw, 50vw"`

---

## Phase 2 — Dark Mode (Day 5–6)

### 2.1 Install and Configure

```bash
pnpm add next-themes
```

**`src/app/layout.tsx` — wrap with ThemeProvider:**

```tsx
import { ThemeProvider } from "next-themes";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### 2.2 CSS Variables Update

In `src/app/globals.css`:

```css
:root {
  --background: #FAFAF5;
  --foreground: #0A1128;
  --surface: #FFFFFF;
  --surface-alt: #F4F4EF;
  --border: #E5E5DD;
  --muted: rgba(10, 17, 40, 0.6);
}

.dark {
  --background: #0F0F0E;
  --foreground: #F0EDE6;
  --surface: #1A1A18;
  --surface-alt: #242420;
  --border: #2E2E2A;
  --muted: rgba(240, 237, 230, 0.6);
}
```

Update all `bg-background`, `text-primary`, `bg-white`, `bg-surface` Tailwind classes to use these CSS variables. The key substitutions:
- `bg-white` → `bg-surface`
- `text-primary/70` → `text-muted` (CSS var)
- `bg-primary/[0.02]` → `bg-surface-alt`

### 2.3 Dark Mode Toggle Component

**`src/components/shared/ThemeToggle.tsx`:**

```tsx
"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle dark mode"
      className="w-9 h-9 rounded-full border border-border flex items-center justify-center 
                 hover:bg-surface-alt transition-colors"
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}
```

Add `<ThemeToggle />` to the right side of `Navbar.tsx` desktop nav, and to the mobile menu.

---

## Phase 3 — Navigation & Language Refactor (Day 6–7)

### 3.1 Simplified Navigation Labels

| Old Label | New Label | Why |
|---|---|---|
| Philosophy | How It Works | Concrete, scannable |
| The Reset | Courses | Direct |
| Resources | Learn Free | Invites action |
| About | Our Story | Warmer |
| Contact | Talk to Us | Less formal |

**Update `Navbar.tsx` navLinks array:**

```tsx
const navLinks = [
  { name: "How It Works", href: "#how-it-works" },
  { name: "Courses", href: "#courses" },
  { name: "Learn Free", href: "#resources" },
  { name: "Our Story", href: "#about" },
  { name: "Talk to Us", href: "#contact" },
];
```

Also rename section `id` attributes to match throughout all components.

CTA buttons:
- `"Start Building"` → `"Get Started"` (navbar)
- `"View The Business Reset"` → `"See What We Teach"` (hero primary)
- `"Consult the Institute"` → `"Talk to an Advisor"` (hero secondary)
- `"Secure Your Reset Slot"` → `"Join the Next Cohort"` (Reset section)

### 3.2 Simplified Copy — Key Substitutions

**Hero headline:**
```
Before: "Where Event Planners Build Real Businesses."
After:  "Turn Your Event Planning into a Business That Pays You Well."
```

**Hero subtext:**
```
Before: "Helping rising event planners move past the daily grind and start building 
         structured, profitable event businesses."
After:  "TEBI gives event planners the tools, training, and strategy they need 
         to stop overworking and start earning what they deserve."
```

**Problem section headline:**
```
Before: "Talented, but Overwhelmed?"
After:  "You're good at planning. But is your business working for you?"
```

**Problem section body:**
```
Before: "The problem is not creativity—it is the absence of business structure."
After:  "Most event planners are skilled at their craft but never learned how 
         to run a business. That gap is what TEBI closes."
```

**Solution section headline:**
```
Before: "The Planner-to-CEO Framework"
After:  "Three Shifts That Change Everything"
```

**Card tags:** Operations → Systems | Finance → Pricing | Strategy → Leadership

---

## Phase 4 — SEO Implementation (Day 7–9)

### 4.1 Core Metadata File

**`src/lib/seo.ts`:**

```ts
export const siteMeta = {
  name: "The Event Business Institute",
  shortName: "TEBI",
  url: "https://theeventbusinessinstitute.com",
  description: "Online courses and coaching for event planners in Nigeria and Africa who want to build profitable, structured businesses. Learn pricing, systems, and CEO-level strategy.",
  keywords: [
    "event planning business Nigeria",
    "event planning courses Africa",
    "how to price event planning services",
    "event business coaching",
    "event planner training Jos Nigeria",
    "profitable event business",
    "event planning systems",
    "Dr Emma Collins TEBI",
  ],
  ogImage: "/og-image.jpg", // Create a 1200x630 branded image
  twitter: "@TEBIInstitute",
};

export function generatePageMeta(title: string, description?: string) {
  return {
    title: `${title} | ${siteMeta.shortName}`,
    description: description ?? siteMeta.description,
    openGraph: {
      title,
      description: description ?? siteMeta.description,
      url: siteMeta.url,
      siteName: siteMeta.name,
      images: [{ url: siteMeta.ogImage, width: 1200, height: 630 }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: description ?? siteMeta.description,
      images: [siteMeta.ogImage],
    },
  };
}
```

### 4.2 Root Layout Metadata

```tsx
// src/app/layout.tsx
export const metadata: Metadata = {
  metadataBase: new URL("https://theeventbusinessinstitute.com"),
  title: {
    default: "TEBI — Event Business Training for Planners in Nigeria & Africa",
    template: "%s | TEBI",
  },
  description: siteMeta.description,
  keywords: siteMeta.keywords,
  authors: [{ name: "Dr. Emma Collins" }],
  creator: "The Event Business Institute",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: { canonical: "/" },
};
```

### 4.3 Structured Data (JSON-LD)

Add to `layout.tsx` inside `<head>`:

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": "https://theeventbusinessinstitute.com/#org",
          "name": "The Event Business Institute",
          "url": "https://theeventbusinessinstitute.com",
          "logo": "https://theeventbusinessinstitute.com/tebi-logo.png",
          "sameAs": [
            "https://instagram.com/theeventbusinessinstitute",
            "https://facebook.com/diamonddreamsevents"
          ]
        },
        {
          "@type": "EducationalOrganization",
          "name": "The Event Business Institute",
          "description": "Training and coaching for event planning entrepreneurs in Nigeria and Africa",
          "offers": [
            {
              "@type": "Course",
              "name": "Introduction to Event Planning Business",
              "description": "Build your event business foundation from the ground up.",
              "provider": { "@id": "https://theeventbusinessinstitute.com/#org" },
            },
            {
              "@type": "Course",
              "name": "The Authority Event Planner™",
              "description": "Systems and strategy for established planners ready to scale.",
              "provider": { "@id": "https://theeventbusinessinstitute.com/#org" },
            }
          ]
        },
        {
          "@type": "Person",
          "name": "Dr. Emma Collins",
          "jobTitle": "Founder & CEO",
          "worksFor": { "@id": "https://theeventbusinessinstitute.com/#org" },
        }
      ]
    })
  }}
/>
```

### 4.4 Sitemap and Robots

Create `src/app/sitemap.ts`:

```ts
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://theeventbusinessinstitute.com", lastModified: new Date(), priority: 1.0 },
    { url: "https://theeventbusinessinstitute.com/courses", lastModified: new Date(), priority: 0.9 },
    { url: "https://theeventbusinessinstitute.com/about", lastModified: new Date(), priority: 0.7 },
  ];
}
```

Create `src/app/robots.ts`:

```ts
import { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://theeventbusinessinstitute.com/sitemap.xml",
  };
}
```

### 4.5 High-Paying Client Lead SEO Strategy

These are content additions — write 3 blog posts or landing page sections targeting:

1. **"How to price event planning services in Nigeria 2024"** — targets planners searching for pricing help. Captures leads with a free pricing calculator or guide PDF.
2. **"Event planning business checklist for beginners"** — free PDF lead magnet, captures emails.
3. **"Event planning coach in Jos Nigeria"** — local SEO for Dr. Emma's consulting work.

Each should have:
- A dedicated URL (`/blog/how-to-price-event-planning-nigeria`)
- Proper H1/H2 structure
- An inline CTA that points to the course waitlist or consultation booking

---

## Phase 5 — LMS Architecture (Day 9–18)

### 5.1 Database Schema (Prisma)

**`prisma/schema.prisma`:**

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id           String       @id @default(cuid())
  email        String       @unique
  name         String?
  passwordHash String
  role         Role         @default(STUDENT)
  enrollments  Enrollment[]
  progress     Progress[]
  createdAt    DateTime     @default(now())
}

enum Role {
  STUDENT
  ADMIN
}

model Course {
  id          String     @id @default(cuid())
  slug        String     @unique
  title       String
  description String
  tier        String     // "beginner" | "professional" | "mastery"
  price       Int        // in kobo (NGN × 100)
  published   Boolean    @default(false)
  modules     Module[]
  enrollments Enrollment[]
  createdAt   DateTime   @default(now())
}

model Module {
  id       String   @id @default(cuid())
  courseId String
  course   Course   @relation(fields: [courseId], references: [id])
  title    String
  order    Int
  lessons  Lesson[]
}

model Lesson {
  id          String     @id @default(cuid())
  moduleId    String
  module      Module     @relation(fields: [moduleId], references: [id])
  slug        String
  title       String
  body        String     @db.Text  // MDX or HTML content
  videoUrl    String?
  duration    Int?       // seconds
  order       Int
  progress    Progress[]
}

model Enrollment {
  id         String   @id @default(cuid())
  userId     String
  user       User     @relation(fields: [userId], references: [id])
  courseId   String
  course     Course   @relation(fields: [courseId], references: [id])
  enrolledAt DateTime @default(now())
  @@unique([userId, courseId])
}

model Progress {
  id          String   @id @default(cuid())
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  lessonId    String
  lesson      Lesson   @relation(fields: [lessonId], references: [id])
  completed   Boolean  @default(false)
  completedAt DateTime?
  @@unique([userId, lessonId])
}
```

### 5.2 Authentication

Use **NextAuth.js v5 (Auth.js)**:

```bash
pnpm add next-auth@beta @auth/prisma-adapter
```

Configure credentials provider + email provider. Keep it simple — no OAuth needed initially (reduces dependency surface, works offline better).

### 5.3 LMS Page Structure

**Public course catalogue** — `src/app/(marketing)/courses/page.tsx`
- Lists all 3 courses with price + tier
- "Enroll Now" → auth wall → payment

**Course detail** — `src/app/(lms)/courses/[slug]/page.tsx`
- Shows modules list, lesson count, duration
- Shows completion % for enrolled users
- Locked lessons show a padlock for non-enrolled users

**Lesson view** — `src/app/(lms)/courses/[slug]/lessons/[lessonSlug]/page.tsx`
- Main content area (markdown rendered with `next-mdx-remote` or just dangerouslySetInnerHTML for HTML)
- Video embed (YouTube or self-hosted — YouTube recommended for bandwidth)
- "Mark Complete" button → calls `/api/progress` POST
- Sidebar: module navigation with completed checkmarks
- Previous/Next lesson navigation

**Dashboard** — `src/app/(lms)/dashboard/page.tsx`
- Shows enrolled courses + progress bars
- Quick-resume button per course

### 5.4 Performance for Low Bandwidth

These are non-negotiable for your Nigeria/Africa user base:

```tsx
// next.config.ts additions
const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],  // Better compression
    minimumCacheTTL: 86400,
    deviceSizes: [390, 640, 768, 1024],     // Only necessary breakpoints
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
  compress: true,
  poweredByHeader: false,
  experimental: {
    optimizeCss: true,
  },
};
```

Additional rules:
- **No video autoplay** anywhere. All video = YouTube embed with `loading="lazy"` iframe.
- **Lesson content loads progressively** — render above-fold text first, load attachments on interaction.
- **Offline-friendly navigation** — use `next/link` for all internal links (prefetches on hover, not on load).
- **No CDN-hosted fonts from Hero** — the `Playfair_Display` + `Plus_Jakarta_Sans` fonts load from `next/font/google` which is already self-hosted by Next.js. This is good — keep it.
- **Bundle size check** — run `pnpm build && pnpm analyze` with `@next/bundle-analyzer` before launch.

```bash
pnpm add -D @next/bundle-analyzer
```

---

## Phase 6 — Lead Generation & CTA Strategy (Day 18–20)

### 6.1 High-Paying Client Lead Flow

The primary funnel is: **SEO content → Landing page → Free resource/consultation CTA → Email capture → Course sale / Coaching inquiry**

**Add to Hero section:**
```tsx
// Hero CTA — primary button changes based on whether a course cohort is open
// If no cohort: "Download Free Business Checklist" (captures email)
// If cohort open: "Join the Next Cohort"
```

**Add a Lead Magnet section** between `Problem` and `Solution`:

```tsx
// New component: src/components/marketing/LeadMagnet.tsx
// Offer: "The Event Planner's Pricing Guide — Free Download"
// Form: Name + WhatsApp number (WhatsApp works better than email in Nigeria)
// Submits to a simple API route that saves to DB and sends a WhatsApp message via Twilio/Vonage
```

**WhatsApp CTA** (more effective than email for Nigerian market):
- Replace the newsletter form in Footer with: "Chat with us on WhatsApp"
- Link: `https://wa.me/2348093000380?text=I'm interested in TEBI courses`

### 6.2 Consultation Booking

For high-ticket clients, add a simple booking CTA that links to **Calendly** (free tier is enough):

```tsx
// In Reset section, below "Join the Next Cohort":
<a href="https://calendly.com/tebi/consultation" target="_blank">
  Or book a free 20-minute strategy call →
</a>
```

This captures the client who won't buy from a page — they need the personal conversation first.

---

## Phase 7 — Course Content Upload Workflow (Day 20–22)

When you're ready to upload course materials, use this structure:

### 7.1 Content Format

Store lesson content as **Markdown/MDX files** in `src/content/courses/`:

```
src/content/courses/
├── intro-to-event-business/
│   ├── _meta.json          ← course info: title, price, tier, description
│   ├── module-1-foundations/
│   │   ├── _meta.json      ← module title + order
│   │   ├── 01-welcome.mdx
│   │   ├── 02-business-vs-hobby.mdx
│   │   └── 03-your-first-client.mdx
│   └── module-2-pricing/
│       ├── 01-why-planners-underprice.mdx
│       └── 02-the-pricing-formula.mdx
```

Each MDX file frontmatter:
```mdx
---
title: "Why Event Planners Underprice Their Services"
duration: 12   # minutes
videoUrl: "https://youtube.com/watch?v=..."
order: 1
---

Your lesson content here in Markdown...
```

### 7.2 Seeding the Database

Create `prisma/seed.ts` that reads from `src/content/courses/` and populates the DB. Run once per content update:

```bash
pnpm prisma db seed
```

---

## Phase 8 — Deployment (Day 22–24)

### 8.1 Recommended Stack

| Service | Free Tier? | Notes |
|---|---|---|
| **Vercel** | Yes | Best for Next.js. Auto CDN. |
| **Neon** or **Supabase** | Yes | Postgres. Neon is lighter. |
| **Cloudinary** | Yes | Image hosting for course thumbnails |
| **YouTube** | Yes | Video hosting for lessons (offloads bandwidth) |
| **Resend** | Yes (3k emails/mo) | Transactional email |

### 8.2 Vercel Config

```json
// vercel.json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    },
    {
      "source": "/api/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "no-store" }
      ]
    }
  ]
}
```

---

## Refactor Checklist (Track in Your IDE)

Copy this into a GitHub Project or Notion board:

```
PHASE 0 — SETUP
[ ] Create (marketing) and (lms) route groups
[ ] Set up Prisma schema + run migration
[ ] Install next-themes, next-auth

PHASE 1 — PERFORMANCE
[ ] Create shared FadeIn.tsx component
[ ] Replace all framer-motion imports in marketing components
[ ] Remove animated background orbs from Hero.tsx
[ ] Remove external texture URL from Hero.tsx
[ ] Implement TaglineCarousel.tsx
[ ] Audit all <Image /> for lazy loading + sizing
[ ] Add @next/bundle-analyzer and run audit

PHASE 2 — DARK MODE
[ ] Add ThemeProvider to root layout
[ ] Update CSS variables in globals.css for dark mode
[ ] Replace bg-white/bg-surface throughout all components
[ ] Create ThemeToggle.tsx
[ ] Add ThemeToggle to Navbar (desktop + mobile)
[ ] Test all sections in dark mode

PHASE 3 — COPY & NAV
[ ] Update navLinks array with new labels
[ ] Update all section id attributes
[ ] Update Hero headline + subtext
[ ] Update Problem section headline + body
[ ] Update Solution section headline + card tags
[ ] Update all CTA button labels
[ ] Rename Reset section title

PHASE 4 — SEO
[ ] Create src/lib/seo.ts
[ ] Update root layout.tsx metadata
[ ] Add JSON-LD structured data
[ ] Create sitemap.ts
[ ] Create robots.ts
[ ] Create /og-image.jpg (1200x630)
[ ] Plan 3 SEO blog posts

PHASE 5 — LMS
[ ] Run prisma migrate
[ ] Set up NextAuth credentials provider
[ ] Build course catalogue page
[ ] Build course detail page
[ ] Build lesson view page
[ ] Build student dashboard
[ ] Build progress API route
[ ] Test enrolment → lesson → complete flow

PHASE 6 — LEADS
[ ] Add WhatsApp CTA to Footer
[ ] Add Calendly consultation link to Reset section
[ ] Plan lead magnet (PDF pricing guide)
[ ] Create /api/lead-capture route

PHASE 7 — CONTENT
[ ] Set up src/content/courses/ folder structure
[ ] Write seed script
[ ] Upload course 1 materials (when ready)

PHASE 8 — DEPLOY
[ ] Set up Vercel project
[ ] Set up Neon/Supabase database
[ ] Set up environment variables in Vercel
[ ] Run production build locally first
[ ] Deploy + test on mobile (real device, not emulator)
[ ] Test on slow 3G throttling in Chrome DevTools
```

---

## Priority Order if Time is Limited

If you need to ship fast, do these phases in this order:

1. **Phase 1 (Performance cleanup)** — biggest impact, least risk
2. **Phase 3 (Copy + nav)** — done in 2–3 hours, improves conversion immediately
3. **Phase 2 (Dark mode)** — user expectation, builds trust
4. **Phase 4 (SEO)** — long-term lead engine, do early so it starts indexing
5. **Phase 6 (Lead gen)** — WhatsApp CTA is 30 minutes of work, high ROI
6. **Phase 5 (LMS)** — only after content is ready
7. **Phase 7 (Content upload)** — when course materials are prepared
8. **Phase 8 (Deploy)** — continuous, deploy early and iterate
```
