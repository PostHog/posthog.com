---
title: Template for onboarding success plan
sidebar: Handbook
showTitle: true
---

Each customer is going to be a bit unique when it comes to onboarding and implementation, especially with such a broad product surface area. There are still some best practices we can follow to collaborate with the customer and plan for their success. It really helps customers build engagement if we can collaborate with them on a plan for their first 30 days at PostHog.

## The framework behind the template

The template below is a checklist, and a checklist only works when everyone is ticking the same boxes. Customers aren't. A customer repairing an implementation they've stopped trusting and a customer scaling one that already works both need something in week 2, but not the same thing.

What stays the same across every customer is the shape of the 30 days. What changes is the mode you run it in.

### Commit to one use case at a time

Having a plan never hurts. Over-planning does. You don't know what you don't know until you hear it in the customer's own words, so meet them first, commit 30 days to a single use case, prove it worked, and only then move to the next one.

If a customer arrives with several workstreams, ask them to pick the one priority use case and to name the people tied to it. Everything else waits.

### The four-week arc

| Week | What you're doing | What it should produce |
| --- | --- | --- |
| **1. Discover** | Present their telemetry back to them and be transparent about what concerns you. Get them to pick one priority use case and identify the people attached to it. | One agreed use case and a stakeholder map |
| **2. Reverse demo and plan** | They walk you through the workflow start to finish. You build the plan against what you actually saw, not against what was scoped. Write a short mutual action plan and give them homework before the next session. | A mutual action plan both sides have committed to |
| **3. Hands-on lab time** | Training that fixes gaps live on the call, not general walkthroughs. Pick the one area that drives consumption (usually events) and rework the config until it's in a good state. | A configuration they can defend line by line |
| **4. Prove, sometimes expand** | Check in after the fix: did the sessions produce outcomes? Make sure they're comfortable self-serving, and mark the milestone in the shared Slack channel. | Evidence of value in their own dashboard |

Usually week 3 is enough to put the customer in the driving seat. If it isn't, extend into the rest of the consumption-driven features rather than moving on. If they need hands-on help on a second use case, loop back to week 1 and re-prioritize instead of stacking it on top.

### Pick a mode: repair or optimize

The arc is the same in both modes. The work inside it isn't.

| | **Repair** | **Optimize for long-term growth** |
| --- | --- | --- |
| **Use when** | The implementation is broken or untrusted, and the data doesn't answer their business question | The implementation works, and the open question is value per dollar and breadth of adoption |
| **Week 1** | Show the forecast and the event mix plainly. Ask them to pick one funnel. | Deeper technical and business discovery. Map the teams behind acquisition, the main product, and growth engineering. |
| **Week 2** | Reverse demo that one funnel. Find where the data stops answering their business question. | Reverse demo the error-prone surfaces. What's throwing, and why is only one person in replay? |
| **Week 3** | Add the custom events that map to their goals, then mature either flags or session replay. Not both. | Make the spend intentional. Reshape events that don't tie to an outcome, and put replay in front of the teams who'd actually use it. |
| **Week 4** | Show before and after on their own dashboard. Celebrate it in Slack, then line up use case two. | Show value per dollar against their own goals, then open the next door: error tracking, experiments, exports. |
| **Done looks like** | A dashboard they trust, custom events well past 5%, and a Slack channel with a pulse | Health climbing, replay beyond one user, an event taxonomy they can defend line by line, and a bill they read as investment rather than as a surprise |

### Reference examples

The fastest way to run this well is to see how someone else ran it. We should keep a small library of real, completed 30-day plans covering both modes and a few customer shapes, so a CSM can open one during onboarding or as a refresher before a kickoff.

> **This library doesn't exist yet — this section is a proposal.** Completed plans contain customer specifics, so they belong in <PrivateLink url="https://github.com/PostHog/company-internal">company-internal</PrivateLink> rather than in the public handbook. If someone on CS picks this up, this section is where it should link from.

## Customizing the template

- Customize the template with the goals, specific products, and commitments that make sense for your customer's use case.
- Share it with the customer, ideally as a Slack Canvas.

## Template

**PostHog 30-day success plan**

**Customer:** [Customer Name] | **CSM:** CSM or AE NAME | **Start Date:** [Date]

### Our shared goal
**Week 1:** You're getting actionable insights from PostHog  
**Week 3:** You've identified specific opportunities to improve your key metrics  
**Week 4:** You're confident PostHog is driving measurable business value

---

### Week 1: Quick setup & first insights
**Goal: See value within 7 days**

