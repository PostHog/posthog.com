---
title: Azure Blob Storage destination for batch exports
sidebar: Docs
showTitle: true
availability:
    free: full
    selfServe: full
    enterprise: full
---

import { CalloutBox } from 'components/Docs/CalloutBox'
import InboundIpAddresses from '../_snippets/inbound-ip-addresses.mdx'

With batch exports, data can be exported to Azure Blob Storage.

<CalloutBox icon="IconInfo" title="Azure Blob Storage destination is in beta" type="fyi">

The Azure Blob Storage destination is currently in `beta`. This means the configuration and features are subject to change.

</CalloutBox>

## Setting up Azure Blob Storage access

To set up a batch export to Azure Blob Storage, you'll need:

1. **An Azure Storage account** with a blob storage container where PostHog can export data.
2. **A connection string** to authenticate PostHog with your Azure Storage account.

### Getting your connection string

To retrieve your connection string from the Azure Portal:

1. Navigate to your Storage account.
2. Go to **Security + networking** > **Access keys**.
3. Copy the connection string from either the primary or secondary key.

<InboundIpAddresses />

If your Azure Storage account has firewall rules enabled, you'll need to add these IP addresses to your allowlist. For more information on configuring Azure Storage firewall rules, see the [Azure Storage network security documentation](https://learn.microsoft.com/en-us/azure/storage/common/storage-network-security).

## Models

Azure Blob Storage supports all the models mentioned in the [batch export models reference](/docs/cdp/batch-exports#models).

You can view the schema for each model inside the batch export configuration in the UI.

> **Note:** New fields may be added to these models over time. Therefore, it is recommended that any downstream processes are able to handle additional fields being added to the exported files.

## Creating the batch export

1. Click [Data management > Destinations](https://app.posthog.com/data-management/destinations) in the left sidebar.
2. Click **+ New destination** in the top-right corner.
3. Search for **Azure Blob Storage**.
4. Click the **+ Create** button.
5. Fill in the necessary [configuration details](#azure-blob-storage-configuration).
6. Finalize the creation by clicking on "Create".
7. Done! The batch export will schedule its first run on the start of the next period.

## Azure Blob Storage configuration

Configuring a batch export targeting Azure Blob Storage requires the following Azure-specific configuration values:

* **Azure connection:** Select or configure your Azure Blob Storage connection using your connection string.
* **Container name:** The name of the Azure Blob Storage container where the data is to be exported. The container must already exist and follow Azure's naming rules.
* **Blob prefix (optional):** A prefix to use for each blob created. This prefix can include [template variables](#blob-prefix-template-variables) to organize your data.
* **Format:** Select a file format to use in the export. See the [file formats section](#file-formats) for details on which file formats are supported.
* **Max file size (MiB) (optional):** If the size of the exported data exceeds this value, the data is split into multiple files. (Note that this is approximate and the actual file size may be slightly larger). If this value is not set, or is set to 0, the data is exported as a single file.
* **Compression:** Select a compression method (like gzip, brotli, or zstd) to use for exported files or no compression. See the [compression section](#compression) for details on which compression methods are supported.
* **Events to exclude:** A list of events to omit from the exported data.

### Blob prefix template variables

The blob prefix provided for data exporting can include template variables which are formatted at runtime. All template variables are defined between curly brackets (for example `{day}`). This allows you to partition files in your Azure Blob Storage container, such as by date.

Template variables include:

* Date and time variables:
  * `year`
  * `month`
  * `day`
  * `hour`
  * `minute`
  * `second`
* Name of the table exported (for example, 'events' or 'persons')
  * `table`
* Batch export data bounds:
  * `data_interval_start`
  * `data_interval_end`

So, as an example, setting `{year}-{month}-{day}_{table}/` as a blob prefix, will produce files prefixed with keys like `2023-07-28_events/`.

### File formats

PostHog Azure Blob Storage batch exports support two file formats for exporting data:

* [JSON lines](https://jsonlines.org/)
* [Apache Parquet](https://parquet.apache.org/) (latest version of the format specification is the only one supported)

The batch export format is selected via a drop down menu when creating or editing an export.

### Compression

Each file format supports a variety of compression methods. The compression method you choose can have a significant effect on the exported file size and the overall time taken to export the data. From our own internal testing, we would recommend using Parquet with zstd compression for the best combination of speed and file size.

The following compression methods are supported:

* **Parquet:** zstd, gzip, brotli, lz4, snappy
* **JSONLines:** gzip, brotli

> **Note on Parquet compression:** The compression type is included in the file extension, even for Parquet files. For example, files compressed with zstd will have the extension `.parquet.zst`, lz4 will be `.parquet.lz4`, and snappy will be `.parquet.sz`. Since compression is embedded in the format itself, the file should be read directly as a Parquet file and not uncompressed first.

### Manifest file

If you specify a max file size in your configuration, several files may be exported. In order to know when the export is complete, we send a `manifest.json` file (with the same prefix as the other files) once all the data files have been exported. This manifest file contains the key names of all the files exported.
