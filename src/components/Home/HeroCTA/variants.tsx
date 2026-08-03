import React, { useRef, useState } from 'react'
import { IconCheck } from '@posthog/icons'
import { Logo } from '@posthog/brand/logo'
import { CallToAction } from 'components/CallToAction'
import PlatformInstall, { CopyableCommand, wizardInstallSchema } from 'components/PlatformInstall'
import { buildWizardCommand } from 'components/PlatformInstall/buildCommand'
import { RoughAnnotation } from 'components/Code/RoughAnnotation'
import { usePrefersReducedMotion } from 'components/Code/usePrefersReducedMotion'
import { cn } from '../../../utils'

const SIGNUP_URL = 'https://app.posthog.com/signup'
const SIGNUP_STATE = { newWindow: true, initialTab: 'signup' }

function useWindowEntrance(): string {
    return usePrefersReducedMotion() ? '' : 'animate-window-pop-in'
}

const PostHogMark = ({ size, className }: { size: number; className?: string }) => (
    <>
        <Logo layout="logomark" size={size} title="PostHog" className={cn(className, 'dark:hidden')} />
        <Logo
            layout="logomark"
            variant="mono"
            color="white"
            size={size}
            title="PostHog"
            className={cn(className, 'hidden dark:block')}
        />
    </>
)

const SignupButton = ({
    children,
    size = 'lg',
    width = 'auto',
    childClassName,
}: {
    children: React.ReactNode
    size?: 'md' | 'lg' | 'absurd'
    width?: string
    childClassName?: string
}) => (
    <CallToAction to={SIGNUP_URL} size={size} width={width} state={SIGNUP_STATE} childClassName={childClassName}>
        <>{children}</>
    </CallToAction>
)

const CheckList = ({ items }: { items: React.ReactNode[] }) => (
    <ul className="not-prose list-none p-0 m-0 space-y-1.5 text-sm text-primary">
        {items.map((item, index) => (
            <li key={index} className="flex items-start gap-1.5">
                <IconCheck className="size-4 shrink-0 text-green relative top-0.5" />
                <span>{item}</span>
            </li>
        ))}
    </ul>
)

const ClickableCommand = ({
    className,
    commandClassName,
    animate,
}: {
    className?: string
    commandClassName?: string
    animate?: boolean
}) => {
    const fieldRef = useRef<HTMLDivElement>(null)
    const { displayCommand, copyCommand } = buildWizardCommand({ subcommand: 'self-driving' })

    const copyFromAnywhere = (event: React.MouseEvent) => {
        if ((event.target as HTMLElement).closest('button')) return
        fieldRef.current?.querySelector('button')?.click()
    }

    return (
        <div ref={fieldRef} onClick={copyFromAnywhere} className={cn('cursor-pointer [&>div]:h-full', className)}>
            <CopyableCommand
                className={commandClassName}
                command={displayCommand}
                copyCommand={copyCommand}
                animate={animate}
            />
        </div>
    )
}

const CommandOrSignup = () => (
    <div className="@container border-t border-primary bg-accent px-2 py-2.5">
        <div className="flex flex-col @[380px]:flex-row @[380px]:items-center gap-1.5">
            <ClickableCommand
                className="flex-1 min-w-0"
                commandClassName="items-center bg-primary px-1.5 [&_pre]:text-xs [&_pre]:[mask-image:none] [&_pre]:[-webkit-mask-image:none]"
                animate
            />
            <span className="shrink-0 text-center text-xs font-bold uppercase text-secondary">or</span>
            <div className="shrink-0">
                <SignupButton size="md" childClassName="whitespace-nowrap">
                    Get started
                </SignupButton>
            </div>
        </div>
    </div>
)

/* -------------------------------------------------------------------------------------------------
 * A — Control. The CTA exactly as it ships today: the wizard command card, with web signup as a
 * small secondary link in the card header.
 * ---------------------------------------------------------------------------------------------- */

const VariantControl = () => <PlatformInstall schema={wizardInstallSchema} selfDriving />

const SIGNUP_CARD_POINTS = [
    '97% of users pay us $0',
    'No credit card required',
    'Setup wizard installs PostHog for you',
]

const SignupCard = ({ actions, footer }: { actions: React.ReactNode; footer?: React.ReactNode }) => {
    const entrance = useWindowEntrance()

    return (
        <div
            className={cn(
                'not-prose w-full max-w-md min-w-0 text-left border border-primary rounded-md bg-primary shadow-2xl',
                entrance
            )}
        >
            <div className="p-4 space-y-3">
                <h3 className="!text-lg font-bold text-primary m-0 flex items-center gap-2">
                    Set up
                    <PostHogMark size={30} />
                    <RoughAnnotation
                        type="highlight"
                        color="rgba(247, 165, 1, 0.15)"
                        strokeWidth={1}
                        padding={2}
                        delay={280}
                    >
                        for free
                    </RoughAnnotation>
                </h3>
                <CheckList items={SIGNUP_CARD_POINTS} />
                <div className="pt-1">{actions}</div>
            </div>
            {footer}
        </div>
    )
}

const CommandPanel = () => (
    <div className="border-t border-primary bg-accent px-4 py-3 rounded-b space-y-1.5">
        <p className="!text-xs text-secondary m-0">Already know what you want? Skip the browser:</p>
        <ClickableCommand />
    </div>
)

/* -------------------------------------------------------------------------------------------------
 * B — Dual CTA. C's card, but signup shares the row with "Install with AI", and the command starts
 * hidden behind it. Tests whether making the terminal path opt-in – rather than always on show –
 * pushes more people down the signup route, without removing the option.
 * ---------------------------------------------------------------------------------------------- */

