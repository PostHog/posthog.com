# ViewButton

A tab-style button that switches between named views, such as "Article" and "Video".

```tsx
import { ViewButton } from 'components/ViewButton'

const [view, setView] = useState('Article')

<ViewButton view={view} title="Article" setView={setView} />
<ViewButton view={view} title="Video" setView={setView} />
```

| Prop | Type | Description |
|---|---|---|
| `title` | `string` | The view this button selects. Also the label. |
| `view` | `string` | The active view. The button is highlighted when it equals `title`. |
| `setView` | `(view: string) => void` | Called with `title` on click. |

Used by `components/ContentViewer`.
