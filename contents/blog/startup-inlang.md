---
title: "Startup Spotlight: Inlang"
date: 2023-05-26
author: ["joe-martin"]
showTitle: true
rootpage: /blog
sidebar: Blog
hideAnchor: true
featuredImage: ../images/blog/startup_inlang.jpg
featuredImageType: full
category: Startups
---

This month we're chatting to Inlang co-founder & CEO Samuel Stroschein. Prior to starting Inlang, Sam was studying a Master's degree in Computer Science – but he dropped out to work on Inlang and has been pursuing the idea since.

> Every month we shine the spotlight on a different startup to show off the cool things they're building, as part of the PostHog for Startups program. Want a chance to be featured? [Sign up here for $50k in PostHog credit and a bunch of other sweet perks!](/startups) 

### What is Inlang and why is it cool?

“[Inlang](https://inlang.com/) is using Git to build a source of truth where different departments and personas can collaborate. We’re starting with localization and the handoff between translators and developers. The problem we solve boils down to: people need to create content and they need to collaborate with different personas. Each of these personas has different skills, and may need different interfaces. So, developers, they need to work in code. But translators? They can get an editor from us which offers a different view, so to say, over the repository. 

But we’re also asking: can this breakthrough potentially spill over to other domains? If I look at design and developers and music, for example, it seems to be the same problem. So, what if a design file isn’t stored in a database for Figma, but the file lives in a Git repository and Figma is just a viewer to render the file?

As developers we have thought experiments where, if I have access to the file, I can just automate the handoff. If a color changes in the file system, really CI/CD just automates all the CSS. Or even better, why can't I just directly include the CSS in the Figma file? And you get rid of a lot of handoff steps in between. And you can use CI/CD because suddenly you get the power of automation if you know exactly what changes what.

For now we’re focusing on localization, but if we solve this problem in that particular domain, well, anything content creation-wise seems like it could be impacted by what we're building. And part of what we're building is that we're extending it to be a proper backend database.”

### How did you decide this was a problem worth solving?

“Really, other people forced me to solve it. I had previously bootstrapped a company and I had to offer the app in German and English. And that was a pain. I was the sole person in that business, so that means I was also the translator. The translations themselves were never the problem, but the engineering side of offering my app in German and English? That was a continuous problem. 

I created an initial prototype, put it on Reddit, and got a lot of feedback from developers facing the same issue – but then I actually scrapped the idea. I wanted to get a Masters in Computer Science and I shut down the business to do it. 

Then, on the first day on campus, you know what happens? I find out I didn't get into any courses that I wanted to, because they were oversubscribed except for one and that was the entrepreneurship course. My prototype ended up turning into a whole semester project where I then realized that this issue impacts literally every software company out there. And nobody was solving the real problem!

The real problem isn’t doing the translations. The problem is: I want to offer my software in multiple languages, so how do I refactor my code base? How do I ensure that my code base will continuously work? That's the real challenge.”

### What are you most excited about?

“Well, it is a very interesting business case because once your software is in a new language, what about your marketing material? What about your customer support? What about your performance ads?

I think it’s one of the few ideas where, if there is value to it and if we pull it off, it enables new things. That could be that both of us can just create a song together. That could be that the first indie movies pop up and they're created and remotely distributed in the world. 

Maybe, heck, you get CI/CD for something like YouTube videos. One of the most annoying things for a developer-facing company, for example, is if you do video tutorials and they become out of date. They don't go out of date because there is 10 minutes of bad footage. They go out of date because one minute, 10% of your video, needs a _slight_ change.

Now, the current status quo is, well, you need to delete the whole video. But we have continuous deployment for software now. Why don't we have continuous deployment for video? So you have your video and your Git-free pillar, and then you say, ‘Well, we got to update minute three to four.’ You update it, continuous deployment and boom, YouTube was just updated.”

### What are you worried about?

“Well, you cannot go to non-technical people, and ask them, 'Hey, do you want to use Git?' Because they will have a million questions. It's one of those things where we have to build it and find out by ourselves. Right now it's looking good, but that doesn't mean it’s without risk.

The biggest fear I have, though, is I see a lot of tech people dreaming up ideas for us – like, what about continuous deployment? – which seem to make a lot of sense in a vacuum. But then in reality, there are some things, some confounding variables, some confounding insights which break it.

That said, it seems good right now. We have a very, very concrete use case and we know what we have to do to solve the software localization challenge.”

### What's one thing you wish you had known at the beginning when you started out?

“Well, the amount of full-time jobs you can create when you build infrastructure is completely mind-blowing to me. 

To give a concrete example: say we edit a button in the web editor that says, "Add a language." And that is, let's say, a traditional CRUD operation. If you add a new language like German to your translations, if we would use something like Supabase or Firebase that change would've cost an hour or two hours. And in our case, it took one to two weeks of debating as well. 

And the amount of work to build infrastructure solutions is crazy compared to building something like an app. So that's definitely a learning. And I probably underestimated the amount of work too!”

> Want to be the next startup we spotlight? Check out [PostHog for Startups](/startups).