# Local Business Site Template — Deployment Checklist

Your repeatable system. Follow this top to bottom for every new client.
(This file is for YOU — it never affects the live site, but you can leave
it out of client deploys if you want.)

## 1. Customize (≈15 min)

- [ ] **config.js** — name, city, phone, email, address, Instagram,
      schemaType (`"BarberShop"`, `"NailSalon"`, `"Restaurant"`, etc.),
      seoDescription (one good sentence with the city in it)
- [ ] **style.css** — top CONFIG block only: swap `--color-accent` and
      `--color-bg` to fit the business (use their logo colors if they have one)
- [ ] **Favicon** — in each HTML file's `<head>`, the inline SVG icon:
      change the letter (`%3EB%3C` → their initial) and the fill color
- [ ] **OG tags** — in each HTML file's `<head>`, the LINK PREVIEW block:
      real name + description. After first deploy, uncomment og:image and
      point it at `https://THEIR-SITE-URL/hero.jpg`. This is what makes the
      link look good when you TEXT it to the owner — don't skip it.

## 2. Content

- [ ] **index.html** — hero one-liner, stats bar numbers (or delete the
      section), Our Story paragraph
- [ ] **services.html** — real services, prices, one-line descriptions
- [ ] **reviews.html** — replace placeholder quotes with their REAL Google
      reviews (with permission), fix the 4.8 / "XX reviews" numbers
- [ ] **contact.html** — hours table, cross-street note
- [ ] **FAQ** (reviews.html) — adjust answers to their actual policies

## 3. Photos

Rules that keep sites fast and clean:
- Square-ish crops, at least 800×800px
- **Compress everything** — under 300KB per photo (tinypng.com, free).
  Raw iPhone photos are 3–8MB and will make the site feel slow.
- Homepage strip: exactly 4 photos (2×2 on phones)
- Gallery: 8–12 photos, delete extra placeholder `<img>` lines
- Name files simply: `hero.jpg`, `gallery-1.jpg` … no spaces

## 4. Hero Video (shot on your phone — free)

The homepage plays a short clip of the shop behind the headline.
- **Shoot:** HORIZONTAL (landscape), 10–20 seconds, one slow steady move —
  e.g. slow walk through the door, or a slow pan across the chairs.
  Lights on, shop clean, best-looking moment of the day. No audio needed
  (it plays muted). 2–3 takes, pick the smoothest.
- **Compress — this is critical:** raw phone video is 50–200MB and will
  make the site unusably slow. Target UNDER 8MB. Free option:
  videosmaller.com or HandBrake (preset "Web → Vimeo YouTube 720p").
  720p is plenty for a background.
- **Save as `hero.mp4`** next to index.html. Done.
- No video? Delete nothing — if hero.mp4 is missing the site automatically
  shows the plain hero instead.

## 4b. 360 Tour (optional upsell — needs the 360 camera)

- tour.html + tour.jpg power the Virtual Tour page. With no camera yet,
  either leave the demo tour.jpg in place or remove the "Virtual Tour"
  link from the nav on every page.
- When you have a real 360 photo: compress under 1.5MB, save as
  **tour.jpg**, replacing the demo. tour.html picks it up automatically.

## 5. Deploy

- [ ] All files in ONE flat folder (no subfolders)
- [ ] Netlify → Deploys → drag the folder in
- [ ] Netlify auto-serves 404.html for bad URLs — nothing to configure

## 6. Test on YOUR PHONE before showing anyone

- [ ] Tap the sticky Call button → dialer opens with right number
- [ ] Get Directions → opens the right address in Google Maps
- [ ] Virtual Tour → drags smoothly, doesn't scroll the page
- [ ] Gallery → photos open in lightbox, close on tap
- [ ] Text yourself the link → preview card shows name + photo
- [ ] Every nav link works, no placeholder text left anywhere
      (search the folder for "XX", "Business Name", "Service One")

## Per-client file changes cheat sheet

| Always edit | Sometimes | Never touch |
|---|---|---|
| config.js | style.css colors | script.js |
| services.html | stats bar | (structure of) style.css |
| photos + tour.jpg | FAQ answers | |
| OG tags + favicon | | |
