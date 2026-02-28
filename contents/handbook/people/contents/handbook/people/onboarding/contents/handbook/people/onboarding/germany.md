# 🇩🇪 Germany

> **Owner:** People & Ops
> **Status:** Draft — external contribution
> **Last updated:** 2026-02-28
> **Employment track:** Direct — PostHog GmbH
> **Payroll cadence:** Monthly, via Deel
> **Probation:** 6 months
> **Time-off tool:** PTO by Deel (Slack app)

Germany is PostHog's most compliance-heavy direct entity. German employment law heavily favors the employee post-probation, so getting onboarding right directly affects your ability to manage the employment relationship later.

---

## Payroll blockers (start early)

These items must be collected before the first payroll can run accurately. Some take weeks — flag them at offer acceptance.

- [ ] **Tax ID (Steueridentifikationsnummer)** — generated automatically after the team member's Anmeldung (address registration). Arrives by post in **2-6 weeks**. If relocating to Germany, this delay can push back accurate payroll
- [ ] **Social security number (Sozialversicherungsnummer)** — issued when they first register with a public Krankenkasse. If privately insured, must request manually from Deutsche Rentenversicherung
- [ ] **Health insurance (Krankenversicherung)** — compulsory. Confirm public or private, and which Krankenkasse, before start date. Payroll needs this to set up contributions. Public threshold for private opt-in: **€69,300/year (2025)**
- [ ] **Tax class (Steuerklasse)** — depends on marital status (I through VI). Significantly impacts net pay. Flag III/V vs IV/IV choice for married team members
- [ ] **German bank account** — required. N26 or bunq for quick setup; Deutsche Bank, Commerzbank, Sparkasse for traditional
- [ ] **Employment contract signed** — as of Jan 2025 (BEG IV), permanent contracts can be signed digitally. Fixed-term contracts still require wet ink. Non-compete clauses always require wet ink (§74 HGB)

---

## Onboarding

### Employment contract (Arbeitsvertrag)

- **⚠️ 2025 change:** The Fourth Bureaucracy Relief Act (BEG IV) allows digital contracts for permanent employees as of 1 Jan 2025. Document must be accessible, storable, printable, and employer must request proof of receipt
- Under the Nachweisgesetz, the contract must include: personal details, start date, job description, **place of work** (specify "remote" explicitly), working hours, salary breakdown, leave, notice periods, probation duration, termination procedure, and reference to any applicable collective agreements
- Fine for missing required information: **€2,000 per omission**
- **Ops action:** Confirm PostHog GmbH contract template is updated for 2025 digital changes `[PostHog: confirm]`

### Church tax (Kirchensteuer) — flag during onboarding

- During Anmeldung, the religion field triggers automatic church tax: **8%** (Bavaria/Baden-Württemberg) or **9%** (all other states) surcharge on income tax, deducted via payroll
- If not religious: write "oa" or dash in the religion field. If already registered and want to stop: formal Kirchenaustritt at Standesamt/Amtsgericht (~€30)
- **Ops action:** Flag during onboarding that the Anmeldung religion question has payroll implications. Relocating team members are often unaware

---

## Right to work (Arbeitserlaubnis)

| Category | Documentation | Notes |
|----------|--------------|-------|
| German nationals | Passport or Personalausweis | No restrictions |
| EU/EEA/Swiss nationals | Passport from member state | Full right to live and work |
| Non-EU/EEA nationals | Aufenthaltserlaubnis, EU Blue Card, or Niederlassungserlaubnis | Check "Art des Titels" on card. EU Blue Card requires min salary €45,300 (shortage) / €56,400 (standard) in 2025 |

- **Ops action:** Verify right-to-work docs before start date. For non-EU, confirm permit type allows employment with PostHog GmbH

---

## Probation (Probezeit)

