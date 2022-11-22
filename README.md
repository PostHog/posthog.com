# PostHog.com - Docs, Website, and Handbook

This is the repository for the PostHog website, which includes our Docs and Handbook.

Please feel free to suggest any changes. See our [contributing guide](https://github.com/PostHog/posthog.com/blob/master/CONTRIBUTING.MD) for more information.

## Quick Start

1. **Pre-Installation**

    Install [Node](https://nodejs.org/en/download/) and [Yarn](https://classic.yarnpkg.com/en/).
    ```bash
    npm install --global yarn
    ```

1.  **Start Developing**

    Clone the repo then navigate into your new site’s directory, install the site dependencies, and start it up.

    ```bash
    cd posthog.com/
    yarn
    yarn start
    ```

    Tip: Seeing a discrepancy between local development and staging/production? Preview the production build locally by running `gatsby build && gatsby serve`

1.  **Open the Source Code and Start Editing!**

    Your site is now running at `http://localhost:8001`!
    
    *Note: You'll also see a second link: `http://localhost:8001/___graphql`. This is a tool you can use to experiment with querying your data. Learn more about using this tool in the [Gatsby tutorial](https://www.gatsbyjs.org/tutorial/part-five/#introducing-graphiql).*

It is also possible to use Docker:

```bash
docker run -it --rm \
    -w /app -v "$PWD":/app \
    -p 8000-8001:8000-8001 \
    -e INTERNAL_STATUS_PORT=8001 \
    node:14-slim \
    sh -c 'yarn && yarn start'
```    

### Working on `/docs/api`?

1. Create a [personal API key](https://posthog.com/docs/api#how-to-obtain-a-personal-api-key) in PostHog
1. `export POSTHOG_APP_API_KEY=key`
1. `yarn start`

## Want job listings or contributors to load?

[See (private) instructions](https://github.com/PostHog/company-internal/blob/master/website-api-keys.md) for this.

## Questions?

### [Join our Slack community.](https://join.slack.com/t/posthogusers/shared_invite/zt-1ghutt7jr-jRj0_iYDRS7R~uKeZLIbdQ)
