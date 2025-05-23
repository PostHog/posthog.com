---
title: The vibe coder's guide to vibe designing
alternative title: The product engineer's guide to vibe designing

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
Another idea: https://imgflip.com/i/9uxiyh
 
## Intro: 

Something about how vibe coding makes you code fast, so now design is the skill you need to move fast and build the best products.
Perhaps also something on how this newsletter will help you build good taste for vibes/ become a vibe master

perhaps some bits on how removing the need for a designer removes a person from the loop, effectively make you faster

## Step 1: Build your prompt

Section on how to use lovable/v0/bolt to get your 80% of the way there

- Research competitors with the same or similar features
- Right down what you like and dislike (will be used in prompt later)
  - Here are some points to think about when looking at their sites
    - Color schemes 
    - UX flows
    - Use of popups, buttons, steps etc.

- Can also take screenshots, will be helpful for your prompt
- Some people like to create a mood-board in figma by copy pasting (dont be scared, its easy. You dont need to learn figma to do this)


- Next copy paste in lovable, v0, or bolt.new

Prompt: 
```
Creat an xyz...

Attached are what I like an dislike

Attached is also my existing style, tailwind.css, css. You must style it like my app.

You can also attach a few files of code samples of UI components from your app, to give it an idea of what your app looks like
```

This should get you 80% of the way there. The next 20% is polish

- You're attempting to reach parity on a product or feature with other competitors in the space

## Step 2: Decide on your UX

Good UX is getting a users to complete their job to be done in the least amount of time possible with the least amount of cognitive load. Design for People Who Have Better Things To Do With Their Lives than use your project. Lives. They have a job to be done almost always want to spend the least time possible in your app


Bits from From Joel Spolsky: (https://www.joelonsoftware.com/2001/10/24/user-interface-design-for-programmers/)
- "A user interface is well-designed when the program behaves exactly how the user thought it would."

- Every time you provide an option, button or <xyz>, you’re asking the user to make a decision. Asking the user to make a decision isn’t in itself a bad thing. The problem comes when you ask them to make a choice that they don’t care about . You're effectively telling users to do your job. When you are designing, and you try to abdicate your responsibility by forcing the user to decide something, you’re probably not doing your job
   Corollary: The best software is opionated about what it wants you to do. 
   Users do want to make some decisions. And its your job to figure out what they care about.
- Every time you provide an option, you’re asking the user to make a decision. That means they will have to think about something and decide about it. It’s not necessarily a bad thing, but, in general, you should always try to minimize the number of decisions that people have to make.

"When a new user sits down to use a program, they do not come with a completely clean slate. They have some expectations of how they think the program is going to work. They may have intelligent guesses about how the UI is going to work"
You'll see the best results if you can confirm this as much as possible.
Bad example: Slack CMD+K. Or CMD+K to search on websites. Lucky the fixed it with intuitive way to copy paste on links

Things to ask yourself when deciding your UX:
- What's the bare minimum information I need to get users to accomlish their job?
- Can I remove this?
- Is this easy to accomplish?
- Could the user do this drunk/distracted
- And/or tips from https://lawsofux.com/?__readwiseLocation= 

## Step 3: Polish your UI

Tips on choosing a color scheme and/or a few basic points on color theory - https://www.interaction-design.org/literature/topics/color-theory#use_a_color_scheme_and_color_temperature_for_design_harmony-3 

Bullets on how to polish your UI:
- Hierarchy
- Contract
- Consistency
- Alignment
- Proximity
- Balance
- Usability/Accessibility 
- And/or tips from https://lawsofux.com/?__readwiseLocation= 

## Step 4: Talk to to users™

Ship things, get it into the hands of your users, and talk to them. Bits on the need to iterate 

How do I know what the user model is? -> This turns out to be relatively easy. Just ask them! (this could be its own section)

Watch real humans trying to use your software (session replay). Note the areas where people have trouble, which probably demonstrate areas where the program model isn’t matching the user model.


## General UI/UX tips

Concluding section.

Bulleted list of general tips to be aware of, perhaps with images too 

- Be consistent in your naming and labels e.g. xyz. Can show bad example from steam.
- Use at most two styles for buttons, titles, etc. primary or secondary. This guides this user into what action you want them to do
- Tips from desgining for an anxious mind - https://www.slideshare.net/CharlotteBretonSchre/designing-for-anxious-minds#30 (maybe an example from substack here on sending newsletter to 60k people)   
- Minimize the cognitive load on the user. The less reading and the less thinking they need to do, the better
- And/or tips from https://lawsofux.com/?__readwiseLocation=
 
