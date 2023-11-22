# Changelog

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
