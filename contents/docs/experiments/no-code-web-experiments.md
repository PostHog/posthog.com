---
title: Creating a no-code web experiment
sidebar: Docs
showTitle: true
author:
  - phani-raj
date: 2024-10-06
tags:
  - experimentation
  - feature flags
---

PostHog's no-code web experiments allow you to run A/B tests, multivariate tests, and other experiments that modify your website without writing a single line of code.  
Build your web experiment with the PostHog toolbar, our no-code tool, and then use the **preview variant** button to verify that everything works as expected.

#### Our experiment and what we need

In this example project, we will modify the font size of a button on a sample webpage without writing any code.

---

#### Setting up our experiment in PostHog

On the `new experiment` page, there is a new **experiment type** option to select.  
The **experiment type** setting allows you to choose how your experiment will be implemented. Note that once the experiment type is selected and saved, it cannot be changed.

![Select experiment type](https://res.cloudinary.com/dmukukwp6/image/upload/create_web_exp_type_ed2e6af988.png)

##### Options

1. **Product experiment**
   - Choose this option if you intend to use custom code to manage how variants modify your product.
   - Recommended for experiments that require specific, code-based adjustments and configurations.

2. **No-code web experiment**
   - Choose this option to define variants on your website without writing code.
   - This setup leverages the PostHog toolbar, allowing you to make adjustments entirely within your browser.

We will select the **no-code web experiment** option for our example project.

---

#### Modifying your website

Once you've created the web experiment, you will find a new option in the **Implementation** section of your experiment on PostHog.  
You can define variant changes directly on your website using the PostHog toolbar. This allows you to select elements and apply transformations for each variant in your experiment. In the following image, the PostHog toolbar is overlaid on my "PostHog React" sample website.

![Implement web experiment](https://res.cloudinary.com/dmukukwp6/image/upload/web_exp_implementation_ddd1848103.png)

1. Click the **Launch toolbar on your website** button.
2. Use the toolbar to select the elements you want to modify for each variant.
3. Apply the desired transformations to implement the changes.

The toolbar will guide you through the process of setting up the variant changes visually on your site, making it easier to customize without coding.

![Toolbar launched](https://res.cloudinary.com/dmukukwp6/image/upload/create_web_exp_toolbar_launched_3b23c18d3f.png)

---

#### Editing experiment variants for A/B testing

Experiment variants allow you to implement and test changes to specific elements on your webpage. For example, you can test different call-to-action (CTA) button sizes and evaluate their effectiveness compared to the baseline (control group).

---

#### How to edit an experiment variant

##### 1. View and edit variants
- Each variant is listed with its rollout percentage. For example:
  - **control**: `rollout: 33%`
  - **larger_cta**: `rollout: 33%`
  - **smaller_cta**: `rollout: 34%`

- Click on a variant to view or edit it:
  - Review the variant name (e.g., `larger_cta`).
  - If no modifications are defined yet, a message such as _"This experiment variant doesn't modify any elements"_ will appear.
  - Use the options to add or remove elements.

##### 2. Add or modify elements
- To make changes to a variant:
  - Click **Add element** to include specific webpage elements (e.g., buttons, headers, images) that you want to modify.
  - Define the modifications (e.g., increase button size, change text color).

##### 3. Add new variants
- To create a new variant:
  - Click the **Add variant** button at the bottom of the editor.
  - Enter a name for the new variant.
  - Add and configure elements for the new variant.

##### 4. Save changes
- Once all modifications are complete:
  - Click the **Save experiment** button to apply the changes.

##### 5. Cancel edits (optional)
- To discard any changes and return to the previous view, click **Cancel**.

---

#### Modifying elements in an experiment variant

![Select HTML element](https://res.cloudinary.com/dmukukwp6/image/upload/create_web_exp_select_element_75c46a1ed3.png)

1. **Select the variant**  
   - Open the experiment editor and select the variant you want to modify (e.g., `test`).

2. **Choose elements to modify**  
   - Click the **Select element** dropdown in the variant editor.
   - Available options include:
     - **All elements**: Apply changes globally to all relevant elements on the page.
     - **Headers**: Modify header text or style.
     - **Buttons**: Customize button properties such as size, color, or text.
     - **Images**: Adjust image properties like dimensions or alt text.

3. **Apply modifications**  
   - Define specific changes for the selected element:
     - **HTML**: Adjust the underlying HTML structure or attributes.
     - **Text**: Update the displayed text content for the selected element.
     - **CSS**: Modify visual styling, such as colors, font size, padding, or margins.
   - Any selected element in your experiment's variant can have multiple modifications applied to it.

4. **Add multiple elements**  
   - To modify additional elements, click **Add element** and repeat the selection process.

5. **Save changes**  
   - Once all desired modifications are applied, click **Save experiment** to finalize the updates.

---

#### Previewing variants

Previewing variants allows you to verify their configuration and ensure that the changes are displayed and functioning as expected before the experiment goes live.

##### How to preview a variant

1. **Locate the variant**  
   - In the **distribution** section of the experiment editor, find the variant you want to preview (e.g., `control`, `larger_cta`, or `smaller_cta`).

2. **Preview the variant**  
   - Click the **Preview variant** button next to the desired variant.
   - This opens a live preview of the variant’s user interface, allowing you to see the applied changes in action.

---

#### Final touches

Congratulations! You're now ready to launch a web experiment.

Before launching, ensure the following:
1. **Test thoroughly**: Verify that all variants display and function as expected across devices and browsers.
2. **Document changes**: Record the modifications made to each variant and their goals.
3. **Set a clear objective**: Define success criteria (e.g., click-through rate, sign-ups) before launching.
