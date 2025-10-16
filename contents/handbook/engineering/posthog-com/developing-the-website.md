---
title: Developing the website
sidebar: Handbook
showTitle: true
---


> **TL;DR**
> - Text-only edits: use **Edit this page** → open a quick PR in GitHub.
> - Anything more complex: run the site locally or in Codespaces and open a PR.
> - **Product/landing page slides**: use the **Website request** flow (below) so Website can review/ship quickly while we keep consistency high.
> - **Vibe-coding** is fine for prototypes and exploration (see guidelines) — production merges still go through Website review.

You can contribute to the PostHog documentation, handbook, and blog in three ways:

1. **Quick edits via GitHub UI.** For any page with an **Edit this page** link, you can use the GitHub web editor. This is best for text-only edits and basic file manipulation (renames, moving files).
2. **Local/Codespaces development.** Run the website locally or in Codespaces, create a branch, commit changes, and open a PR. This is recommended for anything non-trivial. There are guidelines on how to get setup and do this below.
3. **Request changes via the Website team.** This is the recommended approach for creating new landing pages or altering product pages, where there are some non-obvious design elements that require a lot of context to work with. 

Details on how to get started with each of these options is below.

<details>
<summary>Method 1: Running with codespaces</summary>

### Creating/running the codespace

1. Open the [posthog.com repository](https://github.com/PostHog/posthog.com) in GitHub.
1. Click the **Code** button, then the **Codespaces** tab, then under the `...` menu, choose **New with options...**
    ![New with options...](https://res.cloudinary.com/dmukukwp6/image/upload/codespaces_new_ef2888e9b2.png)
1. Under **Machine type**, choose **4-core**.
    ![Configure machine type](https://res.cloudinary.com/dmukukwp6/image/upload/codespaces_configure_74499bde9c.png)
1. When the repo opens in Codespaces, it will install some things automatically.
    ![Codespaces installing dependencies](https://res.cloudinary.com/dmukukwp6/image/upload/codespaces_auto_setup_4db1dd65e0.png)

    When completed, press any key.
1. In terminal, type `yarn && yarn start` and hit [Enter].
    ![yarn start](https://res.cloudinary.com/dmukukwp6/image/upload/codespaces_yarn_b02a89ed6b.png)
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

> **Note:** After finishing changes on your branch, be sure to switch back to `master` so you don't inadvertently make future changes to your current branch.
> ![Checkout to master](https://res.cloudinary.com/dmukukwp6/image/upload/codespaces_checkout_master_4821478b5e.png)
> ![Switch to master](https://res.cloudinary.com/dmukukwp6/image/upload/codespaces_select_branch_58c9512cee.png)

### Stopping the server

1. Place your cursor into Terminal and type `Cmd+C` to stop the server.
1. In the bottom left corner of the window, click **Codespaces: [your codespace name]**, then **Stop current codespace.**

### Notes

If you plan on using this codespace frequently, disable **Auto-delete codespace** in the `...` menu under the **Code > Codespaces**  dropdown [in the repo](https://github.com/posthog/posthog.com).

Once you have Codespaces setup, you can easily start making edits. 
</details>

<details>
<summary>Method 2: Editing posthog.com locally</summary>

### Before you begin

In order to run the PostHog website locally, you need the following installed:

- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) – version control system
- [Node.js](https://nodejs.org/en/download/) (version 18.x) – server runtime
- [Yarn](https://classic.yarnpkg.com/en/docs/install) (version 1.x) – package manager for Node.js
- [Apple Rosetta](https://support.apple.com/en-gb/HT211861) (version 2) – dynamic binary translator for Apple silicon

If you are unfamiliar with using Git from the command line (or just prefer graphical interfaces), use the [GitHub Desktop app](https://desktop.github.com/).

You may also want to familiarize yourself with these resources:

- [GitHub's glossary of terms](https://docs.github.com/en/get-started/quickstart/github-glossary)
- [GitHub Desktop docs](https://docs.github.com/en/desktop/contributing-and-collaborating-using-github-desktop)
- [Visual Studio docs](https://code.visualstudio.com/docs)

### Cloning the posthog.com repository

The posthog.com codebase is on GitHub at https://github.com/PostHog/posthog.com.
To work on it locally, first you need to clone it to your disk:

- **via the command line**

    You can clone the codebase from the command line using the following command:

    ```bash
    git clone git@github.com:PostHog/posthog.com.git
    ```

- **via GitHub Desktop**

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

If you're using an Apple Silicon Mac (M1) then you'll need to run the following commands before using yarn:

```bash
rm -rf ./node_modules
brew install vips
```

Type the following into the command line and press return:

```bash
yarn
```

This runs the Yarn tool. When run standalone like this, it installs the dependency packages used by posthog.com. This may take a few minutes.

Once this command has finished executing, run the following:

```bash
yarn start
```

This runs the local clone of the website, which you can use to preview changes you make before pushing them live. It takes a bit of time for some file processing and compilation to take place, but once it's completed you can access the locally running version of posthog.com via by visiting `http://localhost:8001` in your web browser.

Any time you want to preview changes you are making to the local version of the website, all you have to do is run the `yarn start` again, wait for the command to finish running and then open `http://localhost:8001` in your web browser.

### Environment variables

Our website uses various APIs to pull in data from sites like GitHub (for contributors) and Ashby (our applicant tracking system). Without setting these environment variables, you may see various errors when building the site. Most of these errors are dismissible, and you can continue to edit the website.

If you're a core team member and need this data locally, you can:

1. Ask the [Website & Docs team](https://app.slack.com/client/TSS5W8YQZ/C01V9AT7DK4) files located for access to our Vercel account
1. Install the Vercel CLI
1. Run `vercel pull`
1. Open `.vercel/.env.development.local`
1. Copy a value and run in your terminal like: `export VARIABLE_NAME=VALUE`

### Finding the content to edit

Once you have cloned the repo, the `contents/` directory contains a few key areas:

* `docs/` = all of the documentation for PostHog's platform
* `handbook/` = the PostHog company handbook
* `blog/` = our blog posts

Inside each of these are a series of markdown files for you to edit.

### Creating a new Git branch

When editing locally, changes should be made on a new Git branch. Branches should be given an "at a glance" informative name. For example, `posthog-website-contribution`.

- **via the command line**
    You can create a new Git branch from the command line by running:

    ```bash
    git checkout -b [new-branch-name]
    ```

    For example:

    ```bash
    git checkout -b posthog-website-contribution
    ```

- **via GitHub Desktop**

    You can also create a new branch in GitHub Desktop by selecting the dropdown next to the **Current Branch** name and clicking **New Branch**.

    ![GitHub Desktop - new branch dropdown](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/docs/contribute/github-desktop-new-branch-dropdown.png)

    Then, in the dialog that follows, entering the new branch name.

    ![GitHub Desktop - new branch dialog](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/docs/contribute/visual-studio-code-new-branch-dialog.png)

    Once you have a new branch, you can make changes to the site in your IDE, save them to the branch, and open a PR. 
</details>

<details>
<summary>Method 3: Briefing the website team</summary>
Some parts of the site have non-obvious design elements, such as responsive layouts, which are currently best handled by the Website team. If you want to make changes to these sections, or create wholly new pages with unique layouts, you should request them from the Website team. 

We have a template setup to help you brief the team directly. You should aim to give the Website team at least two weeks notice of your request if possible and should provide a full draft of the content you want on the new page. All new web requests are tagged with the `new landing page` tag so you can filter them easily. 

If you have questions about a brief, please ask in [the #posthogdotcom Slack channel](https://posthog.slack.com/archives/C08UABF7PB7).

</details>

## How PostHog.com works

PostHog.com is built and maintained in-house by the <SmallTeam slug="brand" />. You've probably never seen a Gatsby.js site like this before. <TeamMember name="Eli Kinsey" photo /> is the mastermind behind how the site is structured.

For more context, [read why we designed our website to look like an operating system](/blog/why-os).

## The "operating system"

1. At the top level, `gatsby-browser.tsx` loads `<Wrapper />`
1. `<Wrapper />` renders the chrome of the "operating system"
    1. `<TaskBarMenu />` – the MacOS-style menu bar
    1. `<Desktop />` – the desktop app icons and desktop background
    1. `<AppWindow />` – the chrome for each app and where the content renders
    1. `<CookieBannerToast />`
1. `<AppWindow />` loads `<WindowProvider />` and `<WindowContainer />`.
    - This contains the window's top bar with the minimize, maximize, and close buttons. It also supports window resizing.
    - Inside here is where the contents of each app renders

## The apps

Each "app" is simply a page like a normal Gatsby site. There are a handful of apps:

1. `<ReaderView />` – used for all long-form content like the docs, handbook, blog
1. `<Editor />` – a WYSIWYG page editor
1. `<Explorer />` – an OS-style file explorer
1. `<Inbox />` – an email-like app
1. `<Presentation />` – a slide deck

Each app can reference shared components like `<HeaderBar />` which contains the necessary navigational elements (like the back button, search, and filters).

Let's look at a product page to see how it uses the `<Presentation />` template.

### Example: `posthog.com/session-replay`

This page (`/src/pages/session-replay/index.tsx`) includes two critical pieces:

1. `<SlidesTemplate />` – the views where the content will display
1. Defines the `PRODUCT_HANDLE`
1. Specifies which slides should appear in this presentation using `createSlideConfig`

`<SlidesTemplate />` loads up all the various templates needed (like `<OverviewComponent />`, `<CustomersSlide />`, `<FeaturesSlide />`) and sources the content using the `useProduct` hook.

**`useProduct`** hook

Each product's data is defined in a JSON file like:

**`/src/hooks/productData/session_replay.tsx`**

When the `session_replay` handle is passed into `useProduct`, it looks up the product's data like:

-   icon
-   color
-   category
-   SEO data
-   screenshots array
-   feature customers
-   features array
-   feature comparison chart
-   etc.

> Note: The <SmallTeam slug="billing" /> maintains a billing API that contains pricing tiers and entitlements. This is how pricing data and usage tiers stay in sync between the website and product. The plan is to eventually move the product data into the billing API so there's a single source of truth for every product.

---

## Services we use

| Service       | Purpose                                                |
| ------------- | ------------------------------------------------------ |
| Vercel        | Hosting                                                |
| Gatsby        | Static site framework                                  |
| GitHub        | Source code repository                                 |
| Ashby (API)   | Applicant tracking system                              |
| Algolia (API) | Site search                                            |
| Strapi        | Headless CMS for community profiles and changelog data |
| PostHog       | Analytics, feature flags                               |
| Inkeep        | AI-powered community answers                           |

![Diagram of PostHog.com](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/docs/contribute/website-diagram.png)

Website content is stored in two places:

1. Markdown/MDX files (in the [GitHub repo](https://github.com/posthog/posthog.com/)) - _most website content_
    - Docs, handbook, most pages
1. Strapi - _user-generated content_
    - Community forum posts, community profiles

### Markdown details

#### Frontmatter

Most PostHog pages utilize frontmatter as a way of providing additional data to the page. Available frontmatter varies based on the template the page uses. Templates are determined based on the folder the file resides in:

##### Blog

Markdown files located in `/contents/blog`

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

- `date`: the date the blog was posted
- `title`: the title that appears at the top of the blog post and on the blog listing page
- `rootPage`: necessary for listing all blog posts on /blog. should always be set to `/blog`
- `author`: the author(s) of the post. correlates to your handle located in /src/data/authors.json
- `featuredVideo`: the iframe src of the video that appears at the top of the post. replaces the featured image on post pages.
- `featuredImage`: the Cloudinary URL of the image that appears at the top of the post and on the blog listing page
- `featuredImageType`: `standard` | `full` - determines the width of the featured image on the blog post
- `category`: the broader category the post belongs to. one of the following:
  - <CategoryData />
- `tags`: the more specific tag(s) the post belongs to. an array containing any number of the following:
  - <CategoryData type="tags" />
- `seo`: object containing SEO metadata:
  - `metaTitle`: String
  - `metaDescription`: String

##### Tutorials

Markdown files located in /contents/tutorials

```markdown
---
date: 2022-02-14
title: How to filter out internal users
author: ["joe-martin"]
featuredTutorial: false
featuredVideo: https://www.youtube-nocookie.com/embed/2bptTniYPGc
tags: ['filters', 'settings']
---
```

- `date`: the date the tutorial was posted
- `title`: the title that appears at the top of the tutorial and on the tutorial listing page
- `author`: the author(s) of the tutorial. Correlates to your handle located in /src/data/authors.json
- `featuredTutorial`: determines if tutorial should be featured on the homepage
- `featuredVideo`: the iframe src of the video that appears at the top of the tutorial
- `featuredImage`: the Cloudinary URL of the image that appears at the top of the tutorial and on the tutorial listing page
- `tags`: the tag(s) the tutorial belongs to. an array containing any number of the following:
  - <TutorialTags />
- `seo`: object containing SEO metadata:
  - `metaTitle`: String
  - `metaDescription`: String

##### Docs & Handbook

Markdown files located in /contents/docs and /contents/handbook

```markdown
---
title: Contribute to the website: documentation, handbook, and blog
---
```

- `title`: the title that appears at the top of the handbook / doc page
- `seo`: object containing SEO metadata:
  - `metaTitle`: String
  - `metaDescription`: String

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
- Values for `column1` and `column2` can be: `{true}` | `{false}` | `"Text string"`
- `feature` is required but `description` can be omitted (only if not using that column for the entire table)

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

- `title`: the title of the case study
- `customer`: the name of the customer
- `logo`: the customer logo
- `featuredImage`: the Cloudinary URL of the image that appears in the card on the customers listing page
- `industries`: a list of industries that apply to the company
- `users`: a list of user types that use the company's product
- `toolsUsed`: a list of highlighted PostHog tools used by the company
- `seo`: object containing SEO metadata:
  - `metaTitle`: String
  - `metaDescription`: String

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

- `title`: the title that appears at the top of the page
- `showTitle`: `false` - if omitted, the title will appear at the top of the page
- `width`: `sm` | `md` | `lg` | `full` - determines the width of the page
- `noindex`: `true` | `false` - determines whether to index the page or not
- `seo`: object containing SEO metadata:
  - `metaTitle`: String
  - `metaDescription`: String


You can often refer to the source of existing pages for more examples, but if in doubt, you can always [ask for help](https://app.posthog.com/home#supportModal).

#### Images/GIFs

If you need to upload images, you can [upload them to Cloudinary](/handbook/engineering/posthog-com/assets)

To include an image in a markdown file, you can use Cloudinary URLs, like so:

```markdown
![Twin Peaks](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/handbook/engineering/images/02/IMG_4294-scaled.jpg)
```

In this case, `Twin Peaks` is the alt-text applied to the image.

#### Links to/from the navigation

Once you've made a new markdown file, you should link to it from the sidebar where appropriate.

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

- **via the command line**

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

- **via GitHub Desktop**

    Files that have been changed can be viewed within GitHub Desktop along with a diff of the specific change.

    ![Viewing changes in GitHub Desktop](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/docs/contribute/viewing-changes-in-github-desktop.png)

    Select the files that you want to be part of the commit by ensuring the checkbox to the left of the file is checked within GitHub Desktop. Then, write a short descriptive commit message and click the **Commit to...** button.

    ![Making a commit in GitHub Desktop](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/docs/contribute/commit-in-github-desktop.gif)

## Push changes to GitHub

In order to request that the changes you have made are merged into the main website branch you must first push them to GitHub.

- **via the command line**

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

- **via GitHub Desktop**

    Once you have committed the changes you want to push to GitHub, click the **Push origin** button.

    ![Push to origin from GitHub Desktop](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/docs/contribute/push-to-origin-github-desktop.gif)

## Create a pull request

Create a pull request to request that your changes be merged into the main branch of the repository.

- **via the command line**

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

- **via GitHub Desktop**

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

Because Vercel charges per seat, we don't automatically invite all team members to our Vercel account. If your build fails, you can run `yarn build` locally to see what's erroring out. If nothing is erroring locally, it's likely the build timed out in Vercel. The Website & Docs team monitors for failed builds, so they'll re-run it for you. If the build is urgent, give a shout in #team-website-and-docs and someone with Vercel access can trigger a rebuild for you.

![Preview branch](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/docs/contribute/preview-branch.png)

> **Note:** Checks are run automatically for PostHog org members and previous contributors. First time contributors will require authorization for checks to be run by a PostHog org member.

## Deployment

To get changes into production, the website deploys automatically from `master`. The build takes up to an hour, but can be delayed if other preview builds are in the queue.

#### Acknowledgements

This website is based on [Gatsby](https://gatsbyjs.org) and is hosted with [Vercel](https://vercel.com).
