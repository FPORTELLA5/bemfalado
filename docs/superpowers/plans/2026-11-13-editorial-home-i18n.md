# Editorial Home and Trilingual UI Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the BemFalado Angular home with the approved editorial layout and provide the complete home shell in Portuguese, English, and Spanish.

**Architecture:** Keep global theme tokens and primitives in `styles.scss`, move component-owned layout rules out of the oversized global shell stylesheet, and introduce one singleton `LanguageService` backed by typed translation catalogs. Components consume a reactive catalog signal, so changing language updates visible copy immediately without reloading; the selected locale is stored in `localStorage` and reflected in `<html lang>`.

**Tech Stack:** Angular 22 standalone components, TypeScript 6 strict mode, Angular signals, SCSS, Node validation scripts.

**Spec:** `docs/superpowers/specs/2026-11-13-editorial-home-design.md`

## Global Constraints

- Start from `design/petroleo-e-nevoa` on a new working branch; preserve its three design commits.
- Bring the official dark-logo correction from `main` into the working branch without replacing the design work.
- Do not modify `main` during implementation.
- Keep Angular 22, TypeScript 6 strict mode, and the existing standalone-component architecture.
- No `any` or `$any()`; `npm run check:no-any` must stay green.
- Supported locales are exactly `pt-BR`, `en`, and `es`; `pt-BR` is the fallback.
- Persist the locale under `bemfalado-locale`; preserve the existing theme key `bemfalado-theme`.
- Keep Petróleo e névoa as the semantic palette and retain the approved navy/orange logo colors in dark mode.
- Home data remains explicitly fictional.
- Do not add backend, real authentication, persistence beyond browser preferences, or social login.
- Preserve keyboard navigation, visible focus, `prefers-reduced-motion`, and responsive behavior from 320 px upward.

## Review Focus

- Missing, invalid, or obsolete `bemfalado-locale` values must fall back to a supported browser locale or `pt-BR`, never break startup.
- Catalog drift across `pt-BR`, `en`, and `es` must fail validation before build.
- Switching locale while a search validation message is visible must translate that message immediately.
- Long English and Spanish labels must not overflow the header, category filters, cards, or mobile controls.
- Dark/system theme plus any locale must keep the official logo visible without a white box and maintain keyboard focus contrast.

---

### Task 1: Create the isolated implementation branch and localization contract

**Files:**
- Create: `frontend/src/app/core/i18n/language.type.ts`
- Create: `frontend/src/app/core/i18n/translation-catalog.model.ts`
- Create: `frontend/src/app/core/i18n/locales/pt-BR.json`
- Create: `frontend/src/app/core/i18n/locales/en.json`
- Create: `frontend/src/app/core/i18n/locales/es.json`
- Create: `frontend/scripts/check-i18n.mjs`
- Modify: `frontend/package.json`
- Modify: `frontend/tsconfig.json`
- Copy from `main` when different: `frontend/src/assets/branding/logo-bemfalado-dark.png`

**Interfaces:**
- Produces: `SUPPORTED_LOCALES: readonly ['pt-BR', 'en', 'es']`
- Produces: `SupportedLocale = 'pt-BR' | 'en' | 'es'`
- Produces: `TranslationCatalog` with typed `shell`, `home`, and `footer` sections.
- Produces: JSON catalogs with identical non-empty leaf paths.

- [ ] **Step 1: Create a working branch from the current `design/petroleo-e-nevoa` head**

Use a branch such as `design/editorial-home-i18n`. Verify the starting commit contains `docs/superpowers/specs/2026-11-13-editorial-home-design.md`.

- [ ] **Step 2: Write the failing catalog parity check**

Create `frontend/scripts/check-i18n.mjs` to recursively collect leaf paths from the three JSON files and fail when a key is missing, an extra key exists, a translated string is blank, or a locale file is not an object.

Expected failure before catalogs exist: a clear missing-file or missing-catalog error with exit code 1.

- [ ] **Step 3: Run the check and verify it fails**

Run: `cd frontend && node scripts/check-i18n.mjs`  
Expected: FAIL because the locale catalogs have not been created.

- [ ] **Step 4: Define the exact locale and catalog types**

