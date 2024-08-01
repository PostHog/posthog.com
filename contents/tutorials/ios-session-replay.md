---
title: How to set up iOS session replay
date: 2024-08-02
author:
  - lior-neu-ner
tags:
  - session replay
---

[Session replay](/session-replay) is a useful support tool for understanding how users are interacting with your iOS app. It also helps you debug and recreate issues. 

To show how you to set it up with PostHog, this tutorial shows your how to create a basic SwiftUI app, add PostHog, and [enable session recordings](/docs/session-replay/mobile#ios).

## 1. Create a basic iOS app

Our sample app will have two screens:

- The first screen is a `login` screen with name, email, and password text fields.
- The second screen is a simple screen with welcome text and logout button.

The first step is to create a new app. Open XCode and click **Create new project**. Select iOS as your platform, then **App** and press **next**. Give your app a name, select `SwiftUI` as the interface, and the defaults for everything else. Click next and then **Create**.

Then, replace your code in `ContentView.swift` with the following:

```swift file=ContentView.swift
import SwiftUI

struct ContentView: View {
    @State private var email: String = ""
    @State private var password: String = ""
    @State private var isLoggedIn: Bool = false

    var body: some View {
        NavigationView {
            if isLoggedIn {
                WelcomeView(isLoggedIn: $isLoggedIn)
            } else {
                VStack {
                    TextField("Name", text: $name)
                        .padding()
                        .border(Color.gray)

                    TextField("Email", text: $email)
                        .padding()
                        .keyboardType(.emailAddress)
                        .autocapitalization(.none)
                        .border(Color.gray)
                    
                    SecureField("Password", text: $password)
                        .padding()
                        .border(Color.gray)
                    
                    Button(action: {
                        // Simple login logic
                        if !email.isEmpty && !password.isEmpty {
                            isLoggedIn = true
                        }
                    }) {
                        Text("Login")
                            .frame(maxWidth: .infinity)
                            .padding()
                            .background(Color.blue)
                            .foregroundColor(.white)
                            .cornerRadius(10)
                    }
                    .padding(.top, 20)
                }
                .padding()
                .navigationTitle("Login")
            }
        }
    }
}

struct WelcomeView: View {
    @Binding var isLoggedIn: Bool
    
    var body: some View {
        VStack {
            Text("Welcome!")
                .accessibilityIdentifier("ph-no-capture")
                .font(.largeTitle)
                .padding()
            
            Button(action: {
                isLoggedIn = false
            }) {
                Text("Logout")
                    .frame(maxWidth: .infinity)
                    .padding()
                    .background(Color.red)
                    .foregroundColor(.white)
                    .cornerRadius(10)
            }
            .padding(.top, 20)
        }
        .padding()
    }
}

#Preview {
    ContentView()
}
```

Our basic setup is now complete. Build and run your app to see it in action.

![Video of basic iOS app setup](https://res.cloudinary.com/dmukukwp6/video/upload/v1722519765/posthog.com/contents/sample-app-2.mp4)

## 2. Add PostHog to your app

With our app set up, it’s time to install and set up PostHog. If you don't have a PostHog instance, you can [sign up for free](https://us.posthog.com/signup).

First, add [`posthog-ios`](/docs/libraries/ios) as a dependency to your app using [Swift Package Manager](https://developer.apple.com/documentation/xcode/adding-package-dependencies-to-your-app) (or if you prefer, you can use [CocoaPods](/docs/libraries/ios#cocoapods)).

To add the package dependency to your Xcode project, select `File > Add Package Dependency` and enter the URL `https://github.com/PostHog/posthog-ios.git`. Select `posthog-ios` and click Add Package.

**Note:** Session replay requires SDK version `3.6.0` or higher.

![Add PostHog from Swift Package Manager](https://res.cloudinary.com/dmukukwp6/image/upload/v1720532354/posthog.com/contents/Screenshot_2024-07-09_at_2.32.30_PM.png)

Next, configure your PostHog instance in `App.swift` using your project API key and instance address (you can find these in [your project settings](https://us.posthog.com/project/settings)):

```swift file=App.swift
import SwiftUI
import PostHog

@main
struct posthog_session_replayApp: App {
    init() {
        let POSTHOG_API_KEY = "<ph_project_api_key>"
        let POSTHOG_HOST = "<ph_client_api_host>"  // usually 'https://us.i.posthog.com' or 'https://eu.i.posthog.com'
        let configuration = PostHogConfig(apiKey: POSTHOG_API_KEY, host: POSTHOG_HOST)
        configuration.sessionReplay = true
        configuration.sessionReplayConfig.maskAllImages = false // must be disabled for SwiftUI, else Text views are redacted. See docs for more details: https://posthog.com/docs/session-replay/mobile#ios
        configuration.sessionReplayConfig.maskAllTextInputs = false
        configuration.sessionReplayConfig.screenshotMode = true // required for SwiftUI session replays
        PostHogSDK.shared.setup(configuration)
    }
    
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}
```

To check your setup, build and run your app a few times. Enter in any values in the text fields and click the **Log in** button. You should start see recordings in the [session replay tab](https://us.posthog.com/replay/recent) in PostHog 🎉

<ProductScreenshot
  imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/v1722520038/posthog.com/contents/Screenshot_2024-08-01_at_2.46.25_PM.png"
  imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/v1722520038/posthog.com/contents/Screenshot_2024-08-01_at_2.46.38_PM.png" 
  alt="iOS session replays in PostHog" 
  classes="rounded"
/>

## 3. (Optional) Mask sensitive data

Your replays may contain sensitive information. For example, if you're building a banking app you may not want to capture how much money a user has in their account. PostHog tries to automatically mask sensitive data (like the password text field), but sometimes you need to do it manually.

To replace any type of `UIView` with a redacted version in the replay, set the [accessibilityIdentifier](https://developer.apple.com/documentation/uikit/uiaccessibilityidentification/1623132-accessibilityidentifier) or [accessibilityLabel](https://developer.apple.com/documentation/uikit/uiaccessibilityelement/1619577-accessibilitylabel) to `ph-no-capture`.

In the below code, we do this for the welcome text:

```swift file=ContentView.swift
// your existing code

struct WelcomeView: View {
    @Binding var isLoggedIn: Bool
    
    var body: some View {
        VStack {
            Text("Welcome!")
                .accessibilityIdentifier("ph-no-capture")
                .font(.largeTitle)
                .padding()

// rest of your existing code
```

Now, the welcome messages shows up like this in replays:

<ProductScreenshot
  imageLight={""} 
  imageDark={""} 
  alt="Masking in iOS session replay" 
  classes="rounded"
/>

## Further reading

- [How to run A/B tests in iOS](/tutorials/ios-ab-tests)
- [How to set up analytics in iOS](/tutorials/ios-analytics)
- [How to set up feature flags in iOS](/tutorials/ios-feature-flags)
