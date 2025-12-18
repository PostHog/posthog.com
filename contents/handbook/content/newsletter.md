---
title: Newsletter
sidebar: Handbook
showTitle: true
---

Our newsletter is called Product for Engineers. It's owned by [Ian](/community/profiles/29296). 

The newsletter is long-form, original copy that focuses on product and business lessons and information for engineers. It's consistently our top-performing content surface, so we invest a lot of effort in it.

The content in the newsletter is not directly tied to PostHog. The stuff we write about here can stand alone and is NOT for marketing our products.

## Newsletter publishing workflow

The process of publishing a newsletter usually looks something like this. (This is not a strict set of rules you have to follow.)

### Part 1: Come up with an idea

There are a few common ways we source [good content topics](#topic):

- Anyone and everyone at PostHog can post random shower thoughts in the [#content-and-video-ideas](https://posthog.slack.com/archives/C015CRUQR7Y) Slack channel. Things that get a lot of buzz internally are usually promising topics.
- We often poll readers for interest in future newsletter topics. The [results](https://github.com/PostHog/posthog.com/issues/10212) give a solid list of potential newsletter topics for anyone to pick up.
- Newsletters are often based on successful blog posts we already wrote, converted into a newsletter-y format. We still always try to add a twist to make the content fresh.


### Part 2: Form an opinion

This sounds obvious, but we mean it. 

Once you've picked an idea, you should have at least one strong opinion or hypothesis. Product for Engineers thrives because we are opinionated; sitting on the fence isn't interesting.

This opinion will become the "angle" of the article and the starting point for your research in Part 2.

### Part 2: Do some research

The secret sauce behind our newsletters is that we always ground our "hot takes" in concrete examples, either from (A) observed data or (B) lived experience.

#### (A) Observed data

Research some actual, real-world data related to the topic. Compare what you find with your original opinion. As you immerse yourself in examples, the narrative and angle of the piece should naturally emerge. 

You don't have to come up with whole dissertation at this point, but we recommend doing some research _before_ outlining because the data will literally guide you! 

For example, if you're writing an article about how to write great job posts, search for real job posts and refine your opinion on what makes one good or bad. Look for patterns and themes. These will scaffold your article.

#### (B) Lived experience

Another option is to draw on your lived experience, but this really only works if you have legitimate authority to speak on the topic. You wouldn't necessarily trust a chocolate chip cookie recipe by Jane Goodall, for example, but probably would one by Gordon Ramsay.

We have several newsletters and blogs by execs who introduce the piece by saying "I worked on this for 18293129 years, here's what I learned". 

That said, sometimes we write things like "Here's what we (as PostHog) have learned about X". In that case, since you're drawing on the company's collective experience, and your sources will probably be past blogs, PostHog PRs and issues, or conversations with colleagues.


### Part 3: Create a content idea issue on GitHub (optional)

If you're already certain that this topic is a hit, you don't have to do this part. 

1. Create a new issue on GitHub using the content idea format to pitch and outline the piece. [Here's an example.](https://github.com/PostHog/posthog.com/issues/13436).
1. Include a few some [titles](#title) or headline options. 
1. Write up an outline. 
    - You can format it however you want, but remember that people are reading this async. It should be more formal than a braindump, but no need for full sentences and paragraphs.
    - This is a good time to decide on the [structure](#structure) of the article.
1. Request feedback from Ian by either tagging him in the issue or posting in [#team-editorial](https://posthog.slack.com/archives/C09GU689J1X).
1. This is also a good time to request feedback from specific individuals or teams of interest. For example, if you're writing a piece like "WTF do support engineers do?", it would be a shame not to collect their thoughts on the topic!


### Part 4: Draft in Google Docs

Congrats, it's time to start actually writing! (Check out [How to write a good newsletter](#how-to-write-a-good-newsletter) for specific tips.)

This is one of the few times where we don't collaborate on GitHub. This is because we want the content preview to look like a Substack article, so we use a template to mimic this format.

1. Create a copy of this [template](https://docs.google.com/document/d/1zJzajW3Xi84EgGffDlbzBmZpBReoMht_fy7Z7S7dZhM/edit?tab=t.0).
1. Write your draft in it in Markdown.
1. Request feedback from Ian or Jina by tagging them in your issue or posting in [#team-editorial](https://posthog.slack.com/archives/C09GU689J1X).
1. Iterate back and forth a few times.

Pro tip: You can enable Markdown formatting in Google Docs. Some of us also like to draft first in Notion for the UI; it's totally up to you as long as the actual version for review is on Google Docs.

### Part 5: Request visuals and assets

Art from previous newsletters is in <PrivateLink url="https://www.figma.com/design/tNuNQ0STmx0ve4f1sAv4Ka/Blog-images?node-id=0-1&p=f&t=qHbYLFRHbl0v8wqW-0">Figma</PrivateLink> and diagrams are in <PrivateLink url="https://www.figma.com/board/b0ttECQMiQ6LlGKpIICUcM/Marketing-Jam?node-id=0-1&p=f&t=Uy3T3a4MXGY266zM-0">FigJam</PrivateLink>.

1. Request a hero image
- Having a good post preview image is important. Either create one using hedgehogs from the [Hoggies file in Figma](https://www.figma.com/design/I0VKEEjbkKUDSVzFus2Lpu/Hoggies?node-id=1-196&t=UZQMXMddH0DMLxqX-0) or [open an art request](/handbook/brand/art-requests) to have Lottie make one for you (give her at least 1 week to do so). This needs to be 1200x630 px for the `posthog.com` OG image and 1456x1048 px for the Substack preview image.

1. Request polish review

### Part 6: Export to Substack

1. Put into Substack
1. Additional content
    - Sometimes add a poll (if it fits in well/flows)
    - More reads - Spicy/more reads can be external blogs and articles you liked in the process of researching, or it can also be other PostHog content. (interesting things youve read recently. Doesnt have to be related to the newsletter topic. #dev, #devel, #industry-news)
    - Optional footer stuff (job posts, company news)
1. Final touches:
    - Formatting
    - Minor line edits
    - Check all images and assets
    - Make sure links in the newsletter point to `posthog.com` and include UTMs like `?utm_source=posthog-newsletter&utm_medium=post&utm_campaign=enter_name_here`.

1. Title, description, SEO stuff, hero image settings
1. Title A/B testing 
1. Send a test email
1. Press the scary button

### Part 7: Create a GitHub PR
1. Create PR on GitHub
1. Quick review from peer for glaring mistakes
1. Merge!


## How to write a good newsletter

These aren’t rules, just things that have worked well in the past. They provide some guidance on writing a successful newsletter.

### Topic

- **Write about ideas, practices, and experiences unique to PostHog.** Challenge conventional wisdom (ChatGPT is good for discovering what “conventional” is). For example, “[Product management is broken. Engineers can fix it](https://newsletter.posthog.com/p/product-management-is-broken-engineers)” goes against standard practice and details the way product management works at PostHog.

- **Help our audience directly.** Our audience is engineers, founders, aspiring founders. Helping them [get a job](https://newsletter.posthog.com/p/how-to-get-a-job-at-a-startup) or [launch a startup](https://newsletter.posthog.com/p/how-we-got-our-first-1000-users) works well. [Buying software](https://newsletter.posthog.com/p/how-software-salespeople-screw-you), less so.

- **Let the examples guide you.** It’s ideal to have strong examples in mind before you start. These can be from PostHog (like [How we got our first 1,000 users](https://newsletter.posthog.com/p/how-we-got-our-first-1000-users)) or from similar companies (like Doist, Gitlab, and Zapier in [Habits of effective remote teams](https://newsletter.posthog.com/p/habits-of-effective-remote-teams)). It’s easy to say things, examples prove them.

### Title

- **The title is the frame for the entire piece.** It is worth spending more effort on upfront. Come up with multiple options and get feedback on them if you can.

- **Some title formats that have worked well:**
    - Non-obvious lessons / advice [about topic]
    - Mistakes to avoid [doing a thing]
    - WTF is (thing) and what you should you care?
    - How to think like (person)
    - The magic of (thing)
    - What we learned about (blah) when doing (blah)
    - What nobody tells you about (thing)
    - X things we've learned about (thing)

- **Be bold and direct.** Address common questions. Focus on a specific role (engineers, founders). In retrospect, “[Using your own product is a superpower](https://newsletter.posthog.com/p/using-your-own-product-is-a-superpower)” is too boring and generic. Less is better: Gmail on mobile truncates titles at 35-40 characters

- **Get readers curious to learn more.** Highlight a gap between where readers are and where they want to be. Hint at exclusive or non-obvious information.


### Intro

- **Why trust us to write about this?** We can [write about hiring](https://newsletter.posthog.com/p/how-to-get-a-job-at-a-startup) because 900 people applied in the last two months. We can [write about A/B testing](https://newsletter.posthog.com/p/ab-testing-mistakes-i-learned-the) because Lior has run hundreds of them. Build credibility.

- **Use a counterintuitive take as a hook.** If you’re writing about something we do differently than others, the intro is a great place to start. [For example](https://newsletter.posthog.com/p/product-management-is-broken-engineers): "When Tim and I first started PostHog in 2020, I was adamant we would never hire a product manager."

- **Clarify what the reader will get out of it.** A playbook, framework, lessons learned, pitfalls to avoid. Better yet, what’s the benefit to them? More sales, a job, product-market fit?

### Structure

- **Headings, lists, and numbers are your friend.** These help readers know where they are and create a sense of progress. 2, 3, 5, 7 are all a good number of points to aim for. 4 and 6 are awkward.

- **Use takeaways.** Help readers implement the ideas themselves. This makes posts more actionable. [Non-obvious behaviors that will kill your startup](https://newsletter.posthog.com/p/non-obvious-behaviors-that-will-kill) does a good job of this.

- **Use pattern breakers.** Walls of text are hard to read. Make graphics in [Excalidraw](https://excalidraw.com/). Use hedgehogs. Add screenshots and quote blocks. Get more visually skilled people to help you if you need. Use these at the beginning and/or end of sections.

- **Go deeper.** Longer newsletters let us fully explore a concept. [How we choose technologies](https://newsletter.posthog.com/p/how-we-choose-technologies) ended up being ~1750 words and [Product management is broken. Engineers can fix it](https://newsletter.posthog.com/p/product-management-is-broken-engineers) was ~1900.

### Style & tone

- **Think about rhythm:** Two long paragraphs back-to-back is tiring. Use bullet points to break things up where needed, and mix short, clear sentences with longer ones, so the pace doesn't become monotonous. 

- **Break up very hard to read sentences:** Use a tool like [Hemingway](https://hemingwayapp.com/) to identify sections that are very hard to read. Some long sentences aren't bad, but lots of them consecutively will drain the reader's attention. Aim for readability grade of 8 or less.

- **Use footnotes tactically:** They're useful for adding context that's useful, but not important enough to bog down your core narrative. If something is hard to explain and slowing things down, consider using a footnote. They're also a fun way to add jokes, rants, easter eggs, and references.

- **Be opinionated:** Sitting on the fence isn't interesting. It's ok for people to disagree with you, so avoid too much hedging.

- **Use graphics and charts:** These are great ways for explaining complex ideas and make for great social content. Create bad version and ask Cory to help you make it better.

- **Be fun and lighthearted:** We're writing about building software, not internet safety. Throw in jokes and memes occasionally. Again, footnotes and captions can be useful here.

- **But use memes sparingly:** Too many memes can become overwhelming and a distraction. One per article is probably enough – two if they're really good, or the article is on long / serious side.

- **Address the reader directly:** Say this "this will help you" rather than "this will help your company" or "this will help people". You're talking to one person, not a collective.

## Growth and distribution

We [run ads](/handbook/growth/marketing/open-source-sponsorship) to drive subscriptions for this newsletter.