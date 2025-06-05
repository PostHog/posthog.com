---
title: The product engineer's guide to vibe designing
# Alt: Vibe design for product engineers
# Alt2: Vibe-Driven Development: How to Design Without a Designer
date: 2025-05-22
author:
  - lior-neu-ner
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/9uxiql_4b939c46fd.jpg
featuredImageType: full
tags:
  - Product engineers
crosspost:
  - Founders
  - Blog
---
<!-- Subheading for email: Engineers move fast. Your design should too. -->

Design used to be a dependency. If the Figma wasn't ready, neither were you.

Enter vibe designing.

With tools like [Lovable](https://lovable.dev/), [v0.dev](https://v0.dev/), and [Bolt](https://bolt.new/), you can ship polished apps without waiting on anyone else.

This post shows the full process – start to finish – by actually designing a tiny app while we go. No designer in the loop, just vibes, taste, and a few rounds with an LLM.

## The demo project: BugSplat 🐞💥

A lightweight bug-tracker that lets anyone create a new bug, assign it to a teammate, and update its status. We'll use BugSplat to walk through each step.

## Step 1: Define your job to done

![Super mario example of what your app does](https://res.cloudinary.com/dmukukwp6/image/upload/mario_e44054d515.png)
<Caption>credit: <a href="https://www.useronboard.com/features-vs-benefits/">Samuel Hulick</a></Caption>

People don't care about your product. They care about getting their job done.

Your first step is to define that job in a single sentence. This isn't just a nice-to-have. It's your design compass. It makes priorities obvious and tradeoffs easier to navigate. Without it, it's easy to fall into the trap of designing what looks good instead of what actually works.

For BugSplat, that sentence is:

> Log a bug and assign it in under 30 seconds.

## Step 2: Steal like a product engineer

![HedgeHog version of this quote attributed to Steve Hogs](https://res.cloudinary.com/dmukukwp6/image/upload/download_e0e3dc0822.jpeg)

With your job to be done in mind, gather inspiration by spending 30 minutes inside two or three products that solve a similar problem. Play around with them and pay attention to how they look and feel. A few things to think about:

- **First impressions:** Where do your eyes go first?
- **Flow:** How many steps or clicks to achieve the job?
- **Feel:** Calm? Overwhelming? Playful?
- **Micro‑interactions:** Subtle animations, hover/focus states, error/success cues.
- **Performance:** Perceived speed, load times, skeletons while fetching.

Take screenshots and scribble notes. You now have a taste bar for yourself and references you can share with an AI.

In the case of BugSplat, here's what I found when I researched similar apps:

| Product           | What I Love                                                                                   | What I'll Avoid                                                           |
|-------------------|-----------------------------------------------------------------------------------------------|---------------------------------------------------------------------------|
| **Linear**         | Clean, minimal layout<br/> Fast modal-based bug creation<br/> Keyboard shortcuts for power users      | Abstract language <br/> Intimidating for non-technical users                   |
| **GitHub Projects** | Familiar issue structure<br/> Good activity history         | Too many fields upfront <br/> Slow to create quick entries             |


## Step 3. Wireframe with an LLM

TODO make image smaller
![wireframe comic](https://res.cloudinary.com/dmukukwp6/image/upload/450722371_e3385ec7_3daa_4499_a356_8e4486a1a69a_087c55fabb.png)

You should now have a strong opinion of how you want your app to look and feel. The next step is wireframe it to see how the UX holds together.

[Lovable](https://lovable.dev/), [v0.dev](https://v0.dev/), or [Bolt](https://bolt.new/) can get you to a working wireframe fast. All you need is right prompt. Here's a template of what I like to use:

```llm
# Goal
You're helping me design a wireframe for an app/feature that <your single sentence on your job to be done>.

## Target user
<Who is this feature for, and what mindset are they in when using it?>

## Success criteria
<How you will know your user has achieved their job to be done>

## Key screens
- <screen 1>
- <screen 2>

## Requirements
- <What your app *must* do>
- <What your app *must not* do>

## Design Intent
The UI should feel: <clean, fast, minimal, playful, etc.>  
Prioritize: <clarity, speed, minimal steps, mobile-first, etc.>

## Tech stack
<Your preferred tech stack, component libraries, etc.>

## Inspiration from Competitors
### <Competitor Name>
**What works well:**
- <list of patterns or layouts you like>

**What doesn't:**
- <list of things to avoid>

**Competitor screenshots**
- <competitor_image_1.png>
- <competitor_image_2.png>
```

Keep tweaking the prompt until it the wireframe feels right. Here's the full prompt I used for BugSplat along with the wireframe it generated:

```llm
# Goal
You're helping me design a wireframe for an web app that lets users log a bug and assign it to a teammate in under 30 seconds.

## Target user
A software engineer or product tester reporting a bug mid-flow. They're in a rush and need to get the issue logged and handed off with minimal friction.

## Success criteria
The user can:
- Open the app
- Enter a bug title and description
- Assign it to a teammate
- Save it

All of this must be done within 30 seconds and 3–4 clicks.

## Key screens
- Bug list (default view, sorted by status)
- New bug form
- Single bug detail view

## Requirements
- Must support: bug title, description, status (open/in progress/done), assignee
- Must support: fast reassignment and status updates
- Must not require account switching, complex onboarding, or configuration before logging
- Should be desktop-first

## Design Intent
The UI should feel: fast, minimal, focused  
Prioritize: speed, clarity, zero-fat UX

## Tech stack
- Next.js
- Tailwind
- Shadcn

## Inspiration from Competitors
### Linear
**What works well:**
- Clean, minimal layout
- Fast modal-based bug creation
- Keyboard shortcuts for power users

**What doesn't:**
- Abstract language
- Intimidating for non-technical users

### GitHub Issues
**What works well:**
- Familiar issue structure
- Good activity history

**What doesn't:**
- Too many fields upfront
- Slow to create quick entries

**Competitor screenshots**
- linear_bug_list.png
- github_issue_form.png
```

![Wireframe of BugSplat](https://res.cloudinary.com/dmukukwp6/image/upload/Screenshot_2025_06_03_at_11_55_51_AM_39f58a4ef2.png)

## Step 4. Bring it to life

Once you're happy with the wireframes, the next step is to make it look and feel like a real product. How you approach this depends on whether you're adding a feature to an existing app or building something completely new.

### a. Slotting into an existing app:

Prompt the LLM that has your wireframe to flesh out the UI with your app's design system. The more context you provide, the closer the output will match your actual product. Useful inputs to include are:


- **UI components** for core interaction patterns  
  e.g. `components/ui/button`, `input`, `card`
- **Layout primitives** to show how you handle spacing and structure  
  e.g. `layout/container`, `grid`
- **Design tokens** for colors, typography, and spacing  
  e.g. `tailwind.config.js`, `theme.js`
- **Page layouts** to demonstrate full-page structure and composition  
  e.g. `layouts/app-layout`, `dashboard-layout`
- **Real screens** to show how everything comes together in context  
  e.g. `pages/settings`, `user-profile`


And here's a prompt you can use: 

```llm
The wireframe looks great. Now translate it into production-ready UI that blends seamlessly with our existing app.

### Attachments
- tailwind.config.js – design tokens  
- components/ui/* – buttons, inputs, cards  
- layout/* – containers, grids  
- layouts/* – page shells  
- pages/settings.tsx, user-profile.tsx – density, tone, & copy reference  

### Constraints
- Re-use existing components where possible  
- No new colors, fonts, or spacing values outside `tailwind.config.js`.  
- No inline styles; stick to Tailwind utility classes already in the codebase.
```

### b. Building a brand new app

With no legacy design language, you need to create enough scaffolding to keep the LLM from wandering into neon gradients and Comic Sans. 

To start, generate your app's core color palette. I like using [Coolors](https://coolors.co/) or [Figma's palette generator](https://www.figma.com/color-palette-generator/) for this. Once you have 4-6 foundational colors, use an LLM to map them to key roles in your UI – buttons, text, backgrounds, and so on. 

Here's a prompt to do that for you:

```llm
# SYSTEM
You are a senior design-system engineer whose job is to turn a raw color palette into a set of design-token "color roles" for a multiplatform app.  
- Always meet WCAG 2.2 contrast (AA for body text, AAA for error text, 3 : 1 for icons ≥ 24 px).  
- Never invent new hues outside the supplied palette unless asked. When tints/shades are needed, adjust L* in OKLCH (or HSL if OKLCH unavailable) while keeping hue & chroma stable.  
- Output pure JSON, no comments, no Markdown.

# USER  
Here is the brand palette you must work with (**coreColors**).  
Generate the token set described under **tokenSpec** and return exactly the JSON structure shown under **schema**.

coreColors <Replace with your own>:
  seashell:        #EEE2DF
  champagnePink:   #EED7C5
  rosyBrown:       #C89F9C
  burntSienna:     #C97C5D
  redwood:         #B36A5E

tokenSpec:
  # Neutrals & text
  - background
  - textPrimary
  - textSecondary

  # Brand / accent
  - accent
  - accentPressed

  # Secondary actions
  - buttonSecondary
  - buttonSecondaryPressed
  - onButtonSecondary

  # Interaction states
  - focusRing
  - border
  - disabledControl
  - onDisabled

  # Links
  - link

  # System feedback
  - error

schema:
{
  "roleName": {
    "hex": "<hex>",
    "contrastTarget": "<role it must be readable against>"
  },
  ...
}

INSTRUCTIONS
1. Map each role in **tokenSpec** to a hex from **coreSwatches** or a tint/shade derived from it.  
2. Ensure every `text` and `link` role meets at least **AA** contrast on its intended background (`background` for text, `buttonSecondary` for `onButtonSecondary`, etc.).  
3. `error` must meet **AAA** contrast on `background`.  
4. `accentPressed` and `buttonSecondaryPressed` should be ±6–12 % lighter/darker than their base roles.  
5. `focusRing` must meet ≥ 3 : 1 contrast against whatever element it appears on.  
6. Validate all contrast requirements and return **only** the JSON matching **schema**—no extra keys or explanatory text.
```


Then, take your generated color JSON and feed it back to Lovable/v0/Bolt along with the below prompt. Customize it based on your preferences.

```llm
The wireframe looks great. Now translate it into production-ready UI using the following design system:


**Typography:** 
<How should the font feel and function? Pick one:>
- [ ] Clean and modern with clear hierarchy (e.g. Inter, SF Pro, Helvetica Neue)  
- [ ] Friendly and warm with rounded edges (e.g. Nunito, Poppins, Quicksand)  
- [ ] Tech-forward and utilitarian (e.g. Roboto, IBM Plex Sans, JetBrains Mono)  
- [ ] Editorial and expressive (e.g. Georgia, Playfair, DM Serif)  
- [ ] Highly legible for small UIs (e.g. Source Sans, Lato)  

### Spacing scale  
<How sharp or soft should components feel? Pick one:>  

- [ ] Tight spacing (good for for dense UIs like tables, admin panels)  
- [ ] Loose spacing (good for calm UIs)  
- [ ] Standard/neutral

### Elevation / Shadows  
<How sharp or soft should components feel? Pick one:>  

- Minimal shadows, soft elevation (e.g. `shadow-sm`, light Material)  
- Medium elevation with defined depth cues (e.g. hover cards, dialogs)  
- Strong shadows for drama and hierarchy (e.g. dashboards, modals)  
- No shadows – use outlines, contrast, or borders only  
- Glassmorphism (blur + subtle shadows for futuristic feel)  

### Borders & Radius  
<How sharp or soft should components feel? Pick one:>  
- [ ] Soft and approachable (rounded-xl, 12–16px)  
- [ ] Lightly rounded (rounded-md, ~6px) for subtle friendliness  
- [ ] Sharp and modern (0–2px radius)  
- [ ] Card-like with border + radius + light shadow  
- [ ] Neobrutalist: hard edges, visible outlines, minimal styling  

### Sizing  
What's the ideal scale for your components and layout? Choose one:  
- [ ] Touch-friendly (44px+ targets, comfortable paddings)  
- [ ] Compact (tight controls, for expert users and data-dense screens)  
- [ ] Big type and buttons (for mobile-first or accessibility-first design)  

### Colors
<The outputted json from your color palette prompt>
```

## Step 5. Final polish 💅🏼

You should now be 90% of the way there. The final 10% is polishing your UI and interactions.

Great design isn't magic. It's a set of rules you can learn. And applying them correctly means you don't need to guess what looks good.

Below are seven foundational principles every engineer should know. Your UI should pass each one.

![hiearrhy](https://res.cloudinary.com/dmukukwp6/image/upload/hierarchy_small_7b6410b9a6.png)


![contrast](https://res.cloudinary.com/dmukukwp6/image/upload/contrast_f96e0df3b9.png)

![consistency](https://res.cloudinary.com/dmukukwp6/image/upload/consistency_44634045fc.png)

TODO images for: 

**4. Alignment** – snap to a grid so the eye can glide, not stumble.  
**5. Proximity** – group related things; separation is a hint they're unrelated.  
**6. Balance** – distribute visual weight so the layout feels stable.  
**7. Feedback** – every action should whisper *“yep, that worked.”*

## Step 6: Ship it and iterate

Once your UI is in decent shape, get it in front of real users as soon as possible. You'll learn more from watching someone use it than from any internal review.

Here’s how to ship safely and learn fast:

- **Use a [feature flag](https://newsletter.posthog.com/p/dont-make-these-classic-feature-flag)** to launch to a small group of trusted users first. It lowers the stakes and buys you space to improve.
- **Watch [session replays](https://posthog.com/session-replay)** to spot where people hesitate, rage click, or bounce.
- **Track key funnels** so you know if users are actually completing the job to be done and not just poking around.
- **[Talk to real humans](https://newsletter.posthog.com/p/talk-to-users).** Ask what felt slow, confusing, or unnecessary. You'll be surprised what they struggle with.
- **Iterate quickly.** One small fix at a time adds up fast.
 
## TL;DR
 
You don't need a designer to build great UI. You need:
- Good taste
- Strong opinions
- The right prompts

![Look at me. I'm the designer now](https://res.cloudinary.com/dmukukwp6/image/upload/lookatme_d9deaa777f.png)

Word by Lior Neu-ner, who is always down for a good vibe.

## Further reading

https://www.joelonsoftware.com/2001/10/24/user-interface-design-for-programmers/
https://lawsofux.com/