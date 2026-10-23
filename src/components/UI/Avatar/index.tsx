import React from 'react'
import { Avatar as BaseAvatar } from '@base-ui/react/avatar'
import { cn } from '../../../utils'
import { mergeClassName, withClassName } from '../utils'

export type AvatarSize = 'sm' | 'md' | 'lg'

const avatarSizes: Record<AvatarSize, string> = {
    sm: 'size-6 text-[10px]',
    md: 'size-8 text-[13px]',
    lg: 'size-10 text-[15px]',
}

const groupOverlap: Record<AvatarSize, string> = {
    sm: '-space-x-1',
    md: '-space-x-1.5',
    lg: '-space-x-2',
}

const avatarCircle =
    'inline-flex shrink-0 select-none items-center justify-center overflow-hidden rounded-full border border-primary bg-accent align-middle font-semibold leading-none text-secondary'

const stackedRing = 'ring-2 ring-[rgb(var(--bg))]'

const AvatarGroupContext = React.createContext<AvatarSize | null>(null)

export type AvatarRootProps = Omit<BaseAvatar.Root.Props, 'ref'> & {
    size?: AvatarSize
}

const Root = React.forwardRef<HTMLSpanElement, AvatarRootProps>(function AvatarRoot(
    { size: ownSize = 'md', className, ...props },
    ref
) {
    const groupSize = React.useContext(AvatarGroupContext)
    const size = groupSize ?? ownSize

    return (
        <BaseAvatar.Root
            ref={ref}
            className={mergeClassName(cn(avatarCircle, avatarSizes[size], groupSize && stackedRing), className)}
            {...props}
        />
    )
})

const Image = withClassName(
    BaseAvatar.Image,
    'size-full object-cover transition-opacity duration-150 ease-out data-[starting-style]:opacity-0 data-[ending-style]:opacity-0 motion-reduce:transition-none'
)

const Fallback = withClassName(BaseAvatar.Fallback, 'flex size-full items-center justify-center uppercase')

export type AvatarGroupProps = React.HTMLAttributes<HTMLDivElement> & {
    size?: AvatarSize
    max?: number
    reverse?: boolean
}

const Group = React.forwardRef<HTMLDivElement, AvatarGroupProps>(function AvatarGroup(
    { size = 'md', max, reverse = false, className, children, ...props },
    ref
) {
    const avatars = React.Children.toArray(children)
    const shown = max === undefined ? avatars : avatars.slice(0, max)
    const hiddenCount = avatars.length - shown.length
    const stackedAvatars = reverse
        ? shown.map((avatar, index) => {
              if (!React.isValidElement(avatar)) {
                  return avatar
              }
              const element = avatar as React.ReactElement<{
                  style?: React.CSSProperties | ((state: unknown) => React.CSSProperties | undefined)
              }>
              const style = element.props.style
              const stackStyle: React.CSSProperties = { position: 'relative', zIndex: shown.length - index }
              return React.cloneElement(element, {
                  style:
                      typeof style === 'function'
                          ? (state: unknown) => ({ ...style(state), ...stackStyle })
                          : { ...style, ...stackStyle },
              })
          })
        : shown

    return (
        <AvatarGroupContext.Provider value={size}>
            <div
                ref={ref}
                role="group"
                className={cn('isolate flex items-center', groupOverlap[size], className)}
                {...props}
            >
                {stackedAvatars}
                {hiddenCount > 0 && (
                    <span className={cn(avatarCircle, avatarSizes[size], stackedRing, 'tabular-nums')}>
                        +{hiddenCount}
                        <span className="sr-only"> more</span>
                    </span>
                )}
            </div>
        </AvatarGroupContext.Provider>
    )
})

export const Avatar = { Root, Image, Fallback, Group }
