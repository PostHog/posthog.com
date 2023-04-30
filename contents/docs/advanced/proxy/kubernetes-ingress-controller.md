---
title: Using Kubernetes Ingress Controller to proxy PostHog Cloud
sidebar: Docs
showTitle: true
---

If your team is already using Kubernetes, you may prefer to use Kubernetes resources to setup a proxy to PostHog Cloud rather than deploying a new tool. This method requires one ingress resource for the proxy and one service resource to direct traffic externally to PostHog Cloud.

Different Ingress controllers support different annotations for configuration. The example below uses ingress-nginx.

```yaml
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: posthog-proxy
  annotations:
    kubernetes.io/ingress.class: nginx
    nginx.ingress.kubernetes.io/upstream-vhost: app.posthog.com # Change to eu.posthog.com if needed.
    nginx.ingress.kubernetes.io/backend-protocol: https
    # Why configuration-snippet: https://github.com/kubernetes/ingress-nginx/issues/6728
    # Change to eu.posthog.com if needed.
    nginx.ingress.kubernetes.io/configuration-snippet: |
      proxy_ssl_name "app.posthog.com";
      proxy_ssl_server_name "on";
spec:
  tls:
  - hosts:
    - example.com # Change to the host you will proxy posthog traffic through.
    secretName: example-tls # Change to the secret containing your certificate.
  rules:
  - http:
      paths:
      - pathType: Prefix
        path: /
        backend:
          service:
            name: posthog-proxy
            port:
              name: https
---
apiVersion: v1
kind: Service
metadata:
  name: posthog-proxy
spec:
  type: ExternalName
  externalName: app.posthog.com # Change to eu.posthog.com if needed.
  ports:
  - name: https
    protocol: TCP
    port: 443
```
