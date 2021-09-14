---
title: Our Notes On Kea
sidebar: Handbook
showTitle: true
hideAnchor: true
---

## Actions

- All code lives inside `logic` which is created with `kea({ ... })`
- Files are typically named `[name]Logic.js|ts`
- `import { useActions } from 'kea'` provides access to action all functions
- All operations start from `actions`
- The mental model for actions is that of *event capturing*, they signal intent
- Sample action: `increment: (amount) => ({ amount })`
- **Actions** map to `reducers` and `listeners` to perform operations
- Actions can invoke several reducers if the name of the action maps to multiple reducers
- Actions defined with `someActions: true` are actions with no arguments

## Reducers

- Reducers define `state` and `operations` on that state.
- `import { useValues } from 'kea'` provides access to the state
- Sample reducers: `counter: [0, { increment: (state, { amount }) => state + amount}]`
- Notice how increment is the same name as the action
- Reducers should never mutate the state directly, they must be pure functions

## Listeners

- Listeners are how you do `side-effects` and async calls to load data
- Listeners may invoke other actions via `actions`, example: `listeners: ({ actions, values }) => ({ ... })`
- Listeners are `async` functions
- Notice we have access to actions and values in the listeners functions
- *Set this or that* is better done by reacting to actions

## Loaders

- Available via the `kea-loaders-plugin`
- Encapsulates the pattern of action > listener > loading > success | failure
- Example: `users: [[], { loadUsers: async () => await api.get('users') }]`

## Selectors

- Selectors handle mapping data across reducers
- Similar to computed values in Vue

## Values

- `import { useValues } from 'kea'`
- You can access values frorm React with useValues or from listeners via listeners function

## Input objects vs functions

- Any of kea's built-in primitives: actions, reducers, listeners, etc. may be declared with an object or function
- Functions are invoked lazily
- Functions are passed 1 argument which can be destructured for actions and values
- Use objects first then functions as you need them

## Props

- Using kea logic as a function allows you to pass in props which are available as destructured props for primitive key functions

## Keyed logic

- If you give your logic a key, you can have multiple independent copies of it. The key is derived from props
- Example: `key: (props) => props.id`

## Breakpoints

- Serves as a debounce function or out of order network calls

## Events

- Handles lifecycle events

## Defaults

- Allows you to specify default values instead of doing them in the reducers
- Defaults may be a function as well to calculate the default values

## Connecting kea logic together

- You may [connect logics together](https://kea.js.org/docs/guide/additional#connecting-logic-together)

## Useful resources

- [Kea](https://kea.js.org/docs/introduction/what-is-kea)
  
**[Back: Technologies to learn](../technologies-to-learn)**
