---
title: Docusaurus v2 Integration
sidebar: Docs
showTitle: true
---

## Install

```bash
yarn add posthog-docusaurus
```

or

```bash
npm install --save posthog-docusaurus
```

## How to use

```js
// in docusaurus.config.js
module.exports = {
  plugins: ["posthog-docusaurus"],
  themeConfig: {
    posthog: {
      apiKey: "YOURAPIKEY",
      appUrl: "https://app.posthog.com",  // optional
      enableInDevelopment: false  // optional
    }
  }
};
```

This will automatically start tracking pageviews, clicks and more.

For instructions on the JS library itself, see [JS integration](/integrations/js-integration).