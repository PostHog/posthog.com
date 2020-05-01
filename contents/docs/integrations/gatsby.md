# Gatsby

?> This is a community contributed plugin

Thanks to [Ritesh Kadmawala](https://github.com/kgritesh/gatsby-plugin-posthog-analytics/)!

## Install

```bash
yarn add gatsby-plugin-posthog-analytics
```

or

```bash
npm install --save gatsby-plugin-posthog-analytics
```

## How to use

```js
// In your gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-posthog-analytics`,
      options: {
        // Specify the API key for your Posthog Project (required)
        apiKey: "YOUR_POSTHOG_ANALYTICS_API_KEY",
	    // Specify the app host if self-hosting (optional, default: https://app.posthog.com)
	    apiHost: "YOUR_POSTHOG_APP_HOST_URL",
        // Puts tracking script in the head instead of the body (optional, default: true)
        head: true,
	    // Enable posthog analytics tracking during development (optional, default: false)
	    isEnabledDevMode: true
      },
    },
  ],
}
```

This will automatically start tracking pageviews, clicks and more.

For instructions on the JS library itself, see [JS integration](/integrations/js-integration).