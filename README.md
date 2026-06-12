# Ronnie Balonon — Portfolio Website

A complete, responsive, multi-page portfolio for **Ronnie Balonon**, a Dubai-based
Graphic Designer. Built with clean **HTML, CSS and vanilla JavaScript** — no build
step, no frameworks, no dependencies.

- **Primary accent:** blue (`#2563eb`) — buttons, links, hover states, highlights
- **Backgrounds / text:** black & white with high contrast
- **Font:** system UI stack
- **Extras:** mobile hamburger nav with dropdowns, smooth hover effects, subtle
  scroll animations, a floating **WhatsApp** button and a built-in **AI assistant** widget.

---

## Project structure

> **Read this first if the folders look confusing.** Every top-level folder that
> contains an `index.html` **is a page = a live URL** (e.g. `about/` → `/about/`).
> These route folders **must stay at the root** — moving or renaming them changes
> the site's URLs and breaks the navigation and the deployment. That's why the root
> looks like a long list of folders; it's the site map, not clutter.

```
My portfolio/
├── index.html                    # Home  (/)
│
│   ── PAGES (each folder = one URL) ───────────────────────────────
├── about/                        # /about/
├── graphic-design-portfolio/     # /graphic-design-portfolio/   (Graphic Design)
│   ├── graphic/ · mockups/ · logo-branding/ · logo-identity/    (graphic sub-pages)
├── other-expertise/              # /other-expertise/
│   ├── web-design/ · photography/ · video-editing/
│   └── artificial-intelligence/ · social-media/                 (expertise pages)
├── portfolio/                    # /portfolio/   (real-work hub)
│   ├── graphic-design/ · web-design/ · social-media/
│   └── photography/ · video-editing/ · artificial-intelligence/ (real work per discipline)
├── tools/                        # /tools/
├── resume/                       # /resume/
│
│   ── SITE CODE & WEB FILES (served to visitors) ─────────────────
├── assets/                       # images, PDFs, video USED BY the live site
│   ├── expertise/dummy/          #   AI dummy expertise visuals
│   ├── hero/ · graphic/ · social/ · photography/ · web-design/ · ai/ · tools/
│   └── *.webp · *.jpg · *.pdf · logos
├── css/styles.css                # all styling + design tokens
├── js/main.js                    # navbar + footer + widgets + interactions
│
│   ── NOT PART OF THE SITE ───────────────────────────────────────
├── _source/                      # ORIGINAL SOURCE FILES ONLY (PSDs, raw images).
│                                 #   Not referenced by the site; optimised copies
│                                 #   live in "assets/". Sorted to the top, named with
│                                 #   a leading underscore so it's clearly "not a page".
├── CNAME · .nojekyll · .github/  # custom domain · Pages config · deploy workflow
└── README.md
```

**`assets/` vs `_source/`:** lowercase **`assets/`** holds the optimised files the
website actually loads; **`_source/`** is just your original source backups (Photoshop
files, raw photos) — nothing links to it, so it can be ignored or kept off the repo.

### How the shared UI works

To keep the navigation **100% consistent** and easy to maintain, the **navbar**,
**footer**, **WhatsApp button** and **AI assistant** are generated once in
`js/main.js` and injected into every page. Each HTML page only contains two
placeholders:

```html
<header id="site-header"></header>
...
<footer id="site-footer"></footer>
```

`main.js` also:

- highlights the **active** nav item (and parent dropdown) for the current page,
- powers the **hamburger menu** and **dropdown accordions** on mobile,
- fills the shared CTA buttons/contact details (`data-cta-buttons` / `data-cta-contact`),
- runs **scroll-reveal** animations (disabled automatically when the user prefers reduced motion),
- adds the **back-to-top** button.

> Because the shared UI is rendered with JavaScript, the site must be opened through
> a browser with JavaScript enabled (any normal browser — this is always the case).

---

## How to run it locally

### Option A — Just open it
Double-click **`index.html`**, or drag it into your browser. Everything works from
the local file system.

### Option B — VS Code Live Server (recommended)
1. Open the **My portfolio** folder in **VS Code**
   (`File ▸ Open Folder…`).
2. Install the **Live Server** extension (by Ritwick Dey) from the Extensions panel.
3. Right-click **`index.html`** → **“Open with Live Server”**.
4. Your browser opens at `http://127.0.0.1:5500/` with auto-reload on save.

### Option C — Any static server
```bash
# Python 3
python -m http.server 5500

# or Node
npx serve .
```
Then visit `http://localhost:5500`.

---

## WhatsApp & AI assistant

- **WhatsApp** — the green floating button (and the “WhatsApp Me” CTA buttons) open a
  chat with `+971 54 376 3091`, pre-filled with a friendly message.
- **AI assistant** — the blue ✦ floating button opens a chat panel that answers common
  questions about services, portfolio, pricing/availability and contact, with quick-reply
  chips. It runs **entirely in the browser** (no API key, fully offline) and points
  visitors to WhatsApp/email for a personal reply.

Both numbers/links are defined in one place — the `CONTACT` object at the top of
`js/main.js`.

---

## Customising

| What | Where |
|------|-------|
| Colors, spacing, radius, shadows | `:root { … }` tokens at the top of `css/styles.css` |
| Phone / email / WhatsApp | `CONTACT` object in `js/main.js` |
| Navigation items & dropdowns | `NAV` array in `js/main.js` |
| AI assistant answers | `aiReply()` in `js/main.js` |
| Page text & sections | the individual `.html` files |

### Replacing the placeholder images
Every dummy image is a styled block like:

```html
<div class="ph ph--3x2" role="img" aria-label="Project — placeholder image">
  <span class="ph__label">Project Image</span>
</div>
```

To use a real image, swap it for a standard `<img>` (keep the descriptive `alt`):

```html
<img class="ph ph--3x2" src="images/my-project.jpg"
     alt="Brand identity project for Meridian" />
```

---

## Accessibility

- Sequential heading hierarchy (one `<h1>` per page)
- Descriptive `alt` / `aria-label` on every image placeholder and icon button
- Visible keyboard focus rings; full keyboard navigation; **Skip to content** link
- Dropdowns work on hover, focus and tap; `Esc` closes menus and the assistant
- Color is never the only signal; contrast meets WCAG AA
- Respects `prefers-reduced-motion`

---

© Ronnie Balonon — Dubai-based Graphic Designer · 0543763091 · ronniebalonon1996@gmail.com
