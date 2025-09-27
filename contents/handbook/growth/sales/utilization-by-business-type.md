---
title: Matching PostHog to a business type
sidebar: Handbook
showTitle: true
---

This guide provides detailed instructions on how to achieve key business metrics using PostHog's analytics platform. Each business type has specific metrics that matter most, and this guide shows you exactly how to set up PostHog to track and optimize for those metrics.

## B2B SaaS

### Common business problems & personas
B2B SaaS companies often grapple with a core set of challenges that directly impact growth and sustainability:

#### Key business problems
- **High churn rates** – Customers discontinuing subscriptions, leading to revenue loss and reduced customer lifetime value.
- **Low trial-to-paid conversion** – Users not converting from free or trial plans to paid subscriptions.
- **Poor feature adoption** – Users not utilizing key features that drive product value and stickiness.
- **Long sales cycles** – Extended time from initial lead engagement to customer conversion.
- **Low customer satisfaction** – Reflected in poor Net Promoter Scores (NPS) and negative customer feedback.
- **Inefficient onboarding** – Users dropping off or struggling during initial setup and product adoption.
- **Expansion revenue challenges** – Difficulty identifying opportunities or successfully upselling and cross-selling existing customers.
- **High support ticket volume** – An elevated number of support requests, often indicating underlying product issues or user friction.

#### Primary personas & their pain points
**Product managers**
- **Pain points:** Inability to identify which features drive retention, difficulty prioritizing roadmap items, lack of data on user behavior and product usage.
- **PostHog solutions:** Comprehensive feature usage tracking, granular cohort analysis, session recordings for in-depth UX insights, robust A/B testing for feature optimization and validation.

**Customer success managers**
- **Pain points:** Reactive churn management, challenges in proactively identifying at-risk customers, limited visibility into overall customer health.
- **PostHog solutions:** Data-driven churn prediction models, customizable customer health scoring, proactive engagement tracking, automated alerts for at-risk accounts based on behavioral signals.

**Sales teams**
- **Pain points:** Extended sales cycles, inefficient lead qualification processes, difficulty understanding specific prospect needs and product fit.
- **PostHog solutions:** Product usage-based lead scoring, detailed prospect behavior tracking, optimization of conversion funnels to accelerate deal velocity.

**Marketing teams**
- **Pain points:** High customer acquisition costs (CAC), inaccurate campaign attribution, difficulty measuring the true return on investment (ROI) of marketing efforts.
- **PostHog solutions:** Advanced UTM tracking, comprehensive conversion funnel analysis, cohort analysis by acquisition source, customizable campaign performance dashboards.

**Executives**
- **Pain points:** Lack of holistic visibility into business health, challenges in making data-driven strategic decisions, cumbersome stakeholder reporting.
- **PostHog solutions:** Intuitive executive dashboards, real-time key metric tracking, automated reporting, and actionable business intelligence insights.

### Key metrics & PostHog 
#### MRR/ARR (monthly/annual recurring revenue)
**Importance:** Measures the predictable revenue a SaaS business generates monthly or annually. It's crucial for forecasting, valuation, and understanding the company's financial health and growth trajectory.

**PostHog approach:** Track subscription events (subscription_created, subscription_upgraded, etc.) with properties like plan_tier, amount, and currency. PostHog helps analyze conversion funnels (e.g., trial_started to subscription_created), visualize revenue retention with cohort analysis on dashboards, and set up alerts for significant MRR changes. For non-technical users, autocapture on pricing pages and CTAs can power no-code funnels and session recordings to optimize conversion flows and pricing interactions.

#### CAC (customer acquisition cost)
**Importance:** The average cost to acquire a new customer. Understanding CAC is vital for marketing efficiency, profitability, and ensuring sustainable growth.

**PostHog approach:** Track marketing touchpoints (ad_clicked, demo_scheduled) and lead generation form submissions with properties like source, campaign, and UTM parameters. Integrate marketing spend data into PostHog for a unified view. Use funnel analysis to identify efficient acquisition channels and dashboards to visualize CAC trends by channel. Autocapture can track landing page visits and form submissions, enabling non-technical users to analyze lead quality by traffic source and optimize landing page UX with session recordings.

#### LTV (lifetime value)
**Importance:** The total revenue a business expects to generate from a single customer relationship over their lifetime. A high LTV indicates strong customer relationships and product value, enabling higher CACs and more aggressive growth strategies.

**PostHog approach:** Track all revenue-generating activities (subscription_payment, addon_purchase, upgrade) with customer segment and acquisition properties. Conduct cohort analysis for revenue retention and correlation analysis to identify high-value behaviors. PostHog's predictive analytics can forecast LTV. For non-technical users, autocapture can track feature usage and upgrade page visits to understand engagement patterns that correlate with high LTV, allowing for dashboards showing feature adoption by segment and alerts for potential churn signals impacting LTV.

#### Churn rate
**Importance:** The rate at which customers cancel their subscriptions or cease to use a service. High churn is detrimental to growth and directly impacts MRR/ARR and LTV, highlighting product-market fit or customer experience issues.

**PostHog approach:** Monitor engagement and usage patterns (feature_used, login, session_started) with properties like user_activity_level and feature_adoption. Use session recordings to understand behavior of churned users and correlation analysis to pinpoint churn indicators. Set up automated churn prediction models and alerts for at-risk users. Non-technical users can leverage autocapture to track declines in activity, analyze pages churned users stop visiting, and use session recordings to review churned user journeys.

