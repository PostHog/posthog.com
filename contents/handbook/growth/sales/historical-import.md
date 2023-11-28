---
title: Historical import
sidebar: Handbook
showTitle: true
---


## Historical import

Since our system does not experience a huge variance in incoming traffic aside from the occasional instrumentation bug, it's important to give the pipeline team a heads up in advance, since we may rate limit the requests. Additionally, we need to clarify a few commercial and technical points before giving the green light.

1. Make sure they have their product questions answered first, ie, they are not relying on historical import data to validate their use case. It's ok for this to be a contingency of them using the product/paying us, but we should be pretty sure that they are committed so we can avoid asking pipeline team to spend (sometimes considerable) effort managing an import only to have a user decide we're not a good fit.
2. Customer should answer the following: 
	- When is this scheduled for (strong preference for weekdays with the most EU-timezone overlap)
	- Regarding the actual request(s), what can we expect around:
		- batching
		- distinct_id variance, specifically, max events per distinct_id for the top few users (eg `select count(*), distinct_id from events group by distinct_id order by count(*) desc limit 100` or similar)
		- event types (some require more consideration to process than others, eg $create_alias , $identify etc)
	- Will you have apps enabled
	- What will be the peak rate and total duration of calls
	- What will the ramp-up profile look like

If the count of events for a given distinct_id is too high, we may relax the constraint that events for a single distinct_id are always sent to the same kafka partition, which means these events might not be processed in the correct order. This can be problematic for merging events, where order of ingestion matters (eg an alias event arriving before an identify event on which it depends). This will need to be communicated to the customer.

# Load testing


If a customer mentions load testing, get answers to the above and then alert the pipeline team asap, so that accommodations can be made, as this may require scaling up to handle properly. If a customer plans to send a large volume of single capture requests all at once, rather than ramp up to a peak over some time period, that is not a load test but more like a denial of service (DoS).



