import { TooltipContent, TooltipContentProps } from 'components/GlossaryElement'
import { useLayoutData } from 'components/Layout/hooks'
import Tooltip from 'components/Tooltip'
import { Link as GatsbyLink } from 'gatsby'
import React from 'react'
import usePostHog from '../../hooks/usePostHog'
import { IconArrowUpRight } from '@posthog/icons'
import ContextMenu, { ContextMenuItemProps } from 'components/RadixUI/ContextMenu'

// Helper function to create standard context menu items
const createStandardMenuItems = (url: string, state?: any, isExternal = false): ContextMenuItemProps[] => {
    const fullUrl = url?.startsWith('/') ? `https://posthog.com${url}` : url

    return [
        {
            type: 'item',
            disabled: isExternal,
            children: isExternal ? (
                <span>Open in new PostHog window</span>
            ) : (
                <Link to={url} state={{ ...state, newWindow: true }} contextMenu={false}>
                    Open in new PostHog window
                </Link>
            ),
        },
        {
            type: 'item',
            children: (
                <a href={url} target="_blank" rel="noreferrer">
                    Open in new browser tab
                </a>
            ),
        },
        {
            type: 'item',
            children: <span onClick={() => navigator.clipboard.writeText(fullUrl)}>Copy link address</span>,
        },
    ]
}

export interface Props {
    to: string
    children: React.ReactNode
    className?: string
    wrapperClassName?: string
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
    contextMenu?: boolean
    customMenuItems?: ContextMenuItemProps[]
}

export default function Link({
    to,
    children,
    className = '',
    wrapperClassName = '',
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
    contextMenu = true,
    customMenuItems = [],
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

    // Determine if link is external
    const isExternal = Boolean(
        !internal || !!external || !!externalNoIcon || (url && !url.startsWith('/') && !url.includes('posthog.com'))
    )

    // Create context menu items
    const menuItems =
        contextMenu && url
            ? [
                  ...createStandardMenuItems(url, state, isExternal),
                  ...(customMenuItems.length > 0 ? [{ type: 'separator' as const }, ...customMenuItems] : []),
              ]
            : []

    // Wrapper function to conditionally apply context menu
    const wrapWithContextMenu = (element: JSX.Element) => {
        if (!contextMenu || !url) return element
        return (
            <ContextMenu menuItems={menuItems} className={wrapperClassName}>
                {element}
            </ContextMenu>
        )
    }

    return onClick && !url
        ? wrapWithContextMenu(
              <button onClick={handleClick} className={className} disabled={disabled}>
                  {children}
              </button>
          )
        : internal
        ? preview
            ? wrapWithContextMenu(
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
                      <GatsbyLink to={url} className={className} state={state} onClick={handleClick}>
                          {children}
                      </GatsbyLink>
                  </Tooltip>
              )
            : wrapWithContextMenu(
                  <GatsbyLink to={url} className={className} state={state} onClick={handleClick}>
                      {children}
                  </GatsbyLink>
              )
        : wrapWithContextMenu(
              <a
                  rel="noopener noreferrer"
                  onClick={handleClick}
                  href={url}
                  className={`${className} group`}
                  target={external || externalNoIcon ? '_blank' : ''}
              >
                  {external ? (
                      <span className="inline-flex justify-center items-center group">
                          <span className="font-semibold underline">{children}</span>
                          <IconArrowUpRight
                              className={`size-4 text-muted group-hover:text-secondary relative ${iconClasses}`}
                          />
                      </span>
                  ) : (
                      children
                  )}
              </a>
          )
}