- **6 months** — maximum allowed by law, German market standard
- Either party can terminate with **2 weeks' notice to any day** (no month-end restriction)
- No reason required during probation. Kündigungsschutzgesetz (unfair dismissal protection) does **not apply** until month 6+
- **After probation:** Termination requires a legally valid reason (personal, behavioral, or operational) for companies with 10+ employees. German labor courts are active and employee-friendly. PostHog's handbook notes that for German teammates who've completed their 6-month probation, local legal requirements for notice and severance are followed
- **Ops action:** Schedule structured 30/60/90 day check-ins. If performance concerns exist, raise early and document. Month 5 is too late

---

## Leave (Urlaubsanspruch)

### Annual leave
- Statutory minimum: **20 days/year** (5-day week). PostHog's policy is **unlimited, permissionless time off** with a minimum expectation of **25 days/year** (including national holidays), which exceeds the German statutory minimum
- **Carryover:** to **31 March** of following year, only if unable to take due to illness or operational reasons. If carried over but still can't take due to illness, entitlement remains for max **15 months** after the holiday year
- Unused leave must be **paid out** on termination (PostHog calculates based on 25 days assumption for voluntary leavers)
- During probation: accrues pro-rata, not available in full on day one

### Maternity protection (Mutterschutz)
- **6 weeks before** expected due date (may voluntarily work) + **8 weeks after** birth (must not work — no exceptions). Extended to **12 weeks** for premature/multiple births
- **Full pay** during Mutterschutz: health insurance pays €13/day, employer tops up to full salary. Employer reclaims from U2 insurance fund
- **Termination protection:** Cannot dismiss during pregnancy or for 4 months after birth
- Night work (8pm-10pm), Sunday/holiday work prohibited during pregnancy unless employee expressly agrees
- German Mutterschutz exceeds PostHog's global maternity leave policy for team members with <12 months tenure, so the German statutory entitlement applies

