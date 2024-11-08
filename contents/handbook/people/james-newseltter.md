# How to create autonomous engineering teams

In startups, speed is everything. 

The faster you ship and iterate, the better the product you can build. The better the product, the better your chances of winning.

And there's only one way to move fast: You empower your builders and get out of their way.

It sounds obvious, but yet most companies puts things in the way of their engineers. Excessive meetings, bureaucratic processes, micromanagement, and more. All of which slows them down.

![Things in the way of an engineering team](https://res.cloudinary.com/dmukukwp6/image/upload/pm_approva_c1ad9be668.png)

At PostHog, we've managed to build truly autonomous engineering teams that ship ridiculously fast. Our small team of X engineers have shipped Y new products and Z new features in the last year. 

In this post we dive into how we did it, and how you can too.

## 1. Start small

The first step is create a team structure that promotes autonomy. In practice, this means [small teams](https://newsletter.posthog.com/p/the-magic-of-small-engineering-teams). 

Why? Just look at this screenshot of a typical week for an engineer at Posthog:

![A typical week for an engineer at Posthog](https://res.cloudinary.com/dmukukwp6/image/upload/Screenshot_2024_11_07_at_3_49_06_PM_03d0c98d91.png)

On the other hand, large teams = more meetings, more process, more people to convince, more politics, and more bullshit. And more bullshit means less building 💩

When we talk about a small team, we mean a team that:

- has less than six people
- has one leader
- has its own mission
- decides on its own processes

And perhaps more importantly, they decide what they're going to build. Which brings me to the next point...

## 2. Let engineers decide what to build

First, a lesson of how I learned this and how the most important thing we've ever built at PostHog came from engineers deciding what to build:

Back when PostHog only offered a single product, [product analytics](https://posthog.com/product-analytics), an engineer named Karl noticed that many customers were asking session replays. He wanted to build it, but I thought it was a terrible idea. I didn't want to split the focus of the company on multiple products and thought we have had a single hugely successful product before building another one. He disagreed and built it anyway.

Not only did it end up being wildly popular with customer, but it also changed our entire company strategy entirely! Seeing the success of session replays made me realize that PostHog needs to become more than just product analytics. It needs to be an all-in-one tool for developers. As so we built [feature flags](https://posthog.com/feature-flags), [A/B testing](https://posthog.com/experiments), [surveys](https://posthog.com/surveys), and more. And this all because of a single engineer disagreeing with the CEO!

Letting engineers decide what to build sounds good in theory, but in practice it's hard to do. Why? Lack of transparency and poor context setting in most companies means engineers don't have the best information to make the right decisions. The thought goes "let's not bother our engineers with this unimportant stuff and give them more time to code", but in reality they end up getting a sanitized version of the truth from product managers, who serve as gatekeepers and ultimately decide what needs to get built.

Option 1: Bilbo meme
![Bilbo meme](https://res.cloudinary.com/dmukukwp6/image/upload/98nrsd_0ed5d1556f.jpg)

Option 2: Star wars meme
![Star wars meme build better products](https://imgflip.com/i/99bm06)

The result is a worse product, since engineers don't have complete picture to understand what their users truly need.

Instead, we offer an alternative:

### Refactor the PM job

The goal of a product manager should be to not exist...

![A magician hog](https://res.cloudinary.com/dmukukwp6/image/upload/magician_hog_a1934d0b3a.png)

Okay that's a bit extreme. But the real goal of a PM should be to empower your engineers, not control them. To do this, remove the responsibility of deciding the product roadmap from them. Instead, their job is gather the best information possible for eingeers so that they can make informed decisions.

This means that:

1. Gathering and analyzing product data insights
2. Opportunity sizing
3. Competitor research
4. User research (although engineers should still [talk to users](https://posthog.com/newsletter/talk-to-users))
5. Industry news
6. Tracking the output of the team's work

This information empowers team to make the right decisions. However, you still need to able to trust that your engineers are making the rights decisions, which brings us to...

## 3.Trust your engineers

![James quote of "I'm an idiot. My team is smart. I should listen to them more."](https://res.cloudinary.com/dmukukwp6/image/upload/Screenshot_2024_11_08_at_2_25_27_PM_aeb25f7a34.png)

A tell-tale sign that a company doesn't trust their engineers is a giant checklist of processes and reviews. This is a anti-pattern. You slow them down, the teams gets frustrated, and the best people leave.

That said, blindly trusting engineers to always make the right decisions is also a mistake, as no one is right 100% of the time. The trick is to balance the right amount of autonomy with the right amount of checks and balances.

To do this, we offer two processes that should be driven by the engineers:

### 1. Plan the goals together, but let the engineers drive

> Image: (hedhgehogs in a car, driver is an engineer. Product manager and CEO are in the backseat. Another engineer in the front seat)
> alternative image: [get in loser memee](https://i.pinimg.com/originals/97/c5/d2/97c5d2bad1db9d03bb450ccffb08c9ea.jpg) with hedgehogs. engineers in front, PM in the back) "Get in loser, we're going planning")

We used to do OKRs and metric-based goals at goals. But we ran into two problems with it:

1. Engineers found it wasted too much time to come up with the right metric to focus on.
2. Engineers ended up focusing too much on moving the metric and small quick wins, rather than actually building what our users wanted.

So we abandoned it. Instead, the outcome of our quarterly planning sessions are list of things the team is going build. The meetings go something like this:

1. Execs talk through the company's goals at a high level. For example, "we need to increase top of funnel adoption", or "we want to become an all-in-one tool, so we need to build more products".
2. The engineers discuss and decide what they need to build to achieve to help the company achieve its goals. If needed, they ask for advice or guidance from the exec team. 
3. The meeting ends with a list of what the team is going to build for the next quarter.

This works because everyone is clear what the team is going to build. The team doesn't needlessly fret about constantly monitoring a specific metric for an entire quarter.  They've already decided what they're going to do, so all they need to focus on is working through their list. Plus they're usually more excited to build since they're the ones who decided on their work.

As the CEO, I make an assumption that what the team has come up with is correct. But how do you actually track if what they're doing is working? Enter the growth review.

### 2. Do a monthly growth review

Growth reviews evaluate the output of the team's work. The first step to do this is to gather all the information you need (at PostHog, it's the PMs job to do this). This means:

- **Revenue metrics** e.g., MRR, month-on-month growth, revenue churn rate, total paying customers count.
- **Product analytics** e.g., active users, user growth rate, orginization growth rate (if B2B), user retention rate.
- **User feedback** e.g., NPS score, customer interviews, support tickets, any other requests.
- **Churn analysis:** understanding which customers churned and why.

Here's an [example template](https://docs.google.com/spreadsheets/d/1Q_hibP9Pv4b8H_9guceKXNrTUP0B_5hWvmiM-EJ2LrU/edit?gid=0#gid=0) you can copy (number are totally made up!) (TODO: actually make a template).

The meeting is usually a small group of people: the engineering team lead, PM, and CEO.

The next step is review all this data together in the growth review and discuss any interesting insights. It's up to the engineering team lead to decide if the team is doing well or if something needs to change. They can repriorize their projects, change their goals, or come up with new projects entirely. The choice is theirs.

However, it's the job of the CEO to ensure the team has the right context to make the best decisions possible. This means that the CEO should challenge the team's assumptions and ask hard questions. If the team is about to embark on a course that would be disastrous for the company, the CEO should speak up, and ultimately hold the team lead accountable for their decisions.

## 4. The right tooling for the job

<Hedgehog thanos meme with infitinity stones. Each stone represents a different tool e.g no meetings, biweekly 1-1s, no design by default, feature flag rollouts, transparent communication >
<alternative: steve hogs>

Most humans aren't as magical at product as Steve Jobs. You don't just "know" what to build from the start or have a grand vision.

Instead, you build the best products shipping things, getting it in hands of users, iterating on their feedback, and repeat.

So faster your engineers can do this, the better product you can build, and so the chances your company has of winning. 

To help them move fast, below are tactical tips we've found that help increase developer velocity

### 1. Radically transparent communication

// replace this with text image
< Image: a hedgehog made of glass doing tricks on a skateboard. Someone else saying "Radical!">

At PostHog, we communicate [_everything_](https://posthog.com/founders/how-to-run-a-transparent-company) in places that the whole company can see. This includes team roadmaps, sprint notes, exec and board meeting notes, company finances, fundraising updates, profit and loss, and more. We even eliminated most 1-on-1s since we found they were a breeding ground for silos and politics.

The benefits are countless. Not only does it help build context across teams, but it also cuts down on meetings, speeds up decision making, and even reduces politics (you can't be sneaky if everything is public).

To do this, we set up [guidelines](https://posthog.com/handbook/company/communication) for our team. Everything should be done [asynchronously](https://newsletter.posthog.com/p/how-we-work-asynchronously) and there is a clear hierarchy for company communication preferences.

![PostHog communication hierarchy](https://res.cloudinary.com/dmukukwp6/image/upload/hierarchy_1a54d2807d.png)

### 2. Feature flag rollouts

As mentioned earlier, trust is core part of building autonomous teams. However, it's going to be hard to trust engineers in future if they do a lot of damage with a bad feature launch. 

We get it, lots of things can go wrong during a launch. There could be scaling issues, bug and crashes introduced, or users could downright just hate the new feature. 

An easy way to derisk all of these is to run [phased rollouts](https://posthog.com/tutorials/phased-rollout) with feature flags. 

We give our engineers the following guidelines (but not strict rules!) on launching new features:

1. **Hacky / most basic version:** Released to a handful of friendly customers.
2. **80% of feature complete:** Public opt-in beta.
3. **MVP launch:** Release to 10% of users first, monitor performance and feedback for a few days, then 100% rollout.


HERE!

If you go with this approach, be careful about being too strict with how teams need to do their rollouts. Give them their own freedom to decide. The key here is ensure processes are enabling teams, not controlling them.

### 3. No design by default / no product design within teams

We find that the more dependencies or processes a project has, the faster it moves. Design is no exception. We have no expectation that projects should start by running through design _first_.

Instead, we encourage engineers to identify the stage and goals of the project and then make a call if and how much design help they want. We've also put a [design system](https://storybook.posthog.net/?path=/docs/exporter-exporter--docs) in place, so enigneers can self-serve their needs

Engineers can also design their own wireframes, mocks. Or pair with a product designer to brainstorm a flow, add UX love and polish after you've built something 

It looks something like this:

1. v0.1: If we're attempting to reach parity on a product or feature with other competitors in the space – and there's a clear path toward how a product should work or look – there's no need to loop in a designe
2. MVP: If you're shipping an entirely new feature, then you should prioritize figuring out if any users even care (!), which usually means creating an MVP and releasing it behind a feature flag to some friendly users. During both of the above approaches, designers are happy to provide light recommendations that will improve the user experience without becoming a blocker to shipping.
3. V2: If you're improving an existing feature that is popular, you are probably creating v2. it's worth working closely with design to figure out how we can 10x our product vs. competitors. However you're building, please communicate to product design what your expectations are!

We generally hire full stack engineers, but some people think more like designers than others. This is fine - you should play to your strengths.
The less strong you are at design, the more we'd encourage you to involve a product designer.


----
Words by James Hawkins, whose an idiot and should listen to his team more.

---
Hey, I thought of one other example... a very recent one. We had the quarterly planning for CDP. Everyone in the team wanted to polish the CDP and build a great product... Tim effectively blocked us and said we need to work on building the messaging product instead. So we spent a month on it. Now 11labs is asking "why is your CDP shit?" and we're switching priorities back to whole-assing the CDP instead of running around between projects.
9:49
the bigger picture takeaway from this is that every time "the execs" have stormed in and changed the priorities of the team (for whichever team I'm on), the end result is that we end up doing what we wanted to do anyway

we effectively got the CDP into "it works, let's start testing with real users"... and during this quarter's planning, when we wanted to take it from 80% to 100%, we were told to bring another project to 50% instead
---