In `language.type.ts`, export `SUPPORTED_LOCALES`, `SupportedLocale`, and `LOCALE_STORAGE_KEY = 'bemfalado-locale'`.

In `translation-catalog.model.ts`, define readonly nested interfaces for:
- shell navigation, theme labels, locale labels, account actions, mobile menu labels;
- hero copy, search labels/placeholders/statuses;
- category filters;
- featured section headings, card labels, disclaimer, and three fictional card records;
- how-it-works and final CTA;
- footer headings, links, legal line, and closing message.

- [ ] **Step 5: Add complete Portuguese, English, and Spanish catalogs**

Use `pt-BR.json` as the canonical key shape. Translate every visible shell and home string, including accessible names, placeholders, feedback, filters, fictional card descriptions, disclaimers, and footer copy. Keep business IDs and route fragments locale-independent.

- [ ] **Step 6: Wire the catalog check into validation**

Add `"check:i18n": "node scripts/check-i18n.mjs"` and change `validate` to run `check:no-any`, `check:i18n`, then `build`. Enable `resolveJsonModule` in `tsconfig.json`.

- [ ] **Step 7: Run the checks**

Run: `cd frontend && npm run check:i18n && npm run check:no-any`  
Expected: both commands PASS; the i18n check reports matching, non-empty catalogs.

- [ ] **Step 8: Commit**

```bash
git add frontend/package.json frontend/tsconfig.json frontend/scripts/check-i18n.mjs frontend/src/app/core/i18n frontend/src/assets/branding/logo-bemfalado-dark.png
git commit -m "feat: add typed trilingual copy catalogs"
```

### Task 2: Implement reactive locale selection and localize the app shell

**Files:**
- Create: `frontend/src/app/core/i18n/language.service.ts`
- Create: `frontend/scripts/check-locale-resolution.mjs`
- Modify: `frontend/src/app/app.component.ts`
- Modify: `frontend/src/app/app.component.html`
- Modify: `frontend/src/app/features/home/header/header.component.ts`
- Modify: `frontend/src/app/features/home/header/header.component.html`
- Modify: `frontend/src/app/features/home/footer/footer.component.ts`
- Modify: `frontend/src/app/features/home/footer/footer.component.html`
- Modify: `frontend/src/index.html`
- Modify: `frontend/package.json`

**Interfaces:**
- Consumes: `SupportedLocale`, `LOCALE_STORAGE_KEY`, and `TranslationCatalog` from Task 1.
- Produces: `resolveInitialLocale(savedLocale: string | null, browserLanguage: string): SupportedLocale`.
- Produces: singleton `LanguageService` with `currentLocale: Signal<SupportedLocale>`, `copy: Signal<TranslationCatalog>`, and `setLocale(locale: SupportedLocale): void`.

- [ ] **Step 1: Write the failing locale-resolution check**

Create `check-locale-resolution.mjs` with assertions for:
- saved `en` wins over browser `es-MX`;
- saved `es` wins over browser `en-US`;
- invalid saved value plus `en-US` resolves to `en`;
- missing saved value plus `es-MX` resolves to `es`;
- missing/invalid values plus `fr-FR` resolve to `pt-BR`.

Expected failure: resolver module or export does not exist.

- [ ] **Step 2: Run the check and verify it fails**

Run: `cd frontend && node scripts/check-locale-resolution.mjs`  
Expected: FAIL because locale resolution is not implemented.

- [ ] **Step 3: Implement the locale service**

Implement the resolver as a pure exported function and the service as `providedIn: 'root'`. The constructor must read `localStorage` safely, inspect `navigator.language`, set the signal, update `document.documentElement.lang`, and persist later changes. Import the three JSON catalogs into a `Readonly<Record<SupportedLocale, TranslationCatalog>>`.

- [ ] **Step 4: Make the resolver check pass and add it to validation**

Run: `cd frontend && node scripts/check-locale-resolution.mjs`  
Expected: PASS for all five cases.

Add `check:locale` to `package.json` and include it before `build` in `validate`.

- [ ] **Step 5: Localize header, footer, and mobile CTA**

Inject `LanguageService` into the shell components. Add one accessible language selector to desktop and mobile controls, with options Português, English, Español. Replace visible strings and ARIA labels with catalog values. Keep locale codes as option values.

