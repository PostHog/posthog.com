---
title: In-app prompts
sidebar: Handbook
showTitle: true
---

If you want to announce a new feature, invite a customer to a slack channel or drive engagement of a particular feature in the product you might want to use our in-app prompts.

## How to create a new prompt

In-app prompts are powered by JSON feature flags.

1. Create a new feature flag with the name starting with `prompt-`
2. Add the payload

   ```json
   {
      title: string // title of the prompt
      body: string // body of the prompt, can be HTML including links
      type: PromptType // type of the prompt - either 'modal' or 'popup'
      image?: string // url of the image
      url_match?: string // regex to match url against e.g. '.*feature_flags.*'
      primaryButtonText?: string // text for the primary button
      secondaryButtonText?: string // text for the secondary button
      primaryButtonURL?: string // url for the primary button (opens in a new window)
   }
   ```

3. Add the cohort or user properties that you want to show the prompt to.
   - If you want to show a prompt based on events, you should create a dynamic cohort based on the event, then export the cohort and use it to create a static feature flag.
4. **Important** Add the release condition that the user property `${feature_flag_name}` **is not set**. This ensures that the prompt is only shown once.

If you have any questions message Luke

## Examples

### Modal prompt

Shows in the middle of the screen. It's more intrusive than a popup.

![Modal prompt](../../images/handbook/prompt-modal.png)

### Popup prompt

Shows in the bottom right corner. It's less intrusive than a modal.

![Popup prompt](../../images/handbook/prompt-popup.png)



