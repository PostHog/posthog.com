---
title: 4. Developer Workflow
sidebar: Handbook
showTitle: true
hideAnchor: true
---

If you haven't already, it's worth your time to read [Contributing to PostHog](https://posthog.com/docs/contributing).

Most developers use either [vscode](https://code.visualstudio.com/) or [pycharm](https://www.jetbrains.com/pycharm/) but 
you are free to use whatever IDE makes the most sense to you.

## Backend w/ Vscode

1. Create a git branch
2. Start PostHog with `bin/start`
3. Open app in Chrome and login
4. Open Chrome devtools to network tab
5. Navigate to scene (aka screen or page) and click on the area of interest
6. Find network request in devtools and find request
    - Request maps to ./posthog/api/*.py, i.e. http://localhost:8000/api/insight/funnel/?insight=FUNNELS -> ./posthog/api/insight.py:197
7. Make code changes including tests
    - Use [print()](https://realpython.com/python-print/) as needed for debugging
    - Some developers prefer [Pycharm](https://www.jetbrains.com/pycharm/) for local development
8. Run backend tests
    - `bin/tests posthog` runs only the tests within the `./posthog` directory. Excludes the tests within the `./ee` (PostHog Scale) directory.
    - `./bin/tests ee/clickhouse/queries/test/test_trends.py -k test_active_user_math` for specific tests
9. Commit changes to git branch
10. Open PR for review
    - Include Github issue number `#1234` which Github will automatically link for you

## Frontend w/ Vscode

1. Same as backend 1-5
2. Find frontend code, i.e. `frontend/src/scenes/insights/Insight.tsx`
3. Use `console.log` liberally
3. As of writing, there are no unit tests for the frontend although we do have integration tests for the frontend via Cypress
4. Same as backend 9-10

## Alternative: Pycharm

Some developers prefer to use [Pycharm](https://www.jetbrains.com/pycharm/) and for 
good reason. While there are many benefits, below you'll find a few keys benefits.

1. `Debugging and no print() statements` this is probably the biggest win in my opinion. 
   Since we are learning a new codebase there is no shame in having an assistant. Pycharm
   will show you the call stack and variable values. This is huge for understanding what
   is going on.
2. `Code navigation` when you are new to a codebase, moving easily through the code
   can be a real challenge, especially when there are multiple layers of abstraction. 
   Pycharm allows you to Ctrl+Click nearly all methods to jump to their definitions.
   While editors like vscode have a similar feature, you'll find that Pycharm works
   in cases where vscode does not.
3. `Run configurations` make starting celery, django, and webpack services simple. It's 
   mostly just clicking things.
4. `Excellent TypeScript support` with code completion and type checking directly in your 
   editor.
5. `Click instead of type` which means that you spend much more time typing code than 
   running commands. Nearly everything in Pycharm is clickable.
   
Pycharm offers a try it for free 30-day trial. It's recommended that you use it for at least 
that amount of time before you buy. I recommend watching [The Future of Programming](https://www.youtube.com/watch?v=8pTEmbeENF4) 
that will blow your mind and perhaps give you a new perspective on tools like these.

**[Next: Technologies to learn](technologies-to-learn)**
