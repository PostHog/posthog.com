---
title: Coding conventions
sidebar: Docs
---

In this page you can find a collection of guidelines, style suggestions, and tips for making contributions to the codebase.

### Logging
As a general rule, we should have logs for every expected and unexpected actions of the application, using the appropriate _log level_.

#### Levels
A _log level_ or _log severity_ is a piece of information telling how important a given log message is:

* `DEBUG`: should be used for information that may be needed for diagnosing issues and troubleshooting or when running application
in the test environment for the purpose of making sure everything is running correctly
* `INFO`: should be used as standard log level, indicating that something happened
* `WARN`: should be used when something unexpected happened but the code can continue the work
* `ERROR`: should be used when the application hits an issue preventing one or more functionalities from properly functioning

#### Format
`django-structlog` is the default logging library we use (see [docs](https://django-structlog.readthedocs.io/en/latest/)).
It's a _structured logging_ framework that adds cohesive metadata on each logs that makes it easier to track events or incidents.

Structured logging means that you don’t write hard-to-parse and hard-to-keep-consistent prose in your logs
but that you log events that happen in a context instead.

```python
import structlog
logger = structlog.get_logger(__name__)
logger.debug("event_sent_to_kafka", event_uuid=str(event_uuid), kafka_topic=topic)
```
will produce:
```console
2021-10-28T13:46:40.099007Z [debug] event_sent_to_kafka [posthog.api.capture] event_uuid=017cc727-1662-0000-630c-d35f6a29bae3 kafka_topic=default
```
As you can see above, the log contains all the information needed to understand the app behaviour.

#### Security
Don’t log sensitive information. Make sure you never log:

* authorization tokens
* passwords
* financial data
* health data
* PII (Personal Identifiable Information)

### Testing
* All new packages and most new significant functionality should come with unit tests
* significant features should come with integration and/or end-to-end tests

#### Unit tests
A good unit test should:
* focus on a single use-case at a time
* have a minimal set of assertions per test
* demonstrate every use case. The rule of thumb is: if it can happen, it should be covered

#### Integration tests
Integration tests should ensure that the feature works end-to-end. They must cover all the important use cases of the feature.

### Frontend 

#### Two layers: Kea -> React

Our frontend webapp is written with [Kea](https://keajs.org/) and [React](https://reactjs.org/) as two separate layers. Kea is used to organise the app's data for rendering (we call this the *data* or *state* layer), and React is used to render the computed state (this is the *view* or *template* layer).

We try to be very explicit about this separation, and avoid local React state wherever possible, with exceptions for the `lib/` folder. Having all our data in one layer makes for code that's easier to [test](https://kea.js.org/docs/guide/testing), and observe. Basically, getting your [data layer](https://kea.js.org/blog/data-first-frontend-revolution) right is hard enough. We aim to not make it harder by constraining your data to a DOM-style hierarchy.

Hence the explicitly in keeping the layers separate.

#### General tips

- Think data first: get [your mental model of the data flowing through the app](https://acco.io/i-escaped-node) right, and then everything else will be easy.
- Be practical, yet remember that you are balancing speed of delivery with ease of maintainability. If you have to choose: code should be easier to understand than it was to write.

#### Do-s & Don't-s

- General
  - Write all new code with TypeScript and proper typing.
  - Write your frontend data handling code first, and write it in a Kea `logic`.
  - Don't use `useState` or `useEffect` to store local state. It's false convenience. Take the extra 3 minutes and change it to a `logic` early on in the development.
  - Logics still have a tiny initialization cost. Hence this rule doesn't apply to library components in the `lib/` folder, which might be rendered hundreds of times on a page with different sets of data. Still feel free to write a logic for a complicated `lib/` component when needed.
  - Use named exports (`export const DashboardMenu = () => <div />`), and avoid `default` exports.
- Naming things:
  - Always look around the codebase for naming conventions, and follow the best practices of the environment (e.g. use `camelCase` variables in JS, `under_score` in Python).
  - Use clear, yet functional names (`searchResults` vs `data`).
  - Logics are camelcase and start with a lowercase (`dashboardLogic`)
  - React components are camelcase and start with an uppercase (`DashboardMenu`).
  - Props for both logics and components start with uppercase (`DashboardLogicProps` & `DashboardMenuProps`)
  - Name the `.ts` file according to its main export: `DashboardMenu.ts` or `DashboardMenu.tsx`
- CSS
  - We use regular SCSS files for styling to keep things simple and maintainable in the long run, as opposed to supporting the CSS-in-JS flavour of the month.
  - Inside `MyBlogComponent.tsx` import `MyBlogComponent.scss`
  - Namespace all your CSS rules under globally unique names like `.my-blog-component { put everything here }`
- Testing
  - Write [logic tests](https://kea.js.org/docs/guide/testing) for all logic files. 
  - If your component is in the `lib/` folder, and has some interactivity, write a [react testing library](https://testing-library.com/docs/react-testing-library/intro/) test for it.
  - Add all new presentational elements and scenes to [our storybook](https://storybook.posthog.net/). Run `yarn storybook` locally.
