# Changelog

### v2.0.0 2026-04-09

#### Breaking Changes
- Migrated to Vuetify 4 (MD3 typography, updated component API)
- Build toolchain: tsup replaced with tsdown for manifest & server packages
- Vite 7 → Vite 8 (Rolldown replaces Rollup, `rollupOptions` → `rolldownOptions`)
- TypeScript 5 → TypeScript 6 (`rootDir` required in edit/display tsconfigs)
- `isolatedDeclarations` enabled in manifest & server packages — all exports
  require explicit type annotations
- CSS injection via `vite-plugin-lib-inject-css` replaces `intro` hack
- Storage API: `$storageService.upload(file: File)` replaces the `FormData`
  signature; `createUploadForm` helper and `UploadFormData` type removed
- Asset components: `AssetInput` and `ElementPlaceholder` from
  `@tailor-cms/core-components` replaced by globally registered
  `TailorFileInput` and `TailorElementPlaceholder`
- Question elements (`ui.isQuestion: true`): edit and display runtimes now
  auto-wrap question components in `QuestionCard` / `QuestionForm` (formerly
  `QuestionContainer`). Elements must stop rendering Save/Cancel buttons,
  Submit/Retry buttons, hint/feedback inputs or rendering, and `VForm`
  wrapping. Edit now emits `@update` with partial data (replaces `@save`);
  Display emits `user-input` reactively on value change (replaces
  `interaction` on submit)
- Scaffolding CLI (`bin/`) converted from CommonJS to ESM; `chalk` bumped
  4 → 5 (reverses the workaround from v1.1.1)

#### Features
- Typed server hook signatures (`ElementHook`, `BeforeDisplayHook`,
  `OnUserInteractionHook`) replace untyped function declarations
- `ServerModule<Element>` typed default export for server package
- `HookMap<Element>` typed hook map export
- `isEmpty` manifest function for required element validation
- `procedures` export in server package for RPC support (callable from Edit
  components via injected `$rpc`)
- `TailorFileInput` and `TailorElementPlaceholder` global components
  (no import needed)
- Element linking: `@link` event, `references` prop (`ElementReferences`),
  and `mocks.referencesData` for the CEK link dialog
- `mocks.displayContexts` with canonical `ElementMocks` typing for previewing
  different delivery states
- `initState` receives an optional `InitConfig` param (e.g. `config.isGradable`
  to conditionally include grading fields)
- Question autosave toggle (Settings panel) and optional `showFeedback`
  manifest field (defaults to `true`) to hide the feedback section
- Typed `defineEmits` with tuple syntax recommended for event payloads
- `/// <reference types="vuetify" />` in `vite-env.d.ts` for global component types

#### Migration instructions
- Bump to the latest `@tailor-cms/*` 2.0 packages and align TypeScript, Vite,
  Vuetify, and related toolchain versions — see [package.json](package.json)
  and the subpackage manifests for target versions
- Add `vuetify` and `vite-plugin-lib-inject-css` as dev dependencies in edit &
  display packages
- Replace tsup with tsdown in manifest & server:
  - Replace `tsup` with `tsdown ^0.21.7` in devDependencies
  - Replace `tsup` config block with `"tsdown": { "target": "node22", "format": ["cjs", "esm"] }`
  - Update build scripts: `tsup` → `tsdown`
- Move `@tailor-cms/cek-common` from devDependencies to dependencies in
  manifest & server packages (required for DTS externalization)
- Move `tce-manifest` from devDependencies to dependencies in server package
- Update manifest & server tsconfigs:
  - Add `isolatedDeclarations: true`, `declaration: true`
  - Change `moduleResolution` from `"node"` to `"bundler"`
  - Remove `allowJs`, `esModuleInterop`
- Update edit & display tsconfigs:
  - Add `rootDir: "src"` (required by TypeScript 6)
- Update vite.config.ts in edit & display:
  - `rollupOptions` → `rolldownOptions`
  - Remove `intro`, `globals`, `cssCodeSplit`
  - Add `output: { exports: 'named' }`
  - Add `libInjectCss()` plugin
- Update vite-env.d.ts: add `/// <reference types="vuetify" />`
- Server package:
  - Convert hook functions to typed arrow functions using `ElementHook<Element>`,
    `BeforeDisplayHook<Element>`, `OnUserInteractionHook<Element>`
  - Type hookMap as `HookMap<Element>` and default export as `ServerModule<Element>`
  - Add `procedures: Record<string, ProcedureHandler>` export (empty if unused)
- Vue components:
  - Remove `import { defineProps, defineEmits } from 'vue'` (compiler macros)
  - Use `import type` for type-only imports
  - Type `defineEmits` with tuple syntax (e.g.
    `defineEmits<{ save: [data: ElementData] }>()`) for compile-time payload
    checks
