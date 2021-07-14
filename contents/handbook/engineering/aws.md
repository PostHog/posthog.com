---
title: AWS tips and faq
sidebar: Handbook
showTitle: true
---

### How do I get access?

Ask in slack in #team-deployments-and-infrastructure as someone needs to add you. Though note that anyone who has edit access can do it.

To give someone access: navigate to [IAM](https://console.aws.amazon.com/iamv2/home#/users) and use the Add Users button at the top right to add their posthog email as user name, pick "AWS Management Console access" and add them to the "Team" group, then slack them the sign-in URL, User name and password.


### Permissions errors using aws cli

If you see something like
```
<my-user> is not authorized to perform: <action> on resource: <resource> with an explicit deny
```

Note the "with an explicit deny" in the end which likely is due to the fact that we force MFA. Follow [this guide](https://aws.amazon.com/premiumsupport/knowledge-center/authenticate-mfa-cli/) to use a session token. TLDR:

1. look up your security credential MFA device name from AWS console from `https://console.aws.amazon.com/iam/home#/users/<user-name>?section=security_credentials`
1. run `aws sts get-session-token --serial-number <arn-of-the-mfa-device> --token-code <code-from-token> --duration 129600` where `code-from-token` is the same code you'd use to login to the AWS console (e.g. from Authy app).
1. 
```
export AWS_ACCESS_KEY_ID=example-access-key-as-in-previous-output
export AWS_SECRET_ACCESS_KEY=example-secret-access-key-as-in-previous-output
export AWS_SESSION_TOKEN=example-session-token-as-in-previous-output
```
1. Unset them when done (after they expire before running `get-session-token` again)
```
unset AWS_ACCESS_KEY_ID && unset AWS_SECRET_ACCESS_KEY && unset AWS_SESSION_TOKEN
```
