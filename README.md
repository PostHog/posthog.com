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

    Your site is now running at `http://localhost:8000`!
    
    *Note: You'll also see a second link: `http://localhost:8000/___graphql`. This is a tool you can use to experiment with querying your data. Learn more about using this tool in the [Gatsby tutorial](https://www.gatsbyjs.org/tutorial/part-five/#introducing-graphiql).*

If you are using Apple M1 ([read this for more](https://github.com/lovell/sharp/issues/2460)):
```bash
rm -rf ./node_modules
brew install vips
yarn install
```

It is also possible to use docker:

```bash
docker run -it --rm \
    -w /app -v "$PWD":/app \
    -p 8000-8001:8000-8001 \
    -e INTERNAL_STATUS_PORT=8001 \
    node:14-slim \
    sh -c 'yarn && yarn start'
```    

## Questions?

### [Join our Slack community.](https://join.slack.com/t/posthogusers/shared_invite/enQtOTY0MzU5NjAwMDY3LTc2MWQ0OTZlNjhkODk3ZDI3NDVjMDE1YjgxY2I4ZjI4MzJhZmVmNjJkN2NmMGJmMzc2N2U3Yjc3ZjI5NGFlZDQ)
