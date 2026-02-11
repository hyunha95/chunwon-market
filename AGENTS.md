# Repository Guidelines

## Project Structure & Module Organization
- `app/` uses the Next.js App Router; route segments live here (for example `app/(site)` and feature routes like `app/product`).
- `components/` holds shared UI and feature components, with primitives under `components/ui/`.
- `hooks/` contains reusable React hooks such as `use-mobile.tsx` and `use-toast.ts`.
- `lib/` stores helpers and data utilities (for example `lib/utils.ts`, `lib/dummy-data.ts`).
- `public/` is for static assets served at the site root.
- `styles/` and `app/globals.css` define global styles and Tailwind setup.

## Build, Test, and Development Commands
- `pnpm dev` starts the Next.js dev server with Turbo enabled (`next dev --turbo`).
- `pnpm build` creates a production build (`next build`).
- `pnpm start` runs the production server after a build.
- `pnpm lint` runs Next.js lint checks.

## Coding Style & Naming Conventions
- Use TypeScript and React function components; match existing file patterns (`.tsx` for UI, `.ts` for utilities).
- Prefer PascalCase for component filenames (for example `PromoGrid.tsx`) and `use-` prefixes for hooks.
- Keep styles in Tailwind utilities and `globals.css`; avoid inline styles unless necessary.
- No formatter is configured; follow existing formatting and run `pnpm lint` before PRs.

## Testing Guidelines
- No test framework is configured yet. If you introduce tests, add the framework setup and update this guide with the command (for example `pnpm test`).
- Keep test files co-located with features and use clear suffixes like `.test.tsx`.

## Commit & Pull Request Guidelines
- Commit messages are short, imperative, and lower-case (for example `add PromoGrid component` or `refactor PromoGrid layout`).
- PRs should include a brief summary, key UI screenshots for visual changes, and note any routing or data-shape changes.
- Link related issues when applicable.
