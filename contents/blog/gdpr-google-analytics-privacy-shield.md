---
date: 2022-01-25
title: A new 'Privacy Shield' won't solve big tech's GDPR problem
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
featuredImage: ../images/blog/posthog-release-notes-blog.png
featuredImageType: full
author: ["andy-vandervell"]
categories: ["Privacy", "Product Analytics", "General"]
---

Ten years ago today, the European Commission published the first draft of the General Data Protection Regulation (GDPR). But, as [the recent ruling in Austria concerning one website's use of Google Analytics](https://isgoogleanalyticsillegal.com/) proves, how those rules are enforced and interpreted is still contested.

There's lots of detail in the full ruling (link needed), but here's a quick summary:

- An Austrian website was found to have exported personal data of a user to Google servers in the US
- The complaint argued this was a breach as it was subject to demands from local intelligence agencies
- The Austrian Data Protection Agency agreed it was a breach and the case remains ongoing 

That's a very simplified version of events, but here are three important takeaways:

### 1 . Google was cleared of any wrongdoing (for now)
Only the website that was using Google Analytics, as the data controller, was found liable for the breach. Under the GDPR, breaching the regulation can result in huge fines of up to €20 million or 4% of a company's global turnover, whichever is the largest. [Amazon was fined €746 million by authorities in Luxembourg in 2020](https://www.bbc.co.uk/news/business-58024116), the largest GDPR fine so far. Getting it wrong can be painful.

### 2. Any website using Google Analytics in the EU could be liable
As confirmed by [guidance](https://tweakers.net/nieuws/192020/autoriteit-persoonsgegevens-waarschuwt-voor-mogelijk-verbod-op-google-analytics.html) published by the Dutch Data Protection Authority, any website or product using Google Analytics in the EU could be in breach of the GDPR. Much of the ruling hinges on specific configuration options within GA, which further complicates things for end users.

### 3. This is just the beginning
This complaint was but one of 100 similar complaints lodged by the same non-profit group. The founder, Max Schrems, [told WIRED](https://www.wired.co.uk/article/google-analytics-europe-austria-privacy-shield): "It's not specific to Google Analytics. It's basically about outsourcing to US providers in general". Other complaints include the use of Google Analytics and Facebook Connect by the likes of Airbnb and Ikea, so expect to hear about more rulings in the coming months.

## How did we get here? A brief history of GDPR
Most of the conversation thus far has focused on whether this means [Google Analytics is illegal](https://isgoogleanalyticsillegal.com/) to use in Europe, but this goes way beyond Google Analytics alone. This is just the latest chapter in a long running saga concerning a core principle of the GDPR: data portability.

In its [response](https://blog.google/around-the-globe/google-europe/its-time-for-a-new-eu-us-data-transfer-framework/) to the ruling, Google urged the EU and US to come up with a new legal framework to create legal stability. It's a reasonable demand but, we've been here several times before.

To understand the problem a little better, it helps to understand the history of GDPR. Let's break things down: 

### January 25, 2012: The European Commission publishes its draft GDPR
Here's where things start, 10 years ago today. In response to "rapid technological developments", the European Commission [published a draft](https://web.archive.org/web/20121203024154/http://ec.europa.eu/justice/data-protection/document/review2012/com_2012_11_en.pdf) of its proposed General Data Protection Regulation (GDPR) to regulate the free movement of data. 

### June 2013: Edward Snowden leaks the largest cache of intelligence data in history
Edward Snowden leaked millions of secret US intelligence files detailing the huge extent of digital surveillance. This leak fundamentally changed the debate around personal privacy and data protection forever, and it's an important factor in much of what's happened since.

### October 2015: European court deems EU-US data protection agreement 'invalid'
Responding to a complaint from privacy campaigner Max Schrems, the European Court of Justice deemed the 'Safe Harbor Privacy Principles' allowing data portability between the EU and US invalid. Schrems used the Snowden revelations, arguing that data transferred by Facebook from Ireland to US servers was insufficiently protected due to the NSA's surveillance practices. [The ruling](https://iapp.org/resources/article/schrems-i/) became known as 'Schrems I'.

### May 24, 2016: The GDPR is approved by EU
The GDPR, short for General Data Protection Regulation, becomes EU law. It's the most comprehensive data protection legislation in the world. Among its many directives, it stipulates that the personal data of any EU citizen cannot be exported to another nation that lacks equivalent data protection laws or contractual protections.   

### July 12, 2016: The EU-US Privacy Shield is created
In response to Schrems I, the EU and US negotiate the EU-US Privacy Shield, a replacement for the previous 'Safe Harbor' rules. It's designed to allow US companies to receive data from the EU while adhering to EU privacy laws.

### January 25, 2017: President Donald Trump signs the "Enhanced Public Safety" executive order
The new executive order demands that government agencies ensure their privacy policies "exclude persons who are not United States citizens or lawful permanent residents" from the protections of the Privacy Act. President Joe Biden would later repeal the executive order in January, 2021.

### May 25, 2018: EU member states ratify the GDPR
Just over two years after it was first approved by the EU, all member states have passed the GDPR in their national parliaments and the GDPR is now in force. National data protection authorities become responsible for enforcing the law in their countries.

### July 16, 2020: European court rules the EU-US Privacy Shield invalid
Over two years after a new complaint filed by Max Schrems in Ireland, the Court of Justice of the European Union (CJEU) rules the Privacy Shield [doesn't provide adequate protection](https://gdprhub.eu/index.php?title=CJEU_-_C-311/18_-_Schrems_II) for EU citizens. Existing Standard Contractual Clauses (SCC) allowing data transfer to the US are deemed inadequate.

### August 17, 2020: Max Schrems files complaint with Austrian DPA
Schrems alleges an Austrian website and Google violated the GDPR when a data subject visited a website on health topics. The complaint details how personal data, including user identifiers, IP address and browser details, were exported from Austria to the US where it could be subject to local law enforcement requests for access.

### July 16, 2021: Amazon fined €746 million for GDPR breach
Amazon [is fined](https://www.wired.co.uk/article/amazon-gdpr-fine) €746 million for failing to follow rules regarding its use of targeted advertising and proper consent. It's the largest GDPR fine to date.

### January 13, 2022: Austrian authority rules Google Analytics violates GDPR
The Austrian data authority partially upholds the complaint, ruling that the Austrian website did violate the GDPR. Google, as a data processor, isn't deemed liable.

## What happens next?
Once you break down the chain of events, one thing becomes abundantly clear: a new Privacy Shield, such as that suggested by Google, would run into the same legal challenges that scuppered previous agreements. 

The only reliable solution is for the US to enact adequate legal protections for EU citizens, but this would be politically difficult. And, while an executive order could smooth the path to a quicker resolution, it would be subject to the whims of any incoming president who didn't like it. Hello, Donald Trump. 

This legal instability makes controlling your own data, in our view, critically important. Self-hosting in private clouds obviates the worry about where data is captured and then exported, and simplifies the processes for ensuring your business is GDPR or HIPAA compliant. The larger the business, the greater risk. Fines are punitive and expensive to litigate and the sunk cost risk of choosing the wrong solution will cost time and money.

> PostHog is an open source product analytics tool which enables teams to build better products faster without sharing their user data with third parties. [Try PostHog for free today](/signup) or [schedule a demo](/book-a-demo) to learn more.
