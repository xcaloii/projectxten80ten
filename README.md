# Ten80Ten — Marketing Website

A fast, fully responsive, animated multi-page marketing site for **Ten80Ten** (*Systems + Specialists*).
Every page is a **single self-contained `.html` file** — all CSS, JS, and the logo mark are inlined.
**No build step, no framework, no dependencies.** Drop a file on any host, or open it by double-click.

> Visual direction: calm warm-white "AI/automation agency" aesthetic with elevated, lightweight motion and a deep-orange accent. Inspired by the Automora template, sourced from the Ten80Ten marketing bible.

## Pages
| File | Purpose |
|------|---------|
| `index.html` | Home — hero + live-automation mock, the problem, Systems + Specialists model, 10/80/10 framework, offer-ladder bento, stats, testimonial, CTA |
| `services.html` | What we install, the Car/Engine/Driver model, the engagement ladder, 10/80/10 timeline, what gets handled |
| `pricing.html` | VA retainers + custom platform tiers, Founding Client Program, FAQ accordion |
| `about.html` | Belief & story, the 10/80/10 method (`#framework`), differentiators, who we serve |
| `contact.html` | Book-a-call (Calendly placeholder) + validated contact form with success state |

```
ten80ten/
├── index.html  services.html  pricing.html  about.html  contact.html   ← self-contained
├── assets/
│   └── img/                    # brand logos + og-image.png (social share card)
└── README.md
```

Each HTML file inlines its own `<style>`, `<script>`, and the SVG hourglass mark, so it renders standalone.
The only external requests are Google Fonts (needs internet) and the `og:image` (used by social crawlers).

> **Editing tip:** because each page is self-contained, the design system CSS lives inside a `<style>` block
> near the top of every page. To restyle globally, edit the `:root` tokens in each file — or keep the
> maintainable **shared-assets** version from git history (`git checkout redesign/automora-style~1 -- assets`)
> if you'd prefer to edit one `styles.css`/`app.js` and re-inline.

## Wire up before going live (2 things)

**1. Booking link** — replace the Calendly placeholder with your real URL.
In `contact.html`, search for `calendly.com/ten80ten/audit` and swap it. To embed an inline calendar,
drop your Calendly/Cal.com embed into the `.booking-embed` container (replace the `.booking-placeholder` block).

**2. Contact form** — fully validated client-side; the submit is a demo (no backend).
To make it send, point it at a form service like [Formspree](https://formspree.io):
- In `contact.html`, set `<form ... action="https://formspree.io/f/XXXX" method="POST">`
- In the inlined `<script>` (the `contactForm()` function), replace the `setTimeout(...)` demo block with
  `fetch(form.action, { method:'POST', body:new FormData(form), headers:{Accept:'application/json'} })`
  and show `.form-success` on a successful response.

Also update the email (`hello@ten80ten.com`) and social links (`#`) in each page footer.

## Design system
All theming is via CSS custom properties in each page's `:root` block:
- **Color** — `--accent` (`#EA5518` deep orange), `--bg` (`#FAFAF7` calm warm white), `--ink` (text). Change `--accent` to re-skin.
- **Type** — Plus Jakarta Sans (display) · Inter (body) · JetBrains Mono (labels/numbers), via Google Fonts with `font-display:swap`.
- **Radius / shadow / spacing / motion** tokens are all defined there too.
- **Brand mark** — a clean vector rebuild of the hourglass logo (inlined + `assets/img/ten80ten-mark.svg`); swap the gradient stops to retune.

## Built-in quality
- **Responsive** mobile-first; verified at 375px and 1280px+, no horizontal scroll.
- **Accessible** — semantic landmarks, labelled icon buttons, visible focus rings, ≥4.5:1 text contrast, keyboard-operable nav/FAQ/form, `aria-live` on form success.
- **Performant** — zero JS dependencies; animations use only `transform`/`opacity`; reveals via `IntersectionObserver`; space reserved (no layout shift).
- **`prefers-reduced-motion`** fully respected — reveals, counters, marquee, parallax and float all disable gracefully.

## Deploy
Drag the `ten80ten/` folder into Netlify Drop, or connect the repo to Vercel/Cloudflare Pages/GitHub Pages. No configuration needed.