- [ ] **Step 6: Verify document language and persistence manually**

In the browser:
1. Choose English; verify `<html lang="en">` and `localStorage['bemfalado-locale'] === 'en'`.
2. Reload; verify English remains selected.
3. Repeat for Spanish.
4. Delete the key and emulate an unsupported browser language; verify Portuguese fallback.

- [ ] **Step 7: Run validation**

Run: `cd frontend && npm run validate`  
Expected: PASS with no `any`, catalog drift, locale-resolution, or build errors.

- [ ] **Step 8: Commit**

```bash
git add frontend/package.json frontend/scripts/check-locale-resolution.mjs frontend/src/app/core/i18n frontend/src/app/app.component.* frontend/src/app/features/home/header frontend/src/app/features/home/footer frontend/src/index.html
git commit -m "feat: add persistent language switching"
```

### Task 3: Rebuild the editorial hero and translated search flow

**Files:**
- Create: `frontend/src/assets/home/hero-experience.webp`
- Create: `frontend/src/app/features/home/hero-search/hero-search.component.scss`
- Modify: `frontend/src/app/features/home/hero-search/hero-search.component.ts`
- Modify: `frontend/src/app/features/home/hero-search/hero-search.component.html`
- Modify: `frontend/src/app/features/home/home-page/home-page.component.ts`

**Interfaces:**
- Consumes: `LanguageService.copy` from Task 2.
- Produces: `SearchFeedbackState = 'idle' | 'required' | 'loading'`.
- Preserves: `searchRequested: OutputEmitterRef<SearchCriteria>`.

- [ ] **Step 1: Add a failing static check for hard-coded hero copy**

Extend `check-i18n.mjs` to scan the hero template and fail if the approved Portuguese, English, or Spanish hero/search phrases appear directly in HTML or TypeScript.

Run: `cd frontend && npm run check:i18n`  
Expected: FAIL because the current hero contains Portuguese strings.

- [ ] **Step 2: Replace text feedback with a locale-neutral state**

Store only `SearchFeedbackState` in the component. Derive the visible message from the current catalog so an open validation or loading message changes immediately when the locale changes.

- [ ] **Step 3: Build the approved hero structure**

Implement:
- short eyebrow;
- editorial headline and description;
- search as the primary action;
- large experience photograph on the right;
- localized praise caption over the image;
- one-column stacking on mobile.

Use native labels, localized accessible names, `aria-live="polite"`, and no decorative content in the accessibility tree.

- [ ] **Step 4: Make the hard-coded-copy check pass**

Run: `cd frontend && npm run check:i18n`  
Expected: PASS; hero copy comes only from the active catalog.

- [ ] **Step 5: Verify search behavior**

Test empty submit in all three locales and verify the translated required message. Enter a term and location, submit, and verify navigation still produces `/buscar?q=...&location=...`.

- [ ] **Step 6: Verify responsive and theme states**

Check 1440 px, 1024 px, 768 px, 390 px, and 320 px widths in light and dark themes. Confirm the photograph does not create horizontal scroll, the caption remains readable, and keyboard focus is visible.

- [ ] **Step 7: Run validation and commit**

Run: `cd frontend && npm run validate`  
Expected: PASS.

```bash
git add frontend/src/assets/home frontend/src/app/features/home/hero-search frontend/src/app/features/home/home-page/home-page.component.ts frontend/scripts/check-i18n.mjs
git commit -m "feat: rebuild localized editorial hero"
```

### Task 4: Build “Lugares bem falados” filters and photographic cards

**Files:**
- Create: `frontend/src/assets/home/business-cafe.webp`
- Create: `frontend/src/assets/home/business-wellness.webp`
- Create: `frontend/src/assets/home/business-restaurant.webp`
- Create: `frontend/src/app/features/home/featured-places/featured-places.component.ts`
- Create: `frontend/src/app/features/home/featured-places/featured-places.component.html`
- Create: `frontend/src/app/features/home/featured-places/featured-places.component.scss`
- Modify: `frontend/src/app/features/home/home-page/home-page.component.ts`
- Modify: `frontend/src/app/features/home/home-page/home-page.component.html`
- Modify: `frontend/src/app/features/home/category-grid/category-grid.component.ts`
- Modify: `frontend/src/app/features/home/category-grid/category-grid.component.html`

