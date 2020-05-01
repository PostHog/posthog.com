Cohorts are PostHog's way of letting you easily create a list of users who have something in common.

You can use the cohorts to:

* View a list of users who all did the same action or have the same property. A few examples of how you might use this are:
  * "Which users used the app today"
  * "Which users work at the same company"
  * "Who used the app once but never came back"
* Segment other statistics. For example, to view user paths or action trends. This let's you understand things like:
  * "Are people at company X using the app much?"
  * "Is the number of Daily Active Users going up or down over time?"

A short video on Cohorts can be found here: https://youtu.be/8_SsZW1v56Q

# Creating a new cohort

Go to 'Users' in the left hand navigation.

![left hand navigation for cohorts](https://posthog-static-files.s3.us-east-2.amazonaws.com/Documentation-Assets/Screenshot+2020-02-27+at+15.34.56.png)

Then click '+ new cohort':

![+ new cohort button](https://posthog-static-files.s3.us-east-2.amazonaws.com/Documentation-Assets/Screenshot+2020-02-27+at+15.35.02.png)

## Cohort settings

There are three key settings for a cohort:

![Three key cohort settings](https://posthog-static-files.s3.us-east-2.amazonaws.com/Documentation-Assets/Screenshot+2020-02-27+at+15.44.30.png)

You can group users who have performed certain [actions](/features/actions). You need to already have configured actions for that to work.

You can also group users who have a certain property in common. Commonly, this used to combine users at a certain team, or from a certain marketing campaign via their UTM tags, or whatever other static property you need:

![user cohorts - properties menu](https://posthog-static-files.s3.us-east-2.amazonaws.com/Documentation-Assets/Screenshot+2020-02-27+at+15.58.24.png)

You can add together multiple conditions by using the 'New group' button. This acts as an AND function.

## Adjusting time frames

You may only want users who have performed a certain action within a certain timeframe.

On setting the cohort to 'user has *action*', you will be presented with the following:

![cohort - user action date range selection](https://posthog-static-files.s3.us-east-2.amazonaws.com/Documentation-Assets/Screenshot+2020-02-27+at+15.59.50.png)

We are working to [expand the power of this filter](https://github.com/PostHog/posthog/issues/199).

# Viewing users in a cohort

Go to Users > Cohorts in the left hand navigation:

![where to view the users in a cohort](https://posthog-static-files.s3.us-east-2.amazonaws.com/Documentation-Assets/Screenshot+2020-02-27+at+16.10.06.png)

Select the cohort you want to view by clicking it, and you'll be presented with a list