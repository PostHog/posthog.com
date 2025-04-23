---
title: How to set up OpenAI usage reporting
date: 2025-04-23
author:
 - ian-vanagas
tags:
  - insights
  - LLM observability
  - sql
---
OpenAI charges per API usage. LLM-powered apps using OpenAI will need usage tracking to correctly bill per usage or enforce usage limits. Usage reports are important to help users see how much they've used and what it will cost.

In this tutorial, we'll add usage reporting to a Next.js chat app by:
1. Track LLM usage with PostHog
2. Query usage data via PostHog's API
3. Display usage reports to users

## Creating a Next.js app
First, ensure [Node.js is installed](https://nodejs.dev/en/learn/how-to-install-nodejs/) (version 18.0 or newer) then run the following to create a new Next.js app. 

```bash
npx create-next-app@latest chat-app-usage 
cd chat-app-usage 
``` 
Say **yes** to TypeScript, **yes** to app router, and the defaults for other options.

## Adding a chat UI
Create a simple chat interface to prompt a GPT model. We'll add the `/api/chat` endpoint in the next step and configure PostHog to capture usage data.

Update `app/page.tsx` with the example code below:
```tsx
// app/page.tsx
'use client';

import { useState } from 'react';

export default function ChatPage() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      setResponse(data.response);
    } catch (error) {
      console.error('Error:', error);
      setResponse('Sorry, there was an error processing your request.');
    } finally {
      setIsLoading(false);
      setPrompt('');
    }
  };

  return (
    <div className="min-h-screen p-8">
      <main className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Chat</h1>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Type your message..."
              className="w-full p-2 border rounded"
              disabled={isLoading}
            />
            <button 
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
              disabled={isLoading}
            >
              {isLoading ? 'Sending...' : 'Send'}
            </button>
          </form>
          
          {response && (
            <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded">
              <p>{response}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
```

## Capturing usage data
The chat UI sends requests to the `/api/chat` endpoint, which connects to the OpenAI API to get responses. 
We'll configure PostHog to capture LLM usage here.

Start by installing the OpenAI SDK and PostHog [Node SDK](/docs/libraries/node).
```bash
npm install openai
npm install @posthog/ai posthog-node
```

Next, create a new file with the path `app/api/chat/route.ts`. The example code below will:
- Initialize PostHog as `phClient` with your project API key and host from [your project settings](https://us.posthog.com/settings/project)
- Initialize the OpenAI wrapper with your OpenAI key and the `phClient`
- Handle POST requests by passing the prompt to OpenAPI.
- Capture LLM usage using the `OpenAI` wrapper from `@posthog/ai`
- Each call is attached to a `posthogDistinctId`, which should be a unique user ID.

```tsx
// app/api/chat/route.ts
import { OpenAI } from '@posthog/ai'
import { PostHog } from 'posthog-node'
import { NextResponse } from 'next/server';

// Init the PostHog client
const phClient = new PostHog(
  process.env.POSTHOG_API_KEY ?? '',
  { host: process.env.POSTHOG_HOST ?? '' }
);

// Use the PostHog OpenAI wrapper
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY ?? '',
  posthog: phClient,
});

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    // The PostHog OpenAPI wrapper automatically tracks usage
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant. Keep your responses concise and clear."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 500,
      posthogDistinctId: 'distinct_id_of_your_user' // use a unique user ID 
    });

    const response = completion.choices[0]?.message?.content || "Sorry, I couldn't generate a response.";

    return NextResponse.json({ response });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to process your request' },
      { status: 500 }
    );
  }
} 
```

Run `npm run dev` and go to `http://localhost:3000/` in our browser. We should see a simple chat interface that responds to your prompts.

<ProductScreenshot
  imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/chat_prompt_35d06488d9.png" 
  imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/chat_prompt_35d06488d9.png" 
  alt="The simple chat interface we just created." 
  classes="rounded"
/>

We can confirm if PostHog is receiving LLM usage events in the [Activity tab](https://us.posthog.com/activity) by filtering for **AI generation (LLM)** events.

<ProductScreenshot
  imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/openai_analytics_activity_light_e94ba9f048.png" 
  imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/openai_analytics_activity_dark_e07ac2a3c0.png" 
  alt="Confirming if LLM usage events have been received in Activities tab." 
  classes="rounded"
/>

## Querying LLM usage data

We can query usage data collected with LLM observability by using the [PostHog queries API](https://posthog.com/docs/api/queries).

Create a test query in the [SQL editor](https://us.posthog.com/sql) to count the number of generation events and sum the estimated cost. Aggregate the data over a `distinct_id` to fetch usage data for a single user.
```sql
SELECT 
    COUNT(*) as usage,
    COALESCE(SUM(properties.$ai_total_cost_usd), 0) as estimatedCost
FROM events 
WHERE event = '$ai_generation' 
AND distinct_id = 'distinct_id_of_your_user'
```

With our query, we'll implement a new route `/api/usage` to fetch usage data from the PostHog queries API.

Create a new file with the path `app/api/usage/route.ts`. We'll need the PostHog host, project ID from your [project settings](https://us.posthog.com/settings/project#variables), and a personal API key from your [user settings](https://us.posthog.com/settings/user#personal-api-keys). 
```tsx
// app/api/usage/route.ts
import { NextResponse } from 'next/server';

// This is a mock implementation - you'll need to replace this with your actual data source
async function getUsageData(userId: string) {

  const posthogUrl = process.env.POSTHOG_HOST
  const projectId = process.env.POSTHOG_PROJECT_ID
  const personalApiKey = process.env.POSTHOG_PERSONAL_API_KEY

  const url = `${posthogUrl}/api/projects/${projectId}/query/`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${personalApiKey}`
    },
    body: JSON.stringify({
      query: {
        kind: 'HogQLQuery',
        query: `
          SELECT 
              COUNT(*) as usage,
              COALESCE(SUM(properties.$ai_total_cost_usd), 0) as estimatedCost
          FROM events 
          WHERE event = '$ai_generation' 
          AND distinct_id = 'distinct_id_of_your_user'
          `
      }
    }),
  });

  const data = await response.json();
  return {
    usage: data.results[0][0],
    estimatedCost: data.results[0][1]
  };
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'userId parameter is required' },
        { status: 400 }
      );
    }

    const usageData = await getUsageData(userId);
    return NextResponse.json(usageData);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch usage data' },
      { status: 500 }
    );
  }
} 
```

## Displaying a usage report

Finally, we can display the usage data in a usage report under `/usage`.

Create a new file with the path `app/usage/page.tsx` to fetch and display usage data:

```tsx
'use client';

