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

                {process.env.GATSBY_POSTHOG_API_KEY && process.env.GATSBY_POSTHOG_API_HOST && (
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                            !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
                            posthog.init("${process.env.GATSBY_POSTHOG_API_KEY}", {
                                api_host: "${process.env.GATSBY_POSTHOG_API_HOST}",
                                capture_pageview: false,
                                persistence: 'localStorage+cookie',
                                uuid_version:'v7',
                                __preview_send_client_session_params: true,
                                session_recording: {
                                    maskAllInputs: false,
                                    maskInputOptions: {
                                        password: true,
                                    }
                                }
                            })
                            `,
                        }}
                    />
                )}

                {props.headComponents}
            </head>
            <body {...props.bodyAttributes} className="light">
                {props.preBodyComponents}
                <div key={`body`} id="___gatsby" dangerouslySetInnerHTML={{ __html: props.body }} />
                {props.postBodyComponents}
            </body>
        </html>
    )
}
