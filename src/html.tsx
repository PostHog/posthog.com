import React from 'react'
import PropTypes from 'prop-types'

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
                <link
                    rel="preload"
                    as="font"
                    type="font/woff2"
                    href="//d27nj4tzr3d5tm.cloudfront.net/Website-Assets/Fonts/Matter/MatterSQVF.woff2"
                    crossOrigin="anonymous"
                />
                <link
                    rel="preload"
                    as="font"
                    type="font/woff2"
                    href="//d27nj4tzr3d5tm.cloudfront.net/Website-Assets/Fonts/Matter/MatterSQItalicVF.woff2"
                    crossOrigin="anonymous"
                />
                <script src="https://www.workable.com/assets/embed.js" type="text/javascript" async></script>

                {props.headComponents}
            </head>
            <body {...props.bodyAttributes} className="dark">
                {props.preBodyComponents}
                <div key={`body`} id="___gatsby" dangerouslySetInnerHTML={{ __html: props.body }} />
                {props.postBodyComponents}
            </body>
        </html>
    )
}

HTML.propTypes = {
    htmlAttributes: PropTypes.object,
    headComponents: PropTypes.array,
    bodyAttributes: PropTypes.object,
    preBodyComponents: PropTypes.array,
    body: PropTypes.string,
    postBodyComponents: PropTypes.array,
}
