# Domingo Ancog — Portfolio

A responsive developer portfolio with the original draggable 3D ID card, About Me, filterable Projects, Skills, and Contact sections. Built with Next.js, React, TypeScript, and React Three Fiber.

## Run locally

```bash
npm install
npm run dev
```

Open [localhost:3000](http://localhost:3000).

## Customize

- Edit `lib/portfolio.ts` for project descriptions and contact links.
- Edit `components/portfolio.tsx` for the introduction, About Me, and skills.
- Edit `styles/globals.css` for colors, spacing, and responsive styles.
- The original card, portrait, and lanyard remain in `components/band.tsx` and `public/assets/`.

The Forma and Orbit projects are clearly labeled illustrative UI concepts. Replace them with your own projects when ready.

The contact form submits directly to `https://staticsiteforms.co.uk/<profile.email>` using POST. It sends `name`, `_replyto` (the visitor's email), and `message`. The destination address is configured in `lib/portfolio.ts`; Static Site Forms handles the response and email delivery. Social profile links are configured in the same file.

The 3D scene loads separately from the page and pauses when offscreen. A static card appears for reduced motion preferences or when WebGL is unavailable. Its font is served locally.

## Production

```bash
npm run build
npm run start
```

## Credits

The 3D badge is based on [Building an interactive 3D event badge with React Three Fiber](https://vercel.com/blog/building-an-interactive-3d-event-badge-with-react-three-fiber). Inter is distributed under the SIL Open Font License, included in `public/assets/fonts/OFL.txt`.
