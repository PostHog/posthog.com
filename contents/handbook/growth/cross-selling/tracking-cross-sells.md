---
title: Tracking cross sells
sidebar: Handbook
showTitle: true
---

# Cross-sell opportunity tracking

TAMs create Salesforce opportunities for cross-sell deals they're actively working. This is how we measure whether TAMs are driving multi-product adoption vs. benefiting from organic growth, and how we learn which motions actually work.

This is **measurement only** - it doesn't change how commission works.

## What counts as a cross-sell opportunity?

All four must be true:

- Customer is already paying for at least one PostHog product
- TAM is targeting adoption of a **different** product
- Expected MRR on the new product is **≥$100/month**
- TAM is running an actual sales motion (not just hoping they adopt it)

If a customer spontaneously starts using and paying for a product, you don't need to retroactively create an opp. This is for intentional motions only.

## How to create a cross-sell opportunity

Use the existing Salesforce record type: **`New revenue - existing customer`**

## Opportunity stages

| Stage | What it means |
|-------|---------------|
| **Discovery** | Identified use case, talking to stakeholders about the problem |
| **Demo** | Showing them the product, connecting it to their specific needs |
| **Trial** | Customer is actively testing the product (see trial guidelines below) |
| **Closed Won** | Customer is paying ≥$100/month on the product |
| **Closed Lost** | Didn't convert - document why |

Not every deal needs every stage. If a customer already knows the product and just needs help getting started, skip to Trial. The stages exist for tracking, not bureaucracy.

When closing an opp (won or lost), do it manually even though Vitally may auto-close goals when a revenue threshold is met. Consciously closing the opp shows you're on top of the account and creates a clean intent-to-outcome link in our data.

## Trial guidelines

If you're giving a customer extended time or capacity to try a product before paying, use one of these approaches:

### Option A: Billing limit

- Set a billing limit on the product (e.g., $500/month cap)
- Customer uses it, hits the limit, decides if they want to pay for more
- Time-box it: 30 days is reasonable, 60 days max

### Option B: Trial

- Add credits to their account to cover the trial period
- Document the amount and expiration
- Clear expectation: "We're giving you X weeks to try this for free"

### Either way

- Set a clear end date
- Schedule the follow-up conversation **before** the trial starts
- Document success criteria: what does "this worked" look like?

## What this is NOT

- **Not a quota change.** Commission still works the same way.
- **Not required for organic adoption.** Only for deals you're intentionally driving.
- **Not for tiny expansions.** <$100/month expected MRR doesn't need an opp unless it's part of a trial/POC leading to real adoption.

## What we're measuring

Cross-sell metrics are tracked in the sales growth review. After each quarter, we should be able to answer:

1. How many cross-sell oops did TAMs create?
2. What was the win rate?
3. Which products had the highest/lowest conversion?
4. What was the average deal size?
5. What was the average cycle time (discovery → closed)?
6. What reasons are we seeing for Closed Lost?
