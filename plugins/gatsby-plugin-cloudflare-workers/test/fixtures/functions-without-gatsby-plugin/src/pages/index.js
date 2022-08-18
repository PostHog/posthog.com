import * as React from 'react'

// styles
const pageStyles = {
    color: '#232129',
    paddingLeft: 60,
    fontFamily: '-apple-system, Roboto, sans-serif, serif',
}

const listStyles = {
    marginBottom: 96,
    paddingLeft: 0,
}
const listItemStyles = {
    fontWeight: 300,
    fontSize: 24,
    maxWidth: 560,
    marginBottom: 10,
}

const linkStyle = {
    color: '#8954A8',
    fontWeight: 'bold',
    fontSize: 16,
    verticalAlign: '5%',
}

const descriptionStyle = {
    color: '#232129',
    fontSize: 14,
    marginTop: 10,
    marginBottom: 0,
    lineHeight: 1.25,
}

// data
const links = [
    { text: 'Hello World', url: 'api/hello-world', description: '' },
    {
        text: 'I Am Capitalized',
        url: 'api/I-Am-Capitalized',
        description: 'Shows case-sensitive URLs',
    },
    {
        text: 'Cookies',
        url: 'api/cookie-me',
        description: 'Reads browser cookies',
    },
    { text: 'Cors', url: 'api/cors', description: 'Uses custom middleware' },
    {
        text: 'env var',
        url: 'api/env-variables',
        description: 'Reads .env var from build',
    },
    {
        text: 'Error caught',
        url: 'api/error-send-function-twice',
        description: "Doesn't crash the server on error",
    },
    {
        text: 'JSON output',
        url: 'api/i-am-json',
        description: 'Uses json() helper',
    },
    {
        text: 'I am TypeScript',
        url: 'api/i-am-typescript',
        description: 'Is a TypeScript function',
    },
    {
        text: 'Value parser',
        url: 'api/parser?message=These are query params&another=And so is this&hint=Try a form or JSON body POST',
        description: 'Parses body. POST to me',
    },
    {
        text: 'Redirect',
        url: 'api/redirect-me',
        description: 'Redirects back to this page',
    },
    { text: 'Whitespace in URL', url: 'api/some whitespace' },
    { text: 'Accented characters', url: 'api/some-àè-french' },
    { text: 'Non-latin characters', url: 'api/some-אודות' },
    {
        text: 'Status',
        url: 'api/status?code=418',
        description: 'Sets status code using status() helper',
    },
    { text: 'Directory index', url: 'api/a-directory' },
    {
        text: 'Directory subpage',
        url: 'api/a-directory/function',
    },
    {
        text: 'Directory catch-all',
        url: 'api/dir/anything-here',
        description: 'Change the catch-all value and see captured value',
    },
    {
        text: 'Directory catch-all override',
        url: 'api/dir/function',
        description: 'A named function overrides the catch-all',
    },
    {
        text: 'Named params',
        url: 'api/users/123/hello world',
        description: 'Captures named path params',
    },
]

// markup
const IndexPage = () => {
    React.useEffect(() => {
        document.cookie = 'thiscookie=was%20set%20on%20previous%20page'
    })
    return (
        <main style={pageStyles}>
            <title>Home Page</title>
            <h1>Gatsby Functions demo</h1>
            <ul style={listStyles}>
                {links.map((link) => (
                    <li key={link.url} style={{ ...listItemStyles, color: link.color }}>
                        <span>
                            <a style={linkStyle} href={link.url}>
                                {link.text}
                            </a>
                            {link.description && <p style={descriptionStyle}>{link.description}</p>}
                        </span>
                    </li>
                ))}
                <li style={listItemStyles} key="form">
                    <span>
                        <span style={linkStyle}>Form parser</span>
                        <form action="/api/parser" method="POST">
                            <input type="hidden" name="hidden" value="hidden field" />

                            <input type="text" name="text" defaultValue="A text value" />

                            <button type="Submit">Submit</button>
                        </form>
                        <p style={descriptionStyle}>
                            A form posted to the parser. Also try using Postman or Insomnia to send a JSON body.
                        </p>
                    </span>
                </li>
                <li style={listItemStyles} key="file">
                    <span>
                        <span style={linkStyle}>Form parser</span>
                        <form action="/api/parser" method="POST" encType="multipart/form-data">
                            <input type="hidden" name="hidden" value="hidden field" />

                            <input type="file" name="myFile" />

                            <button type="Submit">Upload</button>
                        </form>
                        <p style={descriptionStyle}>A file upload</p>
                    </span>
                </li>
            </ul>
            <img
                alt="Gatsby G Logo"
                src="data:image/svg+xml,%3Csvg width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 2a10 10 0 110 20 10 10 0 010-20zm0 2c-3.73 0-6.86 2.55-7.75 6L14 19.75c3.45-.89 6-4.02 6-7.75h-5.25v1.5h3.45a6.37 6.37 0 01-3.89 4.44L6.06 9.69C7 7.31 9.3 5.63 12 5.63c2.13 0 4 1.04 5.18 2.65l1.23-1.06A7.959 7.959 0 0012 4zm-8 8a8 8 0 008 8c.04 0 .09 0-8-8z' fill='%23639'/%3E%3C/svg%3E"
            />
        </main>
    )
}

export default IndexPage
