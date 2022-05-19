---
title: Email
sidebar: Handbook
showTitle: true
---

We regularly send two emails. 

1. PostHog Array, a product announcement email sent after every major release.
2. HogMail, a marketing and content email published every two weeks.

Both emails are sent via Mailchimp.

We plan to move HogMail to a weekly schedule once we're confident we can produce it to a high standard at that frequency. It's primarily aimed at existing users as a means to improving engagement with our content and aid product discovery through sharing tutorials, tips and ideas, not user acquisition.

## Mailchimp Audiences

We have two main Mailchimp audiences we send these emails to. 

- **All Signed-up Users** - Is used for Array emails and includes all users who have signed up to PostHog, across both PostHog Cloud and self-hosted deployments.  
- **Newsletter Sign-ups** - Is used for HogMail and includes anyone who has subscribed. Subscription usually occur through a CTA featured on `/blog` or `/newsletter`. 

We occasionally create smaller lists for other audiences, such as event attendees or beta invitees. 

Within the Mailchimp dashboard, users are automatically tagged to indicate where they came from e.g. Newsletter Subscribers, Deployed PostHog, Eventbrite, etc.

Users on the All Signed-up Users list are also tagged as either `clouduser` or `selfhosted`, so that we may target necessary product information to these users if needed. 

## PostHog Array

Array is our product announcement email, for telling users about major releases and important updates. We send this after every major update - usually once a month - as part of [the new release process](/handbook/engineering/release-new-version).

### Updating the Mailchimp audience

We manually sync our email lists before sending each Array email, to ensure as many users as possible are aware of important updates. If users choose to unsubscribe from the list, they will not be re-added. 

Here's how to update the All Signed-up Users email list:

1. Export a list of Cloud users from PostHog's Persons view. Filter this using `REALM=CLOUD`. 
2. Export a list of Self-hosted users from PostHog's Persons view. Filter this using `REALM=HOSTED,HOSTED-CLICKHOUSE`.

> You need Excel to open these exported .csvs. The number of columns is too great for Numbers or Google Sheets. We have [a feature request](https://github.com/PostHog/posthog/issues/9086) out to help address this. 

3. Open the list of Cloud users in Microsoft Excel. 
3. Isolate the `NAME` column, which should contain a list of email addresses.
4. Copy the `NAME` column to Google Sheets, placing it in Column A. 
5. Clean the data of duplicates by using the `=UNIQUE(A2:A)` formula in Column B.  
6. Copy Column B. Paste this into Column A using Paste Special > Paste Values Only. 
7. Delete Column B. Title Column A `Email`. 
8. Export the Google Sheets file as .CSV file.
9. [Import the .CSV file into the Mailchimp](https://mailchimp.com/help/import-contacts-mailchimp/) audience  `All Signed Up Users`. 
10. Apply the tag `clouduser` to all imported users in Mailchimp. 
11. Repeat this process for the Self-hosted list, adding to the same Mailchimp audience but using the tag `selfhosted` instead.

### Content, process & format

The Array email is part of [the new release process](/handbook/engineering/release-new-version). When a new release is close, there will be a code freeze and [the Engineering team](/handbook/engineering) will select which PRs are included in the release. The Engineering team will begin creating an Array blog post outlining at a high-level what is included in the release. Marketing (usually Joe Martin) is responsible for finalizing this content and using it to create the Array email in Mailchimp.

The quickest way to create a new Array email is to duplicate a previous one and simply edit the content in the new version. Don't forget to update the email previews and subject line! We also recommend following Mailchimp's image recommendations and not sending emails with images larger than 1200x800px.

The Array email should be sent as soon after a release as is reasonably possible and is not considered a blocker to a release.

The usual structure for an Array email is as follows:

- Title/Heading
- Array's `featuredImage` used in the blog post for the update
- List of #New and #Improved features
- Screenshot of one of the new/improved features - ideally the same image used in the array post
- List of new blog posts or other news, with blurbs and links
- Roles we're currently hiring for
- Social media links

Feel free to use a few emojis and 1-2 images.

For reference, here's an [example](/blog/the-posthog-array-1-32-0) of a previous Array blogpost.

## HogMail format

HogMail roughly follows this format:

- Featured content comprising at least one blog post and one tutorial
- Curated third-party content we think will interest our users 
- PostHog news, feedback requests and community updates
- The Needle comic / cartoon from Lottie
