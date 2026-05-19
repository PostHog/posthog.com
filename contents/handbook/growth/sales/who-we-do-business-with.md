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
>
> 
### How to deactivate a sanctioned account

If you need to deactivate a customer account due to sanctions compliance, follow these steps:

> **Note:** TAMs may not have permissions to cancel Stripe subscriptions directly. If you encounter access issues, post in #team-billing for assistance.

#### Step 1: Cancel the Stripe subscription

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Search for the customer using their email or Stripe ID
3. Click on their current subscription
4. Click **Cancel subscription** (do NOT delete the customer — we need invoice/payment records)
5. This automatically updates the billing customer's `plans_map` to free and removes the Stripe subscription ID

#### Step 2: Deactivate the organization

1. Go to the [Org Admin page](https://us.posthog.com/admin/posthog/organization/)
2. Find the customer's organization
3. Set **active** to `No`

#### Step 3: Deactivate the user

1. Go to the [User Admin page](https://us.posthog.com/admin/posthog/user/)
2. Find the user by email
3. Set **permissions → active** to `No`
4. This prevents them from creating a new account with the same email

#### Step 4: Send notification email

Send the customer an email informing them of the deactivation:

> Subject: Important: PostHog Account Deactivation Notice
>
> Hi,
>
> I'm reaching out regarding your PostHog account for [COMPANY NAME].
>
> Due to US Treasury sanctions effective since September 2024, PostHog is no longer able to provide services to organizations based in Russia. As a result, we have deactivated your PostHog account in compliance with these regulations.
>
> If you believe this action was taken in error (for example, if your organization is owned or controlled by a U.S. person), please contact sales@posthog.com so we can investigate.
>
> Best regards,
> [Your name]
> Technical Account Manager, PostHog

#### Checklist

- [ ] Stripe subscription cancelled (not deleted)
- [ ] Organization deactivated in admin
- [ ] User deactivated in admin
- [ ] Notification email sent to customer

## Checking whether we can do business with a customer

If you work in Sales, CS & Onboarding, or Support and are not sure if we are able to work with a customer you are dealing with, ask in #legal and one of the team will be able to let you know either way. For the most part, these edge cases are to do with customers attempting to work around sanctions in their country, though other edge cases can also occur. 

Customers who track adult or other potentially offensive content aren't automatically excluded - we have [content warnings](https://posthog.com/handbook/engineering/support-hero#content-warnings) set up in Zendesk for them. If you are working with their account more regularly as part of the Sales or CS & Onboarding teams, we also recommend that you avoid logging in as them, and that you provide any training using demo data.
