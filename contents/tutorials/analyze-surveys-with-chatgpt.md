---
title: How to analyze surveys with ChatGPT
date: 2023-10-18
author: ["lior-neu-ner"]
showTitle: true
sidebar: Docs
featuredImage: ../images/tutorials/banners/tutorial-11.png
tags: ['surveys']
---

[Surveys](/docs/surveys) are a great way of collecting feedback from your users, especially if you ask your users open-ended questions like "How can we improve our product?". However, open-ended questions can be hard to analyze if you receive hundreds or more responses. Fortunately, OpenAI's ChatGPT is great at analyzing large amounts of text and extracting useful insights.

In this tutorial, we'll show you how to use ChatGPT to analyze your survey results. We'll create a basic Node.js script, parse a CSV of 1,000 survey response, integrate the ChatGPT API and extract useful information such as theme and sentiment from a CSV of survey responses.


## Creating a Node script and adding the OpenAI library

First, make sure [Node is installed](https://nodejs.dev/en/learn/how-to-install-nodejs/) (18.16.0 or newer). Then create a `package.json` file by running `npm init`. Give your app a name and select the defaults for all the options.

Next, we install [OpenAI's Node library ](https://github.com/openai/openai-node). Then, create a new JavaScript file for our script (we name ours `survey-analyzer.js`):

```bash
npm install openai
touch survey-analyzer.js
```

Finally, add a placeholder function to your script. This is where we'll add our code

```js
// in survey-analyzer.js

const analyzeSurveyResponses = async () => {
  // TODO: add code
}

analyzeSurveyResponses()
```


## Parsing a CSV of survey responses

In this tutorial, we'll import sample survey responses from a CSV file `responses.csv`. You can [download our sample responses here](TODO:add link). Then, add the file to your project folder.

To make things easier, we install `csv-parser`, a handy library for parsing CSVs.

```bash
npm install csv-parser
```

Next, add the following code to convert your CSV into an array:

```js
// in survey-analyzer.js

const fs = require('fs');
const csv = require('csv-parser');

const csvToArr = async (filePath) => {
  const results = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv({ headers: ['answer', 'timestamp'] })) // add your column names as needed
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
  const responses = await csvToArr('responses.csv')
}

analyzeSurveyResponses()
```

## Adding OpenAI

Now that we have our responses in an array, the next step is to use ChatGPT to analyze them. 

First, you'll need to [sign up for an OpenAI account](https://platform.openai.com/signup) and [retrieve your API key](https://help.openai.com/en/articles/4936850-where-do-i-find-my-secret-api-key). Then, initialize the OpenAI SDK in the code:

```js
// in survey-analyzer.js

const OpenAI = require("openai");

const openai = new OpenAI({
    apiKey: "<your-open-ai-api-key>"
});

// rest of the code
```

Next, for each response, we'll make an API call to ChatGPT to extract the following information from each response:

1. The sentiment of the response i.e., is it positive or negative?
2. What themes are mentioned in the responses.

Then, we'll save the response in another CSV file. This way we'll be able to analyze the results later using excel or Google sheets:

```js

// rest of the code

const analyzeSurveyResponses = async () => {
  const responses = await csvToArr('responses.csv')
  for (const response of responses) {
    try {
      const result = await openai.chat.completions.create({
        model: "gpt-4-32k",
        messages: [
          {
            "role": "system", 
            "content": `Your job is to analyze survey responses. For each response, extract the sentiment (positive or negative only) as well as 3 themes in the response. 
              You must only respond with a JSON. This JSON must contain the keys "survey_response", "sentiment", "theme_1", "theme_2", "theme_3" . 
              
              Here's an example of an valid response: 
              \`\`\`
              {
                "survey_response": "The product has potential, but it's not very intuitive to use. Please simplify the interface",
                "sentiment": "negative",
                "theme_1": "product potential",
                "theme_2": "intuitiveness",
                "theme_3": "interface simplification"
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
      const csvLine = `"${data.survey_response}","${data.sentiment}","${data.theme_1}","${data.theme_2}","${data.theme_3}"\n`;
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

There is a still an optimization we can make, though. We analyze each response one at a time, and it can be quite tedious to wait for all the responses to be analyzed. 

To improve this, we can batch our survey responses so that multiple are analyzed at the same time. However, an important consideration is that ChatGPT has a token limit. Each [model](https://platform.openai.com/docs/models) has a different limit, ranging from approximately 4,000 to 32,000 tokens. 

`[gpt-4-32k](https://platform.openai.com/docs/models/gpt-4)` has the largest limit, with 32,000 tokens. 

So how many responses will we be able to analyze? 

Using [tokenizer](https://platform.openai.com/tokenizer) tool, we see that a sample survey response of ours is roughly 60 tokens. Since each result from ChatGPT includes the original response and some extra details, that 60 + 60.

If we batch 100 responses together, that means we expect to use 18,000 tokens – comfortably within our limit

## Tokens and The Costs of the ChatGPT API

(need to rephrase and update this) 

ChatGPT's utilizes a usage-based pricing model. The cost of the api is $0.002 per 1,000 tokens. A [token](https://platform.openai.com/docs/introduction/tokens) can be thought of as roughly 4 characters or 0.75 words. When you make an API request, the text in the messages parameter is converted into tokens. The response from the API is then also converted into tokens. This means that the cost of your API request is number tokens in your request plus the number of tokens in the response.



### Analyzing in Google Sheets or Excel
