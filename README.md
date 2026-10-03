# Novera: Lightweight Jacket product page

Built from a Dribbble concept by [Designer] ([link]), used as a design brief. The design is theirs; the build, responsive behaviour and mobile layout are mine.

**Live:** [link to deployed site]

## Design vs build

| Dribbble concept                    | This build                  |
| ----------------------------------- | --------------------------- |
| ![Original design](docs/design.png) | ![My build](docs/build.png) |

<!-- Replace the placeholders above with screenshots once the page is built. -->

## Build notes

- **Stack:** Next.js (App Router), TypeScript, SCSS with strict BEM, sass-mq.
- **Styling approach:** [Notes on BEM structure, tokens and mobile-first layout]
- **Responsive behaviour:** [How the layout adapts from mobile to desktop]
- **Data:** Product data is served from `/api/product` ([notes on stock and variant handling]).
- **Accessibility:** [Notes]
- **Testing:** Jest and React Testing Library. [Notes]
- **What I would do next:** [Notes]

## Run it

Requires Node.js LTS.

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

| Script                | What it does                    |
| --------------------- | ------------------------------- |
| `npm run dev`         | Start the dev server            |
| `npm run build`       | Production build                |
| `npm run lint`        | ESLint                          |
| `npm run lint:styles` | Stylelint (SCSS and BEM naming) |
| `npm run format`      | Format everything with Prettier |
| `npm test`            | Run the Jest test suite         |
