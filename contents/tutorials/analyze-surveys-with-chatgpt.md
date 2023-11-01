---
title: How to analyze surveys with ChatGPT
date: 2023-10-18
author: ["lior-neu-ner"]
showTitle: true
sidebar: Docs
featuredImage: ../images/tutorials/banners/tutorial-11.png
tags: ['surveys']
---

[Surveys](/docs/surveys) are a great way of collecting feedback from your users, especially if you ask your users like "How can we improve our product?". However, they can be hard to analyze if you receive hundreds or more responses. Fortunately, [OpenAI's ChatGPT](https://openai.com/chatgpt) is great at doing this.

In this tutorial, we'll show you how to use ChatGPT to analyze your survey results. We'll create a basic Node.js script, parse a CSV of survey responses, and use the ChatGPT API to extract useful information such as sentiment and theme.

## Creating a Node script

First, make sure [Node is installed](https://nodejs.dev/en/learn/how-to-install-nodejs/) (18.16.0 or newer). Then create a `package.json` file by running `npm init`. Give your app a name and select the defaults for all the options.

Then, create a new JavaScript file for our script (we name ours `survey-analyzer.js`):

```bash
touch survey-analyzer.js
```

Finally, add a placeholder function to your script. We'll add code to it in the next steps.

```js
// in survey-analyzer.js

const analyzeSurveyResponses = async () => {
  // TODO: add code
}

analyzeSurveyResponses()
```

## Parsing a CSV of survey responses

We'll import sample survey responses into our script from a CSV file called `responses.csv`. You can [download the CSV file here](https://github.com/PostHog/analyze-surveys-with-chatgpt/blob/main/responses.csv).

Add the CSV file to your project folder. Then, install `[csv-parser](https://github.com/mafintosh/csv-parser)` – a handy library for parsing CSVs.

```bash
npm install csv-parser
```

Next, add the following code to convert the CSV into an array of responses:

```js
// in survey-analyzer.js

const fs = require('fs');
const csv = require('csv-parser');

const csvToArr = async (filePath) => {
  const results = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv({ headers: ['answer'] }))
      .on('data', data => results.push(data))
      .on('end', () => {
        resolve(results);
      })
      .on('error', error => {
        reject(error);
      });
  });
}

const analyzeSurveyResponses = async () => {
  const surveyResponses = await csvToArr('responses.csv')
}

analyzeSurveyResponses()
```

## Analyzing responses with ChatGPT

The next step is to submit our responses to ChatGPT to analyze them. To do this, first you'll need to [sign up for an OpenAI account](https://platform.openai.com/signup) and [retrieve your API key](https://help.openai.com/en/articles/4936850-where-do-i-find-my-secret-api-key). 

Then, install [OpenAI's Node library ](https://github.com/openai/openai-node) and initialize it in the code. 

```bash
npm install openai
```

```js
// in survey-analyzer.js

const OpenAI = require("openai");

const openai = new OpenAI({
    apiKey: "<your-api-key>"
});

// rest of the code
```

Next, for each response, we'll make an API call to [Chat completions API](https://platform.openai.com/docs/guides/gpt/chat-completions-api) to extract the following information from each response:

1. The sentiment of the response i.e., is it positive or negative?
2. What themes are mentioned in the responses.

To do so, the API method requires 2 parameters:

- **[model](https://platform.openai.com/docs/models/overview)** – which ChatGPT model to use. We use `gpt-3.5-turbo-16k` (we'll explain why later in this post).
- [messages](https://platform.openai.com/docs/guides/gpt/chat-completions-api) – i.e., the task you are requesting ChatGPT to perform. You can find more details on the required format in the [API docs](https://platform.openai.com/docs/guides/gpt/chat-completions-api).

With this in mind, here's what our code looks like:

```js

// rest of the code

const analyzeSurveyResponses = async () => {
  const surveyResponses = await csvToArr('responses.csv')
  for (const response of surveyResponses) {
    try {
      const result = await openai.chat.completions.create({
        model: "gpt-3.5-turbo-16k",
        messages: [
          {
            "role": "system", 
            "content": `Your job is to analyze survey responses. For each response, extract the sentiment (positive or negative only) as well as the theme in the response. 

              You must only respond with a JSON. This JSON must contain the keys "survey_response", "sentiment", and "theme". 
              
              Here's an example of an valid response: 
              \`\`\`
              {
                "survey_response": "The product has potential, but it's not very intuitive to use. Please simplify the interface",
                "sentiment": "negative",
                "theme": "user interface"
              }
              \`\`\`
              `
          },
          {
            "role": "user", 
            "content": `Analyze this survey response: ${JSON.stringify(response.answer)}`
          }
        ],
      });

      const analyzedResponse = JSON.parse(result.choices[0].message.content);
    } catch (error) {
      console.log(`An error occurred: ${error}`)
    }
  }
}
```

Finally, we'll save the response from ChatGPT into a CSV file. This way we'll be able to analyze the results later:

```js
const analyzeSurveyResponses = async () => {
    // rest of function code...


      const analyzedResponse = JSON.parse(result.choices[0].message.content);
      const csvLine = `"${analyzedResponse.survey_response}","${analyzedResponse.sentiment}","${analyzedResponse.theme}"\n`;
      fs.appendFile('analyzed_responses.csv', csvLine, (err) => {
        if (err) throw err;
        console.log('The analyzed response was appended to file!');
      });
    } catch (error) {
      console.log(`An error occurred: ${error}`)
    }
  }
}
```

If you now run `node survey-analyzer.js`, you should see your analyzed responses appear in your new CSV file! 

## Batching our requests

Since we submit each survey response one at a time for analysis, it can be quite tedious to wait for the script to complete. To improve this, we can batch our survey responses so that multiple are analyzed at the same time. 

However, an important consideration is that ChatGPT has something called a `token limit`:

A token can be thought of as roughly 4 characters or 0.75 words. When you make an API request, the text in the `messages` parameter is converted into tokens. The response from the API is then also converted into tokens. This means that the number of tokens in your API call is number tokens in your request plus the number of tokens in the response

The token limit refers to the maximum number of tokens that the model can process in a single request. If we exceed this limit, the model won't be able to handle the request, resulting in an error. Each [model](https://platform.openai.com/docs/models) has a different limit, ranging from approximately 4,000 to 32,000 tokens. 

We've found that `[gpt-3.5-turbo-16](https://platform.openai.com/docs/models/gpt-3-5)` has the large limit (~16,000 tokens), while still being sufficiently fast and powerful for analyzing survey responses. 

This brings us to the question: How many survey responses will we be able to batch and analyze at the same time? 

Using [tokenizer](https://platform.openai.com/tokenizer), a tool that counts the number of tokens in given text, we see that each of our survey response are roughly `60 tokens`. Thus to estimate how many tokens each survey response will use:

1. `60 tokens` for each survey response requested to be analyzed
2. `120 token` for each response from ChatGPT (since each response includes the original survey answer, plus some extra text)

So the total cost to analyze each survey response will be approximately `180 tokens`. This means we can batch at most `16,000 / 180 = 88` responses together. To be extra safe and ensure we don't exceed this limit, we'll batch at most 50 responses together.

Let's update our code to do that:

- First we a `batchSize = 50` to our `for-loop`. Next, we modify our `messages` parameter to request ChatGPT to analyze many survey responses (instead of only one at a time). Finally, we save the array in the response from ChatGPT into our CSV file.

```js
// rest of code...

const analyzeSurveyResponses = async () => {
  const surveyResponses = await csvToArr('responses.csv')
  const batchSize = 50;
  
  for (let i = 0; i < responses.length; i += batchSize) {
    const batch = responses.slice(i, i + batchSize);
    try {
      const result = await openai.chat.completions.create({
        model: "gpt-3.5-turbo-16k",
        messages: [
          {
            "role": "system", 
            "content": `Your job is to analyze survey responses. For each response, extract the sentiment (positive or negative only) as well as the theme in the response.

              You must only respond with an array containing JSONs. These JSON objects must contain the keys "survey_response", "sentiment", and "theme". 
              
              Here's an example of an valid response: 
              \`\`\`
              [
                {
                  "survey_response": "The product has potential, but it's not very intuitive to use. Please simplify the interface",
                  "sentiment": "negative",
                  "theme": "user interface",
                }
              ]
              \`\`\`
              `
          },
          {
            "role": "user", 
            "content": `Analyze these survey response: ${JSON.stringify(batch.map(response => response.answer))}`
          }
        ],
      });

      const analyzedResponses = JSON.parse(result.choices[0].message.content);
      analyzedResponses.forEach(r => {
        const csvLine = `"${r.survey_response}","${r.sentiment}","${r.theme}"\n`;
        fs.appendFile('analyzed_responses.csv', csvLine, (err) => {
          if (err) throw err;
          console.log('The analyzed response was appended to file!');
        });
      });
    } catch (error) {
      console.log(`An error occurred: ${error}`)
    }
  }
}

