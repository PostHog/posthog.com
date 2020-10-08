---
date: 2020-10-08
title: Currency Normalization
rootPage: /plugins
sidebar: Plugin Directory
showTitle: true
hideAnchor: true
repository: https://github.com/mariusandra/posthog-currency-normalization-plugin/
description: Convert ingested payment values between currencies
---

Normalize currencies in events. E.g. amounts in EUR, USD and GBP will all be converted to EUR.

1. Install [posthog-cli](https://github.com/PostHog/posthog-cli)
2. Install this plugin: `posthog plugin install https://github.com/mariusandra/posthog-currency-normalization-plugin`
3. [Sign up](https://openexchangerates.org/) to OpenExchangeRates.org 
4. Set the following env variables:
  - `OPENEXCHANGERATES_API_KEY=COPY_API_KEY_HERE`
  - `CNP_NORMALIZED_CURRENCY=EUR`
5. Update the following default env variables if needed:
  - `CNP_AMOUNT_PROPERTY=amount`
  - `CNP_CURRENCY_PROPERTY=currency`
  - `CNP_NORMALIZED_AMOUNT_PROPERTY=normalized_amount`
  - `CNP_NORMALIZED_CURRENCY_PROPERTY=normalized_currency`
6. Run PostHog