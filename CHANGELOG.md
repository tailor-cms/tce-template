# Changelog

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
- [Optionally type server hooks and add new param](https://github.com/tailor-cms/tce-template/blob/main/packages/server/src/index.ts#L6)

---
