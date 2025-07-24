---
title: Spike detection
---

Spike detection is a system that monitors customer usage patterns and sends email alerts when unusual usage spikes (both upward and downward) are detected. This helps customers avoid unexpected billing surprises, take action before reaching billing limits, and identify misconfigurations or system outages.

## How spike detection works

The spike detection system runs daily and analyzes usage patterns across all products (Product analytics, Session replay, Feature flags, etc., **except Data warehouse**) to identify unusual spikes in usage that might indicate:

- Implementation issues or bugs causing excessive event sending
- Unexpected traffic increases
- System outages leading to lower usage

### Detection algorithm

The system uses statistical analysis to detect usage spikes by establishing normal baselines from historical patterns and comparing current usage against them. It also accounts for expected variations, such as differences between weekday and weekend usage.

## Email notifications

### Who receives emails

Spike detection emails are sent **only to customers that don't have an account owner assigned to them**. This ensures that self-serve customers, who may not be actively monitoring their usage, receive proactive alerts, while enterprise customers with dedicated account managers avoid duplicate notifications, as their account teams may reach out directly.

### Email frequency and limits

To avoid notification fatigue the system consolidates all detected spikes across all products into a single daily email. If an email was sent in the past 7 days, no new spike detection email will be sent, even if new spikes are detected.

## Related systems

Spike detection complements other billing and usage monitoring features, such as **[billing limits](/docs/billing/limits-alerts)** and **usage dashboards**.