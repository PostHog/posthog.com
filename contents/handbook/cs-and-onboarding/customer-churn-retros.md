---
title: Learn from churn
sidebar: Handbook
showTitle: true
---

## Churn retros

When a human-managed account churns from PostHog, we share learnings in #customer-churn-retros. The goal is simple: learn from what happened so we can prevent it next time.

## Who does this

The CSM or AE who managed the account writes the retro. Post it as soon as possible after the churn (or even when the risk is first surfaced as a possible churn) - while the details are fresh.

## What to include

Keep it concise. We're looking for signal, not noise.

### Basic info
- **Customer name:**
- **ARR at churn:** $X,XXX
- **Tenure:** X months/years
- **ICP fit (1-10):** X/10
  - Scoring guide: 
    - 1-3: Poor fit (wrong industry, too small, misaligned use case)
    - 4-6: Marginal fit (some alignment but missing key characteristics)
    - 7-8: Good fit (matches most ICP criteria)
    - 9-10: Perfect fit (textbook ICP customer)
- **Primary reason for churn:** One sentence

### What we did well
Bullet points. Be specific about what actually worked:
- Things we tried that had positive impact
- Successful interventions or saves along the way
- Strong relationship moments or engagement wins
- Features or support that resonated

### What we could do better
This is the important part. Be honest:
- Warning signs we missed or ignored
- Outreach we didn't do or mistimed
- Technical issues we didn't catch early enough
- Relationship gaps or communication failures
- Contract/commercial missteps

Don't sugarcoat it. If we screwed up, say so.

### Product learnings
What did this churn teach us about the product?
- Feature gaps that mattered
- Integration or performance issues
- Competitive losses (what did they switch to and why?)
- Pricing or packaging problems
- UX friction that drove them away

Tag relevant product teams if needed.

### Process learnings
What do we need to change in how we work?
- Health score signals we should've caught
- Playbook gaps or broken processes
- Tools or data we needed but didn't have
- Handoff failures (sales → CS, onboarding → CS, etc.)
- Communication cadence issues

## Example retro

**Customer name:** HogFlix  
**ARR at churn:** $42,000  
**Tenure:** 14 months  
**ICP fit:** 8/10 - B2B SaaS, 75 employees, solid PMF  
**Primary reason for churn:** Switched to Amplitude due to advanced analytics needs we couldn't meet

**What we did well:**
- Strong relationship with eng team, they genuinely liked us
- Proactive about billing limit management, saved them $8k over tenure
- Quick response on support tickets (avg <2hr)
- Successfully onboarded them to 4 products

**What we could do better:**
- Saw usage decline 3 months before churn but didn't act fast enough
- Never connected with their PM team, only eng - left us blind to analytics requirements
- Should've involved product team when they asked about funnel analysis 6 months ago
- Missed that their SQL queries were getting more complex - signal they needed more

**Product learnings:**
- Lost to Amplitude's behavioral cohorting and advanced path analysis
- They needed cross-product funnels we don't support well yet
- Data warehouse integration wasn't mature enough for their analysts
- Tagging @max-ai team - they wanted AI insights we couldn't deliver

**Process learnings:**
- Health score didn't catch declining SQL query complexity (possible new signal?)
- Need a playbook for "single-department adoption" risk - eng loved us but PM didn't know we existed
- Should trigger alert when customer starts evaluating "advanced analytics" docs heavily

---

## Tips for writing these

**Be direct.** This isn't a CYA exercise. If you missed something, own it.

**Focus on prevention.** Every retro should have at least one concrete "we should change X" takeaway.

**Tag people.** If product or process changes are needed, @ the relevant teams.

**Don't make excuses.** "They were never a good fit" isn't helpful. Why did we take them on? What should we have done differently?

**Keep it readable.** Use bullets. Be concise. Respect everyone's time.

