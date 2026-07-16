---
title: Linking Temporal.io as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: TemporalIO
---

The Temporal.io connector can link workflows and workflow history to PostHog.

To link Temporal.io:

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.

2. Click **+ New source** and then click **Link** next to Temporal.io.

3. We only allow TLS certificate connections to your temporal namespace, so you need to ensure your namespace has a [certificate](https://docs.temporal.io/cloud/certificates) set up. Once done, copy all the same TLS certificate values into PostHog.

4. On the next page, set up the schemas you want to sync and modify the method and frequency as needed. Once done, click **Import**.

Once the syncs are complete, you can start using Temporal.io data in PostHog.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

If your Temporal.io client certificate is expired, revoked, or no longer trusted by your namespace, syncs pause automatically and display an error message. Here are common TLS certificate errors and how to fix them:

- **UnknownCA** - Your client certificate isn't signed by a certificate authority the namespace trusts. This usually means the namespace's CA certificates were rotated. Update the source with a client certificate and key signed by the current CA.

- **CertificateExpired** - Your client certificate has expired. Update the source with a renewed client certificate and key.

- **CertificateRevoked** - Your client certificate has been revoked. Update the source with a new client certificate and key.

- **BadCertificate** / **CertificateUnknown** - Temporal rejected your client certificate. Update the source with a valid client certificate and key.

- **Invalid peer certificate** - The Temporal server's certificate could not be verified. Check that the host and port point at your Temporal namespace's gRPC endpoint.

To resolve these errors, go to the [sources tab](https://app.posthog.com/data-management/sources), find your Temporal.io source, and update the client certificate and key fields with valid credentials. See the [Temporal certificate docs](https://docs.temporal.io/cloud/certificates) for details on generating new certificates.
