---
title: How to set up Android remote config
date: 2025-01-28
author:
 - ian-vanagas
tags:
 - feature flags
---

[Remote config](/docs/feature-flags/remote-config) enables you to update your Android app's settings and behavior instantly without deploying new code or waiting for app store approval. This helps you control features access on the fly and disable them instantly if needed.

This tutorial shows you how to set up remote config in your Android app using PostHog. We'll create a basic Android app using Jetpack Compose that displays a message controlled by remote config.

## 1. Creating a new Android project

To start, you need to install Android Studio if you haven't already. Once done, open it and create a new project. Select **Empty Activity** as your template. Name your project something like `PostHogRemoteConfig`,  set the minimum SDK to API 21, select **Kotlin DSL** as your build configuration language, and click **Finish.**

![Create Android project](https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_01_28_at_09_44_362x_5773909d65.png)

## 2. Setting up PostHog

In your app-level `build.grade` file, add PostHog as a dependency like this:

```kotlin
// /PostHogRemoteConfig/app/build.gradle.kts
dependencies {

    implementation("com.posthog:posthog-android:3.+")
    // ... other dependencies

}
```

Next, in your project's package directory (`PostHogRemoteConfig/app/src/main/java/com/example/posthogremoteconfig`), create a new Kotlin class file called `MyApplication.kt`. This is where we initialize PostHog using your project API key and instance address, both of which you can find in [your project settings](https://us.posthog.com/settings/project).

```kotlin
package com.example.posthogremoteconfig

import android.app.Application
import com.posthog.android.PostHogAndroid
import com.posthog.android.PostHogAndroidConfig

class MyApplication : Application() {
    override fun onCreate() {
        super.onCreate()

        val config = PostHogAndroidConfig(
            apiKey = "<ph_project_api_key>",
            host = "<ph_client_api_host>"
        )
        PostHogAndroid.setup(this, config)
    }
}
```

Finally, in your `app/src/main/AndroidManifest.xml` file, add a reference to your application class: 

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools">

    <application
        android:name=".MyApplication"
        ... rest of existing file
```

## 3. Creating our remote config

With the integration set up, let's create a remote config flags to control our app's welcome message:

1. Go to the [feature flags tab](https://us.posthog.com/feature_flags) in PostHog and click **New feature flag**
2. Enter `welcome-message` as the key
3. Under **Served value**, select **Remote config (single payload)**
4. Set the payload to a string. We'll use `"Welcome to our awesome Android app!"`
5. Click **Save**

<ProductScreenshot
    imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_01_28_at_11_45_38_2x_8793a312d0.png"
    imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_01_28_at_11_45_53_2x_9b7ecd5680.png"
    alt="Remote config flag created in PostHog"
    classes="rounded"
/>

## 4. Setting up and running our app

With PostHog and our remote config set up, we can now move onto our actual app. It will be Compose-based and show a welcome message set by the remote config.

Doing this requires us to rewrite `MainActivity.kt` with the function to get the remote config value and show the message as well as a button to reload flags and refresh the message so we can show remote updates. This looks like this:

```kotlin
package com.example.posthogremoteconfig

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.*
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.posthog.PostHog
import com.example.posthogremoteconfig.ui.theme.PostHogRemoteConfigTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            PostHogRemoteConfigTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    RemoteConfigDemo()
                }
            }
        }
    }
}

@Composable
fun RemoteConfigDemo() {
    var message by remember { mutableStateOf("Loading...") }

    LaunchedEffect(Unit) {
        loadMessage { newMessage ->
            message = newMessage
        }
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Text(
            text = message,
            style = MaterialTheme.typography.bodyLarge
        )
        Spacer(modifier = Modifier.height(16.dp))
        Button(
            onClick = {
                PostHog.reloadFeatureFlags()
                loadMessage { newMessage ->
                    message = newMessage
                }
            }
        ) {
            Text("Refresh")
        }
    }
}

private fun loadMessage(onMessageLoaded: (String) -> Unit) {
    val message = PostHog.getFeatureFlagPayload("welcome-message")
    onMessageLoaded(message?.toString() ?: "Welcome to the app!")
}

```

With this done, build your project and then run the app in an emulator. You should see your welcome message from the remote config displayed in the center.

![Run app](https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_01_28_at_11_47_592x_584556b2eb.png)

You can also edit and save the remote config in PostHog and then press the **refresh** button to see the new value.

## Further reading

- [How to set up analytics in Android](/tutorials/android-analytics)
- [How to run A/B tests in Android](/tutorials/android-ab-testing)
- [Feature flags vs configuration: Which should you choose?](/product-engineers/feature-flags-vs-configuration)
