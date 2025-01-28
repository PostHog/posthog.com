---
title: Creating a no-code web experiment
sidebar: Docs
showTitle: true
---

> 🚧 **Note:** No-code web experiments are currently considered in `beta`. To access them, enable the [feature preview](https://us.posthog.com#panel=feature-previews) in your PostHog account. You'll also need to define `disable_web_experiments: false` in your Posthog web snippet configuration. 
>
> We are keen to gather as much feedback as possible so if you try this out please let us know. You can email [daniel.b@posthog.com](mailto:daniel.b@posthog.com), send feedback via the [in-app support panel](https://us.posthog.com#panel=support%3Afeedback%3Aexperiments%3Alow), or use one of our other [support options](/docs/support-options).

No-code web experiments enable you to run A/B tests, multivariate tests, and other experiments that modify your website without writing a single line of code.

You build your web experiment with the PostHog [toolbar](/docs/toolbar), our no-code tool, and then use the **preview variant** button to verify that everything works as expected.

In this example, we will change the text of a button on a sample webpage without writing any code.

## Set up your experiment in PostHog

After enabling the **No Code Web experiments** feature preview, go to the [experiments tab](https://us.posthog.com/experiments) in PostHog and click **New experiment**. On the **new experiment** page, fill out your experiment details and select **No-code web experiment** as your experiment type, and click **Save as draft**.

<ProductScreenshot
    imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_01_16_at_13_47_05_2x_b727914878.png"
    imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_01_16_at_13_46_40_2x_3d54ac114d.png"
    alt="Experiment in PostHog"
    classes="rounded"
/>

> **What about product experiments?** [Product experiments](/docs/experiments/creating-an-experiment) use custom code to manage how variants modify your product. This option is best if you need specific, code-based adjustments and configurations.

## Implement the experiment on your website

> **Note:** During the beta period, you'll need to add `disable_web_experiments: false` to your PostHog web snippet configuration like this:
>
> ```js-web
> posthog.init('<ph_project_api_key>', {
>   api_host: '<ph_client_api_host>',
>   disable_web_experiments: false,
> })
> ```
> Otherwise, you'll be able to set up the experiment in the toolbar but it won't actually run on your live site.

Once you've created your no-code web experiment, click **Launch toolbar on your website** under the **Implementation** section.

![Implement web experiment](https://res.cloudinary.com/dmukukwp6/image/upload/web_exp_implementation_ddd1848103.png)

The toolbar enables you to select elements and apply transformations for each variant in your experiment. Once you launch it:

1. Click the **vial** tab on the toolbar.

2. Select the variant you want to modify the site for. In our case, we select the **test** variant.

3. Click **Add element** and select the element you want to modify. We select the main signup button on our page.

4. Use the toolbar to modify the element's text, CSS, or HTML. We'll change the button's text to say "Sign up for free". Importantly, the **Text** field modifies the text of the element. The **CSS** field lets you change the styling of the element. The **HTML** field will override the entire element.
5. If you'd like to change more parts of the page for this version of the experiment, click **Add element** to modify a second, third, or fourth element.

6. Once done modifying elements for your variants, click **Save experiment**.

![Implementing web experiments with the toolbar](https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_01_16_at_13_56_01_2x_aff05d4224.png)

### Further editing your experiment

The toolbar also enables further editing of your experiment. For example, you can:

- Add multiple element changes to a variant by clicking **+ Add element**. Elements are buttons, headers, images, and more.
- Remove an element from a variant by clicking the trash bin icon.
- Add more versions of your experiment by clicking **+ Add variant**.
- Change all elements, headers, buttons, and/or images by clicking the **Change element** dropdown.

## How to see how your experiment will look

To preview the different versions of your experiment, go back to your experiment details page in PostHog and click the **Variants** tab. Here, you'll see your variants along with a button to preview each of them (and the ability to add a screenshot for them).

<ProductScreenshot
  imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_01_16_at_14_06_28_2x_1ca848f7ca.png"
  imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_01_16_at_14_06_40_2x_8acab7c726.png"
  alt="Preview variants in PostHog"
  classes="rounded"
/>

Doing this enables you to verify their configuration and ensure that the changes are displayed and functioning as expected before the experiment goes live. 

### Final touches

Congratulations! You're now ready to launch a web experiment.

Before launching, ensure the following:

1. **Test thoroughly**: Verify that all variants display and function as expected across devices and browsers. See our [testing feature flags doc](/docs/feature-flags/testing) for more details.

2. **Document changes**: Record the modifications made to each variant and their goals. Add a description of the changes to your experiment as well as screenshots of each of the variants. 
