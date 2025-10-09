---
title: AI Platform
sidebar: Handbook
showTitle: true
---

## Overview

Almost every team at PostHog either is, or needs to, build AI features. We've adopted a platform approach so that we can reuse work when everyone contributes towards our AI capabilities. Just like how we shipped HogQL instead of everyone writing their own queries, we want to avoid having multiple teams reinvent AI infrastructure. This allows us to maintain consistency across our products and avoid "death by random AI widgets."

The AI platform consists of several user-facing products (Max, Deep Research, Session Summaries, MCP, Array, and Wizard), a shared agent architecture, and a system of agent "modes" that allow teams to add domain-specific AI capabilities. These components work together to provide AI functionality across PostHog's ecosystem.

## User-Facing Products

### Max: Our in-app agent [Beta]

Max is PostHog's primary in-app agent, accessible through a chat interface embedded directly into the product. Think of Max as a fundamentally different way to interact with PostHog — instead of clicking buttons and filling out forms, you ask questions and make requests in natural language.

**The Problem We're Solving**

PostHog has grown incredibly powerful, but that power comes with complexity. New users face a learning curve: Which insight type should I use? How do I filter for the data I need? What's the right SQL syntax for this query? Even experienced users spend time navigating through menus and forms to accomplish what they already know they want to do.

Max eliminates this friction. You don't need to know where a feature lives or how to configure it — you just describe what you want, and Max handles the details.

**Who Uses Max**

Everyone. Max is designed to be useful whether you're:
- A new user learning PostHog for the first time (Max explains terminology and walks you through setup)
- An engineer who knows exactly what they want and just wants to say it instead of clicking through the UI
- A product manager who wants quick answers without learning technical details
- A data analyst who needs to write complex SQL queries with help

**How It Works**

Max is built on a single-loop agent architecture with dynamic mode switching. When you send a message, Max analyzes your request, determines which specialized "modes" it needs to activate, and dynamically loads the appropriate tools and expertise. For example, if you ask Max to "create a funnel tracking the signup flow," it might:

1. Use the `read_taxonomy` tool to check which events actually exist
2. Switch to Analytics mode to access insight creation tools
3. Switch to SQL mode if you need custom transformations
4. Switch to CDP mode if you want to set up a destination based on the funnel results

Throughout this entire process, Max maintains full context — it can see all previous messages, all decisions it's made, and all tools it's used. This is fundamentally different from older architectures we implemented where specialized sub-agents worked in isolation.

