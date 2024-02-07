---
title: How to analyze surveys with ChatGPT
date: 2023-11-08
author: ["lior-neu-ner"]
showTitle: true
sidebar: Docs
featuredImage: ../images/tutorials/banners/tutorial-14.png
tags: ['surveys']
---

> <p align="center">Open this tutorial in PostHog and follow along step-by-step!</p> <CallToAction href="https://app.posthog.com/#panel=docs:/tutorials/analyze-surveys-withchatgpt" size="sm" className="mt-auto self-start sm:w-auto !w-full">Launch tutorial</CallToAction>

Surveys are a great way of collecting feedback from your users, especially if you ask your users like "How can we improve our product?". However, they can be hard to analyze if you receive hundreds or more answers. Fortunately, [OpenAI's ChatGPT](https://openai.com/chatgpt) is great at doing this.

In this tutorial, we'll show you how to use ChatGPT to analyze your survey results. We'll create a basic Node.js script, parse a CSV of survey answers, and use the ChatGPT API to extract useful information such as sentiment and theme.

> The completed code for this tutorial is available on [GitHub](https://github.com/PostHog/analyze-surveys-with-chatgpt)

## Creating a Node script

First, make sure [Node is installed](https://nodejs.dev/en/learn/how-to-install-nodejs/) (18.16.0 or newer). Then create a `package.json` file by running `npm init`. Give your app a name and select the defaults for all the options.

Then, create a new JavaScript file for our script (we name ours `survey-analyzer.js`):

```bash
npm init
touch survey-analyzer.js
```

Finally, add a placeholder function to your script. We'll add code to it in the next steps.

```js
// in survey-analyzer.js

const analyzeSurveyAnswers = async () => {
  // TODO: add code
}

analyzeSurveyAnswers()
```

## Parsing a CSV of survey answers

We'll import sample survey answers into our script from a CSV file called `answers.csv`. You can [download the CSV file here](https://github.com/PostHog/analyze-surveys-with-chatgpt/blob/main/answers.csv).

> 💡 **PostHog Tip:** If you're using [PostHog surveys](/surveys), you can export your answers by navigating to your survey, clicking "Export", and then "Copy CSV to clipboard".
>
> ![Export PostHog survey results to a CSV](../images/tutorials/analyze-surveys-with-chatgpt/export-posthog-csv.mp4)

Add the CSV file to your project folder. Then, install [`csv-parser`](https://github.com/mafintosh/csv-parser) – a handy library for parsing CSVs.

```bash
npm install csv-parser
```

Next, add the following code to convert the CSV into an array:

```js
// in survey-analyzer.js

const fs = require('fs');
const csv = require('csv-parser');

const csvToArr = async (filePath) => {
  const results = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv({ headers: ['answer', 'timestamp', 'person'] })) // your CSV header names
      .on('data', data => results.push(data))
      .on('end', () => {
        resolve(results);
      })
      .on('error', error => {
        reject(error);
      });
  });
}

const analyzeSurveyAnswers = async () => {
  const surveyAnswers = await csvToArr('answers.csv')
}

analyzeSurveyAnswers()
```

## Analyzing answers with ChatGPT

The next step is to submit our answers to ChatGPT to analyze them. To do this, first you'll need to [sign up for an OpenAI account](https://platform.openai.com/signup) and [retrieve your API key](https://help.openai.com/en/articles/4936850-where-do-i-find-my-secret-api-key). 

Then, install [OpenAI's Node library](https://github.com/openai/openai-node) and initialize it in the code. 

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

Next, for each survey answer, we'll make a call to the [chat completions API](https://platform.openai.com/docs/guides/gpt/chat-completions-api) to extract the following information:

1. Whether the sentiment is positive or negative.
2. The theme of the answer.

To do so, the API method requires 2 parameters:

- [model](https://platform.openai.com/docs/models/overview) – which OpenAI model to use. We use `gpt-3.5-turbo-16k` (we explain why later in this post).
- [messages](https://platform.openai.com/docs/guides/gpt/chat-completions-api) – i.e., the task you are requesting the model to perform. You can find more details on the required format in the [API docs](https://platform.openai.com/docs/guides/gpt/chat-completions-api).

With this in mind, here's what our code looks like:

```js

// rest of the code

const analyzeSurveyAnswers = async () => {
  const surveyAnswers = await csvToArr('answers.csv')
  for (const surveyAnswer of surveyAnswers) {
    try {
      const result = await openai.chat.completions.create({
        model: "gpt-3.5-turbo-16k",
        messages: [
          {
            "role": "system", 
            "content": `Your job is to analyze survey answers. For each answer, extract the sentiment (positive or negative only) as well as the theme in the answer. 

              You must only respond with a JSON. This JSON must contain the keys "survey_answer", "sentiment", and "theme". 
              
              Here's an example of an valid answer: 
              \`\`\`
              {
                "survey_answer": "The product has potential, but it's not very intuitive to use. Please simplify the interface",
                "sentiment": "negative",
                "theme": "user interface"
              }
              \`\`\`
              `
          },
          {
            "role": "user", 
            "content": `Analyze this survey answer: ${JSON.stringify(surveyAnswer.answer)}`
          }
        ],
      });

      const analyzedAnswer = JSON.parse(result.choices[0].message.content);
    } catch (error) {
      console.log(`An error occurred: ${error}`)
    }
  }
}
```

Finally, we'll save the answer from ChatGPT into a CSV file. This way we can analyze the results later:

```js
const analyzeSurveyAnswers = async () => {
    // rest of function code...

      const analyzedAnswer = JSON.parse(result.choices[0].message.content);
      const csvLine = `"${analyzedAnswer.survey_answer}","${analyzedAnswer.sentiment}","${analyzedAnswer.theme}"\n`;
      fs.appendFile('analyzed_answers.csv', csvLine, (err) => {
        if (err) throw err;
        console.log('The analyzed answer was appended to file!');
      });
    } catch (error) {
      console.log(`An error occurred: ${error}`)
    }
  }
}
```

If you now run `node survey-analyzer.js`, you should see your analyzed answers appear in your new CSV file.

## Batching our requests

Since we submit each survey answer one at a time, it can be quite tedious waiting for the script to complete. To improve this, we can batch our survey answers so we analyze multiple at the same time. 

The only constraint is the ChatGPT model `token limit`:

A `token` can be thought of as roughly 4 characters or 0.75 words. When you make an API request, the text in the `messages` parameter and the response from the API are converted into tokens. This means that the number of tokens in your API call is number tokens in your request plus the number of tokens in the response.

The `token limit` refers to the maximum number of tokens that the model can process in a single request. If we exceed this limit, the model won't be able to handle the request, resulting in an error. Each [model](https://platform.openai.com/docs/models) has a different limit, ranging from approximately 4,000 to 32,000 tokens. 

The [`gpt-3.5-turbo-16k`](https://platform.openai.com/docs/models/gpt-3-5) model we use has a large limit (~16,000 tokens), while still being sufficiently fast and powerful for analyzing survey answers. 

This brings us to the question: **How many survey answers can we batch and analyze at the same time? **

Using [tokenizer](https://platform.openai.com/tokenizer), a tool that counts the number of tokens in a string, we see that each survey answer is roughly `60 tokens` and each response is about `120 tokens`.

So the total cost to analyze each survey answer is approximately `180 tokens`. **This means we can batch at most `16,000 / 180 = 88` answers together**. To be extra safe and ensure we don't exceed this limit, we'll batch at most 50 answers together.

Let's update our code to do that:

- First we use a variable `batchSize = 50` in our `for-loop`. 
- Next, we modify our `messages` argument to request ChatGPT to analyze multiple survey answers (instead of only one at a time). 
- Finally, we save the array from the API response into our CSV file.

```js
// rest of code...

