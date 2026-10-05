---
title: Who we do business with
sidebar: Handbook
showTitle: true
---

We firmly adhere to laws in countries where we do business, and welcome everyone abiding by those legal restrictions to be our customers - paid or free, in all but a few very exceptional circumstances:

* The customer is engaging in illegal or unlawful behavior.
* The customer is encouraging violence or discriminating against legally protected groups.

In these cases, we may choose not to do business with the customer.

## Sanctioned countries and companies

US laws mean we may also be prohibited from working with certain companies, due to ongoing US sanctions. In this case we do not have discretion - we are banned from working with these companies entirely. 

If you need to check if a particular company appears on a US sanctions list, you can use the [US Treasury's Sanction Search](https://sanctionssearch.ofac.treas.gov/). In particular, you should be mindful of companies that sign up which are based in the following territories:

- Balkans
- Belarus
- Burundi
- Central African Republic
- Crimea
- Democratic Republic of the Congo
- Iraq
- Libya
- Lebanon
- Myanmar (formerly Burma)
- Russia
- Sudan
- South Sudan
- Somalia
- Ukraine
- Venezuela
- Yemen
- Zimbabwe

US sanctions mean that we are not allowed to offer services [at all](https://www.bis.doc.gov/index.php/policy-guidance/country-guidance/sanctioned-destinations#:~:text=The%20Bureau%20of%20Industry%20and,United%20Nations%20Security%20Council%20Resolutions.) to _any_ companies based in:

- Cuba
- Iran
- North Korea
- Syria

### Update for June 2024 US sanctions against Russia 
In June 2024, the US Treasury's Office of Foreign Asset Control issued [updated sanctions against Russia](https://ofac.treasury.gov/sanctions-programs-and-country-information) which prohibit the sale or supply of services to individuals or organizations in Russia. The sanctions take effect on September 10, 2024 and continue indefinitely.

We must comply with these sanctions, so in August 2024 we contacted impacted individuals to let them know we would make the following changes on **September 9th, 2024**:

- We no longer accept any payments from individuals or organizations based in Russia
- We block access to PostHog for all individuals in Russia, based on their IP
- We terminated paid accounts with all customers located in Russia

There are some exemptions to the sanctions including any service to any entity located in the Russian Federation that is owned or controlled, directly or indirectly, by a U.S. person.

> If a customer believes they've been incorrectly impacted by our response to these sanctions, or have further questions about them, ask them to contact [sales@posthog.com](mailto:sales@posthog.com) so we can investigate.

#### Dealing with the above

If you find a paying customer who we should not be doing business with according to the rules above, use the following process:

1. First get in touch with all active users in the account via a group email to let them know that:
  - As they are a Russian company, we can not do business with them and link this handbook page.
  - You'll be cancelling their paid subscription today
  - They will be given a few days grace to export any data, and then access to PostHog will be suspended
2. In Stripe, cancel their subscription (don't collect any due fees) and also set `is_blocked_from_subscribing` to true in their customer metadata.  You can access their Stripe customer record via Customer Analytics.
3. After 3 business days, suspend their access to PostHog using the Billing Admin.

## Checking whether we can do business with a customer

If you work in Sales, CS & Onboarding, or Support and are not sure if we are able to work with a customer you are dealing with, ask in #legal and one of the team will be able to let you know either way. For the most part, these edge cases are to do with customers attempting to work around sanctions in their country, though other edge cases can also occur. 

Customers who track adult or other potentially offensive content aren't automatically excluded - we have [content warnings](/handbook/support/posthog-support#categorization-tags) set up in PostHog Support for them. If you are working with their account more regularly as part of the Sales or CS & Onboarding teams, we also recommend that you avoid logging in as them, and that you provide any training using demo data.
