import React, { useState, useRef, useEffect } from 'react'

interface Option {
    label: string
    value: string
}

interface DropDownProps {
    title: string
    required?: boolean
    path: string
    options: Option[]
    className?: string
}

const DropDown: React.FC<DropDownProps> = ({ title, required, path, options, className }) => {
    // Keep track of the selected option; null means no selection yet.
    const [selected, setSelected] = useState<Option | null>(null)
    // Control whether the dropdown is open.
    const [isOpen, setIsOpen] = useState(false)
    const wrapperRef = useRef<HTMLDivElement>(null)

    // Close the dropdown when clicking outside.
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleSelect = (option: Option) => {
        setSelected(option)
        setIsOpen(false)
    }

    return (
        <div className={`relative ${className}`} ref={wrapperRef}>
            {/* Hidden input to allow form submission */}
            <input
                type="hidden"
                name={title}
                data-path={path}
                required={required}
                value={selected ? selected.value : ''}
            />
            {/* The visible button that mimics a select element */}
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className="text-left px-3 py-2 w-full block"
            >
                {selected ? selected.label : 'Select an option'}
            </button>
            {isOpen && (
                <ul className="absolute list-none z-10 w-full bg-gray-20 dark:bg-black/80 border border-black rounded-sm shadow-lg max-h-60 overflow-auto">
                    {options
                        .filter(({ value }, index) => index !== 0 || value !== '')
                        .map((option) => (
                            <li
                                key={option.value}
                                onClick={() => handleSelect(option)}
                                className="cursor-pointer px-3 py-2 hover:bg-gray-200 dark:hover:bg-gray-700"
                            >
                                {option.label}
                            </li>
                        ))}
                </ul>
            )}
        </div>
    )
}

export default DropDown
