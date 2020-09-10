---
title: SMTP Credentials
sidebar: Docs
showTitle: true
---

If you want to be able to send password reset emails from your instance, you need to set the following SMTP Credentials as environment variables:

```yaml
EMAIL_HOST: [smtp server]
EMAIL_PORT: 578
EMAIL_HOST_USER: [username]
EMAIL_HOST_PASSWORD: [password]
EMAIL_USE_TLS: false
EMAIL_USE_SSL: false
DEFAULT_FROM_EMAIL: tim@posthog.com
```