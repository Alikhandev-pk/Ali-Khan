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
| project-portfolio | Monitor showing web design work | photo-1559028012-481c04fa702d |
| project-business | Laptop with code on a white desk | photo-1498050108023-c5249f4df085 |
| project-dashboard | Laptop with a charts dashboard | photo-1460925895917-afdab827c52f |
| project-store | "Open" shop sign | photo-1472851294608-062f824d29cc |
| project-webapp | Hand holding a phone with an app | photo-1551650975-87deedd944c3 |
| process-discover | User-flow diagram on a wall | photo-1531403009284-440f080d1e12 |
| process-plan | Hand-drawn wireframes | photo-1522542550221-31fd19575a2d |
| process-develop | Laptop with code beside a plant | photo-1587620962725-abab7fe55159 |
| process-launch | Phone home screen with apps | photo-1512941937669-90a1b58e7e9c |
| workspace-bright | Window-side office desk | photo-1497215728101-856f4ea42174 |
| workspace-minimal | Minimal laptop on a wood desk | photo-1496181133206-80ce9b88a853 |
| workspace-monitor | Laptop and monitor by a window | photo-1593642632559-0c6d3fc62b89 |
| workspace-code | Laptop showing code in a dark room | photo-1555066931-4365d14bab8c |
| workspace-evening | Warm desk with a lamp | photo-1593062096033-9a26b09da705 |

Full URL pattern: `https://images.unsplash.com/<photo ID>`

## Fonts (in `app/fonts/`, loaded with `next/font/local`)
- `anton-latin.woff2` — Anton (SIL Open Font License, see `anton-OFL.txt`)
- `dm-sans-latin.woff2` — DM Sans, variable 400–700 (SIL Open Font License, see `dm-sans-OFL.txt`)
