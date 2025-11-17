---
title: Data egress from self-hosted instances
sidebarTitle: Egress and compliance
sidebar: Docs
showTitle: true
---

## What data does PostHog collect from self-hosted instances?

In order to understand usage and build better products, PostHog instances routinely send usage reports to our servers. In addition, this data helps us troubleshoot when we provide support. These reports do not contain any raw person, event, or group data — ie no identifiable or unique information from your users, only anonymized, aggregated data. 

## What if I cannot allow data egress or need to run in an air gapped environment?

You can run the open-source version of PostHog in an air-gapped environment, though it does require internet access to use the installation script.

## What data is sent in the usage report?

The following is an example status report that would be sent from your instance to PostHog's servers.

```json
{
    "id": "01808211-23a9-0000-354b-a5da0697932b",
    "timestamp": "2022-05-02T00:00:02.293000+00:00",
    "event": "user instance status report",
    "distinct_id": "VY1tssVQViiUWdVY1tssVQViiUWdVY1tssVQViiUWd",
    "properties": {
        "$geoip_city_name": "London",
        "$geoip_continent_code": "EU",
        "$geoip_continent_name": "Europe",
        "$geoip_country_code": "GB",
        "$geoip_country_name": "United Kingdom",
        "$geoip_latitude": 51.5368,
        "$geoip_longitude": -0.6718,
        "$geoip_postal_code": "SL1",
        "$geoip_subdivision_1_code": "ENG",
        "$geoip_subdivision_1_name": "England",
        "$geoip_time_zone": "Europe/London",
        "$ip": "165.22.112.27",
        "$lib": "posthog-python",
        "$lib_version": "1.4.4",
        "$plugins_deferred": [
            "Hubspot (2788)"
        ],
        "$plugins_failed": [],
        "$plugins_succeeded": [
            "GeoIP (80)",
            "Clearbit Enhance User (2911)",
            "Property Flattener Plugin (93)",
            "First Time Event Tracker (7272)"
        ],
        "$set": {
            "$geoip_city_name": "London",
            "$geoip_country_name": "United Kingdom",
            "$geoip_country_code": "GB",
            "$geoip_continent_name": "Europe",
            "$geoip_continent_code": "EU",
            "$geoip_postal_code": "SL1",
            "$geoip_latitude": 51.5368,
            "$geoip_longitude": -0.6718,
            "$geoip_time_zone": "Europe/London",
            "$geoip_subdivision_1_code": "ENG",
            "$geoip_subdivision_1_name": "England"
        },
        "$set_once": {
            "$initial_geoip_city_name": "London",
            "$initial_geoip_country_name": "United Kingdom",
            "$initial_geoip_country_code": "GB",
            "$initial_geoip_continent_name": "Europe",
            "$initial_geoip_continent_code": "EU",
            "$initial_geoip_postal_code": "SL1",
            "$initial_geoip_latitude": 51.5368,
            "$initial_geoip_longitude": -0.6718,
            "$initial_geoip_time_zone": "Europe/London",
            "$initial_geoip_subdivision_1_code": "ENG",
            "$initial_geoip_subdivision_1_name": "England"
        },
        "clickhouse_version": "21.6.5",
        "deployment": "helm_do_ha",
        "helm": {
            "chart_version": "18.2.3",
            "cloud": "do",
            "deployment_type": "helm",
            "hostname": "playground.posthog.net",
            "ingress_type": "nginx",
            "kube_version": "v1.22.7",
            "operation": "upgrade",
            "release_name": "posthog",
            "release_revision": 9
        },
        "helm__chart_version": "18.2.3",
        "helm__cloud": "do",
        "helm__deployment_type": "helm",
        "helm__hostname": "playground.posthog.net",
        "helm__ingress_type": "nginx",
        "helm__kube_version": "v1.22.7",
        "helm__operation": "upgrade",
        "helm__release_name": "posthog",
        "helm__release_revision": 9,
        "instance_usage_summary": {
            "events_count_new_in_period": 0,
            "persons_count_new_in_period": 0,
            "persons_count_total": 52113,
            "events_count_total": 1627639,
            "dashboards_count": 10,
            "ff_count": 1,
            "using_groups": true
        },
        "instance_usage_summary__dashboards_count": 10,
        "instance_usage_summary__events_count_new_in_period": 0,
        "instance_usage_summary__events_count_total": 1627639,
        "instance_usage_summary__ff_count": 1,
        "instance_usage_summary__persons_count_new_in_period": 0,
        "instance_usage_summary__persons_count_total": 52113,
        "instance_usage_summary__using_groups": true,
        "is_first_event_in_session": true,
        "license_keys": [
            "BGQQQQQQQQQQQQQQQQQQQQQQQQQQqqqqq"
        ],
        "license_keys__0": "BGQQQQQQQQQQQQQQQQQQQQQQQQQQqqqqq",
        "period": {
            "start_inclusive": "2022-04-25T00:00:00+00:00",
            "end_inclusive": "2022-05-01T23:59:59.999999+00:00"
        },
        "period__end_inclusive": "2022-05-01T23:59:59.999999+00:00",
        "period__start_inclusive": "2022-04-25T00:00:00+00:00",
        "plugins_enabled": {
            "GeoIP": 37,
            "Avo": 1
        },
        "plugins_enabled__Avo": 1,
        "plugins_enabled__GeoIP": 37,
        "plugins_installed": {
            "GeoIP": 38,
            "job": 1,
            "both servers": 1,
            "onEvent": 1,
            "Avo": 2,
            "Avo New": 1,
            "THE CRASH": 1
        },
        "plugins_installed__Avo": 2,
        "plugins_installed__Avo New": 1,
        "plugins_installed__GeoIP": 38,
        "plugins_installed__THE CRASH": 1,
        "plugins_installed__both servers": 1,
        "plugins_installed__job": 1,
        "plugins_installed__onEvent": 1,
        "posthog_version": "1.35.0",
        "realm": "hosted-clickhouse",
        "scope": "user",
        "site_url": "https://playground.posthog.net",
        "table_sizes": {
            "posthog_event": 57344,
            "posthog_sessionrecordingevent": 49152
        },
        "table_sizes__posthog_event": 57344,
        "table_sizes__posthog_sessionrecordingevent": 49152,
        "teams": {
            "2": {
                "events_count_total": 1616800,
                "events_count_new_in_period": 0,
				"events_count_by_lib": {
                    "web": 370048,
                    "null": 1246752
                },
                "events_count_by_name": {
                    "$autocapture": 210240,
                    "$exception": 11935,
                    "$identify": 31362,
                    "Lead": 33,
                    "$pageleave": 16593,
                    "$pageview": 122770
                },
                "duplicate_distinct_ids": {
                    "prev_total_ids_with_duplicates": 0,
                    "prev_total_extra_distinct_id_rows": 0,
                    "new_total_ids_with_duplicates": 0,
                    "new_total_extra_distinct_id_rows": 0
                },
                "multiple_ids_per_person": {
                    "total_persons_with_more_than_2_ids": 0,
                    "max_distinct_ids_for_one_person": 0
                },
                "group_types_count": 3,
                "persons_count_total": 50350,
                "persons_count_new_in_period": 0,
                "dashboards_count": 1,
                "dashboards_template_count": 0,
                "dashboards_shared_count": 0,
                "dashboards_tagged_count": 0,
                "ff_count": 1,
                "ff_active_count": 1
            },
            "35": {
                "events_count_total": 0,
                "events_count_new_in_period": 0,
                "events_count_by_lib": {},
                "events_count_by_name": {},
                "duplicate_distinct_ids": {
                    "prev_total_ids_with_duplicates": 0,
                    "prev_total_extra_distinct_id_rows": 0,
                    "new_total_ids_with_duplicates": 0,
                    "new_total_extra_distinct_id_rows": 0
                },
                "multiple_ids_per_person": {
                    "total_persons_with_more_than_2_ids": 0,
                    "max_distinct_ids_for_one_person": 0
                },
                "group_types_count": 0,
                "persons_count_total": 0,
                "persons_count_new_in_period": 0,
                "dashboards_count": 1,
                "dashboards_template_count": 0,
                "dashboards_shared_count": 0,
                "dashboards_tagged_count": 0,
                "ff_count": 0,
                "ff_active_count": 0
            },
            "36": {
                "events_count_total": 10839,
                "events_count_new_in_period": 0,
                "events_count_by_lib": {},
                "events_count_by_name": {},
                "duplicate_distinct_ids": {
                    "prev_total_ids_with_duplicates": 0,
                    "prev_total_extra_distinct_id_rows": 0,
                    "new_total_ids_with_duplicates": 0,
                    "new_total_extra_distinct_id_rows": 0
                },
                "multiple_ids_per_person": {
                    "total_persons_with_more_than_2_ids": 0,
                    "max_distinct_ids_for_one_person": 0
                },
                "group_types_count": 0,
                "persons_count_total": 1763,
                "persons_count_new_in_period": 0,
                "dashboards_count": 3,
                "dashboards_template_count": 0,
                "dashboards_shared_count": 0,
                "dashboards_tagged_count": 0,
                "ff_count": 0,
                "ff_active_count": 0
            }
        },
        "teams__2__dashboards_count": 1,
        "teams__2__dashboards_shared_count": 0,
        "teams__2__dashboards_tagged_count": 0,
        "teams__2__dashboards_template_count": 0,
        "teams__2__duplicate_distinct_ids__new_total_extra_distinct_id_rows": 0,
        "teams__2__duplicate_distinct_ids__new_total_ids_with_duplicates": 0,
        "teams__2__duplicate_distinct_ids__prev_total_extra_distinct_id_rows": 0,
        "teams__2__duplicate_distinct_ids__prev_total_ids_with_duplicates": 0,
        "teams__2__events_count_by_lib": {},
        "teams__2__events_count_by_name": {},
        "teams__2__events_count_new_in_period": 0,
        "teams__2__events_count_total": 1616800,
        "teams__2__ff_active_count": 1,
        "teams__2__ff_count": 1,
        "teams__2__group_types_count": 3,
        "teams__2__multiple_ids_per_person__max_distinct_ids_for_one_person": 0,
        "teams__2__multiple_ids_per_person__total_persons_with_more_than_2_ids": 0,
        "teams__2__persons_count_new_in_period": 0,
        "teams__2__persons_count_total": 50350,
        "teams__35__dashboards_count": 1,
        "teams__35__dashboards_shared_count": 0,
        "teams__35__dashboards_tagged_count": 0,
        "teams__35__dashboards_template_count": 0,
        "teams__35__duplicate_distinct_ids__new_total_extra_distinct_id_rows": 0,
        "teams__35__duplicate_distinct_ids__new_total_ids_with_duplicates": 0,
        "teams__35__duplicate_distinct_ids__prev_total_extra_distinct_id_rows": 0,
        "teams__35__duplicate_distinct_ids__prev_total_ids_with_duplicates": 0,
        "teams__35__events_count_by_lib": {},
        "teams__35__events_count_by_name": {},
        "teams__35__events_count_new_in_period": 0,
        "teams__35__events_count_total": 0,
        "teams__35__ff_active_count": 0,
        "teams__35__ff_count": 0,
        "teams__35__group_types_count": 0,
        "teams__35__multiple_ids_per_person__max_distinct_ids_for_one_person": 0,
        "teams__35__multiple_ids_per_person__total_persons_with_more_than_2_ids": 0,
        "teams__35__persons_count_new_in_period": 0,
        "teams__35__persons_count_total": 0,
        "teams__36__dashboards_count": 3,
        "teams__36__dashboards_shared_count": 0,
        "teams__36__dashboards_tagged_count": 0,
        "teams__36__dashboards_template_count": 0,
        "teams__36__duplicate_distinct_ids__new_total_extra_distinct_id_rows": 0,
        "teams__36__duplicate_distinct_ids__new_total_ids_with_duplicates": 0,
        "teams__36__duplicate_distinct_ids__prev_total_extra_distinct_id_rows": 0,
        "teams__36__duplicate_distinct_ids__prev_total_ids_with_duplicates": 0,
        "teams__36__events_count_by_lib": {},
        "teams__36__events_count_by_name": {},
        "teams__36__events_count_new_in_period": 0,
        "teams__36__events_count_total": 10839,
        "teams__36__ff_active_count": 0,
        "teams__36__ff_count": 0,
        "teams__36__group_types_count": 0,
        "teams__36__multiple_ids_per_person__max_distinct_ids_for_one_person": 0,
        "teams__36__multiple_ids_per_person__total_persons_with_more_than_2_ids": 0,
        "teams__36__persons_count_new_in_period": 0,
        "teams__36__persons_count_total": 1763,
        "users_who_logged_in": []
    },
    "elements_chain": ""
}
```
