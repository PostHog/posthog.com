# GuideCardActions

The two buttons at the bottom of a card that links to a Context Warehouse pocket guide:

- **Read the guide** opens the pocket guide at `href`.
- **Copy skill** copies the guide's `SKILL.md` to the clipboard. The button is disabled if the guide has no skill file.

```tsx
import GuideCardActions from 'components/ContextWarehouse/GuideCardActions'

<GuideCardActions href="/pocket-guides/context-warehouse/features-drive-revenue" />
```

The component uses `mt-auto`, so put it at the end of a `flex flex-col` card to pin the buttons to the bottom.

Used on `/context-warehouse/use-cases` and `/context-warehouse/sources/stripe`.
