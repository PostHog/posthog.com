---
title: Procuring and selling via AWS
sidebar: Handbook
showTitle: true
---


PostHog is now available on AWS Marketplace for SaaS products. The way we've chosen to list our product is that it is not available as a public offering and instead is "listed" but only available via AWS "Private Offers", which means we create custom order forms for each customer through AWS that they accept via their portal.

AWS Marketplace lets vendors use their own terms and MSA. For now, PostHog team members set the price as a lump sum credit purchase for **annual pre-payment only**. Down the road, if we change our listing to public on the marketplace, we could set up usage-based billing through AWS (but that's future state).

## Why this matters

1. **Our ICP lives in AWS** - Product engineers already have AWS access and budget. Adding PostHog to their AWS bill just makes sense since we're part of their product infrastructure stack
2. **Procurement bypass** - Organizations have bigger, more flexible AWS bills. Way easier to add a line item there than set up a whole new vendor
3. **Customer kickbacks** - Buyers get ~3% of purchase price back as AWS credits (sweet deal for them)
4. **TAM incentives** - AWS TAMs get SPIF'd for marketplace sales (we should apply to ISV Accelerate to fully capitalize on this)

## Current requirements

For now, we're keeping it simple:
- **Annual contracts only** (upfront payment)
- **Minimum $100k deal size** (this is flexible, but let's start here)

## Using Clazar for private offers

Since AWS Marketplace can be a pain to navigate, we're using Clazar to manage this. Clazar ties private offers directly to Salesforce (something AWS doesn't do natively). Future state: would be nice if QuoteHog could create these directly too!

### Initial setup

**Before you start:**
- Make sure you have access to Clazar 
- Have signed order form from customer with "AWS Marketplace" selected as the billing method
- Have the customer's AWS account ID ready

### Creating a private offer via Clazar

#### Option 1: Direct from Salesforce (recommended)

1. **Open the opportunity** in Salesforce
2. **Navigate to the AWS Private Offers widget** (should be on the opportunity page)
3. **Click "Create Private Offer"** - Clazar pre-fills most fields from the opportunity
4. **Fill in the required fields:**
   - **Buyer AWS Account ID** (critical - double check this and it should be their management/root account ID)
   - **Offer Name** - Something clear like "PostHog Annual - [Company Name] - MM/YYYY"
   - **Contract Duration** - 12 months (we're annual only right now)
   - **Expiration Date** - Expiry on the offer itself. Usually 30 days out is fine.
5. **Configure pricing:**
   - Set as **upfront payment** (non-FPS offer)
   - Enter the negotiated price
   - Currency: USD (can do EUR, GBP, JPY if needed)
6. **Choose EULA type:**
   - Use **Standard Contract for AWS Marketplace** unless legal says otherwise
   - If custom EULA needed, upload the PDF (max 5 docs)
7. **Review and submit** - Takes ~45 minutes to generate in AWS (yes, really takes that long sometimes)

#### Option 2: Via Clazar platform

If you need more control or Salesforce isn't cooperating:

1. **Log into Clazar** at app.clazar.io
2. **Navigate to Private Offers** in the main menu
3. **Click "Create New Private Offer"**
4. **Fill in buyer details:**
   - Company name
   - AWS Account ID (must be exact)
5. **Configure offer details:**
   - Friendly offer name
   - Expiration date (when offer becomes void)
   - Contract duration
   - Offer type: Choose "Contract" with upfront payment
6. **Set dimensions and pricing:**
   - Add your product dimensions
   - Set prices for each dimension
   - For annual deals, configure as single upfront payment
7. **Legal terms:**
   - Select EULA type (Standard Contract or Custom)
   - Upload any additional documents if needed
8. **Review the status tab** - Should be green when ready
9. **Submit the offer**

### After creating the offer

1. **Wait for generation** (~45 minutes)
2. **Clazar sends notifications** when the offer is live
3. **Share with customer:**
   - Send them the private offer URL
   - Include the Offer ID for reference
   - Remind them to log into the AWS account specified
4. **Track in Salesforce** - Status syncs automatically via Clazar

### Common issues & solutions

**Customer can't see the offer:**
- They're not logged into the right AWS account
- Offer expired (check expiration date)
- Wrong AWS account ID used (most common issue)

**Offer needs changes after creation:**
- Can't edit accepted offers
- Create an Agreement-Based Offer (ABO) for modifications
- Customer accepts ABO, which cancels the previous agreement

**Payment not showing up:**
- AWS disbursements take time (check the disbursement schedule)
- Verify the offer was actually accepted in AWS

### Pro tips
- **Double-check AWS Account IDs** - This is where most mistakes happen
- **Set realistic expiration dates** - 30 days is standard, but adjust based on deal timeline
- **Keep offers simple** - Complex payment schedules = more room for error
- **Document everything in Salesforce** - Let Clazar sync do the heavy lifting
