# Asset sources

## Hero portrait
`public/images/ali-khan-hero.png` is Ali Khan's own uploaded image, copied byte-for-byte (not edited or regenerated).
Next.js resizes and converts it for each screen at request time.

## Social sharing image
`public/og-image.png` (1200×630) combines the hero portrait (scaled only) with the site name and role.

## Photos (illustrative, replaceable)
Stock photos from Unsplash (free to use under https://unsplash.com/license). They are placeholders and do
**not** show Ali Khan's real projects, clients, workspace or equipment. Saved at 2400px wide as WebP in
`public/images/photos/`; Next.js serves smaller sizes automatically.

| File | Shows | Unsplash photo ID |
| --- | --- | --- |
| service-websites | Two developers working at computers in a bright office | photo-1551434678-e076c223a692 |
| service-frontend | A website design on a monitor, tablet and phone | photo-1547658719-da2b51169166 |
| service-optimization | Laptop showing an analytics dashboard | photo-1504868584819-f8e8b4b6d7e3 |
| process-discover | User-flow diagram on a wall | photo-1531403009284-440f080d1e12 |
| process-plan | Hand-drawn wireframes | photo-1522542550221-31fd19575a2d |
| process-develop | Laptop with code beside a plant | photo-1587620962725-abab7fe55159 |
| process-launch | Phone home screen with apps | photo-1512941937669-90a1b58e7e9c |

Full URL pattern: `https://images.unsplash.com/<photo ID>`

## Fonts (in `app/fonts/`, loaded with `next/font/local`)
- `anton-latin.woff2` — Anton (SIL Open Font License, see `anton-OFL.txt`)
- `dm-sans-latin.woff2` — DM Sans, variable 400–700 (SIL Open Font License, see `dm-sans-OFL.txt`)

## Founder photo
`public/images/ali-khan-founder.jpg` is Ali Khan's own photo (shown in About Me), copied unchanged.

## Client work (real projects, from brandox.digital)
| File | Shows |
| --- | --- |
| work/visa-consultancy-full-page.webp | Full home page of visa-consultancy.com |
| work/zindabad-electronics-full-page.webp | Full home page of zindabadelectronics.com |
| work/brandox-digital.png | Brandox Digital home page (screenshot) |
| work/brandox-logo.svg | Brandox Digital logo |

## Google Search Console
`public/google4b057c22fdaaadd4.html` is the ownership-verification file, kept exactly as downloaded. Do not edit or delete it.