// rest of code...
```

Now if you run `node survey-analyzer.js`, ChatGPT will analyze 50 survey responses at a time!

## Analyzing results in Excel or Google Sheets

Now that we have our result, we can import `analyzed_responses.csv` into excel or Google sheets for further analysis. 

For example, you can create a [pivot table](https://support.microsoft.com/en-gb/office/create-a-pivottable-to-analyze-worksheet-data-a9a84538-bfe9-40a9-a8e9-f99134456576) to find the most common themes in the survey answers. You can do this by:

1. Importing your CSV. Then, insert a new row at the top of the sheet so you can name the columns `answer`, `sentiment` and `
2. Clicking on the "Insert" tab, then "Pivot table"
3. Select the data range of your results
4. In your pivot table editor, select `theme` in both the `Rows` and `Value` field. 
5. Lastly, sort by descending `COUNTA of theme`.

![How to create a pivot table to analyze survey results](../images/tutorials/analyze-surveys-with-chatgpt/create-pivot-table.mp4)

## Reducing duplicate themes

You may have noticed that some of the theme names suggested by ChatGPT are very similar to one another. For example, when we ran the script, it suggested a theme of `user permissions` for one survey answer but `user roles and permissions` for another. These are clearly the same theme, but the slightly different names means that it's harder to aggregate the results in our pivot table.

