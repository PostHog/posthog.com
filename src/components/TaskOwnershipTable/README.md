# TaskOwnershipTable

A flexible table component for displaying task ownership with unified search across multiple grouped sections.

## Features

- **Multiple table sections/breakdowns** - Separate visual sections with individual headers
- **Unified search** - Single search bar that searches across all sections simultaneously
- **Search highlighting** - Matched terms are highlighted in the table
- **Flexible owner display** - Supports both individual team members and small teams
- **Alphabetical sorting** - Tasks are automatically sorted alphabetically within each section
- **Responsive design** - Works on all screen sizes

## Usage

### In MDX files

First, import the component at the top of your MDX file:

```mdx
import TaskOwnershipTable from '../../../src/components/TaskOwnershipTable'

<TaskOwnershipTable dataset="people" />
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `dataset` | `string` | `"people"` | Key to select which dataset to display from the registry |

## Data Structure

Task ownership data is defined in `/src/hooks/useTaskOwnership.tsx`.

### Adding New Data Sets

1. **Define your data structure**:

```typescript
const YOUR_TASK_DATA: Record<string, { name: string; columns: Array<{ key: string; label: string }>; tasks: Task[] }> = {
    section_one: {
        name: 'Section One Title',
        columns: [
            { key: 'task', label: 'Task' },
            { key: 'owner', label: 'Owner' },
        ],
        tasks: [
            { task: 'Task name', owner: ['Person Name'] },
            { task: 'Another task', owner: ['team-slug'] },
            { task: 'Shared task', owner: ['Person Name', 'team-slug'] },
        ],
    },
    section_two: {
        name: 'Section Two Title',
        columns: [
            { key: 'task', label: 'Task' },
            { key: 'owner', label: 'Owner' },
        ],
        tasks: [
            { task: 'More tasks', owner: ['Another Person'] },
        ],
    },
}
```

2. **Register your data in the registry**:

```typescript
const TASK_DATA_REGISTRY: Record<string, ...> = {
    people: PEOPLE_TASK_DATA,
    yourDataKey: YOUR_TASK_DATA,  // Add your dataset here
}
```

3. **Use it in your MDX file**:

```mdx
import TaskOwnershipTable from '../../../src/components/TaskOwnershipTable'

<TaskOwnershipTable dataset="yourDataKey" />
```

### Owner Format

The `owner` field accepts an array of strings. The component automatically detects:

- **Team slugs** - Strings with hyphens (e.g., `'platform-analytics'`) render as `SmallTeam` components
- **Person names** - Other strings render as `TeamMember` components with the full name

Examples:
```typescript
owner: ['Fraser Hopper']                    // Single person
owner: ['platform-analytics']               // Single team
owner: ['Carol Donnelly', 'Tara Alcantarilla-Howard']  // Multiple people
owner: ['analytics-platform', 'web-analytics']          // Multiple teams
owner: ['Fraser Hopper', 'platform-analytics']          // Mixed
```

## Search Functionality

The search bar searches across:
- Task names
- Owner names (both team slugs and person names)

Matching terms are highlighted with yellow background using mark.js.

### Keyboard Shortcuts

- **Escape** - Clear the search query
- **Click X button** - Clear the search query

## Example: People Team Data

See `/src/hooks/useTaskOwnership.tsx` for the complete People team implementation, which includes sections for:
- People Ops
- Culture
- Finance
- Legal

## Styling

The component uses:
- OSInput for the search field
- Standard table elements with Tailwind classes
- SmallTeam and TeamMember components for displaying owners
- mark.js for search highlighting

## Related Components

- `FeatureOwnershipTable` - Similar component for feature ownership
- `SmallTeam` - Displays team badges
- `TeamMember` - Displays team member information
