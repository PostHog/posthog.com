---
title: Linking Azure SQL Server as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
---

The Azure SQL Server connector can link your database tables to PostHog.

> This applies to any MS SQL Server, not just Azure hosted databases. We use Microsoft ODBC 18 to connect to your SQL server.

For Azure databases, we only use SQL authentication (and not Entra ID). You can find your connection details by [following the steps listed here](https://learn.microsoft.com/en-us/azure/azure-sql/database/connect-query-content-reference-guide?view=azuresql#get-adonet-connection-information-optional---sql-database-only).

The Azure database also needs to be publicly accessible (or use a SSH tunnel). You can follow [step 1 of this Microsoft guide](https://learn.microsoft.com/en-us/azure/azure-sql/database/azure-sql-python-quickstart?view=azuresql&tabs=windows%2Csql-auth#configure-the-database) to enable public access and allow our inbound IP addresses found at the bottom of this page.

To link Azure SQL Server:

1. Go to the [Data pipeline page](https://us.posthog.com/pipeline/sources) and the sources tab in PostHog
2. Click **New source** and select Azure SQL Server
3. Enter your database connection details:
    - **Host:** The hostname or IP your database server like `db.example.com` or `123.132.1.100`.
    - **Port:** The port your database server is listening to. The default is `1433`.
    - **Database:** The name of the database you want like `analytics_db`.
    - **User:** The username with the necessary permissions to access the database.
    - **Password:** The password for the user.
    - **Schema:** The schema for your database where your tables are located. The default is `dbo`.
4. Click **Link**

The data warehouse then starts syncing your Azure SQL Server data. You can see details and progress in the [sources tab](https://us.posthog.com/pipeline/sources).


#### Inbound IP addresses

We use a set of IP addresses to access your Azure SQL Server instance. To ensure this connector works, add these IPs to your inbound security rules to enable the data import:

| US | EU |
| --- | --- |
| 44.205.89.55  | 3.75.65.221 |
| 44.208.188.173 | 18.197.246.42 |
| 52.4.194.122 | 3.120.223.253 |