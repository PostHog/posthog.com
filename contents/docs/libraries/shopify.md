---
title: Shopify
icon: ../../images/docs/integrate/frameworks/shopify.svg
---

Tracking how users interact with your [Shopify](https://www.shopify.com/) store can help you improve the user experience and increase conversion rates.

In this guide, we'll:

1. Add PostHog tracking code to your Shopify store
1. Add properties to an autocaptured event using data attributes
1. Send purchase information to PostHog using a custom event (limited to Shopify Plus stores)

## 1. Install PostHog in Shopify

1. Get your [PostHog snippet](/docs/integrate) from your 'Project Settings' or the initial PostHog setup
1. Login to your Shopify dashboard
1. Go to 'Online Store' -> 'Themes' (see image below)
1. On your theme, click 'Actions' -> 'Edit code' (see image below)

    ![Shopify Dashboard](../../images/tutorials/shopify/shopify-dashboard.png)

1. You should now be seeing a code editor. Click on `theme.liquid` under 'Layout' on the left sidebar (see image below)
1. Navigate until you see the closing `</head>` tag. Paste your snippet there, before that tag, like in the image below:

    ![Shopify Dashboard](../../images/tutorials/shopify/snippet.png)

1. Click the green save button on the top right and you're good to go - PostHog should now be working on your Shopify store!

> To confirm PostHog is configured correctly, visit your store and then check if the events from your session appear in PostHog. Note that this may take a few minutes.

## Conversion tracking (advanced)

It can be useful to track additional events on your Shopify store, such as when a user adds an item to their cart or completes a purchase.

To do this, you can use [autocapture](/docs/product-analytics/autocapture) to send metadata with events. This information can be used in further analysis in aggregate or when understanding behavior of an individual user.

> The following requires some knowledge of HTML and Shopify's [Liquid templating engine](https://shopify.dev/docs/api/liquid).

### 2. Add to cart (with data attributes)

To track _which_ product a user adds to their cart, we can use a `data-ph-capture-attribute` on the 'Add to cart' button (generally in `product.liquid` in Shopify). While this still requires adding code, it's less involved than creating a custom event.
For example, capturing the product title and price (divided by 100) looks like this:

```html
<input type="submit" class="add-to-cart-button" value="{{ 'products.product.add_to_cart' | t }}" 
    data-ph-capture-attribute-product-name="{{product.title}}" 
    data-ph-capture-attribute-product-price="{{product.price | divided_by: 100 }}"
/>
```

Once set up, the _Add to cart_ button autocapture event in PostHog will include the properties for each of the attributes prefixed with `data-ph-capture-attribute-` and their values.

![Data attributes in an autocaptured event](../../images/tutorials/shopify/autocapture-data-attributes.png)

### 3. Order details (using properties on a custom event)

> This requires a Shopify Plus account because you'll need to modify your store's checkout settings. This option is available in the Shopify admin by navigating to _Settings_ → _Checkout_ → _Order status page_ → _Additional scripts_.

If you want to capture orders more accurately, you can do so using a custom event. These enable you to [add properties](/docs/getting-started/send-events#sending-custom-properties-on-an-event) for any of the fields in your order including price, order number, size, and currency. 

To add a custom event to your Shopify checkout page, add a script like this to your checkout settings:

> This code should be used as a guide and may need to be modified depending on the setup of your store.

```html
{% if first_time_accessed %}
<script>
    posthog.capture('order-submitted', {
        value: '{{ order.total_price }}', 
        created_at: '{{ order.created_at }}', 
        order_number: '{{ order.order_number }}',
        userId: '{{ customer.id }}',
        order_id: '{{ checkout.order_id }}',
        "products": [{% for line_item in line_items %}{
            "productId": '{{ line_item.product.type }}',
            "colorId": '{{ line_item.variant.option1 }}',
            "size": '{{ line_item.variant.option2 }}',
            "quantity": {{ line_item.quantity }},
            "price": {{ line_item.final_price| divided_by: 100.0 }},
            "currency": '{{ checkout.currency }}',
            "sku": '{{ line_item.product_id }}_{{ line_item.variant_id }}',
            }{% unless forloop.last %}, {% endunless %}{% endfor %}]
    });
</script>
{% endif %}
```

> **Tip:** Be sure to wrap the code in `{% if first_time_accessed %}` to ensure the event is only sent once.

Once setup, you can see the order's total price including taxes (`value`) and the array of products that were ordered with specific info about the variants in PostHog:

![Order details sent from Shopify as properties on a custom event](../../images/tutorials/shopify/shopify-order-details.png)

## What can you do with this data?

You can use this data to answer questions like:

- Which products are being _left in the cart_ most often?
- Which products are being _purchased together_ most often?
- Which marketing campaigns are driving sales of different products?
- How does regionality of shoppers affect the products they buy?