**Interfaces:**
- Consumes: localized featured-card records and filter labels from `TranslationCatalog.home`.
- Produces: `FeaturedFilterId = 'all' | 'cafes' | 'restaurants' | 'wellness'`.
- Produces: `filterSelected: OutputEmitterRef<FeaturedFilterId>` only if routing/filter ownership remains in the parent; otherwise keep filtering internal and expose no output.
- Preserves: category navigation using locale-independent category query values.

- [ ] **Step 1: Add failing catalog assertions for cards and filters**

Extend `check-i18n.mjs` to require the same filter IDs and fictional business IDs in every locale and to require translated `name`, `category`, `location`, `description`, and image alt text.

Run: `cd frontend && npm run check:i18n`  
Expected: FAIL until all locale records and IDs match.

- [ ] **Step 2: Implement stable filter/category IDs**

Do not send translated display labels as query parameters. Add stable IDs to category/filter models and map IDs to localized labels from the active catalog.

- [ ] **Step 3: Implement the featured places component**

Render:
- heading and localized location;
- compact filter controls with current state exposed by `aria-pressed`;
- three photographic cards with localized copy;
- favorite button with a localized accessible name;
- praise/recognition indicators;
- explicit fictional-data disclaimer.

- [ ] **Step 4: Replace the old home featured grid**

Import `FeaturedPlacesComponent` into `HomePageComponent`, remove the old initials-based cards, and preserve business profile routes `/negocio/:id`.

- [ ] **Step 5: Make catalog checks pass**

Run: `cd frontend && npm run check:i18n`  
Expected: PASS with matching stable IDs and complete translations.

- [ ] **Step 6: Verify interaction and overflow**

In all locales:
- activate each filter by mouse and keyboard;
- verify `aria-pressed`;
- open each business card;
- verify favorite buttons do not trigger card navigation;
- check 320 px and 390 px for label/card overflow.

- [ ] **Step 7: Run validation and commit**

Run: `cd frontend && npm run validate`  
Expected: PASS.

```bash
git add frontend/src/assets/home frontend/src/app/features/home/featured-places frontend/src/app/features/home/home-page frontend/src/app/features/home/category-grid frontend/scripts/check-i18n.mjs
git commit -m "feat: add localized featured places"
```

### Task 5: Localize and compact the supporting home sections

**Files:**
- Create: `frontend/src/app/features/home/how-it-works/how-it-works.component.scss`
- Create: `frontend/src/app/features/home/community-cta/community-cta.component.scss`
- Modify: `frontend/src/app/features/home/how-it-works/how-it-works.component.ts`
- Modify: `frontend/src/app/features/home/how-it-works/how-it-works.component.html`
- Modify: `frontend/src/app/features/home/community-cta/community-cta.component.ts`
- Modify: `frontend/src/app/features/home/community-cta/community-cta.component.html`
- Modify: `frontend/src/app/features/home/category-grid/category-grid.component.scss`
- Modify: `frontend/src/app/features/home/home-page/home-page.component.scss`

**Interfaces:**
- Consumes: translated `home.howItWorks` and `home.communityCta` catalog sections.
- Produces no new cross-task API.

- [ ] **Step 1: Add failing hard-coded-copy checks**

Extend `check-i18n.mjs` to scan the category, how-it-works, CTA, home, header, and footer templates for known hard-coded user-facing phrases.

Run: `cd frontend && npm run check:i18n`  
Expected: FAIL on current Portuguese copy.

- [ ] **Step 2: Move supporting copy to the catalogs**

Inject `LanguageService` into each component and bind headings, steps, button copy, link text, accessible names, and disclaimer from the active catalog.

- [ ] **Step 3: Compact the supporting layout**

Keep “Como funciona” to three concise steps, remove repeated explanatory content, and keep one final praise CTA. Use component-owned SCSS and ensure sections follow the hero/card spacing rhythm.

- [ ] **Step 4: Make the copy check pass**

Run: `cd frontend && npm run check:i18n`  
Expected: PASS for all home and shell templates.

- [ ] **Step 5: Verify locale switching mid-page**

Scroll below the fold, switch language through keyboard navigation, and verify supporting sections and footer update without a reload or scroll jump.

