import React, { useState, useRef, useEffect, useMemo } from 'react'
import { IconChevronDown, IconSearch, IconCheck, IconInfo } from '@posthog/icons'
import Tooltip from 'components/RadixUI/Tooltip'

interface SelectOption {
    label: string
    value: any
    disabled?: boolean
    icon?: string | React.ReactNode
    color?: string
    description?: string
}

interface SelectProps {
    label: string
    options: SelectOption[]
    value?: any
    onChange: (value: any) => void
    placeholder?: string
    direction?: 'row' | 'column'
    size?: 'sm' | 'md' | 'lg'
    width?: 'full' | 'auto' | 'fit'
    required?: boolean
    showLabel?: boolean
    labelWidth?: string
    tooltip?: string | React.ReactNode
    description?: string
    disabled?: boolean
    searchable?: boolean
    searchPlaceholder?: string
    maxHeight?: string
    dataScheme?: 'primary' | 'secondary' | 'tertiary'
    className?: string
    containerClassName?: string
    touched?: boolean
    error?: string
}

const OSSelect = ({
    label,
    options = [],
    value,
    onChange,
    placeholder = 'Select an option...',
    direction = 'row',
    size = 'md',
    width = 'full',
    required = false,
    showLabel = true,
    labelWidth,
    tooltip,
    description,
    disabled = false,
    searchable = true,
    searchPlaceholder = 'Search...',
    maxHeight = 'max-h-60',
    dataScheme,
    className = '',
    containerClassName = '',
    touched = false,
    error,
}: SelectProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [highlightedIndex, setHighlightedIndex] = useState(-1)
    const containerRef = useRef<HTMLDivElement>(null)
    const selectRef = useRef<HTMLDivElement>(null)
    const searchInputRef = useRef<HTMLInputElement>(null)
    const optionRefs = useRef<(HTMLButtonElement | null)[]>([])

    const sizeClasses = {
        sm: 'px-1.5 py-1 text-sm',
        md: 'px-2.5 py-2 text-[15px]',
        lg: 'px-3 py-2.5 text-base',
    }

    const labelSizeClasses = {
        sm: 'text-sm',
        md: 'text-[15px]',
        lg: 'text-base',
    }

    const widthClasses = {
        full: 'w-full',
        auto: 'w-auto',
        fit: 'w-fit',
    }

    const selectId = label?.toLowerCase().replace(/\s+/g, '-')

    // Find the selected option
    const selectedOption = useMemo(() => {
        return options.find((option) => option.value === value)
    }, [options, value])

    // Filter options based on search term
    const filteredOptions = useMemo(() => {
        if (!searchable || !searchTerm.trim()) {
            return options
        }

        const searchLower = searchTerm.toLowerCase()
        return options.filter((option) => {
            const searchableText = option.label.toLowerCase()
            // Simple fuzzy matching: check if all search characters appear in order
            let searchIndex = 0
            for (let i = 0; i < searchableText.length && searchIndex < searchLower.length; i++) {
                if (searchableText[i] === searchLower[searchIndex]) {
                    searchIndex++
                }
            }
            return searchIndex === searchLower.length
        })
    }, [options, searchTerm, searchable])

    // Handle click outside to close dropdown
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false)
                setSearchTerm('')
                setHighlightedIndex(-1)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, []) // Remove dependency on isOpen

    // Focus search input when dropdown opens and highlight first option
    useEffect(() => {
        if (isOpen) {
            if (searchable && searchInputRef.current) {
                searchInputRef.current.focus()
            }
            // Highlight first option by default
            if (filteredOptions.length > 0) {
                setHighlightedIndex(0)
            }
        } else {
            setHighlightedIndex(-1)
        }
    }, [isOpen, searchable, filteredOptions.length])

    // Scroll highlighted option into view
    useEffect(() => {
        if (highlightedIndex >= 0 && optionRefs.current[highlightedIndex]) {
            optionRefs.current[highlightedIndex]?.scrollIntoView({
                block: 'nearest',
                behavior: 'smooth',
            })
        }
    }, [highlightedIndex])

    // Reset highlighted index when options change
    useEffect(() => {
        setHighlightedIndex(-1)
    }, [filteredOptions])

    // Handle option selection
    const handleOptionSelect = (option: SelectOption) => {
        if (!option.disabled) {
            onChange(option.value)
            setIsOpen(false)
            setSearchTerm('')
        }
    }

    // Handle keyboard navigation
    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            event.stopPropagation()
            if (isOpen && highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
                handleOptionSelect(filteredOptions[highlightedIndex])
            } else {
                setIsOpen(!isOpen)
            }
        } else if (event.key === 'Escape') {
            event.preventDefault()
            event.stopPropagation()
            setIsOpen(false)
            setSearchTerm('')
            setHighlightedIndex(-1)
        } else if (event.key === 'ArrowDown') {
            event.preventDefault()
            event.stopPropagation()
            if (!isOpen) {
                setIsOpen(true)
            } else {
                setHighlightedIndex((prev) => {
                    const newIndex = prev < filteredOptions.length - 1 ? prev + 1 : 0
                    return newIndex
                })
            }
        } else if (event.key === 'ArrowUp') {
            event.preventDefault()
            event.stopPropagation()
            if (!isOpen) {
                setIsOpen(true)
            } else {
                setHighlightedIndex((prev) => {
                    const newIndex = prev > 0 ? prev - 1 : filteredOptions.length - 1
                    return newIndex
                })
            }
        }
    }

    // Handle search input keyboard navigation
    const handleSearchKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'ArrowDown') {
            event.preventDefault()
            event.stopPropagation()
            if (filteredOptions.length > 0) {
                setHighlightedIndex((prev) => {
                    const newIndex = prev < filteredOptions.length - 1 ? prev + 1 : 0
                    return newIndex
                })
            }
        } else if (event.key === 'ArrowUp') {
            event.preventDefault()
            event.stopPropagation()
            if (filteredOptions.length > 0) {
                setHighlightedIndex((prev) => {
                    const newIndex = prev > 0 ? prev - 1 : filteredOptions.length - 1
                    return newIndex
                })
            }
        } else if (event.key === 'Enter') {
            event.preventDefault()
            event.stopPropagation()
            if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
                handleOptionSelect(filteredOptions[highlightedIndex])
            }
        } else if (event.key === 'Escape') {
            event.preventDefault()
            event.stopPropagation()
            setIsOpen(false)
            setSearchTerm('')
            setHighlightedIndex(-1)
        }
    }

    // Render icon helper
    const renderIcon = (icon?: string | React.ReactNode, color?: string) => {
        if (!icon) return null

        if (React.isValidElement(icon)) {
            return icon
        }

        if (typeof icon === 'string') {
            // This would need to be imported from the appropriate icon library
            // For now, we'll just return null and let the parent handle icon rendering
            return null
        }

        return null
    }

    return (
        <div
            className={`flex ${
                direction === 'column' ? 'flex-col space-y-1' : 'items-center space-x-2'
            } ${containerClassName}`}
            {...(dataScheme && { 'data-scheme': dataScheme })}
            onKeyDown={handleKeyDown}
        >
            {showLabel && (
                <div className={`${direction === 'column' ? 'w-full' : labelWidth || 'w-[90px]'}`}>
                    <label htmlFor={selectId} className={`${labelSizeClasses[size]}`}>
                        <span>
                            {label}
                            {required && <span className="text-red dark:text-yellow ml-0.5">*</span>}
                        </span>
                        {tooltip && (
                            <span>
                                <Tooltip
                                    trigger={
                                        <IconInfo className="ml-1 relative -top-px inline-block size-4 text-secondary hover:text-primary" />
                                    }
                                    delay={0}
                                    sideOffset={-3}
                                >
                                    {tooltip}
                                </Tooltip>
                            </span>
                        )}
                    </label>
                    {description && <p className="text-sm text-secondary m-0 mt-0.5">{description}</p>}
                </div>
            )}
            <div ref={containerRef} className={`relative ${direction === 'column' ? 'w-full' : 'flex-1'}`}>
                <button
                    type="button"
                    onClick={() => !disabled && setIsOpen(!isOpen)}
                    onKeyDown={handleKeyDown}
                    disabled={disabled}
                    className={`group bg-primary border border-primary rounded ring-0 focus:ring-1 flex items-center justify-between ${
                        touched && error ? 'border-red dark:border-yellow' : 'border-primary'
                    } ${sizeClasses[size]} ${widthClasses[width]} ${
                        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                    } ${className}`}
                    aria-haspopup="listbox"
                    aria-expanded={isOpen}
                    aria-labelledby={selectId}
                >
                    <span className={`${!selectedOption ? 'text-muted' : 'text-primary'} truncate`}>
                        {selectedOption ? (
                            <span className="flex items-center space-x-1">
                                {renderIcon(selectedOption.icon, selectedOption.color)}
                                <span>{selectedOption.label}</span>
                            </span>
                        ) : (
                            placeholder
                        )}
                    </span>
                    <IconChevronDown
                        className={`size-6 text-accent group-hover:text-secondary transition-transform ${
                            isOpen ? 'rotate-180' : ''
                        }`}
                    />
                </button>

                {isOpen && (
                    <div
                        ref={selectRef}
                        className={`absolute z-50 w-full mt-1 bg-primary border border-primary rounded shadow-lg ${maxHeight} overflow-hidden`}
                        role="listbox"
                        onKeyDown={handleKeyDown}
                    >
                        {searchable && (
                            <div className="p-2 border-b border-primary">
                                <div className="relative">
                                    <IconSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 size-4 text-muted" />
                                    <input
                                        ref={searchInputRef}
                                        type="text"
                                        placeholder={searchPlaceholder}
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        onKeyDown={handleSearchKeyDown}
                                        className="w-full pl-8 pr-3 py-1.5 text-sm bg-primary border border-primary rounded text-primary placeholder-muted focus:outline-none focus:ring-1 focus:ring-blue"
                                    />
                                </div>
                            </div>
                        )}
                        <div className={`${maxHeight} overflow-y-auto`}>
                            {filteredOptions.length > 0 ? (
                                filteredOptions.map((option, index) => (
                                    <button
                                        key={`${option.value}-${index}`}
                                        ref={(el) => (optionRefs.current[index] = el)}
                                        type="button"
                                        onClick={() => handleOptionSelect(option)}
                                        disabled={option.disabled}
                                        className={`w-full px-3 py-2 text-left text-sm hover:bg-accent focus:bg-accent focus:outline-none flex items-center justify-between ${
                                            option.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                                        } ${option.value === value ? 'font-bold' : ''} ${
                                            index === highlightedIndex ? 'bg-accent' : ''
                                        }`}
                                        role="option"
                                        aria-selected={option.value === value}
                                        onMouseEnter={() => setHighlightedIndex(index)}
                                    >
                                        <span className="flex items-center space-x-2">
                                            {renderIcon(option.icon, option.color)}
                                            <div>
                                                <div className="text-primary">{option.label}</div>
                                                {option.description && (
                                                    <div className="text-xs text-muted">{option.description}</div>
                                                )}
                                            </div>
                                        </span>
                                        {option.value === value && <IconCheck className="size-4 text-primary" />}
                                    </button>
                                ))
                            ) : (
                                <div className="px-3 py-2 text-sm text-muted">
                                    {searchTerm ? `No options found for "${searchTerm}"` : 'No options available'}
                                </div>
                            )}
                        </div>
                    </div>
                )}
                {touched && error && <p className="text-sm text-red dark:text-yellow m-0 mt-1">{error}</p>}
            </div>
        </div>
    )
}

export default OSSelect
