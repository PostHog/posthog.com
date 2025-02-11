---
title: How to set up iOS remote config
date: 2025-02-11
author:
 - ian-vanagas
tags:
 - feature flags
---

[Remote config](/docs/feature-flags/remote-config) enables you to update your iOS app's settings and behavior instantly without deploying new code or waiting for App Store approval. This helps you control features access on the fly and disable them instantly if needed.

This tutorial shows you how to set up remote config in your iOS app using PostHog. We'll create a basic iOS app using SwiftUI that displays a message controlled by remote config.

## 1. Creating a new iOS project

First, open Xcode and create a new project:

1. Select **File > New > Project**
2. Choose **iOS** as the platform and **App** as the template
3. Name your project (e.g., `PostHogRemoteConfig`)
4. Select **SwiftUI** as the interface
5. Leave the other settings as default and click **Next**
6. Choose a location to save your project and click **Create**

## 2. Setting up PostHog

Next, we'll add [PostHog’s iOS SDK](/docs/libraries/ios) as a dependency. You can use either Swift Package Manager or CocoaPods. We'll use Swift Package Manager for this tutorial:

1. In Xcode, select **File > Add Package Dependencies**
2. Enter `https://github.com/PostHog/posthog-ios.git` in the search field
3. Click **Add Package**

![Add package](https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_02_11_at_10_29_512x_c980b2a5de.png)

Now, in `PostHogRemoteConfigApp.swift`, initialize PostHog with your project API key and host (both of which you can get in [your project settings](https://us.posthog.com/settings/project)). 

```swift
import SwiftUI
import PostHog

@main
struct PostHogRemoteConfigApp: App {
  init() {
    let config = PostHogConfig(
      apiKey: "<ph_project_api_key>",
      host: "<ph_client_api_host>"
    )
    PostHogSDK.shared.setup(config)
  }

  var body: some Scene {
    WindowGroup {
      ContentView()
    }
  }
}

```

With this, you can build and run your app. Once launched, you should see events autocaptured into PostHog.

<ProductScreenshot
    imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_02_11_at_10_46_17_2x_13073f4f5e.png"
    imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_02_11_at_10_45_53_2x_82ad60a5b7.png"
    alt="Events autocaptured into PostHog"
    classes="rounded"
/>

## 3. Creating our remote config

Now, let's set up the remote config flag in PostHog to control our welcome message:

1. Go to the [feature flags tab](https://us.posthog.com/feature_flags) in PostHog
2. Click **New feature flag**
3. Set the key as `welcome-message`
4. Under **Served value**, select **Remote config (single payload)**
5. Set the payload to a string: `"Welcome to our awesome iOS app!"`
6. Click **Save**

<ProductScreenshot
    imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_02_11_at_10_36_23_2x_c7ec443c95.png"
    imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_02_11_at_10_36_39_2x_63251770aa.png"
    alt="Remote config flag created in PostHog"
    classes="rounded"
/>

## 4. Setting up the app UI

To show that message, let's create a simple UI in `ContentView.swift` that displays it. This requires:

- A basic view with a text element to display our message
- A `getFeatureFlagPayload()` call to fetch our remote config value
- A default message fall back if the remote config isn't available
- A refresh button to reload the message if we change the remote config

All together this looks like this:

```swift
import SwiftUI
import PostHog

struct ContentView: View {
  @State private var welcomeMessage: String = "Loading..."

  var body: some View {
    VStack(spacing: 20) {
      Text(welcomeMessage)
        .font(.title)
        .multilineTextAlignment(.center)
        .padding()

      Button("Refresh Message") {
        loadWelcomeMessage()
      }
      .padding()
      .background(Color.blue)
      .foregroundColor(.white)
      .cornerRadius(10)
    }
    .onAppear {
      loadWelcomeMessage()
    }
  }

  private func loadWelcomeMessage() {
    if let message = PostHogSDK.shared.getFeatureFlagPayload("welcome-message") as? String {
      welcomeMessage = message
    } else {
      welcomeMessage = "Welcome to the app!"
    }
  }
}

```

To test this out, build and run your app again. You should see the welcome message from your remote config displayed in the center of the screen.

![Final app](https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_02_11_at_10_50_222x_8cc39479a2.png)

You can also go back into PostHog, update your remote config, and then press refresh in-app to see the updated message. 

## Further reading

- [How to set up analytics in iOS](/tutorials/ios-analytics)
- [How to run A/B tests in iOS](/tutorials/ios-ab-tests)
- [Feature flags vs configuration: Which should you choose?](/product-engineers/feature-flags-vs-configuration)