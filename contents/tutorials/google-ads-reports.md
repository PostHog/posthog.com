---
title: How to set up Google Ads reports
date: 2024-07-19
author:
 - ian-vanagas
tags:
 - data warehouse
---

Understanding your ad spend and return on that spend is core to creating successful marketing campaigns. Two important sources of data for this are Google Ads and PostHog. With our [data warehouse](/docs/data-warehouse), you can link and analyze them together.

In this tutorial, we get data from Google Ads, sync it into PostHog through S3, and use it to create insights like cost per click, cost per conversion, and more. 

## Exporting data from Google Ads

To get the data we want from [Google Ads](https://ads.google.com/aw/campaigns):

1. Go to the **Campaigns** section in the **Campaigns** tab under **Ad groups**. 
2. Modify the columns and dates to get the data you want. 
3. When ready, click **Download** then **More options** and unselect **Title and date range** as well as **Totals**. 
4. Once done, choose **Google Sheets** and click **Download**.

![Google Ads report](https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2024_07_19_at_08_55_41_1adc4a051d.png)

Once downloaded, open your sheet and make the following edits:

- Replace `--` values with empty.
- Replace `,` values with `;` or `_` (or another value that works for you).
- Remove the spaces, periods, and slashes from the title columns. You can do this by creating a row with formula `=LOWER(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(A1, " ", "*"), "/", "*"), ".", ""))`, dragging across the row to create a new title row, and replacing the old one.
- Remove duplicate columns like `currency_code`.

![Google Ads csv](https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2024_07_19_at_08_56_08_e4a83a61c9.png)

Once done, download it as a `.csv` file for upload to S3.

## Uploading data to S3

We don't have Google Ads as a native source (yet). This means you must upload the Google Ads report to blob storage like GCS, R2, or the option we are using, S3, and then link that to PostHog.

To do this with S3, start by logging into the [AWS Console](https://console.aws.amazon.com/console/home) and going to S3. Here, create a new bucket and save the name and region. We suggest `us-east-1` if you're using US Cloud and `eu-central-1` if you're using EU Cloud.

Next, go into your bucket and click **Upload**. Choose your Google Ad report and click **Upload**. Your data is now stored in S3. 

![Google Ads s3](https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2024_07_19_at_09_00_53_2x_403c94d7db.png)

## Creating a user to access S3 data

After creating the bucket and uploading data, we must set up access. To do this:

1. Open [IAM](https://console.aws.amazon.com/iam/home) and create a new policy to enable access to this bucket.
2. On the left under **Access management**, select **Policies**, and click **Create policy**.
3. Under the service, choose **S3**.
4. Under **Actions**, select:
    1. Under **List**, select **ListBucket** and **ListBucketMultipartUploads**
    2. Under **Read**, select **GetBucketLocation** and **GetObject**
    3. Under **Write**, select **AbortMultipartUpload** and **PutObject**
    4. Under **Permission Management**, select **PutObjectAcl**
5. Under **Resources**, select **Specific**, and click **object** → **Add ARN**.
6. Specify your bucket name and toggle **Any object name**. In the example below, replace `ian-google-ads-reports` with the bucket name you chose in the previous section.

![S3 permissions](https://res.cloudinary.com/dmukukwp6/image/upload/arn_2b56df042f.png)

1. Click **Next,** give your policy a name, and click **Create policy**.

With your new policy, you can create a user and give them access to the bucket by attaching the policy.

1. Open [IAM](https://console.aws.amazon.com/iam/home) and navigate to **Users** on the left.
2. Click **Create user**, specify a user name, and click **Next**.
3. Select **Attach policies.**
4. Search and select the policy you created then click **Next** and then **Create user**.
5. Click the newly created user and click **Create access key**.
6. Choose **third-party service** and give your key a name.
7. Copy your access key and secret access key (they won't be shown again).

## Linking S3 to PostHog

With your access keys, you can go to the data warehouse tab in PostHog and click **Link source**. Under self managed, click **Link** next to S3. Add a table name, your S3 URL (like `https://ian-google-ads-reports.s3.us-west-2.amazonaws.com/ads_report.csv`), **CSV with headers** for file format, your access key and secret, and click **Next**.

<ProductScreenshot
  imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2024_07_19_at_09_03_09_0165123c88.png"
  imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2024_07_19_at_09_03_23_5d31a2dbc8.png"
  alt="Google Ads S3"
  classes="rounded"
/>

Once the sync is complete, you can query your data in PostHog.

## **Creating insights for your Google Ads report**

Now that your Google Ads data is synced into PostHog, you can use it to create insights for your report. Each of these requires you to create a [new insight in the product analytics tab](https://us.posthog.com/project/insights/new).

### Campaign overview

The Google Ads data contains a bunch of columns that might not be relevant. To get an overview of the data, we can filter for campaigns where we spent money and get the columns that say something. 

To do this, create a new SQL insight with the following query:

```sql
select 
    campaign, impr, clicks, interactions, budget, cost 
from ads_report 
where cost > 0
order by cost desc
```

<ProductScreenshot
  imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2024_07_19_at_11_08_34_2x_915d74c321.png"
  imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2024_07_19_at_11_08_10_2x_ed94d794a1.png"
  alt="Google Ads Campaign Overview"
  classes="rounded"
/>

### Cost per session

> **Note:** The next insights all rely on being able to tie the `utm_campaign` value to the campaign name in Google Ads. To make sure this works, we recommend changing the name of the campaign to match the `utm_campaign`.

The power of connecting your Google Ads data comes from combining it with your PostHog data.  We can join PostHog's `$entry_utm_campaign` value from the `sessions` table with our Google Ads table `campaign` value to get a cost per session like this:

```sql
SELECT 
    ar.campaign as campaign,
    ar.cost AS total_cost,
    COUNT(DISTINCT session_id) as session_count,
    total_cost / session_count AS cost_per_session
FROM 
    sessions s
LEFT JOIN 
    ads_report ar on s.$entry_utm_campaign = ar.campaign
WHERE $start_timestamp >= now() - INTERVAL 7 day
GROUP BY campaign, total_cost
```

You might need to modify the `INTERVAL` depending on the date range of your Google Ads data. 

### Cost per signup

We can go further by looking at the cost per conversion. In our case, the conversion we care about is a signup. 

To get this value in PostHog, we can look for newly created people with an email (representing that they have signed up). We then join the `persons` table to the Google Ads report using the `$initial_utm_campaign` person property.

```sql
SELECT 
    ar.campaign as campaign,
    ar.cost AS total_cost,
    COUNT(DISTINCT p.properties.email) as user_count,
    total_cost / user_count AS cost_per_user
FROM 
    ads_report ar
LEFT JOIN 
    persons p ON ar.campaign = p.properties.$initial_utm_campaign
WHERE 
    p.properties.email != ''
    AND p.created_at >= now() - INTERVAL 7 day
GROUP BY 
    ar.campaign, ar.cost
ORDER BY 
    cost_per_user ASC
```

Another way to do this is to join the `sessions` and `events` table using `session_id` and then . This also enables more flexibility on what events you can count as a conversion.

### Cost per click

Google Ads provides a `click` value, but what we care about more is clicks on our site. To compare this to cost, we can:

1. Create an action representing the clicks we care about. In our case, this is clicking **Get started - free** on our home or product pages.
2. Join the `ads_report` to the `sessions` table using the `campaign`.
3. Join the `sessions` table to the `events` table using the `session_id`.
4. Querying for the `campaign`, `total_cost`, `click_count`, and `cost_per_click`.

Altogether, this looks like this:

```sql
SELECT
    ar.campaign as campaign,
    ar.cost AS total_cost,
    COUNT(DISTINCT events.$session_id) as click_count,
    total_cost / click_count as cost_per_click
FROM 
    events
LEFT JOIN 
    sessions s ON s.session_id = events.$session_id
LEFT JOIN
    ads_report ar ON ar.campaign = s.$entry_utm_campaign
WHERE 
    s.$start_timestamp >= now() - INTERVAL 7 day
    AND matchesAction('Clicked "Get started - free"')
GROUP BY 
    ar.campaign, ar.cost
ORDER BY 
    cost_per_click ASC
```

### Click conversion rate

Something we can use the Google Ads `click` value for is calculating conversion. This is similar to the last query, but replacing `cost` with `click` and then making the percentage a nice number

```sql
SELECT
    ar.campaign as campaign,
    ar.clicks AS ad_clicks,
    COUNT(DISTINCT events.$session_id) as click_count,
    round(click_count / ad_clicks * 100, 2) as click_conversion
FROM 
    events
LEFT JOIN 
    sessions s ON s.session_id = events.$session_id
LEFT JOIN
    ads_report ar ON ar.campaign = s.$entry_utm_campaign
WHERE 
    s.$start_timestamp >= now() - INTERVAL 7 day
    AND matchesAction('Clicked "Get started - free"')
GROUP BY 
    ar.campaign, ad_clicks
ORDER BY 
    click_conversion DESC
```

## Further reading

- [How to track performance marketing in PostHog](/tutorials/performance-marketing)
- [How (and why) our marketing team uses PostHog](/blog/posthog-marketing)
- [An intro to PostHog for Google Analytics users](/blog/google-analytics-to-posthog)

<NewsletterForm />