To fix this, we'll create a new script `reduce-themes.js` which will aggregate similar themes together and reduce the total number of distinct themes.

In the script we:

1. Extract the responses analyzed by ChatGPT from `analyzed_responses.csv`.
2. Create a list of all the unique themes.
3. Send this list of themes to ChatGPT and ask it aggregate it, thus reducing the number of similar themes.
4. Use the response from ChatGPT to update the similar themes `analyzed_responses.csv`

Altogether, this looks like this:

```js
// in reduce-themes.js
const fs = require('fs');
const csv = require('csv-parser');
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: "<your-api-key>"
});

const csvToArr = async (filePath) => {
  const results = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv({ headers: ['answer', 'sentiment', 'theme'] }))
      .on('data', data => results.push(data))
      .on('end', () => {
        resolve(results);
      })
      .on('error', error => {
        reject(error);
      });
  });
}

const reduceThemes = async () => {
  const analyzedResponses = await csvToArr('analyzed_responses.csv')  
    try {
      const themes = new Set(analyzedResponses.map(response => response.theme))
      const result = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            "role": "system", 
            "content": `Your job is to aggregate this list of themes and group similar themes together. By grouping the themes together, you will reduce the number of themes in the list.
            In your response, you must list the old theme and the new theme are you aggregating it to. 
            
            You must only respond with a JSON object. This JSON objects must use the old themes as the keys, and the values must be the new themes. 
              
              Here's an example of an valid response: 
              \`\`\`
                {
                  "collaboration": "collaboration"
                  "collaboration tools": "collaboration",
                  "user permissions": "user permissions",
                  "user roles and permissions": "user permissions",
                  "integration": "integrations",
                  "integrations": "integrations",
                }
              \`\`\`
              `
          },
          {
            "role": "user", 
            "content": `Aggregate these themes: ${JSON.stringify(Array.from(themes))}`
          }
        ],
      });
      const newThemes = JSON.parse(result.choices[0].message.content);

      // update the previously analyzed responses with the new themes
      const updatedResponses = analyzedResponses.map(old => {
        const updatedResponse = old
        updatedResponse.theme = newThemes[old.theme]
        return updatedResponse
      })

      // overwrite the current contents of analyzed_responses.csv with the updated responses
      const lines = analyzedResponses.map(r => `"${r.answer}","${r.sentiment}","${r.theme}"`).join('\n');
      fs.writeFile('analyzed_responses.csv', lines, (err) => {
        if (err) throw err;
        console.log('All analyzed responses were written to file!');
      });

    } catch (error) {
      console.log(`An error occurred: ${error}`)
    }
}

reduceThemes()
```

Now, running `node reduce-themes.js` will aggregate similar themes. If you re-import your list in Google sheets or excel and create a pivot table, you should see fewer themes.

## Further reading

- [How to set up surveys in Next.js](/tutorials/nextjs-surveys)
- [How to set up surveys in React](/tutorials/react-surveys) 
- [Get feedback and book user interviews with surveys](/tutorials/feedback-interviews-site-apps)
