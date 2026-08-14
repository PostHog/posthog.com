# ContextWarehouse

Presentational components shared across the `/context-warehouse/*` pages.

Both components previously lived in `src/pages/context-warehouse/`. Gatsby's file-system routing turned each
one into a public route (`/context-warehouse/FeatureTable`, `/context-warehouse/dw-installation-platforms`),
so they were moved here — same components, no accidental pages.

## FeatureTable

An `OSTable` with one row per feature: title, description, and an availability cell that renders a "Coming
soon" pill when `status` is `coming_soon`.

```tsx
import FeatureTable from 'components/ContextWarehouse/FeatureTable'

<FeatureTable features={biFeatures} />
```

| Prop       | Type        | Description                                            |
| ---------- | ----------- | ------------------------------------------------------ |
| `features` | `Feature[]` | `{ title, description, status?: 'available' \| 'coming_soon' }` |

### Where it's used

- `/context-warehouse/business-intelligence`
- `/context-warehouse/posthog-ai`

## DWInstallationPlatforms

A `List` of every data warehouse source — managed platforms from `useSourcePlatforms()` merged with
`SELF_HOSTED_SOURCES`, sorted alphabetically. Self-hosted entries link to
`/docs/data-warehouse/sources/{slug}`.

```tsx
import DWInstallationPlatforms from 'components/ContextWarehouse/DWInstallationPlatforms'

<DWInstallationPlatforms showFiltering={true} />
```

| Prop            | Type      | Default | Description                                                     |
| --------------- | --------- | ------- | --------------------------------------------------------------- |
| `showFiltering` | `boolean` | `false` | Reserved for filtering UI                                        |
| `maxItems`      | `number`  | —       | Truncates the list and appends a "+ N more!" line                |

### Where it's used

- `/context-warehouse/sources`

## Notes

- The grid is driven by `@container` queries (`@2xl`, `@3xl`), so both components stay responsive inside a
  resized app window.