#### NPS (net promoter score)
**Importance:** A widely used metric to gauge customer loyalty and satisfaction, indicating a customer's willingness to recommend a product or service. High NPS often correlates with retention and expansion revenue.

**PostHog approach:** Implement in-app NPS surveys using PostHog's survey feature. Track nps_survey_submitted events with user segment and usage properties. Analyze correlations between NPS and product usage patterns. Non-technical users can easily create surveys, configure triggers, and track completion rates. Dashboards can show NPS trends by segment, and session recordings can analyze user interactions with survey prompts to optimize feedback collection.

#### Feature adoption
**Importance:** Measures the extent to which users discover, use, and continue to use specific product features. High feature adoption indicates that users are deriving value, which is crucial for retention, upsell opportunities, and validating product development efforts.

**PostHog approach:** Track granular feature usage (feature_accessed, feature_completed) with feature name and user segment properties. Use funnel analysis for onboarding flows and session recordings to identify friction. Implement feature flags for controlled rollouts and A/B testing for optimization. Non-technical users can use autocapture for feature page visits and button clicks, analyze user journeys to feature discovery, and create dashboards for adoption rates. Alerts can be set for changes in feature usage.

## B2C SaaS

### Common business problems & personas

#### Key business problems
- **High user churn** – Consumers canceling subscriptions after initial excitement
- **Low activation rates** – Users not completing key onboarding steps
- **Poor user engagement** – Users not returning to use the product regularly
- **High customer acquisition costs** – Expensive to acquire individual consumers
- **Low viral coefficient** – Users not referring friends and family
- **Poor mobile experience** – Mobile users having difficulty with the product
- **Seasonal usage patterns** – Inconsistent usage throughout the year
- **Difficulty scaling support** – High volume of individual user support requests

#### Primary personas & their pain points

**Product Managers**
- **Pain points:** High user churn, low activation rates, poor user engagement, difficulty understanding consumer behavior
- **PostHog solutions:** User behavior analysis, activation funnel optimization, engagement tracking, consumer journey mapping

**Growth Teams**
- **Pain Points:** High CAC, low viral coefficient, poor user acquisition, difficulty scaling growth
- **PostHog Solutions:** CAC analysis, viral coefficient tracking, user acquisition optimization, growth loop identification

**Customer Success Teams**
- **Pain Points:** High support volume, poor user satisfaction, difficulty scaling support, low user retention
- **PostHog Solutions:** Support ticket analysis, user satisfaction tracking, automated support optimization, retention analytics

**Marketing Teams**
- **Pain Points:** Poor campaign attribution, high CAC, ineffective user acquisition, seasonal usage challenges
- **PostHog Solutions:** Campaign attribution tracking, CAC optimization, user acquisition analysis, seasonal trend identification

**Mobile Teams**
- **Pain Points:** Poor mobile experience, low mobile engagement, mobile-specific bugs, app store optimization
- **PostHog Solutions:** Mobile experience analysis, mobile engagement tracking, mobile bug monitoring, app store performance analytics

### Key metrics & PostHog
#### User Activation Rate
**Importance:** Measures the percentage of new users who complete key onboarding steps and experience the product's core value. High activation is crucial for retention and indicates a successful onboarding experience.

**PostHog approach:** Track activation events (`account_created`, `onboarding_completed`) with properties like activation step and acquisition source. Use funnel analysis to optimize time-to-value, and cohort analysis to track activation rates on dashboards. Session recordings can help identify activation friction points, and alerts can be set for activation rate drops. Non-technical users can use autocapture for onboarding page visits and tutorial interactions to create no-code funnels and analyze user behavior.

#### Daily/Monthly Active Users (DAU/MAU)
**Importance:** Measures user engagement and product stickiness by tracking the number of unique users who interact with the product on a daily or monthly basis. A high DAU/MAU ratio indicates strong, consistent user value.

**PostHog approach:** Track user activity events like `session_started` and `feature_used` with properties such as user segment and session duration. Create dashboards for real-time DAU/MAU tracking and trend analysis. Calculate stickiness (DAU/MAU ratio) and use cohort analysis to track engagement over time. Alerts can be configured for significant engagement drops. Autocapture can track page visits and feature interactions, enabling non-technical users to analyze engagement patterns and identify popular features.

#### Customer Lifetime Value (CLV)
**Importance:** Represents the total revenue a business can expect from a single customer account throughout their relationship. CLV is a key indicator of long-term profitability and customer loyalty.

**PostHog approach:** Track all revenue events (`subscription_started`, `purchase_made`) with properties like purchase amount and acquisition source. Use cohort analysis to analyze CLV by acquisition month and correlation analysis to identify high-value behaviors. PostHog's predictive analytics can be used for CLV forecasting. For non-technical users, autocapture on purchase pages and upgrade buttons helps track the user journey to purchase and identify which features drive upgrades, with session recordings providing insights into purchase behavior.

#### Viral Coefficient
**Importance:** Measures the number of new users an existing user generates, indicating the effectiveness of viral loops and word-of-mouth growth. A coefficient greater than one signifies exponential growth.

**PostHog approach:** Track viral events like `referral_sent` and `invitation_accepted` with properties such as referral type and conversion rate. Use funnel analysis to optimize referral flows and A/B test referral incentives and messaging. Dashboards can show viral coefficient trends. Non-technical users can use autocapture to track share button clicks and referral page visits, using session recordings to understand and optimize referral behavior.

