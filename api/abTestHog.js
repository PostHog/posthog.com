/* eslint-disable @typescript-eslint/no-var-requires */
const fetch = require('node-fetch')

const chatGPTSystemPrompt = `Your job is to review website pages and make recommendations on how to improve conversions on the page. Here are guidelines for best practices and common mistakes that are made:

\`\`\`
# Best practices
1. Have one goal. Landing pages shouldn’t have many equally prioritised, call-to-actions. Focus your page on one key conversion event
2. Focus on your unique selling points
3. Clear, relevant social proof. Have it above the fold. Testimonial language should be consistent with the pain and benefits listed elsewhere on the landing page.
4. Simple language. Avoid technical terms and acronyms, and write in plain language.
5. Real pain. PAS (pain - agitate - solve) is a common copywriting technique used to increase conversion. Agitate or amplify the pain with emotional language and vivid imagery.
6. Clear benefits and use cases. Visitors shouldn't have to work out how and why the product will benefit them. Tell and show them with clear benefits language, and example use cases.
\`\`\`
\`\`\`
# Common mistakes
Mistake 1: No pain.
Explanation: The visitor does have the problem you solve. But doesn’t feel the pain acutely and leaves
Fix it: Use the pain-agitate-solution framework to evoke the pain and drive conversion

Mistake 2: Objections not addressed
Explanation: The visitor has objections and doubts but they’re not addressed
Fix it: Review FAQs / support tickets and ensure common doubts are answered early on your page

Mistake 3: Lack of / bad social proof
Explanation: Visitor doesn’t trust you as your proof isn’t relevant or authentic
Fix it: add testimonials to your landing page.

Mistake 4: Complex language
Explanation: Your page language is complex and conversion decreases as a result
Fix it: Use plain language, remove buzzwords, initialisms, and acronyms.

Mistake 5: Messaging is unclear
Explanation: Your page has no clear who / what / why but you’re still expecting people to convert
Fix it: Add who you product is for, what it is and why they need it BEFORE the first CTA

Mistake 6: No USP language
Explanation: You sound like every other product in the space. Visitors cannot compare you
Fix it: Add comparison language like “the only product to… ” or "finally..." or use comparison tables

Mistake 7: All tell, no show
Explanation: Your page is only benefits language and unsupported text claims
Fix it: Add interactive demos, product animations, walkthroughs and case studies to evidence what you’re saying

Mistake 8: Centred on you, not your visitor
Explanation: Your page is focused on your business, not your visitor and their problem
Fix it: Add ‘you / your’ language, and prioritise your visitor over and over again.

Mistake 9: Poor clarity and walls of text
Explanation: Your page is difficult to scan so visitors lose interest
Fix it: Add headings to each section, break up walls of text, support with visuals

Mistake 10: Missing CTA
Explanation: The visitor likes what you do but there’s not CTA nearby when they’re ready to convert
Fix it: Lock your CTA to your menu (especially on mobile) so it’s ALWAYS available

Mistake 11: Hard to get setup
Explanation: The visitor likes your product but worries setup is too complex
Fix it: Offer templates, how-to guides, and concierge migration
\`\`\`
`

const handler = async (req, res) => {
    const { body } = req
    if (!body) return res.status(500).json({ error: 'Missing body' })
    const { websiteURL } = JSON.parse(body)
    if (!process.env.OPEN_AI_KEY) return res.status(500).json({ error: 'No Open AI key' })
    if (!websiteURL) return res.status(500).json({ error: 'Missing required fields' })

    try {
        const userPrompt = `
        Go to ${websiteURL} and make suggestions for what improvements to make. You MUST make your suggestions as A/B tests to run. You MUST only respond with a JSON array with objects. Here’s the format you must use:
        \`\`\`
            {
                testTitle: string,
                testExplanationAndReason: string,
                goalMetric: string,
                secondaryMetrics: string[],
                guardrailMetrics: string[]
            }
        \`\`\`
        You MUST only respond with this JSON, and not any other text in your response
        `

        const data = {
            model: 'gpt-4o',
            messages: [
                { role: 'system', content: chatGPTSystemPrompt },
                { role: 'user', content: userPrompt },
            ],
        }

        const url = 'https://api.openai.com/v1/chat/completions'
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.OPEN_AI_KEY}`,
            },
            body: JSON.stringify(data),
        })

        const jsonResponse = await response.json()
        return res.status(200).json({ result: jsonResponse.choices[0].message.content })
    } catch (error) {
        return res.status(500).json(error)
    }
}

export default handler
