# Ten80Ten — Marketing Website

A fast, fully responsive, animated multi-page marketing site for **Ten80Ten** (*Systems + Specialists*).
Static HTML/CSS/JS — **no build step, no framework, no dependencies** — hosts anywhere.

> Visual direction: calm warm-white "AI/automation agency" aesthetic with elevated, lightweight motion and an orange accent. Inspired by the Automora template, sourced from the Ten80Ten marketing bible.

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
├── index.html  services.html  pricing.html  about.html  contact.html
├── assets/
│   ├── styles.css          # design system: tokens, components, motion
│   ├── app.js              # nav, reveals, counters, FAQ, magnetic btns, parallax, form
│   └── img/
│       └── ten80ten-mark.svg   # crisp SVG hourglass mark (orange→gold)
└── README.md
```

> **Note on the previous build:** the earlier "editorial" design is preserved in git history. Its old files
> (`assets/css/styles.css`, `assets/js/main.js`, and `platform.html`) remain in the folder but are **not used**
> by the five pages above. Delete them once you're happy with the redesign, or `git checkout` to compare.

## Preview locally
Any static server works:
```bash
npx serve .          # then open the printed URL (this repo ships a launch config on :4321)
```

## Wire up before going live (2 things)

**1. Booking link** — replace the Calendly placeholder with your real URL.
In `contact.html`, search for `calendly.com/ten80ten/audit` and swap it. To embed an inline calendar,
drop your Calendly/Cal.com embed into the `.booking-embed` container (replace the `.booking-placeholder` block).

**2. Contact form** — fully validated client-side; the submit is a demo (no backend).
To make it send, point it at a form service like [Formspree](https://formspree.io):
- In `contact.html`, set `<form ... action="https://formspree.io/f/XXXX" method="POST">`
- In `assets/app.js`, inside the `contactForm()` submit handler, replace the `setTimeout(...)` demo
  block with `fetch(form.action, { method:'POST', body:new FormData(form), headers:{Accept:'application/json'} })`
  and show `.form-success` on a successful response.

Also update the email (`hello@ten80ten.com`) and social links (`#`) in each page footer.

## Design system (customize in `assets/styles.css`)
All theming is via CSS custom properties at the top (`:root`):
- **Color** — `--accent` (`#FF5A1F` orange), `--bg` (`#FAFAF7` calm warm white), `--ink` (text). Change `--accent` to re-skin the site.
- **Type** — Plus Jakarta Sans (display) · Inter (body) · JetBrains Mono (labels/numbers), via Google Fonts with `font-display:swap`.
- **Radius / shadow / spacing / motion** tokens are all defined there too.
- **Brand mark** — `assets/img/ten80ten-mark.svg` is a clean vector rebuild of the hourglass logo; swap the gradient stops to retune.

## Built-in quality
- **Responsive** mobile-first; verified at 375px and 1280px+, no horizontal scroll.
- **Accessible** — semantic landmarks, labelled icon buttons, visible focus rings, ≥4.5:1 text contrast, keyboard-operable nav/FAQ/form, `aria-live` on form success.
- **Performant** — zero JS dependencies; animations use only `transform`/`opacity`; reveals via `IntersectionObserver`; images/space reserved (no layout shift).
- **`prefers-reduced-motion`** fully respected — reveals, counters, marquee, parallax and float all disable gracefully.

## Deploy
Drag the `ten80ten/` folder into Netlify Drop, or connect the repo to Vercel/Cloudflare Pages/GitHub Pages. No configuration needed.
