---
title: Linking Snowflake as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
---

The data warehouse can link to data in Snowflake. 

Start by going to the [Data pipeline page](https://us.posthog.com/pipeline/sources) and the sources tab and clicking **New source**. Choose Snowflake and enter the following data:

- **Account identifier**: Likely a combination of your organization and the name of the account (e.g. `myorg-account123`). You can find this in the sidebar account selector or by executing the `CURRENT_ACCOUNT_NAME` and `CURRENT_ORGANIZATION_NAME` functions in SQL.
- **Database**: Like `tasty_bytes_sample_data`
- **Warehouse**: Like `compute_wh`
- **User**: Your username like `IANVPH`
- **Password**: The password for your user
- **Role (optional)**: The role with necessary privelges to access your context like `accountadmin`.
- **Schema**: The schema for your database like `RAW_POS`. If it isn't working, trying using all caps.
- **Table Prefix:** The optional prefix for your tables in PostHog. For example, if your table name ended up being `menu`, a prefix of `snow_prod_` would create a table in PostHog called `snow_prod_menu`.

<ProductScreenshot
  imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2024_07_23_at_13_50_56_2x_c31bfa6237.png" 
  imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2024_07_23_at_13_50_42_2x_aa20de1109.png"
  alt="Snowflake details" 
  classes="rounded"
/>

Once added, click **Next**, select the tables you want to sync, as well as the [sync method](/docs/data-warehouse/setup#incremental-vs-full-table), and then press **Import**.

Once done, you can now [query](/docs/data-warehouse/query) your new table using the table name.

<ProductScreenshot
  imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2024_07_23_at_13_56_32_2x_9c0bc2d35f.png" 
  imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2024_07_23_at_13_56_53_2x_76a2b7f711.png"
  alt="Snowflake details" 
  classes="rounded"
/>