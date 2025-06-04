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

## Step 3. Wireframe the vibe (alt: Create a wireframe)

![wireframe comic](https://res.cloudinary.com/dmukukwp6/image/upload/450722371_e3385ec7_3daa_4499_a356_8e4486a1a69a_087c55fabb.png)

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
Shadcn

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

## Step 4. Add in the details (need better title)

Once you're happy with the wireframes, the next step is to make it look and feel like a real product. How you approach this depends on whether you're adding a feature to an existing app or building something completely new.

### a. Slotting into an existing app:

Prompt the LLM that has your wireframe to add in the UI details of your app. They can generate much better UI's when they understand your app's existing design system and context, so you need to include the following types of files in your prompt:

- **UI components** e.g `components/ui/button`, `input`, `card` – for core interaction patterns.
- **Layout primitives** e.g. `layout/containr`, `grid` – to show how you handle spacing and structure.
- **Design tokens** e.g.  `tailwind.config.js`, `theme.js` – for colors, typography, and spacing.
- **Page layouts** e.g. `layouts/app-layout`, `dashboard-layout` - shows how full pages are composed with header, sidebar, content, etc.
- **Real screens** e.g. `pages/settings`, `user-profile` – demonstrates how it all comes together in practice.

And here's a prompt you can use: 

```md
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

--- FROM HERE
### b. Building a brand newIf you're designing a new app

With no legacy design language, we need to create just enough scaffolding to keep the LLM from wandering into neon gradients and Comic Sans. 

To start, you need to generate your app's core color palette. I like using [Coolors](https://coolors.co/) or [Figma's palette generator](https://www.figma.com/color-palette-generator/) for this. Once you have your core 4-6 colors, use an LLM to generate your core component colors e.g. button, primary text etc. Here's a prompt to do that for you:

```
SYSTEM
You are a senior design-system engineer whose job is to turn a raw color palette into a set of design-token “color roles” for a multiplatform app.  
• Always meet WCAG 2.2 contrast (AA for body text, AAA for error text, 3 : 1 for icons ≥ 24 px).  
• Never invent new hues outside the supplied palette unless asked. When tints/shades are needed, adjust L* in OKLCH (or HSL if OKLCH unavailable) while keeping hue & chroma stable.  
• Output **pure JSON**, no comments, no Markdown.

USER  
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
2. Ensure every `text*` and `link` role meets at least **AA** contrast on its intended background (`background` for text, `buttonSecondary` for `onButtonSecondary`, etc.).  
3. `error` must meet **AAA** contrast on `background`.  
4. `accentPressed` and `buttonSecondaryPressed` should be ±6–12 % lighter/darker than their base roles.  
5. `focusRing` must meet ≥ 3 : 1 contrast against whatever element it appears on.  
6. Validate all contrast requirements and return **only** the JSON matching **schema**—no extra keys or explanatory text.
```


Then, take your generated color JSON and feed it back to Lovable along with 

```md
The wireframe looks great. Now translate it into production-ready UI using the following design system:


**Typography:** The font should be <clean/friendly/modern/warm/fun/neutral>  
How should the type feel and function? Pick one:  
- [ ] Clean and modern with clear hierarchy (e.g. Inter, SF Pro, Helvetica Neue)  
- [ ] Friendly and warm with rounded edges (e.g. Nunito, Poppins, Quicksand)  
- [ ] Tech-forward and utilitarian (e.g. Roboto, IBM Plex Sans, JetBrains Mono)  
- [ ] Editorial and expressive (e.g. Georgia, Playfair, DM Serif)  
- [ ] Highly legible for small UIs (e.g. Source Sans, Lato)  
- [ ] [Custom]: `<insert font and tone>`  

### Spacing scale  
<How sharp or soft should components feel? Pick one:>  

- [ ] Tight spacing (good for for dense UIs like tables, admin panels)  
- [ ] Loose spacing (good for calm UIs)  
- [ ] Standard/Neutral

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
What’s the ideal scale for your components and layout? Choose one:  
- [ ] Touch-friendly (44px+ targets, comfortable paddings)  
- [ ] Compact (tight controls, for expert users and data-dense screens)  
- [ ] Big type and buttons (for mobile-first or accessibility-first design)  

### Colors

<The outputted json from your color palette prompt>
```

## Step 5. Final Polish 💅🏼

You should now be 90% of the way there. The final 10% is polishing your UI and interactions.

Polished design isn't magic. It's a set of rules you can learn. And applying them correctly means you don't need to guess what looks good.

Below are seven foundational principles every engineer should know. Go over your UI ensure your design adheres to it:

1. **Hierarchy** – make what matters most impossible to miss. 
TODO add image explaining this with the tip 
> 💡 **Tip**: Ask yourself *"What do I want the user to notice first?"*

2. **Contrast** – use size, weight, and colour to separate action from background.

TODO add image explaining this with the tip
> 💡 **Tip**: Test your layout in grayscale – if it still works, your contrast is good.  
  
3. **Consistency** – repeat patterns to remove micro-decisions.  

TODO add image explaining this with the tip
> 💡 **Tip**: Treat every design decision as a chance to remove a micro-decision for the user.  

4. **Alignment** – snap to a grid so the eye can glide, not stumble.  

TODO add image explaining this with the tip
>  💡 **Tip**: Use a consistent grid system and check your edges. If one button is 3px off, fix it – it's breaking the vibe.

5. **Proximity** – group related things; separation is a hint they're unrelated. 

TODO add image explaining this with the tip
>  💡 **Tip**: If two elements are related but far apart, group them or your user will miss the connection.
 
6. **Balance** – distribute visual weight so the layout feels stable.  

TODO add image explaining this with the tip
> 💡 **Tip**: Try the squint test—blur your eyes and see where the visual “weight” lands. If it clumps in one spot, rebalance.

7. **Feedback** – every action should whisper *“yep, that worked.”*
TODO add image explaining this with the tip

![Design principles for software engineers](https://res.cloudinary.com/dmukukwp6/image/upload/ui_1dffe05d0e.png)

## Step 6: Ship it and iterate

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