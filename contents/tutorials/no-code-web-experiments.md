---
title: Running no-code web experiments
sidebar: Docs
showTitle: true
author:
  - phani-raj
date: 2024-10-06
tags:
  - experimentation
  - feature flags
---

- **Level:** Medium 🦔🦔
- **Estimated reading time:** 10 minutes ☕️☕️

PostHog's No-code web experiments allows you to test run experiments that modify your website, without writing a single line of code.
Verify that your web experiment  without launching it by using the "preview variant" button and confirm that everything works as expected. 

## Our experiment and what we need

In our example project, we will modify the font-size of a button on a sample webpage without writing any code. 

## Setting up our experiment in PostHog
On the `new experiment` page, we now have a new `Experiment Type` option to select. 
The **Experiment Type** setting allows you to choose how your experiment will be implemented. Note that once the experiment type is selected and saved, it cannot be changed.

![Select experiment type](https://res.cloudinary.com/dmukukwp6/image/upload/create_web_exp_type_ed2e6af988.png)


### Options

1. **Product experiment**
   - Choose this option if you intend to use custom code to manage how variants modify your product.
   - Recommended for experiments that require specific, code-based adjustments and configurations.

2. **No-Code web experiment**
   - Choose this option to define variants on your website without needing to write code.
   - This setup leverages the PostHog toolbar, allowing you to make adjustments effortlessly.

![New Web experiment](https://res.cloudinary.com/dmukukwp6/image/upload/create_web_exp_ca7eb06c0b.png)


We will select the `No-Code web experiment` option here for our experiment.

### Modifying your website.
Once you've created the web experiment, you will find a new option in the `Implementation` section of your experiment on Posthog.com.
You can define variant changes directly on your website using the PostHog toolbar. 
This allows you to select elements and apply transformations for each variant in your experiment.

![Implement web experiment](https://res.cloudinary.com/dmukukwp6/image/upload/web_exp_implementation_ddd1848103.png)

1. Click the **Launch toolbar on your website** button.
2. Use the toolbar to select the elements you want to modify for each variant.
3. Apply the desired transformations to implement the changes.

The toolbar will guide you through the process of setting up the variant changes visually on your site, making it easier to customize without coding.

![Toolbar launched](https://res.cloudinary.com/dmukukwp6/image/upload/create_web_exp_toolbar_launched_3b23c18d3f.png)

### Editing Experiment Variants for A/B Testing

This guide outlines how to edit, manage, and save experiment variants for testing and feature rollouts in your platform.

---

#### Overview

Experiment variants allow you to implement and test changes to specific elements on your webpage. For example, you can test different call-to-action (CTA) button sizes and evaluate their effectiveness compared to the baseline (control group).

The editor allows you to:
1. View existing variants.
2. Add or modify elements in each variant.
3. Add new variants.

---

#### How to Edit an Experiment Variant

##### 1. View and Edit Variants
- Each variant is listed with its rollout percentage. For example:
  - **control**: `rollout: 33%`
  - **larger_cta**: `rollout: 33%`
  - **smaller_cta**: `rollout: 34%`

- Click on a variant to view or edit it. 
  - The variant name (e.g., `larger_cta`).
  - A message such as _"This experiment variant doesn't modify any elements"_ if no modifications are defined yet.
  - Options to add or remove elements.

##### 2. Add or Modify Elements
- To make changes to a variant:
  - Click **Add element** to include specific webpage elements (e.g., buttons, headers, images) that you want to modify.
  - Define the modifications (e.g., increase button size, change text color).

##### 3. Add New Variants
- To create a new variant:
  - Click the **Add variant** button at the bottom of the editor.
  - Enter a name for the new variant.
  - Add and configure elements for the new variant.

##### 4. Save Changes
- Once all modifications are complete:
  - Click the **Save experiment** button to apply the changes.

##### 5. Cancel Edits (Optional)
- To discard any changes and return to the previous view, click **Cancel**.

---

![No transforms defined](https://res.cloudinary.com/dmukukwp6/image/upload/create_web_exp_step_1_86fa550fdd.png)

**Example**

In the above screenshot:
- The experiment contains three variants: `control`, `larger_cta`, and `smaller_cta`.
- The `larger_cta` variant currently has no modifications, as indicated by the message _"This experiment variant doesn't modify any elements."_ 
- Click **Add element** to modify this variant.

---

**Tips for Effective Experimentation**

1. Use descriptive names for variants to make their purpose clear (e.g., `larger_cta` for testing larger call-to-action buttons).
2. Regularly monitor experiment performance to identify the winning variant.
3. Upload screenshots from the variant to the experiment page. 

---

### Modifying Elements in an Experiment Variant
![Select HTML element](https://res.cloudinary.com/dmukukwp6/image/upload/create_web_exp_select_element_75c46a1ed3.png)

To customize elements in an experiment variant, follow these steps:

1. **Select the Variant**
   - Open the experiment editor and select the variant you want to modify (e.g., `test`).

2. **Choose Elements to Modify**
   - Click the **Select element** dropdown in the variant editor.
   - Available options include:
     - **All Elements**: Apply changes globally to all relevant elements on the page.
     - **Headers**: Modify header text or style.
     - **Buttons**: Customize button properties such as size, color, or text.
     - **Images**: Adjust image properties like dimensions or alt text.

3. **Apply Modifications**
   - Once an element type is selected, define the specific changes you want to make, such as:
     - **HTML**: Adjust the underlying HTML structure or attributes.
     - **Text**: Update the displayed text content for the selected element.
     - **CSS**: Modify visual styling, such as colors, font size, padding, or margins.
   - Any selected element in your experiment's variant can have multiple modifications applied to it.
   - An element can have its innerHTML, innerText and inline css changed as part of the experiment. 

4. **Add Multiple Elements**
   - To modify additional elements, click **Add element** and repeat the selection process.

5. **Save Changes**
   - Once all desired modifications are applied, click **Save experiment** to finalize the updates.

---

![Web Experiment Saved](https://res.cloudinary.com/dmukukwp6/image/upload/create_web_exp_saved_4a7ae10698.png)

**Example Use Case**
If you're testing the impact of larger call-to-action buttons:
1. Select **Buttons** from the **Select element** dropdown.
2. Increase the button size and change its background color.
3. Save the experiment to apply the changes.

---

### Previewing Variants

Previewing variants allows you to verify their configuration and ensure that the changes are displayed and functioning as expected before the experiment goes live.

![Preview Variants](https://res.cloudinary.com/dmukukwp6/image/upload/create_web_exp_see_preview_01e408ac42.png)

---

### **How to Preview a Variant**

1. **Locate the Variant**
   - In the **Distribution** section of the experiment editor, find the variant you want to preview (e.g., `control`, `larger_cta`, or `smaller_cta`).

2. **Preview the Variant**
   - Click the **Preview variant** button next to the desired variant.
   - This opens a live preview of the variant’s user interface, allowing you to see the applied changes in action.

3. **Verify the Modifications**
   - Check the following in the preview:
     - Element modifications (e.g., text, styling, or structural changes).
     - Functional behavior, such as button actions or form inputs.
   - Ensure the design and layout match the intended changes for the variant.

---

**Best Practices for Previewing Variants**

1. **Review All Variants**: Always preview each variant to confirm that changes are implemented correctly.
2. **Cross-Browser Testing**: Test the preview across different browsers to ensure compatibility.
3. **Team Collaboration**: Share the preview with your team and get sign-off from them if necessary.

**Example**

When previewing an experiment variant, we will apply the visual changes from your experiment variant without having to launch
the web experiment.

![Preview variant on website](https://res.cloudinary.com/dmukukwp6/image/upload/create_web_exp_preview_6e24f1cd2d.png)
---

**1. Query Parameters in the URL**

The preview URL includes specific query parameters to indicate the experiment and variant being previewed. For example:

- `__experiment_id=45`: Identifies the experiment being previewed.
- `__experiment_variant=larger_cta`: Specifies the variant being tested (e.g., `larger_cta`).

These parameters ensure that the correct variant is loaded during the preview.

---

**2. Visual Transformations**

In the previewed page, specific visual changes applied to the variant are displayed. For instance:

- The **"Capture event" button** in the `larger_cta` variant:
  - **Size**: The button appears larger than in the `control` variant.
  - **Styling**: Bold text and increased padding emphasize its prominence on the page.

---

### **Verifying the Preview**

1. **URL Validation**: Ensure the query parameters in the URL match the experiment and variant you want to preview.
2. **Element Check**: Confirm that the visual changes, such as button size and text style, are correctly applied to the elements.
3. **Functional Test**: Verify that interactive elements like the "Capture event" button remain functional and trigger the correct actions.

By checking these details, you can confidently validate your experiment setup before launching it.


### Final touches
Congratulations! You're now ready to launch a web-experiment!

Before you launch, lets take care of a few things first so we can get the best results for our efforts.

1. **Test Thoroughly**: Ensure all variants display and function as expected across devices and browsers.
2. **Document Changes**: Maintain records of the modifications made to each variant and their goals.
3. **Set a Clear Objective**: Define the success criteria (e.g., click-through rate, sign-ups) before launching.

