---
title: How to set up .NET analytics
date: 2025-02-11
author:
 - ian-vanagas
tags:
 - product analytics
---

.NET is one of the most powerful and diverse programming platforms. It used to build web apps, microservices, mobile apps, and even games. 

No matter what you are building, you’ll want to track how people are using it and find areas to improve. PostHog and its suite of tools like product analytics work perfectly for this.

In this tutorial, we show you how to create a basic .NET web API, add PostHog, and capture data into PostHog.

## Creating our .NET web API

After ensuring you have the [.NET SDK](https://dotnet.microsoft.com/en-us/download) installed, create a new Web API named `PostHogTutorial`:

```bash
dotnet new webapi -o PostHogTutorial
```

We’ll modify the basic app by adding an email parameter to the get `weatherforecast` request. This helps us showcase the features of PostHog better. 

To do this, go to `Program.cs` and add the `email` parameter as well as a check for the email. Your modified code should look like this:

```csharp
// Program.cs
// ... existing code

var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapGet("/weatherforecast", (string? email) =>
{
    if (string.IsNullOrEmpty(email))
    {
        return Results.BadRequest("Please include an email parameter in your request");
    }

    var forecast = Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();
    return Results.Ok(forecast);
})
.WithName("GetWeatherForecast");

// ... existing code
```

Once you’re ready, run `dotnet build` and then `dotnet run` and then go to `http://localhost:<port>/weatherforecast?email=your@email.com` to see your app in action (the port is randomly assigned).

![App is running](https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_02_10_at_14_47_14_ff3061b671.png)

## Adding PostHog to our .NET app

Now that we have a basic app up and running, we can set up PostHog. Start by installing the [PostHog .NET SDK](/docs/libraries/dotnet):

```bash
dotnet add package PostHog.AspNetCore --prerelease
```

Next, update your `appsettings.json` to include your project API key and host, both of which you can get from [your project settings](https://us.posthog.com/settings/project):

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*",
  "PostHog": {
    "ProjectApiKey": "<ph_project_api_key>",
    "Host": "<ph_client_api_host>"
  }
}
```

Now, PostHog is ready to use in your app.

## Capturing an event with PostHog

With PostHog installed and ready to go, we just need to go to `Program.cs` to set up an event capture.

In `Program.cs`, register the PostHog and `HttpContextAccessor` services to your app in `Program.cs`, inject PostHog into the route handler, and then use it to capture a `forecasted weather` event when someone makes a weather forecast request. We’ll also use `$set` to set the [person property](/docs/product-analytics/person-properties) with the on the person. This makes it easier to filter for events based on email later.

Altogether, this looks like this:

```csharp
// Program.cs
using PostHog;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();
builder.Services.AddHttpContextAccessor();
builder.AddPostHog();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapGet("/weatherforecast", (string? email, IPostHogClient postHogClient) =>
{
    if (string.IsNullOrEmpty(email))
    {
        return Results.BadRequest("Please include an email parameter in your request");
    }

    var forecast = Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();

    postHogClient.Capture(
        distinctId: email,
        eventName: "forecasted weather",
        properties: new Dictionary<string, object>
        {
            ["$set"] = new Dictionary<string, object>
            {
                ["email"] = email
            }
        });

    return Results.Ok(forecast);
})
.WithName("GetWeatherForecast");

// ... rest of your code
```

Now, run `dotnet build` and `dotnet run` again and head to `http://localhost:<port>/weatherforecast?email=your@email.com`. After a few moments, you’ll see a `forecasted weather` event captured in PostHog.

<ProductScreenshot
  imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_02_11_at_16_14_04_2x_8d664db28a.png"
  imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_02_11_at_16_14_22_2x_c035112ce3.png"
  alt="PostHog"
  classes="rounded"
/>

From here, you can set up other features like [group analytics](/docs/libraries/dotnet#group-analytics), [feature flags](/docs/libraries/dotnet#feature-flags), or [experiments](/docs/libraries/dotnet#experiments-ab-tests).