---
title: Developing the website
sidebar: Handbook
showTitle: true
---

You can contribute to the PostHog documentation, handbook, and blog in two ways:

1. Create a pull request in GitHub for any page that has an **Edit this page** link on it. In this situation you must edit the page using the GitHub web editor interface. This method is suitable for text-only edits and basic file manipulation, such as renaming.

2. Run the posthog.com website in development and make changes there by creating a branch of the master codebase, committing changes to that branch and raising a pull request to merge those changes. This is the recommended method as it allows you to quickly preview your changes, as well as perform more complex changes easily.

Below, we'll explain the two options for option two.

## Option 1: Running with Codespaces

### Creating/running the Codespace

1. Open the [posthog.com repository](https://github.com/PostHog/posthog.com) in GitHub.
1. Click the **Code** button, then the **Codespaces** tab, then under the `...` menu, choose **New with options...**

    ![New with options...](https://res.cloudinary.com/dmukukwp6/image/upload/codespaces_new_ef2888e9b2.png)

1. Under **Machine type**, choose **4-core**.

    ![Configure machine type](https://res.cloudinary.com/dmukukwp6/image/upload/codespaces_configure_74499bde9c.png)

1. When the repo opens in Codespaces, it will install some things automatically.

    ![Codespaces installing dependencies](https://res.cloudinary.com/dmukukwp6/image/upload/codespaces_auto_setup_4db1dd65e0.png)

    When completed, press any key.

1. In terminal, type `pnpm install && pnpm start` and hit [Enter].

    ![pnpm start](https://res.cloudinary.com/dmukukwp6/image/upload/codespaces_yarn_b02a89ed6b.png)

    - This will take a while. The last step of the process is "Building development bundle" which will take a few minutes on its own.
    - You may see a dialog that says, "Your application running on port 8001 is available." Don't be enticed by the big green button quite yet.

1. Once you see <code><span class="text-green">success</span> Writing page-data.json files...</code>, you can click the green **Open in browser** button which will open the site at [http://localhost:8001](http://localhost:8001).

    You can also click the **Ports** tab to access the URL where you can preview the site. Cmd + click the URL seen here.

    ![port](https://res.cloudinary.com/dmukukwp6/image/upload/port_ec6ab549ce.png)

### Committing and pushing changes

Use the built-in Git tab in VS Code to commit and push your changes.

1. From the Git source control `...` menu, choose **Checkout to...** to create a new branch.

    ![Checkout to...](https://res.cloudinary.com/dmukukwp6/image/upload/codespaces_checkout_e634e2c0c0.png)

1. Type a new branch name and press enter.

    ![Branch name](https://res.cloudinary.com/dmukukwp6/image/upload/codespaces_branch_name_89ff5c8314.png)

1. Now you can commit changes to your new branch. Type a commit message and use `Cmd` + `Enter` (or push the big green button).

    ![Commit message](https://res.cloudinary.com/dmukukwp6/image/upload/codespaces_commit_cbe6e34635.png)

1. If you see the dialog below, choose **Always** to always stage all files you've changed. (Otherwise, you'll need to hit the `+` button next to each file you want to commit.)

    ![Stage all](https://res.cloudinary.com/dmukukwp6/image/upload/codespaces_commit_directly_f9d811d6d3.png)

1. Now that your changes are committed, it's time to publish them to GitHub.

    ![Publish changes](https://res.cloudinary.com/dmukukwp6/image/upload/codespaces_publish_81f21426e4.png)

> **Note:** After finish changes on your branch, be sure to switch back to `master` so you don't inadvertently make future changes to your current branch.
>
> ![Checkout to master](https://res.cloudinary.com/dmukukwp6/image/upload/codespaces_checkout_master_4821478b5e.png) > ![Switch to master](https://res.cloudinary.com/dmukukwp6/image/upload/codespaces_select_branch_58c9512cee.png)

### Stopping the server

1. Place your cursor into Terminal and type `Cmd+C` to stop the server.
1. In the bottom left corner of the window, click **Codspaces: [your codespace name]**, then **Stop current codespace.**

### Notes

If you plan on using this codespace frequently, disable **Auto-delete codespace** in the `...` menu under the **Code > Codespaces** dropdown [in the repo](https://github.com/posthog/posthog.com).

## Option 2: Editing posthog.com locally

### Before you begin

In order to run the PostHog website locally, you need the following installed:

-   [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) – version control system
-   [Node.js](https://nodejs.org/en/download/) (version 22.x) – server runtime
-   [pnpm](https://pnpm.io/installation) (version 10.x) – package manager for Node.js
-   [Apple Rosetta](https://support.apple.com/en-gb/HT211861) (version 2) – dynamic binary translator for Apple silicon

If you are unfamiliar with using Git from the command line (or just prefer graphical interfaces), use the [GitHub Desktop app](https://desktop.github.com/).

You may also want to familiarize yourself with these resources:

-   [GitHub's glossary of terms](https://docs.github.com/en/get-started/quickstart/github-glossary)
-   [GitHub Desktop docs](https://docs.github.com/en/desktop/contributing-and-collaborating-using-github-desktop)
-   [Visual Studio docs](https://code.visualstudio.com/docs)

### Cloning the posthog.com repository

The posthog.com codebase is on GitHub at https://github.com/PostHog/posthog.com.
To work on it locally, first you need to clone it to your disk:

-   **via the command line**

    You can clone the codebase from the command line using the following command:

    ```bash
    git clone git@github.com:PostHog/posthog.com.git
    ```

-   **via GitHub Desktop**

    You can also clone the repository with [GitHub Desktop](https://desktop.github.com/) installed, from the [posthog.com repository page](https://github.com/PostHog/posthog.com), click the **Code** button and select **Open with GitHub Desktop** from the dropdown that appears.

    ![Open in GitHub Desktop](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/docs/contribute/open-in-github-desktop.png)

    You will then be prompted by the browser to confirm if you want to open the GitHub Desktop application. Select the affirmative action that has text such as **Open GitHub Desktop**.

    Once GitHub Desktop has opened you will be prompted to confirm the repository that is being cloned and the location on disk where you wish the code to be stored.

    ![GitHub Desktop clone to dialog](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/docs/contribute/github-desktop-clone-repo.png)

    Click **Clone** to clone the posthog.com repository to your local disk.

    ![GitHub Desktop cloning to disk](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/docs/contribute/github-desktop-cloning-to-disk.png)

    Once the clone has completed the GitHub Desktop interface will change to the following:

    ![GitHub Desktop cloned successfully](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/docs/contribute/github-desktop-cloned.png)

    To view the code for the website click **Open in Visual Studio Code**. Dialogs may appear around permissions and trust as you open Visual Studio Code.

    Once you have Visual Studio Code open, select the **Terminal** menu option. Within the dropdown select **New Terminal**. This will open a new terminal window within Visual Studio Code:

    ![Visual Studio Code terminal](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/docs/contribute/visual-studio-code-terminal.png)

    Don't worry! We only need to run a few commands in the command line.

### Running posthog.com locally

If you're using an Apple Silicon Mac (M1+) then you'll need to run the following commands before using pnpm:

```bash
rm -rf ./node_modules
brew install vips
```

Type the following into the command line and press return:

```bash
pnpm install
```

This installs the dependency packages used by posthog.com. This may take a few minutes.

After initial setup, use the following command to start the development server:

```bash
pnpm install && pnpm start
```

This runs the local clone of the website, which you can use to preview changes you make before pushing them live. It takes a bit of time for some file processing and compilation to take place, but once it's completed you can access the locally running version of posthog.com via by visiting `http://localhost:8001` in your web browser.

Any time you want to preview changes you are making to the local version of the website, all you have to do is run the `pnpm start` again, wait for the command to finish running and then open `http://localhost:8001` in your web browser.

**Troubleshooting**

If the server fails to start, the first troubleshooting step is to clear cache. You can do this (and start the server again) by running:

```bash
pnpm clean && mkdir .cache && pnpm install && pnpm start
```

### Minimal mode

For faster builds, you can run in minimal mode:

```bash
pnpm build:minimal
```

Minimal mode only builds:
- Docs pages (`/docs/*`)
- Handbook pages (`/handbook/*`)
- Blog/content posts (`/blog/*`, `/tutorials/*`, `/library/*`, `/founders/*`, `/product-engineers/*`, `/newsletter/*`, `/spotlight/*`, `/customers/*`)
- All pages in `src/pages/` (product pages, pricing, etc.)

Everything else (apps, CDP, templates, jobs, API docs, SDK references, pagination/category/tag pages) won't exist - they'll 404. Next/previous navigation links and GitHub data for roadmaps/jobs will also be absent. Sourcemap generation is disabled.

### Environment variables

Our website uses various APIs to pull in data from sites like GitHub (for contributors) and Ashby (our applicant tracking system). Without setting these environment variables, you may see various errors when building the site. Most of these errors are dismissible, and you can continue to edit the website.

If you need a specific environment development, ask in <PrivateLink url="https://posthog.slack.com/archives/C08UABF7PB7">#posthogdotcom</PrivateLink>.

### Finding the content to edit

Once you have cloned the repo, the `contents/` directory contains a few key areas:

-   `docs/` = all of the documentation for PostHog's platform
-   `handbook/` = the PostHog company handbook
-   `blog/` = our blog posts

Inside each of these are a series of markdown files for you to edit.

### Posts and blog filtering

There are two ways to filter posts by tag:

1. **Query param** — Add a `post_tags` query param to the URL, e.g., `/posts?post_tags=Comparisons`. This works on the main posts listing and allows saving/sharing filtered URLs.

2. **Static tag pages** — For SEO purposes, we generate static pages at `/{category}/{tag}`, e.g., `/blog/session-replay`. These are generated at build time in `gatsby/createPages.ts`.

#### Hidden from index

Some categories and tags are intentionally hidden from the main posts index view. They still appear when you filter directly to that category or tag.

**Categories hidden from index:** `customers`, `spotlight`, `changelog`, `comparisons`, `notes`, `repost`

**Tags hidden from index:** `Comparisons`

Posts can also set `hideFromIndex: true` in their frontmatter to be excluded.

These exclusions are defined in `src/components/Edition/Posts.tsx` and `src/templates/BlogPost.tsx`.

## Making edits

### Creating a new Git branch

When editing locally, changes should be made on a new Git branch. Branches should be given an "at a glance" informative name. For example, `posthog-website-contribution`.

-   **via the command line**
    You can create a new Git branch from the command line by running:

    ```bash
    git checkout -b [new-branch-name]
    ```

    For example:

    ```bash
    git checkout -b posthog-website-contribution
    ```

-   **via GitHub Desktop**

    You can also create a new branch in GitHub Desktop by selecting the dropdown next to the **Current Branch** name and clicking **New Branch**.

    ![GitHub Desktop - new branch dropdown](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/docs/contribute/github-desktop-new-branch-dropdown.png)

    Then, in the dialog that follows, entering the new branch name.

    ![GitHub Desktop - new branch dialog](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/docs/contribute/visual-studio-code-new-branch-dialog.png)

    Once you have a new branch, you can make changes.

### Markdown details

#### Frontmatter

Most PostHog pages utilize frontmatter as a way of providing additional data to the page. Available frontmatter varies based on the template the page uses. Templates are determined based on the folder the file resides in:

##### Blog

Markdown files located in `/contents/blog``

```markdown
---
date: 2021-11-16
title: The state of plugins on PostHog
rootPage: /blog
author: ["yakko-majuri"]
featuredVideo: https://www.youtube-nocookie.com/embed/TCyCryTiTbQ
featuredImage: https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/blog/running-content.png
featuredImageType: full
category: Guides
tags: ["Using PostHog", "Privacy"]
seo: {
    metaTitle: Overview of PostHog Plugins
    metaDescription: Learn about the current state of plugins on PostHog and get valuable insights into their functionality and performance.
}
---
```

-   `date`: the date the blog was posted
-   `title`: the title that appears at the top of the blog post and on the blog listing page
-   `rootPage`: necessary for listing all blog posts on /blog. should always be set to `/blog`
-   `author`: the author(s) of the post. correlates to your handle located in /src/data/authors.json
-   `featuredVideo`: the iframe src of the video that appears at the top of the post. replaces the featured image on post pages.
-   `featuredImage`: the Cloudinary URL of the image that appears at the top of the post and on the blog listing page
-   `featuredImageType`: `standard` | `full` - determines the width of the featured image on the blog post
-   `category`: the broader category the post belongs to. one of the following:
    -   <CategoryData />
-   `tags`: the more specific tag(s) the post belongs to. an array containing any number of the following:
    -   <CategoryData type="tags" />
-   `seo`: object containing SEO metadata:
    -   `metaTitle`: String
    -   `metaDescription`: String

##### Tutorials

Markdown files located in /contents/tutorials

```markdown
---
date: 2022-02-14
title: How to filter out internal users
author: ['joe-martin']
featuredTutorial: false
featuredVideo: https://www.youtube-nocookie.com/embed/2bptTniYPGc
tags: ['filters', 'settings']
---
```

-   `date`: the date the tutorial was posted
-   `title`: the title that appears at the top of the tutorial and on the tutorial listing page
-   `author`: the author(s) of the tutorial. Ccrrelates to your handle located in /src/data/authors.json
-   `featuredTutorial`: determines if tutorial should be featured on the homepage
-   `featuredVideo`: the iframe src of the video that appears at the top of the tutorial
-   `featuredImage`: the Cloudinary URL of the image that appears at the top of the tutorial and on the tutorial listing page
-   `tags`: the tag(s) the tutorial belongs to. an array containing any number of the following:
    -   <TutorialTags />
-   `seo`: object containing SEO metadata:
    -   `metaTitle`: String
    -   `metaDescription`: String

##### Docs & Handbook

Markdown files located in /contents/docs and /contents/handbook

```markdown
---
title: Contribute to the website: documentation, handbook, and blog
---
```

-   `title`: the title that appears at the top of the handbook / doc page
-   `seo`: object containing SEO metadata:
    -   `metaTitle`: String
    -   `metaDescription`: String

##### Comparison pages

Create a table on a "PostHog vs..." page with the following components. (You can see examples of how this is used [in this pull request](https://github.com/PostHog/posthog.com/pull/7001).)

**Import the components at the top of the post content (after frontmatter):**

```
import { ComparisonTable } from 'components/ComparisonTable'
import { ComparisonRow } from 'components/ComparisonTable/row'
import { ComparisonHeader } from 'components/ComparisonTable/header'
```

**Create a table like:**

```
<ComparisonTable column1="Company name 1" column2="Company name 2">
  <ComparisonHeader category="Optional header row" />
  <ComparisonRow column1={true} column2="Text" feature="Feature name" description="Feature description" />
</ComparisonTable>
```

In `ComparisonRow`:

-   Values for `column1` and `column2` can be: `{true}` | `{false}` | `"Text string"`
-   `feature` is required but `description` can be omitted (only if not using that column for the entire table)

##### Customers

Markdown files located in `/contents/customers`

```markdown
---
title: How Hasura improved conversion rates by 10-20% with PostHog
customer: Hasura
logo: https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/customers/hasura/logo.svg
featuredImage: https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/customers/hasura/featured.jpg
industries:
    - Developer tool
users:
    - Engineering
    - UI
    - UX
    - Marketing teams
toolsUsed:
    - Funnel Analysis
    - Session Recording
    - Self-Hosting
---
```

-   `title`: the title of the case study
-   `customer`: the name of the customer
-   `logo`: the customer logo
-   `featuredImage`: the Cloudinary URL of the image that appears in the card on the customers listing page
-   `industries`: a list of industries that apply to the company
-   `users`: a list of user types that use the company's product
-   `toolsUsed`: a list of highlighted PostHog tools used by the company
-   `seo`: object containing SEO metadata:
    -   `metaTitle`: String
    -   `metaDescription`: String

##### Plain

If the file doesn't reside in one of the above folders, it uses the plain template.

```markdown
---
title: Example Components
showTitle: false
width: lg
noindex: true
---
```

-   `title`: the title that appears at the top of the page
-   `showTitle`: `false` - if omitted, the title will appear at the top of the page
-   `width`: `sm` | `md` | `lg` | `full` - determines the width of the page
-   `noindex`: `true` | `false` - determines whether to index the page or not
-   `seo`: object containing SEO metadata:
    -   `metaTitle`: String
    -   `metaDescription`: String

You can often refer to the source of existing pages for more examples, but if in doubt, you can always [ask for help](https://app.posthog.com/home#supportModal).

#### Adding rich media

Add images or videos to your post by [uploading them to Cloudinary](/handbook/engineering/posthog-com/assets) and including the URL in your Markdown file. Be sure to follow our [best practices](/handbook/content/posthog-style-guide#adding-media) when adding media.

#### Links to/from the navigation

If you've created a new markdown file (for use in docs or handbook), you should link to it from the sidebar where appropriate.

The sidebar is generated from `src/navs/index.js`.

#### Redirects

Redirects are managed in `vercel.json` which is located in the root folder.

To declare a new redirect, open `vercel.json` and add an entry to the `redirects` list:

```
{ "source": "/docs/contributing/stack", "destination": "/docs/contribute/stack" }
```

The default HTTP status code is 308 (permanent), but if the redirect should be temporary (307), it can be updated like this:

```
{ "source": "/docs/contributing/stack", "destination": "/docs/contribute/stack", "permanent": false }
```

## Committing changes

It's best to create commits that are focused on one specific area. For example, create one commit for textual changes and another for functional ones. Another example is creating a commit for changes to a section of the handbook and a different commit for updates to the documentation. This helps the pull request review process and also means specific commits can be [cherry picked](https://git-scm.com/docs/git-cherry-pick).

-   **via the command line**

    First, stage your changes:

    ```bash
    git add [path-to-file]
    ```

    For example:

    ```bash
    git add contents/docs/contribute/updating-documentation.md
    ```

    Once all the files that have been changed are staged, you can perform the commit:

    ```bash
    git commit -m '[short commit message]'
    ```

    For example:

    ```bash
    git commit -m 'Adding details on how to commit'
    ```

-   **via GitHub Desktop**

    Files that have been changed can be viewed within GitHub Desktop along with a diff of the specific change.

    ![Viewing changes in GitHub Desktop](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/docs/contribute/viewing-changes-in-github-desktop.png)

    Select the files that you want to be part of the commit by ensuring the checkbox to the left of the file is checked within GitHub Desktop. Then, write a short descriptive commit message and click the **Commit to...** button.

    ![Making a commit in GitHub Desktop](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/docs/contribute/commit-in-github-desktop.gif)

## Push changes to GitHub

In order to request that the changes you have made are merged into the main website branch you must first push them to GitHub.

-   **via the command line**

    ```bash
    git push origin [branch-name]
    ```

    For example:

    ```bash
    git push origin posthog-website-contribution
    ```

    When this is done, the command line will show output similar to the following:

    ```bash
    posthog-website-contribution $ git push origin posthog-website-contribution
    Total 0 (delta 0), reused 0 (delta 0), pack-reused 0
    remote:
    remote: Create a pull request for 'posthog-website-contribution' on GitHub by visiting:
    remote:      https://github.com/PostHog/posthog.com/pull/new/posthog-website-contribution
    remote:
    To github.com:PostHog/posthog.com.git
    * [new branch]        posthog-website-contribution -> posthog-website-contribution
    ```

    This output tells you that you can create a pull request by visiting a link. In the case above, the link is `https://github.com/PostHog/posthog.com/pull/new/posthog-website-contribution`. Follow the link to complete your pull request.

-   **via GitHub Desktop**

    Once you have committed the changes you want to push to GitHub, click the **Push origin** button.

    ![Push to origin from GitHub Desktop](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/docs/contribute/push-to-origin-github-desktop.gif)

## Create a pull request

Create a pull request to request that your changes be merged into the main branch of the repository.

-   **via the command line**

    Navigate to the link shown when you push your branch to GitHub. For example, `https://github.com/PostHog/posthog.com/pull/new/posthog-website-contribution` shown below:

    ```bash
    posthog-website-contribution $ git push origin posthog-website-contribution
    Total 0 (delta 0), reused 0 (delta 0), pack-reused 0
    remote:
    remote: Create a pull request for 'posthog-website-contribution' on GitHub by visiting:
    remote:      https://github.com/PostHog/posthog.com/pull/new/posthog-website-contribution
    remote:
    To github.com:PostHog/posthog.com.git
    * [new branch]        posthog-website-contribution -> posthog-website-contribution
    ```

-   **via GitHub Desktop**

    With the branch published, click the **Create pull request** button.

    ![pull request from GitHub Desktop](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/docs/contribute/github-desktop-pull-request.png)

    This will open up a page on github.com in your default web browser.

If you are pushing to an existing branch, navigate to the [posthog.com repo](https://github.com/posthog/posthog.com) and switch to the new branch using the dropdown:

![GitHub branch switcher](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/docs/contribute/github-branch-switcher.png)

Then, open the **Contribute** dropdown and click the **Open pull request** button.

Make the pull request title descriptive name and complete the detail requested in the body.

If you know who you would like to review the pull request, select them in the **Reviewers** dropdown.

## Preview branch

After a series of checks are run (to ensure nothing in your pull request breaks the website), Vercel will generate a preview link available in the Vercel bot comment. This includes all of your changes, so you can preview before your pull request is merged.

An initial build can take up to 50 minutes to run. After the initial build, subsequent builds should complete in under ~15 minutes. We're limited to two concurrent builds, so if there's a backlog, this process can take longer.

Because Vercel charges per seat, we don't automatically invite all team members to our Vercel account. If your build fails, you can run `pnpm build` locally to see what's erroring out. If nothing is erroring locally, it's likely the build timed out in Vercel. The Website & Docs team monitors for failed builds, so they'll re-run it for you. If the build is urgent, give a shout in #team-website-and-docs and someone with Vercel access can trigger a rebuild for you.

![Preview branch](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/docs/contribute/preview-branch.png)

> **Note:** Checks are run automatically for PostHog org members and previous contributors. First time contributors will require authorization for checks to be run by a PostHog org member.

## Deployment

To get changes into production, the website deploys automatically from `master`. The build takes up to an hour, but can be delayed if other preview builds are in the queue.

## Product interest tracking for onboarding

We track which products users have shown interest in by visiting product landing pages or docs. This data is stored using PostHog's `cookie_persisted_properties` feature, making it available across all posthog.com subdomains (including app.posthog.com) for onboarding personalization.

### How it works

When a user visits a product-specific page (like `/product-analytics` or `/docs/session-replay`), we record that product's slug using `posthog.register()` with the property `prod_interest`. This property is configured in `cookie_persisted_properties` in `gatsby/onPreBoostrap.ts`, which means it gets stored in a cross-subdomain cookie automatically.

To read the interests, we use `posthog.get_property('prod_interest')` which returns an array of product slugs like `["product-analytics", "session-replay"]`.

We always store the most recent interests last in the array.

### Code structure

The tracking is implemented in:

- `src/lib/productInterest.ts` - Core utilities using `posthog.get_property()` and `posthog.register()`
- `src/hooks/useProductInterest.ts` - React hooks for tracking
- `src/components/Products/Slides/SlidesTemplate.tsx` - Integration for product landing pages
- `src/templates/Handbook.tsx` - Integration for docs pages

### Reading interests on app.posthog.com

Since this uses PostHog's built-in cookie persistence, you can read the interests on any subdomain where PostHog is initialized:

```javascript
const interests = posthog.get_property('prod_interest') || []
// interests = ["product-analytics", "session-replay", ...]
```

### Expanding usage

Everything is usually automatically handled because our website is well-structured but if you want to start tracking interest for new products you'll need to add a new entry to `PRODUCT_SLUGS` in `src/lib/productInterest.ts`

#### Acknowledgements

This website is based on [Gatsby](https://gatsbyjs.org) and is hosted with [Vercel](https://vercel.com).