For a technical deep dive on how this works, see the ["Max, how does it work?"](#max-how-does-it-work) section below.

**Key Capabilities**

Max can do most things you can do through the PostHog UI:

- **Search and filter**: Find insights, filter session recordings, search documentation
- **Create and modify**: Build dashboards, create insights, set up surveys
- **Write SQL**: Generate and debug HogQL queries for custom analysis
- **Learn PostHog**: Ask how features work, get recommendations on best practices, understand terminology
- **Work with data**: Read your taxonomy (events, properties, actions), check database schema, access billing information

Max is powered by Inkeep for documentation search, which means it can pull from PostHog's entire doc library to answer questions about how to use the platform.

**Pricing**

Max is free (with reasonable caps for non-subscribers). See [Pricing and Product Positioning](#pricing-and-product-positioning) for our full pricing philosophy.

**Current Status & Ownership**

Max is currently in beta as we migrate to the new single-loop architecture. Early results show significant improvements in reliability and capability, but we're still ironing out edge cases before moving to general availability.

The Max AI team owns the architecture, performance, and UX/UI of Max. Product teams are responsible for adding their product-specific tools and capabilities, with the Max AI team providing reviews and guidance (see [Team Structure](#team-structure-and-collaboration) for details on collaboration).

### Deep Research [Under development]

Deep Research is Max's bigger sibling — where Max gives you quick answers, Deep Research digs deep to understand complex, open-ended problems.

**The Problem We're Solving**

Product analytics often requires real investigative work. You don't just want to know "what's my conversion rate?" — you want to understand *why* it's dropping, *which* user segments are affected, *where* in the flow they're getting stuck, and *what* patterns exist across multiple data sources. This kind of research is time-consuming. You might spend hours jumping between dashboards, filtering recordings, cross-referencing error logs, and synthesizing findings.

Deep Research automates this investigative work. It can spend minutes or hours (depending on complexity) systematically exploring your data, following leads, and producing a comprehensive research report that would take a human analyst half a day or more.

**Who Uses Deep Research**

Deep Research is designed for anyone who needs to understand complex problems:
- Founders trying to understand why growth is stalling
- Engineers debugging issues that span multiple systems
- Product managers investigating why a feature isn't performing
- Data analysts exploring patterns across customer segments

If you have a vague question that requires digging through multiple data sources to answer, Deep Research is the right tool.

**How It Works: Test-Time Diffusion**

Deep Research's architecture is based on Google's [test-time diffusion researcher framework](https://research.google/blog/deep-researcher-with-test-time-diffusion/). Here's the high-level flow:

1. **Input**: You either start with a templated research notebook (for common research patterns) or describe your question and Deep Research generates a custom notebook structure.

2. **Parallel initialization**: Deep Research simultaneously creates a draft report (outlining what it expects to find) and a research plan (what questions to investigate).

3. **Iterative research**: The agent systematically investigates each part of the research plan. It might filter session recordings, run analytics queries, check error logs, compare cohorts, and more. Each investigation adds findings to the draft report.

4. **Denoising**: As research progresses, Deep Research "denoises" the draft report — removing speculative parts that turned out to be wrong, strengthening findings that are supported by data, and identifying new questions to investigate.

5. **Loop**: Research continues until the draft report is fully denoised — meaning all sections are supported by actual findings rather than speculation.

6. **Final report**: Once complete, you get a structured notebook with the findings, including embedded session recordings, charts, and data that support each conclusion.

**Architecture Diagram**

```mermaid
graph TB

    Input[User Question] --> DraftReport[Draft report<br/>with speculative findings]
    Input[User Question] --> ResearchPlan[Research Plan<br/>with questions to investigate]

    ResearchPlan --> Investigate[Iterative Investigation]

    subgraph Investigation
        Investigate --> Sessions[Session Summaries]
        Investigate --> Analytics[Run Analytics<br/>Queries]
        Investigate --> Errors[Check Error<br/>Logs]
        Investigate --> Cohorts[Compare<br/>Cohorts]
    end

    Sessions --> Findings[Add Findings to<br/>Draft Report]
    Analytics --> Findings
    Errors --> Findings
    Cohorts --> Findings

    Findings --> Denoise[Denoising Process]

    subgraph Denoising
        Denoise --> Remove[Remove speculative<br/>parts that are wrong]
        Denoise --> Strengthen[Strengthen findings<br/>with data support]
        Denoise --> NewQ[Identify new<br/>questions]
    end

    NewQ --> |Add to plan| ResearchPlan

    Remove --> Check{Report fully<br/>denoised?}
    Strengthen --> Check

    Check --> |No| Investigate
    Check --> |Yes| Final[Final Notebook Report<br/>with embedded recordings,<br/>charts, and data]

    DraftReport -.->|Continuously updated| Denoise
```

**Why Notebooks?**

Notebooks are the perfect format for research because they combine narrative explanation with data visualization. You can see not just the conclusions ("conversion drops 40% at the payment step") but the evidence (charts showing the drop, session recordings showing users struggling, error logs showing timeouts).

We're building customizable notebook templates similar to what [Granola](https://help.granola.ai/article/customise-notes-with-templates) does. You'll be able to pick a template or modify one ahead of time, so research results come back in exactly the format you need. This is especially useful for recurring research tasks where you want consistency.

**Key Differences from Max**

While both Max and Deep Research can answer questions about your data, they're optimized for different use cases:

- **Max** is fast (seconds to minutes), conversational, and best for specific questions with clear answers
- **Deep Research** is thorough (minutes to hours), systematic, and best for open-ended problems that require synthesizing multiple data sources

Think of Max as your coworker who can quickly pull up data, and Deep Research as the analyst who will spend the afternoon really digging into a problem.

**Access and Pricing**

Access Deep Research by toggling "Research" mode in Max, or via the dedicated Deep Research UI. It's a paid feature with a generous free tier (see [Pricing](#pricing-and-product-positioning)).

**Current Status & Ownership**

Deep Research is under active development. The Max AI team owns Deep Research. The architecture is implemented but we're still refining the research strategies and denoising algorithms. Early results show it can find patterns and insights that human analysts miss, but it occasionally goes down rabbit holes or misinterprets data — we're working on improving these edge cases.

### Session Summaries [Alpha]

Session Summaries solves a specific but painful problem: you have dozens or hundreds of session recordings, and you don't have time to watch them all. Instead of spending hours scanning through recordings one by one, Session Summaries analyzes them all at once and gives you a structured report of what it found.

**The Problem We're Solving**

Session recordings are incredibly valuable — they show you exactly what users are experiencing. But they're also time-consuming to review. If you have 100 recordings from users reporting checkout issues, do you really want to watch all 100? Most people watch a few, spot some patterns, and hope they caught the important stuff. This means you miss edge cases, low-frequency issues, and patterns that only emerge across many sessions.

Session Summaries changes this calculus. You can analyze hundreds of recordings in minutes, with confidence that you're seeing all the significant patterns, not just the ones that happened to appear in the first few recordings you watched.

**Who Uses Session Summaries**

Session Summaries is designed for anyone who needs to understand patterns across multiple user sessions:
- Engineers debugging problems that only some users experience
- Product managers investigating UX issues
- Customer success teams diagnosing why users are struggling
- Researchers trying to understand how different cohorts use a feature

If you find yourself thinking "I need to watch a bunch of recordings to understand this," Session Summaries is the right tool.

**How It Works**

You can trigger Session Summaries in three ways:
1. Ask Max directly: "Summarize the last 50 sessions from company X"
2. Trigger Session Summaries from the Session Replay UI or from other products
3. Let Deep Research invoke it as part of a larger investigation

Here's what happens under the hood:

1. **Collection**: Session Summaries retrieves all the recordings matching your criteria (time range, company, feature area, etc.)

2. **Analysis**: An AI agent "watches" a session recording (right now, analyzing the stream of metadata, and soon enough, by watching video clips), noting significant events: errors, timeouts, rage clicks, confusion indicators (rapid back-and-forth navigation), unexpected user paths, and other behavioral signals.

3. **Clustering**: Instead of giving you 50 individual summaries, Session Summaries clusters similar issues together. For example, if 15 users all experience timeout errors at checkout, these get grouped into a single issue: "Timeout errors during payment processing (affects 15/50 users)."

4. **Report generation**: You get a notebook with:
   - Issue clusters ranked by frequency and severity
   - Representative video clips showing each issue
   - Context about which users/cohorts are affected
   - Patterns that might not be obvious from individual sessions

**What Session Summaries Finds**

Currently, Session Summaries is trained to identify:
- **Errors**: JavaScript errors, failed API calls, broken images
- **Timeouts**: Long loading states, hanging requests
- **Frustration signals**: Rage clicks, rapid refreshes, abandonment
- **UX issues**: Confusing flows, unexpected navigation patterns
- **Performance problems**: Slow page loads, laggy interactions

**Future Capabilities**

We're expanding Session Summaries beyond just finding problems. Future capabilities include:

- **Creative usage patterns**: "Show me where users are using the product in ways we didn't expect"
- **Workarounds**: "Find sessions where users had to work around a limitation"
- **Feature discovery**: "Which features do power users rely on that casual users don't know about?"
- **Delight moments**: "Find sessions where users had a particularly smooth experience"

The underlying technology is the same — watch many recordings, find patterns, cluster similar behaviors — but the training and prompts can be tuned for different objectives.

**Access and Pricing**

Access Session Summaries through Max, Deep Research, or its dedicated UI entry points. It's a paid feature with a generous free tier (see [Pricing](#pricing-and-product-positioning)).

**Current Status & Ownership**

Session Summaries is in alpha. The Max AI team owns Session Summaries. It's working well for error and frustration detection, and early users report finding issues they would have missed. We're refining the clustering algorithms (sometimes it groups issues too broadly or too narrowly) and integrating video and GIF analysis to support findings with visual confirmation.

### Array: PostHog in action [Under development]

Array is our most ambitious bet: a desktop agent that automatically turns PostHog data into shipped code. The vision is to free product engineers from distractions so they can focus on what they love — building great features — by automating all the chores that eat up their day.

**The Problem We're Solving**

Today, product engineers spend most of their day managing random inputs: Slack messages, GitHub notifications, tickets, emails, and alerts from various monitoring tools. This work is essential but time-consuming. Experienced AI-native engineers have already evolved a workaround — they practice "structured development," creating PRDs, breaking work into tasks, and shipping incrementally. Tools like [Claude Code](https://www.claude.com/product/claude-code) or [Cursor](https://cursor.com/) only work well when given clean context and well-defined tasks.

Array aims to productize that discipline, turning chaos into structured, buildable work.

**Who We're Building For**

Array is designed for experienced product engineers who already use AI coding tools regularly. We're explicitly not targeting non-technical "vibe coders" or hobbyist users. Our initial customer profile is early-stage startups with 2-10 engineers and hundreds to low thousands of users. We'll expand to larger startups later as internal workflows and scale requirements become more complex.

**How It Works: From Signals to Shipped Code**

The core insight is that PostHog collects massive amounts of data across all our products — analytics, session recordings, error tracking, surveys, experiments. All of this data can be transformed into actionable "tasks" that describe real problems to fix or opportunities to pursue.

Here's the flow:

1. **Signal generation**: Something happens in PostHog that indicates work needs to be done. This could be a recurring error pattern, frustration signals from session recordings, a survey response indicating a missing feature, or experiment results suggesting an optimization. The Max AI team focuses on surfacing this data in useful ways.

2. **Task creation**: An LLM-based system receives these signals, deduplicates them across data types, and translates them into concrete tasks with appropriate context. This uses a non-deterministic approach — we use a document store and LLMs to judge how to structure tasks. A vague signal like "users seem frustrated during checkout" becomes a specific task: "Investigate and fix timeout issues in payment processing, affecting 15% of transactions from company X."

3. **Task execution**: Once a task is defined, it gets assigned to a workflow. Different tasks need different approaches — a well-defined bug fix might be a one-shot fix with human QA, while a vague feature request might need definition, breaking into chunks, gradual shipping behind a flag, and automated feedback collection.

4. **Coding**: Array uses an agent running in a cloud sandbox (though we support local execution too). The agent clones your repo, reads your codebase for context, makes changes, writes tests, and opens a pull request. Changes are automatically wrapped in feature flags when appropriate.

5. **Human oversight**: You're always in control. The desktop app shows you what Array is working on, lets you review and edit tasks, and requires your approval before shipping. This "human-in-the-loop" approach means you can trust Array to work in the background while you sleep, but nothing ships without your sign-off.

**Why a Desktop App?**

This is a crucial design decision. We could have built Array directly into the PostHog web app, and it would work. But it wouldn't generate the adoption we need.

Desktop apps win because of bottom-up adoption. Individual engineers can choose tools that make them more productive in a permissionless, frictionless way. A desktop app feels like a personal tool — like VS Code, Cursor, or your terminal — rather than a team product that requires management buy-in. Engineers already make personal choices about vim vs VSCode, which terminal to use, which AI coding assistant to try. Array slots into that category.

The UX also matters more for tools you use all day, not just a few times a week. Array is designed to feel like something between Warp, Ghostty, and Cursor: super fast, keyboard-first with lots of shortcuts, easy to navigate with tabs and split windows. Think of it as having the directness of a CLI but with the richness of a UI when you need it.

**The Interface**

Array is tab-based with the home tab being a task list. You navigate with arrow keys, click a task to open it in a new tab with a two-pane view: task details on the left (title, description, tags, origin, PR link) and a live log of activities on the right. When a task is in progress, it streams output to this log so you can watch the agent work. There's also a workflow builder view where you can see tasks moving through stages kanban-style.

**Technical Architecture**

Array is built as an Electron app for speed, familiarity (React), and cross-platform ease. When a task kicks off, we have two execution options:

**Cloud agent** (preferred): Tasks execute in a cloud sandbox. The agent runs in an isolated environment, clones the repo, does its work, and pushes to a branch. The downside is you need to grant GitHub app access. The upside is truly magical — Array can work on tasks while you sleep, and you wake up to PRs ready for review.

**Local agent** (more permissionless): We spin up Claude Code-like execution in the background on your local filesystem. This is the most permissionless version, closest to how developers use Claude Code today. We still give it access to the MCP and PostHog tools, and we likely need to proxy through our infrastructure to maintain control and provide a smooth experience.

We support both modes, but push for cloud execution as the optimal experience.

**Architecture Diagram**

```mermaid
graph TB
    subgraph "Array Desktop App (Electron)"
        UI[Task List UI]
        Backend[Backend Service]
    end

    subgraph "Task Generation"
        Signals[PostHog Signals<br/>Errors, Frustration, etc.]
        DR[Deep Research]
        SS[SessionSummaries]
        TaskGen[Temporal Job<br/>Task Generation]
    end

    subgraph "Execution: Cloud Agent (Preferred)"
        CloudSDK[SDK Wrapping<br/>Coding Agent]
        Sandbox[Sandbox + API<br/>Micro VM]
    end

    subgraph "Execution: Local Agent"
        LocalRepo[Local Repo<br/>User Filesystem]
        LocalExec[Local Execution<br/>Claude Code-like]
    end

    Signals --> TaskGen
    DR --> TaskGen
    SS --> TaskGen

    TaskGen --> Backend
    Backend --> UI

    UI --> Backend
    Backend --> CloudSDK
    Backend --> LocalExec

    CloudSDK --> Sandbox
    LocalExec --> LocalRepo
```

**What Kinds of Tasks?**

Array isn't just for data-driven bug fixes. The system for shipping a fix is the same as the system for shipping any feature. A vague task needs definition, then breaking into chunks, then shipping with proper releases planned. A small, well-defined task just needs a one-shot fix and QA.

Even inspiration-driven features (not from user data) benefit from Array's workflow: add event tracking, ship behind a flag, automatically message users for feedback, set up an experiment to measure impact. Array productizes best practices for shipping features, not just fixing bugs.

**Current Status**

Right now we're focused on dogfooding — getting the Array team to build everything using Array itself. This lets us refine product quality and identify friction fast. The Max AI team is supporting this by focusing on surfacing useful data that can be converted into Array tasks.

**For Engineers Not Using Array**

When Array isn't the right fit (maybe you don't trust AI to ship code automatically, or your workflow is very particular), we offer "copy prompt" features throughout PostHog. In error tracking, for example, you can generate an AI prompt to fix an error and paste it into your own code editor. This bridges the gap for engineers who want AI assistance but prefer to maintain manual control.

**Ownership**

The dedicated Array team owns the product. See [Team Structure](#team-structure-and-collaboration) for collaboration details.

### Wizard: AI-powered onboarding [General availability]

The Wizard is PostHog's AI-powered installation assistant that gets you from zero to collecting data in minutes instead of hours. Instead of reading documentation, finding the right SDK, figuring out configuration, and manually integrating PostHog into your codebase, you run one command and the Wizard handles everything.

**The Problem We're Solving**

Setting up analytics is tedious. You need to pick the right SDK for your tech stack, install dependencies, configure authentication, add initialization code in the right place, set up your first events, and verify everything works. For a developer who just wants to start tracking user behavior, this feels like unnecessary friction before you even get value from the product.

Even experienced developers waste 15-30 minutes on setup. For new developers or teams trying PostHog for the first time, it can take much longer — and if anything goes wrong, they might give up entirely.

The Wizard eliminates this friction. You run a single command, answer a few questions, and the Wizard writes all the integration code for you.

**Who Uses Wizard**

The Wizard is designed for:
- New PostHog users getting started for the first time
- Teams trying PostHog on a new project or codebase
- Developers who want to add PostHog to an existing application quickly
- Anyone who prefers automated setup over manual integration

Basically, anyone who would rather spend time using PostHog than setting it up.

**How It Works**

The Wizard is a CLI tool that runs locally in your development environment. Here's the flow:

1. **Detection**: The Wizard scans your codebase to detect your tech stack (React, Next.js, Python, etc.), framework version, and project structure.

2. **Configuration**: It asks you a few questions — which PostHog project to connect to, whether you want autocapture enabled, any custom configuration. The questions are contextual based on what it detected.

3. **Code generation**: The Wizard writes the integration code. This includes:
   - Installing the appropriate PostHog SDK via your package manager
   - Adding initialization code in the right location for your framework
   - Setting up configuration with your project API key
   - Optionally adding example event tracking code

4. **Verification**: The Wizard verifies the integration works by sending a test event to PostHog and confirming it arrives.

5. **Next steps**: It suggests what to do next — track your first custom event, set up a dashboard, or explore session recordings.

The entire experience uses Clack.cc for a polished CLI interface with clear prompts, progress indicators, and helpful error messages.

**Current Capabilities**

Right now, the Wizard handles installation and basic setup across PostHog's supported SDKs. It's particularly good at:
- Detecting complex framework setups (like Next.js with app router vs pages router)
- Handling different package managers (npm, yarn, pnpm)
- Placing initialization code in the right location based on framework conventions
- Configuring autocapture and basic options

**Future Direction**

The Wizard's long-term vision is much broader than one-time setup. Imagine:
- **Continuous instrumentation**: The Wizard could watch your codebase and suggest event tracking for new features. "I noticed you added a new checkout flow — want me to add tracking events?"
- **Instrumentation improvements**: "Your signup flow isn't tracking all the steps — I can add events to fill the gaps."
- **Best practices**: "You're tracking events in 5 different ways. I can standardize this for you."
- **Integration with Array**: When Array generates code that needs PostHog instrumentation (feature flags, experiments, custom events), the Wizard could handle that automatically.

This would turn the Wizard from a one-time setup tool into an ongoing assistant that keeps your PostHog instrumentation clean and comprehensive.

**Current Status & Ownership**

The Wizard is in general availability and actively used during customer onboarding. It's currently owned by the Growth team.

The Wizard's future direction — particularly whether it should integrate with Array for continuous instrumentation or remain a standalone onboarding tool — is being evaluated as part of the broader AI platform strategy.

### MCP: PostHog for third-party tools [General availability]

The MCP (Model Context Protocol) server is PostHog's way of meeting engineers where they already are. Not everyone wants to switch to the PostHog UI to analyze data — many prefer to stay in their code editor, terminal, or favorite AI tool. The MCP server makes that possible.

**The Problem We're Solving**

Context switching is expensive. If you're deep in debugging code in VS Code and need to check PostHog analytics, opening a browser, navigating to PostHog, finding the right insight, and coming back to your editor breaks your flow. It's even worse when you're using an AI coding assistant — you want to ask "which error is affecting the most users?" or "create a funnel for the checkout flow" without leaving your development environment.

The MCP server solves this by bringing PostHog directly into the tools engineers already use. No context switching, no mental overhead.

**Who Uses MCP**

MCP is designed for engineers who prefer working in their development environment:
- Developers using Claude Code or VS Code with AI extensions
- Engineers who want PostHog data combined with other data sources (GitHub, Zendesk, Hubspot)
- Teams with custom workflows or tooling that can consume MCP servers
- Anyone who prefers command-line or editor-based workflows over web UIs

**How It Works**

The [Model Context Protocol (MCP)](#glossary) is a standard for connecting AI assistants to external services. Here's what happens when you use PostHog via MCP:

1. **Connection**: Your MCP client (like Claude Code) connects to `https://mcp.posthog.com/mcp` with your PostHog API key for authentication.

2. **Tool discovery**: The client asks the MCP server what tools are available. The server returns a list of about 30 tools covering PostHog's API surface — everything from creating insights to filtering session recordings to managing feature flags.

3. **Dynamic filtering**: You can control which tools load using query parameters: `https://mcp.posthog.com/mcp?features=flags,insights,workspace`. This keeps context windows small by only loading relevant tools.

4. **Execution**: When you ask the AI assistant to do something with PostHog, it calls the appropriate MCP tools. These tools interface with PostHog's APIs (and eventually dedicated `/ai` endpoints, under development) to accomplish the task.

5. **Mode switching**: The MCP server is being aligned with our mode switching framework. This means AI agents can dynamically enable and disable different modes during a conversation, loading only the expertise they need when they need it. This solves the context window problem — currently, loading all tools takes up about 14% of Claude Code's context window, which we're reducing through dynamic tool discovery.

**Key Architectural Decisions**

The MCP server is deployed independently on CloudFlare. This gives us fast iteration, proven reliability, and excellent developer UX with quick deployments. We dogfood PostHog's customer-facing API wherever possible, which gives us good incentive to take care of it.

The MCP server also supports session state (active project ID, org ID, distinct ID), so it can fingerprint sessions and maintain context across multiple requests.

**Max vs. MCP: When to Use Each**

Both Max and MCP give you access to the same PostHog capabilities, but they serve different workflows:

**Use Max when:**
- You want the best possible UX with sharing, navigation, and linking between AI results and PostHog artifacts
- You're doing exploratory analysis and want to iterate quickly
- You need Deep Research or Session Summaries capabilities
- You want AI specifically trained on PostHog patterns and your actual usage data

**Use MCP when:**
- You prefer to stay in your code editor or terminal
- You're combining PostHog data with other MCP servers (GitHub, Zendesk, etc.)
- You have custom tooling that can consume MCP servers
- Your workflow is already centered around a third-party AI tool

Our goal is to make Max so good that users want to "own" their workflow in PostHog, while still supporting MCP for engineers who prefer different tools or need to combine multiple data sources.

**Current Status & Ownership**

MCP is in general availability. The Max AI team owns the MCP server, with Josh Snyder as the primary support contact. We're actively working on dynamic tool discovery to reduce context window usage and aligning the server with our mode switching framework to share capabilities with Max.

## AI Platform Architecture Overview

The following diagram shows how all components of the AI platform work together:

```mermaid
graph TB
    subgraph "User Facing Products"
        MaxUI[Max<br/>In-app Agent]
        DeepResearch[Deep Research]
        SessionSum[Session Summaries]
        ArrayApp[Array<br/>Desktop App]
        Wizard[Wizard<br/>CLI Tool]
        ClaudeCode[Claude Code /<br/>Other AI Tools]
    end

    subgraph "Core AI Infrastructure"
        subgraph "Single-Loop Agent"
            Agent[Agent with<br/>Full Context]
            CoreTools[Core Tools<br/>search, read_data,<br/>read_taxonomy,<br/>todo_write]
            Modes[Agent Modes<br/>SQL, Analytics, CDP,<br/>Custom Product Modes]
        end

        MCP[MCP Server<br/>CloudFlare<br/>Model Context Protocol]
        TaskGen[Task Generation<br/>Temporal Jobs]
    end

    Agent --> MaxUI
    Agent --> DeepResearch
    Agent --> SessionSum

    Agent --> CoreTools
    Agent --> Modes

    Modes --> MCP

    MCP --> ArrayApp
    MCP --> Wizard
    MCP --> ClaudeCode

    SessionSum --> TaskGen
    DeepResearch --> TaskGen

    TaskGen --> ArrayApp
```

**Key Integration Points:**

1. **The agent exposes tools via agent modes**: The single-loop agent architecture uses dynamically loadable modes that expose PostHog capabilities.

2. **MCP provides universal access**: The MCP server makes agent modes accessible to any MCP-compatible client, including Array, Wizard, and third-party tools like Claude Code.

3. **Task generation feeds Array**: Signals from PostHog data, Max conversations, and Deep Research investigations are processed into structured tasks that Array can execute automatically.

4. **Shared capabilities**: Array, Wizard, and external tools all consume the same agent modes through the MCP, ensuring consistency across the platform.

## Single-loop agent, how does it work?

### Mode switching

Max is based on a single-loop agent architecture, heavily inspired by Claude Code, with some PostHog unique flavour. The core insight is simple: instead of routing between multiple specialized agents that act as black boxes, we have one agent that maintains full conversation context and can dynamically load expertise as needed.

The single-loop agent has direct access to all tools, uses a todo-list pattern to track progress across long-running tasks (just like Claude Code), and provides complete visibility into every step it takes. When it needs specialized knowledge, it doesn't delegate to a sub-agent — it switches its own mode to become an expert in that domain.

**How the Single-Loop Agent Works**

```mermaid
sequenceDiagram
    participant User
    participant Agent as Single-Loop Agent<br/>(Full Context)
    participant Tools

    User->>Agent: "Create a funnel for signup flow"

    Agent->>Tools: Call read_taxonomy<br/>(check what events exist)
    Tools-->>Agent: Returns actual events:<br/>'user_signed_up', 'account_created'

    Agent->>Tools: Call enable_mode("Analytics")<br/>(load funnel creation tools)
    Tools-->>Agent: Analytics mode enabled<br/>with insight creation tools

    Agent->>Tools: Create funnel with correct events:<br/>'user_signed_up' → 'account_created'
    Tools-->>Agent: Funnel created successfully

    Agent-->>User: "I've created a funnel tracking your signup flow.<br/>It shows 45% conversion from 'user_signed_up'<br/>to 'account_created'"
```

The key differences from older architectures:
- **No hallucination**: Agent checks `read_taxonomy` before assuming event names exist
- **Full visibility**: All tool calls are visible to the agent throughout the conversation
- **Maintained context**: The agent remembers every decision it made and can build on them
- **Explainable**: The agent can justify every choice because it has complete visibility

#### Core Tools: Always Available

No matter what mode the agent is in, it always has access to a core set of tools:

The **search** tool is unified search with a `kind` discriminator. You can search documentation (`kind=docs`), search existing insights (`kind=insights`), or search other resources as we add them. This replaced having separate `search_docs` and `search_insights` tools.

The **read_data** tool lets the agent read database schema and billing information. The **read_taxonomy** tool is how the agent explores your events, entities, actions, and properties. These are crucial for avoiding hallucination problems we had before — the agent can always check what data actually exists before making assumptions.

The **enable_mode** tool is how the agent switches between different areas of expertise, which we'll discuss in detail next.

Finally, **todo_write** is the tool that lets the agent manage long-running tasks. When you ask for something complex, the agent can write out a plan, track its progress, and make sure it doesn't lose context.

#### Agent Modes: Dynamic Expertise

Here's the key innovation: instead of having specialized sub-agents, we have a single agent that can "switch gear" by switching modes. Each mode gives the agent new tools, a new system prompt with domain expertise, and example workflows (which we call "trajectories") to follow.

It works in two stages. First, a small model router analyzes the user's request and enables some default modes. Then, during the conversation, the agent can call `enable_mode("SQL")` to switch into SQL expert mode, gaining SQL-specific tools and knowledge. The agent knows which tools it had before, which new ones it gained, and can switch back or switch to a completely different mode at any time.

Each mode is defined by three things:

A **routing prompt** that explains when to activate this mode and lists the available tools. This is what the small model router and the main agent use to decide when to switch modes.

A **system prompt** that contains expert instructions for this domain. When the agent switches to CDP mode, for example, it gets a system prompt explaining how CDP destinations work, what Hog functions are, and how transformations should be structured.

**Workflow trajectories** that give the agent examples of how to accomplish tasks. We inject example workflows into the `todo_write` tool description. For instance, the CDP mode might include a trajectory like: "Setting up CDP destination: 1. Write HogQL transformation code, 2. Define input variables, 3. Set event/property filters, 4. Test with sample data before activating."

This architecture allows product teams to create their own modes without touching the core agent. Modes can be composed and nested. Think of it as "thousands of agents" through mode combinations, rather than a fixed set of AI products.

**When do black-box sub-agents still make sense?** There are exceptions. Some processes benefit from being hidden from the main agent — usually when the logic is completely detached from the conversation context, or when you want to use strategies or optimizations that would confuse the main agent if exposed. Our agentic RAG system for insight search is a good example: it iteratively searches through insights and cherry-picks the best ones using a complex scoring system. The main agent doesn't need to see all that — it just needs the final result.

**Architecture Diagram**

```mermaid
graph TB
    User[User Message] --> Router[Small Model Router<br/>Analyze request]

    Router --> |Enable default modes| Agent[Single-Loop Agent<br/>Full conversation context]

    subgraph "Core Tools (Always Available)"
        Search[search<br/>docs, insights, etc.]
        ReadData[read_data<br/>schema, billing]
        ReadTax[read_taxonomy<br/>events, properties]
        TodoWrite[todo_write<br/>task tracking]
        EnableMode[enable_mode<br/>switch expertise]
    end

    Agent --> CoreTools[Core Tools]
    CoreTools --> Search
    CoreTools --> ReadData
    CoreTools --> ReadTax
    CoreTools --> TodoWrite
    CoreTools --> EnableMode

    EnableMode --> |Dynamic loading| Modes[Agent Modes]

    subgraph Modes
        SQLMode[SQL Mode<br/>+ SQL tools<br/>+ SQL system prompt<br/>+ SQL trajectories]
        AnalyticsMode[Analytics Mode<br/>+ insight tools<br/>+ analytics prompt<br/>+ analytics trajectories]
        CDPMode[CDP Mode<br/>+ destination tools<br/>+ CDP prompt<br/>+ CDP trajectories]
        CustomMode[Custom Product Mode<br/>+ product tools<br/>+ product prompt<br/>+ product trajectories]
    end

    Modes --> Agent
    Agent --> |Execute with full context| Actions[Actions<br/>Create insights, write SQL,<br/>set up destinations, etc.]

    Actions --> Response[Response to User]
```

### How Max and MCP share the same capabilities

The problem we needed to solve: Max and the MCP server were developed by different teams, didn't offer the same tools, and had completely different architectures. Users would find features in Max that didn't exist in the MCP, and vice versa.

The solution is an abstraction layer. Agent modes expose both high-level LLM tools (like "create a funnel with these parameters") and low-level API endpoint tools (like "call POST /api/projects/{id}/insights"). Both Max and the MCP have access to the same capabilities, just through different interfaces.

### How Array and Wizard fit in

Both Array and the Wizard currently consume the MCP. This integration gives them access to all the agent modes we're building. If Claude Code (which Array uses for code generation) ever becomes a bottleneck, we could swap in PostHog's own single-loop agent since they share the same mental model. We'd need to copy over Claude Code's terminal and file system tools (bash, grep, etc.) and add them as core tools.

We could also tag modes for specific interfaces. For example, a `CodingMode(tags=["array"])` would only be exposed to the Array agent, not to Max, because it's specific to code generation workflows.

## Team Structure and Collaboration

### Who Does What

**The Max AI team** is responsible for the architecture, performance, and UX/UI of the AI platform. We review PRs from product teams to ensure they meet our quality bar. We build and maintain the core tooling (search, read_data, read_taxonomy, enable_mode). We're also proactive when we see big opportunities for PostHog or when new capabilities can be used across multiple products — things like SQL generation or universal filtering.

**The Array team** is responsible for the Array desktop product, the cloud and local coding agent, and signals and tasks generation. They might at some point own the Wizard or integrate it directly into the main Array product.

**Product teams** add their product-specific tools and modes to the platform. They're responsible for making sure their capabilities are discoverable by users, implementing the tool logic for their specific product area, adding any necessary frontend components (usually based on the MaxTool frontend class pattern), and defining workflows as trajectories for their domain.

### How to Get Started

If you need AI capabilities for your product area, here's the process:

**Reach out early.** Contact the Max AI team lead at #team-max-ai in Slack. Tell us what you're thinking, even if it's just a vague idea. We can help you think through whether AI is the right approach and what shape it should take.

**Define the use case.** Be specific about what AI functionality you need, or work with us to flesh out the requirements. Sometimes what seems like an AI problem is better solved another way, and sometimes what seems like a simple automation turns out to be a perfect AI use case.

**Plan the collaboration.** We'll figure out the best approach together. This might mean sending an engineer from the Max team to your team for a sprint or two, or building the feature directly in Max without your team's heavy involvement, or just giving you enough guidance that you can do it solo. There's no one-size-fits-all model.

**Coordinate sprints.** Align on timing and resource allocation if needed. This shouldn't feel like a heavyweight process — if it does, we should change it.

### Best Practices

Start small. Begin with simple AI features and iterate based on user feedback. A lot of automation can be broken down into smaller, automatable steps. It's better to ship something that works reliably for one workflow than to build something ambitious that works unreliably for ten workflows.

Maintain consistency. AI features should follow PostHog's design patterns and UX standards. If you're missing a UX pattern (like a standard way to show AI-generated results, or a loading state for long-running AI tasks), the Max AI team can help build reusable components.

## Pricing and Product Positioning

### How we think about pricing

We think about AI features in two categories:

**Features that don't add new capabilities** are things you could do by clicking around the UI, but AI makes them faster or easier. Max falls into this category — it's a different interaction model, not a new capability. These features are important for learning PostHog and improving adoption, so we keep them free (with reasonable caps for non-subscribers).

**Features that add new capabilities** are things you couldn't do before, or would take so long that you practically couldn't do them. Deep Research and Session Summaries fall into this category. These features can find signals in data that humans would miss, or accomplish in minutes what would take hours manually. We make these paid features with generous free tiers, just like our other products.

Right now everything is in beta and pricing is subject to change as we learn what users value.

### How users should think about our products

**Max** is the main PostHog product for AI interactions. It's where most users will spend their time. You can switch between Core, Deep Research, and Session Summaries modes depending on what you're trying to do. The UX is better than external tools because we can support sharing, navigation, and linking between AI results and PostHog artifacts. Max is also trained on PostHog-specific patterns and your actual usage data, so it provides higher quality, more contextual results than a general-purpose AI.

**Deep Research** is a mode available within Max, but also accessible through its own dedicated UI if you want to jump straight into research mode. Use it for open-ended investigative work where you're trying to understand a complex problem.

**Session Summaries** is callable from Max and Deep Research, and also has its own UI. Use it when you need to analyze many session recordings and extract patterns or issues.

**Array** is a desktop product for single-engineer use. It's separate from Max because the workflow is different — you're not asking questions, you're letting an AI agent watch PostHog for problems and automatically fix them in your codebase. Think of it as an AI assistant that lives in your development environment.

**MCP** is for users who prefer to work in third-party tools like Claude Code or VS Code. You get access to PostHog's data and can combine it with other MCP servers (like Hubspot or Zendesk). The trade-off is you don't get Max's polished UX or PostHog-specific training.

## Future Directions

### Third-party context integration

We want to connect Max to third-party tools for additional context. Imagine Max analyzing data across PostHog, Slack messages, and Zendesk tickets to understand not just what users are doing, but what they're saying and reporting. This data could also generate signals for the Array product — if users are complaining about a bug in Slack and PostHog sees errors in the same area, that's a strong signal for Array to investigate and potentially fix it automatically.

This is in the idea stage right now, but the Max AI team will likely start working on it soon.

## Glossary

**Agent**: An autonomous AI process that can reason about what to do, plan multiple steps, and take actions by calling tools. Max is an agent. Claude is an agent.

**Agent Mode**: A specialized configuration of an agent that gives it domain-specific tools, expert knowledge (via system prompts), and workflow examples. When Max switches to "SQL mode," it becomes an expert in writing and debugging SQL queries.

**Tool**: An external capability the agent can call to perform actions it can't do natively. Tools might search documentation, query a database, create a PostHog resource, or run code.

**Trajectory**: An example workflow showing the sequence of steps to accomplish a specific task. We use trajectories instead of the heavier "jobs-to-be-done" framework to teach agents how to use tools together effectively.

**MCP (Model Context Protocol)**: A standard protocol for connecting AI models to external tools and data sources in a structured, secure way. Think of it like an API, but specifically designed for AI agents.

**MCP Server**: The component that exposes tools and data sources following the MCP specification. PostHog's MCP server makes our analytics data available to any MCP-compatible client.

**MCP Client**: The component that connects to MCP servers to discover and use tools. Claude Code, VS Code with AI extensions, and other tools can act as MCP clients.

**Single-loop agent**: An agent architecture that maintains full context throughout a conversation without delegating to black-box sub-agents. The agent can see all tools, all previous messages, and all decisions it's made.

## Implementation Recommendations

### For engineers adding AI features

If your feature **reads or writes PostHog data**, build it into Max or have it hand off to Max after initiation. For example, if you're adding a "Fix with AI" button to debug SQL queries, that button should open Max with context about the query, so users can iteratively debug with AI assistance.

If your feature **triggers code changes**, feed it as a signal into the Array product. You can also offer a "copy prompt" option for engineers who don't want to use Array — they can paste the AI-generated prompt into their own code editor.

If your feature **doesn't fit either category**, use your judgment and consult with the Max AI team if you're unsure. We're still figuring out where some things fit.

## Contact and Resources

For questions about working with Max AI, ask in the #team-max-ai Slack channel.

Additional resources:
- [Max AI team page](/teams/max-ai)
- [Max AI user documentation](/docs/max-ai)
- [Max AI objectives](/teams/max-ai/objectives)
