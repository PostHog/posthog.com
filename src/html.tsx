import React from 'react'

export interface HTMLProps {
    htmlAttributes: React.DetailedHTMLProps<React.HtmlHTMLAttributes<HTMLHtmlElement>, HTMLHtmlElement>
    bodyAttributes: React.DetailedHTMLProps<React.HTMLAttributes<HTMLBodyElement>, HTMLBodyElement>
    headComponents?: JSX.Element | JSX.Element[] | null
    preBodyComponents?: JSX.Element | JSX.Element[] | null
    postBodyComponents?: JSX.Element | JSX.Element[] | null
    body: string
}

export default function HTML(props: HTMLProps): JSX.Element {
    return (
        // `lang` is a default: pages that set their own override it via htmlAttributes.
        <html lang="en" {...props.htmlAttributes}>
            <head>
                <meta charSet="utf-8" />
                <meta httpEquiv="x-ua-compatible" content="ie=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                <meta name="naver-site-verification" content="a58db4b98c2bf9e4b52a4aa0c20fcf1fcdab2793" />
                <link
                    rel="preload"
                    as="font"
                    type="font/woff2"
                    href="/fonts/squeak-bold-webfont.woff2"
                    crossOrigin="anonymous"
                />
                <link
                    rel="preload"
                    as="font"
                    type="font/woff"
                    href="/fonts/squeak-bold-webfont.woff"
                    crossOrigin="anonymous"
                />
                {/* WebMCP is an origin trial in Chrome 149-156. Without this token, document.modelContext
                    is undefined for visitors and the tools in components/WebMCP register nothing. */}
                {process.env.GATSBY_WEBMCP_ORIGIN_TRIAL_TOKEN && (
                    <meta httpEquiv="origin-trial" content={process.env.GATSBY_WEBMCP_ORIGIN_TRIAL_TOKEN} />
                )}

                {props.headComponents}
            </head>
            <body {...props.bodyAttributes} className="light" data-wallpaper="keyboard-garden">
                {props.preBodyComponents}
                {/* nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml - Gatsby body content from build, not user input */}
                <div key={`body`} id="___gatsby" dangerouslySetInnerHTML={{ __html: props.body }} />
                {/* Let server-rendered content paint before analytics, but initialize before Gatsby's app scripts. */}
                {process.env.GATSBY_POSTHOG_API_KEY && process.env.GATSBY_POSTHOG_API_HOST && (
                    <>
                        <script
                            src={
                                process.env.GATSBY_POSTHOG_ASSET_HOST
                                    ? `${process.env.GATSBY_POSTHOG_ASSET_HOST}/static/1/loader.js`
                                    : `${process.env.GATSBY_POSTHOG_API_HOST}/static/loader.js`
                            }
                            data-defer-init="true"
                            crossOrigin="anonymous"
                        />
                        <script src="/scripts/posthog-init.js" />
                    </>
                )}
                {props.postBodyComponents}
            </body>
        </html>
    )
}