import { useState, useEffect } from 'react';

interface UsageData {
  usage: number;
  estimatedCost: number;
}

export default function UsagePage() {
  const [usageData, setUsageData] = useState<UsageData>({
    usage: 0,
    estimatedCost: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsageData = async () => {
      try {
        // TODO: Replace with actual user ID from your auth system
        const userId = 'current-user-id';
        const response = await fetch(`/api/usage?userId=${userId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch usage data');
        }
        
        const data = await response.json();
        setUsageData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsageData();
  }, []);

  return (
    <div className="min-h-screen p-8">
      <main className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Usage</h1>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          {isLoading ? (
            <div className="text-center">Loading usage data...</div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
                  <h3 className="font-semibold">Usage in current billing cycle</h3>
                  <p className="text-2xl">{usageData.usage.toLocaleString()} messages</p>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
                  <h3 className="font-semibold">Estimated Cost</h3>
                  <p className="text-2xl">${usageData.estimatedCost.toFixed(6)}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
```

Run `npm run dev` and go to `http://localhost:3000/usage` in our browser. We should see a simple chat interface that responds to your prompts.

<ProductScreenshot
  imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/chat_usage_c2b509a497.png" 
  imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/chat_usage_c2b509a497.png" 
  alt="The simple chat interface we just created." 
  classes="rounded"
/>
