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

In the past, engineers had to wait on designers to make things usable or to even start building.

Design was a dependency. If the Figma wasn't ready, neither were you.

Enter vibe designing.

With tools like [Lovable](https://lovable.dev/), [v0.dev](https://v0.dev/), and [Bolt](https://bolt.new/), you can ship polished interfaces without waiting on anyone else.

This newsletter is your shortcut to becoming a vibe design master. I'll break down the essentials of designing fast, intuitive, and good-looking UIs without needing a full-time designer in the loop.

## Step 1: Understand basic UI principles

Design isn't magic. It's a set of rules you can learn. And applying them correctly means you don't need to guess what looks good.

Start with these seven foundational principles:

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

## Step 2: Build strong opinions

Great design isn't neutral – it's opinionated. It removes the irrelevant and emphasizes what matters. 

Every choice you leave to the user is a chance to make them hesitate. Every dropdown is a question. Every optional setting is a delay. Every unclear label is a moment of cognitive load.

Your user has a job to be done. They just want to click and move on.

Don't get me wrong, asking the user to make a decision in itself isn't a bad thing. Joel Spolsky, founder of Stack Overflow, summarized it perfectly in his [post on UI design](https://www.joelonsoftware.com/2001/10/24/user-interface-design-for-programmers/):

------

<Quote
    imageSource="https://res.cloudinary.com/dmukukwp6/image/upload/so_logo_7473d02d0f.png"
    size="sm"
    name="Joel Spolsky"
    title="Founder, Stack Overflow"
    quote={`“Freedom of choice can be wonderful. The problem comes when you ask them to make a choice that they don't care about.”`}
/>

------

So how do you know what your users actually care about? [You ask them](/newsletter/talk-to-users).

But even before that, you can ask yourself these questions when building a feature:

- What's the core job the user is trying to complete?
- What's the fastest, clearest way to help them succeed?
- What can I remove without breaking the experience?
- What decision am I forcing the user to make that I could just make for them?
- Would this make sense to someone who's tired, distracted, or seeing it for the first time?

## Step 3. Craft the perfect prompt

Armed with your UI and UX principles from step 1 and step 2, you can use tools like [v0](https://v0.dev/), [Lovable](https://lovable.dev/), or [Bolt](https://bolt.new/) to craft your designs. The key is to build a great prompt.

Start by researching 2-3 products that solve the same or similar problem. Play around with them and pay attention to how the interface looks and feels. A few things to think about:

- Where do your eyes go first?
- How many steps does it take to complete a core action?
- Does the layout make me feel calm or overwhelming?
- Do the patterns, styles, and flows feel unified across the experience?
- Are empty states or error states handled thoughtfully?

Take notes and screenshots on what you like and dislike about each product. You'll use this in your prompt.

Next, gather the files that you'll attach to your prompt. LLMs can generate much better UI when they understand your app's existing design system and context. Good files to include are:

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
# Feature Brief

You're helping me design and build a new feature for my app.

## Goal
Create a UI for: <short one-line feature description>  
Target user: <who is using this and why>

## Requirements
- <list functional requirements>
- <specific UI interactions or constraints>
- Ensure it's optimized for <mobile / desktop / both>

## Existing System  
Match the look and feel of my existing product. I've included:  

- `tailwind.config.js` – for design tokens (colors, spacing, typography)  
- `components/ui/button`, `input`, `card` – core reusable components  
- `layout/container`, `grid`, `flex-wrapper` – layout primitives  
- `layouts/app-layout`, `dashboard-layout` – page structure  
- `pages/settings`, `user-profile` – real examples of how everything comes together  

Use these files as references for styling, structure, and component reuse.

## Design Intent
The UI should feel: <clean, fast, minimal, playful, etc.>  
Prioritize: <clarity, speed, minimal steps, mobile-first, etc.>

## Inspiration from Competitors

### <Competitor Name>
**What works well:**
- <list of patterns or layouts you like>

**What doesn't:**
- <list of things to avoid>

Refer to the attached screenshots for additional context:
- <competitor_image_1.png>
- <competitor_image_2.png>

## Visual Principles  

Use these as a foundation for layout and structure:

- **Hierarchy** – Emphasize what matters most
- **Contrast** – Make key actions stand out
- **Consistency** – Repeat visual patterns to reduce cognitive load
- **Alignment** – Snap to a clear grid for visual flow
- **Proximity** – Group related elements together
- **Balance** – Distribute visual weight evenly across the layout
```

This should get you 90% of the way there. The final 10% is polishing your UI and interactions.

## Step 4: Ship it and iterate

Ship early. Ship even if it's rough. Just **ship**. Real users will teach you more in one session than any internal review or gut check ever will/

- If you're nervous, ship behind a [feature flag](/newsletter/feature-flag-mistakes) to a handful of friendly users.
- Use [session replay](/session-replay) to see where people hesitate, rage click, or get stuck.
- Track funnels to know whether your UX is actually working.
- Talk to real users. Ask what felt slow, confusing, or unnecessary.
- Keep iterating. One small fix at a time compounds fast.
 
## TL;DR
 
You don't need a designer to build great UI. You need:

- Good taste
- Strong opinions
- A great prompt

![Guy looking into mirror meme with caption "No Designer No Problem"](https://i.imgflip.com/9vjk4x.jpg)

Word by Lior Neu-ner, who is always down for a good vibe.
