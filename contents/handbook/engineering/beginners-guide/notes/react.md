---
title: Our Notes On React
sidebar: Handbook
showTitle: true
hideAnchor: true
---

The [React docs](https://reactjs.org/docs/getting-started.html) are great for getting from zero to one.

## Hooks

I found hooks somewhat counterintuitive at first, but they're very powerful once you grasp them. Refer to the [Rules of Hooks](https://reactjs.org/docs/hooks-rules.html). - @samwinslow

1. Only call from the top level of a functional component
2. Do not call outside a functional component or from plain JS (you can call from custom hooks)

### useState

Uses destructured array assignment syntax

`const [value, setValue] = useState(initialValue)`

An updater function can be passed to the setter so that multiple updates can be called in sequence, or to merge-update the state via spreading if it's an object. The updater is a pure function which takes previous state and returns next.

```jsx
// bad
setValue(value + 1)
setValue(value + 1)

// good
setValue(value => value + 1)
setValue(value => value + 1)
```

In general, derive data while rendering rather than storing derived values in state (e.g. filtering local data). However, if expensive filtering or join operations are to be performed and/or the component re-renders frequently, a memoized state management library might be better.

### useEffect

Takes a callback function which may have (potentially global) side effects. Runs on every re-render by default.

```jsx
function EffectExample() {
	const [value, setValue] = useState(initialValue)

	useEffect(() => {
		document.title = `The value is now ${value}`
	})

	return (
		<div>
			<p>{value}</p>
			<button onClick={() => setValue(value => value + 1)}>Use Effect</button>
		</div>
	)
}
```

The rendered value is not a special data binding that causes it to listen. It is merely a reflection of a new value rendered as a result of calling the setter.

Can return a cleanup function from the effect and declare when it should run

```jsx
function ApiStatus({ service }) {
	const [isOnline, setOnline] = useState(null)

	const { id } = service
	useEffect(() => {
		const handleStatusChange(status) => {
			setOnline(status.isOnline)
		}
		SomeApi.subscribe(id, handleStatusChange)

		return () => SomeApi.unsubscribe(id, handleStatusChange)
	}, [id]) // Only run when `id` changes (sync to state)

	// rendering
}
```

### useLayoutEffect

Same as `useEffect`, but runs callback synchronously during commit lifecycle phase

### useMemo

Recalculates value only when dependencies change

### useCallback

Updates callback function reference when dependencies change

### useRef

Mutable ref used to access returned child.

- Persists between renders
- Default: `{ current: null }`
- Plain object; mutating does not trigger re-renders

### Custom Hooks

Listeners and API connections can be extracted to a custom hook and reused

Examples from popular libraries:

- React-Redux: `useSelector`, `useDispatch`
- React-Router: `useHistory`, `useLocation`, `useParams`
- `useFormState`

## Useful resources

- [Dan Abramov - A Complete Guide to useEffect](https://overreacted.io/a-complete-guide-to-useeffect/)
- [Mark Erikson - A Complete Guide to React Rendering Behavior](https://blog.isquaredsoftware.com/2020/05/blogged-answers-a-mostly-complete-guide-to-react-rendering-behavior/)

**[Back: Technologies to learn](../technologies-to-learn)**

