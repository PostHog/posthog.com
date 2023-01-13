import { ExternalLink } from 'components/Icons/Icons'
import { Link as GatsbyLink } from 'gatsby'
import React from 'react'
import usePostHog from '../../hooks/usePostHog'
import Tooltip from 'components/Tooltip'
import LinkPreview from 'components/LinkPreview'
import { ILinkPreview } from 'components/LinkPreview'

export interface Props {
    to: string
    children: React.ReactNode
    className?: string
    onClick?: (e: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLAnchorElement>) => void
    disablePrefetch?: boolean
    external?: boolean
    externalNoIcon?: boolean
    iconClasses?: string
    state?: any
    event?: string
    href?: string
    glossary?: ILinkPreview[]
    preview?: ILinkPreview
}

export default function Link({
    to,
    children,
    className = '',
    onClick,
    disablePrefetch,
    external,
    externalNoIcon,
    iconClasses = '',
    state = {},
    event = '',
    href,
    glossary,
    ...other
}: Props) {
    const posthog = usePostHog()
    const handleClick = (e: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLAnchorElement>) => {
        if (event && posthog) {
            posthog.capture(event)
        }
        onClick && onClick(e)
    }
    const url = to || href
    const internal = !disablePrefetch && url && /^\/(?!\/)/.test(url)
    const preview =
        other.preview ||
        glossary?.find((glossaryItem) => {
            return glossaryItem?.url === url?.replace(/https:\/\/posthog.com/gi, '')
        })
    return onClick && !url ? (
        <button onClick={handleClick} className={className}>
            {children}
        </button>
    ) : internal ? (
        preview ? (
            <Tooltip
                content={
                    <LinkPreview
                        title={preview.title}
                        url={url}
                        body={preview.body}
                        video={preview.video}
                        date={preview.date}
                        users={preview.users}
                        ctaText="Continue reading"
                        tableOfContents={preview.tableOfContents}
                    />
                }
            >
                <GatsbyLink {...other} to={url} className={className} state={state} onClick={handleClick}>
                    {children}
                </GatsbyLink>
            </Tooltip>
        ) : (
            <GatsbyLink {...other} to={url} className={className} state={state} onClick={handleClick}>
                {children}
            </GatsbyLink>
        )
    ) : (
        <a
            target={external || externalNoIcon ? '_blank' : ''}
            rel="noopener noreferrer"
            onClick={handleClick}
            {...other}
            href={url}
            className={`${className} group`}
        >
            {external ? (
                <span className="inline-flex justify-center items-center space-x-1 group">
                    <span className="font-bold">{children}</span>
                    <ExternalLink
                        className={`text-primary dark:text-primary-dark opacity-30 group-hover:opacity-50 ${iconClasses}`}
                    />
                </span>
            ) : (
                children
            )}
        </a>
    )
}
