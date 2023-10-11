---
date: 2021-06-04
title: >-
  Frontend filters & backend SQL - A chat with Eric Duong, Sam Winslow, James
  Greenhill, and Buddy Williams
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
category: Engineering
---

By: [Engineering @ PostHog](https://www.linkedin.com/company/posthog)

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/f__CzGVdtIs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

**Eric:**

I'll just do it on my computer, upload it, and then toss it later. Cool. I guess actually, a good way to start would be, Sam, what is your understanding of setting the filters and properties right now?
 
**Sam:**
 
Oh my gosh, where to start. Yeah, I'll pull up the UI because I think that is a great jumping off point for kind of understanding it, and I think largely through the lens of the front end and user experience type of stuff. Let me also turn off the feature flag that I'm currently working on. But basically, there are filters on actions and events and on person properties and things like that, but then even within actions and events, there's kind of two levels of filtering going on. There's just purely, what is the action key or the event key that identifies it, but then within that, you can add filters on the properties thereof.
 
**Sam:**
 
So there's just multiple layers to it, and sometimes the logic can be a little hard to know what layer of abstraction you're kind of looking at in the code, because there's action filters and there's property filters. But yeah, those are the two big things, but then also there seems to be some duplicated or different approaches to solving the same kinds of problem. So there's many different UIs, I guess, for filtering.
 
**Eric:**
 
Yeah. Wait, which screen are you guys seeing right now?
 
**Sam:**
 
It's both, I think.
 
**Eric:**
 
You do you see the code in the app?
 
**Sam:**
 
Yeah, the code is tiny though. I'll put it on my bigger screen.
 
**Eric:**
 
I can zoom in. You see this? You see my mouse here? Am I looking at the right?
 
**Buddy:**
 
Zoom in one more time, Eric.
 
**Eric:**
 
It's going to be tough for me. Is this good?
 
**Buddy:**
 
It's okay.
 
**Eric:**
 
Yeah. This is kind of a giant monitor, 2K or something. Resolution [crosstalk 00:02:26]. All right. So I guess a good thing to start with is, we're looking at these filters, right? So there's a bunch of filtering here, there's a bunch of filtering here. And something that everyone's probably noticed by now, if you've used Insight page, is we deal with atrociously long search parameters. We rely pretty heavily on this. It makes copying and pasting easier, and just linking from other places. We might move off of it, but that's for the discussion later. The fact is, this is what we use right now. And every time you update anything here, you'll see it's updated here. I think it's right here. And you can see the update is a string. And then every single thing that you add here that will be relevant to the query will essentially be added into that query string.
 
**Eric:**
 
That does not work, but yeah. So you have that, that's a property filter on the [inaudible 00:03:34], and then if you change any of this, it'll update all this. And we also track which one you're looking at. So insight trends, sessions. Now, going into the code a little bit, I explained this to Buddy earlier, but there's a few things going on here that actually make it a little harder than it has to be, but it's just because of how the components are set up. So we're looking at a page that controls many different insights, but we also have this component that's shared across them. And we want to have the ability to add something to a dashboard. So the way that this thing has kind of grown into, not even super planned, because this page has evolved many times over, and we've basically built logic on top of that over and over and over again.
 
**Eric:**
 
But basically what's happening right now, is the Insight page itself has a logic. So that's called insight logic. And there's a lot of related things here, but the only thing regarding the filters is this all filters object and this active view data. So these two pieces of data. So it's active view and all filters. And every time you update... So this is the overarching logic. This is insight logic for this entire page. And then actually what's related to that is each insight has its own logic, and that's where you get trends logic. So when you're looking at trends logic, you're actually looking at the logic that will handle these filters specifically. And what I mean by specifically is that every time you call, I'm sorry, every time you add a filter or change any of this stuff, we'll call set filters. That's the action that this logic exposes.
 
**Eric:**
 
And I'm just showing you the logics. This is just somewhere in the UI, sorry, somewhere in the component where set filters is called, and that will aggregate anything that's here and put it into this object. And this is the filters object inside the trends logic. And then you'll notice, oops, we have a listener right here. So it's a listener, where every time you call set filters, it'll actually go to insight logic and call set all filters. And this will just bring a master copy of it back to the insight logic, which I like to think about as the parent logic. And then obviously as a side effect, it'll just load results. Yeah. Yeah. We're just loading results after every time.
 
**Eric:**
 
So right there, what's going on is there's insight logic, which is like the parent logic, and then each insight itself has a specific logic. So there's a funnel logic, session logic, retention logic, path logic. The only thing that's slightly different is that stickiness and life cycle reuse trends, because of a refactor that we did. Stickiness and life cycle used to be under trends, but it's broken out now. A little bit of refactoring there that can be done. But regardless, they all have their own. And just like this trends logic, they all work slightly differently, but the filtering is very similar here. So set off filters and then it calls your results.
 
**Eric:**
 
Now also, when you call set filters, the logic will update the query parameters. And then this is action to URL. So that means anytime there's an action, how do we update the URL? And then there's also another hook that every insight logic has that controls... Sorry, not a hook, I don't want to say hook here because components actually use hooks in a different context. But there's another listener that's a URL to action. And this will just make sure that if we ever update the URL here, it'll actually know how to handle it. So I think you can actually just change it to weak, and then you'll see that this is what's handling what I just did here. If you change this to weak and enter it, it'll hit this listener and then make a change if necessary.
 
**Eric:**
 
So that's what's happening here. It'll check the search parameters, and then there's some processing obviously, but it'll check the search parameters against what the logic knows right now, and if it's different, it'll set off filters. Otherwise, it'll still update our... sorry, it'll set the local filters. Otherwise, it'll update all filters. So I must [inaudible 00:08:05], I've just been speaking for quite a minute. Does anyone have any clarifications, because Lee and Kunal aren't here to speak for them either?
 
**Buddy:**
 
Two questions. One is, why isn't there just one filters truth, right, versus every insight having its own? Because you end up just pushing it up anyway. So why isn't there just one? And then secondly, this URL to action, this is only implemented here once, it's not implemented in all the other ones?
 
**Eric:**
 
Oh no, no. You mean in funnel logic or?
 
**Buddy:**
 
Yeah.
 
**Eric:**
 
I know it should be, let me double check.
 
**Buddy:**
 
Okay.
 
**Eric:**
 
Yeah, you'll see the same thing here. This is funnel logic, and then you'll see, it's just checking the specific parameters here. There's a bit of difference in handling in each one, that can be made more uniform. They just rose because of different circumstances. And then your original question was, why are there multiple copies? Why are we going back and forth, right? So there was basically a proposal where when we add properties like this, we want them to persist when you change from trends to stickiness, for example. That's what you see here. But these things are being controlled by different logics, so you actually need an overarching logic to show that state. And that just so happened to be insight logic.
 
**Buddy:**
 
I guess my question is why do they need a different logic for that one piece of data?
 
**Eric:**
 
Oh, okay. I mean, alternatively, what would you suggest? Just putting it into the parameters?
 
**Buddy:**
 
No, I mean, there's filters, right? And every, say, logic could just update the master filter, right, and use data from it.
 
**Eric:**
 
There just be like a filter logic right here?
 
**Buddy:**
 
No. Well, because every time you modify these filters, you push it up to the parent, right?
 
**Eric:**
 
Yeah.
 
**Buddy:**
 
So why not just use the parent?
 
**Eric:**
 
Because then that parent would have to handle the separate logic for each one of these. I mean, we could do that. We could just have all of these updates go directly to an insight logic, but then that insight logic would be responsible for everything that happens in all of these.
 
**Buddy:**
 
Well, I guess that's my question. Why would it have to be responsible for all the business logic when my understanding is that you can just pull in data from other logics?
 
**Eric:**
 
Yeah. I mean, given the key's flexibility, you could do this 100 different ways. This is just the way that we landed on from the evolving concerns. So I wouldn't say there's the best justification for how we landed here, if that makes more sense. I could see this where we actually make filter logic its own thing so that it's very contained, and then anything that actually needs filter logic will just pull from filter logic and use the data there. But in this case right now, what's going on is that insights has filters, and then this one it updates, it'll just give it to apparent logic.
 
**Sam:**
 
Yeah. I kind feel what Buddy is saying about separating out the concerns a little bit, especially because I don't think we have a case where we're showing multiple of these things at the same time, right? If trends and funnels are not shown at the same time, they don't need to be super decoupled, right? Because if insights owns it and they're not... Do you get what I'm saying?
 
**Eric:**
 
Can you go over that again?
 
**Sam:**
 
Just thinking, the only reason I would see for having the filter logic be separate for each view, is if you're going to be showing those views at the same time and you don't want them to clash with each other, right? So you want to isolate out each one, but here, it's almost like the filters are... I mean, first of all, the filters closer to the component side of what's actually rendered in react, they handle every possible case. So it's checking, is this a funnel query, is this a session query, is this whatnot? So that's the actual thing that's getting rendered. But then the logic is very separated out, but then it all comes back and is rendering the same component at the end of the day.
 
**Sam:**
 
So yeah, I would think that that would be a reason for centralizing the logic further up in the parent. If there's only one set of filters shown at any given time, it's a different type of insight, then, yeah, I would think that Insight should just own the whole thing. But this is like... Again, I know how much work it would be to refactor and go in and do all that because I've done a little bit of it, but yeah.
 
**Eric:**
 
Yeah. Well, there's two things I want to go over in this talk. So I'm just trying to describe how it works right now. And then as a followup or as the second half of this discussion, we should figure out what would it be a better way to do this, and can we just get that out quickly? I agree this is-
 
**Sam:**
 
No, I don't mean to derail the discussion here. Like I'm just-
 
**Eric:**
 
Yeah, yeah, no problem. But yeah, we'll circle back in like five minutes, I just want to make sure I cover how everything here works. So again, each insight has its logic. You update the filters, it'll go to the actual insight parent logic. And that parent logic has this all filters object that I was describing earlier. And this will just contain everything that you've said here. Again, it's the same thing as the actual trial logic from each of these. And then this is passed into the component, this button that will actually take it and create it into a dashboard. And the last important thing I need to go over is that when you switch from trends to funnels to sessions, you'll notice that this string changes, but it also retains what you had said here.
 
**Eric:**
 
So if I said [inaudible 00:15:06] here and I go to funnels, well, I guess that routine's not working. Yeah. So if you're looking at this trends view and you have something set up here and then you switch to stickiness, for example, it'll reset to the defaults that stickiness had, but when you go back to trends, it'll save what you had here, and we do that through the query string up here. And that's just happening in the insights logic. So right here, when you set active view, it'll cache the URL and then save it. But it will actually propagate the properties and the test accounts, which is why you see this persisting across. But this is all handled from the query string.
 
**Eric:**
 
Those are the main components, but we can discuss how to make this better now, and I think that'd be really useful to lay down in a ticket and possibly approach. But again, I'd say we have to approach in a very sustainable way, so we don't just nuke the whole thing. So yeah, Buddy and Sam, could you go over the questions you had earlier again?
 
**Buddy:**
 
Yeah. So it's actually really instructive to... Well, I guess I have a couple of thoughts. One is, did James have any questions so we don't dominate this meeting? So I guess let me start there.
 
**James:**
 
Nope, none so far. Because it's just educational survey of this.
 
**Buddy:**
 
Right. I think if we have time, Eric, a follow up question to me would be how this integrates into the backend and how filters work on the backend. Because I think that's probably also complicated. But to answer the basic question that I was trying to get at earlier, the state of insights is really a hybrid combination of the logics and the URL. And so to understand what you're looking at or why you're looking at it, you need to understand what the filters are in the various logics, but then also what the URL is, because I guess when you go back or you go to a different URL, it looks up some URL cache and pulls data from that to reset the filters that way.
 
**Eric:**
 
Yeah. So that's actually point number one that we could discuss. Shouldn't we just get rid of the search string? Because we could do that. And then it would simplify... A lot of what makes this really hard to work with is that there are these listeners that always just fire every time the URL changes, and that's super flimsy because you're dealing with updates from the URL and then possible updates from within whatever state changes you make here. So it could be worth thinking about, cool, what if we just got rid of any reliance on the URL? [crosstalk 00:18:30]
 
**Buddy:**
 
You would lose a few things if you did that.
 
**Eric:**
 
Like?
 
**Buddy:**
 
You would lose refresh, hard refreshes. So today if you hard refresh, it understands what your filters are, but if you got rid of that and you did a hard refresh, you'd clear out your internal JavaScript state and you would lose your existing filters.
 
**Eric:**
 
Yeah. There's a few things. Okay. So to extend that implementation, what it could look like is that you'd be like, insights new, and then it might give you an ID. Yeah, it might be like, new, some ID. And then this would basically be a model in the database so that when you update it, it'll just keep it synced with this model, sorry, with this line item. So then when you refresh, it'll always be showing you whatever 10, 20 [inaudible 00:19:28] is giving. And that will just eliminate query strings. And this will be easy to share. If you're working on something and you decide to save it, it would be pretty trivial to save. So there's a few benefits we could approach in that direction, or we could-
 
**Buddy:**
 
That has a lot of other advantages too. So what you're saying is move the state from the query string to the backend, and then because we have that data, suddenly we can do things like look at history really easily, for example.
 
**Eric:**
 
Well, what you're going to find that's really funny is we actually store a lot of this already. You'll notice every change that I made stored. So it would be quite trivial to... Okay, now I don't want to say trivial, I hate that word. But it wouldn't be the biggest thing to convert into what I was just saying. Because if you notice, we actually save everything, but it's just-
 
**Buddy:**
 
But the backend is already doing it.
 
**Eric:**
 
Yeah, we save the filter and populate this.
 
**Buddy:**
 
The thing we don't do is load from that URL effectively.
 
**Eric:**
 
Yeah.
 
**Buddy:**
 
Okay.
 
**Eric:**
 
And what's really cool is, this is kind of the direction we had Lee going up the sharing scope, because we needed to be like its own path, essentially. Because now you can directly go to dashboard item and whatever ID it is, but this is only on saved items, deliberately saved items. But we can basically do that for new items too. So to be clear, when you go to a dashboard and you click on the dashboard item, it'll link you to that insight and it'll give you this dedicated page to edit it, and it'll have this link and then you can change things here. But I don't think it saves every time, you have to update the dashboard. My [crosstalk 00:21:20] would be an insight, so you just make this like I said. New, whatever.
 
**Buddy:**
 
It would actually... Interesting. Yeah. There's a lot of implications to this, some nice benefits.
 
**Eric:**
 
Yup. I'm just going to write some stuff down.
 
**Sam:**
 
There would be a way also to do some kind of fancy routing where you'd still be able to use the browser back and forth buttons without updating the actual URL, right? There should be a way to do that. Or like say, you know what I mean? If you change the-
 
**Buddy:**
 
They're already doing that, Sam.
 
**Sam:**
 
Yeah. Okay.
 
**Buddy:**
 
So the reason why, when you click between the tabs, you don't get a full page reload is because they're using a router to do that. It's not actually navigating to that page, it's just dating the URL.
 
**Sam:**
 
I'm just thinking, even more fine grains than that, if you go on here and say you... I guess actually that wouldn't make sense. No, nevermind. Nevermind.
 
**Eric:**
 
I mean, we have to further pro-con this, but at the current moment, would this just be way better?
 
**Buddy:**
 
There's no con that I can see. My con was just removing it and just not keeping that state, right? But when you're suggesting storing the state on the back and not losing it, then you don't lose the state. I mean, obviously it's more network traffic, more database storage, right? So from that perspective, it's a bit more, but this kind of stuff I would assume would pale in comparison to events. So it's not like we're going to create a billion filters, right?
 
**Eric:**
 
I mean, hilariously enough, I showed you, we already store everything. So that data con is already being incurred.
 
**Buddy:**
 
Do we store a new one every single time you make any change?
 
**Eric:**
 
Yup.
 
**Buddy:**
 
So this would actually be a benefit then, because from now on, when you had new and you changed the filters, you would--
 
**Eric:**
 
You'd change that one.
 
**Buddy:**
 
...you would be changing the same filter.
 
**Eric:**
 
Yeah.
 
**Buddy:**
 
And so you'd actually be storing less data. The only thing that could be a little tricky UX wise is just making sure that users are really clear on how to create a new one, right? There's not a new and load type functionality that you would want to put in there.
 
**Eric:**
 
Yeah. And I think this would tie into... With the project homepage, I think I was trying to make it more interactive for your own individual experience. So it would be nice to like, when you're looking at this and you had a new one and you want to save a draft, it would make a lot more sense now. Because you could just save a draft of this new thing that you're working on, and that would just be shown on your homepage. I'm just thinking about the implications, but that would make a lot more sense than what's happening right now. And then the obvious benefit is we'd be able to nuke a lot of this. I mean, this.
 
**Sam:**
 
If we go with the approach of just updating rather than creating a new one every time, then does the history feature remain? How would that change? Do people actually use the history feature?
 
**Eric:**
 
Well, that's another thing. My guess is no. I haven't done the proper analytics on this, but I would guess not a lot of people are using this.
 
**Buddy:**
 
It's not useful.
 
**Eric:**
 
Yeah. Because you can't really see what's going on here. The saved ones are basically all in the dashboards. So this is an analogy to what you're doing here anyway. Yeah. Oh, and there's another open ticket that Carl created about top level reports. So if we could... Actually, that's not related, I don't want to track a different concept in here. It's related, but it's not in this immediate situation.
 
**Buddy:**
 
Eric, can you quickly cover the backend if you have time?
 
**Eric:**
 
Yeah. I just want to make sure that we're somewhat in agreement here on everything that's happening. At least between me, you, and Sam. I know James-
 
**Buddy:**
 
I think whatever refactoring we do here is going to be quite tricky. The devil will definitely be in the details on this assignment.
 
**Eric:**
 
Yeah.
 
**Buddy:**
 
I mean, at least you don't have to deal with any of them. I mean, yeah. But yeah.
 
**Eric:**
 
Yeah. And this is part of that. It's like, when do we pay that debt? And how quickly can we pay it? That's just what I always reemphasize. Because we can do this, but like you said, there are some details that even I might've just haven't mentioned here. So when you start refactoring you'll be like, oh crap, got to consider this, this, and this. And then it turns into a two week refractor rather than what we thought would be a three-day refactor. So we'll have to be careful here. I think we all open a ticket following this talk obviously about the proposal, and then we just have to figure out all the [inaudible 00:27:04] before we just dive in.
 
**Buddy:**
 
You know what we could also do that could work? Is we basically spin up a new insights folder and put it under a feature flag or something, where we progressively build and reuse. We obviously have the filter component, we have all these other things, right? We basically, instead of trying to refactor it, we just build a new version of it slowly over time. And then we can swap whenever we're ready.
 
**Eric:**
 
It might be too slow though, right? Because as we change the UX and the logic even of the... Sorry, the UI and the logic of this insights thing is going to keep changing. So if we take, let's say four weeks to build it, something's going to have been added or kind of botched or sorry, changed, that's hard to put over.
 
**Buddy:**
 
Yup. That's fair.
 
**Eric:**
 
Yeah. So it would have to be something on the fly. I want to argue though that it wouldn't be the most treacherous thing, we just need to map it out a little bit. Because Lee was able to create this into a distinct URL and remove the dependencies on that pretty quickly. And it's actually all built in here. Yeah, she just basically used a different end point, sorry, a different path name. So it's possible, but there's just a few more considerations we got to make sure of. Well, yeah, I'll write in the details and do a little think through, and then we can figure out where to go from there. This is definitely a refactor ticket and we just have to make sure we tackle it efficiently. Yeah, I can go on to the backend now. So [inaudible 00:28:57] the best way to do this. So the filters are set right, and then caller resets up here. This will just send the filters to one of these end points. And I'll go show you the end points now.
 
**Eric:**
 
Well, I'm trying to think if I should show you the actual end points or click [inaudible 00:29:23]. So okay, end points are defined here. I think I can back this out now. These are all the shared ones. Shared as in self hosted and cloud both use them. And then you have this E enabled, and you'll see this five happen because if E is enabled, instead of registering our usual view sets, we put in ClickHouse new sets. And these are just the controllers for all the ClickHouse related data that might be switched over. Because the logic in these are all handled differently while the logic in views are all shared. Meaning this relies on ClickHouse, this relies on Postgres, these rely on Postgres in both cases, Sophos to nCloud.
 
**Eric:**
 
Cool. So I think I'll just go right into insights. I'm going to show you ClickHouse because it's more relevant right now, and it'll probably be weirder. ClickHouses is in this folder, in E up here. Oh, sorry. I'm also just doing a general walkthrough, not just on the filters, unless you want a very specific on the filters breakdown.
 
**Buddy:**
 
I mean, I think as long as you end up at filters, it's fine.
 
**Eric:**
 
Yeah. Okay. Yeah, I'll give you the whole context. I think this will be useful, especially since we're recording the [inaudible 00:30:52]. Cool. So I'll just show you that end point here actually. Go to views then insights. This is the ClickHouse insight view set. And that's inheriting from insight view set. This is just to get this thing. And these are just end points. They're just handling the request. So you'll see if you call trend, it's just literally insight trend. It'll call calculate trends, which is this function here. Now we're looking at the Postgres symbol notation right now, but I'm just showing you that when it inherits, when ClickHouse inherits this one, it'll overwrite calculate trends because we want to use ClickHouse logic when we're using the ClickHouse view set.
 
**Eric:**
 
So cool. You'll call trends, it'll call calculate trends. Now you're looking at this, and I'll go through this line by line. So cached function is a decorator, and this handles caching logic. So we'll actually generate a cache key from the filter, so that it's unique to the makeup of that filter. So it'll take, I think all the elements... We can go through that also, but it'll take whatever elements we were filtering on, all the parameters, create a key of that, and then basically put it in the key value [inaudible 00:32:34]. And then when we get the result, we'll put that into the cache. And then this will basically be hit and return a cache value, which is why sometimes you'll see in insights it's like computed three hours ago. So that's all being handled here.
 
**Eric:**
 
But if you hit a hard refresh, it'll just ignore that and then it'll go through to the actual logic. So here's the actual logic. Team is on this view set or whatever, this is just an instance variable filter. So this filter object is what digests the dictionary that we pass back, or that object that we pass back with all of these filters is digested by a filter. So I can go into that right now, which will make more sense.
 
**Buddy:**
 
While you're doing that, when is the cache invalidated?
 
**Eric:**
 
There's a timeout on it. I forgot exactly how long it is, but it's not that long. So it's not a permanent cache.
 
**Buddy:**
 
But if I click that refresh button on all the charts, that ignores the cache, right?
 
**Eric:**
 
Yup. It'll just pass it and then give you a fresh copy, however long this takes. Okay. So this filter object is taking the requests, and it basically just looks for the dictionary there. How do I describe this better? So I broke this down into a lot of mixins so that you could look at each property very specifically, because this class used to just be a giant class that try to every single value in one place, which got really confusing. So now, if we want to look at interval, we can go to the interval mixin, which is mixins common. And that's just telling you, from that data object, which is this huge map, just get the interval, this is just some constant, and then default to today if necessary, so that every time now when you call filter interval, it'll just give you this key value. Which means when you are... Oh crap, I overwrote my file.
 
**Eric:**
 
No, when you're here and you do filter, it'll just get what I was showing you back here. Okay. So that's this. There's a decorator here that makes sure that you don't recalculate. This is built-in. So actually, we added something to it, but what this does is basically make sure that you don't, there's a terminology for it, but that you don't have to keep recalculating this, especially if there are calculations. Next in this little mixin is included, and this makes sure that when you serialize the filter object, because we do that for the key, for example, right, it'll add this to the dictionary properly so that it can serialize just in case. All of these are pretty standard, but sometimes there might be a casting or type change that you have to do.
 
**Eric:**
 
And yeah, I know this is a lot of repeated code. There was some meta function that you can create for this, but I couldn't figure it out. So that's where we're at right now. It's just a [inaudible 00:36:23] function essentially to make sure when you serialize the filter that this is included in that dictionary,
 
**Buddy:**
 
I don't think that matters, that it's repeated like this. Personally.
 
**Eric:**
 
But cool. So that's what makes up this whole thing. So this filter can handle properties, intervals, entities, entity ID, they're all very similar. Maybe the property one is worth looking at because it's probably slightly different. Yup. So you see. And we'll load all the properties while we parse it here before we return those properties, and it'll just create the property objects. Which is essentially just taking those... I think you all might've seen this, the key value operators and putting them into an actual object. Cool. So that is filters. That is this thing. And now, you just have an object that's validated and process all the filters that you passed from here. And now we can go into ClickHouse trends.
 
**Buddy:**
 
So essentially, we take their request object and turn it into a filter object.
 
**Eric:**
 
Yup. And now we can go into ClickHouse trends, that's taking this here. This actually needs to get probably updated. ClickHouse trends. Should I show you this one? Yeah. We essentially have classes for all of our query. So ClickHouse trends handles all the trend query, right? I think that'd be pretty straight forward. So when you call run, run is essentially the take my filters, take my team ID, give me the result I want. So we have this object, call run. We end up here, right? Now, run starts assembling your query. Let me just make sure I'm looking at this right. Yeah. We first determine if there's any actions that are necessary, and then we will either use that in the actions query, or we just... Sorry, I don't actually know why this ended up here.
 
**Eric:**
 
There's some action checking here to make sure that they exist. But the important part actually of what's going on here is you're going through each entity, which is these things, and you're creating graphs from them. So user signed up would be an entity, which is an event entity. And then if you clicked, this would be an action entity as a user signed up. Yeah, it would be an event. Oops. But they're both event entities. And you iterate through them and then create the queries for them. So let's say handle compare. This is a wrapper that will make sure that if you do this, it'll double up that query in a different time period. So you'll get the first time period and then it also make sure that you get the second time period. And then it'll pass in the run query function, which is actually where the building happens. So I'm just going to go right to here.
 
**Eric:**
 
And then the run query function will pass in the filters more and you go get the actual SQL, and then the SQL here will decide we're looking at a breakdown, lifecycle, or just a regular one. I know this comparison doesn't seem categorically the same because it's like, why are we looking at a shown as and then a breakdown, by adjusting how some of the queries are built. This is where that line was drawn because it makes the most sense in terms of building the query. So if we look at building normal query, that'll be somewhat the most straight forward right now. You can go here. And this is where most of the querying, actually all of the query building happens.
 
**Eric:**
 
So you'll notice that we have the filter, the team ID, and the entity. Sorry, I need to pull my window down. It was getting glare. Entity is what I was describing up here. That's pretty much just this action and maybe the filters that are included, if there are any, and then the filters just that overall object. Doesn't need to be split out technically, but it just becomes easier to work with. Because you could actually just do filter entities by whatever index, but this just defines that we're specifically working with entity.
 
**Buddy:**
 
So every entity is a new query, right?
 
**Eric:**
 
Yes.
 
**Buddy:**
 
And every time you add a filter, you're applying the filter to all the queries or all the entities.
 
**Eric:**
 
Do you mean this filter?
 
**Buddy:**
 
Yes.
 
**Eric:**
 
Yup. And those filters are handled here.
 
**Buddy:**
 
Right. And that's the separation. You have entity and you have filters.
 
**Eric:**
 
Yeah.
 
**Buddy:**
 
And then that means that you have to teach every query that you write how to handle our generic filter.
 
**Eric:**
 
Yes. Yup. I think if I'm understanding how you're phrasing that, but yeah.
 
**Buddy:**
 
Meaning that, so in filters you can say, add blah, blah, blah, right? And then whenever you go to generate that SQL, every single time we have a new SQL that we have to write for some new kind of query, it additionally has to understand how to implement filters as a requirement.
 
**Eric:**
 
Yeah, yeah, yeah. Oh yeah, yeah, sorry, keep going. No, this is good.
 
**Buddy:**
 
I mean, my thinking is just that this is probably the biggest area for opportunity.
 
**Eric:**
 
Yeah. Okay, as context for the call, briefly Buddy and I were messaging about views, I would like to use views, but the problem is that the views, what I'm pretty sure is how it works, is you create a view and it's like, create view using select blah, blah, blah, blah, blah, blah, blah. But the problem with that is, we have very specific filters essentially that need to be per specific per team and then per input by every user on the team. So we could create a view for every team ID, one, two, three, four, five, through 2000, but I wouldn't really do anything. And then the problem after that is, for us, for example, we have queries that are like, select blah, blah, blah, from events where team ID equals two. But then we need to add all these dynamic filters that change on every input, so those views become very useless, unless I'm missing something on how those views work. So that's my problem. Well, we can go into the actual SQL problems, but I just want to get through the building of the SQL.
 
**Buddy:**
 
No, you're totally good. And I didn't mean to suggest to use it here, I was just talking about, if you wanted to know where the core complexity of our system is, we're in it right now.
 
**Eric:**
 
Oh yeah. All right. So there are several helper functions here that just help determine parameters and some of the syntax that needs to be built. Now, again, in normal cases, this would all be abstracted by an ORM, but a lot of our querying needs are quite specific. When you create a retention query, that's really hard to do with an ORM, in my opinion, I tried it with the Jenga ORM. It was doable, but after that, you can't even read the ORM. So it's like, that's not even really helping you. Which is why we ended up with writing raw SQL. And I've had a blast writing raw SQL, because it's as unreadable as this seems. The Jenga ORM was not readable when you wanted to write complex queries. Especially because they have their custom thing that annotate and all of that. So these are helper functions.
 
**Sam:**
 
It writes terrible queries. The queries it writes-
 
**Eric:**
 
Oh that's true. Yeah.
 
**Sam:**
 
It doesn't know [inaudible 00:45:29] performances.
 
**Eric:**
 
Okay. So there are a bunch of helper functions here. I'm going to try to do some high level hand-waving first so that you can see how the query is built, and then we can go into each one specifically as needed. But otherwise, we'll never get through this because there are so many helper functions. So we get some intervals, get some dates, get some... Oh, shoot. Don't want to do that. I guess, yeah, intervals, dates, props. So we have this magical prop function, and this is where the properties like these filters are really getting digested, we pass in props to filters, which is basically anything from the filter.properties, which is this stuff. I know there's a little of confusing syntax here, but just bear with me. So filter.properties is this and entity.properties is anything under here.
 
**Eric:**
 
And you'll notice we're combining them here simply because we're building a query for a specific entity. So they all just need to be jammed together, and it's fine. And then we pass that into this. And then this will give you prop filters like query, and then the parameters to escape in when you run the query. I think you'll see these are all the parameters that we need, and then we call it content SQL. Because this actually isn't the whole query, if I'm remembering everything correctly. But anyway, you format all of these after you get the helper functions. Again, these just give you dates, whatever timestamp, some queries do. They're just upending, not even subqueries, but just the parts of the query that are needed, and then go to here.
 
**Eric:**
 
There's a few more statements that control, if you're looking for weekly active or monthly active. So that's the new feature that we added that changes based on... These are [inaudible 00:47:29], these are total volume as you guys are used to, these are trailing numbers. So you have to handle trailing numbers slightly different. But volume SQL is probably the most straightforward one or the most basic one that fun default always runs. So I can show you that. So that one's pretty simple. It's just looking for an aggregate operation on the data, changing some timestamps to bucket them, event join this. This is basically, if you're looking for just an event, it's really easy, because on events it's just event equals page view. But if you're looking for an action... Oh no, sorry, I jumped the gun. That's entity query. Event join is just joining things if necessary. So if you have prod persons or whatnot, you'll join them here.
 
**Eric:**
 
So team IDs here is parsed in as a parameter. So when you see these, these are direct parameters that will be run and filled in with the query. But when you see these, these are sub chunks of the query that we need to add. So the entity query is what I was talking about. If it's an event, you'll basically have aware, team ID, blah, blah, blah, and event equals page view, right? Because our data model for events is just, event name, properties, timestamp, whatever, whatever. But if it's an action, you have to do all that extra handling to figure out which actions what, so that's why it could get complex here. It could be event equals or it could be event is in blah, blah, blah. I can show you more of that, but I'm just giving you a high level view of what's going on.
 
**Eric:**
 
Now, filters is more of those conditions. So this would be where properties like current URL matches this, rejects matches this, isn't this, whatever. And then parsed date from day two, we use timestamps. And then you group by interval timestamp. This helps bucket stuff. So that's what's happening here with volume SQL. Oops. And then you have a no SQL. So before, we were handling a lot of this in the server... Sorry, what happens with this is that when you query stuff, when it gives you a zero, unless you specify, SQL row is not going to return to zero when you're calculating, just in how this query is written. So I just added a clause that will basically fill in the zeros as necessary.
 
**Eric:**
 
So you might get buckets with like, this week has five, this week has two, but the week in between a zero and it doesn't show up, so you just add a no and you just fill it in. It's like, this is just what this is doing. And then you put them both together and aggregate SQL, which will just collapse them together. It'll just count and group by again. That isn't really taxing or anything, it's just some formality to get the data formatted right. I did this so that we can do everything in SQL at once. I don't want to do more processing out here if it's not necessary. You guys would like laugh, but in Postgres. Originally, our breakdown was using pandas and everything. So we use SQL to process some data, and then you use pandas to process the second half of the data. And we were just like, okay, this is way too much foolishness.
 
**Eric:**
 
So that all got cut. And then when I was rebuilding a lot of the stuff, I wanted everything in SQL because it's faster and it'll just be cleaner to read, especially, and debug at the end. Cool. And then when you have this, you'll send back the query and the parameters to run somewhere else, and then you'll pass back also, the parser. So go back up here, get the query. So over here, I just executed here. Capture, send some exceptions if something breaks, and then parse from the parse function, and then serialize. These are basically just post-processing. There's not too much magic in here, they're just formatting arrays and whatnot. This is different if it's cumulative, this is just another handling that's slightly different that we added here. And then you just parse back the data. Ends up here, comes out here if it's compared, it'll obviously run that separately for entities in different time periods.
 
**Eric:**
 
Some of this stuff maybe can be mashed together, but in any case, it comes out, you add this to the results, and if that's your only entity, then it'll return the results, and then obviously some of the data back, but otherwise, you go to the next one. So I'm going to stop there, because we did a pass through of trends. I think there's probably hell of questions. So feel free.
 
**Buddy:**
 
So from a computational perspective, this looks pretty nice because all it's really doing is a bunch of string concatenation. And it's not really doing much number crunching really. There's probably some memory stuff that happens because you have to serialize, deserialize, that sort of thing, but it's all pretty computationally nice. So the expensive part, I see two expensive parts. This isn't a criticism, more just an observation.
 
**Eric:**
 
Yeah.
 
**Buddy:**
 
Which is, the speed at which this stuff executes is going to depend on how well formed those queries are, right, and what indexes are in place, things like that. And then the secondary thing I think would be expensive is I could see how you could go from writing raw SQL in your, I don't know, database tool of choice to code like this. But then to go backwards out of code like this to debugging feels like it could be quite hard. So do you have any tools in place to help you with that? Such as, okay, we had an issue with this query, so here's the query that was ran, and then you could do the same process by working from the query back to the code. Because I think going from the code to try and figure out what's wrong would be quite difficult.
 
**Eric:**
 
Yeah. So what I have to say about that is, when you see these large chunks of queries, what's interesting is that because we laid down so much, the lifecycle is notoriously long, so don't be triggered by this. But when you look at how much we leave inside the query, this is actually really important because it seems really chaotic right now, what I showed you and all that code, but that's formatting very basic stuff. So like parse timestamp, this is literally timestamp equals blah, blah, blah. That's just wrapped in a utility function because there's some dates that need to be formatted properly or whatever. And then same with interval, right? This is literally just getting like... Sorry, even aggregate operation, this is literally just maybe adding distinct or we're adding the 50 percentile or 99 percentile function. These are all really, really basic statements.
 
**Eric:**
 
And then there are one or two places that get kind of hairy like entity query and event join. But even these, like I said, it's either event equals or it might give you a slightly longer statement that just finds actions. But otherwise, any problematic logic in my experience has always just been me looking at what ran, going to Metabase or going to DataGrip or something, running it, figuring out what's wrong, experimenting, changing the query a little bit, and then coming in here and figuring out, okay, this needs to be changed, we're joining on the-
 
**Buddy:**
 
Perfect. Yeah.
 
**Eric:**
 
Does that make sense? It's-
 
**Buddy:**
 
It's exactly how I was imagining that. Basically you get your hands on the raw SQL query somewhere, figure out what went wrong, and then trace where it is in the code. How do you get your hands on the raw query?
 
**Eric:**
 
Oh yeah, that's what I was describing earlier. Sam had this funny thing that I was kind of a few weeks late on this, but when you run a query this...
 
**Sam:**
 
I love this by the way, this is so good.
 
**Eric:**
 
...you can just go and debug, wait.
 
**Buddy:**
 
How do you open up the tools, even?
 
**Eric:**
 
Command K. We don't advertise this that much, but this was something we built, me, Paolo, and Michael built actually for the hackathon we had in October at our offsite. So this was built in maybe a week. How many days we had, five days? We like to expand a little bit. And then we just add some hidden goodies in here. So you can see the query that's run.
 
**Sam:**
 
So good.
 
**Buddy:**
 
Okay. And this is the last query that was ran?
 
**Eric:**
 
Yeah. This is a retention query. So we can just take this.
 
**Sam:**
 
You guys are all in Metabase, right?
 
**Buddy:**
 
No, never heard of it.
 
**Sam:**
 
Okay. I'll send you an invite.
 
**Eric:**
 
And then we can just run this and then you can see, this is how... Am I looking at it? No, sorry. This might be a stale. Here's some trends I think. But in any case, you just run the query and see, okay, here's this, here's the data. And then you can highlight and run specific things. This is pretty usual for a database editor. Or sorry, database-
 
**Sam:**
 
Yeah, query client, whatever you want to call it. Query editor. Query builder. All right. I've got to run. This is really educational though. Thanks, Eric.
 
**Eric:**
 
Cool.
 
**Buddy:**
 
I agree. Very educational. I'm glad I'm getting an invite to Metabase. I didn't know that was a thing.
 
**Eric:**
 
But yeah, we can keep bashing on this. I don't mind. I think it's good that you guys get an idea of what's going on here.
 
**Buddy:**
 
No, I sent you a message actually in slack, which said that this is really impressive work in queries. So I think I'm just processing what's happened, what is, and what the thinking is behind it. And so don't take anything I'm saying as criticism.
 
**Eric:**
 
[inaudible 00:58:18]. I think any comments you have, feel free. This is super useful.
 
**James:**
 
Good stuff, Eric. Thanks again.
 
**Eric:**
 
Yeah, no problem. And well, it's funny because we did superlatives ironically, but mine wrote the most queries last year.
 
**James:**
 
Yeah, yeah, these-
 
**Buddy:**
 
I mean, these queries are very large.
 
**Eric:**
 
I wouldn't want them to be, but again, there's some things that we just couldn't avoid.
 
**Buddy:**
 
Well, it's the whole nature of being able to see data the way that you want to see it, right? So it's not your fault, it's the fact that we have a tool that allows you to... You know what I mean?
 
**Eric:**
 
Yeah. Yeah.
 
**Buddy:**
 
It's a feature, right?
 
**Eric:**
 
Well, because it's like, basically you have this thing, and what this is literally, is a query builder. What we're looking at here is pretty much a query builder and it's like, you're trying to balance a really concise query on your backend, but then you have to give users the flexibility to [inaudible 00:59:21] how they want. So then you're at odds, looking in your backend and looking into this black hole. But yeah, I can dissect all this for you to explain what's going on. It doesn't end. And this is by no means, perfect. There's probably quite a few caches and efficiencies that can be changed, but you'll just see, when you start clicking through this, there's just endless amounts of queries.
 
**Buddy:**
 
So now I think I understand how you guys are debugging production issues. Somebody is getting their hands on a query that's been ran and basically working backwards.
 
**Eric:**
 
Yeah.
 
**Buddy:**
 
And so the question will be, where does that information come from? And that's probably a cause for another talk, a different meeting.
 
**Eric:**
 
Yeah. In terms of any performance issues that come up, we generally just try to get the query and then run it. Yeah, I think in terms of the backend code quality, there's just a bunch of stuff that could be fixed for sure. But yeah, I mean anything regarding the queries, it's basically in this SQL. And most of it is pretty clear because we've kind of just prioritized keeping blocks of SQL together so that you can see it all at once. I thought this would look really dirty at first, but actually James G brought it up and I thought it ended up being really good.
 
**Eric:**
 
Because again, when we were first on Postgres and we wrote a lot of those analytics, it would actually be really hard to debug. Because you'd be looking at the ORM and not even understand what query is being built. And I mean, you looked at the funnel SQL, right? That one was actually a hybrid, which I don't know for better or for worse, but that was really hard to read because it tried to use some ORM and then some not, and you just got this collision. But there are other areas where even if it's just ORM, you're like, what actually happens from this query?
 
**Buddy:**
 
No, exactly. In fact, when I was looking at it, what I ended up doing was printing out the SQL that was generating.
 
**Eric:**
 
Yeah. And that's why I did...
 
**James:**
 
That's been my experience with ORMs also, it's like with building teen stock and having this social network functionality, it was even worse in a way, because there's really networks, hyper-connected stuff. And I should have just built something with GraphQL and stuff like that, but I had this really janky node JS that just, all it did was add a layer of obfuscation between me and the SQL.
 
**Eric:**
 
Yeah. So it feels like-
 
**Buddy:**
 
That's a-
 
**Eric:**
 
Yes. Go ahead.
 
**Buddy:**
 
Sorry. I was going to go off tangent and talk about GraphQL for a second. We can do that another time as well. What's that?
 
**Eric:**
 
No-
 
**James:**
 
I'm curious to hear your take on it. Well, yeah.
 
**Buddy:**
 
Well, if you think about it, did you have something you want to cover, Eric? Because this is completely off topic.
 
**Eric:**
 
No, go ahead. I'm just looking at some stuff.
 
**Buddy:**
 
And you can stop recording if you want, or you can keep recording. But the-
 
**Eric:**
 
Oh, I'm actually going to stop so I don't run out of space.

> PostHog is an open source analytics platform you can host yourself. We help you build better products faster, without user data ever leaving your infrastructure.

<ArrayCTA />
 

 
