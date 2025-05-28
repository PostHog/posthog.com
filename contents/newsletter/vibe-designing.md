---
title: Vibe design for product engineers 
Alt: (or The product engineer's guide to vibe designing)
Alt2: Vibe-Driven Development: How to Design Without a Designer

date: 2025-05-22
author:
  - lior-neu-ner
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/opensource_de4421575a.png
featuredImageType: full
tags:
  - Product engineers
crosspost:
  - Founders
  - Blog
---

Header Image: Hedgehog version of this meme - https://imgflip.com/i/9uxiql

Subheading for email: Engineers Move Fast. Your Design Should, Too.

## Intro: 

LLMs have supercharged the speed at which engineers ship code. But great products aren’t just built on shipping velocity—they’re built on experience. And experience is where design comes in.

Historically, engineers relied on product designers to make things feel right. Now, with tools like ChatGPT, v0.dev, and Lovable, you can go from idea to production-ready interface—without waiting on a Figma file.

This newsletter is your shortcut to becoming a “vibe master.” We’ll break down the essentials of designing fast, intuitive, and good-looking UIs without needing a full-time designer in the loop.





<!-- Something about how vibe coding makes you code fast, so now design is the skill you need to move fast and build the best products.
Perhaps also something on how this newsletter will help you build good taste for vibes/ become a vibe master

perhaps some bits on how removing the need for a designer removes a person from the loop, effectively make you faster -->

The rise of LLMs mean that engineers code superfast now. LLMs also have another under utilized skill that can help engineers ship fast and not be blocked by a designer: design skills.

In this newsletter we dive into how exactly you can vibe design your way to shipping great products.


## Step 1: Understand basic UI principles

Design isn’t magic – it’s a set of rules you can learn. And applying them correctly means you don’t need to guess what looks good.

Start with these seven foundational principles:

1. **Hierarchy**  
  → Make the most important thing on the screen visually dominant. Use larger font sizes, bold weights, and more prominent positioning.  
  💡 **Tip**: Ask yourself *"What do I want the user to notice first?"*

2. **Contrast**  
  → Use color, size, and shape to differentiate elements. Ensure buttons and interactive elements stand out from the background. 
  💡 **Tip**: Test your layout in grayscale – if it still works, your contrast is good.  

3. **Consistency**  
  → The more often a user sees the same layout, color, or interaction pattern, the less they have to think. Familiarity speeds them up. Inconsistent UI, on the other hand, makes every screen feel like a new puzzle. 
  💡 **Tip**: Treat every design decision as a chance to remove a micro-decision for the user.  

4. **Alignment**  
   → A clean visual structure helps users process content faster. When elements snap to a grid, the eye flows naturally. When they don’t, the brain hesitates.
  💡 **Tip**: Use a consistent grid system and check your edges. If one button is 3px off, fix it – it’s breaking the vibe.

5. **Proximity**  
   → Place related elements close together. Labels should hug their inputs. Actions should live near their targets.
  💡 **Tip**: If two elements are related but far apart, group them or your user will miss the connection.

6. **Balance**  
   → Every element on the screen has visual weight. If there's too much weight on one side,it feels lopsided. Distribute your text, imagery, and whitespace so the layout feels stable
  💡 **Tip**: Try the squint test—blur your eyes and see where the visual “weight” lands. If it clumps in one spot, rebalance.

Want to polish even further? Browse Laws of UX or dip into basic color theory to elevate your layouts without overthinking it.

## Step 2: Build strong opinions

Great design isn’t neutral – it’s opinionated. It removes the irrelevant and emphasizes what matters. 

Every choice you leave to the user is a chance to make them hesitate. Every dropdown is a question. Every "optional" setting is a delay. Every unclear label is a moment of cognitive load.

You're making your user work. And your user? They have a job to be done. They just want to click and move on.

Don't get me wrong, asking the user to make a decision in itself isn't a bad thing. Joel Spolsky, founder of Stack Overflow summarized it perfectly in his [post on UI design](https://www.joelonsoftware.com/2001/10/24/user-interface-design-for-programmers/):

>  "Freedom of choice can be wonderful. The problem comes when you ask them to make a choice that they don’t care about."

So how do you know what your users actually care about? [You ask them](https://newsletter.posthog.com/p/talk-to-users).

But even before that, you can ask yourself the following questions when building a feature:

- What's the core job the user is trying to complete?
- What's the fastest, clearest way to help them succeed?
- What can I remove without breaking the experience?
- What decision am I forcing the user to make that I could just make for them?
- Would this make sense to someone who’s tired, distracted, or seeing it for the first time?

## Step 3. Build your prompt

Tools like [v0](https://v0.dev/), [Lovable](https://lovable.dev/), or even ChatGPT/Claude are a great way of getting you 80% of the way there. The key is to build a great prompt for them. Here's how to do it:

First you to build a baseline of what you're expecting. To do this research your competitors that have the same or similar features to what you're building. Play around with their experience and write down what you like and dislike. Here's a few things to think about when viewing their apps:

1. **First impression:** How does it feel when you land on the screen? Calm? Playful? Serious? Fast? Janky? Take note – vibes are emotional first.
2. **Hierarchy:** What draws your eye first? Does the layout guide your attention naturally from top to bottom or action to action?
3. **User flow and navigation patterns:** How many clicks does it take to complete core actions? Are the navigation paths intuitive or do you find yourself getting lost?
4. **Empty states and edge cases:** How does the app look when there’s no data, or when something goes wrong?
5. **Spacing and padding:** Does the design feel breathable or cramped? Where is whitespace used well—or missing?
6. **Microinteractions:** What happens when you hover or click? Are there subtle animations or feedback that add polish?

You can also take screenshots and feed this to the prompt. (need to double check this)

Next, you'll need to attach a few existing code components from your app to give the LLM the best context of what your app looks and feels like. This ensures that the UI generated by the LLM feels like your existing app. Good examples of code to attach are:

**Good examples of code to attach are:**

- `components/ui/button.tsx`, `input.tsx`, or `card.tsx`  
  Your existing UI components—anything that defines your base visual style and interaction patterns.
- `components/layout/container.tsx` or `grid-wrapper.tsx`  
  Layout primitives that show how you handle structure, spacing, and alignment in your app.
- `tailwind.config.js`, `theme.ts`, or `lib/utils.ts`  
  Tailwind theme config and design tokens (colors, font sizes, radius, spacing scale, etc.) help define your app’s design system.
- `layouts/app-layout.tsx` or `dashboard-layout.tsx`  
  Shows how your pages are composed—e.g. header, sidebar, main content area—so the LLM knows how to slot in new UI.
- A real screen like `pages/settings.tsx` or `pages/user-profile.tsx`  
  A fully built page gives the LLM a clear picture of how your components come together in practice.

> 💡 **If you're using [shadcn/ui](https://ui.shadcn.com/):** Be sure to include any customized shadcn components you've modified (e.g. `button.tsx`, `dialog.tsx`)—this helps the LLM stay consistent with your component styling.


Now take all these inputs and build a prompt like this:

```md
# Feature Brief

You're helping me design and build a new feature for my app.

## Goal
Create a UI for: <short one-line feature description>  
Target user: <who is using this and why>

## Requirements
- <list functional requirements>
- <specific UI interactions or constraints>

## Existing Design System
Stick to the existing look and feel of my app. I've attached:
- `tailwind.config.js`
- `theme.ts`
- `components/ui/button.tsx`
- `app-layout.tsx`
- <any other files you've included>

Use these for styling and structure.

Add bit on ensuring you stick to design principles

## Inspiration from Competitors

### <Competitor Name>
**What works well:**
- <list of patterns or layouts you like>

**What doesn't:**
- <list of things to avoid>

Refer to the attached screenshots for context.
```

This should get you 80% of the way there. The next 20% is polishing your UI and interactions.

This will get you 80% of the way. The rest? That’s your taste—aka vibes.

## Step 4: Ship it and Talk to to users™

Ship things, get it into the hands of your users, and talk to them. Bits on the need to iterate 

How do I know what the user model is? -> This turns out to be relatively easy. Just ask them! (this could be its own section)

Watch real humans trying to use your software (session replay). Note the areas where people have trouble, which probably demonstrate areas where the program model isn’t matching the user model.

Step 4: Ship It and Talk to Users™
Design doesn’t end when you hit deploy—it begins.

The only way to really know if your UI works is to watch people use it. LLMs can give you a fast starting point, but feedback gives you direction.

Here’s what to do next:

Ship fast—even if it’s a little ugly. The point is to get real usage.

Watch users (literally or metaphorically). Where do they hesitate? Where do they click wrong?

Ask dumb-simple questions:
“What did you expect to happen here?”
“Was anything confusing?”
“Did this feel easy or annoying?”

Refine. Then repeat.

Every UI is a draft. The faster you treat it that way, the better your product will get.

## General UI/UX tips

Concluding section.

Bulleted list of general tips to be aware of, perhaps with images too 

- Be consistent in your naming and labels e.g. xyz. Can show bad example from steam.
- Use at most two styles for buttons, titles, etc. primary or secondary. This guides this user into what action you want them to do
- Tips from desgining for an anxious mind - https://www.slideshare.net/CharlotteBretonSchre/designing-for-anxious-minds#30 (maybe an example from substack here on sending newsletter to 60k people)   
- Minimize the cognitive load on the user. The less reading and the less thinking they need to do, the better
- And/or tips from https://lawsofux.com/?__readwiseLocation=
 
## TL;DR
- LLMs make it easy to ship code and UI fast—but only if you know how to direct them.
- Design isn’t just visual polish. It’s about reducing friction and helping users do their job faster.
- You don’t need a designer. You need good taste, a clear opinion, and a strong prompt.

- Engineers don’t need designers to make good UI—but they do need taste and tools.
- Learn a few core design principles and you can get 80% of the way there.
- Strong prompts + real component context = production-quality LLM UI generation.
- The last 20% comes from vibes—and real user feedback.

Build your design muscle. Be the engineer who ships features that look and feel amazing.

## Further reading 

https://www.joelonsoftware.com/2001/10/24/user-interface-design-for-programmers/
https://lawsofux.com/?__readwiseLocation=

Word by Lior Neu-ner, who is always down for a good vibe.
