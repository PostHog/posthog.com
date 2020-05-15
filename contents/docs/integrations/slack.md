---
title: Slack
sidebar: Docs
showTitle: true
---

## 1. Create app
Go to https://api.slack.com/apps?new_app=1 and create a new app. Call it "PostHog" and connect it to the workspace of your choice.
Feel free to use [this image](https://user-images.githubusercontent.com/53387/78905411-3ad92a00-7a7e-11ea-82e2-ba53e44ec4e3.png) as the app's logo.

![image](https://user-images.githubusercontent.com/53387/78574619-86939580-782a-11ea-8617-caf1ffe2783a.png)

## 2. Create Webhook
Go to the "incoming webhooks" page and click on "add a new webhook". Select the channel that the notifications will be posted to:

![image](https://user-images.githubusercontent.com/53387/78574881-ec801d00-782a-11ea-9b87-8a40e49dd912.png)

## 3. Copy URL
Copy the webhook URL into the PostHog Setup page:

![image](https://user-images.githubusercontent.com/53387/78897149-065f7100-7a72-11ea-89f4-5dcf6f1e18c0.png)

## 4. Add to action

For each action that should be posted to Slack, select "Post to Slack when this action is triggered"

![image](https://user-images.githubusercontent.com/53387/78897251-2bec7a80-7a72-11ea-9dd5-ac40afe13606.png)

## 5. Rejoice for you did good!

![image](https://user-images.githubusercontent.com/53387/78906013-1a5d9f80-7a7f-11ea-94ec-0d609c346384.png)
