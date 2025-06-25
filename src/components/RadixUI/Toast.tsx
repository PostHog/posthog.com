import * as React from 'react'
import { Toast as RadixToast } from 'radix-ui'
import OSButton from 'components/OSButton'
import { IconUndo } from '@posthog/icons'
import './css/toast.css'

const Toast = ({
    title,
    description,
    onUndo,
    className = '',
    children,
}: {
    title?: string
    description: string | (() => string)
    onUndo?: () => void
    className?: string
    children: React.ReactElement
}): JSX.Element => {
    const [open, setOpen] = React.useState(false)
    const [currentDescription, setCurrentDescription] = React.useState('')
    const containerRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
        const container = containerRef.current
        if (!container) return

        const handleClick = (e: MouseEvent) => {
            // Find all button elements in the container
            const buttons = container.querySelectorAll('button')
            const target = e.target as Element

            // Check if the click target is a button or inside a button
            const clickedButton =
                buttons.length > 0 && Array.from(buttons).some((button) => button === target || button.contains(target))

            if (clickedButton) {
                // Set the description based on current state
                const desc = typeof description === 'function' ? description() : description
                setCurrentDescription(desc)

                // Show the toast
                setOpen(true)
            }
        }

        container.addEventListener('click', handleClick)
        return () => container.removeEventListener('click', handleClick)
    }, [description])

    return (
        <RadixToast.Provider swipeDirection="right">
            <div ref={containerRef} className="[&>span]:inline-block">
                {children}
            </div>

            <RadixToast.Root
                className={`ToastRoot grid grid-cols-[auto_max-content] items-center gap-x-[15px] rounded-md bg-light dark:bg-accent border border-primary text-primary p-[15px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] [grid-template-areas:_'title_action'_'description_action'] data-[swipe=cancel]:translate-x-0 data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[state=closed]:animate-swipeOut data-[state=open]:animate-slideIn data-[swipe=end]:animate-swipeOut data-[swipe=cancel]:transition-[transform_200ms_ease-out] ${className}`}
                open={open}
                onOpenChange={setOpen}
                duration={3000}
            >
                <div className="not-prose">
                    {title && (
                        <RadixToast.Title className="text-[15px] font-semibold text-primary [grid-area:_title]">
                            {title}
                        </RadixToast.Title>
                    )}
                    <RadixToast.Description asChild>
                        <p className="text-sm !my-0 text-secondary">{currentDescription}</p>
                    </RadixToast.Description>
                </div>
                {onUndo && (
                    <RadixToast.Action
                        onClick={onUndo}
                        className="[grid-area:_action]"
                        asChild
                        altText="Goto schedule to undo"
                    >
                        <OSButton variant="ghost" size="sm" icon={<IconUndo />}>
                            Undo
                        </OSButton>
                    </RadixToast.Action>
                )}
            </RadixToast.Root>

            <RadixToast.Viewport
                className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 w-[390px] max-w-[100vw] m-0 list-none outline-none"
                data-radix-toast-viewport
            />
        </RadixToast.Provider>
    )
}

export default Toast