#### User Retention Rate
**Importance:** The percentage of users who continue to use the product over a given period. It's a critical metric for sustainable growth, reflecting long-term product value and user satisfaction.

**PostHog approach:** Track retention events like `user_returned` and `session_started`. Create retention dashboards with cohort analysis by acquisition source to track trends over time. Use session recordings to understand the behavior of retained users and correlation analysis to identify key retention-driving features. Set up automated alerts for retention drops. Autocapture allows non-technical users to track user return patterns and feature usage that correlates with retention.

#### Mobile App Performance
**Importance:** Measures the responsiveness, stability, and overall user experience of a mobile application. Good performance is essential for user satisfaction and retention on mobile devices.

**PostHog approach:** Track mobile-specific events like `app_opened` and `app_crashed` with properties such as app version and device type. Use PostHog's real user monitoring for performance and Core Web Vitals tracking. Create mobile performance dashboards, set up crash monitoring with alerts, and use session recordings to identify mobile-specific UX issues. Non-technical users can leverage autocapture to track mobile interactions and compare mobile vs. desktop usage patterns.

## E-commerce

### Common business problems & personas

#### Key business problems
- **High cart abandonment rates** – Customers adding items but not completing purchases
- **Low conversion rates** – Visitors not converting to customers
- **Poor product discovery** – Customers unable to find products they want
- **High return rates** – Products being returned frequently
- **Seasonal inventory issues** – Over/under stocking during peak periods
- **Poor mobile experience** – Mobile users having difficulty shopping
- **Low customer lifetime value** – Customers making only one purchase
- **Ineffective marketing attribution** – Difficulty tracking which campaigns drive sales

#### Primary personas & their pain points

**E-commerce Managers**
- **Pain points:** Can't identify why customers abandon carts, struggle to optimize product pages, lack visibility into customer journey
- **PostHog solutions:** Cart abandonment funnels, session recordings for UX insights, conversion rate optimization, customer journey mapping

**Marketing Teams**
- **Pain Points:** Poor campaign attribution, difficulty measuring marketing ROI, ineffective retargeting campaigns
- **PostHog Solutions:** UTM tracking, conversion funnel analysis, cohort analysis by traffic source, retargeting audience creation

**Product Teams**
- **Pain Points:** Poor product page performance, low product discovery, ineffective search functionality
- **PostHog Solutions:** Product page heatmaps, search behavior tracking, product recommendation optimization, A/B testing for product pages

**Customer Service Teams**
- **Pain Points:** High support ticket volume, difficulty understanding customer issues, poor customer satisfaction
- **PostHog Solutions:** Customer journey analysis, session recordings for issue identification, customer satisfaction tracking, support ticket correlation

**Inventory Managers**
- **Pain Points:** Poor demand forecasting, seasonal inventory issues, over/under stocking
- **PostHog Solutions:** Product performance tracking, demand pattern analysis, seasonal trend identification, inventory optimization insights

### Key metrics & PostHog

#### GMV (Gross Merchandise Value)
**Importance:** Represents the total value of all goods sold over a specific period. GMV is the primary measure of an e-commerce platform's scale and is essential for understanding top-line growth and market share.

**PostHog approach:** Track all purchase events (`product_viewed`, `add_to_cart`, `purchase_completed`) with properties like product category, price, and quantity. Connect to your e-commerce platform for comprehensive data. Create dashboards for real-time GMV tracking and product performance analysis by category. Use cohort analysis to track customer value over time and set up alerts for unusual GMV patterns. For non-technical users, autocapture on product pages and "add to cart" buttons can track the conversion journey and identify popular products, with session recordings helping to optimize product pages.

#### AOV (Average Order Value)
**Importance:** The average amount spent each time a customer places an order. Increasing AOV is a key strategy for maximizing revenue without increasing the number of customers, directly impacting profitability.

**PostHog approach:** Track cart and purchase events (`cart_updated`, `purchase_completed`) with properties like cart value and discount applied. Use funnel analysis to optimize the cart and identify abandonment points. A/B test pricing and product recommendations to find effective upselling strategies. Use correlation analysis to identify behaviors of customers with high AOV. Non-technical users can use autocapture to track interactions on the cart page, analyze abandonment patterns, and use session recordings to optimize the checkout flow.

#### Conversion Rate
**Importance:** The percentage of visitors who complete a purchase. This is a critical metric for gauging the effectiveness of the entire customer journey, from landing page to checkout, and is a primary indicator of site performance and user experience.

**PostHog approach:** Track all steps in the conversion funnel (`page_viewed`, `product_viewed`, `add_to_cart`, `checkout_started`, `purchase_completed`) with properties like traffic source and device type. Create comprehensive conversion funnels to identify drop-off points and use session recordings to understand checkout friction. A/B test checkout flows and product pages to optimize the user path. Non-technical users can use autocapture to track all funnel page visits and interactions, creating funnels and using session recordings to optimize conversion paths with no code.

#### Cart Abandonment
**Importance:** The rate at which users add items to their cart but leave without completing the purchase. A high cart abandonment rate often indicates friction in the checkout process, unexpected costs, or a poor user experience.

