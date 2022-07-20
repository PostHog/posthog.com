---
title: Running surveys with no backend
sidebar: Docs
showTitle: true
author: ['yakko-majuri']
date: 2022-07-15
featuredImage: ../images/tutorials/banners/surveys.png
topics: ["configuration"]
---

- **Level:** Easy 🦔
- **Estimated reading time:** 3 minutes ☕️

Getting user feedback is very important for improving your product, and you can use PostHog to run surveys and pair the survey data with all other metrics about your product.

This is especially helpful for static websites, or those using static site generators like Gatsby or Node.js.

## 1. Decide what you want to know
   
PostHog is best suited for visualizing data that is categorical, binary, interval-based, or on a scale. 

In other words, there should be a limited set of possibilities from which an answer is chosen, rather than accepting arbitrary data.

While you can visualize arbitrary data from surveys in PostHog,  we believe other services may be better suited for this.

For this example, we're going to ask users to rate their experience using four options: 'Poor', 'OK', 'Good', and 'Great'.

On the PostHog website, we collect feedback on docs pages and tutorials using this method.

## 2. Implement your survey frontend

For most this will mean implementing some simple HTML, like this:

```html
<p>How would you rate your experience with this feature?</p>
<form>
	<div>
  		<select id="survey-select">
          <option value="3">Great</option>
          <option value="2">Good</option>
          <option value="1">OK</option>
          <option value="0">Poor</option>
        </select>
  </div>
  <button onclick="submitDataToPostHog()">Submit</button>
</form> 
```

## 3. Send the data as a PostHog event

Next, you need to determine an event name for the specific survey you are running and capture a PostHog event with that name when the user submits the survey (e.g. via a button click).

Following the example from above, we could do:

```js
const submitDataToPostHog = () => {
    // Get survey response and convert to number for better analytics
    const surveyRating = Number(
        document.getElementById('survey-select').value
    )
    // Capture an event with the rating
    posthog.capture('my_feature_reviewed', {
        rating: surveyRating
    })
    // Set a property on the respondent based on the rating
    posthog.people.set({
        survey_rating: surveyRating
    })
}
```

## 4. Analyze the data in PostHog

There's a lot you can do with survey data in PostHog, such as:

- Plotting aggregate survey data to distill feedback into insights
- Creating cohorts based on survey responses 
- Rolling out feature flags based on user preferences
- Tracking retention and conversion by user preferences 
- Getting the average, sum, maximum, and minimum values of numerical data

And that's it!

You've created a mechanism for getting user feedback with just a few lines of code, no backend, and that integrates seamlessly with the rest of your product data. 