---
title: Virtual Private Cloud on AWS
sidebar: Docs
showTitle: true
---

_[Click here for an overview of what a PostHog Virtual Private Cloud is](/docs/deployment/vpc/vpc)_

To get started with a Virtual Private Cloud on AWS, you'll need to give us access keys to an IAM user with the right permissions.

## 1. Go to IAM in your AWS console
![AWS add user](../../../images/vpc-aws-add-user.png)

## 2. Create a new IAM user

It makes sense to make it `companyname-posthog`.

![AWS create user](../../../images/vpc-aws-create-user.png)


## 3. Create a new permissions group

This way you'll be able to scope down what we have access to heavily.

The permissions we need are:
- TODO

![AWS create group](../../../images/vpc-aws-create-group.png)

## 4. Go through the rest of the process until you get to the access key

Make sure you copy the Access key ID and Secret access key immediately. We'll take it from here!

![PostHog Add Webhook](../../../images/vpc-aws-access-key.png)