**PostHog approach:** Track cart interactions like `add_to_cart` and `remove_from_cart`. Use session recordings to understand the behavior of users who abandon their carts, and implement exit-intent surveys to gather direct feedback on abandonment reasons. Create funnels that specifically track the checkout process to pinpoint exact drop-off points. This data can inform cart abandonment recovery strategies. Non-technical users can use autocapture to track all cart page interactions and build abandonment funnels to analyze user behavior.

#### Customer Lifetime Value
**Importance:** The total revenue a business can expect from a single customer throughout their relationship. CLV is vital for making strategic decisions about marketing spend, customer acquisition, and retention efforts, ensuring long-term profitability.

**PostHog approach:** Track all customer interactions, including `purchase_completed`, `return_requested`, and `support_contacted`, with properties like purchase history and acquisition source. Create cohort analyses by acquisition month to understand how customer value evolves. Use correlation analysis to identify behaviors of high-value customers and PostHog's predictive analytics for CLV forecasting. Non-technical users can use autocapture on account and order history pages to track engagement patterns and use session recordings to understand high-value customer behavior.

## Marketplace

### Common business problems & personas

#### Key business problems
- **Supply-demand imbalance** – Too many buyers/sellers on one side of the marketplace
- **Low trust and safety** – Users concerned about fraud or poor quality
- **Poor matching algorithms** – Buyers and sellers not connecting effectively
- **High customer acquisition costs** – Expensive to acquire both buyers and sellers
- **Network effects challenges** – Difficulty achieving critical mass
- **Payment and escrow issues** – Complex payment flows and trust concerns
- **Quality control problems** – Inconsistent service/product quality
- **Geographic expansion challenges** – Difficulty scaling to new markets

#### Primary personas & their pain points

**Marketplace Operations Managers**
- **Pain points:** Can't balance supply and demand, struggle with quality control, lack visibility into marketplace health
- **PostHog solutions:** Supply-demand analytics, quality metrics tracking, marketplace health dashboards, operational insights

**Trust & Safety Teams**
- **Pain Points:** High fraud rates, poor user verification, difficulty identifying bad actors
- **PostHog Solutions:** Fraud detection patterns, user behavior analysis, trust score tracking, automated risk alerts

**Product Managers**
- **Pain points:** Poor matching algorithms, low user engagement, ineffective search and discovery
- **PostHog solutions:** User behavior analysis, search optimization, matching algorithm improvement, engagement tracking

**Growth Teams**
- **Pain Points:** High CAC for both sides, poor network effects, slow marketplace growth
- **PostHog Solutions:** Network effects measurement, growth loop optimization, viral coefficient tracking, user acquisition analysis

**Customer Success Teams**
- **Pain Points:** High support volume, poor user satisfaction, difficulty resolving disputes
- **PostHog Solutions:** User journey analysis, satisfaction tracking, dispute resolution insights, support optimization

### Key metrics & PostHog

#### GMV (Gross Merchandise Value)
**Importance:** Represents the total value of all transactions between buyers and sellers on the platform over a specific period. It is the primary indicator of a marketplace's scale, liquidity, and overall health, reflecting its ability to facilitate transactions and generate value for its users.

**PostHog approach:** Track marketplace transaction events like `listing_viewed`, `booking_requested`, and `transaction_completed` with properties such as category, price, seller_id, and buyer_id. Integrate with payment processors for comprehensive data. Use PostHog to create real-time GMV dashboards with breakdowns by category, set up seller and buyer performance tracking, conduct cohort analysis to monitor marketplace growth, and create alerts for unusual transaction patterns. Non-technical users can use autocapture to track listing views and booking requests, creating funnels to analyze the path to a completed transaction and using session recordings to optimize the user journey.

#### Take Rate
**Importance:** The percentage of GMV that the marketplace captures as revenue (commission or fees). It is a crucial metric for understanding the marketplace's business model effectiveness and profitability. Optimizing the take rate is key to sustainable growth.

**PostHog approach:** Track commission events like `commission_earned` from `transaction_completed` events, with properties for transaction amount, commission percentage, and category. Analyze revenue and profitability by category on dashboards. This allows for identifying opportunities to optimize the take rate, for example by analyzing its drivers with correlation analysis and setting up alerts for significant changes. Non-technical users can build dashboards to monitor take rate trends across different product categories or seller tiers, helping to inform pricing strategy without writing any code.

#### Supply/Demand Balance
**Importance:** Measures the equilibrium between the number of sellers (supply) and buyers (demand) on the platform. A balanced marketplace ensures a good user experience for both sides, preventing situations like too few products for buyers or too few customers for sellers, which can lead to churn.

**PostHog approach:** Track supply-side events (`listing_created`, `service_offered`) and demand-side events (`search_performed`, `booking_requested`). Use properties like category, location, and search terms to analyze supply-demand gaps on dashboards. Funnel analysis can reveal booking conversion rates, while alerts can notify of imbalances, helping to identify and act on new market opportunities. Non-technical users can create dashboards that visualize searches with no results, providing a simple way to spot unmet demand and guide supply-side growth efforts.

#### Network Effects
**Importance:** Measures how the value of the platform increases for users as more people use it. Strong network effects create a powerful competitive advantage (a "moat") and are the engine of sustainable, viral growth for marketplaces. It's what makes a marketplace more valuable as it scales.

