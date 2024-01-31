import { TooltipContent, TooltipContentProps } from 'components/GlossaryElement'
import { ExternalLink } from 'components/Icons/Icons'
import { useLayoutData } from 'components/Layout/hooks'
import Tooltip from 'components/Tooltip'
import { Link as GatsbyLink } from 'gatsby'
import React from 'react'
import usePostHog from '../../hooks/usePostHog'

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
    glossary?: TooltipContentProps[]
    preview?: TooltipContentProps
    disabled?: boolean
}

export default function Link({
    to,
    children,
    className = '',
    disabled,
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
    const { compact } = useLayoutData()
    const posthog = usePostHog()
    const url = to || href
    const internal = !disablePrefetch && url && /^\/(?!\/)/.test(url)
    const preview =
        other.preview ||
        glossary?.find((glossaryItem) => {
            return glossaryItem?.slug === url?.replace(/https:\/\/posthog.com/gi, '')
        })

    const handleClick = (e: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLAnchorElement>) => {
        if (compact && url && !internal) {
            e.preventDefault()
            if (/(eu|app)\.posthog\.com/.test(url)) {
                window.parent.postMessage(
                    {
                        type: 'external-navigation',
                        url,
                    },
                    '*'
                )
            } else {
                window.open(url, '_blank', 'noopener,noreferrer')
            }
        }
        if (event && posthog) {
            posthog.capture(event)
        }
        onClick && onClick(e)
    }

    return onClick && !url ? (
        <button onClick={handleClick} className={className} disabled={disabled}>
            {children}
        </button>
    ) : internal ? (
        preview ? (
            <Tooltip
                offset={[0, 0]}
                placement="left-start"
                content={(setOpen) => (
                    <TooltipContent
                        setOpen={setOpen}
                        title={preview.title}
                        slug={url}
                        description={preview.description}
                        video={preview.video}
                    />
                )}
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
            rel="noopener noreferrer"
            onClick={handleClick}
            {...other}
            href={url}
            className={`${className} group`}
            target={external || externalNoIcon ? '_blank' : ''}
        >
            {external ? (
                <span className="inline-flex justify-center items-center space-x-1 group">
                    <span className="font-semibold">{children}</span>
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
