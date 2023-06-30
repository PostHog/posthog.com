---
title: Evaluations
sidebar: Handbook
showTitle: true
---

# Load testing

Larger customers will request to load test as part of their evaluation. Since our system does not experience a huge variance in incoming traffic aside from the occasional instrumentation bug, it's important to give the pipeline team a heads up in advance. Beforehand, it is best to get additional context from customers on the following:

- When is this scheduled for? (strong preference for weekdays with the most EU-timezone overlap)
- What do you plan on validating with this test?
- Regarding the actual request(s), what can we expect around:
	- batching
	- distinct_id variance
	- event types (some are more expensive to process than others, eg $create_alias , $identify etc)
- Will you have apps enabled?
- What will be the peak rate and total duration of calls?
- What will the ramp-up profile look like?

If a customer mentions load testing, get answeres to the above and then alert the pipeline team asap, so that accommodations can be made, as this may require scaling up to handle properly. If a customer plans to send a large volume of single capture requests all at once, rather than ramp up to a peak over some time period, that is not a load test but more like a denial of service (DoS).