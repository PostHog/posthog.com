/**
 * Centralized logo URLs for platform icons used across docs.
 *
 * To add a new logo:
 * 1. Upload the image to Cloudinary as an SVG (only PNG IF there is no other option)
 * 2. Add a key here using camelCase (alphabetically)
 * 3. Reference using `platformLogo: keyName` in MDX frontmatter, keyName being the name from list this
 */

export const LOGOS = {
    android: 'https://res.cloudinary.com/dmukukwp6/image/upload/Android_robot_bec2fb7318.svg',
    angular:
        'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/docs/integrate/frameworks/angular.svg',
    astro: 'https://res.cloudinary.com/dmukukwp6/image/upload/astro_icon_dark_23a13977ad.svg',
    attio: 'https://res.cloudinary.com/dmukukwp6/image/upload/pasted_image_2026_02_02_T13_32_15_602_Z_3d36e826ca.png',
    azureBlob: 'https://res.cloudinary.com/dmukukwp6/image/upload/azure_blob_storage_a5110351f6.svg',
    azureSql: 'https://res.cloudinary.com/dmukukwp6/image/upload/sql_database_generic_8f6b358019.svg',
    bigquery: 'https://res.cloudinary.com/dmukukwp6/image/upload/bigquery_8546771248.svg',
    bingAds: 'https://res.cloudinary.com/dmukukwp6/image/upload/Bing_Ads_ce5e8e208f.svg',
    bubble: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/docs/integrate/frameworks/bubble.svg',
    caddy: 'https://res.cloudinary.com/dmukukwp6/image/upload/caddy_c78a5a013f.svg',
    capacitor: 'https://res.cloudinary.com/dmukukwp6/image/upload/capacitor_e75d2fdcd8.svg',
    chargebee: 'https://res.cloudinary.com/dmukukwp6/image/upload/cb_597858b354.svg',
    clerk: 'https://res.cloudinary.com/dmukukwp6/image/upload/pasted_image_2026_02_02_T12_36_01_806_Z_30c81aea20.png',
    cloudflare: 'https://res.cloudinary.com/dmukukwp6/image/upload/cloudflare_icon_ef34353f85.svg',
    cloudflareR2: 'https://res.cloudinary.com/dmukukwp6/image/upload/r2_0d79d88d1f.svg',
    cloudfront: 'https://res.cloudinary.com/dmukukwp6/image/upload/Cloud_Front_76c0f62ab5.svg',
    django: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/docs/integrate/frameworks/django.svg',
    docusaurus:
        'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/docs/integrate/frameworks/docusaurus.svg',
    doit: 'https://res.cloudinary.com/dmukukwp6/image/upload/do_it_08203bf3a4.svg',
    dotnet: 'https://res.cloudinary.com/dmukukwp6/image/upload/dotnet_logo_7e446176f2.svg',
    elixir: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/docs/integrate/elixir.svg',
    flask: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/docs/integrate/frameworks/flask.svg',
    flutter: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/docs/integrate/flutter.svg',
    framer: 'https://res.cloudinary.com/dmukukwp6/image/upload/framer_logo_icon_169149_d72b90e48e.svg',
    gatsby: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/docs/integrate/frameworks/gatsby.svg',
    github: 'https://res.cloudinary.com/dmukukwp6/image/upload/github_mark_903e35d471.svg',
    go: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/docs/integrate/go.svg',
    googleAds: 'https://res.cloudinary.com/dmukukwp6/image/upload/Google_Ads_logo_b59e784792.svg',
    googleCloud: 'https://res.cloudinary.com/dmukukwp6/image/upload/Google_Cloud_14ebf7693d.svg',
    googleSheets: 'https://res.cloudinary.com/dmukukwp6/image/upload/Google_Sheets_logo_2014_2020_7db9f50a1e.svg',
    gtm: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/docs/integrate/frameworks/gtm.svg',
    hono: 'https://res.cloudinary.com/dmukukwp6/image/upload/hono_9d80c0611c.svg',
    html5: 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/html5_124a4f35e0.png',
    hubspot: 'https://res.cloudinary.com/dmukukwp6/image/upload/hubspot_1_f8248c008e.svg',
    ios: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/docs/integrate/ios.svg',
    java: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/docs/integrate/java.svg',
    javascript: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/docs/integrate/js.svg',
    klaviyo: 'https://res.cloudinary.com/dmukukwp6/image/upload/pasted_image_2026_02_02_T12_13_09_301_Z_1c73fd1ac6.png',
    kubernetes: 'https://res.cloudinary.com/dmukukwp6/image/upload/kubernetes_svgrepo_com_b9716be409.svg',
    laravel:
        'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/docs/integrate/frameworks/laravel.svg',
    linkedinAds: 'https://res.cloudinary.com/dmukukwp6/image/upload/4221chis9yaztef5phd0v3lal_12c6e6b2a1.svg',
    litellm: 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/litellmicon_a2805d75e5.png',
    mailchimp:
        'https://res.cloudinary.com/dmukukwp6/image/upload/pasted_image_2026_02_02_T12_37_02_666_Z_2c8f3e8398.png',
    metaAds: 'https://res.cloudinary.com/dmukukwp6/image/upload/meta_logo_56e02d5502.svg',
    moengage: 'https://res.cloudinary.com/dmukukwp6/image/upload/w_200,c_limit,q_auto,f_auto/1_95b73543_367f4ea0bc.png',
    mongodb: 'https://res.cloudinary.com/dmukukwp6/image/upload/Mongo_DB_Logo_f095b5aca0.svg',
    mysql: 'https://res.cloudinary.com/dmukukwp6/image/upload/mysql_logo_0ce3cfe493.svg',
    n8n: 'https://res.cloudinary.com/dmukukwp6/image/upload/n8n_color_ce6a4e9c92.svg',
    netlify: 'https://res.cloudinary.com/dmukukwp6/image/upload/netlify_original_cdea69c2b5.svg',
    nextjs: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/docs/integrate/frameworks/nextjs.svg',
    nginx: 'https://res.cloudinary.com/dmukukwp6/image/upload/nginx_icon_872690f0fe.svg',
    nodejs: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/docs/integrate/nodejs.svg',
    nuxt: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/docs/integrate/frameworks/nuxt.svg',
    phoenix: 'https://res.cloudinary.com/dmukukwp6/image/upload/Phoenix_Framework_81f5da0296.svg',
    php: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/docs/integrate/php.svg',
    polar: 'https://res.cloudinary.com/dmukukwp6/image/upload/logomark_black_a7518b0322.svg',
    postgres: 'https://res.cloudinary.com/dmukukwp6/image/upload/Postgresql_elephant_f6157ebdd3.svg',
    python: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/docs/integrate/python.svg',
    railway: 'https://res.cloudinary.com/dmukukwp6/image/upload/logo_dark_f8e870867f.svg',
    react: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/docs/integrate/react.svg',
    reactNative:
        'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/docs/integrate/react.svg',
    reactRouter: 'https://res.cloudinary.com/dmukukwp6/image/upload/rr_logo_light_970950178e.svg',
    redditAds: 'https://res.cloudinary.com/dmukukwp6/image/upload/reddit_logo_f6d4c5cb0b.svg',
    remix: 'https://res.cloudinary.com/dmukukwp6/image/upload/remix_letter_glowing_49183adce2.svg',
    retool: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/docs/integrate/frameworks/retool.svg',
    rudderstack:
        'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/docs/integrate/frameworks/rudderstack.svg',
    revenuecat: 'https://res.cloudinary.com/dmukukwp6/image/upload/logomark_red_background_9ea591e17a.svg',
    rollup: 'https://res.cloudinary.com/dmukukwp6/image/upload/Rollup_js_c306a2fde3.svg',
    ruby: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/docs/integrate/ruby.svg',
    rust: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/docs/integrate/rust.svg',
    s3: 'https://res.cloudinary.com/dmukukwp6/image/upload/s3_8f86e011ce.svg',
    salesforce: 'https://res.cloudinary.com/dmukukwp6/image/upload/Salesforce_com_logo_2e650322bc.svg',
    segment:
        'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/docs/integrate/frameworks/segment.svg',
    shopify: 'https://res.cloudinary.com/dmukukwp6/image/upload/shopify_glyph_5a3ad7459b.svg',
    slack: 'https://res.cloudinary.com/dmukukwp6/image/upload/Symbol_1_ac11ac22f6.svg',
    snowflake: 'https://res.cloudinary.com/dmukukwp6/image/upload/snowflake_color_517158afd5.svg',
    sqlDatabase: 'https://res.cloudinary.com/dmukukwp6/image/upload/sql_database_generic_8f6b358019.svg',
    stripe: 'https://res.cloudinary.com/dmukukwp6/image/upload/Stripe_Logo_revised_2016_24183d3284.svg',
    supabase: 'https://res.cloudinary.com/dmukukwp6/image/upload/supabase_logo_icon_f4d15903a4.svg',
    svelte: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/docs/integrate/frameworks/svelte.svg',
    tanstack: 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/logo_color_600_391d28faae.png',
    temporal: 'https://res.cloudinary.com/dmukukwp6/image/upload/Temporal_Symbol_dark_66b0582c1b.svg',
    tiktokAds: 'https://res.cloudinary.com/dmukukwp6/image/upload/tiktok_svgrepo_com_9315a2fa30.svg',
    unity: 'https://res.cloudinary.com/dmukukwp6/image/upload/unity_9f9c332941.svg',
    vercel: 'https://res.cloudinary.com/dmukukwp6/image/upload/vercel_icon_svgrepo_com_b7e78b41f9.svg',
    vitally: 'https://res.cloudinary.com/dmukukwp6/image/upload/vitally_a2d87ff23b.svg',
    vue: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/docs/integrate/frameworks/vue.svg',
    webflow: 'https://res.cloudinary.com/dmukukwp6/image/upload/webflow_63b6678590.svg',
    webpack: 'https://res.cloudinary.com/dmukukwp6/image/upload/webpack_3fc774b5a5.svg',
    woocommerce: 'https://res.cloudinary.com/dmukukwp6/image/upload/Woo_Commerce_logo_1b49a43cb1.svg',
    wordpress:
        'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/docs/integrate/frameworks/wordpress.svg',
    zapier: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/cdp/thumbnails/zapier.svg',
    zendesk: 'https://res.cloudinary.com/dmukukwp6/image/upload/zendesk_icon_f56707bc5c.svg',
} as const

export type LogoKey = keyof typeof LOGOS

export function getLogo(key: string): string | undefined {
    return LOGOS[key as LogoKey]
}
