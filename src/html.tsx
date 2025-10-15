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
        <html {...props.htmlAttributes}>
            <head>
                <meta charSet="utf-8" />
                <meta httpEquiv="x-ua-compatible" content="ie=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

                <link
                    href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,100..700;1,100..700&display=swap"
                    rel="stylesheet"
                />

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
                {process.env.GATSBY_POSTHOG_API_KEY && process.env.GATSBY_POSTHOG_API_HOST && (
                    <script src="/scripts/posthog-init.js" />
                )}

                {props.headComponents}
            </head>
            <body {...props.bodyAttributes} className="light" data-wallpaper="keyboard-garden">
                {props.preBodyComponents}
                <div key={`body`} id="___gatsby" dangerouslySetInnerHTML={{ __html: props.body }} />
                {props.postBodyComponents}
            </body>
        </html>
    )
}
