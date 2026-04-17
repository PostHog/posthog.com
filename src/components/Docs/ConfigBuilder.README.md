# ConfigBuilder

A reusable, two-panel interactive configuration builder for SDK docs pages. Users toggle options on the left and see generated code update live on the right.

## Usage

```tsx
import { ConfigBuilder } from 'components/Docs/ConfigBuilder'

<ConfigBuilder
    toggle={{ label: 'Region', options: [{ value: 'us', label: 'US' }, { value: 'eu', label: 'EU' }] }}
    checkboxes={[{ id: 'feature', label: 'Enable feature', defaultValue: true }]}
    inputs={[{ id: 'token', label: 'Token', type: 'text', defaultValue: '<ph_project_token>' }]}
    generateCode={(config) => `init('${config.inputs.token}', { ... })`}
    getFilename={() => 'init.js'}
    getLanguage={() => 'javascript'}
/>
```

## Props

| Prop | Type | Description |
|---|---|---|
| `toggle` | `{ label, options, defaultValue }` | Two-option toggle (e.g., US/EU Cloud) using RadixUI ToggleGroup |
| `select` | `{ label, options, defaultValue }` | Dropdown select for more than two options |
| `checkboxes` | `CheckboxOption[]` | Boolean config options. Supports `group: 'advanced'` to collapse under "Show advanced options" |
| `inputs` | `InputField[]` | Text, number, or `environment-list` inputs. Also supports `group: 'advanced'` |
| `generateCode` | `(config: ConfigState) => string` | Generates the code snippet from current config state |
| `getFilename` | `(selectedValue: string) => string` | Returns filename label for code block |
| `getLanguage` | `(selectedValue: string) => string` | Returns language for syntax highlighting |
| `optionsHeader` | `React.ReactNode` | Optional content above the config options |
| `previewHeader` | `string` | Label above the code preview (default: "Generated configuration") |

## Placeholder auto-fill

The generated code renders inside `SingleCodeBlock`, which auto-replaces placeholders like `<ph_project_token>`, `<ph_client_api_host>`, and `<ph_posthog_js_defaults>` with the user's actual values (or latest defaults). Use these placeholders in `generateCode` and `defaultValue` fields.

## Structure

The component uses inline `renderCheckbox` and `renderInput` helper functions to avoid duplicating markup between essential and advanced option sections.

## Layout

- Uses `@container` queries (not media queries) per project guidelines
- Two-column grid at `@md` breakpoint, single column on narrow containers
- Left panel: scrollable config options with smooth scroll on advanced expand
- Right panel: sticky code preview with reset button
- Checkbox descriptions hidden at `@md` to save space in two-column mode

## Creating a new SDK config builder

1. Create a file like `contents/docs/libraries/{sdk}/_snippets/{SDK}ConfigBuilder.tsx`
2. Define `generateCode`, `getFilename`, `getLanguage` functions
3. Pass SDK-specific checkboxes, inputs, and toggle/select options to `<ConfigBuilder />`
4. Import and render in the SDK's config MDX page

See `contents/docs/libraries/js/_snippets/JSConfigBuilder.tsx` for a reference implementation.
