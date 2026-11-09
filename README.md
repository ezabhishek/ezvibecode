# ezvibecode

> **Stop subscribing. Start shipping.**  
> Find 109 personal and company subscriptions quietly nibbling your bank account that you could replace with focused software of your own, complete with detailed build prompts, stack recommendations, and scope breakdowns.

---

## ⚡ Quick Start

### 1. Run with Node.js (Zero external dependencies)
```bash
npm start
# or
node server.js
```
Open your browser and navigate to:
**[http://localhost:3100](http://localhost:3100)**

---

## ✨ Features

- **109 Build-Your-Own Guides**: Linktree, Calendly, Typeform, Buffer, Readwise, TinyPNG, Notion, Airtable, Linear, Slack, Loom, Miro, Bitly, and 96+ more.
- **Interactive Potential Savings Receipt**:
  - Live calculation of annual savings (low to high estimates).
  - Scalable team size stepper ($+$ / $-$ / direct numeric input) that adjusts per-user licenses.
  - Estimated basic build time tracker.
  - "Select the no-brainers" one-click action.
- **Auditing & Discovery Engine**:
  - Instant keyboard-friendly search (`/` shortcut) filtering by app name, category, or stack.
  - Effort filters: *Tonight* (Easy), *Weekend*, *Side quest* (Ambitious).
  - Category filters: *Personal*, *Productivity*, *Marketing*, *Operations*, *Sales*, *Support*, *Design*.
- **Comprehensive Build Prompts Modal**:
  - In-depth, agentic coding prompts pre-tuned for each app.
  - Framework tab switcher (AHA, Astro, Next.js, etc.).
  - Word count calculator and one-click copy with toast notifications.
- **Full Editorial Content**:
  - **Blog** (28 articles with real architectural breakdowns and scoping guides).
  - **In-Depth Guides** (step-by-step vibe coding tutorials).
  - **Changelog**.
  - **RSS Feed** (`/rss.xml`) and **Sitemap** (`/sitemap.xml`).
- **Dark / Light Theme Toggle**: Persistent theme switching stored in `localStorage`.
- **Zero Build Step**: Fully bundled HTML, CSS, JavaScript, and OpenGraph assets ready to run anywhere.

---

## 🚀 Deployment Options

### Cloudflare Pages / Vercel / Netlify
Deploy the entire repository directory as a static site. No build command needed; output directory is root `./`.

### Docker
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY . .
EXPOSE 3100
CMD ["node", "server.js"]
```

---

## 📄 License
MIT
