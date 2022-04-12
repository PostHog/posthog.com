---
title: How the Redshift Import app works
showTitle: true
topics:
    - redshift-import
---

## What does the Redshift Import app do?
The Redshift Import app for PostHog enables you, predictably, to import data from a Redshift table into PostHog. Data appears in PostHog as a stream of events. 

## How do I install the Redshift Import app?

First, create and select a Redshift table to use. You will also need to create a new user with sufficient privileges to access data in your selected table. 

Next, create a new table to store events and execute `INSERT` queries. You can and should block PostHog from doing anything else on any other tables. Giving PostHog table creation permissions should be enough to ensure this:

```
CREATE USER posthog WITH PASSWORD '123456yZ';
GRANT CREATE ON DATABASE your_database TO posthog;
```

Next, visit the "Apps" page in your instance of PostHog and search for 'Redshift Import'. Select the app, press Install. Follow the on-screen steps to configure the app.

Finally, you must determine what transformation to apply to your Redshift data. This app receives data from your table and transforms it into a PostHog event. You can check the available transformations below. 

IMPORTANT: Make sure your Redshift table has a [sort key](https://docs.aws.amazon.com/redshift/latest/dg/t_Sorting_data.html) and use the sort key column in the "Order by column" field of the app config.

## What transformations are available?

This app receives data from your table and transforms it into a PostHog event. 

The default transformation looks for the following columns in your table: event, timestamp, distinct_id, and properties, and maps them to the equivalent PostHog event fields of the same name.

```
async function transform (row, _) {
    const { timestamp, distinct_id, event, properties } = row
    const eventToIngest = { 
        event, 
        properties: {
            timestamp, 
            distinct_id, 
            ...JSON.parse(properties), 
            source: 'redshift_import',
        }
    }
    return eventToIngest
}
```

Another available transformation is the JSON Map. This transformation asks the user for a JSON file containing a map between their columns and fields of a PostHog event. For example:

```
{
    "event_name": "event",
    "some_row": "timestamp",
    "some_other_row": "distinct_id"
}
```

A version of the code is below, with error handling and type definitions removed for the sake of brevity.

```
async function transform (row, { attachments }) {            
    let rowToEventMap = JSON.parse(attachments.rowToEventMap.contents.toString())

    const eventToIngest = {
        event: '',
        properties: {}
    }

    for (const [colName, colValue] of Object.entries(row)) {
        if (!rowToEventMap[colName]) {
            continue
        }
        if (rowToEventMap[colName] === 'event') {
            eventToIngest.event = colValue
        } else {
            eventToIngest.properties[rowToEventMap[colName]] = colValue
        }
    }

    return eventToIngest
}
```

## How can I contribute a transformation?

If none of the transformations listed above suits your use case, you're more than welcome to contribute your own transformation!

To do so, just add your transformation to the `transformations` object in the index.ts file of the repo and list it in the plugin.json choices list for the field `transformationName`.

A transformation entry looks like this:

```
'<transformation name here>': {
    author: '<your github username here>',
    transform: async (row, meta) => {
        /* 

        Fill in your transformation here and
        make sure to return an event according to 
        the TransformedPluginEvent interface:

        interface TransformedPluginEvent {
            event: string,
            properties?: PluginEvent['properties']
        }

        */
    }
}
```

Your GitHub username is important so that we only allow changes to transformations by the authors themselves.

## What if I have feedback on this app?

We love feature requests and feedback! Please [create an issue](https://github.com/PostHog/posthog/issues/new?assignees=&labels=enhancement%2C+feature&template=feature_request.md) to tell us what you think. 

## What if my question isn't answered above?

You can [join the PostHog Community Slack group](/slack) to ask more questions, or get advice on developing your own PostHog apps.