---
title: Developing the website
sidebar: Handbook
showTitle: true
---

You can contribute to the PostHog documentation, handbook, and blog in two ways:

1. You can create a pull request in GitHub for any page that has an **Edit this page** link on it. In this situation you must edit the page using the GitHub web editor interface. This method is suitable for text-only edits and basic file manipulation, such as renaming.
2. You can run the posthog.com website locally and make changes there by creating a branch of the master codebase, committing changes to that branch and raising a pull request to merge those changes. This is the recommended method as it allows you to quickly preview your changes, as well as perform more complex changes easily.

Below, we'll explain how to set up option two.

## Editing posthog.com locally

### Before you begin

In order to run the PostHog website locally, you need the following installed:

- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) – version control system
- [Node.js](https://nodejs.org/en/download/) – server runtime
- [Yarn](https://classic.yarnpkg.com/en/docs/install) (version 1.x) – package manager for Node.js

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

    ![Open in GitHub Desktop](../../../images/docs/contribute/open-in-github-desktop.png)

    You will then be prompted by the browser to confirm if you want to open the GitHub Desktop application. Select the affirmative action that has text such as **Open GitHub Desktop**.

    Once GitHub Desktop has opened you will be prompted to confirm the repository that is being cloned and the location on disk where you wish the code to be stored.

    ![GitHub Desktop clone to dialog](../../../images/docs/contribute/github-desktop-clone-repo.png)

    Click **Clone** to clone the posthog.com repository to your local disk.

    ![GitHub Desktop cloning to disk](../../../images/docs/contribute/github-desktop-cloning-to-disk.png)

    Once the clone has completed the GitHub Desktop interface will change to the following:

    ![GitHub Desktop cloned successfully](../../../images/docs/contribute/github-desktop-cloned.png)

    To view the code for the website click **Open in Visual Studio Code**. Dialogs may appear around permissions and trust as you open Visual Studio Code.

    Once you have Visual Studio Code open, select the **Terminal** menu option. Within the dropdown select **New Terminal**. This will open a new terminal window within Visual Studio Code:

    ![Visual Studio Code terminal](../../../images/docs/contribute/visual-studio-code-terminal.png)

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

The runs the local clone of the website, which you can use to preview changes you make before pushing them live. It takes a bit of time for some file processing and compilation to take place, but once it's completed you can access the locally running version of posthog.com via by visiting `http://localhost:8001` in your web browser.

Any time you want to preview changes you are making to the local version of the website, all you have to do is run the `yarn start` again, wait for the command to finish running and then open `http://localhost:8001` in your web browser.

### Environment variables

Our website uses various APIs to pull in data from sites like GitHub (for contributors) and Ashby (our applicant tracking system). Without setting these environment variables, you may see various errors when building the site. Most of these errors are dismissible, and you can continue to edit the website.

If you're a core team member working on a portion of the site where having this data is useful, you can access some of the main environment variables [here](https://github.com/PostHog/company-internal/blob/master/website-api-keys.md).

Note: If you have a Gatsby account (you'd know if you do), rather than running the site with `yarn start`, you should instead use `gatsby start` which will automatically load in all environment variables directly from Gatsby. (You'll need to set up the Gatsby CLI and authenticate first.)

### Finding the content to edit

Once you have cloned the repo, the `contents/` directory contains a few key areas:

* `docs/` = all of the documentation for PostHog's platform
* `handbook/` = the PostHog company handbook
* `blog/` = our blog posts

Inside each of these are a series of markdown files for you to edit.

## Making edits

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

    ![GitHub Desktop - new branch dropdown](../../../images/docs/contribute/github-desktop-new-branch-dropdown.png)

    Then, in the dialog that follows, entering the new branch name.

    ![GitHub Desktop - new branch dialog](../../../images/docs/contribute/visual-studio-code-new-branch-dialog.png)

    Once you have a new branch, you can make changes.

### Markdown details

#### Frontmatter

Most PostHog pages utilize frontmatter as a way of providing additional data to the page. Available frontmatter varies based on the template the page uses. Templates are determined based on the folder the file resides in:

##### Blog

Markdown files located in /contents/blog

```markdown
---
date: 2021-11-16
title: The state of plugins on PostHog
rootPage: /blog
author: ["yakko-majuri"]
featuredImage: ../images/blog/running-content.png
featuredImageType: full
---
```

- `date`: the date the blog was posted
- `title`: the title that appears at the top of the blog post and on the blog listing page
- `rootPage`: necessary for listing all blog posts on /blog. should always be set to `/blog`
- `author`: the author(s) of the post. correlates to your handle located in /src/data/authors.json
- `featuredImage`: the URL of the image that appears at the top of the post and on the blog listing page
- `featuredImageType`: `standard` | `full` - determines the width of the featured image on the blog post

##### Docs & Handbook

Markdown files located in /contents/docs and /contents/handbook

```markdown
---
title: Contribute to the website: documentation, handbook, and blog
---
```

- `title`: the title that appears at the top of the handbook / doc page

##### Customers

Markdown files located in /contents/customers

```markdown
---
title: How Hasura improved conversion rates by 10-20% with PostHog
customer: Hasura
logo: ../images/customers/hasura/logo.svg
featuredImage: ../images/customers/hasura/featured.jpg
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
- `featuredImage`: the image that appears in the card on the customers listing page
- `industries`: a list of industries that apply to the company
- `users`: a list of user types that use the company's product
- `toolsUsed`: a list of highlighted PostHog tools used by the company

##### Team

Markdown files located in /contents/team

```markdown
---
name: James Hawkins
jobTitle: Co-Founder & CEO
headshot: ../images/team/James.png
github: jamesefhawkins
country: GB
startDate: 2019-07-03
---
```

- `name`: the name of the team member
- `jobTitle`: the role of the team member
- `headshot`: the relative path to the team member's headshot
- `github`: the team member's GitHub handle
- `country`: the country the team member resides in
- `startDate`: the team member's date of hire

##### HostHog

Markdown files located in /contents/hosthog

```markdown
---
date: 2022-02-24
city: London
venue: { name: Cobalance, address: Shoreditch High Street, London }
from: '18:00'
to: '20:30'
agenda:
    [
        {
            from: '18:00',
            to: '18:30',
            description: 'Sign in, grab some exclusive merch and meet the PostHog team over a cocktail in the Cellar Bar.',
            emoji: '👋🏼',
        },
        {
            from: '18:30',
            to: '19:00',
            description: 'After a welcome from CEO James Hawkins, hear how Mention Me uses PostHog to build better products in a fireside chat with Head of Product Anca Filip, hosted by PostHog’s Marcus Hyett.',
            emoji: '💬',
        },
        {
            from: '19:15',
            to: '20:30',
            description: 'Chat to the team and other PostHog users over a cocktail and slice of pizza. We’d love to hear your ideas and feedback!',
            emoji: '🍺',
        },
    ]
speakers:
    [
        {
            name: 'James Hawkins',
            title: 'Co-founder & CEO',
            company: 'PostHog',
            linkedIn: 'https://www.linkedin.com/in/j-hawkins',
            image: '../images/hosthog/london/speakers/james.png',
        },
        {
            name: 'Anca Filip',
            title: 'Head of Product',
            company: 'Mention Me',
            linkedIn: 'https://www.linkedin.com/in/ancafilip',
            image: '../images/hosthog/london/speakers/anca.png',
        },
        {
            name: 'Marcus Hyett',
            title: 'VP of Product',
            company: 'PostHog',
            linkedIn: '',
            image: '../images/hosthog/london/speakers/marcus.png',
        },
    ]
---
```

- `date`: date of the event
- `city`: city where the event takes place
- `venue`: venue details
- `from`: event start time
- `to`: event end time
- `agenda`: event timeline
- `speakers`: list of event speakers

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
- `showTitle`: `true` | `false` - determines whether to show / hide the title at the top of the page
- `width`: `sm` | `md` | `lg` | `full` - determines the width of the page
- `noindex`: `true` | `false` - determines whether to index the page or not


You can often refer to the source of existing pages for more examples, but if in doubt, you can always ask for help in the [PostHog Community Slack](/slack). 

#### Images/GIFs

For our Markdown, we use [gatsby-remark-copy-linked-files](https://www.gatsbyjs.org/packages/gatsby-remark-copy-linked-files/).

This copies local files linked to/from Markdown files to the root directory.

If you need to upload images, you can place them in `contents/images/`. We recommend creating or using existing subfolders to keep images organized.

To include an image in a markdown file, you can use nice local references, like so:

```markdown
![Twin Peaks](../images/02/IMG_4294-scaled.jpg)
```

In this case, `Twin Peaks` is the alt-text applied to the image.

Note that it may be necessary to change the folder depending on your file structure. For example, if you needed to go up two directories, this *could* be:

```markdown
![Twin Peaks](../../../images/02/IMG_4294-scaled.jpg)
```

Notice the extra ```../```.

For most images, this plugin will automatically generate a range of sizes to optimize for the device and they'll even have a blurry low filesize loading image created to hold the place. Pretty cool.

#### Links to/from the navigation

Once you've made a new markdown file, you should link to it from the sidebar where appropriate.

The sidebar is generated from `/src/sidebars/sidebars.json`.

#### Redirects

Redirects are managed in `netlify.toml` which is located in the root folder.

To declare a new redirect, open `netlify.toml` and add an entry with the `[[redirects]]` heading:

```
[[redirects]]
    from = "/docs/integrations/android-integration"
    to = "/docs/libraries/android"
```

The default HTTP status code is 301, but if you need to define a different status code, it can be changed like this:

```
[[redirects]]
    from = "/docs/integrations/android-integration"
    to = "/docs/libraries/android"
    status = 302
```

>  If you ever need to rename a file to get a different slug, a redirect is automatically created with the Safe Redirects action

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

    ![Viewing changes in GitHub Desktop](../../../images/docs/contribute/viewing-changes-in-github-desktop.png)

    Select the files that you want to be part of the commit by ensuring the checkbox to the left of the file is checked within GitHub Desktop. Then, write a short descriptive commit message and click the **Commit to...** button.

    ![Making a commit in GitHub Desktop](../../../images/docs/contribute/commit-in-github-desktop.gif)

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

    ![Push to origin from GitHub Desktop](../../../images/docs/contribute/push-to-origin-github-desktop.gif)

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

    ![pull request from GitHub Desktop](../../../images/docs/contribute/github-desktop-pull-request.png)

    This will open up a page on github.com in your default web browser.

If you are pushing to an existing branch, navigate to the [posthog.com repo](https://github.com/posthog/posthog.com) and switch to the new branch using the dropdown:

![GitHub branch switcher](../../../images/docs/contribute/github-branch-switcher.png)

Then, open the **Contribute** dropdown and click the **Open pull request** button.

Make the pull request title descriptive name and complete the detail requested in the body.

If you know who you would like to review the pull request, select them in the **Reviewers** dropdown.

## Preview branch

After a series of checks are run (to ensure nothing in your pull request breaks the website), Netlify will generate a preview link available on the `netlify/posthog/deploy-preview` line. This includes all of your changes so you can preview before your pull request is merged.

![Preview branch](../../../images/docs/contribute/preview-branch.png)

> **Note:** Checks are run automatically for PostHog org members and previous contributors. First time contributors will require authorization for checks to be run by a PostHog org member.

## Deployment

To get changes into production, the website deploys automatically from `master`. The build takes 5-10 minutes.

#### Acknowledgements

This website is based on [Gatsby](https://gatsbyjs.org) and is hosted with [Netlify](https://www.netlify.com/).