const analyzeSurveyAnswers = async () => {
  const surveyAnswers = await csvToArr('answers.csv')
  const batchSize = 50;
  
  for (let i = 0; i < surveyAnswers.length; i += batchSize) {
    const batch = surveyAnswers.slice(i, i + batchSize);
    try {
      const result = await openai.chat.completions.create({
        model: "gpt-3.5-turbo-16k",
        messages: [
          {
            "role": "system", 
            "content": `Your job is to analyze survey answers. For each answer, extract the sentiment (positive or negative only) as well as the theme in the answer.

              You must only respond with an array containing JSONs. These JSON objects must contain the keys "survey_answer", "sentiment", and "theme". 
              
              Here's an example of an valid answer: 
              \`\`\`
              [
                {
                  "survey_answer": "The product has potential, but it's not very intuitive to use. Please simplify the interface",
                  "sentiment": "negative",
                  "theme": "user interface",
                }
              ]
              \`\`\`
              `
          },
          {
            "role": "user", 
            "content": `Analyze these survey answer: ${JSON.stringify(batch.map(surveyAnswer => surveyAnswer.answer))}`
          }
        ],
      });

      const analyzedAnswers = JSON.parse(result.choices[0].message.content);
      analyzedAnswers.forEach(r => {
        const csvLine = `"${r.survey_answer}","${r.sentiment}","${r.theme}"\n`;
        fs.appendFile('analyzed_answers.csv', csvLine, (err) => {
          if (err) throw err;
          console.log('The analyzed answer was appended to file!');
        });
      });
    } catch (error) {
      console.log(`An error occurred: ${error}`)
    }
  }
}

