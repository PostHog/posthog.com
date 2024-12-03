---
title: How to set up Android session replay
date: 2024-08-01
author:
  - lior-neu-ner
tags:
  - session replay
---

[Session replay](/session-replay) is a useful support tool for understanding how users are interacting with your Android app. It also helps you debug and recreate issues. 
To show how you to set it up with PostHog, this tutorial shows you how to create a basic Kotlin app, add PostHog, and [enable session recordings](/docs/session-replay/mobile#android).

## 1. Create a basic Android app

Our sample app will have two screens:

- The first screen is a `login` screen with email and password text fields.
- The second screen is a simple screen with welcome text and logout button.

The first step is to create a new app. Open [Android Studio](https://developer.android.com/studio) and create a new project. Select `No Activity`, name your project `Android-Session-Replays`, and use the defaults for everything else.

Then, navigate to the `res` directory and create a new directory `layout` in it. In `res/layout`, create two new layout resource files `activity_login.xml` and `activity_welcome.xml`. Add the following code to each file:

```xml file=activity_login.xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:padding="16dp">

    <EditText
        android:id="@+id/email"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:hint="Email" />

    <EditText
        android:id="@+id/password"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:hint="Password"
        android:inputType="textPassword" />

    <Button
        android:id="@+id/loginButton"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="Login" />

</LinearLayout>
```

```xml file=activity_welcome.xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:padding="16dp">

    <TextView
        android:id="@+id/welcomeText"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="Welcome!"
        android:textSize="24sp"
        android:gravity="center" />

    <Button
        android:id="@+id/logoutButton"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="Logout" />

</LinearLayout>
```

Next, we create our activities. In `java/com.example.android_session_replays`, create two new Kotlin files `LoginActivity.kt` and `WelcomeActivity.kt`. Add the following code to each file:

```kotlin file=LoginActivity.kt
package com.example.android_session_replays

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import androidx.appcompat.app.AppCompatActivity

class LoginActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)

        val email = findViewById<EditText>(R.id.email)
        val password = findViewById<EditText>(R.id.password)
        val loginButton = findViewById<Button>(R.id.loginButton)

        loginButton.setOnClickListener {
            val intent = Intent(this, WelcomeActivity::class.java)
            startActivity(intent)
            finish()
        }
    }
}
```

```kotlin file=WelcomeActivity.kt
package com.example.android_session_replays

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import androidx.appcompat.app.AppCompatActivity

class WelcomeActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_welcome)

        val logoutButton = findViewById<Button>(R.id.logoutButton)

        logoutButton.setOnClickListener {
            val intent = Intent(this, LoginActivity::class.java)
            startActivity(intent)
            finish()
        }
    }
}
```

Lastly, go to the `manifests` directory and add your new activities to `AndroidManifest.xml`:

```xml file=AndroidManifest.xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools">

    <application
        android:allowBackup="true"
        android:dataExtractionRules="@xml/data_extraction_rules"
        android:fullBackupContent="@xml/backup_rules"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.AndroidSessionReplays"
        tools:targetApi="31">
        <activity android:name=".WelcomeActivity"
            android:exported="true"/>
        <activity android:name=".LoginActivity"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>

</manifest>
```

Our basic set up is now complete. Build and run your app to see it in action.

![Basic setup of the Android app](https://res.cloudinary.com/dmukukwp6/video/upload/v1722266060/posthog.com/contents/android-sample-app.mp4)

## 2. Add PostHog to your app

First, add the [PostHog Android SDK](/docs/libraries/android) as a dependency in your `Gradle Scripts/build.gradle.kts (Module: app)` file. You can find the latest version on our [GitHub](https://github.com/PostHog/posthog-android/blob/main/CHANGELOG.md). 

**Note:** Session replay requires SDK version `3.4.0` or higher.

```gradle_kotlin file=app/build.gradle
dependencies {
    implementation("com.posthog:posthog-android:3.+")
    //... other dependencies
}
```

Sync your project with your Gradle file changes.

Next, we create a Kotlin class where we can configure our PostHog instance. In the `java/com.example.android_session_replays` directory, add a new file `MySessionReplaysApplication.kt` and then add the following code:

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
            sessionReplayConfig.maskAllTextInputs = false // Whether all text and text input fields are masked or redacted (default is enabled)
            sessionReplayConfig.screenshot = true
        }
        PostHogAndroid.setup(this, config)
    }
}
```

To get your PostHog API key and host, [sign up for PostHog](https://us.posthog.com/signup). Then, you can find your API key and host in your [project settings](https://us.posthog.com/settings/project).

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

To check your setup, build and run your app a few times. Enter in any values in the text fields and click the **Log in** button. You should start session replays in the [session replay tab](https://us.posthog.com/replay/recent) in PostHog 🎉.

<ProductScreenshot
  imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/v1722266411/posthog.com/contents/Screenshot_2024-07-29_at_4.19.27_PM.png"
  imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/v1722266410/posthog.com/contents/Screenshot_2024-07-29_at_4.19.59_PM.png"
  alt="Android session replays in PostHog" 
  classes="rounded"
/>

## 3. (Optional) Mask sensitive data

Your replays may contain sensitive information. For example, if you're building a banking app you may not want to capture how much money a user has in their account. PostHog tries to automatically mask sensitive data (like the password text field), but sometimes you need to do it manually.

To replace any type of `View` with a redacted version in the replay, set the [tag](https://developer.android.com/reference/android/view/View#tags) to `ph-no-capture`.

The example below illustrates how to do this for the **Welcome** text in the second screen:

```xml file=activity_welcome.xml
<!-- rest of your XML -->
    <TextView
        android:tag="ph-no-capture"
<!-- rest of your XML -->
```

Now, the welcome messages shows up in replays like this:

<ProductScreenshot
  imageLight={"https://res.cloudinary.com/dmukukwp6/image/upload/v1722329155/posthog.com/contents/Screenshot_2024-07-30_at_9.45.16_AM.png"} 
  imageDark={"https://res.cloudinary.com/dmukukwp6/image/upload/v1722329155/posthog.com/contents/Screenshot_2024-07-30_at_9.45.28_AM.png"} 
  alt="Masking in Android session replay" 
  classes="rounded"
/>

## Further reading

- [How to run A/B tests in Android](/tutorials/android-ab-tests)
- [How to set up analytics in Android](/tutorials/android-analytics)
- [How to set up feature flags in Android](/tutorials/android-feature-flags)

<NewsletterForm />