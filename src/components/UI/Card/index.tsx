import React from 'react'
import { cn } from '../../../utils'
import { cardInnerBottomRadius, cardInnerTopRadius, cardLevels, cardVariants, surfacePaddings } from '../styles'

export type CardLevel = keyof typeof cardLevels
export type CardPadding = keyof typeof surfacePaddings
export type CardVariant = keyof typeof cardVariants

const MAX_LEVEL: CardLevel = 2

const CardLevelContext = React.createContext<CardLevel | 0>(0)
export const CardVariantContext = React.createContext<CardVariant>('glass')
const CardPaddingContext = React.createContext<CardPadding>('md')

export function CardLevelBoundary({ children }: { children?: React.ReactNode }): JSX.Element {
    return (
        <CardLevelContext.Provider value={0}>
            <CardVariantContext.Provider value="glass">{children}</CardVariantContext.Provider>
        </CardLevelContext.Provider>
    )
}

const barInset: Record<CardPadding, string> = { none: 'px-4', sm: 'px-3', md: 'px-4', lg: 'px-6' }

const titleBarBleed: Record<CardPadding, string> = {
    none: '',
    sm: '-mx-3 -mt-3',
    md: '-mx-4 -mt-4',
    lg: '-mx-6 -mt-6',
}

const statusBarBleed: Record<CardPadding, string> = {
    none: '',
    sm: '-mx-3 -mb-3',
    md: '-mx-4 -mb-4',
    lg: '-mx-6 -mb-6',
}

const barSurface = 'border-[rgb(var(--text-primary)/0.12)] bg-[rgb(var(--text-primary)/0.045)] dark:bg-white/[0.035]'

export type CardRootProps = React.HTMLAttributes<HTMLDivElement> & {
    level?: CardLevel
    padding?: CardPadding
    variant?: CardVariant
}

const Root = React.forwardRef<HTMLDivElement, CardRootProps>(function CardRoot(
    { level, padding = 'md', variant, className, ...props },
    ref
) {
    const parentLevel = React.useContext(CardLevelContext)
    const parentVariant = React.useContext(CardVariantContext)
    const resolvedLevel = level ?? (Math.min(parentLevel + 1, MAX_LEVEL) as CardLevel)
    const resolvedVariant = variant ?? (parentVariant === 'solid' ? 'solid' : 'glass')

    return (
        <CardLevelContext.Provider value={resolvedLevel}>
            <CardVariantContext.Provider value={resolvedVariant}>
                <CardPaddingContext.Provider value={padding}>
                    <div
                        ref={ref}
                        data-level={resolvedLevel}
                        data-variant={resolvedVariant}
                        className={cn(
                            'flex flex-col text-primary',
                            cardLevels[resolvedLevel],
                            cardVariants[resolvedVariant],
                            surfacePaddings[padding],
                            className
                        )}
                        {...props}
                    />
                </CardPaddingContext.Provider>
            </CardVariantContext.Provider>
        </CardLevelContext.Provider>
    )
})

const Header = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): JSX.Element => (
    <div className={cn('flex flex-col gap-0.5', className)} {...props} />
)

const Title = ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>): JSX.Element => (
    <h3 className={cn('m-0 text-[15px] font-semibold leading-snug text-primary', className)} {...props} />
)

const Description = ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>): JSX.Element => (
    <p className={cn('m-0 text-sm text-secondary', className)} {...props} />
)

const Footer = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): JSX.Element => (
    <div className={cn('flex flex-wrap items-center justify-end gap-2', className)} {...props} />
)

export type CardTitleBarProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> & {
    icon?: React.ReactNode
    meta?: React.ReactNode
    actions?: React.ReactNode
}

const TitleBar = ({ icon, meta, actions, className, children, ...props }: CardTitleBarProps): JSX.Element => {
    const padding = React.useContext(CardPaddingContext)
    return (
        <div
            className={cn(
                'flex min-h-11 shrink-0 items-center gap-2.5 border-b py-2',
                cardInnerTopRadius,
                barSurface,
                barInset[padding],
                titleBarBleed[padding],
                className
            )}
            {...props}
        >
            {icon && (
                <span aria-hidden className="flex size-5 shrink-0 items-center justify-center [&>svg]:size-full">
                    {icon}
                </span>
            )}
            <h3 className="m-0 min-w-0 flex-1 truncate text-[15px] font-semibold leading-5 text-primary">{children}</h3>
            {meta && <span className="shrink-0 font-code text-[13px] text-secondary">{meta}</span>}
            {actions && <span className="-my-1 -mr-1.5 flex shrink-0 items-center gap-1">{actions}</span>}
        </div>
    )
}

const StatusBar = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): JSX.Element => {
    const padding = React.useContext(CardPaddingContext)
    return (
        <div
            className={cn(
                'flex min-h-10 shrink-0 items-center gap-2 border-t py-2 text-[13px] text-secondary',
                cardInnerBottomRadius,
                barSurface,
                barInset[padding],
                statusBarBleed[padding],
                className
            )}
            {...props}
        />
    )
}

export const Card = { Root, Header, Title, Description, Footer, TitleBar, StatusBar }
