# Ten80Ten — Marketing Website

A fast, fully responsive, animated multi-page marketing site for **Ten80Ten** (*Systems + Specialists*). Static HTML/CSS/JS — no build step, no framework, hosts anywhere.

## Pages
| File | Purpose |
|------|---------|
| `index.html` | Home — hero, 10/80/10 framework, services, stats, comparison, testimonial |
| `services.html` | Services + the engagement ladder (Audit → Starter → Engine → Department) |
| `about.html` | Story, 10/80/10 philosophy, values, comparison |
| `pricing.html` | Four pricing tiers, Founding Client Program, FAQ |
| `contact.html` | Book-a-call (Calendly) + validated contact form |

```
ten80ten/
├── index.html  services.html  about.html  pricing.html  contact.html
├── assets/
│   ├── css/styles.css   # design system: tokens, components, motion
│   ├── js/main.js       # nav, reveals, counters, FAQ, form validation
│   └── img/
└── README.md
```

## Preview locally
Any static server works, e.g.:
```bash
npx serve .          # then open the printed URL
```

## Wire up before going live (2 things)

**1. Booking link** — replace the Calendly placeholder with your real URL.
Search for `calendly.com/ten80ten/audit` in `contact.html` and swap it.

**2. Contact form** — the form is fully validated client-side but the submit is a demo (no backend).
To make it send, point it at a form service like [Formspree](https://formspree.io):
- In `contact.html`, set `<form ... action="https://formspree.io/f/XXXX" method="POST">`
- In `assets/js/main.js`, in the `form[data-validate]` submit handler, replace the
  `setTimeout(...)` demo block with a real `fetch(form.action, { method:'POST', body:new FormData(form) })`
  and show `.form-success` on a successful response.

Update the email (`hello@ten80ten.com`) and social links (`#`) in the footer of each page.

## Design system (customize in `assets/css/styles.css`)
All theming is via CSS custom properties at the top (`:root`):
- **Color** — `--accent` (orange), `--bg` (calm warm white), `--ink` (text). Change `--accent` to re-skin the whole site.
- **Type** — Schibsted Grotesk (display) · Inter (body) · Instrument Serif (italic accents), loaded from Google Fonts with `font-display:swap`.
- **Radius / shadow / spacing / motion** tokens are all defined there too.

## Built-in quality
- **Responsive** mobile-first; tested at 375px and 1280px, no horizontal scroll.
- **Accessible** — semantic landmarks, labelled icon buttons, visible focus rings, 4.5:1 text contrast, keyboard-operable nav/FAQ/form.
- **Performant** — zero JS dependencies, animations use only `transform`/`opacity`, system visual reserves space (no layout shift).
- **`prefers-reduced-motion`** fully respected — all reveals, counters, marquee and float animations disable gracefully.

## Deploy
Drag the `ten80ten/` folder into Netlify Drop, or connect the repo to Vercel/Cloudflare Pages. No configuration needed.