const VariantDualCta = () => {
    const [showCommand, setShowCommand] = useState(false)

    return (
        <SignupCard
            actions={
                /* Own container so the pair splits on the card's own width, not the page's. */
                <div className="@container">
                    {/* flex-1 wrappers rather than `width="full"` alone: CallToAction's own w-full
                       sizes against the flex container, which leaves the pair visibly uneven. */}
                    <div className="flex flex-col @[340px]:flex-row gap-2">
                        <div className="flex-1 min-w-0">
                            <SignupButton width="full" childClassName="whitespace-nowrap">
                                Get started
                            </SignupButton>
                        </div>
                        <div className="flex-1 min-w-0">
                            <CallToAction
                                type="secondary"
                                size="lg"
                                width="full"
                                onClick={() => setShowCommand((current) => !current)}
                            >
                                <span className="whitespace-nowrap">Install with AI</span>
                            </CallToAction>
                        </div>
                    </div>
                </div>
            }
            footer={
                <div
                    className={cn(
                        'grid transition-[grid-template-rows] duration-300 ease-in-out',
                        showCommand ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    )}
                >
                    <div className="overflow-hidden min-h-0">
                        <CommandPanel />
                    </div>
                </div>
            }
        />
    )
}

/* -------------------------------------------------------------------------------------------------
 * C — Signup card. Same card chrome as the control, but the contents are signup-led: full-width
 * button, three concrete reasons to click it, command relegated to the footer.
 * ---------------------------------------------------------------------------------------------- */

const VariantSignupCard = () => (
    <SignupCard actions={<SignupButton width="full">Get started – free</SignupButton>} footer={<CommandPanel />} />
)

/* -------------------------------------------------------------------------------------------------
 * D — Install dialog. The CTA as a system dialog, borrowing the desktop OS paradigm the rest of the
 * site already runs on. Framing signup as a routine "Install? [OK] [Cancel]" decision is meant to
 * make it read as low-stakes rather than as a commitment.
 * ---------------------------------------------------------------------------------------------- */

const VariantInstallDialog = () => {
    const entrance = useWindowEntrance()

    return (
        <div
            className={cn(
                'not-prose w-full max-w-md min-w-0 text-left border border-primary rounded-md bg-primary shadow-2xl overflow-hidden',
                entrance
            )}
        >
            {/* Title bar, echoing the window chrome the rest of the desktop uses. */}
            <div className="flex items-center justify-between gap-2 bg-accent border-b border-primary px-3 py-1.5">
                <span className="text-xs font-bold text-primary">Install PostHog</span>
                <div className="flex items-center gap-1" aria-hidden="true">
                    <span className="block size-2.5 rounded-full border border-primary" />
                    <span className="block size-2.5 rounded-full border border-primary" />
                </div>
            </div>

            <div className="p-4 flex gap-3">
                {/* Gradient logomark reads on both light and dark, so no per-scheme swap needed. */}
                <div className="shrink-0 pt-0.5">
                    <PostHogMark size={32} />
                </div>
                <div className="min-w-0 space-y-1">
                    <p className="!text-[15px] font-bold text-primary m-0">Set up PostHog on your product?</p>
                    <p className="!text-sm text-secondary m-0">
                        No card required – 97% of users pay us $0. The wizard installs and configures PostHog for you.
                    </p>
                </div>
            </div>

            <CommandOrSignup />
        </div>
    )
}

/* -------------------------------------------------------------------------------------------------
 * E — Minimal. A primary button, then the terminal route on its own line below it: a bare "or"
 * followed by the copyable command. No card, no border around the group, no reassurance stack – just
 * the two routes and the space between them. Tests whether the supporting copy in `b`/`c` is doing
 * work or just adding weight.
 * ---------------------------------------------------------------------------------------------- */

const VariantMinimal = () => (
    <div className="not-prose w-full max-w-sm min-w-0 text-left">
        <SignupButton width="full">Get started – free</SignupButton>

        {/* "or" sits outside the copy field so the field itself stays a clean, obvious click target. */}
        <div className="mt-4 flex items-center gap-2">
            <span className="shrink-0 text-[11px] font-bold uppercase tracking-wide text-secondary">or</span>
            <ClickableCommand
                className="min-w-0 flex-1 bg-accent rounded-md"
                commandClassName="items-center [&_pre]:text-xs [&_pre]:[mask-image:none] [&_pre]:[-webkit-mask-image:none]"
            />
        </div>
    </div>
)

/* ---------------------------------------------------------------------------------------------- */

export type HeroCtaVariant = {
    id: string
    alignsWithHeadline?: boolean
    Component: () => JSX.Element
}

export const HERO_CTA_VARIANTS: HeroCtaVariant[] = [
    {
        id: 'control',
        Component: VariantControl,
    },
    {
        id: 'card-no-command',
        alignsWithHeadline: true,
        Component: VariantDualCta,
    },
    {
        id: 'card',
        alignsWithHeadline: true,
        Component: VariantSignupCard,
    },
    {
        id: 'window',
        Component: VariantInstallDialog,
    },
    {
        id: 'minimal',
        Component: VariantMinimal,
    },
]

export const DEFAULT_HERO_CTA_VARIANT = HERO_CTA_VARIANTS[0]

export function resolveHeroCtaVariant(value: string | null | undefined): HeroCtaVariant | null {
    if (!value) return null
    const normalized = value.trim().toLowerCase()
    return HERO_CTA_VARIANTS.find(({ id }) => id === normalized) ?? null
}
