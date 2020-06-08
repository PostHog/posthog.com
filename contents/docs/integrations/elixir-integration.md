---
title: Elixir integration
sidebar: Docs
showTitle: true
---

This library provides an Elixir HTTP client for Posthog. [See the repository](https://github.com/whitepaperclip/posthog) for more information.

## Installation

The package can be installed by adding `posthog` to your list of dependencies in `mix.exs`:

```elixir
def deps do
  [
    {:posthog, "~> 0.1"}
  ]
end
```

## Configuration

```elixir
config :posthog,
  api_url: "http://posthog.example.com",
  api_key: "..."
```

Optionally, you can pass in a `:json_library` key. The default JSON parser is Jason.

## Usage

Capturing events:

```elixir
Posthog.capture("login", distinct_id: user.id)
```

Capturing multiple events:

```elixir
Posthog.batch([{"login", [distinct_id: user.id], nil}])
```

## Thanks

Thanks to [whitepaperclip](https://github.com/whitepaperclip) for contributing this library.