- Vuetify 4 template updates:
  - Typography classes renamed: `.title` → `.text-h5`, `.subtitle-1` →
    `.text-subtitle-1`, `.body-1` → `.text-body-1`, `.caption` → `.text-caption`
  - Component API: `outlined` / `filled` props on `VTextField` / `VSelect` /
    `VTextarea` replaced by `variant="outlined"` / `variant="filled"`;
    `VSwitch` value handling and density props updated — check each
    component against the Vuetify 4 migration guide
- Asset components:
  - Replace `AssetInput` with `TailorFileInput` (globally registered, no
    import). API differences: `extensions` → `allowedExtensions`
    (dot-prefixed), `url` → `fileKey`, single `@input` split into `@upload` /
    `@input` / `@delete`
  - Replace `ElementPlaceholder` with `TailorElementPlaceholder`
  - Update `$storageService.upload` callers to pass a `File` directly; remove
    `createUploadForm` usages and `UploadFormData` imports
  - Drop `@tailor-cms/core-components` if these were its only usages
- Manifest:
  - Type `mocks` against `ElementMocks` from `@tailor-cms/cek-common`
    (`export const mocks: ElementMocks = { ... }`) — not `as const` and not
    unannotated, so typos surface at the use site
- Question elements (`ui.isQuestion: true`) — remove manual wrapping since
  the runtime auto-wraps in `QuestionCard` / `QuestionForm`:
  - Edit: emit `@update` with partial data instead of `@save`; drop
    Save/Cancel buttons, `VForm` wrapping, and hint/feedback inputs
  - Display: emit `user-input` reactively on value change instead of
    `interaction` on submit; drop Submit/Retry buttons, `VForm` wrapping, and
    hint/feedback rendering
  - Delete any `.question-container` / `.hint-container` / `.feedback-container`
    nodes your element used to render — the wrapper owns them
  - Optional: use the `config.isGradable` arg in `initState(config?)` to
    conditionally include grading fields (e.g. `correct`)
  - Optional: set `showFeedback: false` in the manifest for question types
    that don't support per-answer feedback
- Optional — add element linking if the element references other elements:
  - Emit `@link(key?)` from the Edit component to open the element picker;
    receive linked elements via the `references` prop (`ElementReferences`).
    `element.refs` stores lightweight identifiers
  - Provide mock data for the CEK link dialog via `mocks.referencesData`
- Refresh the package README to the canonical template format (see the xt
  example elements `counter` and `question` as reference)

---

### v1.1.1 2025-07-14
- Reverted `chalk` version to one supporting commonjs.

### v1.1.0 2025-07-14
- Bumped tce-boot with support for AI generation and devcontainers. Also updated
  all the dependencies and migrated code to accomodate changes in `tce-boot`

### v1.0.4 2025-04-30
- Bumped `tce-boot` with updated logo

### v1.0.3 2025-03-06
- Bumped `tce-boot` which reduced load time. Also added d.ts exports when
  building projece

### v1.0.2 2025-02-12
- Moved dotenv to dev dependencies.

### v1.0.1 2025-02-12
- Remove unused exports.

### v1.0.0 2025-02-12
- Bumped `tce-boot` to version `1.0.0` which drops support for the Vue 2 runtime.
  Removed display runtime prompt since now only one is supported.
- Other dependencies have also been bumped to the latest version.

### v0.5.1 2024-04-05

#### Changes
- Bumped `tce-boot` to version `0.5.1` which enables optional toolbars and uses
  the latest vuetify version

### v0.5.0 2024-04-05