#### Your commitments
- [ ] **SDK Validation:** Confirm SDK is properly tracking (usually done in trial)
- [ ] **Key Stakeholders:** Attend 30-min kickoff call
- [ ] **Custom Events:** Define business-specific events you want to track
- [ ] **Primary Use Case:** Define the #1 metric you want to improve

#### PostHog commitments  
- [ ] **Implementation Guidance:** Validate SDK setup and custom event tracking
- [ ] **Feature Flags Setup:** Configure feature flags for your use cases
- [ ] **Group Analytics Setup:** Configure B2B company-level tracking
- [ ] **Custom Dashboard:** Build initial dashboard for your key metrics
- [ ] **Training Session:** 45-min walkthrough of your specific setup
- [ ] **First Insights:** Identify 2-3 actionable findings from your data

**Weekly check-in:** [Day/Time] - 30 minutes
- What findings have you learned from the first few insights you set up?
- Have you come across any points of friction in the setup or areas of the product you're struggling to understand?
- What are the next actions steps for us to follow up with in the next meeting?

---

### Week 2-3: Feature Adoption & Optimization
**Goal: Expand usage across your team**

#### Together We'll:
- **Session Replay:** Set up recordings for your key user flows
- **Feature Flags:** Deploy your first A/B test or feature rollout  
- **Surveys:** Launch feedback collection (if applicable)
- **Team Training:** Onboard 3-5 additional team members
- **Advanced Analytics:** Build funnels, cohorts, or retention analysis

**Bi-weekly Check-in:** [Day/Time] - 30 minutes

---

### Week 4: Value Confirmation & Next Steps
**Goal: Quantify business impact and plan expansion**

#### Success Review:
- **Measurable Impact:** Document specific improvements/insights gained
- **ROI Assessment:** Calculate value PostHog has delivered
- **Team Adoption:** Confirm regular usage across stakeholders
- **Expansion Opportunities:** Identify additional products or use cases

**Business Review:** [Day/Time] - 45 minutes

---

### Post-Launch: Optimization Check-in
**Goal: Maximize ROI and identify expansion opportunities**

#### 6-8 Weeks After Launch:
- **Usage Analysis:** Review which features are driving the most value
- **Advanced Features:** Explore underutilized capabilities
- **Workflow Optimization:** Streamline your team's PostHog processes  
- **Expansion Planning:** Identify additional use cases or team members
- **Success Story:** Document wins for internal stakeholders

**Optimization Review:** [Day/Time] - 60 minutes

---

### Success Metrics

| Milestone | Target Date | Success Criteria | Status |
|-----------|-------------|------------------|---------|
| SDK Validated | Day 2 | Data flowing correctly into PostHog | ⏳ |
| Custom Events Defined | Day 3 | Business-specific tracking configured | ⏳ |
| Feature Flags & Groups Setup | Day 5 | B2B tracking and flags operational | ⏳ |
| Team Trained | Day 7 | 3+ people actively using | ⏳ |
| Actionable Insights | Day 10 | 2+ specific findings identified | ⏳ |
| Feature Expansion | Day 20 | 2+ products actively used | ⏳ |
| Business Impact | Day 28 | Measurable metric improvement | ⏳ |

---

### Key Contacts & Communication

#### PostHog Team
- **PostHog Human:** [your email]
- **Support Channel:** [Dedicated Slack channel/email]
- **Documentation:** [posthog.com/docs](https://posthog.com/docs)

#### Your Team
- **Executive Sponsor:** [Name, Role] - Strategic oversight, success validation
- **Technical Lead:** [Name, Role] - Implementation, data setup
- **Primary Users:** [Names, Roles] - Daily usage, feedback

#### Meeting Schedule
- **Onboarding Phase:** Training sessions and weekly progress check-ins
- **Post-Onboarding:** Monthly or bi-weekly check-ins recurring

---

### What You Can Expect From Us

✅ **Rapid Response:** Same-day replies to questions/issues from your PostHog Human
✅ **Proactive Guidance:** We'll suggest optimizations based on your usage  
✅ **Custom Resources:** Tailored documentation and best practices  
✅ **Issue Resolution:** PostHog human will resolve issues directly and escalate internally as needed  
✅ **Product Feedback:** Feedback calls or user interviews with product managers or engineers  

### What We Need From You

✅ **Clear Objectives:** Tell us the specific metrics you want to improve  
✅ **Custom Event Planning:** Help us understand your business-specific tracking needs  
✅ **Stakeholder Engagement:** Keep key people involved and responsive  
✅ **Honest Feedback:** Let us know what's working and what isn't  
✅ **Success Definition:** Help us understand what ROI looks like for you  

---

**Questions or concerns?** Reach out anytime - our success is measured by your success.

*This plan is our shared roadmap. We'll adjust it based on your specific needs and progress along the way.*
