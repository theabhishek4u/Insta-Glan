# 📸 Insta Glan — Ultimate Instagram Media Downloader

Insta Glan is a premium, state-of-the-art web application designed for fast, seamless, and high-quality Instagram media extraction. Built with Next.js (App Router), React 19, and Tailwind CSS v4, it features a highly resilient **Multi-Strategy Scraping Engine** that ensures maximum uptime and download success.

---

## ✨ Features

- **🚀 Multiple Content Support**: Effortlessly download Reels, Carousel Posts, Photos, Videos, and Profile Pictures.
- **🛡️ Resilient Multi-Strategy Scraper**: Uses 4 distinct fallback extraction strategies to bypass Instagram blocks and rate limits.
- **🎨 Elite Glassmorphism UI**: Beautiful, modern dark/light mode UI crafted with curated colors, smooth Framer Motion micro-animations, and full responsiveness.
- **⚡ Built-in Rate Limiting**: Smart security rate limiter on the server side to prevent API abuse and secure system resources.
- **🔍 SEO & Schema Ready**: Fully optimized semantic HTML with integrated structured data (JSON-LD Organization & WebApplication schemas).
- **💸 100% Free & Open Source**: No sign-up required, clean interface, and ad-slot placements ready for monetization.

---

## ⚙️ How the Multi-Strategy Engine Works

To combat Instagram's aggressive scraping restrictions, Insta Glan utilizes an advanced, multi-layered strategy system:

| Level | Strategy | Description | Uptime / Reliability |
| :--- | :--- | :--- | :--- |
| **Strategy 0** | **yt-dlp Extraction** | Locally runs the powerful `yt-dlp` executable to extract high-definition direct media streams. | ⭐⭐⭐⭐⭐ (Excellent) |
| **Strategy 1** | **Embed Page Scraper** | Fetches the public caption-embed HTML, parsing background JSON script states and iframe DOMs. | ⭐⭐⭐⭐ (Very High) |
| **Strategy 2** | **Open Graph & JSON-LD** | Extracts standard Open Graph metadata tags, schema tags, and `window._sharedData` inlined in pages. | ⭐⭐⭐ (High) |
| **Strategy 3** | **RapidAPI (Paid Fallback)** | A robust external scraping API used as the ultimate fallback when all local scrapers fail. | ⭐⭐⭐⭐⭐ (Premium) |

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router & React 19)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with PostCSS
- **Animation**: [Framer Motion](https://www.framer.com/motion/) for fluid transitions and micro-interactions
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) (Client state persistence)
- **Parsing**: [Cheerio](https://cheerio.js.org/) (Fast HTML manipulation & traversal)
- **Notifications**: [React Hot Toast](https://react-hot-toast.com/)

---

## 🚀 Getting Started

Follow these instructions to set up the project locally on your machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (v20+ recommended)
- [NPM](https://www.npmjs.com/) or Yarn/PNPM/Bun

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/theabhishek4u/Insta-Glan.git
cd Insta-Glan
npm install
```

### 2. Environment Variables Setup

Create a `.env.local` file in the root directory (you can copy `.env.example`):

```bash
cp .env.example .env.local
```

Configure your environment keys:

```ini
# Optional: Used as Strategy 3 Fallback Scraper
RAPIDAPI_KEY=your_rapidapi_key_here
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to experience **Insta Glan** locally!

---

## 📂 Project Structure

```filepath
Insta-Glan/
├── public/                 # Static assets & SVG icons
├── src/
│   ├── app/                # Next.js App Router (pages & API routes)
│   │   ├── api/
│   │   │   └── download/   # Serverless Download Extraction API
│   │   └── page.tsx        # Main App landing page
│   ├── components/
│   │   ├── download/       # Downloader interface & action elements
│   │   ├── home/           # Hero, Features, How it works, and FAQs
│   │   ├── layout/         # Header, Footer, and Ad placement components
│   │   └── ui/             # Reusable UI component blocks (Buttons, Cards, Inputs)
│   ├── lib/                # Core utilities (Rate limiter, Scrapers, SEO metadata)
│   ├── store/              # Zustand global client-side store
│   └── types/              # TypeScript typings
└── yt-dlp.exe              # Local high-efficiency media stream parser (Git-ignored)
```

---

## ⚖️ Legal Disclaimer

Insta Glan is intended solely to facilitate downloading publicly available media for personal offline use. It does not support private account scraping. Users assume all responsibility for respecting Instagram's copyright guidelines and Terms of Service. Insta Glan is completely independent and not affiliated with, sponsored by, or endorsed by Instagram or Meta Platforms, Inc.
