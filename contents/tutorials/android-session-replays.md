---
title: How to set up Android session replays
date: 2024-07-10
author:
  - lior-neu-ner
tags:
  - session replay
---

[Session replays](/session-replay) are a useful support tool for understanding how users are interacting with your Android app. It also helps you debug and recreate issues. 
**
To show how you to set it up with PostHog, in this tutorial we create a basic Kotlin app, add PostHog, and [enable session recordings](/docs/session-replay/mobile#android).

## 1. Create a basic Android app

Our sample app will have two screens:

- The first screen is be a `login` screen with email and password textfields.
- The second screen is a simple screen with welcome text and logout button.

The first step is to create a new app. Open [Android Studio](https://developer.android.com/studio) and create a new project. Select `Empty Activity`, name your project `Android-Session-Replays`, and use the defaults for everything else.

Then, replace your code in `MainActivity.kt` to set up a basic UI with a button to navigate to a new screen.

```kotlin file=MainActivity.kt
package com.example.android_session_replays

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.example.android_session_replays.ui.theme.AndroidSessionReplaysTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            AndroidSessionReplaysTheme {
                Surface(modifier = Modifier.fillMaxSize(), color = MaterialTheme.colorScheme.background) {
                    MyApp()
                }
            }
        }
    }
}

@Composable
fun MyApp() {
    val navController = rememberNavController()
    NavHost(navController = navController, startDestination = "login_screen") {
        composable("login_screen") {
            LoginScreen(navController)
        }
        composable("welcome_screen") {
            WelcomeScreen(navController)
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun LoginScreen(navController: NavController, modifier: Modifier = Modifier) {
    var email by remember { mutableStateOf("") }
    var password by remember { mutableStateOf("") }

    Column(
        modifier = modifier
            .fillMaxSize()
            .padding(16.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Text(text = "Login", style = MaterialTheme.typography.bodyLarge)
        OutlinedTextField(
            value = email,
            onValueChange = { email = it },
            label = { Text("Email") },
            modifier = Modifier.padding(vertical = 8.dp)
        )
        OutlinedTextField(
            value = password,
            onValueChange = { password = it },
            label = { Text("Password") },
            visualTransformation = PasswordVisualTransformation(),
            modifier = Modifier.padding(vertical = 8.dp)
        )
        Button(
            onClick = { navController.navigate("welcome_screen") },
            modifier = Modifier.padding(vertical = 8.dp)
        ) {
            Text("Login")
        }
    }
}

@Composable
fun WelcomeScreen(navController: NavController, modifier: Modifier = Modifier) {
    Surface(modifier = Modifier.fillMaxSize()) {
        Column(
            modifier = Modifier.fillMaxSize(),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center
        ) {
            Text(text = "Welcome!")
            Button(onClick = { navController.navigate("login_screen") }) {
                Text("Logout")
            }
        }
    }
}

@Preview(showBackground = true)
@Composable
fun DefaultPreview() {
    AndroidSessionReplaysTheme {
        MyApp()
    }
}
```

Make sure to add `implementation("androidx.navigation:navigation-compose:2.4.0")` to your `dependencies` in to `Gradle Scripts/build.gradle.kts (Module:app)` and sync your project with the Gradle files.

Our basic set up is now complete. Build and run your app to see it in action.

![Basic setup of the Android app]()

## 2. Add PostHog to your app

First, add the [PostHog Android SDK](/docs/libraries/android) as a dependency in your `Gradle Scripts/build.gradle.kts (Module: app)` file. You can find the latest version on our [GitHub](https://github.com/PostHog/posthog-android/blob/main/CHANGELOG.md). 

Note that session replays require SDK version `3.4.0` or higher.

```gradle_kotlin file=app/build.gradle
dependencies {
    implementation("com.posthog:posthog-android:3.+")
    //... other dependencies
}
```

Sync your project with your Gradle file changes.

Next, we create a Kotlin class where we can configure our PostHog instance. In the `src/main/java/com.example.android_session_replays` folder, add a new file `MySessionReplaysApplication.kt` and then add the following code:

```kotlin file=MySessionReplaysApplication.kt
package com.example.android_session_replays

import android.app.Application
import com.posthog.android.PostHogAndroid
import com.posthog.android.PostHogAndroidConfig

class MySessionReplaysApplication : Application() {
    companion object {
        private const val POSTHOG_API_KEY = "<ph_project_api_key>"
        private const val POSTHOG_HOST = "<ph_client_api_host>" // usually 'https://us.i.posthog.com' or 'https://eu.i.posthog.com'
    }

    override fun onCreate() {
        super.onCreate()
        val config = PostHogAndroidConfig(
            apiKey = POSTHOG_API_KEY,
            host = POSTHOG_HOST 
        ).apply {
            sessionReplay = true
            sessionReplayConfig.maskAllTextInputs = false // Whether all texts are masked or redacted (default is enabled)
            sessionReplayConfig.screenshot = true // required for JetPack Compose
        }
        PostHogAndroid.setup(this, config)
    }
}
```

To get your PostHog API key and host, [sign up to PostHog](https://us.posthog.com/signup). Then, you can find your API key and host in your [project settings](https://us.posthog.com/settings/project).

We now need to register our custom application class. Go to `app/manifests/AndroidManifest.xml` and add `android:name=".MySessionReplaysApplication"` within the `<application>` tag:

```XML file=app/manifests/AndroidManifest.xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools">
    <!-- ... rest of the config -->
    <application
        android:name=".MySessionReplaysApplication"
        <!-- ... rest of the config -->
    </application>
</manifest>
```

To check your setup, build and run your app a few times. Enter in any values in the textfields and click the **Log in** button. You should start session replays in the [Session replay tab](https://us.posthog.com/replay/recent) in PostHog 🎉

<ProductScreenshot
  imageLight={"https://res.cloudinary.com/dmukukwp6/image/upload/v1720608972/posthog.com/contents/Screenshot_2024-07-10_at_11.55.16_AM.png"} 
  imageDark={"https://res.cloudinary.com/dmukukwp6/image/upload/v1720608972/posthog.com/contents/Screenshot_2024-07-10_at_11.55.29_AM.png"} 
  alt="Android session replays in PostHog" 
  classes="rounded"
/>

## 3. (Optional) Mask sensitive data

Your replays may contain sensitive information. For example, if you're building a banking app you may not want to capture how much money a user has in their account.

To replace any type of `View` with a redacted version in the replay, set the [tag](https://developer.android.com/reference/android/view/View#tags) to `ph-no-capture`.

In the below code, we do this for the email and password fields:

```kotlin file=MainActivity.kt
// your existing imports
import androidx.compose.ui.platform.testTag

// your existing of your code

@Composable
fun WelcomeScreen(navController: NavController, modifier: Modifier = Modifier) {
    Surface(modifier = Modifier.fillMaxSize()) {
        Column(
            modifier = Modifier.fillMaxSize(),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center
        ) {
            Text(
                text = "Welcome!",
                modifier = Modifier.testTag("ph-no-capture") // Add this modifier to blur the text in replays
            )
            Button(onClick = { navController.navigate("login_screen") }) {
                Text("Logout")
            }
        }
    }
}

// rest of your existing code
```

Now the welcome messages shows up like this in replays:

<ProductScreenshot
  imageLight={""} 
  imageDark={""} 
  alt="Masking in Android session replay" 
  classes="rounded"
/>

## Further reading

- [How to run A/B tests in Android](/tutorials/android-ab-tests)
- [How to set up analytics in Android](/tutorials/android-analytics)
- [How to set up feature flags in Android](/tutorials/android-feature-flags)
