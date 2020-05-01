Sessions help you understand product usage by uncovering the amount of time users spend on your app or website.

This is useful as it gives you an engagement statistic of how long the average usage time of your app or website is along with the distribution of usage across certain time frames.

## Viewing Sessions

Go to 'Trends' in the left hand navigation:

![Left hand navigation - trends highlighted](https://posthog.com/wp-content/uploads/2020/04/Posthog-13.png)

Select 'Sessions' next to 'Actions & Events'

![Sessions](https://posthog.com/wp-content/uploads/2020/04/Posthog-17.png)

You can now see the 'Average Session Length', by default this will be over the last 7 days.

### Average Session Length

Average Session length takes the total number of sessions completed within the selected timeframe and the average duration of those sessions, you can change the interval to a date range by selecting the dropdown next 'Last 7 days' next to 'Add to dashboard'

![Session2](https://posthog.com/wp-content/uploads/2020/04/Posthog-20.png)

You can filter average session length by the same properties as you can in 'Trends'

### Distribution of Session Lengths

Distribution of session lengths breaks down the total sessions in the selected time frame by a select number of time intervals raning from 0 seconds (in which only 1 event occured during the session) to 1+ hours.

![Distribution of session lengths](https://posthog.com/wp-content/uploads/2020/04/Posthog-18.png)

You can filter average session length by the same properties as you can in 'Trends'

## How are sessions calculated?

Sessions are calculated as soon as an event is recorded by a user, they end once there has been 30 minutes of inactivity.
