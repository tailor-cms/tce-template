# Custom Element

> **Template note:** this README was scaffolded from `@tailor-cms/tce-template`.
> Rename the title, update the **Type**, rewrite the **Data** table, and fill in
> the **Edit** / **Display** sections to describe what your element actually
> does. Delete this note when done.

One-line description of what the element is.

**Type:** `ORG_CUSTOM_ELEMENT`

## Data

| Field | Type | Description |
|-------|------|-------------|
| _add your fields here_ | | |

Only list fields that are meaningful to the element's behavior. Omit framework
internals like `assets` (the dual-URL storage map).

## Edit

- _what the author sees and can do_

## Display

- _what the learner sees_

## Development

Requires Node `>=24` and pnpm.

```sh
pnpm dev     # Preview :8080 | Edit :8010 | Display :8020 | Server :8030
pnpm build
pnpm lint
pnpm test
```

## Run with Docker

```sh
docker compose up
```

## Documentation

- [xt Framework](https://tailor-cms.github.io/xt/introduction.html)
- [Edit](https://tailor-cms.github.io/xt/edit-package) · [Display](https://tailor-cms.github.io/xt/display-package) · [Server](https://tailor-cms.github.io/xt/server-package)
- [Manifest](https://tailor-cms.github.io/xt/manifest) · [Runtime](https://tailor-cms.github.io/xt/runtime) · [Testing](https://tailor-cms.github.io/xt/testing)
