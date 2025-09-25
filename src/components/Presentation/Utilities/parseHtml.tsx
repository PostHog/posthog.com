import React from 'react'
import Link from 'components/Link'

interface ParseHtmlProps {
    content: string
    className?: string
}

export default function ParseHtml({ content, className }: ParseHtmlProps) {
    // Check if content starts with an HTML element
    const startsWithHtmlElement = /^<[a-zA-Z][^>]*>/.test(content.trim())

    // Function to parse HTML and convert internal links
    const parseHtmlWithLinks = (html: string) => {
        // Create a temporary div to parse the HTML
        const tempDiv = document.createElement('div')
        tempDiv.innerHTML = html

        // Find all anchor tags
        const links = tempDiv.querySelectorAll('a')

        links.forEach((link) => {
            const href = link.getAttribute('href')
            if (href && href.startsWith('/')) {
                // This is an internal link - we'll handle it specially
                link.setAttribute('data-internal-link', href)
                link.setAttribute('data-link-text', link.textContent || '')
                link.innerHTML = `<span class="font-semibold underline">${link.textContent}</span>`
            }
        })

        return tempDiv.innerHTML
    }

    // Function to render the parsed HTML with React components
    const renderParsedHtml = (html: string) => {
        const tempDiv = document.createElement('div')
        tempDiv.innerHTML = html

        const processNode = (node: Element | ChildNode): React.ReactNode => {
            if (node.nodeType === Node.TEXT_NODE) {
                return node.textContent
            }

            if (node.nodeType === Node.ELEMENT_NODE) {
                const element = node as Element

                // Handle internal links
                if (element.tagName === 'A' && element.hasAttribute('data-internal-link')) {
                    const href = element.getAttribute('data-internal-link')
                    const text = element.getAttribute('data-link-text') || ''
                    return (
                        <Link
                            key={Math.random()}
                            to={href || ''}
                            state={{ newWindow: true }}
                            className="font-semibold underline"
                        >
                            {text}
                        </Link>
                    )
                }

                // Handle other elements recursively
                const children = Array.from(element.childNodes).map(processNode)

                switch (element.tagName) {
                    case 'P':
                        return <p key={Math.random()}>{children}</p>
                    case 'UL':
                        return <ul key={Math.random()}>{children}</ul>
                    case 'LI':
                        return <li key={Math.random()}>{children}</li>
                    case 'STRONG':
                        return <strong key={Math.random()}>{children}</strong>
                    case 'EM':
                        return <em key={Math.random()}>{children}</em>
                    default:
                        return <span key={Math.random()}>{children}</span>
                }
            }

            return null
        }

        return Array.from(tempDiv.childNodes).map(processNode)
    }

    // Parse the HTML to identify internal links
    const parsedHtml = parseHtmlWithLinks(content)

    if (startsWithHtmlElement) {
        return <div className={className}>{renderParsedHtml(parsedHtml)}</div>
    }

    return <p className={className}>{renderParsedHtml(parsedHtml)}</p>
}
