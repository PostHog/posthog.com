/* eslint-disable @typescript-eslint/no-var-requires */
const chromium = require('chrome-aws-lambda')

exports.handler = async () => {
    const browser = await chromium.puppeteer.launch({
        args: chromium.args,
        executablePath: process.env.NETLIFY_DEV ? undefined : await chromium.executablePath,
        headless: chromium.headless,
    })

    const page = await browser.newPage()

    const html = `<html>
    <head>
      <meta charset="utf-8" />
      <style>
        body {
          background-color: #eeefe9;
          font-family: "Arial", "Helvetica", "sans-serif";
          overflow: hidden;
        }
        ul {
          margin: 0;
          list-style: none;
          padding: 0;
        }
        ul li h3 {
          margin: 0;
          font-size: 22px;
          white-space: nowrap;
          line-height: 1.7;
          margin: 14px 0px;
        }
        ul li h3 span {
          opacity: 50%;
        }
      </style>
    </head>
  
    <body>
      <section>
        <div
          style="
            font-size: 32px;
            padding: 38px 70px 28px;
            font-weight: 600;
            border-bottom: 2px dashed #d4d4d4;
          "
        >
          <span style="opacity: 50%;">NEXT STEPS</span>
        </div>
        <div style="padding: 54px 70px">
          <h1 id="title" style="font-size: 84px; margin: 0; line-height: 1">
            Hey team! 👋
          </h1>
          <div style="display: flex; margin-top: 35px">
            <div style="flex-shrink: 0">
              <p
                style="
                  max-width: 607px;
                  font-size: 42px;
                  margin: 0;
                  color: #2c2c2c;
                  line-height: 1.4;
                "
              >
                We’ve created this handy guide to answer common questions you or
                your team may have.
              </p>
            </div>
            <div
              style="
                margin-left: 46px;
                background-color: #e5e7e0;
                padding: 36px 40px;
                border-radius: 6px;
              "
            >
              <h2 style="font-size: 24px; opacity: 40%; margin: 0 0 25px">
                CONTENTS
              </h2>
              <ul>
                <li>
                  <h3>
                    Installing PostHog<span
                      >......................................................</span
                    >
                  </h3>
                </li>
                <li>
                  <h3>
                    Plans & pricing<span
                      >......................................................</span
                    >
                  </h3>
                </li>
                <li>
                  <h3>
                    How teams are using PostHog<span
                      >......................................................</span
                    >
                  </h3>
                </li>
                <li>
                  <h3>
                    Popular tutorials<span
                      >......................................................</span
                    >
                  </h3>
                </li>
                <li>
                  <h3>
                    Learn more about PostHog<span
                      >......................................................</span
                    >
                  </h3>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </body>
  </html>
  `

    await page.setContent(html, {
        waitUntil: ['domcontentloaded'],
    })

    await page.evaluateHandle('document.fonts.ready')

    await page.setViewport({
        width: 1200,
        height: 630,
    })

    const buffer = await page.screenshot({
        type: 'jpeg',
    })

    await browser.close()

    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'image/jpeg',
        },
        body: buffer.toString('base64'),
        isBase64Encoded: true,
    }
}
