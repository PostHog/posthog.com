---
title: Billing
sidebar: Handbook
showTitle: true
---


## Managing billing

All PostHog instances talk to a common external **Billing Service**. This service is the single point for managing billing across PostHog Cloud US, PostHog Cloud EU (and ,formerly, self-hosted customers). 

The Billing Service is the source of truth for product information, what plans are offered on those products (eg a free vs a paid plan on Session Replay), and feature entitlements on those plans. Our payment provider Stripe is the source of truth for customer information, invoices, and payments. The billing service communicates with Stripe to pull all the relevant information together before responding to customer requests.

### Annual Plan Automation

To ensure consistency in the setup of annual plans we have [Zapier Automation](https://zapier.com/app/zaps/folder/1809976) to take care of all of the Stripe-related object setup.

#### Loading contract details

Once an [Order Form is closed in PandaDoc](/handbook/growth/sales/contracts#routing-an-order-form-for-review-and-signature), Zapier will add a new row to the [Annual Plan Table](https://tables.zapier.com/app/tables/t/01H9QPTRYEZVGFTJ84XMCYQFSK) with the PandaDoc ID of the document. The table will have the following information automatically filled in: PandaDoc Order Form, Company Name, Customer Email, Credit Amount, Discount, Price, Start Date, Term, PostHog Org ID. 

#### Upfront vs Monthly Payment Schedule

Customers can choose to pay their subscription fee upfront or in monthly installments. The setup process differs for each option, outlined below.

##### Upfront Payment Setup

###### Step 1: Update zapier table with existing Stripe ID

If this is a new contract for an existing customer, you will need to add their existing Stripe Customer ID manually to the table. You can find this information in Vitally under Traits. If this is a brand new customer, click “Create Stripe Customer” button to assign them a new ID.

###### Step 2: Create invoice
- Go to the [Annual Plan Table](https://tables.zapier.com/app/tables/t/01HGX2N9JXNV2EEDYARD24901R) and click “Create Invoice - Upfront”. This will:
  - Create a draft Invoice object against the Stripe Customer Object.
  - Add the ID of the Invoice to the table (for easy review later on). The due date of the invoice will be the Contract Start Date + 30 days which are our standard payment terms. You might need to manually change this if we have different terms with the customer.

###### Step 3: Verify invoice details and send
- Use the Invoice ID recorded in the table to locate the invoice in Stripe.
- Ensure all details are correct, particularly the Customer’s Billing/Shipping addresses and Tax ID on the Customer object.
- Send the invoice to the customer and wait for the payment to be completed.  Ensure that the customer is aware that payment is via Bank Transfer only (no checks).

**Do not proceed to the next steps until payment is confirmed.** Any credits added to an account gets automatically applied to outstanding invoices. If you add credits before payment is completed, the credits will settle any existing debts, and customer will not be able to make a payment.

###### Step 4: Apply credits
- Make sure that the payment is fully processed to avoid any automatic deductions.
- **If customer wishes to begin using credits immediately:** return to the Zapier table after you’ve verified payment completion and click the "Apply Credit" button.
- **If customer wishes to begin using credits  in the next billing cycle:** ask the RevOps team to apply the credits at the end of the current billing cycle.

###### Step 5: Schedule subscription
- If the client has an existing subscription, no further action is needed.
- If this is a brand new account:
  - Select checkboxes for all the products the client intends to use as part of their subscription.
  - Click the "Schedule Subscription" button. Using the data from the table row where the button was clicked, this will:
    - Consolidate all of the Price IDs into a query string which the Stripe API accepts.
    - Create a Subscription Schedule (as it may start in the future) containing all of the prices. We calculate the number of iterations based on the term of the contract. An iteration in this case is 1 year, the maximum allowed by Stripe.
    - Add the ID of the Subscription Schedule to the table

##### Monthly Payment Setup

###### Step 1: Update zapier table with existing Stripe ID
- Add the existing Stripe customer ID to the column labeled "Stripe ID - existing" in your Zapier table. It's crucial to start with this step as you will add credits to this ID while creating a subscription on a new ID to correctly capture payment.

###### Step 2: Create new Stripe ID
- Click the "Create Stripe Customer" button to generate a new Stripe customer ID for the same customer.

###### Step 3: Create new subscription
- Click the “Create and Add - Monthly Sub” button in the Zapier sheet. This will do the following:
  - Retrieve the annual cost from the "Price" column of your table.
  - Calculate monthly payment by dividing the annual cost by 12.
  - Under the "PostHog Credit" product category in Stripe, create a new custom pricing.
  - Assign this new pricing plan to the customer’s account.
  - Create a draft invoice for the first payment that is scheduled to go out in an hour.

###### Step 4: Verify subscription and invoice details
- Use the customer ID stored in the table to locate the customer's subscription in Stripe.
- Ensure the subscription details, including start date and associated pricing plan, are accurate.
- Verify the correctness of customer details such as billing/shipping addresses and Tax ID on the customer object.

###### Step 5: Apply credits
- **If customer wishes to begin using credits immediately:** return to the Zapier table after you’ve completed verifying subscription and invoice details, and click the "Apply credit - monthly" button.
- **If customer wishes to begin using credits in the next billing cycle:** ask the RevOps team to apply the credits at the end of the current billing cycle.

> If a customer is paying us by bank transfer, the default is to receive these through Stripe. Each customer will receive individual virtual account information to send these payments for Stripe to reconcile. If you create a new customer profile on Stripe, this virtual account information will change so it's important to update the customer. Although these bank details are automatically included on the annual invoices sometimes customers will ask for the bank details as part of their vendor onboarding process, and you can generate them by viewing the Stripe customer record and then adding a new Bank Transfer Account in the Payments section.  You can then click through on that payment method to download a PDF with the bank details to share with the customer.  If a customer is requesting to send us a transfer outside of Stripe, eg directly to us, please post in #team-people-ops to request the correct banking info to share with the customer. 

###### Step 6: Update Django Admin
- Navigate to the billing admin detail page for the customer (should add a column for this in the zap table?)
- Create a new Customer to stripe customer
  - Copy and paste the new stripe customer id and new stripe subscription id
  - Save!

### Stripe Products & Prices

> ⚠️ Modifying products and prices should be done carefully. If you aren't sure at any point contact the #growth team to check what you are doing

Each of our billable Products has an entry in Stripe with each Product having multiple Prices.
We use a billing config file to determine what is shown in the UI and how billing should behave.
We use very limited metadata on some of these prices to allow the Billing Service to appropriately load and offer products to the instances:


![Stripe products](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/handbook/growth/sales/stripe-products.png)



#### Custom metadata
**On Stripe Products**
* `posthog_product_key`: `posthog_analytics` | `session_replay` | ... -> This allows PostHog to find and map the relevant products. **Important:** There should never be more than 1 Stripe product with the same `posthog_product_key`. The list of keys is defined in the main billing config.

**On Stripe Product Prices**
The following keys are used to manage Startup prices:
* `plan` - Any Startup plan prices must have the `plan` metadata set to `startup` to have their subscription automatically moved to the default (paid) prices. If not, when their subscription ends they will instead be switched to the free plans for all products. 
* `valid_days` -> The number of days a price is valid for, before automatically switching to another plan (the `default` plan unless `move_to_price_id` is set). Useful to create pricing that is only valid for a specific period, e.g. for the startup plans. Note: if more than one price with `valid_days` is added to a subscription, the validity period will be the *shortest* of the two, before resetting all plans to the default ones 
* `move_to_price_id` -> Can be used to specify if the customer needs to be moved to a specific pricing, rather than the default one, at the end of the subscription period.


### Working with pricing

Each Product has multiple prices that can be used in a subscription. Which price is default depends on the billing config file.
The `default` price in Stripe does not affect the actual default price for a product. This is instead defined in the billing config.
In general, if coming from the UI, a customer will subscribe to certain prices depending on the config. There are special prices named `Free` which can be used to give a product for free. These can be added manually and are typically used for Enterprisey customers who pay a flat fee up-front and $0 for the actual usage (which we still want to track but not charge for).

#### Types of billing plans we support
We generally support the following types of billing plans:

- Standard metered
  - This includes usage-based and metered, even if it has custom price tiers or is a special program like the Startup program.
- Metered, but with discount coupon
- Flat first tier, metered after
- Up-front payment, $0 first tier, metered after
- Flat up-front, no metering (renegotiate contract if they go over)

If at all possible, it's best to stay with these types of billing plans because we already support them, and adding extra stuff will increase complexity. If you do need to add a different type of billing plan, chat with the growth team before agreeing to anything with a customer to make sure it's possible!

#### Coupons and Discounts
As much as possible the existing prices should be used in combination with `Coupons` to offer custom deals to customers. Coupons are applied to the _Customer_ in Stripe, not to the customer's subscription. 

1. Visit the customer in the Stripe dashboard.
2. Select Actions -> Apply Coupon.
3. Select the coupon to apply.
4. The UI should soon reflect the change. If you need it to reflect immediately, use the "Sync selected customers with Stripe" action in Django Admin.

When calculating usage limits, discounts are taken into consideration _before_ the limit is calculated. This means that if the customer sets a billing limit of $200 and has a 20% discount, they will get charged $200 for _$250 worth of volume_. 

#### Creating new or bespoke prices

1. Go to the appropriate product in question (**do not create your own Product**)
1. Click "Add another price"
1. **Important**: For metered products (e.g. Product Analytics, Session Replay), set up the price as follows:
    - Select `Recurring`, `Usage-based`, `Per tier`, and `Graduated`.
    - ![image](https://github.com/PostHog/posthog.com/assets/18598166/40bd393e-734e-417a-bea8-bd63f9f62c7d)
    - Under Advanced, set the "Metered usage charge method" to `Most recent usage value during period`. This is crucial as the Billing Service will send the correct number of units (events, recordings, etc) every day, so any errors that caused excess usage to be reported can self-heal with the next reporting cycle.
    - ![image](https://github.com/PostHog/posthog.com/assets/18598166/c71917a8-7bc9-4834-83d6-d38d1de2d4e8)
1. Expand the `additional options` and add a straightforward Price Description like `Custom - {date of creation}`
1. Add the tiers as you see fit
     - If the custom prices are for a product and addons (eg. Product analytics and Group analytics) the tier volumes need to be exactly the same between the two products/prices. If tier 3 for Product analytics is up to 15M and tier 3 for Group analytics is for 16M, you'll get errors from the billing service).
    - If you are making a custom price for just one product (ie. someone is getting special pricing for Product Analytics but will get the normal pricing for Group Analytics), make sure the tiers match up between the main product and the addons.
1. Add custom metadata if needed.

### Plans
> ⚠️ Modifying plans should be done carefully. If you aren't sure at any point contact the #growth team to check what you are doing

You can find a list of available plans in the billing repo. These are found inside `costants/plans`, divided by folder.
Each plan can have a list of features, and a price.
Features are used to infer which features are available in the product, for a customer on that plan.
You can manually change the plan for a customer by updating the `plans_map` in the billing admin panel.

### Updating subscriptions

Stripe subscriptions can be modified relatively freely for example if moving to a custom pricing plan. 

![Stripe subscription update](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/handbook/growth/sales/stripe-update-subscription.png)

1. Look up the customer on [Stripe dashboard][stripe_dashboard] using their email address or Stripe ID (this can be found in the Billing Service admin under `Customers`).
1. Click on the customer's current subscription.
1. Click on _Update subscription_.
1. Remove the old item from the pricing table and add the new item.
    - Enterprise: Use existing enterprise prices or create new ones.
    - Startup plan: Use existing Startup plan prices.
1. Click on _Update subscription_. Do not schedule the update for a later time. There will be unintended side effects if the changes are not applied immediately.
1. Do not prorate the subscription.
1. The changes should be reflected for the user within a few minutes.

> **NOTE:** Removing a metered product price (events, recordings) and adding a new price will likely reset the usage. This is fine as the Billing Service will update it during the next sync.


### Self-hosted differences

Self-hosted billing is no longer supported except for legacy customers who were using the paid kubernetes deployment.