#### Changes
- Bumped `tce-boot` to version `0.5.0` to enable Vue 3 based authoring runtime
  (targeting Tailor >=7.0.0). For more details see the
  [CHANGELOG](https://github.com/tailor-cms/xt/blob/main/CHANGELOG.md#changelog).
- Created Vue 3 based package template (`tailor-next` branch).

#### Migration instructions
- Bump tce-boot to `0.5.0`
- Replace Vue `2.x` package in the edit subpackage with the Vue `^3.3.4`
- Replace `@vitejs/plugin-vue2` with `@vitejs/plugin-vue": "^4.2.3` and update
  `vite.config.ts` to use the new version of the plugin
- Set `TAILOR_NEXT=true` .env variable
- Migrate element specific Vue 2 codebase to Vue 3
- For more details regarding the introduced changes see the
  [0.5.0 PR](https://github.com/tailor-cms/tce-template/pull/29/files)

### v0.4.0 2024-01-24

#### Changes
- Ability to configure service ports and end-user urls
- Session based element creation and user state handling
- Ability to set multiple display contexts
- Ability to select particular display context in the UI
- Ability to reset element
- Ability to reset element state
- Tracking element state mutations
- Tracking user state mutations

#### Migration instructions
- Bump `@tailor-cms/tce-boot` and `@tailor-cms/tce-display-runtime` to `0.4.0`
- Update `@playwright/test` to `1.41.1`
- Update `.github/actions/setup` to use `node-version: 20.11`
- Update boot command for display runtime to:
  `export TCE_DISPLAY_DIR=${PWD}/packages/display/dist && cd ./node_modules/@tailor-cms/tce-display-runtime && pnpm vite optimize && pnpm dev`
-  Run `cp .env.example .env` and edit the env variables

For custom display runtime, make sure introduced tce-display changes are applied:
- [src/App.vue](https://github.com/tailor-cms/xt/pull/11/files#diff-db34c38a347cc14337f0cf448966777333b1b6fc3873938a9c08886e779a31b9)
- [vite.config.ts](https://github.com/tailor-cms/xt/pull/11/files#diff-c809e1053d727cda339ff7dcfb8a9d152af08c8c7ebd2d52c4d8270ae757b39a)
- [package.json](https://github.com/tailor-cms/xt/pull/11/files#diff-40493a968ba64f33ff15183fa6ff583764e57a53fc612a15667b858d7a1d72b1)
- Make sure that `boot:display` command references custom package instead of
  `@tailor-cms/tce-display-runtime`

---

### v0.3.5 2023-12-20

#### Changes
- Bugfixes

#### Migration instructions
- Bump tce-boot to `0.3.3`

---

### v0.3.4 2023-12-19

#### Changes
- Extracted display runtime to enable plugging in custom one
- Loading .env variables from the project root and passing them to the server
  runtime
- Providing interaction and data mock for element linking (upon Edit component
  emitting the link event)
- Enabling running within container, providing example Dockerfile and
  docker-compose.yml

#### Migration instructions
- Update the package.json:
  - Bump tce-boot to `0.3.2`
  - [Install @tailor-cms/tce-display-runtime as dev dependency](https://github.com/tailor-cms/tce-template/blob/chore/extract-display-runtime-from-boot/package.json#L46)
  - Install concurrently as dev dependency
  - Add/change following entries in the script section
    ```js
      "dev": "concurrently 'pnpm boot:cek' 'pnpm boot:display' -n cek,display-runtime -c blue,cyan",
      "boot:cek": "cd ./node_modules/@tailor-cms/tce-boot && pnpm start",
      "boot:display": "export TCE_DISPLAY_DIR=${PWD}/packages/display/dist && cd ./node_modules/@tailor-cms/tce-display-runtime && pnpm dev optimize && pnpm dev",
    ```
- Copy Dockerfile, docker-compose.yml and .dockerignore (not required)
- [For more details see the PR](https://github.com/tailor-cms/tce-template/pull/26/files)

---

### v0.2.1 2023-11-22

#### Changes
- Enabled passing data context from the `onUserInteraction` hook to the
  `beforeDisplay` hook (via the `transientState` prop). For more details see the
  [docs](https://tailor-cms.github.io/xt/server-package.html#onuserinteraction-hook).

#### Migration instructions
- Bump tce-boot to `0.2.1`

### v0.2.0 2023-11-09

#### Changes
- [Enabled user-state hooks](https://tailor-cms.github.io/xt/server-package.html#user-state-hooks)

#### Migration instructions
- Bump tce-boot to `0.2.0`
- [Add the display context to the manifest interface](https://github.com/tailor-cms/tce-template/pull/16/files#diff-363caee1e8047788dee5a0a3feca5d40a88c160dd36abadb550e8577ae0d3244R38)
- [Add the example display context to the manifest](https://github.com/tailor-cms/tce-template/pull/16/files#diff-c248ce0c077134efe1982e29743139541a2d28d6ace0e3f6e5a50cf09f1beaafR29)
- [Add beforeDisplay and onUserInteraction hooks](https://github.com/tailor-cms/tce-template/pull/16/files#diff-8e6dfbbfb522575fe7c568c2de518bf9de351de83c9dbb48eaa865cd54450eb3R40)
- [Define userState prop on the Display component](https://github.com/tailor-cms/tce-template/pull/16/files#diff-cfb5d05096f2f57087b355fa04ea9ac63033d96b4f1100db0991c69baa4aebc7R12)

-[For more details see 0.2.0 PR](https://github.com/tailor-cms/tce-template/pull/16/files)

---

### v0.1.0 2023-10-18

#### Changes
- [Enabled communication between authoring components](https://tailor-cms.github.io/xt/edit-package.html#communication-between-components)
- [Enabled asset storage mechanism](https://tailor-cms.github.io/xt/file-storage.html)
- Improved hook typings via `@tailor-cms/cek-common` package
- Added ssr flag to the element manifest. The goal is to be able to specify if
  the UI is SSR compatible.
- Added runtime parameter to server hooks:
  `(element: Element, services: HookServices, runtime: ServerRuntime)`
- Misc minor improvements

#### Migration instructions
- Bump tce-boot to `0.1.0`
- [Optionally update element manifest interface to include ssr property](https://github.com/tailor-cms/tce-template/blob/main/packages/manifest/src/interfaces.ts#L28)
- [Optionally type server hooks and add new param](https://github.com/tailor-cms/tce-template/blob/main/packages/server/src/index.ts#L6).
  In order to do so, you will need to install `@tailor-cms/cek-common` package.

---
