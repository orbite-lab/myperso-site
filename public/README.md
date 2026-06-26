# public/

Static assets served from the site root.

## CV / Resume

The **Download CV** button on the home page links to `/cv.pdf`.
Drop your resume here as `cv.pdf` (or change `cvHref` in
`src/content/profile.ts` to whatever filename you use).

## Portrait

The home page portrait frame loads `/avatar.jpg`. Drop a square-ish
headshot here as `avatar.jpg` and it appears inside the hex bio-frame.
Until then it shows an "RB" monogram fallback. To change the path/initials,
edit `AvatarFrame` usage in `src/components/ProfileHero.tsx`.

## Entry covers

Entries with no `image` get unique generated "bio-scan" art (deterministic
per slug). To use a real image, set `image: "/your-file.png"` on the entry
and drop the file here.
