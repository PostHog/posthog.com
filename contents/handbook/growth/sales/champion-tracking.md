--- 
title: Champion tracking
sidebar: Handbook
showTitle: true
---


Customer champions are individuals at a customer's organization who actively advocate for PostHog internally, drive adoption across teams, and help us understand what's working (or not). Losing a champion without a backup relationship is one of the strongest predictors of churn, especially when we have limited visibility into what's happening inside the customer's organization.

The data is clear: accounts with multiple champions across different teams have significantly higher retention rates and expansion potential. When your sole champion leaves, you're starting the relationship from scratch, often with someone who didn't choose PostHog and may not understand its value.

### How we track champions

We use the existing Owner field in Vitally to identify and track our primary champion:

**Owner field in Vitally**
- Use the existing Owner field to map your primary champion contact
- Update it whenever your primary champion changes roles or leaves
- This field should always point to the person who is actively championing PostHog internally
- Document additional stakeholders in your account plan notes (see below)

**Champion indicators to look for:**
- Actively promotes PostHog in calls and Slack channels
- Brings other team members into conversations
- Asks for features or integrations that would help their org
- Shares wins internally that we can see reflected in usage growth
- Defends budget/contract renewals with their leadership
- Responds quickly to outreach and engages proactively

### De-risking champion dependency

Don't put all your eggs in one basket. Here's how to build multiple relationships:

**1. Map stakeholder relationships early**

During onboarding and regular check-ins, identify:
- **Economic Buyer**: Who approves budget and renewal? (Often VP/Director level)
- **Technical Champion**: Who implemented PostHog? (Usually Engineering)
- **Business Champion**: Who uses insights for decisions? (Product, Data, Marketing leads)
- **Day-to-day Users**: Who's in the product weekly?

Track these in your account plan notes in Vitally. Don't just focus on your primary champion in the Owner field.

**2. Create natural touchpoints with multiple stakeholders**

- Regular check-ins: Invite economic buyer + champions from different teams
- Product training sessions: Get day-to-day users engaged directly
- Feature beta invites: Loop in technical teams who care about new capabilities
- Slack channels: Ensure multiple people from the customer side are in shared channels
- Usage reports: CC relevant stakeholders when sharing insights (with permission)

**3. Cross-team expansion as de-risking**

When you expand PostHog to a new team (e.g., Marketing adopts Web Analytics after Engineering has been using Product Analytics), you're not just growing ARR. You're building redundant champions. If your Engineering champion leaves, your Marketing champion keeps the account sticky.

**4. Regular stakeholder check-ins**

Don't just talk to your champion. Aim for quarterly (minimum) contact with:
- The economic buyer (even if just a 15-min update call)
- At least one additional power user from a different team
- The technical owner (if different from your champion)

Schedule these deliberately. Don't wait for your champion to facilitate every intro.

### When a champion leaves

**If you find out proactively (before they leave):**

1. **Get an introduction to their replacement or another key stakeholder** before they're gone. Ideally schedule a handoff call.
2. **Document institutional knowledge**: What were the key use cases, wins, and pain points they cared about?
3. **Identify who else internally will care about PostHog** continuing. Don't assume the replacement will automatically champion it.
4. **Update the Owner field immediately** to the new champion and create a task to establish the new relationship within 14 days.

**If you find out reactively (they've already left):**

1. **Add a note in Vitally immediately** with "Champion Departed [Date]"
2. **Identify remaining power users** using PostHog data (who's still logging in regularly?)
3. **Reach out to remaining contacts quickly** (within 5 business days) to:
   - Express that you want to continue supporting them
   - Understand who the new point of contact should be
   - Offer a refresh call to ensure the new person understands PostHog's value
4. **Update the Owner field** to the new primary contact once identified
5. **Flag account as "Champion Risk"** in Vitally to prioritize attention

**Pro tip**: Use LinkedIn to track when contacts change roles. If you see your champion has moved companies, reach out immediately (while they still remember why PostHog matters) to get introduced to whoever is taking over.

### Stakeholder mapping beyond champions

While champions drive advocacy, you need visibility into the full buying committee for retention and expansion:

**Economic Buyer** 
- Track separately from your Owner contact in your account notes
- Should know PostHog exists and have a general sense of value
- Needs to see ROI at renewal time
- May not use the product day-to-day
- May be executives, finance, procurement, founders

**Influencers** (Product, Engineering, Data leads)
- Can block renewal if they don't see value
- May become champions if engaged properly
- Often great sources for cross-sell opportunities

**End Users** (Analysts, PMs, Engineers using daily)
- Create stickiness through habitual use
- Less likely to have budget authority but can influence from the bottom-up
- Best feedback source for product improvements

**Detractors** (Yes, track these too)
- People who wanted a different tool or are skeptical of PostHog
- Understand their objections so you can address them before renewal
- Sometimes convertible if you solve their specific pain point

Document this in your account plan notes using a simple format:
```
**Stakeholder Map:**
- Owner/Primary Champion: Mike Jones (Senior PM) - Daily user, advocates internally
- Economic Buyer: Jane Smith (VP Product) - Approved initial contract, cares about conversion rates
- Technical Owner: Sarah Lee (Engineering Manager) - Implemented SDK, good relationship
- Detractor: Tom Wilson (Data Lead) - Prefers Mixpanel, needs convincing on PostHog's data warehouse
- Power User: Alex Chen (PM) - Uses session replay heavily, potential secondary champion
```

### Measuring champion health

We don't have a perfect "champion health score" but these are good proxies:

- **Response time to your outreach**: <24 hours = healthy, >3 days = concerning
- **Proactive engagement**: Do they reach out with questions/ideas or only respond when you ping?
- **Internal advocacy**: Do they bring others into conversations? Reference PostHog in internal meetings we hear about?
- **Product usage**: Champions should be active users (if their role makes sense). Inactive champions aren't really champions.
- **Expansion conversations**: Do they proactively suggest new use cases or teams that should use PostHog?

If multiple indicators are declining, it's past time for a direct conversation.

### Common mistakes to avoid

- ❌ **Only building a relationship with your initial contact** - Branch out early
- ❌ **Assuming the champion will always be there** - People change roles every 18-24 months on average
- ❌ **Not documenting champion context** - When they leave, tribal knowledge disappears
- ❌ **Waiting until renewal to meet the economic buyer** - Build that relationship during steady state
- ❌ **Over-relying on champions to get intros** - Sometimes you need to find stakeholders yourself via LinkedIn, PostHog sessions, and Vitally indicators. 
- ❌ **Not tracking stakeholder changes in Vitally** - If it's not documented, it didn't happen
- ❌ **Forgetting to update the Owner field** - Keep it current so everyone knows who the primary contact is (we get it's hard and annoying to keep things updated, but this is a really crucial one)

### Actions for those who manage accounts

**For TAMs/CSMs managing existing accounts:**
1. Review your accounts in Vitally and ensure the Owner field is accurate and up-to-date (do this quarterly minimum)
2. For each account >$20k ARR, document at least 3 stakeholder relationships in your account plan notes
3. If you only have 1 champion relationship, add a task to establish a secondary relationship within 30 days

**For account handoffs:**
The outgoing owner must include stakeholder mapping in the account plan handoff document. It's not optional.

