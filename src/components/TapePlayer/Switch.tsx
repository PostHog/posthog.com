import React from 'react'

interface SwitchProps {
    label: string | JSX.Element
    isOn: boolean
    onToggle: () => void
    disabled?: boolean
}

export default function Switch({ label, isOn, onToggle, disabled = false }: SwitchProps): JSX.Element {
    return (
        <div className="flex flex-col items-center">
            <div className="text-[10px] font-bold text-primary uppercase tracking-wider text-center leading-tight mb-1 h-[25px]">
                {label}
            </div>
            <div className="relative w-16 h-32 border-2 border-primary bg-primary rounded shadow-inner p-2">
                <div className="absolute top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold text-primary z-10">
                    ON
                </div>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] font-bold text-primary z-10">
                    OFF
                </div>

                {/* Switch cutout */}
                <button
                    onClick={() => !disabled && onToggle()}
                    disabled={disabled}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-16 bg-accent/40 border-2 border-primary/70 rounded-sm disabled:opacity-50"
                >
                    <div
                        className={`absolute h-[calc(50%-4px)] bg-[#b6b7af]/70 border border-[#b6b7af] dark:bg-[#4a4e5c]/70 dark:border-[#4a4e5c] w-[calc(100%+4px)] left-[-2px] rounded-[2px] ${
                            isOn && !disabled
                                ? 'top-[8px] rounded-br-none rounded-bl-none'
                                : 'bottom-[8px] rounded-tr-none rounded-tl-none'
                        }`}
                    />

                    {/* Toggle bar that slides */}
                    <div
                        className={`absolute h-[8px] bg-white dark:bg-primary border border-[#b6b7af] dark:border-[#4a4e5c] w-[calc(100%+4px)] left-[-2px] rounded-[2px] ${
                            isOn && !disabled ? 'top-[4px]' : 'bottom-[4px]'
                        }`}
                    />
                </button>
            </div>
        </div>
    )
}
