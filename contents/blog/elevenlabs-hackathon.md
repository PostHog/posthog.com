---
date: 2025-03-07
title: What I learned attending my first ever hackathon
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author:
  - kevan-gilbert
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog_elevenlabs_hackathon_fd48b58db2.png
featuredImageType: full
category: General
---

We sponsored the [recent hackathon hosted by ElevenLabs](https://elevenlabs.io/blog/announcing-the-winners-of-the-elevenlabs-worldwide-hackathon) – and I got to be in the room in San Francisco as it unfolded, and behind-the-scenes during the planning and judging. 

The two days saw furious sprints of heads-down building, punctuated by kitchen snack breaks and hallway pacing, leading to pre-demo jitters and delirious applause as it all came to an end (while the same flow played out in cities around the world). 

<iframe
    src="https://www.youtube-nocookie.com/embed/eFsQqTqnfz4"
    className="rounded shadow-xl"
/>

  
What I noticed was the thread of humanity that flowed through the whole thing, even while next-generation AI demos played out in front of us. Here are some of the highlights and lessons I noticed from my part in the event. 

## 1. Imperfection is trustable 
**Project:** [DealWise](https://devpost.com/software/john-ai) (San Francisco winner)

Just before the hackathon, Yvonne and Jason had spent days dealing with accommodation issues. Having just moved to San Francisco, they were spending hours on the phone, getting quotes for household services. So naturally, at the hackathon, they decided to build an AI voice agent that could take over the work. Not only would it do the actual calling, it would interact with sales reps, get a quote, put it in a database, and make a recommendation back to team.

The demo was flawless, yet it was flawed-ness that made it all work, all stemming from a curious insight: When they first gave their agent a voice, it was a clear, professional one. But call recipients would take one listen, recognize the inhumanity, literally say “shut up,” and end the call. When the developers instead added slight pauses, a mild accent, and some natural hesitation, the folks on the other end _engaged_ with the AI caller, and completed the process. 

It was fascinating to see the team learn it was the messier style of human communication that generated more acceptance. The imperfection built more trust.

![Yvonne and Jason presenting DealWise](https://res.cloudinary.com/dmukukwp6/image/upload/posthog_dealwise_9b33d8b450.png)

## 2. Problem solving means noticing pain
**Project:** [RoadMate]([https://devpost.com/software/john-ai](https://devpost.com/software/roadmate-t28eqk)) (San Francisco second place winner)

Connecting your phone to your dashcam and an AI agent, RoadMate monitors your drowsiness during long road trips, helps you keep your eyes on the road, and can call your emergency contact if things get dicey. The demo from Russel, Anwar and William impressed the judges from both a technical execution standpoint, and for its social impact.

But what inspired this direction? There was nothing about road trips, car hardware or accident prevention anywhere in the brief. 

It was chosen because William's own friend had been in an accident while driving the week prior, losing control due to drowsiness (injured, though thankfully not seriously). The picture of the accident scene was in the pitch deck. 

It wasn’t pretty, but it was a reminder that problem solving means noticing pain – and that means being open to what’s actually hitting you in life. 

![Roadmate](https://res.cloudinary.com/dmukukwp6/image/upload/roadmate2_d4c0167b6e.png)

## 3. Weirdness is your weapon
**Project:** [HIPPO](https://devpost.com/software/pendantic) (San Francisco third place winner)

The best builders at the hackathon were the ones that combined their own unique perspectives _with_ the available tech. 

One brilliant team consisted of [cookie-researching](https://qki.ai/) academic [lexicologists](https://en.wikipedia.org/wiki/Lexicology). Maria, Johnathan, Jamie and Annalece put that odd speciality to use in crafting a real-time language-analysis bot that can join your meeting, and give you a breakdown on how participants are doing in terms of floor-sharing, sentiment, information density and more. 

They called their app HIPPO — a reference to the term for how a meeting’s energy tilts towards the “Highest Paid Person’s Opinion.” While the base tech helped provide some great capabilities, without the weirdness, you don't get a HIPPO.

![HIPPO](https://res.cloudinary.com/dmukukwp6/image/upload/hippo_072227da50.png)

## 4. Accessibility will be the default
**Project:** [Badgermole](https://devpost.com/software/badgermole-ai) 

Benedict, Jennifer and Wei built an application that could use your phone’s camera, identify and speak out any scene it saw, in the language of your choosing. Seen as an aid for those with visual impairments, [Badgermole](https://devpost.com/software/badgermole-ai) was a see-and-speak agent that was a clear breakthrough for accessibility. 

Why didn’t it win? Strangely, it’s because these features are becoming default settings out of the box already, when you use OpenAI tools, or even Apple’s emerging accessibility features. 

The team’s social impact insight into the need for accessibility aids across cultures was spot-on, and the demo showed a ready-to-rock instance of real-world applicability. The only hazard was: this already exists. 

A loss for the team, but a win for humans as a whole.

![Badgermole in action](https://res.cloudinary.com/dmukukwp6/image/upload/badgermole_dacf3196f7.jpg)

## 5. There's room to take toys seriously
**Project:** [Milo](https://devpost.com/software/milo-smart-talking-toys) 

[Milo the Talking Dinosaur](https://devpost.com/software/milo-smart-talking-toys) was an AI-powered kids toy that the judges instantly respected. Powered by a Raspberry Pi, equipped with a camera, microphone, speaker and web access, teammates Abel, Marco, Ivy and Selali built a plush stuffie who could listen to and interact with its child caretaker. But the key feature was “Home Base,” the parental control interface that can receive custom prompts and guidance to nudge the learning aims of the child.

What became apparent was the value for children with unique learning needs and diverse neurotypes, be it ADHD or Autism, who could interact with a toy programmed to meet their unique reality. Reminders, timers, conversational interaction, speech coaching and more, would all be possible in a toy designed for engagement and growth. 

Though the visual of a stuffed dino with its computer-innards splayed out during the demo was perhaps unsightly, this vision of a future that features customized, supportive, assistive learning devices gathered a lot of interest at the hackathon. 

![The Milo team, presenting to the judges](https://res.cloudinary.com/dmukukwp6/image/upload/Milo_cec23617df.png)

## 6. AI builders let you focus more on serving users
“We built the app itself in [Lovable](https://lovable.dev/),” said one hacker during a demo. “It saved us 20 hours of coding.” 

20 hours? Where did the surplus time get spent?  From the range of human-centered products being displayed at the hackathon, it was clear the time went instead towards user testing, iteration and fine-tuning models to meet human needs. 

Speed already matters at a hackathon, and sponsor Lovable made its platform credits readily available for participants. This meant that every hacker was able to spend zero dollars to spin up a workable codebase for their web apps, get to something testable in much less time than usual — saving the rest for the evergreen question of “Does this meet a real human need?”

## 7. PostHog is for when you’re ready to ask that 👆
Hackers burnt through their Lovable, ElevenLabs, Fal.ai and Make.com credits like they grew on trees; the Discord channels lit up with platform-specific participant questions, all weekend long. Meanwhile, over in the PostHog channel, it was relatively quiet. Until the very end.

It was as if people finished building, and then looked around to ask: “I should make sure this actually works for real people.”

The feature set in [PostHog’s suite of products](/products) is all about gathering real-world insights: does my product work? Are people using it? How? What’s converting? Where are people getting lost and frustrated? And it’s these questions that you can start asking as soon as your prototype is clickable. 

## 8. People LOVE PostHog (and joy is not proprietary)
I’m new to PostHog, so I was surprised when I showed up to the event in my [PostHog hoodie](/merch), and somebody asked for a selfie — as if I’d built the thing! “You work for PostHog?” somebody else asked, seeing my backpack. “That’s sick.” 

I asked a few people why that mattered to them, and the fandom seems to have a few roots: first, people told me they loved that the product is completely free to use, and have really maxed out access to these credits for their personal projects (like Maria, whose clever drinking games app is tracked with PostHog.) 

Second, people appreciate the allegiance to technical users; it really allows for depth and customization. Lastly, well, it’s the brand: billboards, hedgehogs, vibe and all. 

It makes me wonder, what would happen if more brands were powered by values like generosity, open source-ness, and humour? Would it get old? Or would it mean more places are sparking more joy? 

If you can believe it, PostHog doesn’t actually have a monopoly on those things...you, too, can bring them to what you make.

## 9. Meatspace matters
Meatspace: the cyberspace-inspired word for people interacting with real bodies in the physical realm. 

This hackathon could have taken place online (and one chapter did), but the chemistry of in-person just hits different. From sharing food to overhearing an idea, to on-the-spot testing, to the contagion of energy as the submission deadline approaches, there is something unleashed when people choose to work in proximity. 

[This isn’t a rallying cry for RTO](/founders/remote-culture), it’s an invitation to be co-located when it really matters. Whether for social connection or a focused sprint, getting off of the screen and into real-life can help with a lot of stuckness. 

## 10. Related: There really is a “room where it happens”
The hackathon was hosted at Intercom’s offices, and running point on tech that day was unsung hero Alan McGlinchey, head of startups at Intercom. He ensured people had access to the space, ferried mics back and forth during the demos, and even brought his kiddo to work on a Saturday. As I thanked him for his work, I remarked at how physically-bound this whole thing was:

“I had thought the internet was supposed to democratize building and creating for the web,” I said to Alan. “We could be hacking anywhere. But here we all are: physically in a building, in the city of San Francisco, as if it’s the location itself that matters.”

Alan agreed emphatically. “There really is a centre of gravity that San Francisco has. If you’re serious about moving things forward in tech, the people, the money, and the decisions all happen physically here.” 

## 11. Talent isn’t bound by geography

While some folks I met have been working in startups for years — I talked to folks who were ex-Uber, ex-Meta — there are others who are just getting started. People with talent, ideas, perspective and grit, who can hack with the best of ‘em, but don’t happen to live in the right city or know the right people. 

I talked to one participant who was here from India, building an incident-response app for infrastructure teams, who was curious to learn more about product marketing. Some of the teams that blew us away as judges consisted of new grads who had not yet had a “real job,” yet ended up landing in second place, leaving us judges wide-eyed and amazed. 

It was a reminder to me of the importance of hiring globally and working remotely ([as we do at PostHog](/handbook/company/culture)), and trying to find ways to make sure future-making events can hold the door open for talent no matter where it finds you.
