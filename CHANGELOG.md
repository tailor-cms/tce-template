# Changelog

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
