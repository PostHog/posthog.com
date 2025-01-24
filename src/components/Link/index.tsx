import { TooltipContent, TooltipContentProps } from 'components/GlossaryElement'
import { useLayoutData } from 'components/Layout/hooks'
import Tooltip from 'components/Tooltip'
import { Link as GatsbyLink } from 'gatsby'
import React from 'react'
import usePostHog from '../../hooks/usePostHog'
import { IconArrowUpRight } from '@posthog/icons'

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
}: Props): JSX.Element {
    const { compact } = useLayoutData()
    const posthog = usePostHog()
    const url = to || href
    const internal = !disablePrefetch && url && /^\/(?!\/)/.test(url)
    const isPostHogAppUrl = url && /(eu|us|app)\.posthog\.com/.test(url)
    const preview =
        other.preview ||
        glossary?.find((glossaryItem) => {
            return glossaryItem?.slug === url?.replace(/https:\/\/posthog.com/gi, '')
        })

    const handleClick = async (e: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLAnchorElement>) => {
        if (isPostHogAppUrl) {
            posthog?.createPersonProfile?.()
        }
        if (event && posthog) {
            posthog.capture(event)
        }
        onClick && onClick(e)
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
    }

    return onClick && !url ? (
        <button onClick={handleClick} className={className} disabled={disabled}>
            {children}
        </button>
    ) : internal ? (
        preview ? (
            <Tooltip
                tooltipClassName={compact ? 'hidden' : ''}
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
                <span className="inline-flex justify-center items-center group">
                    <span className="font-semibold">{children}</span>
                    <IconArrowUpRight
                        className={`size-4 text-primary dark:text-primary-dark opacity-50 group-hover:opacity-90 relative ${iconClasses}`}
                    />
                </span>
            ) : (
                children
            )}
        </a>
    )
}
