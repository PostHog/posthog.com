Paths are PostHog's way of letting you, inspect free form how traffic is flowing through your application. A path can be comprised of any action (such as pageviews, or button clicks, or a combination of both).

The kind of ways Paths can be helpful are as follows:

* Understand where traffic is landing into your application or website
* Understand where traffic is quitting your application
* Understand which parts of your application people are actually using

## Viewing paths

Go to 'Paths' in the left hand navigation:

![Paths - left hand navigation](https://posthog-static-files.s3.us-east-2.amazonaws.com/Documentation-Assets/Screenshot+2020-02-27+at+16.22.49.png)

There is no set up in the PostHog UX needed for paths - they appear automatically if you are tracking pageviews with our snippet, or pushing page view events 

We are currently working on deepening this functionality. Today, it shows you a snapshot of the pageviews over the last 7 days. [Here is the ticket](https://github.com/PostHog/posthog/issues/223), feel free to comment, upvote or pick up this as a PR.

### Multiple domains

Paths work across subdomains, even with the basic snippet installation. We see it's common for a website to be the landing page, then traffic to move into app.example.com, once a user starts interacting with the product. Just set up the root domain as the URL in your [tracking settings](/snippet-installation).

We recommend tracking across everything so you can understand where your most engaged users come from.