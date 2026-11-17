# Contributor guidance

This is a reusable frontend-only birthday storybook built with Next.js App Router and TypeScript.

- Keep sample content generic. Never commit personal photographs, private messages, credentials, or identifying details.
- Personalization belongs in `data/birthday.ts`; use empty photo paths for the public template.
- Preserve keyboard accessibility, responsive layouts, reduced-motion support, and the password form.
- The browser-side password is a playful gate, not secure authentication.
- Keep dependencies and third-party assets minimal and document licenses.
- Run `npm run typecheck` and `npm run build` before submitting changes.
