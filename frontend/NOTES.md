# NOTES.md – Phase 0 (Setup)

Decisions taken while setting up the project, as allowed by the guide
("pick the simplest option, write it in NOTES.md and continue").

1. **Tailwind CSS 3** installed (3.4.x) with `postcss` and `autoprefixer`,
   exactly as section 5 of the guide requires. Config lives in
   `tailwind.config.js` + `postcss.config.js` (not the Tailwind v4 CSS-first
   setup), because the guide specifies `content` paths, `darkMode: 'media'`
   and `theme.extend.colors` in JS.
2. **Color tokens** are stored as space-separated RGB channels in
   `src/index.css` (`:root` light, `@media (prefers-color-scheme: dark)` for
   dark) and exposed in `tailwind.config.js` as
   `rgb(var(--token) / <alpha-value>)`, so utilities like `bg-brand/10`
   work. `accent` (#f2b632), `error` (#d64545) and `footer` (#0f1f1a) are
   fixed hex values as defined in section 4.
3. **Radius shortcuts** added to the config to match section 4:
   `rounded-btn` (10px), `rounded-card` (16px), `rounded-panel` (20px),
   `rounded-pill` (99px).
4. **React 19** is already installed in this scaffold (the guide says
   React 18). Keeping the existing React version; no guide requirement
   depends on React 18 specifically.
5. **`src/App.css` removed** – the guide says `src/index.css` is the only
   CSS file. The default Vite demo markup was replaced with a small Phase 0
   check page (font, `bg-bg`, `text-ink`, `bg-brand`); it is replaced by the
   real layout shell in Phase 1.
6. `src/api` and `src/redux` contain only a `.gitkeep` file, per the guide.
7. Page title set to `দক্ষতা` and `lang="bn"` + Hind Siliguri Google Font
   added to `index.html`.