// rest of code...
```

Now if you run `node survey-analyzer.js`, ChatGPT analyzes 50 survey answers at a time.

## Analyzing results in Excel or Google Sheets

Now that we've analyzed our survey answers, we can import them into Excel or Google Sheets to visualize them. 

For example, you can create a [pivot table](https://support.microsoft.com/en-gb/office/create-a-pivottable-to-analyze-worksheet-data-a9a84538-bfe9-40a9-a8e9-f99134456576) to find the most common themes in the survey answers. You can do this by:

1. Importing `analyzed_answers.csv` in your sheet. Then, insert a new row at the top of the sheet so you can name the columns `answer`, `sentiment` and `theme`.
2. Clicking on the "Insert" tab, then "Pivot table".
3. Select the data range of your results.
4. In your pivot table editor, select `theme` in both the `Rows` and `Value` field. 
5. Lastly, sort by descending `COUNTA of theme`.

You should now see a sorted list of the most common themes in your survey answers.

![How to create a pivot table to analyze survey results](../images/tutorials/analyze-surveys-with-chatgpt/create-pivot-table.mp4)

## Reducing duplicate themes

You may have noticed that some of the themes suggested by ChatGPT are similar to others (but not the exact same).

For example, when we ran the script, it suggested a theme of `user permissions` for one survey answer but `user roles and permissions` for another. These are clearly the same theme, but the slightly different names mean that it's harder to aggregate the results in our pivot table.

To fix this, we create a new script `reduce-themes.js` which will aggregate similar themes together and reduce the total number of distinct themes.

In the script we:

1. Extract the themes analyzed by ChatGPT from `analyzed_answers.csv`.
2. Send this list of themes to ChatGPT and ask it aggregate it, thus reducing the number of similar themes.
3. Use the response from ChatGPT to update similar themes in `analyzed_answers.csv`

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
  const analyzedAnswers = await csvToArr('analyzed_answers.csv')  
    try {
      const themes = new Set(analyzedAnswers.map(answer => answer.theme))
      const result = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            "role": "system", 
            "content": `Your job is to aggregate this list of themes and group similar themes together. By grouping the themes together, you will reduce the number of themes in the list.
            In your answer, you must list the old theme and the new theme are you aggregating it to. 
            
            You must only respond with a JSON object. This JSON objects must use the old themes as the keys, and the values must be the new themes. 
              
              Here's an example of an valid answer: 
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

      // update the previously analyzed answers with the new themes
      const updatedAnswers = analyzedAnswers.map(old => {
        const updatedAnswer = old
        updatedAnswer.theme = newThemes[old.theme]
        return updatedAnswer
      })

      // overwrite the current contents of analyzed_answers.csv with the updated answers
      const lines = analyzedAnswers.map(r => `"${r.answer}","${r.sentiment}","${r.theme}"`).join('\n');
      fs.writeFile('analyzed_answers.csv', lines, (err) => {
        if (err) throw err;
        console.log('All analyzed answers were written to file!');
      });

    } catch (error) {
      console.log(`An error occurred: ${error}`)
    }
}

reduceThemes()
```

Now, running `node reduce-themes.js` will aggregate similar themes. If you re-import your list in Google Sheets or Excel and create a pivot table, you should see fewer themes.

## Further reading

- [How to set up surveys in Next.js](/tutorials/nextjs-surveys)
- [How to set up surveys in React](/tutorials/react-surveys) 
- [Get feedback and book user interviews with surveys](/tutorials/feedback-interviews-site-apps)