**PostHog approach:** Track network interaction events like `user_referred`, `invitation_accepted`, and `cross_side_activity` (e.g., a user being both a buyer and seller). Use properties to distinguish user types. Dashboards can visualize network growth and viral coefficients. Cohort analysis is key to measuring how network effects develop over time for different user groups, and alerts can highlight opportunities for growth. Non-technical users can use autocapture on referral pages and share buttons to analyze the effectiveness of viral loops and optimize the user flow with session recordings.

#### Trust & Safety Metrics
**Importance:** Trust is the currency of a marketplace. These metrics, such as user ratings, review rates, fraud reports, and dispute rates, measure the level of safety and reliability on the platform. High trust is essential for encouraging transactions, retaining users, and building a strong brand reputation.

**PostHog approach:** Track trust-related events like `review_submitted`, `dispute_filed`, and `fraud_detected`, enriched with properties on user reputation and transaction history. Dashboards can monitor trust scores and fraud rates. Session recordings are invaluable for investigating suspicious user behavior and understanding how trust is built (or broken) in user flows. Set up alerts for fraud signals and use correlation analysis to identify key indicators of trust. Non-technical users can create surveys to collect user feedback on trust and use session recordings to review the user journey for those who file disputes.

## Developer Tools

### Common business problems & personas

#### Key business problems
- **Low developer adoption** – Developers not integrating or using the tool
- **High API error rates** – Poor API performance and reliability
- **Poor documentation engagement** – Developers struggling to understand the product
- **Low community engagement** – Lack of developer community growth
- **High support ticket volume** – Developers needing extensive support
- **Poor onboarding experience** – Developers dropping off during setup
- **Low feature adoption** – Developers not using advanced features
- **Difficulty measuring developer success** – Hard to track developer outcomes

#### Primary personas & their pain points

**Developer Relations Teams**
- **Pain points:** Low developer adoption, poor community engagement, difficulty measuring developer success
- **PostHog solutions:** Developer adoption tracking, community engagement analytics, developer success metrics, community health monitoring

**Product Engineers**
- **Pain points:** High API error rates, poor performance, difficulty debugging issues
- **PostHog solutions:** API performance monitoring, error tracking, real user monitoring, performance optimization insights

**Technical Documentation Teams**
- **Pain points:** Poor documentation engagement, developers struggling to find answers, high support volume
- **PostHog solutions:** Documentation usage analytics, search behavior tracking, content performance analysis, support ticket correlation

**Developer Success Teams**
- **Pain points:** High support ticket volume, poor onboarding experience, low feature adoption
- **PostHog solutions:** Support ticket analysis, onboarding funnel optimization, feature adoption tracking, developer journey mapping

**Growth Teams**
- **Pain points:** Low developer acquisition, poor retention, difficulty measuring developer LTV
- **PostHog solutions:** Developer acquisition tracking, retention analysis, developer LTV measurement, growth loop optimization

### Key metrics & PostHog

#### Developer Adoption
**Importance:** Measures the rate at which developers start using a tool, from initial signup to making their first API call. It's the most critical top-of-funnel metric for developer tools, as it indicates the health of the onboarding process and the tool's initial appeal. High adoption is a leading indicator of future growth and product-market fit.

**PostHog approach:** Track key developer touchpoints like `account_created`, `sdk_installed`, and `api_call_made` with properties for tech stack and company size. Create adoption funnels to analyze the journey from first contact to active use, identifying drop-off points. Use cohort analysis to track developer retention over time and map the developer journey to understand common paths to success. Alerts can signal developer churn risk. Non-technical users, like DevRel teams, can build these funnels and dashboards without code to monitor adoption trends and measure the impact of their initiatives.

#### API Usage
**Importance:** Tracks the frequency, volume, and patterns of API calls made by developers. This metric is vital for understanding which features are most valuable, how developers are integrating the product, and the overall health and performance of the API. It directly reflects product engagement and stickiness for a developer-focused product.

**PostHog approach:** Instrument all API endpoints to track events like `api_request` and `api_error`, with properties for the specific endpoint, response time, and error type. Create API performance dashboards to monitor usage, latency, and error rates in real-time. Set up alerts for performance degradation or spikes in errors. Use correlation analysis to understand which usage patterns are associated with retention or expansion. Non-technical users can use dashboards to see which endpoints are most popular and identify which customers are experiencing the most errors.

#### Documentation Engagement
**Importance:** For developer tools, documentation is the product. This metric measures how developers interact with documentation, including page views, search queries, and time spent on pages. High engagement indicates that the documentation is useful and helps developers solve problems, which is critical for adoption and reducing support load.

**PostHog approach:** Track documentation interactions like `docs_page_viewed`, `code_sample_copied`, and `tutorial_completed`, with properties for the page, search terms, and user segment. Use session recordings to see where developers get stuck or confused. Analyze search patterns to identify content gaps and create dashboards to monitor documentation effectiveness. Non-technical users, like technical writers, can use these insights to prioritize content updates and improve the developer experience without needing to write code.

#### Community Growth
**Importance:** Measures the health and vibrancy of the developer community around a product (e.g., on GitHub, Slack, Discord). A growing, active community provides social proof, drives word-of-mouth adoption, offers scalable support, and is a rich source of product feedback. It acts as a moat and a powerful growth engine.

**PostHog approach:** Track community interactions from various platforms by sending events like `forum_post_created`, `github_issue_opened`, or `community_event_attended`. Use properties to segment by contribution level and topic. Create dashboards to monitor community engagement and growth trends. Use cohort analysis to track member retention and identify "power users" who can become community champions. Non-technical users, like community managers, can easily track these metrics to demonstrate the value of their programs.

