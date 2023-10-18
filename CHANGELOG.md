# Changelog

### v0.1.0 2023-10-18

#### Changes
- [Enabled communication between authoring components](https://tailor-cms.github.io/xt/edit-package.html#communication-between-components)
- [Enabled asset storage mechanism](https://tailor-cms.github.io/xt/file-storage.html)
- [Improved hook typings via `@tailor-cms/cek-common` package](https://github.com/tailor-cms/tce-template/pull/5/files#diff-8e6dfbbfb522575fe7c568c2de518bf9de351de83c9dbb48eaa865cd54450eb3R6)
- [Added ssr flag to the element manifest](https://github.com/tailor-cms/tce-template/pull/5/files#diff-c248ce0c077134efe1982e29743139541a2d28d6ace0e3f6e5a50cf09f1beaafR33).
  The goal is to be able to specify if UI is SSR compatible.
- Misc minor improvements

#### Migration instructions
- Bump tce-boot to `0.1.0`
- Optionally update element manifest interface to include ssr property
- Optionally type server hooks

---
