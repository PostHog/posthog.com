---
title: How-to access PostHog Cloud infra
sidebar: Handbook
showTitle: true
---

We've all been there. Something was just merged and now there is a bug that you are having a real hard time pinning down.
You hate to do it... but you need to get on a pod or instance to troubleshoot the issue further. _SHAME_

![Shame bell](https://media0.giphy.com/media/vX9WcCiWwUF7G/200.gif)

### Prerequisite

Make sure you've followed this [guide](https://github.com/PostHog/posthog-cloud-infra/tree/main/terraform/environments)
to get AWS access. !!! Please follow the whole document !!!

### Connect to a Kubernetes pod
After you got access to the EKS cluster and our internal network:

- `kubectl -n posthog get pods` (get names of pods, you'll want a "web" pod most likely)
- `kubectl -n posthog exec --stdin --tty <POD_NAME> -- /bin/bash` (get a shell to the running container)
- `kubectl -n posthog exec <POD_NAME> env` (run individual commands in a container)

Note: if you need a Django shell, just run the following after connecting:

```bash
python manage.py shell_plus
```

### Connect to an EC2 instance
Please follow [this guide](https://github.com/PostHog/posthog-cloud-infra/tree/main/terraform/environments#ssh-to-an-instance-via-aws-ssm) to connect via AWS Systems Manager Agent (SSM).
