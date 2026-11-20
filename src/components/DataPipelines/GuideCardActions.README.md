# GuideCardActions

The two buttons at the bottom of a card that links to a warehouse pocket guide:

- **Read the guide** opens the pocket guide at `href`.
- **Copy skill** copies the guide's `SKILL.md` to the clipboard. The button is disabled if the guide has no skill file.

```tsx
import GuideCardActions from 'components/DataPipelines/GuideCardActions'

<GuideCardActions href="/learn/warehouse/pocket-guide/features-drive-revenue" />
```

`href` can use any pocket guide path form. The component resolves it with `pocketGuideDestination`, so it finds the skill file and links to the current guide URL.

The component uses `mt-auto`, so put it at the end of a `flex flex-col` card to pin the buttons to the bottom.

Used on `/data-pipelines/sources/stripe`.
