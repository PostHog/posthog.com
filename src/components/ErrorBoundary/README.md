# ErrorBoundary

Catches an error thrown by any descendant during render or a lifecycle method and shows a
fallback in its place. React has no hook form for this, so it is a class component.

Without a boundary, a single throw unmounts the entire React tree above it. Wrap any subtree
whose failure should stay local — a third-party widget, a shadow-DOM embed — so the rest of the
page keeps working.

## Props

| Prop       | Type                                        | Default | Description                                            |
| ---------- | ------------------------------------------- | ------- | ------------------------------------------------------ |
| `children` | `React.ReactNode`                           | —       | The subtree to protect.                                |
| `fallback` | `React.ReactNode`                           | `null`  | Rendered after a child throws.                         |
| `onError`  | `(error, info) => void`                     | —       | Called once on the throw, for logging or extra work.   |

The boundary reports the caught error to PostHog error tracking through `window.posthog`, so an
otherwise unhandled exception stays visible after it is contained.

## Usage

```tsx
import ErrorBoundary from 'components/ErrorBoundary'

<ErrorBoundary fallback={<StaticPromo />}>
    <ThirdPartyWidget />
</ErrorBoundary>
```

A boundary catches errors from its descendants only, not from itself or its `fallback`. Keep the
`fallback` simple and independent of whatever failed.
