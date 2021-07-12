---
title: Integrate PostHog with WordPress
sidebar: Docs
showTitle: true
---

## Objective

Integrating PostHog with your WordPress site.

## Why is this useful?

Tracking how users use your [WordPress](https://www.wordpress.org/) website can help you improve the user experience, increase conversion rates, gain new insights and identify what your users find most valuable.

## TLDR, the short version

Get the PostHog snippet, put it right before the closing tag `</head>` in your `header.php` template file.

1. You have [deployed PostHog](/docs/deployment) or are using PostHog Cloud.

2. Get your [PostHog snippet](/docs/deployment/snippet-installation) from your 'Project Settings' or the initial PostHog setup.

3. Update your WordPress template. Option one is through WordPress Admin 'Admin' -> 'Appearance' -> 'Theme Editor', select your theme, select 'Theme Header'.

Option two is manually updating the file, usually `wp-content/themes/your-theme/header.php`. For both options, make sure to insert the PostHog snippet right before the closing `</head>` tag. Read on for additional information.

## Multiple ways to installation 

There are several alternatives to installing the PostHog analytics snippet on WordPress.

* Manually edit your WordPress template, usually `header.php`. Gives the most control, but requires backend access and re-editing in case of updates. If your theme auto-updates, you may lose your settings. Making a [Child Theme](https://developer.wordpress.org/themes/advanced-topics/child-themes/) is the recommended approach.

* Use a WordPress header script insertion plug-in. Easy, but there are no official WordPress plug-ins for editing the header. Reviewing the quality of third-party plug-ins, including after they get updated by providers, is an additional responsibility. The benefit is that plug-ins can be easily turned on and off, and updated with a few clicks, through the admin interface. 

* Some WordPress themes include additional functionality for inserting custom code into headers and footers. This is a convenient approach, so make sure to check if your theme has that option before installing a plug-in or editing `header.php`.

* Use WordPress built-in functionality for editing templates from the admin interface. Very convenient, but you have to consider the potential draw-backs of having template files writable, which many prefer to disable, for security purposes. Also, wrongfully editing a file may cause problems. Detailed instructions for this option are provided below.

## Pre-requisites

To follow this tutorial along, you should:

1. Have [deployed PostHog](/docs/deployment) or be using PostHog Cloud.

## Step-by-step instructions, Theme Editor in Admin

2. Get your [PostHog snippet](/docs/deployment/snippet-installation) from your 'Project Settings' or the initial PostHog setup
3. Login to your WordPress admin dashboard
4. Go to 'Appearance' -> 'Theme Editor' 
5. Select your theme in the editor drop-down menu to the right, find and click the `header.php` file in the file column to the right(see image below).

    <br />![Wordpress Theme Editor](../../../images/tutorials/wordpress/wordpress-header-edit.png)<br />
6. You should now be seeing the contents of the `header.php` template file in the text editing window. It is recommended that you copy all the text/code and save it somewhere on your computer as a back-up, as well as having regular back-ups for your site, including before any update.
7. Navigate in the code editor until you see the closing `</head>` tag in the text of the `header.php` file. Paste your snippet there, right before that tag, like in the image above.
8. Click the 'Update File' button at the bottom. You're good to go - PostHog should now be working on your WordPress website!


> To confirm PostHog is configured correctly, visit your website and then check if the events from your session appear in PostHog. Note that this may take a few minutes.
