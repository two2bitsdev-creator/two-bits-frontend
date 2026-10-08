# Two Bits - Software Company Website

A modern, responsive website for Two Bits, a software company specializing in:
- High-performance web applications
- Mobile apps
- AI-powered solutions
- Secure digital platforms

## Hero Section

The current hero section introduces Two Bits with a direct software-company message:

- **Tagline:** `Ship quality software`
- **Headline:** `Transform Your Business with Two Bits`
- **Supporting copy:** We design and develop high-performance web applications, mobile apps, AI-powered solutions, and secure digital platforms that help businesses innovate, automate, and succeed.
- **Call to action:** `Explore Our Services`

## Technology Stack

- React 18
- Vite
- Tailwind CSS
- React Router DOM
- React Just Parallax

## Project Overview

Two Bits' website presents the company as a software, AI, and security partner. The site combines a responsive landing page, animated hero visuals, service messaging, client logos, a contact form, and a restricted operator dashboard for submitted requests.

## Features

- Responsive landing page for a software company brand
- Animated hero section with dashboard artwork and subtle motion effects
- Sections for about, services, process, clients, contact, and footer
- Contact request form connected to the Two Bits API
- Restricted `/wp` dashboard for reviewing submitted client requests

## Process Section

The **Process** section (`src/components/Roadmap.jsx`) presents the four-step workflow as an interactive card that auto-advances every 9 seconds. Hovering pauses the timer; clicking a step tab jumps directly to it.

Each step renders a unique animated visual in place of a static image:

| Step | Visual |
|------|--------|
| **Discover & Strategize** | Terminal window — discovery log entries appear line-by-line with checkmarks, ending with a success message |
| **Design & Develop** | Architecture stack diagram — Frontend → API → Database layers slide in sequentially with animated connecting lines |
| **Test & Deploy** | CI/CD pipeline — Build / Test / Scan / Deploy stages light up one by one, followed by a filling progress bar |
| **Support & Optimize** | Live metrics dashboard — Uptime, Response, Security, and Sessions cards fade in, then a sparkline bar chart builds up |

All visuals reset their internal animation state each time the step becomes active, so the sequence replays on every visit.

## Footer Section

The footer (`src/components/Footer.jsx`) is a rounded card with three columns separated by a vertical divider, plus a bottom copyright bar.

**Left column — brand identity**
- Two Bits logo (`src/assets/two-bits-logo.png`)
- Tagline: `Building secure, intelligent, and future-ready` **`digital solutions.`** (accent colour on the last two words)

**Centre column — social links**

| Platform | Link | Icon colour |
|----------|------|-------------|
| LinkedIn | https://www.linkedin.com/in/ping-tech-3bb388384/ | Blue `#1da1f2` |
| Facebook | https://www.facebook.com/profile.php?id=61580149907498 | Blue `#3b82f6` |
| WhatsApp | https://wa.me/96170447725 | Green `#22c55e` |

Each link is a labelled icon tile that lifts on hover.

**Right column — system status**
- Label: `SYSTEM STATUS` (monospace, uppercase, green `#39ff6a`)
- Indicator: pulsing green dot + pill badge reading `ONLINE`
- Sub-label: `Ready for new projects.`

**Bottom bar**
- `© 2026 Two Bits. All rights reserved.` — `Two Bits` uses the site's teal accent colour

## Quick Start

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Running the Project**

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to view the project.

**With the Two Bits API**

In another terminal, from the repo's `backend` folder run `npm run dev` so the API is on port **4000**. Copy `frontend/.env.example` to `frontend/.env` if needed and set **`VITE_API_BASE=http://localhost:4000`** so the browser calls the API directly (backend `ALLOWED_ORIGINS` must include `http://localhost:5173`).