#### Support Ticket Volume
**Importance:** The number of support tickets created by developers. While some tickets are expected, a high volume, especially on recurring themes, points to friction in the product, confusing documentation, or a poor onboarding experience. Analyzing this data is key to improving the product and reducing operational costs.

**PostHog approach:** Integrate your support system (e.g., Zendesk, Jira) with PostHog to track `support_ticket_created` and `support_ticket_resolved` events. Enrich these events with properties like ticket type, priority, and resolution time. Use correlation analysis to link support tickets to specific in-product behaviors or documentation pages, identifying the root cause of developer friction. Dashboards can help monitor support trends and efficiency. This allows non-technical team members to identify which product areas are generating the most support load.

## Fintech

### Common business problems & personas

#### Key business problems
- **High fraud rates** – Sophisticated fraud attempts and false positives
- **Poor compliance tracking** – Difficulty meeting regulatory requirements
- **Low transaction success rates** – Payment failures and processing issues
- **High customer acquisition costs** – Expensive to acquire and verify customers
- **Poor user trust** – Users concerned about security and data privacy
- **Complex onboarding flows** – Lengthy KYC/AML processes causing drop-offs
- **Low feature adoption** – Users not utilizing advanced financial features
- **Regulatory reporting challenges** – Difficulty generating required reports

#### Primary personas & their pain points

**Risk & Compliance Teams**
- **Pain points:** High fraud rates, poor compliance tracking, regulatory reporting challenges
- **PostHog solutions:** Fraud detection patterns, compliance monitoring, regulatory reporting automation, risk assessment analytics

**Product Managers**
- **Pain points:** Poor user trust, complex onboarding flows, low feature adoption
- **PostHog solutions:** User trust analysis, onboarding optimization, feature adoption tracking, user experience improvement

**Engineering Teams**
- **Pain points:** High transaction failure rates, poor API performance, security concerns
- **PostHog solutions:** Transaction monitoring, API performance tracking, security event monitoring, error rate optimization

**Customer Success Teams**
- **Pain points:** High support volume, poor customer satisfaction, complex issue resolution
- **PostHog solutions:** Support ticket analysis, customer satisfaction tracking, issue resolution insights, customer journey optimization

**Growth Teams**
- **Pain points:** High CAC, poor conversion rates, difficulty measuring customer LTV
- **PostHog solutions:** CAC analysis, conversion funnel optimization, customer LTV measurement, growth loop identification

### Key metrics & PostHog

#### Transaction Volume
**Importance:** Measures the total number or value of transactions processed by the platform. This is a fundamental indicator of a fintech product's adoption, usage, and overall scale. It directly impacts revenue and is a key signal of market traction and business health.

**PostHog approach:** Track all financial transaction events like `transaction_initiated`, `transaction_completed`, and `transaction_failed` with detailed properties such as transaction type, amount, currency, and user segment. Use dashboards for real-time monitoring of transaction volume and success rates. Correlation analysis can help understand what user behaviors lead to more transactions, and alerts can be set for unusual spikes or dips in activity. Non-technical users can build funnels to analyze the transaction flow and identify drop-off points without writing any code.

#### Fraud Rate
**Importance:** The percentage of transactions that are fraudulent. In fintech, managing fraud is critical for financial stability, maintaining user trust, and meeting regulatory obligations. A low fraud rate is essential for long-term viability and building a reputable platform.

**PostHog approach:** Track fraud and risk-related events such as `fraud_detected`, `risk_assessment_failed`, or `verification_completed`. Enrich this data with properties like risk factors, fraud type, and user behavior patterns. Session recordings are invaluable for investigating suspicious user behavior to understand fraud vectors. Create dashboards to monitor fraud rates in real-time and set up alerts for emerging fraud patterns. Non-technical risk teams can use session recordings to review suspicious sessions flagged by alerts.

#### Compliance Metrics
**Importance:** Measures adherence to financial regulations like KYC (Know Your Customer) and AML (Anti-Money Laundering). For fintech companies, compliance is not optional; it's a license to operate. Tracking these metrics is crucial for avoiding fines, legal penalties, and reputational damage.

**PostHog approach:** Track all compliance-related events, such as `kyc_started`, `kyc_completed`, and `aml_check_failed`. Use properties to log the compliance type, status, and user segment. This creates a detailed audit trail for regulatory purposes. Dashboards can provide a real-time view of compliance status and help monitor the efficiency of these critical flows. Alerts can be configured to flag compliance failures, allowing teams to act quickly. Non-technical compliance officers can use funnels to analyze and optimize the KYC process.

#### Customer Acquisition Cost
**Importance:** The total cost to acquire a new, verified customer. Fintech often has high acquisition costs due to marketing, compliance, and verification expenses. Understanding and optimizing CAC is crucial for ensuring profitability and scaling the business sustainably.

**PostHog approach:** Track the entire acquisition funnel, from `ad_clicked` and `account_opened` to `verification_completed` and `first_transaction`. Enrich these events with properties like acquisition source, campaign, and verification costs. Use funnel analysis to identify drop-off points in the onboarding and KYC process. A/B testing can be used to optimize landing pages and onboarding flows to reduce CAC. Non-technical marketers can use dashboards to compare the CAC and LTV across different channels.

