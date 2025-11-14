import React from 'react'

interface TapeButtonProps {
    label?: string
    icon: string | React.ReactNode
    onClick: () => void
    disabled?: boolean
    isPressed?: boolean
    className?: string
}

export default function TapeButton({
    label,
    icon,
    onClick,
    disabled = false,
    isPressed = false,
    className = '',
}: TapeButtonProps): JSX.Element {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`flex flex-col items-center gap-1 disabled:opacity-30 w-full ${className} `}
        >
            <div className="relative size-full bg-accent border-2 border-primary rounded top-[2px]">
                <div
                    className={`absolute inset-0 border-2 flex items-center justify-center mx-[-1px] ${
                        disabled
                            ? 'translate-y- border-primary'
                            : isPressed
                            ? 'translate-y-0 rounded-none bg-accent/70 border-primary'
                            : '-translate-y-1 active:translate-y-0 active:rounded-none rounded bg-primary active:bg-accent/70 border-primary/80 active:border-primary'
                    }`}
                >
                    <div className="text-xl font-bold text-secondary opacity-80 leading-none">{icon}</div>
                </div>
            </div>
            {label && <div className="text-[9px] font-bold text-secondary uppercase tracking-wide">{label}</div>}
        </button>
    )
}
