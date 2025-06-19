---
title: Managing Contracts
sidebar: Handbook
showTitle: true
---

# Creating and managing contracts

For customers who want to sign up for an annual (or longer) plan there is some additional paperwork needed to capture their contractual commitment to a minimum term, and likely custom pricing as well. At a minimum, they should sign an Order Form which references our standard [terms](/terms) and [privacy notice](/privacy). In addition, they may want a custom Master Services Agreement (MSA) or Data Processing Agreement (DPA).

### What about monthly customers?

Anyone on a monthly plan simply agrees to our [Terms](/terms) and [Privacy Policy](/privacy) when they sign up.

## QuoteHog pricing calculator

While we offer [transparent pricing available to all](/pricing), you can use [QuoteHog](https://quote.posthog.net) (internal only) for customers who need a "formal quote," or who have very high volumes, or otherwise have bespoke needs.

Sign into QuoteHog via your PostHog Google account/SSO. Upon login, you will see a list of existing quotes, sorted by the  created date. You can view a previously created quote or create a new quote using the "New Quote" button at the top right. 

The quoting interface is intuitive and, of course, uses the same pricing we display publicly. Feel free to involve a customer in creating a quote if the opportunity presents itself and you think it would build trust. 

> Be sure to always click the "Save" button after making changes to a quote. QuoteHog does not autosave.

Quotes can be shared externally or embedded in an external source. Clicking the Dot Menu from a Quote and click "Share". If someone asks for a PDF version of a quote, you can view the external version and print it to PDF.

QuoteHog also provides Stripe reported usage and spend for existing customers. To do this, you need to first connect QuoteHog to Salesforce from the [Profile page](https://quote.posthog.net/profile). As you build a quote, click "Add customer info" and search for your customer account. This also allows you to link the quote to an existing Salesforce opportunity.

When building a quote for an annual plan conversion or renewal, consider:
1. How is usage trending? Looking at the past 6 month's of usage (usage history tab in Quotehog):
- If usage is trending up, calculate the growth rate and project expected volume for a year.
- If usage is stable, project based on the latest month's volume or the average or the maximum.

> Note: QuoteHog's input expects monthly volume, so after estimating annual volume, don't forget to convert it to monthly volume.

2. Is there opportunity to adopt additional products? How does that affect future usage?

You can create quotes with multiple options: e.g. one based on current usage, one with a higher tier to account for growth potential.

The legacy pricing calculator is available [here](https://docs.google.com/spreadsheets/d/1ynNM9tbWsWki2Q0vhwCV0iYNtJ1NHz4eXtUvZDw_sjA/edit?usp=sharing) (internal only).


## Order Form

An Order Form is a lightweight document that captures the customer details, credit amount, discount, term, and signatures from both
PostHog and the Customer.  They are either governed by our standard terms or a custom MSA (see below).

You will likely need to use [QuoteHog](https://quote.posthog.com/) to get the correct credit amount to be included in the order form.

### Creating an Order Form

We use [PandaDoc](https://app.pandadoc.com/a/#/) to handle document generation, routing and signature.  Ask Mine or Simon for access if you don't have it.

1. The [order form template](https://app.pandadoc.com/a/#/templates/87jsEEeg8rvYYri9Y8gK5B) to use is titled `[Client.Company] PostHog Cloud Order Form - <MMM YYYY>`
2. When looking at the template, click the link to **Use this template** in the top bar.
3. In the Add recipients box which pops up:
    1. Replace `<MMM YYYY>` with the month and year the contract starts (e.g. March 2023)
    2. Add the Client email, first and last name
    3. Add the PostHog Signer email - normally the team member who is responsible for the customer (AE or CSM).
    4. Click continue
4. In the pricing table, set the total amount of credit in the Amount box next to **PostHog Cloud Credit**
5. Remove the Enterprise Plan line item if not needed.
6. At the bottom of the pricing table, set the **Discount %** just above the Total
7. On the right of the screen there is a sidebar, select the **Variables** tab and populate them as follows:
    * **Client Address Information** - Needs to be their legal correspondence address (check with your customer contact)
    * **Client.Company** - The legal company name
    * **Contract.Discount** - The discount % (appears in the Additional credit purchase section)
    * **Contract.EffectiveDate**
        - Set the start date of the contract in the format DD MMM YYYY (e.g., 01 Feb 2023). For a new customer, this would be the date they choose to start their subscription. For an existing customer, we have two options:
            - **Immediate Activation:** If the customer wishes to start using the credits immediately, set the start date to the beginning of their current billing period. This backdating ensures that the credits are applied correctly to the current billing cycle.
            - **Next Billing Cycle:** If the customer prefers to begin their annual plan at the start of their next billing cycle, set the start date accordingly. This option aligns the contract start date with the upcoming billing period.
            - For example, let’s say it’s October 15 and you’re setting up an annual plan. You have a pay-as-you-go subscription that started on September 1, and the next billing date is November 1.
                - If a customer wants to start using credits immediately for the October cycle, your contract start date should be October 1.
                - If a customer wants to start using credits starting the next billing cycle, your contract start date should be November 1.
                - If you set the start date correctly, our Zapier automation flow will create the invoices with correct dates so our revenue calculations are not affected from the transition.
        - **Note:** Pay-as-you-go products are charged after the end of the period, while flat-rate subscriptions are charged at the beginning of the period. As a result the first two payments on a monthly schedule may occur within the same billing period as part of the transition. Make sure to send a note to the customer to ensure they're fully informed!

    * **Contract.Term** - The term in months of the contract (12 months by default)
8. If they are paying monthly change:
     - Payment Terms to `12 equal monthly payments from Contract start date`.
     - Payment Method to `Credit Card`.
9. If an MSA is being used rather than the standard terms you will need to replace the following text:
   > PostHog Cloud License Terms appearing at: https://www.posthog.com/terms and Privacy Policy appearing at: /privacy (collectively the “Agreement”)

   with

   > PostHog Cloud License Terms executed by and between PostHog, Inc. and CUSTOMER LEGAL NAME (the “Agreement”)

10. You should link the order form to the opportunity record in Salesforce using the `Contract Link` field in the "Opportunity Closure Details" so that we have a reference to the completed paperwork from our CRM.

### Routing an Order Form for review and signature

1. When viewing the order form, check the recipients tab in the sidebar.  The Client and PostHog roles should be filled in.
2. A signing order should also be set, with the Client signing first (so they can review it before we sign).
3. Ensure Document forwarding and Signature forwarding are set to on so that our Contact can re-assign the document if needed.
4. Click Send at the top of the document and add a message explaining the context of the order form.
5. Once the Client and then PostHog have signed it you should get an email to confirm completion.
6. Don't forget to link to an opportunity in Salesforce and mark the associated opportunity as Closed Won.
7. Zapier will [automatically add](https://zapier.com/editor/217375860) a record in the [Annual Plan Table](https://tables.zapier.com/app/tables/t/01HGX2N9JXNV2EEDYARD24901R) with the PandaDoc Order Form ID.
8. Celebrate!


### Manual upload of signed Order Form

We prefer to keep all signatures in PandaDoc, but sometimes clients may prefer to sign a PDF copy. One way to minimize this is to send contracts for initial review via PandaDoc when possible. It is ok to have multiple drafts in PandaDoc as long as we have the final signed copy in there as well. When a client signs an order form outside of PandaDoc, please follow these steps to complete the process:

1. If you have previously created a draft, find the document from the [Documents page in PandaDoc](https://app.pandadoc.com/a/#/documents-next?displayMode=folders_first&mainFilter=my_documents&sortBy=date_modified&customDate=date_modified&direction=desc) (note: you cannot change the status from Home or inside a document).
    - Select "Change Status" from the three-dot menu on the right.
    - Upload the signed PDF of the document.
    - Mark the status as completed.
    - Check Audit Trail to make sure the signed version is uploaded correctly.
    - Link to an opportunity in Salesforce and close the associated opportunity as Closed Won.
2. If no draft exists, upload the signed document directly ad a new document in PandaDoc.
    - Mark the status as completed.
    - Link to an opportunity in Salesforce and close the associated opportunity as Closed Won.

Once you the signed form in PandaDoc is marked as complete and the Salesforce opportunity status is set to Closed Won, the RevOps team will get a notification and handle setting up the subscription and invoicing. See the [Billing](/handbook/growth/sales/billing) page for steps on how the billing setup works for more information.


## Master Services Agreement (MSA)

Occasionally, customers will want to sign an MSA instead of referencing our terms in an order form.  We don't have this templated in PandaDoc yet as it's so infrequent.

1. Download a copy of the [PostHog Cloud MSA](https://docs.google.com/document/d/155w70ZAHecVZcDqTq2_415dvaq2Bk-8QlEOozjq1hG8/edit#heading=h.y38xfjgcg4xm) as a Word Document (legal teams prefer this format) and share it with your Customer contact.
2. They may want to propose changes (also known as 'redlines').  Work with Fraser to get these agreed.
3. Create a new document in PandaDoc, you can choose to either import from Google Drive or upload from your local machine.  This should be the clean, non-redlined document as agreed by both parties.
4. Change the name to be `PostHog Cloud MSA - CUSTOMER LEGAL NAME`.
5. Add the Client and PostHog (fraser@posthog.com) as roles.
6. Add a Signature, Name and Title field for both PostHog and the Customer.
7. Check the signing order (Client, then PostHog normally).
8. Send for signature.

Sometimes large customers will ask for changes to our MSA. We have a list of the kinds of changes we will/won't consider in a private repo [here](https://github.com/PostHog/company-internal/blob/master/finance/sales%20contract%20changes) that you can generally agree to without the Ops team reviewing. However, if you are ever in doubt, ask Fraser. 

## Business Associate Agreement (BAA)

We offer HIPAA Compliance on PostHog Cloud and as such health companies will require us to sign a Business Associate Agreement with them. As this means we take on increased financial risk in case of a breach we ask them as a minimum to subscribe to one of the platform add-ons which is a guaranteed monthly payment. A maximum of one BAA per organization will be signed. Under most circumstances, it should be the company that owns the org/pays us.

1. Ask the customer to subscribe to the platform add-on (as well as any other paid plans they wish to use).  You can verify this in Vitally by ensuring that they are in the `Teams Plan` segment.
2. Create a new document from the [PandaDoc Template](https://app.pandadoc.com/a/#/templates/4psCXzU527sNE6WEbFBg3a).
3. All you need to do it set the `Client.Company` variable and then send it to them for review and signature.
4. It has been pre-signed by Fraser and will automatically add today's date as the date of signature for PostHog.
5. You'll get a notification when everybody has signed it - we have automation in place to ensure that the `HIPAA BAA Signed Date` property on the customer's Salesforce Account record is updated.

> We only provide our default BAA for platform add-on subscribers - customization requires >$20k annual spend. The BAA only remains active for as long as the customer is subscribed to a platform add-on - if they unsubscribe, we send them a message that their BAA will become inactive at the end of the month in which they cancelled. A customer who is on a platform add-on trial (with a credit card in PostHog) is eligible to sign a default BAA, but you should make it clear to them that the default BAA will be voided if/when the platform add-on subscription lapses. If the lead is not sure whether they will need a custom BAA and their usage wouldn't put them at $20K, then it is worth pushing them to get legal feedback by sending them our BAA before moving forward, else you risk spending a lot of time on an evaluation that ends up at $450/month.

