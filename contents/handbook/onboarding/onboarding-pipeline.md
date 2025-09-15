
# Onboarding Pipeline

The onboarding team operates a high volume, high velocity sales pipeline with all pay-as-you-go (or YC) accounts that are forecasted to spend > $100 and are not otherwise engaged by Sales/CSM. As such, Onboarding is a linear flow moving from initial outreach to confirming the product is configured properly, ending with customers that are happy paying multiple bills. We aim to keep engagements to ~8 weeks, or 2 full billing periods, but in practice there is some spillover depending on responsiveness. 

*Stages*:

- `1. New Account`
- `2. Onboarding Initiated`
- `3. Customer Engaged` 
- `4. Nurture`
- `5a. Onboarded`
- `5b. Churned`
- `5c. No Engagement`
- `6. Sales Handoff`

### How this is organized in Vitally

- [Onboarding Pipeline](https://posthog.vitally-eu.io/settings/traits/accounts) tracks the stage
- [Onboarding Pipeline Main Workflow Playbook](https://posthog.vitally-eu.io/settings/playbooks/481c2fc5-1c52-412c-a20a-e062c9d02abc) controls setting timestamps for corresponding traits when accounts enter a specific stage. These should be treated as rough estimates, as the automations that move accounts from one stage to another are imperfect.
- Additional automations use best effort to move accounts automatically from one stage to another, though are somewhat limited by Vitally's ability to trigger on specific data.
		- Accounts that end up in the Onboarding segment get `1. New Account` automatically (set in main workflow playbook)
		- Accounts we reach out to — any with a convo started by Cameron, Magda, or Dan, get set to `2. Onboarding Initiated` [here](https://posthog.vitally-eu.io/settings/playbooks/754f037e-892b-435a-a189-9f3da9b922fa)
		- Accounts that respond or book a meeting — set to `3. Customer Engaged` [here](https://posthog.vitally-eu.io/settings/playbooks/bbce230d-ca70-40ef-a44d-c5d338fe80f7). Note we cannot track opens easily in Vitally or Gmail.

Each stage has a corresponding timestamp for when the account entered the stage, so we can track time in stage.
