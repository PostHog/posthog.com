---
title: Plugin Server
sidebar: Docs
showTitle: true
---
<br>

The [PostHog Plugin Sever](https://github.com/PostHog/posthog-plugin-serve) is a standalone project that PostHog uses to support plugins. Despite being developed separately, the plugin server is packaged with the main PostHog project, allowing you to run it by simply installing PostHog.

### Running the server

To run the plugin server from within the PostHog app, you can simply run the following from the PostHog root directory:

```shell
cd plugins && yarn start
```

To run the plugin server as a standalone unit, you must first install it:

```
