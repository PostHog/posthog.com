---
title: Product stages
sidebar: Handbook
showTitle: true
---

We have many different products, all at different stages. This leads to some confusion - should we be focusing on feature parity or innovating on new features? How much do we need to care about stability vs it being fine to move fast and break things (but then quickly fix it after) How many new products should we launch and how much team staffing should there be? When should we start charging? When should we do wider launches? How do we signal to customers the different stages of a product’s maturity such that new projects don’t reduce the perceived quality of the main products? Should we keep investing in the smaller features or is doing the first 80% fine?

This page helps gives a guide for teams to answer those questions. It is a rough guide that should be adapted to the teams and individual products.

**Caveat:** this guide mainly applies to building products where the category already exists. Defining a new category often requires different ordering/thinking.

## The spectrum of MVP -> PMF -> Standalone best-in-class

Each product is on the following spectrum:
- MVP:
  - What does it look like?
    - The core features of the product are in production, we are using it internally and started the rollout
    - There are some rough edges
    - We don’t charge for it at first, enabling us to get feedback and validate demand
  - How do we get to MVP?
    - Early customer conversations to validate demand from our ICPs and determine the most important features
    - It’s fine to move fast and break things (but quickly fix them after)
    - Ruthlessly cut scope
    - Small team normally around 2 people
    - Should move quickly based on gut/existing solutions in the market.
- Product market fit (PMF):
  - What does it look like?
    - Strong traction with our ICP customers. We are often referenced as one of the options
    - Near feature parity with established tools (assuming a category already exists)
    - Differentiation is mainly through integration with the other tools. If we can’t get to PMF through this then we consider doing bigger feature innovations
    - Scalable and reliable. Want to reduce major bugs making it to production
    - Charging for it. Enough profit to cover the small team working on it
    - Many ICP users love the product but there are others on the market which do the job well too
    - We should give API access to everything
  - How do we get from MVP to PMF?
    - Can move quickly based on gut/existing solutions in the market.
    - As you get more usage, focus on feedback from customers that are paying or would be willing to pay if they had it. Particularly focus on feedback to prioritize what you should build, and that the solution works well for them
    - The less the PMF the more we should focus on nailing the basics
    - Start charging when you have a good base of users to give you feedback
    - The UX should feel familiar enough to existing solutions.
- Stand-alone best-in-class
  - What does it look like?
    - We are frequently mentioned and rated as the best product in that category when considered standalone
    - We are on track for having the biggest market share for that product among our ICPs
    - We genuinely believe the product is better than any others on the market.
    - The product is very robust and reliable. Major bugs rarely make it to production for established features
  - How do we get from PMF to best-in-class?
    - We sweat the small details
    - AND we are properly innovating with major new feature bets to keep ahead of the competition and best serve our customers
    - When major new features are shipped, after initial demand the quality is quickly bought up to speed with the rest of the product
    - Customer interviews deeply explore the problem and think from first principles to come up with novel solutions

## How do we choose when to move between stages?

- General principles
  - It can be different people taking the products through different stages; people will excel at different stages
  - What we don’t want to happen: a large number of products that never make it to PMF stage, are broken and buggy, we aren’t charging for, don’t add much value to the rest of the product, we don’t use much ourselves, and no one internally is driving it forward. If these are true we should use our judgment as to whether we should deprecate the feature.
- From idea to MVP
  - When someone has the conviction that we should build this (even if just for ourselves), ideally they can see a rough path to PMF for our ICP (it doesn’t need to be certain)
  - We should be willing to take bets on ideas. Some products won’t make it to PMF stage and should be depreciated. That’s fine and worth the upside of being able to make bets.
  - TODO: add links to the principles for what kind of products we should be building
- From MVP to PMF
  - This should be the default goal unless we lose confidence around building this product e.g. very low uptake or significantly more technical complexity than we want to ake on
  - We should push hard but recognize that some will take time. Particularly if the product appeals to a later stage ICP - as the company grows well acquire more of these customers and get more feedback
- From PMF to Best-in-class
  - By default we don’t aim to move every product from PMF to standalone best-in-class. Instead the differentiation of that product is likely that it deeply integrates with the other products such that together they are best-in-class. This does not mean we should do any investments in the PMF product. But we’d invest less into it than if we were aiming for best-in-class
  - We decide we want a product to be standalone best-in-class when we want the product to be a core growth engine. Customers choose PostHog for this product itself and it drives word of mouth “If you are looking for product analytics definitely used PostHog”. We can measure best-in-class by the number of new customers signing up specifically for that product and the market share growth of that product

## How to not go too broad?

- Limit the number of MVPs and make it explicit to customers they are MVP stage so we don't detract from the quality of the rest of the product
- The default goal of a new product should be to get it to PMF
- Focus on our ICP of startups, not enterprises, meaning we can get to PMF more quickly and with a reduced feature set
- Be very focused on our ICP and when we choose to expand it. This enables us to sell into the same customer and the integration of products compounds the value
