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
                <script src="https://www.workable.com/assets/embed.js" type="text/javascript" async></script>

                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
                <link
                    href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,700;1,400&display=swap"
                    rel="stylesheet"
                ></link>

                {props.headComponents}
            </head>
            <body {...props.bodyAttributes} className="light">
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
              (function() {
                  window.__onThemeChange = function() {};
                  function setTheme(newTheme) {
                    window.__theme = newTheme;
                    preferredTheme = newTheme;
                    document.body.className = newTheme;
                    window.__onThemeChange(newTheme);
                  }
                  var preferredTheme;
                  try {
                    preferredTheme = localStorage.getItem('theme');
                  } catch (err) { }
                  window.__setPreferredTheme = function(newTheme) {
                    setTheme(newTheme);
                    try {
                      localStorage.setItem('theme', newTheme);
                    } catch (err) {}
                  }
                  var darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
                  darkQuery.addListener(function(e) {
                    window.__setPreferredTheme(e.matches ? 'dark' : 'light')
                  });
                  setTheme(preferredTheme || (darkQuery.matches ? 'dark' : 'light'));
              })();
            `,
                    }}
                />
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
