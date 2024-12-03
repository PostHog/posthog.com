<p align="center">
  <img alt="posthoglogo" src="https://user-images.githubusercontent.com/65415371/205059737-c8a4f836-4889-4654-902e-f302b187b6a0.png">
</p>

# PostHog.com - Website, docs, blog, and handbook

<p align="center">
  <a href='http://makeapullrequest.com'><img alt='PRs Welcome' src='https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=shields'/></a>
  <img alt="GitHub contributors" src="https://img.shields.io/github/contributors/posthog/posthog.com"/>
  <a href='https://posthog.com/community'><img alt="Join Community" src="https://img.shields.io/badge/community-join-blue"/></a>
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

    Clone the repo and navigate into your new site’s directory:

    ```bash
    git clone git@github.com:PostHog/posthog.com.git && cd posthog.com/
    ```

    If you're using an Apple Silicon Mac (M1) you'll need to run the following commands:

    ```bash
    rm -rf ./node_modules
    brew install vips
    ```

    Then install the site dependencies, and start it up:

    ```bash
    yarn
    yarn start
    ```

    > **Tip:** Seeing a discrepancy between local development and staging/production? Preview the production build locally by running `gatsby build && gatsby serve`

1.  **Open the source code and start editing!**

    Your site is now running at `http://localhost:8001`!
    
    > **Note:** You'll also see a second link: `http://localhost:8001/___graphql`. This is a tool you can use to experiment with querying your data. Learn more about using this tool in the [Gatsby tutorial](https://www.gatsbyjs.org/tutorial/part-five/#introducing-graphiql).

See full instructions on [developing PostHog.com locally in our manual](https://posthog.com/handbook/engineering/posthog-com/developing-the-website).

## Advanced setup

### Debugging errors on start
1. Pull the latest changes from `master`
2. Run `gatsby clean && yarn start` or delete `node_modules` and `.cache`
3. Check builds are passing in [deployment to Vercel](https://github.com/PostHog/posthog.com/deployments)

### Working on `/docs/api`?

The site will load the API schema from US Cloud by default. You can override this to use your local PostHog instance with an env var:

```
POSTHOG_OPEN_API_SPEC_URL="http://127.0.0.1:8000/api/schema/" yarn start
```


### Want Ashby job listings or GitHub contributors to load?

You’ll need to set environment variables for these. [See (private) instructions](https://github.com/PostHog/company-internal/blob/master/website-api-keys.md) for this.

### Developing the posts section
To see your local version of the posts section, `/posts` needs to be visited directly (`http://localhost:8001/posts`)

### Developing the merch store
Additional environment variables are needed to develop the merch store:
- `SHOPIFY_APP_PASSWORD`
- `GATSBY_MYSHOPIFY_URL`
- `GATSBY_SHOPIFY_STOREFRONT_TOKEN`

Currently, these environment variables are excluded from Vercel preview builds to disable merch store node creation and speed up build times on non-merch related PRs.

### Dynamic open graph images

To develop a dynamic open graph image:

1. Run `yarn build` with both the `ASHBY_API_KEY` and `GITHUB_API_KEY` set.
1. In `gatsby/onPostBuild.ts`, temporarily comment out the following:
    ```
    if (process.env.VERCEL_GIT_COMMIT_REF !== 'master') return
    ```
1. Find the generated open graph image in `public/og-images/`

## Contributing

We <3 contributions big and small. In priority order (although everything is appreciated) with the most helpful first:

- Ask a [question in our community](https://posthog.com/questions)
- Submit [bug reports and give us feedback in the app](https://app.posthog.com/home#supportModal)! 
- Vote on features or get early access to beta functionality in our [roadmap](https://posthog.com/roadmap)
- Open a PR
    - Read [our instructions above](#quick-start) on developing PostHog.com locally
    - Read more [detailed instructions in our manual](https://posthog.com/handbook/engineering/posthog-com/developing-the-website)
    - For basic edits, go to the file in GitHub and click the edit button (pencil icon)
- Open [an issue](https://github.com/PostHog/posthog.com/issues/new) or [content idea](https://github.com/PostHog/posthog.com/issues/new?assignees=andyvan-ph&labels=content&template=blog-post-idea-template.md&title=%7BContent+type%7D+-+%7Btitle%7D)
