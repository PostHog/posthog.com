---
title: How to set up WordPress analytics with PostHog
sidebarTitle: WordPress
platformLogo: wordpress
---

Getting traffic, usage, and user behavior data about your [WordPress](https://www.wordpress.org/) site is simple with PostHog. Once you have that data, you can discover insights and build dashboards with our suite of dev tools.

## How to add PostHog to your WordPress site

The best way to add PostHog to your WordPress site depends on what version of WordPress you are using.

All of them require you to [signup for PostHog](https://us.posthog.com/signup), get your [snippet](/docs/getting-started/install?tab=snippet) with your project token and instance address from [your project settings](https://us.posthog.com/project/settings#snippet), and add the PostHog snippet to your site.

### Option 1: Use a plugin

The first option is to use a plugin. These enable you to easily add custom code to your site's header which we can use to add the PostHog snippet.

For **WordPress.com** users, this is also the only option. This is because you don't have access to the `header.php` or `functions.php` files. Using plugins does require their **Business** or **Commerce** plans. We also recommend this option for [WooCommerce](/docs/libraries/woocommerce) sites.

Two plugin options include:

1. WordPress.com recommends using the free [Insert Headers and Footers](https://wordpress.com/plugins/insert-headers-and-footers) plugin.

2. If you are already using Google Tag Manager on your WordPress site with a plugin like [Site Kit](https://wordpress.org/plugins/google-site-kit/), you can add the PostHog snippet as a tag instead. See our [Google Tag Manager docs](/docs/libraries/google-tag-manager) for more information.

The workflow for these is the same:

1. Install the plugin.
2. Activate the plugin.
3. Open the plugin's settings and add the PostHog snippet to the header.

### Option 2: Edit your theme's functions file

[Theme functions](https://developer.wordpress.org/themes/basics/theme-functions/) enable you to add functionality to your WordPress site. This makes them a great way to add PostHog.

To set one up for PostHog, first, find your theme's `functions.php` file. This can be found either in `app/public/wp-content/themes/<your-theme>` folder or in your WordPress admin under **Tools** -> **Theme Filter Editor**.

![WordPress Theme Filter Editor](https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2024_10_31_at_11_02_32_2x_69aa8ee077.png)

Next, create an `add_posthog` function with your snippet like this:

```php
if ( ! function_exists( 'add_posthog' ) ) :
function add_posthog() {
	?>
    <script>
      !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagResult isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey getNextSurveyStep identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty createPersonProfile opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing debug".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
      posthog.init('<ph_project_token>',{api_host:'<ph_client_api_host>', defaults:'<ph_posthog_js_defaults>'})
    </script>
	<?php
}
endif;
```

Finally, add the `add_action` hook to add the code to your site. Your `functions.php` file should look like this:

```php
// ... your existing functions

if ( ! function_exists( 'add_posthog' ) ) :
function add_posthog() {
	?>
    <script>
      !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagResult isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey getNextSurveyStep identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty createPersonProfile opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing debug".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
      posthog.init('<ph_project_token>',{api_host:'<ph_client_api_host>', defaults:'<ph_posthog_js_defaults>'})
    </script>
	<?php
}
endif;

// Hook to add the code right before the closing </head> tag
add_action('wp_head', 'add_posthog', 999);
```

After saving your changes or clicking **Update File**, PostHog should begin to autocapture pageviews, clicks, and more.

### Option 3: Edit your theme's header file

If you are using an older version of WordPress, you can edit the `header.php` file directly.

To do this, start by going to your WordPress admin and navigating to **Appearance** -> **Theme Editor**.

Select your theme in the editor drop-down menu to the right and click the `header.php` file in the file column to the right.

![WordPress Theme Editor](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/tutorials/wordpress/wordpress-header-edit.png)

You should now see the contents of the `header.php` template file in the code editing view. It is recommended that you copy all the text/code and save it somewhere as a back-up.

Find the closing `</head>` in the code editor and paste the PostHog snippet before it (see above image). Finally, click the **Update File** button at the bottom to save your changes. PostHog should begin to autocapture pageviews, clicks, and more.

To confirm PostHog is configured correctly, visit your website and then check if the events from your session appear in PostHog.

> **Notes:**
>
> - Using the Theme Editor is very convenient, but you have to consider the potential drawbacks of having template files writable, which many prefer to disable for security purposes. Also, wrongfully editing a file may cause problems so be sure to perform appropriate backups before attempting this.
> - If your theme auto-updates, manually editing the `header.php` file may lose your settings. Making a [Child Theme](https://developer.wordpress.org/themes/advanced-topics/child-themes/) is the recommended approach.

## Capturing server-side events

The snippet covers everything that happens in the visitor's browser: pageviews, clicks, and form submissions. Some events only exist on the server, and for those you need the [PostHog PHP SDK](/docs/libraries/php).

WordPress fires an action for most of them:

| Event | Action hook |
|-------|-------------|
| A comment is posted | `comment_post` |
| A user registers | `user_register` |
| A WooCommerce order completes | `woocommerce_thankyou` |

WooCommerce is where this matters most. Autocapture sees the click on **Place order** and the pageview of the confirmation page, but it [deliberately doesn't capture form values](/docs/product-analytics/autocapture#sending-custom-properties-with-autocaptured-form-submissions), so those events carry no revenue and no line items. Subscription renewals, refunds, and the moment a bank transfer order is actually paid happen with no browser open at all. Server-side capture is the only way to record any of it.

### Set up the PHP SDK in a plugin

Ship server-side capture as a small standalone plugin rather than adding it to your theme's `functions.php` – code in a theme is lost on theme switch, while a plugin survives both.

First, add your project token to `wp-config.php` – the same file that holds `DB_PASSWORD` – so it never lives in plugin source:

```php
define('POSTHOG_PROJECT_TOKEN', '<ph_project_token>');
define('POSTHOG_HOST', '<ph_client_api_host>');
```

Then create `wp-content/plugins/posthog-events/posthog-events.php`:

```php
<?php
/**
 * Plugin Name: PostHog Events
 * Description: Sends server-side events to PostHog.
 */

if (!defined('ABSPATH')) {
    exit;
}

require __DIR__ . '/vendor/autoload.php';

use PostHog\PostHog;

function posthog_events_init(): void
{
    if (!defined('POSTHOG_PROJECT_TOKEN')) {
        return;
    }

    PostHog::init(POSTHOG_PROJECT_TOKEN, [
        'host' => defined('POSTHOG_HOST') ? POSTHOG_HOST : 'https://us.i.posthog.com',
    ]);
}
add_action('plugins_loaded', 'posthog_events_init');

function posthog_events_track_comment(int $comment_id, $comment_approved, array $comment_data): void
{
    if (!defined('POSTHOG_PROJECT_TOKEN')) {
        return;
    }

    PostHog::capture([
        'distinctId' => $comment_data['comment_author_email'] ?? 'anonymous',
        'event' => 'comment_posted',
        'properties' => [
            'comment_id' => $comment_id,
            'post_id' => $comment_data['comment_post_ID'] ?? null,
        ],
    ]);

    PostHog::flush();
}
add_action('comment_post', 'posthog_events_track_comment', 10, 3);
```

Install the SDK inside the plugin folder with `composer require posthog/posthog-php`, then activate the plugin from your WordPress admin.

For WooCommerce, the same pattern on `woocommerce_thankyou` captures the full order – call `wc_get_order($order_id)` in the hook and send the total, currency, and item count as properties.

Three details matter here:

- **Call `PostHog::flush()` after capturing.** The PHP SDK queues events and sends them when the client is destroyed, but a web request has no single exit point the way a CLI script does. Flush where you capture, or events can be lost when the request ends.
- **Guard the entry file.** `if (!defined('ABSPATH')) { exit; }` before any other code stops the file from running outside WordPress.
- **Keep pageviews on the client.** The snippet already captures them, along with everything else that happens in the browser. Reserve `PostHog::capture()` for events the browser never sees.

## Troubleshooting

If the snippet is in place but events aren't appearing in PostHog, two things cause most of it on WordPress.

### Caching and optimization plugins

Performance plugins – Autoptimize, WP Rocket, LiteSpeed Cache, W3 Total Cache, and similar – rewrite the JavaScript on your pages. Depending on their settings they can minify the snippet, combine it into a bundle that loads later, defer it until the visitor interacts with the page, or strip the inline script entirely.

If you use one:

- Exclude the PostHog snippet from JavaScript minification, combination, and deferral. Most of these plugins accept an exclusion by filename or by a string in the inline script – `posthog` works for both.
- Purge the cache after adding the snippet. Until you do, returning visitors keep getting the cached page from before the change.
- Check the page source of your live site, not the editor preview, to confirm the snippet is really there.

### Requests blocked before they reach PostHog

Ad blockers and strict browser privacy modes – including Firefox's Enhanced Tracking Protection and Brave Shields – block requests to known analytics domains. The snippet loads, but the events never arrive, which looks the same as a broken installation.

The fix is to [deploy a reverse proxy](/docs/advanced/proxy) so events go through your own subdomain instead. PostHog also offers a [managed reverse proxy](/docs/advanced/proxy/managed-reverse-proxy) if you'd rather not run one yourself.
