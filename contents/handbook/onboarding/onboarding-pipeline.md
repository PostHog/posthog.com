
# Onboarding Pipeline

Stages:

- `1. New Account`
- `2. Usage Outreach Sent`
- `3. First Call Booked`
- `4. Intro Call Completed` 
- `5. Follow-up Call Booked`
- `6. Follow-up Call Completed`
- `7. Last Bill Check In`
- `8. Onboarded`

### Automations at each stage:

`1` -> Existing onboarding segment playbook does trait update in vitally
`2` -> this stage change should be done when we
`3` -> Calendly triggered [Zap](https://zapier.com/editor/288814325/published/_GEN_1755055085665/sample), updated to differentiate between the first call and subsequent (based on what the stage is) — each team member needs this up and working on their calendly account separately
`4` -> Same Zap above handles this

### Timestamps for stage changes

Each Stage has a respective trait corresponding to the time the account entered that stage. The initial stage is set using the Onboarding Segment Date Entered playbook, but all other stages are set [here](https://posthog.vitally-eu.io/settings/playbooks/481c2fc5-1c52-412c-a20a-e062c9d02abc). Note that upstream automations are required to actually change the status and this just sets the time of status change, no other logic. 

### How this changes how we work:

I propose we use this trait (`Onboarding Pipeline`) as the status indicator, and use the old `onboarding status` as a flag on whether the account needs action or not (personally I think we can simplify it basically to a boolean or a 3 option priority tag type thing, but am not touching it for now until we're comfortable with the above). Basically, I think we need to disentangle our 'this account needs attention' signal from the externally visible stage/tracking, because we should each be able to work how we want / set up our own 'this needs attention/here's how i'm prioritizing, and the way this evolved from just me to me+magda left those two things entangled.

