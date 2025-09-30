import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import WindowTabs from 'components/WindowTabs'
import { Fieldset } from 'components/OSFieldset'
import { ToggleGroup, ToggleOption } from 'components/RadixUI/ToggleGroup'
import { Popover } from 'components/RadixUI/Popover'
import ScrollArea from 'components/RadixUI/ScrollArea'
import { IconDay, IconInfo, IconLaptop, IconNight } from '@posthog/icons'
import { SEO } from 'components/seo'
import { useApp } from '../context/App'
import type { SiteSettings } from '../context/App'
import { DebugContainerQuery } from 'components/DebugContainerQuery'
import Tooltip from 'components/RadixUI/Tooltip'
import { Screensaver } from '../components/Screensaver'
import useTheme, { type ThemeOption } from '../hooks/useTheme'

const XL_CURSOR_SVG = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 74 28"><g clip-path="url(#a)"><path fill="#000" stroke="#fff" stroke-width="5" d="m44.77 50.196.024.01.025.008c.48.177 1.014.286 1.58.286.665 0 1.28-.147 1.837-.392l.012-.006.013-.006 8.8-3.997.002-.001a4.5 4.5 0 0 0 2.225-5.968v-.001l-10.73-23.395 16.828-1.446.008-.001a4.504 4.504 0 0 0 2.678-7.78L20.073-37.289a4.51 4.51 0 0 0-4.858-.843l-.011.005A4.499 4.499 0 0 0 12.5-34v66a4.503 4.503 0 0 0 2.715 4.133l.01.003a4.505 4.505 0 0 0 4.86-.859L32.01 24.072l10.259 23.717.005.012.005.011a4.527 4.527 0 0 0 2.492 2.384Z"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h74v28H0z"/></clipPath></defs></svg>`

const colorModeOptions: ToggleOption[] = [
    {
        label: 'System',
        value: 'system',
        icon: <IconLaptop className="size-5" />,
    },
    {
        label: 'Light',
        value: 'light',
        icon: <IconDay className="size-5" />,
        default: true,
    },
    {
        label: 'Dark',
        value: 'dark',
        icon: <IconNight className="size-5" />,
    },
]

const skinOptions: ToggleOption[] = [
    {
        label: 'Modern',
        value: 'modern',
        // icon: <IconLaptop className="size-5" />,
    },
    {
        label: 'Classic',
        value: 'classic',
        // icon: <IconLaptop className="size-5" />,
    },
]

const cursorOptions: ToggleOption[] = [
    {
        label: 'Default',
        value: 'default',
    },
    {
        label: 'XL',
        value: 'xl',
        icon: <div dangerouslySetInnerHTML={{ __html: XL_CURSOR_SVG }} className="h-5 w-full relative -top-1" />,
    },
    {
        label: "James' face",
        value: 'james',
        icon: (
            <img
                src="https://res.cloudinary.com/dmukukwp6/image/upload/james_cursor_default_d6f7983b0a.png"
                alt="James' Face"
                className="h-6 -my-1"
            />
        ),
    },
]

const experienceOptions = [
    {
        label: (
            <span>
                Website mode{' '}
                <Tooltip trigger={<IconInfo className="size-4 inline-block relative -top-px" />} delay={0}>
                    <p className="max-w-sm my-0">Browse one page at a time like a regular website.</p>
                </Tooltip>
            </span>
        ),
        value: 'boring',
    },
    {
        label: (
            <span>
                OS mode{' '}
                <Tooltip trigger={<IconInfo className="size-4 inline-block relative -top-px" />} delay={0}>
                    <p className="max-w-sm my-0">Open multiple pages in draggable windows.</p>
                </Tooltip>
            </span>
        ),
        value: 'posthog',
    },
] satisfies (ToggleOption & { value: SiteSettings['experience'] })[]

// Custom WallpaperSelect component
interface WallpaperSelectProps {
    value: string
    onValueChange: (value: string) => void
    title: string
}

const WallpaperSelect = ({ value, onValueChange, title }: WallpaperSelectProps) => {
    const [isDark, setIsDark] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const { themeOptions } = useTheme()

    // Check theme from body class
    useEffect(() => {
        const checkTheme = () => {
            const bodyClass = document.body.className
            setIsDark(bodyClass.includes('dark'))
        }

        checkTheme()

        // Listen for theme changes
        const observer = new MutationObserver(checkTheme)
        observer.observe(document.body, { attributes: true, attributeFilter: ['class'] })

        return () => observer.disconnect()
    }, [])

    const currentOption = themeOptions.find((option) => option.value === value)
    const currentThumb = currentOption
        ? isDark
            ? currentOption.background?.thumb?.dark
            : currentOption.background?.thumb?.light
        : null

    const handleSelect = (selectedValue: string) => {
        onValueChange(selectedValue)
        // setIsOpen(false) // Close the popover after selection
    }

    const trigger = (
        <button
            type="button"
            className="w-full bg-white dark:bg-dark border border-primary rounded px-2 py-2 text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary flex gap-2 items-center justify-between hover:bg-accent"
        >
            <div className="flex flex-col items-center gap-2">
                <span className="text-primary">{currentOption?.label || 'Select wallpaper'}</span>
                {currentThumb && (
                    <img
                        src={currentThumb}
                        alt={currentOption?.label || ''}
                        className="object-contain border border-primary rounded"
                    />
                )}
            </div>
            <svg className="w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
        </button>
    )

    return (
        <>
            <label className="pt-1.5 text-sm">{title}</label>
            <Popover
                trigger={trigger}
                dataScheme="secondary"
                contentClassName="@container bg-primary w-screen md:w-[800px] max-w-full max-h-full"
                sideOffset={8}
                open={isOpen}
                onOpenChange={setIsOpen}
            >
                <ScrollArea>
                    <div className="@container">
                        <div className="grid md:@xl:grid-cols-2 md:@2xl:grid-cols-3 md:@xl:gap-2 p-2 min-h-[200px] h-[400px]">
                            {themeOptions.map((option) => {
                                const optionThumb = isDark
                                    ? option.background?.thumb?.dark
                                    : option.background?.thumb?.light
                                const isSelected = option.value === value
                                return (
                                    <button
                                        key={option.value}
                                        type="button"
                                        data-scheme="primary"
                                        onClick={() => handleSelect(option.value)}
                                        className={`w-full p-2 text-left bg-primary hover:bg-accent border border-input hover:border-primary flex flex-col items-center gap-3 rounded ${
                                            isSelected ? 'bg-accent' : ''
                                        }`}
                                    >
                                        <img
                                            src={optionThumb}
                                            alt={option.label}
                                            className="w-full h-auto object-cover rounded"
                                        />
                                        <span className={`text-primary ${isSelected ? 'font-bold' : 'font-medium'}`}>
                                            {option.label}
                                        </span>
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                </ScrollArea>
            </Popover>
        </>
    )
}

export default function DisplayOptions() {
    const { siteSettings, updateSiteSettings } = useApp()
    const [previewScreensaver, setPreviewScreensaver] = useState(false)

    const handleExperienceChange = (value: string) => {
        updateSiteSettings({ ...siteSettings, experience: value as SiteSettings['experience'] })
    }

    const handleColorModeChange = (value: string) => {
        if (typeof window !== 'undefined' && (window as any).__setPreferredTheme) {
            const newTheme = window.__setPreferredTheme(value)
            updateSiteSettings({
                ...siteSettings,
                theme: newTheme as SiteSettings['theme'],
                colorMode: value as SiteSettings['colorMode'],
            })
        }
    }

    const handleSkinChange = (value: string) => {
        updateSiteSettings({ ...siteSettings, skinMode: value as SiteSettings['skinMode'] })
    }

    const handleCursorChange = (value: string) => {
        updateSiteSettings({ ...siteSettings, cursor: value as SiteSettings['cursor'] })
    }

    const handleWallpaperChange = (value: string) => {
        updateSiteSettings({
            ...siteSettings,
            wallpaper: value as SiteSettings['wallpaper'],
        })
    }

    return (
        <>
            <SEO title="Display options" description="Personalize your PostHog.com experience" />
            <div data-scheme="secondary" className="w-full h-full bg-primary text-primary p-2">
                <Fieldset legend="Display">
                    <div className="bg-primary grid grid-cols-2 gap-2">
                        <ToggleGroup
                            title="Color mode"
                            options={colorModeOptions}
                            onValueChange={handleColorModeChange}
                            value={siteSettings.colorMode}
                        />
                    </div>
                    <div className="bg-primary grid grid-cols-2 gap-2">
                        <ToggleGroup
                            title="Theme"
                            options={skinOptions}
                            onValueChange={handleSkinChange}
                            value={siteSettings.skinMode}
                        />
                    </div>
                    <div className="bg-primary grid grid-cols-2 gap-2 mt-2">
                        <ToggleGroup
                            title="Cursor"
                            options={cursorOptions}
                            onValueChange={handleCursorChange}
                            value={siteSettings.cursor}
                        />
                    </div>
                    <div className="bg-primary grid grid-cols-2 gap-2 my-2">
                        <WallpaperSelect
                            title="Desktop background"
                            onValueChange={handleWallpaperChange}
                            value={siteSettings.wallpaper}
                        />
                    </div>
                    <div className="bg-primary grid grid-cols-2 gap-2">
                        <div className="flex items-center gap-1 mb-1">
                            <span className="text-sm">Screensaver</span>
                            <button
                                onClick={(e) => {
                                    e.preventDefault()
                                    setPreviewScreensaver(true)
                                    setTimeout(() => setPreviewScreensaver(false), 100000) // Auto-dismiss after 100s
                                }}
                                className="text-sm text-primary underline font-medium"
                            >
                                preview
                            </button>
                        </div>
                        <div>
                            <ToggleGroup
                                title=""
                                options={[
                                    { label: 'Disabled', value: 'true' },
                                    { label: 'Enabled', value: 'false' },
                                ]}
                                onValueChange={(value) => {
                                    updateSiteSettings({ ...siteSettings, screensaverDisabled: value === 'true' })
                                }}
                                value={siteSettings.screensaverDisabled ? 'true' : 'false'}
                            />
                        </div>
                    </div>
                </Fieldset>
                <div className="hidden md:block">
                    <Fieldset legend="Navigation">
                        <div className="bg-primary grid grid-cols-2 gap-2">
                            <ToggleGroup
                                title="Experience"
                                options={experienceOptions}
                                onValueChange={handleExperienceChange}
                                value={siteSettings.experience}
                            />
                        </div>
                        <div className="bg-primary grid grid-cols-2 gap-2">
                            <ToggleGroup
                                title="Animation"
                                options={[
                                    { label: 'Disabled', value: 'true' },
                                    { label: 'Enabled', value: 'false' },
                                ]}
                                onValueChange={(value) =>
                                    updateSiteSettings({ ...siteSettings, performanceBoost: value === 'true' })
                                }
                                value={siteSettings.performanceBoost ? 'true' : 'false'}
                            />
                        </div>
                    </Fieldset>
                </div>
            </div>
            {previewScreensaver &&
                typeof document !== 'undefined' &&
                createPortal(
                    <Screensaver isActive={true} onDismiss={() => setPreviewScreensaver(false)} />,
                    document.body
                )}
        </>
    )
}
