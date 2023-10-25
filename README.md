<p align="center">
  <img alt="posthoglogo" src="https://user-images.githubusercontent.com/65415371/205059737-c8a4f836-4889-4654-902e-f302b187b6a0.png">
</p>

# PostHog.com - Website, docs, blog, and handbook

<p align="center">
  <a href='http://makeapullrequest.com'><img alt='PRs Welcome' src='https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=shields'/></a>
  <img alt="GitHub contributors" src="https://img.shields.io/github/contributors/posthog/posthog.com"/>
  <a href='https://posthog.com/slack'><img alt="Join Slack Community" src="https://img.shields.io/badge/slack%20community-join-blue"/></a>
  <img alt="GitHub commit activity" src="https://img.shields.io/github/commit-activity/m/posthog/posthog.com"/>
  <img alt="GitHub closed pull requests" src="https://img.shields.io/github/issues-pr-closed/posthog/posthog.com"/>
</p>

<p align="center">
  <a href="https://app.posthog.com/home#supportModal">Support</a> - <a href="https://posthog.com/roadmap">Roadmap</a> - <a href="https://github.com/PostHog/posthog.com/issues/new">Open an issue</a> - <a href="https://github.com/PostHog/posthog.com/blob/master/STYLEGUIDE.md">Style guide</a>
</p>


This is the repository for the PostHog website. It contains:

- All of our written content and visuals including product features, manuals, docs, blogs, case studies, tutorials, and the handbook
- Features like questions and answers (using [Squeak!](https://github.com/PostHog/squeak)), job listings (using [Ashby](https://www.ashbyhq.com/customers/posthog-customer-story)), pricing calculator, roadmap, API docs, and more
- All the components, templates, logic, and styling to make this work, look pretty, and spark joy

## Table of contents
- [Quick start](#quick-start)
- [Advanced setup](#advanced-setup)
- [Contributing](#contributing)

## Quick start

1. **Pre-installation**

    Install [Node](https://nodejs.org/en/download/) and [Yarn](https://classic.yarnpkg.com/en/). (If you're on a Mac with Apple Silicon and get an error with `-86` in it, you may need to [install Rosetta](https://osxdaily.com/2020/12/04/how-install-rosetta-2-apple-silicon-mac/).)
    ```bash
    npm install --global yarn
    ```

1.  **Start developing**

    Clone the repo then navigate into your new site’s directory, install the site dependencies, and start it up.

    ```bash
    cd posthog.com/
    yarn
    yarn start
    ```

    > **Tip:** Seeing a discrepancy between local development and staging/production? Preview the production build locally by running `gatsby build && gatsby serve`

1.  **Open the source code and start editing!**

    Your site is now running at `http://localhost:8001`!
    
    > **Note:** You'll also see a second link: `http://localhost:8001/___graphql`. This is a tool you can use to experiment with querying your data. Learn more about using this tool in the [Gatsby tutorial](https://www.gatsbyjs.org/tutorial/part-five/#introducing-graphiql).

See full instructions on [developing PostHog.com locally in our manual](https://posthog.com/handbook/engineering/posthog-com/developing-the-website).

## Advanced setup

### Docker

It is also possible to use Docker to run posthog.com locally with this command:

```bash
docker run -it --rm \
    -w /app -v "$PWD":/app \
    -p 8000-8001:8000-8001 \
    -e INTERNAL_STATUS_PORT=8001 \
    node:14-slim \
    sh -c 'yarn && yarn start'
```

### Debugging errors on start
1. Pull the latest changes from `master`
2. Run `gatsby clean && yarn start` or delete `node_modules` and `.cache`
3. Check builds are passing in [deployment to Vercel](https://github.com/PostHog/posthog.com/deployments)

### Working on `/docs/api`?

1. Create a [personal API key](https://posthog.com/docs/api#how-to-obtain-a-personal-api-key) in PostHog
1. `export POSTHOG_APP_API_KEY=key`
1. `yarn start`

### Want Ashby job listings or GitHub contributors to load?

You’ll need to set environment variables for these. [See (private) instructions](https://github.com/PostHog/company-internal/blob/master/website-api-keys.md) for this.

## Contributing

We <3 contributions big and small. In priority order (although everything is appreciated) with the most helpful first:

- Ask a [question in our community](https://posthog.com/questions)
- Submit [bug reports and give us feedback in the app](https://app.posthog.com/home#supportModal)! 
- Vote on features or get early access to beta functionality in our [roadmap](https://posthog.com/roadmap)
- Open a PR
    - Read [our instructions above](#quick-start) on developing PostHog.com locally
    - Read more [detailed instructions in our manual](https://posthog.com/handbook/engineering/posthog-com/developing-the-website)
    - For basic edits, go to the file in GitHub and click the edit button (pencil icon)
- Open [an issue](https://github.com/PostHog/posthog.com/issues/new) or [content idea](https://github.com/PostHog/posthog.com/issues/new?assignees=andyvan-ph&labels=content&template=blog-post-idea-template.md&title=%7BContent+type%7D+-+%7Btitle%7D)