#### Regulatory Reporting
**Importance:** This tracks the ability of the company to generate accurate and timely reports for regulatory bodies. Efficient and reliable reporting processes are essential for demonstrating compliance and avoiding penalties. While PostHog doesn't generate the reports, it can monitor the internal processes that do.

**PostHog approach:** Track internal events related to the reporting process, such as `report_generated`, `audit_trail_requested`, and `compliance_check_completed`. Use properties to specify the report type and its status. This provides visibility into the operational health of the reporting systems. Dashboards can be used to monitor the success and timeliness of report generation, and alerts can be set up to flag any failures or delays in the process, ensuring the compliance team is aware of any issues.

## Healthcare/Medtech

### Common business problems & personas

#### Key business problems
- **Poor patient outcomes** – Patients not achieving desired health results
- **Low user adoption** – Healthcare providers not using the system effectively
- **Compliance violations** – Difficulty meeting HIPAA and other regulatory requirements
- **Poor clinical workflow efficiency** – Inefficient processes causing delays
- **Data accuracy issues** – Incorrect or incomplete patient data
- **High training costs** – Expensive to train healthcare staff on new systems
- **Poor integration** – Systems not working well with existing healthcare infrastructure
- **Security concerns** – Patient data privacy and security risks

#### Primary personas & their pain points

**Clinical Teams**
- **Pain points:** Poor clinical workflow efficiency, data accuracy issues, difficulty tracking patient outcomes
- **PostHog solutions:** Workflow optimization, data quality monitoring, patient outcome tracking, clinical efficiency analytics

**Compliance Officers**
- **Pain points:** Compliance violations, poor audit trails, difficulty meeting regulatory requirements
- **PostHog solutions:** Compliance monitoring, audit trail automation, regulatory reporting, data access tracking

**IT/Engineering Teams**
- **Pain points:** Poor system integration, security concerns, performance issues
- **PostHog solutions:** Integration monitoring, security event tracking, performance optimization, system health monitoring

**Training Teams**
- **Pain points:** High training costs, poor user adoption, difficulty measuring training effectiveness
- **PostHog solutions:** User adoption tracking, training effectiveness measurement, onboarding optimization, learning analytics

**Product Managers**
- **Pain points:** Poor user experience, low feature adoption, difficulty measuring clinical impact
- **PostHog solutions:** User experience analysis, feature adoption tracking, clinical impact measurement, product optimization

### Key metrics & PostHog

#### Patient Outcomes
**Importance:** This is the core metric for any healthcare product, measuring the actual health impact on patients. Demonstrating positive patient outcomes is crucial for clinical validation, provider adoption, regulatory approval, and building patient trust. It is the ultimate measure of product value and efficacy.

**PostHog approach:** Track key events in the patient journey, such as `treatment_plan_started`, `outcome_measured`, and `follow_up_completed`. Use properties to segment by treatment type, patient demographics, and specific outcome metrics. Cohort analysis can track how outcomes trend over time for different patient groups. Dashboards can visualize progress towards clinical goals, and correlation analysis can help identify which product features are linked to better outcomes. Non-technical users, like clinicians, can use dashboards to monitor patient progress without writing code.

#### Compliance Metrics
**Importance:** Healthcare is a highly regulated industry (e.g., HIPAA in the US). Compliance metrics track adherence to these regulations, particularly around data privacy and security. Failure to comply can result in severe penalties, loss of trust, and legal action, making it a foundational requirement for any MedTech product.

**PostHog approach:** Track all compliance-related events, such as `hipaa_audit_trail_accessed`, `data_access_logged`, and `patient_consent_obtained`. Properties should include the user role, type of data accessed, and audit results to create an immutable log. Dashboards can provide a real-time view of compliance activities, and alerts can be set up for any unauthorized access attempts or compliance failures. Non-technical compliance officers can use these dashboards to monitor activity and generate reports.

#### User Adoption
**Importance:** Measures how effectively healthcare providers (doctors, nurses, etc.) are integrating a new tool into their daily work. Low adoption by clinicians can undermine the intended benefits of a technology, regardless of its potential. High adoption is key to realizing efficiency gains and improving patient care at scale.

**PostHog approach:** Track user interactions such as `feature_used`, `workflow_completed`, and `training_module_completed`. Segment by user role (e.g., doctor, nurse) using properties. Adoption funnels can show where users drop off during onboarding. Session recordings are invaluable for understanding how clinicians use the product in a real-world context. Alerts can flag low adoption in specific departments. Non-technical training teams can analyze session recordings to improve their training materials.

#### Clinical Workflow Efficiency
**Importance:** Measures the time and effort required for clinicians to complete tasks using the product. In the high-pressure healthcare environment, time is a critical resource. Improving workflow efficiency can reduce clinician burnout, lower operational costs, and allow more time for direct patient care.

**PostHog approach:** Track workflow events from start to finish: `workflow_started`, `step_completed`, `workflow_completed`. Use properties to capture the duration of each step and the user role. Funnel analysis is perfect for identifying bottlenecks where users get stuck or take too long. Dashboards can monitor average completion times for key workflows. Non-technical managers can use these funnels to identify areas for process improvement without needing technical assistance.

#### Data Accuracy
**Importance:** In healthcare, critical decisions are made based on patient data. Inaccurate or incomplete data can lead to misdiagnosis, incorrect treatment, and serious patient harm. This metric tracks the integrity and reliability of the data within the system, which is fundamental to patient safety.

