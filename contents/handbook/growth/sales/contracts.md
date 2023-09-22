---
title: Contracts
sidebar: Handbook
showTitle: true
---

# Annual plans and more

For customers who want to sign up for an annual (or longer) plan there is some additional paperwork needed to capture their
contractual commitment to a minimum term, and likely custom pricing as well.  At a minimum, they should sign an Order Form 
which references our standard [terms](/terms) and [privacy notice](/privacy).  In addition, they may want a custom Master Services Agreement (MSA) 
or Data Processing Agreement (DPA)

## Order Form

An Order Form is a lightweight document that captures the customer details, products and prices, term, and signatures from both 
PostHog and the Customer.  They are either governed by our standard terms or a custom MSA (see below).

You will likely need to use the [Pricing Calculator](https://docs.google.com/spreadsheets/d/1QsDV2ECtMwM9IfC_D7Embmpu7K7q6qbq60t8ARglQaI/edit#gid=358353731) to get the correct amounts to be used in the order form.

### Creating an Order Form

We use [PandaDoc](https://app.pandadoc.com/a/#/) to handle document generation, routing and signature.  Ask Cameron or Simon for access if you don't have it.

1. The [order form template](https://app.pandadoc.com/a/#/templates/wu9XwvL5cyjrasUPkppZuj) to use is titled `[COMPANY LEGAL NAME] - PostHog Cloud [ENTERPRISE] Order Form - [DDMMYYYY]` 
2. When looking at the template, click the link to **Use this template** in the top bar.
3. In the Add recipients box which pops up:
   1. Replace `CUSTOMER NAME` with their actual company name
   2. Delete `(Enterprise)`= if it's for Cloud Standard
   3. Replace `<MMM YYYY>` with the month and year the contract starts (e.g. March 2023)
   4. Remove the word `TEMPLATE` at the end 
   5. Add the Client email, first and last name 
   6. Add the PostHog Signer email (simon@posthog.com)
   7. Click continue
4. In the top left hand corner of the document, set the **Document value** to be the total contract amount (The Pricing Calculator has both the Standard and Enterprise totals listed)
5. If certain components are being excluded from the contract (e.g. Enterprise or Session Recordings), delete those rows in the product table.
6. On the right of the screen there is a sidebar, select the **Variables** tab and populate them as follows:
   * **Client Address Information** - Needs to be their legal correspondence address (check with your customer contact)
   * **Client.Company** - The legal company name
   * **Contract.EffectiveDate** - The start date of the contract expressed in the format `01 Feb 2023`
   * **Contract.EnterprisePrice** - The price of the Enterprise add-on, from the pricing calculator
   * **Contract.EventLimit** - The total amount of events that can be captured over the contract term (not the monthly amount)
   * **Contract.EventPrice** - The price for the up-front Product Analytics component, from the pricing calculator
   * **Contract.EventOverage** - The overage rate for Product Analytics, should the customer go over their Event Limit
   * **Contract.GroupsPrice** - The price for the up-front Group Analytics component, from the pricing calculator
   * **Contract.RecordingLimit** - The total amount of recordings that can be captured over the contract term (not the monthly amount)
   * **Contract.RecordingPrice** - The price for the Session Replay component, from the pricing calculator
   * **Contract.RecordingOverage** - The overage rate Session Replay, should the customer go over their Recording Limit
   * **Contract.FeatureFlagLimit** - The total amount of Feature Flag requests that can be captured over the contract term (not the monthly amount)
   * **Contract.FeatureFlagPrice** - The price for the Feature Flag component, from the pricing calculator
   * **Contract.FeatureFlagOverage** - The overage rate Feature Flag, should the customer go over their Feature Flag Limit
   * **Contract.Term** - The term in months of the contract (12 months by default)
7. If an MSA is being used rather than the standard terms you will need to replace the following text:
   > PostHog Cloud License Terms appearing at: https://www.posthog.com/terms and Privacy Policy appearing at: https://posthog.com/privacy (collectively the “Agreement”)
   
   with
   
   > PostHog Cloud License Terms executed by and between PostHog, Inc. and CUSTOMER LEGAL NAME (the “Agreement”)

8. You should link the order form to the HubSpot deal using the sidebar on the right so that we have a reference to the completed paperwork from our CRM.

### Routing an Order Form for review and signature

1. When viewing the order form, check the recipients tab in the sidebar.  The Client and PostHog roles should be filled in.
2. A signing order should also be set, with the Client signing first (so they can review it before we sign).
3. Ensure Document forwarding and Signature forwarding are set to on so that our Contact can re-assign the document if needed.
4. Click Send at the top of the document and add a message explaining the context of the order form.
5. Once the Client and then PostHog have signed it you should get an email to confirm completion.
6. Don't forget to link to a deal in HubSpot and close the associated deal.
7. Zapier will [automatically add](https://zapier.com/app/zap/207715331) a record in the [Annual Plan Table](https://tables.zapier.com/app/tables/t/01H9QPTRYEZVGFTJ84XMCYQFSK) with the PandaDoc Order Form ID.  See the [Billing](/handbook/growth/sales/billing) page for steps on how to use this and automate the setup of their Stripe billing components.
8. Celebrate!

## Master Services Agreement (MSA)

Occasionally, customers will want to sign an MSA instead of referencing our terms in an order form.  We don't have this templated in PandaDoc yet as it's so infrequent.

1. Download a copy of the [PostHog Cloud MSA](https://docs.google.com/document/d/155w70ZAHecVZcDqTq2_415dvaq2Bk-8QlEOozjq1hG8/edit#heading=h.y38xfjgcg4xm) as a Word Document (legal teams prefer this format) and share it with your Customer contact.
2. They may want to propose changes (also known as 'redlines').  Work with Charles to get these agreed.
3. Create a new document in PandaDoc, you can choose to either import from Google Drive or upload from your local machine.  This should be the clean, non-redlined document as agreed byt both parties.
4. Change the name to be `PostHog Cloud MSA - CUSTOMER LEGAL NAME`.
5. Add the Client and PostHog (charles@posthog.com) as roles.
6. Add a Signature, Name and Title field for both PostHog and the Customer.
7. Check the signing order (Client, then PostHog normally).
8. Send for signature.

