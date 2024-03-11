---
title: How to set up analytics in Rust
date: 2024-02-27T00:00:00.000Z
author:
  - lior-neu-ner
tags:
  - product analytics
---

import { ProductScreenshot } from 'components/ProductScreenshot'
export const EventsInPostHogLight = "https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/tutorials/rust-analytics/events-light.png"
export const EventsInPostHogDark = "https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/tutorials/rust-analytics/events-dark.png"
export const InsightLight = "https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/tutorials/rust-analytics/insight-light.png"
export const InsightDark = "https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/tutorials/rust-analytics/insight-dark.png"

[Product analytics](/product-analytics) enable you to gather and analyze data about how users interact with your Rust app. To show you how to set up analytics, in this tutorial we create a basic Rust app, add PostHog, and use it to [capture events](/docs/product-analytics/capture-events) and [create insights](/docs/product-analytics/insights).

## 1. Create a basic Rust app

We start by creating a simple Rust app that has two pages:

1. A `login` page where a user can enter their name, email, and company name in a form.
2. A `dashboard` page that has some text and a button.

First, ensure [Rust](https://www.rust-lang.org/learn/get-started) is installed. Then create a new project:

```bash
cargo new rust_analytics
cd rust_analytics
```

Add the following dependencies to your `Cargo.toml`:

```rust file=Cargo.toml
[package]
name = "rust_analytics"
version = "0.1.0"
edition = "2021"

# See more keys and their definitions at https://doc.rust-lang.org/cargo/reference/manifest.html

[dependencies]
actix-web = "4"
actix-session = "0.5"
serde = { version = "1.0", features = ["derive"] }
tokio = { version = "1", features = ["full"] }
```

Then, we set up our routes and HTML pages. Replace the code in `src/main.rs` with the following:

```rust file=main.rs
use actix_session::{CookieSession, Session};
use actix_web::{web, App, HttpResponse, HttpServer, Responder, http::header};
use serde::Deserialize;

async fn login_form() -> impl Responder {
    HttpResponse::Ok().content_type("text/html").body(
        r#"
        <!DOCTYPE html>
        <html>
        <head>
            <title>Login</title>
            <style>
                label, input, button {
                    display: block;
                    margin-bottom: 10px;
                }
            </style>
        </head>
        <body>
            <form action="/auth" method="POST">
                <label for="name">Name:</label>
                <input type="text" name="name" required>

                <label for="email">Email:</label>
                <input type="email" name="email" required>

                <label for="company_name">Company Name:</label>
                <input type="text" name="company_name" required>

                <button type="submit">Log in</button>
            </form>
        </body>
        </html>
        "#,
    )
}

async fn dashboard(session: Session) -> impl Responder {
    if let Some(name) = session.get::<String>("name").unwrap() {
        let company_name = session.get::<String>("company_name").unwrap().unwrap_or_default();
        HttpResponse::Ok().content_type("text/html").body(format!(
            r#"
            <!DOCTYPE html>
            <html>
            <head>
                <title>Dashboard</title>
                <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
                <script>
                $(document).ready(function() {{
                    $('#dashboardForm').on('submit', function(e) {{
                        e.preventDefault();
                        $.ajax({{
                            url: '/api/dashboard',
                            type: 'POST',
                        }});
                    }});
                }});
                </script>
            </head>
            <body>
                <h1>Welcome, {} from {}!</h1>

                <form id="dashboardForm" method="POST">
                    <button type="submit">Click Me</button>
                </form>
            </body>
            </html>
            "#,
            name, company_name
        ))
    } else {
        HttpResponse::Found().append_header((header::LOCATION, "/")).finish()
    }
}


#[derive(Deserialize)]
struct AuthData {
    name: String,
    email: String,
    company_name: String,
}

async fn authenticate(form: web::Form<AuthData>, session: Session) -> impl Responder {
    session.insert("name", &form.name).unwrap();
    session.insert("company_name", &form.company_name).unwrap();
    session.insert("email", &form.email).unwrap();

    HttpResponse::Found().append_header((header::LOCATION, "/dashboard")).finish()
}

async fn api_dashboard() -> impl Responder {
    // We'll update this code later
    HttpResponse::Ok().body("API endpoint reached")
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .wrap(CookieSession::signed(&[0; 32]).secure(false))
            .route("/", web::get().to(login_form))
            .route("/dashboard", web::get().to(dashboard))
            .route("/auth", web::post().to(authenticate))
            .route("/api/dashboard", web::post().to(api_dashboard))
    })
    .bind("127.0.0.1:8000")?
    .run()
    .await
}
```

Run `cargo run` and navigate to `http://localhost:8000` to see our app in action. Enter anything on the login page to save some session details.

![Basic Rust app](https://res.cloudinary.com/dmukukwp6/video/upload/v1710055416/posthog.com/contents/images/tutorials/rust-analytics/basic-rust-app.mp4)

## 2. Add PostHog to your app

With our app set up, it’s time to install and set up PostHog. If you don't have a PostHog instance, you can [sign up for free](https://us.posthog.com/signup). Make sure you sign for `us.posthog.com` and not `eu.posthog.com` as currently our Rust SDK only supports the US cloud. 

Add `posthog-rs`  to your `Cargo.toml` to install [PostHog's Rust SDK](/docs/libraries/rust):

```rust file=Cargo.toml
# rest of config

[dependencies]
posthog-rs = "0.2.0"

# rest of config
```

With this set up, we're ready to capture events.

## 3. Implement the event capture code

To show how to capture events with PostHog, we capture an event when the button on the `dashboard` page is clicked. To do this, we call [`posthog.capture()`](/docs/libraries/rust#capturing-events).

First, import `posthog_rs::Event` at the top of `main.rs`. We also need to import `tokio::task` to convert our asynchronous capture request to synchronous:

```rust file=main.rs
// other imports
use posthog_rs::Event;
use tokio::task;
```

Then update our `api_dashboard()` function to initialize a PostHog client and capture an event. You'll need your project API key for this, which you can find in [your project settings](https://us.posthog.com/project/settings):

```rust file=main.rs
async fn api_dashboard(session: Session) -> impl Responder {
    if let Some(user_email) = session.get::<String>("email").unwrap() {
        let _result = task::spawn_blocking(move || {
            let client: posthog_rs::Client = posthog_rs::client("<ph_project_api_key>");
            let event = Event::new("dashboard_api_called", &user_email);
            client.capture(event).unwrap();
        }).await;
    }
    HttpResponse::Ok().body("API endpoint reached")
}
```

With this set up, re-run your app and click the button on the `dashboard` page a few times. You should now see the captured event in your [PostHog activity tab](https://us.posthog.com/events).

<ProductScreenshot
  imageLight={EventsInPostHogLight} 
  imageDark={EventsInPostHogDark} 
  alt="Events in PostHog" 
  classes="rounded"
/>

> 💡 **PostHog tip: Setting the correct `distinct_id`** 
> 
> When calling `posthog.capture()`, you need to provide a `distinct_id` argument in your event. This is a unique identifier for your user and enables you to correctly attribute events to them. 
>
> For logged-in users, you typically use their email or database ID. For logged-out or anonymous users, you should use a unique identifier, either generated by you or the PostHog [JavaScript web library](/docs/libraries/js) (which can then be accessed in the cookies. See an example of accessing the PostHog cookie in our [Nuxt tutorial](/tutorials/nuxtjs-ab-tests#server-side-rendering)).

### Setting event properties

When capturing events, you can optionally include additional information by setting the `properties` argument. This is helpful for breaking down or filtering events when creating [insights](/docs/product-analytics/insights).

As an example, we add the user's name as an event property:

```rust file=main.rs
async fn api_dashboard(session: Session) -> impl Responder {
    if let (Some(user_email), Some(user_name)) = (
        session.get::<String>("email").unwrap(),
        session.get::<String>("name").unwrap()
    ) {
        let _result = task::spawn_blocking(move || {
            let client: posthog_rs::Client = posthog_rs::client("<ph_project_api_key>");
            let mut event = Event::new("dashboard_api_called", &user_email);
            event.insert_prop("user_name", user_name).unwrap();
            client.capture(event).unwrap();
        }).await;
    }
    HttpResponse::Ok().body("API endpoint reached")
}
```

## 4. Create an insight in PostHog

Restart your app and capture events using different inputs in the `login` page. This will capture events for different users and enable us to show the power of PostHog insights.

Next, go to the [Product analytics](https://us.posthog.com/insights) tab in PostHog and click the **+ New insight** button. PostHog supports many different types of insights, such as [trends](/docs/user-guides/trends), [funnels](/docs/user-guides/funnels), [paths](/docs/user-guides/paths) and more.

In this tutorial, we create a simple trend insight:

1. Select the **Trends** tab.
2. Under the **Series** header select the `dashboard_api_called` event. 
3. Click the **Total count** dropdown to change how events are aggregated. You can choose options such as `Count per user`, `Unique users`, and more. You can also add filters or breakdown based on properties. 

For example, in the image below we set our insight to show the total count of events `dashboard_api_called` events where the `user_name` property is equal to `Max Hedgehog`:

<ProductScreenshot
  imageLight={InsightLight} 
  imageDark={InsightDark} 
  alt="Insight created in PostHog" 
  classes="rounded"
/>

That's it! Feel free to play around in your dashboard and explore the different kinds of insights you can create in PostHog.

## Further reading

- [Using the PostHog API to capture events](/tutorials/api-capture-events)
- [How to use the PostHog API to get insights and persons](/tutorials/api-get-insights-persons)
- [What to do after installing PostHog in 5 steps](/tutorials/next-steps-after-installing)
