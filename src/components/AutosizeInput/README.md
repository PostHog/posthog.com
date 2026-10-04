# AutosizeInput

A text input that is as wide as its value. It replaces `react-input-autosize`, which is CommonJS-only and does not load as an ES module.

## Usage

```tsx
import AutosizeInput from 'components/AutosizeInput'

<AutosizeInput value={name} onChange={(e) => setName(e.target.value)} inputClassName="px-1 border border-primary" />
```

It also works as the `customInput` of `react-number-format`:

```tsx
<NumericFormat value={volume} customInput={AutosizeInput} inputClassName="text-center" />
```

## Props

All `<input>` props, plus:

| Prop | Description |
|---|---|
| `inputClassName` | Classes for the input (the same name `react-input-autosize` used). `className` is also applied to the input. |

## Sizing

- `field-sizing: content` sizes the input to its text, in browsers that support it.
- Other browsers use the `size` attribute: the length of the value or the placeholder, in characters. Use `min-w-*` and `max-w-*` classes to bound the width.
