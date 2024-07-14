---
title: How to set up analytics in Go
date: 2024-02-21
author: ["lior-neu-ner"]
tags: ['product analytics']
---

import { ProductScreenshot } from 'components/ProductScreenshot'
import EventsInPostHogLight from '../images/tutorials/go-analytics/events-light.png'
import EventsInPostHogDark from '../images/tutorials/go-analytics/events-dark.png'
import InsightLight from '../images/tutorials/go-analytics/insight-light.png'
import InsightDark from '../images/tutorials/go-analytics/insight-dark.png'

[Product analytics](/product-analytics) enable you to gather and analyze data about how users interact with your Go app. To show you how to set up analytics, in this tutorial we create a basic Go app, add PostHog, and use it to [capture events](/docs/product-analytics/capture-events) and [create insights](/docs/product-analytics/insights).

## 1. Create a basic Go app

We start by creating a simple Go app that has two pages:

1. A `login` page where a user can enter their name, email, and company name in a form.
2. A `home` page that has some text and a button.

First, ensure [Go is installed](https://go.dev/doc/install). Then, create a new folder for our project called `go-analytics` and initialize a new module. We also create files `login.html` and `dashboard.html` for our pages, as well as a `main.go`:

```bash
mkdir go-analytics
cd go-analytics
go mod init go-analytics
touch login.html
touch dashboard.html
touch main.go
```

Then, add the basic layout for to our HTML files:

```html file=login.html
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
```

```html file=dashboard.html
<!DOCTYPE html>
<html>
<head>
    <title>Dashboard</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
</head>
<body>
    <h1>Welcome, {{.Name}} from {{.CompanyName}}!</h1>
    <form id="dashboardForm" action="/api/dashboard" method="POST">
        <input type="hidden" name="email" value="{{.Email}}">
        <input type="hidden" name="name" value="{{.Name}}">
        <input type="hidden" name="company_name" value="{{.CompanyName}}">
        <button type="submit">Click Me</button>
    </form>

    <script>
        $(document).ready(function() {
            $('#dashboardForm').on('submit', function(e) {
                e.preventDefault();
                $.ajax({
                    url: $(this).attr('action'),
                    type: 'POST',
                    data: $(this).serialize(),
                });
            });
        });
    </script>
</body>
</html>
```

Next, we install the [`gorilla/sessions`](https://github.com/gorilla/sessions) package to manage our sessions:

```bash
go get github.com/gorilla/sessions
```

Lastly, we set up `main.go` with all our route handling:

```go file=main.go
package main

import (
    "html/template"
    "net/http"
    "github.com/gorilla/sessions"
)

var (
    store = sessions.NewCookieStore([]byte("your-secret-key"))
    templates = template.Must(template.ParseGlob("*.html"))
)

func main() {
    http.HandleFunc("/", loginHandler)
    http.HandleFunc("/auth", authHandler)
    http.HandleFunc("/dashboard", dashboardHandler)
    http.HandleFunc("/api/dashboard", apiDashboardHandler)

    http.ListenAndServe(":8000", nil)
}

func loginHandler(w http.ResponseWriter, r *http.Request) {
    templates.ExecuteTemplate(w, "login.html", nil)
}

func authHandler(w http.ResponseWriter, r *http.Request) {
    session, _ := store.Get(r, "session-name")

    session.Values["email"] = r.FormValue("email")
    session.Values["name"] = r.FormValue("name")
    session.Values["company_name"] = r.FormValue("company_name")
    session.Save(r, w)

    http.Redirect(w, r, "/dashboard", http.StatusFound)
}

func dashboardHandler(w http.ResponseWriter, r *http.Request) {
    session, _ := store.Get(r, "session-name")
    data := map[string]interface{}{
        "Email": session.Values["email"],
        "Name": session.Values["name"],
        "CompanyName": session.Values["company_name"],
    }
    templates.ExecuteTemplate(w, "dashboard.html", data)
}

func apiDashboardHandler(w http.ResponseWriter, r *http.Request) {
    // This API is called when the button is pressed
    // We'll add code later in the tutorial
}
```

Run `go run main.go` and navigate to `http://localhost:8000` to see our app in action. Enter anything on the login page to save some session details.

![Basic Go app](../images/tutorials/go-analytics/basic-go-app.mp4)

## 2. Add PostHog to your app

With our app set up, it’s time to install and set up PostHog. If you don't have a PostHog instance, you can [sign up for free](https://us.posthog.com/signup).

Run `go get github.com/posthog/posthog-go` to add [PostHog's Go SDK](/docs/libraries/go) as a dependency. Then, initialize PostHog in the `main()` method in `main.go`.

To do this, you need your project API key and instance address from [your project settings](https://us.posthog.com/project/settings). You also need to [create a personal API key](https://us.posthog.com/settings/user-api-keys). Use these values to initialize your client using `posthog.NewWithConfig()`: 

```go file=main.go
package main

import (
	"html/template"
	"net/http"

	"github.com/gorilla/sessions"
	"github.com/posthog/posthog-go"
)

var (
    store = sessions.NewCookieStore([]byte("your-secret-key"))
    templates = template.Must(template.ParseGlob("*.html"))
    client posthog.Client // declare the PostHog client as a global variable
)

func main() {
     client, _ = posthog.NewWithConfig(
       "<ph_project_api_key>",
       posthog.Config{
           PersonalApiKey: "<ph_personal_api_key>",
           Endpoint: "<ph_instance_address>",
       },
     )
     defer client.Close()

    http.HandleFunc("/", loginHandler)
    http.HandleFunc("/auth", authHandler)
    http.HandleFunc("/dashboard", dashboardHandler)
    http.HandleFunc("/api/dashboard", apiDashboardHandler)

    http.ListenAndServe(":8000", nil)
}
```

With this set up, we're ready to capture events.

## 3. Implement the event capture code

To show how to capture events with PostHog, we capture an event when the button on the `dashboard` page is clicked. To do this, we call [`posthog.Capture`](/docs/libraries/go#capturing-events):

```go file=main.go
func apiDashboardHandler(w http.ResponseWriter, r *http.Request) {
    email := r.FormValue("email")
    client.Enqueue(posthog.Capture{
        DistinctId: email,
        Event:      "home_api_called",
    })
}
```

With this set up, refresh your app and click the button on the `dashboard` page a few times. You should now see the captured event in your [PostHog activity tab](https://us.posthog.com/events).

<ProductScreenshot
  imageLight={EventsInPostHogLight} 
  imageDark={EventsInPostHogDark} 
  alt="Events in PostHog" 
  classes="rounded"
/>

> 💡 **PostHog tip: Setting the correct `DistinctId`** 
> 
> When calling `posthog.Capture`, you need to provide a `DistinctId` argument. This is a unique identifier for your user and enables you to correctly attribute events to them. 
>
> For logged-in users, you typically use their email or database ID. For logged-out or anonymous users, you should use a unique identifier, either generated by you or the PostHog [JavaScript web library](/docs/libraries/js) (which can then be accessed in the cookies. See an example of accessing the PostHog cookie in our [Nuxt tutorial](/tutorials/nuxtjs-ab-tests#server-side-rendering)).

### Setting event properties

When capturing events, you can optionally include additional information by setting the `properties` argument. This is helpful for breaking down or filtering events when creating [insights](/docs/product-analytics/insights).

As an example, we can add the user's name as an event property:

```go file=main.go
func apiDashboardHandler(w http.ResponseWriter, r *http.Request) {
    email := r.FormValue("email")
    name := r.FormValue("name")
    client.Enqueue(posthog.Capture{
        DistinctId: email,
        Event:      "home_api_called",
        Properties: posthog.NewProperties().
            Set("user_name", name),
    })
}
```

### Capturing group events

[Groups](/docs/product-analytics/group-analytics) are a powerful feature in PostHog that aggregate events based on entities, such as organizations or companies. This is especially helpful for B2B SaaS apps, where often you want to view insights such as `number of active companies` or `company churn rate`.

To enable group analytics, you'll need to [upgrade](https://us.posthog.com/organization/billing) your PostHog account to include them. This requires entering your credit card, but don't worry, we have a [generous free tier](/pricing) of 1 million events per month – so you won't be charged anything yet.

To create groups in PostHog, simply include them in your code when capturing events by setting the `$groups` argument:

```go file=main.go
func apiDashboardHandler(w http.ResponseWriter, r *http.Request) {
    email := r.FormValue("email")
    name := r.FormValue("name")
    companyName := r.FormValue("company_name")
    client.Enqueue(posthog.Capture{
        DistinctId: email,
        Event:      "home_api_called",
        Properties: posthog.NewProperties().
            Set("user_name", name),
        Groups: posthog.NewGroups().
            Set("company", companyName),
    })
}
```

In the above example, we create a group type `company`, and then set the value as the unique identifier for that specific company. This enables us to breakdown insights by company (we show you how to do this in the next section).

## 4. Create an insight in PostHog

Restart your app and capture events using different inputs in the `login` page. This will capture events for different users and companies and enable us to show the power of PostHog insights.

Next, go to the [Product analytics](https://us.posthog.com/insights) tab in PostHog and click the **+ New insight** button. PostHog supports many different types of insights, such as [trends](/docs/user-guides/trends), [funnels](/docs/user-guides/funnels), [paths](/docs/user-guides/paths) and more.

In this tutorial, we create a simple trend insight:

1. Select the **Trends** tab.
2. Under the **Series** header select the `home_api_called` event. 
3. Click the **Total count** dropdown to change how events are aggregated. You can choose options such as `Count per user`, `Unique users`, `Unique company(s)`, and more. You can also add filters or breakdown based on properties. 

For example, in the image below we set our insight to show number of unique users that captured the `home_api_called` event where the `user_name` property is equal to `Max`:

<ProductScreenshot
  imageLight={InsightLight} 
  imageDark={InsightDark} 
  alt="Insight created in PostHog" 
  classes="rounded"
/>

That's it! Feel free to play around in your dashboard and explore the different kinds of insights you can create in PostHog.

## Further reading

- [How to set up feature flags in Go](/tutorials/go-feature-flags)
- [How to set up A/B tests in Go](/tutorials/go-ab-tests)
- [What to do after installing PostHog](/tutorials/next-steps-after-installing)