### Parental leave (Elternzeit)
- Both parents: up to **36 months** unpaid leave per child, in up to 3 blocks. Up to 24 months deferrable to child's 3rd-8th birthday
- Notice: **7 weeks** (before child's 3rd birthday) or **13 weeks** (ages 3-8). As of May 2025, email (text form) is sufficient
- Part-time during leave: up to **32 hours/week**
- **Termination protection** from registration through entire leave period
- **Elterngeld:** Government pays 65-67% of net income, capped at **€1,800/month**, for 12-14 months. Income threshold: **€175,000** (births from April 2025)
- **Vacation accrual:** Accrues during Mutterschutz, but employer can reduce proportionally (1/12 per full month) during Elternzeit
- Communicate parental leave to Fraser at least **4 months** before it begins

### Sick leave
- **First 6 weeks:** Employer pays **full salary** (per illness — clock restarts for different illness)
- **After 6 weeks:** Krankengeld from health insurance at ~70% of gross, up to 78 weeks
- Doctor's certificate (AU) submitted electronically since Jan 2023 (eAU process)
- For extended illness (5+ work days), contact Fraser so People & Ops can plan accordingly. Doctor's note usually required

### Unpaid leave
- No general statutory right beyond Elternzeit. PostHog's handbook does not offer unpaid leave for paternity leave; maternity leave can be extended with unpaid time off by arrangement with your team and Fraser

---

## Relocations

If a team member is relocating to Germany, expect a minimum **3-4 week** buffer before payroll is fully set up.

1. **Visa/work permit** (non-EU) — arranged before entry
2. **Anmeldung** — within 14 days of moving in. Needs passport + rental contract/Wohnungsgeberbestätigung. **Flag: religion question triggers church tax**
3. **Tax ID** — arrives by post after Anmeldung (2-6 week delay)
4. **Health insurance** — set up before employment starts
5. **Bank account** — needed for salary
6. **Social security number** — via Krankenkasse registration

---

## Health and safety (Arbeitsschutzgesetz)

- **Home-office risk assessment** required under Arbeitsstättenverordnung — can be done via self-assessment checklist
- Bildschirmarbeitsverordnung (display screen equipment) regulations apply to remote workers
- PostHog provides all team members with a company Brex card for equipment to ensure an ergonomic home setup
- **Ops action:** Include home-office self-assessment checklist in German onboarding issue `[PostHog: confirm if this exists]`

---

## Notice period

Escalates with tenure (§622 BGB). Employer-side only — employee's statutory minimum stays at 4 weeks.

| Tenure | Employer notice |
|--------|----------------|
| Probation (≤6 months) | 2 weeks to any day |
| 0-2 years | 4 weeks to 15th or end of month |
| 2 years | 1 month to end of month |
| 5 years | 2 months to end of month |
| 8 years | 3 months to end of month |
| 10 years | 4 months to end of month |
| 12 years | 5 months to end of month |
| 15 years | 6 months to end of month |
| 20 years | 7 months to end of month |

- PostHog's default voluntary notice period is **30 days** globally, but for Germany, local legal requirements apply if they provide a different maximum or minimum
- PostHog's handbook explicitly states: "For our German teammates who have completed their 6 month probation, we will follow the local legal requirements for notice and severance, in line with what is typical in Germany"
- Termination notice must be in **writing** (wet ink or qualified electronic signature). Email/verbal not valid
- Employee has **3 weeks** from receipt to file unfair dismissal claim

---

## Time tracking

- Employers are **required** to record working hours (Federal Labour Court ruling, Sept 2022)
- Maximum: **8 hours/day** (extendable to 10 if averaged over 6 months), **11 hours** uninterrupted rest, 30-min break after 6 hours
- PostHog doesn't count hours or days worked as a matter of policy, but Germany's legal obligation to record working hours still applies. Even self-reported logs are sufficient, but having no system = compliance gap `[PostHog: confirm current approach for DE employees]`

---

## Leaving PostHog

- **Voluntary:** 30 days notice default (or local legal requirement if different). Work through notice period expected. Send resignation to people@posthog.com
- **Involuntary (post-probation):** PostHog follows local German legal requirements for notice and severance. This overrides the standard 4-month global severance
- Final payroll must include any unused leave payout (calculated against 25-day assumption)
- Post-termination certificate or release required for severance beyond statutory minimum
- Offboarding issue created from GitHub template by People & Ops
- If employee is leaving Germany: Abmeldung (deregistration) required

---

## Company pension scheme (Betriebliche Altersvorsorge — bAV)

- All employees in the statutory pension system have a **right to a company pension scheme** (salary exchange / Entgeltumwandlung)
- PostHog makes pension contributions "in line with legal requirements" for Deel EOR employees. For direct German employees via PostHog GmbH, the specific pension arrangement may differ `[PostHog: confirm bAV provider and setup for GmbH employees]`

---

## Key thresholds (2025)

| Threshold | Amount |
|-----------|--------|
| Pension & unemployment ceiling | €96,600/year |
| Health & long-term care ceiling | €66,150/year |
| Private health insurance opt-in | €69,300/year |
| Minimum wage | €12.82/hour |
| Mini-job limit | €556/month |

---

## On the horizon

- **EU Pay Transparency Directive:** Must be transposed into German law by 7 June 2026. Requires salary structures and pay gap reporting
- **Works council (Betriebsrat):** Triggered at 5+ permanent employees in Germany. Fundamentally changes co-determination on HR decisions. Monitor headcount
- **Employee Data Protection Act:** Draft law on AI in HR, performance monitoring — shelved pre-election, expected to resurface

---

## Sources

- Nachweisgesetz (Evidence Act) as amended by BEG IV (Jan 2025)
- §622 BGB (notice periods)
- Mutterschutzgesetz, BEEG (parental leave)
- Arbeitszeitgesetz (working time)
- PostHog public handbook: /people/compensation, /people/benefits, /people/time-off, /people/offboarding, /people/onboarding

## Open questions / PostHog-specific confirmations

Items marked `[PostHog: confirm]` require internal verification:

- [ ] PostHog GmbH contract template — updated for 2025 digital signing?
- [ ] Home-office self-assessment checklist — does one exist for DE employees?
- [ ] Company pension (bAV) — provider and setup for GmbH employees
- [ ] Time tracking — what is the current approach for DE employees to meet the legal recording obligation?
