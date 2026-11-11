import React from 'react'
import SiteLink from 'components/Link'
import type { Props as SiteLinkProps } from 'components/Link'
import { cn } from '../../utils'
import { colorSoft, colorSoftEdge, colorSolid, colorSolidEdge } from './colors'
import type { ColorName } from './colors'
import { Popover } from './Popover'
import { PreviewCard } from './PreviewCard'
import { neutralTagLink, neutralTagSurface, tintedLink } from './styles'

export type TagColor = ColorName | 'white'

export type TagAppearance = 'solid' | 'soft'

export type TagLabelProps = Omit<React.HTMLAttributes<HTMLSpanElement>, 'color' | 'children' | 'className'> & {
    href?: undefined
    preview?: React.ReactNode
}

export type TagLinkProps = Omit<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    'color' | 'href' | 'target' | 'children' | 'className' | 'contextMenu' | 'onClick'
> &
    Pick<SiteLinkProps, 'state' | 'event' | 'externalNoIcon' | 'onClick'> & {
        href: string
        preview?: React.ReactNode
    }

export function tagSurface(color: TagColor, appearance: TagAppearance): string {
    if (color === 'white') return neutralTagSurface
    return appearance === 'solid'
        ? cn('border-transparent', colorSolid[color], colorSolidEdge[color])
        : cn('border-transparent', colorSoft[color], colorSoftEdge[color])
}

type TagShellProps = (TagLabelProps | TagLinkProps) & {
    className: string
    color: TagColor
    inline: boolean
    children: React.ReactNode
}

const previewPopupWidth = 'w-64'

export const TagShell = React.forwardRef<HTMLSpanElement, TagShellProps>(function TagShell(
    { className, color, inline, children, ...ownProps },
    ref
) {
    const interactive = cn(className, color === 'white' ? neutralTagLink : tintedLink)

    if (typeof ownProps.href === 'string') {
        const { href, preview, ...linkProps } = ownProps
        const link = (
            <SiteLink contextMenu={false} {...linkProps} to={href} className={interactive}>
                {children}
            </SiteLink>
        )
        if (!preview) return link
        return (
            <PreviewCard.Root>
                <PreviewCard.Trigger
                    appearance="none"
                    render={<span className={inline ? 'inline' : 'inline-flex min-w-0 max-w-full'} />}
                >
                    {link}
                </PreviewCard.Trigger>
                <PreviewCard.Popup className={previewPopupWidth}>
                    <PreviewCard.Arrow />
                    {preview}
                </PreviewCard.Popup>
            </PreviewCard.Root>
        )
    }

    const { preview, ...spanProps } = ownProps

    if (preview) {
        return (
            <Popover.Root>
                <Popover.Trigger
                    openOnHover
                    render={
                        <button
                            {...(spanProps as React.ButtonHTMLAttributes<HTMLButtonElement>)}
                            ref={ref as React.Ref<HTMLButtonElement>}
                            type="button"
                            className={interactive}
                        />
                    }
                >
                    {children}
                </Popover.Trigger>
                <Popover.Popup className={previewPopupWidth}>
                    <Popover.Arrow />
                    {preview}
                </Popover.Popup>
            </Popover.Root>
        )
    }

    return (
        <span ref={ref} className={className} {...spanProps}>
            {children}
        </span>
    )
})
