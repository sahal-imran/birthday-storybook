# Birthday Storybook

A customizable, frontend-only birthday website built with Next.js App Router, React, TypeScript, CSS, and Framer Motion. Includes a password welcome, countdown, page-turning storybook, twelve surprise messages, interactive keepsakes, photo placeholders, a candle-blowing cake, a letter, music controls, and a constellation finale.

The template includes generic sample content. No personal photographs or raster images are bundled. Decorative placeholders use inline Lucide icons; optional local Lottie animations and synthesized audio are included.

## Local setup

Use Node.js 22 LTS and npm.

```sh
npm ci
npm run dev
```

Open http://localhost:3000 and enter **12345**. No environment variables, API keys, accounts, database, or backend services are required.

```sh
npm run typecheck
npm run build
npm start
```

`npm start` serves the production build. There is currently no configured lint command.

## Customize

Edit `data/birthday.ts`:

- `birthday.name` and `birthday.from`: recipient and sender displayed throughout the experience.
- `month`, `day`, `dateLabel`, and `edition`: numeric birthday, readable date, and welcome countdown year. Keep the label consistent with the numeric date; use a valid calendar date. The sample date is November 14, 2026.
- `welcome.password`: default `12345`; the gate requires this on every fresh visit, even after the birthday. Unlock state is not saved.
- `memories`, `reasons`, `gifts`, `littleWorld`, and `letterParagraphs`: replace sample chapters and messages in your own voice.
- `photos` and `galleryPhotos`: image paths, order, captions, alternative text, crop position, and optional `fit` (`cover` or `contain`).
- `music`: local audio path, title, and volume. Playback starts only through visitor interaction.

Empty image paths show labeled placeholders. To add optional photos, place files you own or have permission to use in `public/photos/` and set `src` to `/photos/filename.webp`. Describe each photo with useful `alt` text. Invalid image paths fall back to placeholders. Do not commit private photos to a public repository.

The annual countdown uses **Asia/Karachi (UTC+05:00)**. It celebrates throughout the configured birthday, then counts down to the next year. The welcome timer uses `edition` and stays in its ready state after that date; it never bypasses the password. To change timezone behavior, update `lib/birthday.ts`, including the UTC offset used to calculate midnight.

Global presentation is in `app/globals.css` and `app/mobile.css`. Change the browser title and description in `app/layout.tsx`. Search indexing is disabled by metadata and response headers; change both `app/layout.tsx` and `next.config.ts` if you want a public demo indexed.

## Deploy to Vercel

1. Create your own Git repository from this sanitized source and push it to your Git provider.
2. Import the repository into Vercel and choose the **Next.js** framework preset.
3. Use the project root, `npm ci` as the install command, and `npm run build` as the build command. Keep the default Next.js output setting.
4. Use Node.js 22.x. No environment variables are needed.
5. Deploy and test the welcome with `12345`, story navigation, cake button, letter, and music controls on the deployed URL.

Later pushes to the connected deployment branch trigger a new deployment. Other hosts that support Next.js can run `npm ci`, `npm run build`, and `npm start` with a supported Node.js runtime. This project does not currently configure static export.

## Access and privacy

The password is a playful browser-side gate, **not secure authentication**. It is visible in the source and built JavaScript; public assets are directly accessible. Search exclusion is not access control. Use hosting-level access protection if you need actual privacy.

Before publishing a customized copy, review messages, metadata, media, and repository history for personal information. Removing a file from the current source does not remove it from previous commits; publish this sanitized source in a fresh repository if the old history contains private material.

## Accessibility and checks

Keep interactive controls keyboard accessible, descriptive image alternatives, mobile layouts, and reduced-motion preferences intact. The site includes a manual motion toggle, separate audio control, modal focus handling, and image fallbacks.

For changes, run the type check and production build, then manually verify: correct/wrong passwords, empty password submission, story arrows and swipes, reason navigation, gifts and keepsakes, cake relighting, letter opening/closing with Escape, music, and reduced motion. Check narrow phone, tablet, and desktop layouts, and countdown behavior before/on/after the birthday.

## Contributing and license

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidance. Project code is available under the [MIT license](LICENSE). Third-party assets and dependencies retain their own licenses; see [ASSET_CREDITS.md](ASSET_CREDITS.md). Replace the optional media only with assets you have permission to redistribute.
