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

## Example comms templates

### When your champion tells you they're leaving (proactive)

**Subject:** Quick intro before you head out?
```
Hey [Champion Name],

Congrats on the new role! Sad to see you go but excited for what's next for you.

Before you transition out, would you mind introducing me to whoever's taking over the PostHog relationship? I want to make sure they have everything they need and there's no disruption on your team's end.

Also happy to jump on a call with you both if that's easier for the handoff, but no pressure.

Thanks for being such a great partner. Feel free to reach out if you ever need anything at the new gig.

[Your name]
```

---

### When you discover your champion has already left (reactive)

**Subject:** Checking in on PostHog
```
Hey [Remaining Contact],

I just noticed [Champion Name] has moved on (saw the LinkedIn update). Hope the transition is going smoothly on your end.

I've been working with your team on PostHog for [timeframe] and want to make sure nothing falls through the cracks. Who would be the best person to connect with going forward?

Happy to do a refresh call with whoever's taking point to make sure you're getting the most out of PostHog.

Let me know what works.

[Your name]
```

---

### Establishing a secondary relationship (casual check-in)

**Subject:** PostHog check-in
```
Hey [Champion Name],

Quick question: I've been working mostly with you on PostHog, but I'm realizing there are probably other folks on your team who'd benefit from being looped in.

Who else should I be talking to? Thinking specifically about:
- Whoever owns [specific use case they're not fully using]
- Your data/engineering lead (if different from you)
- Anyone else who cares about [relevant metric/outcome]

Not trying to add more meetings to anyone's calendar, just want to make sure the right people know PostHog exists and how to get help if needed.

Let me know who makes sense.

[Your name]
```

---

### Meeting the economic buyer (no corporate QBR vibes)

**Subject:** Quick PostHog update
```
Hey [Economic Buyer Name],

I work with [Champion Name] on your PostHog setup. Wanted to introduce myself and give you a quick pulse check since you're the one who ultimately approved the budget.

Here's what's working well:
- [Specific metric/usage win]
- [Product adoption highlight]
- [Business outcome if applicable]

And where we think there's still room to grow:
- [Opportunity 1]
- [Opportunity 2]

No urgent action needed, just wanted to make sure you know PostHog is pulling its weight. Happy to jump on a call if you want to dig into anything, but also fine to keep this async.

[Your name]
```

---

### Champion engagement dropping (direct check-in)

**Subject:** Everything good?
```
Hey [Champion Name],

I've noticed we haven't been as connected lately. No pressure, just wanted to make sure everything's going okay with PostHog on your end.

Is there anything we should be doing differently? Or is it just a busy period and I should check back in a few weeks?

Let me know what's up.

[Your name]
```

**Alternative version (if they've gone really quiet):**

**Subject:** Checking in
```
Hey [Champion Name],

Haven't heard from you in a bit, which is unusual. Just wanted to make sure:
1. PostHog is still working for you
2. You're not stuck on anything
3. There's not some fire I should know about

If you're just heads-down on other stuff, totally get it. But if something's off, let me know so I can help.

[Your name]
```

---

### Initial stakeholder mapping (during onboarding)

**Subject:** Who else should know about PostHog?
```
Hey [Champion Name],

Now that you're up and running with PostHog, I want to make sure the right people on your team know it exists and how to use it.

Who else should I loop in? Thinking about:
- Engineering lead (for technical questions)
- Product/data folks (who'd use the analytics side)
- Whoever controls the budget (so they know what they're paying for)

Not trying to spam your whole team, just want to make sure I'm not leaving anyone out who'd find this useful.

Let me know who makes sense to connect with.

[Your name]
```

---

### Asking for intro to another team (cross-sell expansion)

**Subject:** PostHog for [other team]?
```
Hey [Champion Name],

Quick question: Does your [Marketing/Sales/Product/etc] team track [relevant use case]?

I've been thinking PostHog could help them with [specific value prop], similar to how you're using it for [current use case].

If that resonates, would you mind introducing me to whoever runs that team? Happy to show them what you've built and see if it's useful for them too.

No worries if the timing's not right or it doesn't make sense.

[Your name]
```

---

### Following up with a detractor (someone skeptical of PostHog)

**Subject:** PostHog questions?
```
Hey [Detractor Name],

[Champion Name] mentioned you've been using [competitor tool] and had some questions about PostHog.

I'm not here to do a sales pitch, but if you want to walk through what PostHog does differently (or doesn't do that you need), happy to chat. Might be useful, might not be. Either way, want to make sure you have the full picture.

Let me know if you want to dig into it.

[Your name]
```

---

### Key patterns across all examples

- Direct subject lines (no corporate jargon)
- "Hey [Name]," greeting every time
- Get to the point in the first sentence
- Casual but professional tone
- Clear ask or next step
- Always give an "out" (no pressure)
- No exclamation point overload
- No "I hope this email finds you well" nonsense

