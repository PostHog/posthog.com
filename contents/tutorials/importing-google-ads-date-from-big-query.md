---
title: Importing Google Ads data to PostHog via Big Query
date: 2025-09-10
author:
 - ian-vanagas
tags:
 - data warehouse
---

By integrating Google Ads with PostHog, you can analyze ad performance alongside user behavior data, helping you optimize campaigns effectively.

While PostHog has a native Google Ads integration, you may prefer to import ads data that's stored in BigQuery.

This tutorial covers:

1. How to set up Google Ads Data in BigQuery  
2. How to add BigQuery as a Source pipeline in PostHog

We'll cover every step clearly, including how to handle setup without Google Cloud admin access.

## **What You Need**

### **For Setting up Ads Data in BigQuery**

* Google Ads account with campaign data  
* Google Cloud Platform access (we'll cover admin vs non-admin scenarios)

### **For Adding BigQuery as a Source in PostHog**

* A Google Cloud Service Account with correct permissions   
* Google Cloud JSON Key file for that account's Dataset ID  
* (Optional) A Dataset ID for temporary tables

# **How to Set Up Google Ads Data in BigQuery**

## **Scenario A: You Have Admin Access to Google Cloud**

### **Step 1: Create or Select Google Cloud Project**

1. Go to [console.cloud.google.com](https://console.cloud.google.com/)  
2. **If you need a new project:**  
   * Click the project dropdown at the top  
   * Click **New Project**  
   * Project name: `posthog-ads-data` (or similar)  
   * Click **Create**  
3. **If using existing project:**  
   * Select your project from the dropdown

### **Step 2: Enable Required APIs**

1. In Google Cloud Console, under the quick access menu, go to **APIs & services** \> **Library**  
2. Search for "BigQuery API"  
3. Click **BigQuery API** result  
4. Click "ENABLE" button  
5. Make sure you see “API Enabled” message with green tick

![bigquery api](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/1_bigquery_api_90bc90382e.png)

6. Click ← Go Back or use browser back button  
7. Search "Google Ads API"  
8. Click **Google Ads API** result  
9. Click **Enable** button  
10. Ensure you see the “API Enabled” message with green tick  

![google-ads-api](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/2_google_ads_api_33bef419da.png)

### **Step 3: Create BigQuery Dataset**

1. From Google Cloud Console homepage, go to **BigQuery** from the Quick Access Menu  
2. In BigQuery interface, find your project name in left sidebar

![dataset-1](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/3_bigquery_dataset_134091ffa4.png)

3. Click three dots (⋮) next to your project name  
4. Select **Create dataset**  
5. A side menu will open from the right side

![image 4](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/4_big_query_data_set_ff7a6823d3.png)

6. **Dataset ID:** `google_ads_data`  
7. **Data location:** Choose your region (US, EU, etc.)  
8. Leave other settings as default  
9. Click **Create dataset**

### **Step 4: Set Up Data Transfer**

1. In BigQuery left menu, click **Data transfers**  

![image 5](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/5_pipelines_45478ae2fa.png)  

2. The Data Transfers page will open. In there, click the **Create Transfer** button  
3. **Source:** Select **Google Ads** from dropdown  
4. The Google Ads Transfer configuration menu will open with multiple configuration steps. We’ll cover all these steps from Step 5-10**.**

![image 6](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/6_data_source_c8825dd32f.png)

### **Step 5: Configure Data Source Details**

Once you select Google Ads, you'll see the Data source details section:

1. **Customer ID field:**  
   * Go to your [Google Ads dashboard](http://ads.google.com)  
   * Look at top-right corner for number like `123-456-7890`  
   * Copy ONLY the numbers: `1234567890`  
   * Paste into Customer ID field (no dashes)  
2. **Report type:** Leave "Standard" selected (default)  
3. **Exclude removed/disabled items:** Leave unchecked (default)  
4. **Table Filter:** Leave empty (imports all available tables)  
5. **Conversion Date:** Leave empty (default)  
6. **Include Tables new to Google Ads:** Leave unchecked (default)  
7. **Include PMax Campaign Tables:** Leave unchecked (default)  
8. **Refresh window:** Leave as 30 (keeps 30 days of historical data)  
9. Click **Continue** button

### **Step 6: Set Transfer Config Name**

1. **Display name:** Enter `Google Ads Daily Import`  
2. You'll see "Display name is required" message until you enter a name  
3. Click **Continue** button

### **Step 7: Configure Schedule Options**

1. **Repeat frequency:** Select "hours" from dropdown (should show "24 hours" by default)  
2. **Start option:** Select "Start now" (recommended) OR "Start at set time"  
3. If you select "Start at set time":  
   * Set date to today or tomorrow  
   * Set time to 2:00 AM or preferred time  
   * Time zone should show your local timezone  
4. You'll see confirmation: "Scheduled to run every 24 hours starting now"  
5. Click **Continue** button

### **Step 8: Configure Service Account**

1. **Service account:** Leave dropdown as "Service account" (default)  
2. Click **Continue** button

**Note:** We will configure the Service Account in detail further along in the tutorial.

### **Step 9: Set Notification Options**

1. **Email notifications:** Toggle ON if you want email alerts for failures  
2. **Pub/Sub notifications:** Leave OFF (default)  
3. Click **Continue** button

### **Step 10: Complete Setup**

1. Review all settings on final screen  
2. Click **SAVE** button  
3. You'll see "Transfer created successfully" message  
4. First data import will start immediately if you selected "Start now"

If you encountered any problems during this setup, see the Common Issues and Fixes section.

## **Scenario B: You DON'T Have Admin Access to Google Cloud**

### **Step 1: Request Admin to Create Project Setup**

You need to request your Google Cloud admin to do the following:

1. Create a New project named "posthog-ads-data" (or add to existing project)  
2. Enable these APIs:  
   *    BigQuery API  
   *    Google Ads API  
3. Create BigQuery dataset called "google\_ads\_data"  
4. Give you the following permissions on the project on your Google Console account:  
   * BigQuery Data Transfer Admin  
   * BigQuery Data Editor  
   * Project Viewer

### **Step 2: Wait for Admin Setup**

Your admin needs to:

1. Create/select the project  
2. Enable the APIs listed above  
3. Create the BigQuery dataset  
4. Add your email with the specified permissions

### **Step 3: Verify Your Access**

Once admin confirms setup:

1. Go to [console.cloud.google.com](https://console.cloud.google.com/)  
2. Select the project (should appear in dropdown)  
3. Go to **BigQuery** and verify you see the `google_ads_data` dataset  
4. Go to **Data transfers** and verify you can click the **Create Transfer** button

If you can't access these, ask the admin to double-check your permissions.

### **Step 4: Set Up Data Transfer (Same as Admin Steps 4-10)**

Follow Steps 4-10 from Scenario A above \- the process is identical once you have the right permissions.

## **Verification Steps (Both Scenarios)**

### **Check Transfer Status**

1. In BigQuery, go to **Data transfers**  
2. Find your **Google Ads Daily Import** transfer  
3. Status should show "Succeeded" after first run  
4. If "Failed," click on it to see error details

### **Verify Data Import (After 24 Hours)**

1. In BigQuery, expand your project \> `google_ads_data` dataset  
2. Look for tables ending with your Customer ID:  
   * `CampaignStats_12...`  
   * `AdGroupStats_12...`  
   * `KeywordStats_12...`  
3. Click on any table \> **Preview** tab  
4. You should see data rows with dates, campaign names, impressions, clicks, etc.

Once finished setting up Google Ads with BigQuery, you can move on to adding BigQuery as a source pipeline in PostHog.

# **How to add BigQuery as a Source pipeline in PostHog**

## **Create a Service Account**

You need a service account to add your BigQuery project as a pipeline in PostHog. Here’s how you can generate a service account from Google Cloud Console:

1. Go to the Google Cloud Console  
2. Go to **IAM & Admin** \> **Service Accounts**  
3. Click **Create Service Account**  
4. Provide a descriptive name (e.g., bigquery-posthog-service-account) and a brief description  
5. To keep it simple, you can assign the **BigQuery Data Editor** and **BigQuery Job User** roles if it meets your security requirements. Alternatively, create a custom role that includes only these permissions:  
   * bigquery.readsessions.create  
   * bigquery.readsessions.getData  
   * bigquery.datasets.get  
   * bigquery.jobs.create  
   * bigquery.tables.get  
   * bigquery.tables.list  
   * bigquery.tables.getData  
   * bigquery.tables.create  
   * bigquery.tables.updateData  
   * bigquery.tables.delete  
6. Once the service account is created, click on it and select the Keys tab  
7. Click Add Key \> Create new key, choose JSON, and download the key file

## **Add BigQuery as a Source Pipeline**

1. In PostHog, go to **Data pipelines** \> **Sources**  
2. Click **New source** and **select BigQuery**  
3. Drag and drop the Google Cloud JSON Key file to upload  
4. Enter the Dataset ID you want to import. In our case, it would be `google_ads_data`  
5. (Optional) If you're limiting permissions to the service account provided, enter a Dataset ID for temporary tables  
6. (Optional) Add a prefix for the table name  
7. Click **Next**  
8. You will see all the tables that exist in your BigQuery project. Select the ones you require, their update frequency, and their replication method  
9. Click **Finish**. You will now be able to use these tables in your PostHog project

## **Important Notes**

### **Data Timing**

* Google Ads data appears 1-2 days after actual date  
* First transfer may take 24-48 hours to complete  
* Daily transfers typically run between 2-6 AM

### **Costs**

* BigQuery storage: \~$0.02 per GB per month (very low for Ads data)  
* Query costs: First 1TB per month is free  
* Data Transfer service: Free for Google Ads

### **Data Retention**

* Data stays in BigQuery until you delete it  
* Recommended: Keep at least 13 months for year-over-year analysis

## **Common Issues and Fixes**

### **Issue: "Unable to save transfer configuration \- Billing is disabled"**

**This is the most common error when setting up transfers.**

**What this means:** Google Cloud billing must be enabled to use Data Transfer Service, even though Google Ads transfers are free.

**Fix for Admin Users:**

1. Go to **Google Cloud Console** \> **Billing**  
2. Click **Link a billing account**  
3. Add a credit card (you won't be charged for Google Ads transfers)  
4. Enable billing for your project  
5. Wait 5-10 minutes, then try saving transfer again

**Fix for Non-Admin Users:** 

Ask your Admin to do the following:

1. Go to **Google Cloud Console** \> **Billing**  
2. Link a billing account to your project  
3. Add payment method (credit card)

Also, let them know this: Google Ads data transfers are FREE. You won't be charged for this specific service, but Google requires billing to be enabled.

### **Issue: "Permission denied" when creating transfer**

**Fix:** You need a "BigQuery Data Transfer Admin" role. Ask your admin to add this role to your account

### **Issue: No Google Ads data appearing**

**Possible causes:**

* Wrong Customer ID (check for dashes or spaces)  
* Google Ads account has no recent data  
* Authentication expired

**Fix steps:**

1. Go to **Data transfers** \> **click your transfer name**  
2. Check **Customer ID** matches exactly (no dashes)  
3. Click **Edit** \> re-authorize Google Ads connection  
4. Save and wait 24 hours

### **Issue: Transfer shows "Failed" status**

**Fix:**

1. Click on the failed transfer  
2. Look at error message  
3. Common fixes:  
   * **"Invalid customer ID":** Re-enter Customer ID without dashes  
   * **"Authentication failed":** Re-authorize Google Ads connection  
   * **"Insufficient permissions":** Ask admin for BigQuery Data Transfer Admin role

### **Issue: Only some tables created**

This is normal. Google Ads only creates tables for data that exists in your account. If you don't have keyword data, you won't get a Keywords table.