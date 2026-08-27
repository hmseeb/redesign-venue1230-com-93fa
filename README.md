# Venue 1230 — Website Redesign

A completely rebuilt, modern marketing site for **Venue 1230**, a wedding, trade show and
corporate event venue in Hastings, Michigan.

## Stack

Vanilla HTML, CSS and JavaScript — no build step, no dependencies, no environment variables.

| File | Purpose |
| --- | --- |
| `index.html` | Entry point — full single-page site with semantic sections and JSON-LD structured data |
| `styles.css` | Design system (tokens, type scale, components) and responsive layout |
| `script.js` | Mobile nav, sticky header, scroll reveal, gallery lightbox, reviews carousel |
| `favicon.svg` | Favicon |

## Running locally

Open `index.html` directly in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

Then visit <http://localhost:8000>.

## Sections

Hero · Stats · The Venue (pillars + facility grid) · In-House Services · Gallery (lightbox) ·
Video Tours & Team · Reviews (carousel) · Owner · CTA band · Contact · Footer

## Business details

- **Phone:** (616) 291-7488
- **Address:** 1230 N. Michigan Ave, Hastings, MI 49058
- **Capacity:** 500+ seated guests
- **Services:** in-house catering, ceremony garden, DJ services, bar service, wedding
  coordination, lodging referrals, corporate & trade show hosting

## Images

Authentic photography from the original Venue 1230 site is reused throughout (facility,
gardens, team video thumbnails, client review avatars, owner portrait, logos). Sections
with no authentic photo available — catering, DJ, bar, coordination, lodging and
corporate/trade show cards — use contextually matched Pexels photography.