**PostHog approach:** Track data entry and validation events like `data_entered`, `data_validated`, and `error_detected`. Use properties to specify the data type, validation method, and error type. Create dashboards to monitor data quality trends and error rates. Correlation analysis can help identify if specific user roles or workflow steps are associated with higher error rates. Alerts can notify teams of spikes in data entry errors, allowing for swift investigation.

## Content/Media

### Common business problems & personas

#### Key business problems
- **Low content engagement** – Users not consuming or interacting with content
- **Poor content discovery** – Users unable to find relevant content
- **Low subscription conversion** – Free users not converting to paid subscribers
- **Poor ad performance** – Low click-through rates and ad revenue
- **High content production costs** – Expensive to create quality content
- **Poor user retention** – Users not returning to consume more content
- **Ineffective content recommendations** – Poor personalization algorithms
- **Seasonal content challenges** – Difficulty maintaining engagement year-round

#### Primary personas & their pain points

**Content Teams**
- **Pain points:** Low content engagement, poor content discovery, high production costs
- **PostHog solutions:** Content performance analytics, engagement tracking, content discovery optimization, ROI measurement

**Product Managers**
- **Pain points:** Poor user retention, ineffective recommendations, low subscription conversion
- **PostHog solutions:** Retention analysis, recommendation algorithm optimization, conversion funnel analysis, user journey mapping

**Marketing Teams**
- **Pain points:** Poor ad performance, low subscription conversion, ineffective content marketing
- **PostHog solutions:** Ad performance tracking, conversion optimization, content marketing ROI, audience segmentation

**Editorial Teams**
- **Pain points:** Poor content performance, difficulty understanding audience preferences, seasonal engagement challenges
- **PostHog solutions:** Content performance analytics, audience preference analysis, seasonal trend identification, editorial optimization

**Revenue Teams**
- **Pain points:** Low subscription revenue, poor ad performance, difficulty monetizing content
- **PostHog solutions:** Revenue analytics, subscription optimization, ad performance tracking, monetization strategy insights

### Key metrics & PostHog

#### Engagement Rate
**Importance:** Measures how actively users are interacting with content beyond just viewing it (e.g., likes, shares, comments, time spent). It's a key indicator of content quality and audience resonance. High engagement suggests that the content is valuable, which is crucial for building a loyal audience and driving retention.

**PostHog approach:** Track engagement events like `content_viewed`, `time_spent_on_page`, `video_played_to_75%`, and `article_shared`. Use properties to segment by content type and user segment. A custom "engagement score" can be created using formulas in PostHog to weigh different interactions. Cohort analysis can track how engagement evolves for different user groups. Non-technical editors can use dashboards to see which articles are most engaging to inform their content strategy.

#### Content Performance
**Importance:** Provides a holistic view of how individual pieces of content contribute to business goals, from views to conversions. Understanding what content performs well is essential for optimizing content strategy, allocating production resources effectively, and maximizing the ROI of content creation.

**PostHog approach:** Track the content lifecycle with events like `content_published`, `content_viewed`, and `content_shared`, enriched with properties like category, author, and format. Use correlation analysis to identify the attributes of successful content (e.g., "how-to" articles over 1500 words drive the most shares). Dashboards can rank content by performance, and alerts can notify teams when a piece of content starts trending. Non-technical content teams can use these insights to double down on what works.

#### User Retention
**Importance:** Measures the percentage of users who return to the platform over time. For media companies, retention is the lifeblood of the business, as it's far more cost-effective than acquisition. High retention indicates that users find ongoing value in the content, which is key for long-term growth and subscription revenue.

**PostHog approach:** Track retention by monitoring `user_returned` or `session_started` events. Use PostHog's retention cohorts to analyze how retention differs by acquisition source or first content consumed. Correlation analysis can identify behaviors (e.g., subscribing to a newsletter) that are leading indicators of retention. Churn prediction models can help proactively identify at-risk users. Non-technical marketers can use cohorts to understand the long-term value of users from different campaigns.

#### Ad Revenue
**Importance:** For ad-supported media companies, this metric directly measures financial performance. Optimizing ad revenue involves balancing user experience with monetization, making it crucial to track metrics like impressions, click-through rates (CTR), and revenue per user.

**PostHog approach:** Track ad-related events like `ad_impression`, `ad_click`, and `ad_revenue_generated`. Use properties to segment by ad type, placement, and user segment. A/B test different ad placements and formats to see what generates the most revenue without harming engagement. Dashboards can monitor ad performance in real-time, and alerts can flag underperforming ad units. Non-technical revenue teams can use these dashboards to track progress against revenue goals.

#### Subscription Metrics
**Importance:** For subscription-based media companies, metrics like conversion rate, subscriber LTV, and churn are the ultimate measure of business health. They track the ability to convert casual readers into paying subscribers and retain them, directly reflecting the perceived value of the premium offering.

**PostHog approach:** Track the entire subscription funnel with events like `paywall_hit`, `subscription_started`, `subscription_renewed`, and `subscription_cancelled`. Use funnel analysis to identify drop-off points in the conversion process and properties like plan type to segment subscribers. Cohort analysis is essential for tracking subscriber LTV and churn over time. Non-technical product managers can use funnels to optimize the checkout flow and A/B test different paywall strategies.