- [ ] **Step 6: Run validation and commit**

Run: `cd frontend && npm run validate`  
Expected: PASS.

```bash
git add frontend/src/app/features/home frontend/scripts/check-i18n.mjs
git commit -m "feat: localize compact home sections"
```

### Task 6: Consolidate the visual system and complete regression QA

**Files:**
- Modify: `frontend/src/styles.scss`
- Modify: `frontend/src/app/app.component.scss`
- Create or modify: `frontend/src/app/features/home/header/header.component.scss`
- Create or modify: `frontend/src/app/features/home/footer/footer.component.scss`
- Modify: all new home component SCSS files from Tasks 3–5
- Modify: `frontend/angular.json` only if style budgets must be rebalanced after styles are split; do not raise budgets to hide regressions.

**Interfaces:**
- Consumes all component class names from Tasks 2–5.
- Produces semantic theme tokens used by the home and shell.

- [ ] **Step 1: Capture the current validation result**

Run: `cd frontend && npm run validate`  
Expected: PASS or only the already-known component-style budget warnings; record exact output.

- [ ] **Step 2: Remove conflicting legacy home/shell rules**

Keep resets, semantic tokens, shared focus styles, container, typography primitives, and reusable buttons in `styles.scss`. Keep only app-shell/mobile-global rules in `app.component.scss`. Move header, footer, and home layout styles into their owning component SCSS files. Remove duplicate selectors rather than overriding them later in the cascade.

- [ ] **Step 3: Verify logo behavior**

Check light, dark, and system themes at desktop and mobile widths. The official logo must have no white box; navy/orange brand colors must remain recognizable in dark mode.

- [ ] **Step 4: Run accessibility and interaction regression**

Verify:
- keyboard order through logo, navigation, language, theme, CTA, search, filters, cards, and footer;
- mobile menu opens/closes and reports `aria-expanded`;
- focus is never hidden by the sticky header;
- reduced motion disables non-essential transitions;
- no horizontal scrolling at 320 px;
- English and Spanish labels do not clip.

- [ ] **Step 5: Run route regression**

Open `/`, `/buscar`, `/negocio/mock-001`, `/compartilhar`, `/entrar`, and `/criar-conta`. Confirm shell localization does not break existing page content or navigation.

- [ ] **Step 6: Run final automated validation**

Run: `cd frontend && npm run validate`  
Expected: PASS with:
- no `any`;
- no catalog mismatch or hard-coded home/shell copy;
- locale-resolution checks passing;
- production build passing;
- no new style-budget errors.

- [ ] **Step 7: Inspect browser console**

Expected: no runtime exceptions, missing assets, template errors, or accessibility-related warnings during the home flow in all three locales.

- [ ] **Step 8: Commit**

```bash
git add frontend/src/styles.scss frontend/src/app/app.component.scss frontend/src/app/features/home frontend/angular.json
git commit -m "refactor: consolidate editorial home styles"
```

### Task 7: Prepare the review handoff

**Files:**
- Modify: `docs/superpowers/specs/2026-11-13-editorial-home-design.md` only to mark implementation status and link the implementation branch/commit.
- Create: `docs/superpowers/reviews/2026-11-13-editorial-home-checklist.md`

**Interfaces:**
- Consumes: final commit SHA and validation output.
- Produces: a concise human review checklist for the home.

- [ ] **Step 1: Record verification evidence**

Add the final `npm run validate` result, tested viewport widths, tested locales, tested themes, and any pre-existing warnings to the review checklist.

- [ ] **Step 2: Add visual review steps**

Include direct checks for hero hierarchy, photograph/caption, filters, cards, official logo, dark mode, mobile layout, and language persistence.

- [ ] **Step 3: Review the complete branch diff**

Compare the working branch with `design/petroleo-e-nevoa`. Confirm no backend work, unrelated screen redesign, credentials, generated dependency folders, or accidental `main` changes are included.

- [ ] **Step 4: Commit documentation**

```bash
git add docs/superpowers
git commit -m "docs: add editorial home review checklist"
```

- [ ] **Step 5: Hand off the branch**

Provide the branch and commit link for visual validation. Do not merge into `main` until the user approves the redesigned home.
