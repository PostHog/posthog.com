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

Header image (to hedgehogify): https://res.cloudinary.com/dmukukwp6/image/upload/9uxiql_4b939c46fd.jpg

Subheading for email: Engineers move fast. Your design should too.

------

Design used to be a dependency. If the Figma wasn't ready, neither were you.

Enter vibe designing.

With tools like [Lovable](https://lovable.dev/), [v0.dev](https://v0.dev/), and [Bolt](https://bolt.new/), you can ship polished apps without waiting on anyone else.

This post shows the full process — start to finish – by actually designing a tiny app while we go. No designer in the loop, just vibes, taste, and a few rounds with an LLM.

## The demo project: BugSplat 🐞💥

A lightweight bug-tracker that lets anyone create a new bug, assign it to a teammate, and update its status. We'll use BugSplat to walk through each step.

## Step 1: Define your job to done

< This image with text tweaked - https://miro.medium.com/v2/resize:fit:1400/0*2B0pa1xoV49TD-8H.png > 
image credit: [Samuel Hulick](https://www.useronboard.com/features-vs-benefits/)

Users don't want your product. They want their problems solved and their jobs done.

Your goal is to capture this in one sentence. The single outcome your feature must deliver.

This isn't just a nice-to-have. It's your design compass. Without it, it's easy to fall into the trap of designing what looks good instead of what actually works.

That sentence makes tradeoffs obvious. It tells you what to cut. It makes your UI simpler, your flows faster, and your prompts sharper.

For BugSplat, that sentence is:

> Log a bug and assign it in under 30 seconds.

Until that feels effortless, nothing else matters. Not your color palette. Not your animation curve. Not even dark mode.

## Step 2: Steal like a product engineer

< This image of a hedgehog version of steve jobs and attributing the quote to Steve Hogs - https://res.cloudinary.com/dmukukwp6/image/upload/download_e0e3dc0822.jpeg >

With your job to be done in mind, gather inspiration for a solution by spending 30 minutes inside two or three products that solve a similar problem. Play around with them and pay attention to how the interface looks and feels. A few things to think about:

- **First impressions:** Where do your eyes go first?
- **Flow:** How many steps or clicks to achieve the job?
- **Feel:** Calm? Overwhelming? Playful?
- **Micro‑interactions:** Subtle animations, hover/focus states, error/success cues.
- **Performance:** Perceived speed, load times, skeletons while fetching.

Take screenshots. Scribble notes. You now have concrete references for the AI and a taste bar for yourself.

In the case of BugSplat, here's what I found when I researched similar products:

| Product         | What I Love                                 | What I'll Avoid                            |
|----------------|----------------------------------------------|--------------------------------------------|
| Linear          | • xyz      | • xyz            |
| GitHub Projects | • xyz                | • xyz                  |
| Height          | • xyz            | • xyz          |

## Step 3. Wireframe the vibe

You should now have a strong opinion of how you want your app to look and feel. The next step is wireframe it to see how the UX holds together.

Tools like Lovable can get you to a working wireframe fast. All you need is right prompt. Here's a template of what I like to use:

```md
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

<Your preferred tech stack>

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

Keep tweaking the prompt until it clicks. Ask for variants. Add detail. Focus on the flow.

Here's the full prompt I used for BugSplat, along with the wireframe it generated:

```md
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

Next.js
Tailwind

## Inspiration from Competitors

### Linear
**What works well:**
- Clean, dense list layout
- Keyboard shortcuts
- Fast modal-based form entry

**What doesn't:**
- Slightly too abstract for non-technical users

### GitHub Issues
**What works well:**
- Familiar threading and assignee model
- Clear status handling

**What doesn't:**
- Too many options and fields upfront

**Competitor screenshots**
- linear_bug_list.png
- github_issue_form.png
```

![https://res.cloudinary.com/dmukukwp6/image/upload/Screenshot_2025_06_03_at_11_55_51_AM_39f58a4ef2.png](Wireframe of BugSplat)

## Step 4. Add your existing code context (Optional)

Once you're happy with the wireframes, the next step is to

If you're designing a feature that you're adding to an existing app, 


Next, gather the files that you'll attach to your prompt. LLMs can generate much better UI when they understand your app's existing design system and context. Good files to include are:

Color theme:
Colors you want: Primary button, secondary button, primary text, secondary

- **UI components** – e.g. `components/ui/button`, `input`, `card` , custom [shadcn/ui](https://ui.shadcn.com/) components 
  Defines your core visual and interaction patterns.
- **Layout primitives** – e.g. `layout/container`, `grid`, `flex-wrapper`  
  Shows how you handle spacing and structure.
- **Design tokens** – e.g. `tailwind.config.js`, `theme.js`  
  Sets your colors, typography, and spacing scale.
- **Page layouts** – e.g. `layouts/app-layout`, `dashboard-layout`  
  Shows how full pages are composed—header, sidebar, content.
- **Real screens** – e.g. `pages/settings`, `user-profile`  
  Demonstrates how everything comes together in practice.

Now pull it all together with a focused, detailed prompt. Here's a simple template you can adapt:

```md
The wireframe looks good. Now match the look and feel of my existing product. 

I've included:  

- `tailwind.config.js` – for design tokens (colors, spacing, typography)  
- `components/ui/button`, `input`, `card` – core reusable components  
- `layout/container`, `grid`, `flex-wrapper` – layout primitives  
- `layouts/app-layout`, `dashboard-layout` – page structure  
- `pages/settings`, `user-profile` – real examples of how everything comes together  

Use these files as references for styling, structure, and component reuse.
```

Now pull it all together with a focused, detailed prompt. Here's a simple template you can adapt:

```md
## Existing System  
Match the look and feel of my existing product. I've included:  

- `tailwind.config.js` – for design tokens (colors, spacing, typography)  
- `components/ui/button`, `input`, `card` – core reusable components  
- `layout/container`, `grid`, `flex-wrapper` – layout primitives  
- `layouts/app-layout`, `dashboard-layout` – page structure  
- `pages/settings`, `user-profile` – real examples of how everything comes together  

Use these files as references for styling, structure, and component reuse.
```

Now pull it all together with a focused, detailed prompt. Here's a simple template you can adapt:

```md
## Existing System  
Match the look and feel of my existing product. I've included:  

- `tailwind.config.js` – for design tokens (colors, spacing, typography)  
- `components/ui/button`, `input`, `card` – core reusable components  
- `layout/container`, `grid`, `flex-wrapper` – layout primitives  
- `layouts/app-layout`, `dashboard-layout` – page structure  
- `pages/settings`, `user-profile` – real examples of how everything comes together  

Use these files as references for styling, structure, and component reuse.
```

Now pull it all together with a focused, detailed prompt. Here's a simple template you can adapt:

```md
## Existing System  
Match the look and feel of my existing product. I've included:  

- `tailwind.config.js` – for design tokens (colors, spacing, typography)  
- `components/ui/button`, `input`, `card` – core reusable components  
- `layout/container`, `grid`, `flex-wrapper` – layout primitives  
- `layouts/app-layout`, `dashboard-layout` – page structure  
- `pages/settings`, `user-profile` – real examples of how everything comes together  

Use these files as references for styling, structure, and component reuse.
```

This should get you 90% of the way there. The final 10% is polishing your UI and interactions.








## Step 4. Add your code context

Once you approve the wireframes, layer in colour, motion, and micro-interactions. There are a few ways to do this:

Polished design isn't magic. It's a set of rules you can learn. And applying them correctly means you don't need to guess what looks good.

Here are seven foundational principles every engineer should know:

1. **Hierarchy** – make what matters most impossible to miss.  
2. **Contrast** – use size, weight, and colour to separate action from background.  
3. **Consistency** – repeat patterns to remove micro-decisions.  
4. **Alignment** – snap to a grid so the eye can glide, not stumble.  
5. **Proximity** – group related things; separation is a hint they're unrelated.  
6. **Balance** – distribute visual weight so the layout feels stable.  
7. **Feedback** – every action should whisper *“yep, that worked.”*

**1. Hierarchy**  
Make the most important thing on the screen visually dominant. Use larger font sizes, bold weights, and more prominent positioning.  
> 💡 **Tip**: Ask yourself *"What do I want the user to notice first?"*

**2. Contrast**  
Use color, size, and shape to differentiate elements. Ensure buttons and interactive elements stand out from the background.  
> 💡 **Tip**: Test your layout in grayscale – if it still works, your contrast is good.  

**3. Consistency**  
The more often a user sees the same layout, color, or interaction pattern, the less they have to think. Familiarity speeds them up. Inconsistent UI, on the other hand, makes every screen feel like a new puzzle.  
> 💡 **Tip**: Treat every design decision as a chance to remove a micro-decision for the user.  

**4. Alignment**  
A clean visual structure helps users process content faster. When elements snap to a grid, the eye flows naturally. When they don't, the brain hesitates.  
>  💡 **Tip**: Use a consistent grid system and check your edges. If one button is 3px off, fix it – it's breaking the vibe.

**5. Proximity**  
Place related elements close together. Labels should hug their inputs. Actions should live near their targets.  
>  💡 **Tip**: If two elements are related but far apart, group them or your user will miss the connection.

**6. Balance**  
Every element on the screen has visual weight. If there's too much weight on one side,it feels lopsided. Distribute your text, imagery, and whitespace so the layout feels stable  
> 💡 **Tip**: Try the squint test—blur your eyes and see where the visual “weight” lands. If it clumps in one spot, rebalance.

![Design principles for software engineers](https://res.cloudinary.com/dmukukwp6/image/upload/ui_1dffe05d0e.png)

## Step 5. Polish the UI 

## Step 6 Tweak your colors 
### 5.1 A note on colors: If you're building a new app, here are the colors you need. You can start with a template

### 4.2 Run a context-rich prompt






## Step 5: Ship it and iterate

Ship early. Ship even if it's rough. Just **ship**. Real users will teach you more in one session than any internal review or gut check ever will/

- If you're nervous, ship behind a [feature flag](/newsletter/feature-flag-mistakes) to a handful of friendly users.
- Use [session replay](/session-replay) to see where people hesitate, rage click, or get stuck.
- Track funnels to know whether your UX is actually working.
- Talk to real users. Ask what felt slow, confusing, or unnecessary.
- Keep iterating. One small fix at a time compounds fast.
 
## TL;DR
 
 TODO 

You don't need a designer to build great UI. You need:

- Good taste
- Strong opinions
- A great prompt

![Guy looking into mirror meme with caption "No Designer No Problem"](https://i.imgflip.com/9vjk4x.jpg)

Word by Lior Neu-ner, who is always down for a good vibe.

## Further reading

https://www.joelonsoftware.com/2001/10/24/user-interface-design-for-programmers/
https://lawsofux.com/