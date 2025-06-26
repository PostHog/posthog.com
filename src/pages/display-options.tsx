import React, { useState, useEffect } from 'react'
import WindowTabs from 'components/WindowTabs'
import { Fieldset } from 'components/OSFieldset'
import { ToggleGroup, ToggleOption } from 'components/RadixUI/ToggleGroup'
import { IconDay, IconLaptop, IconNight } from '@posthog/icons'
import { SEO } from 'components/seo'

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

export default function DisplayOptions() {
    const [colorMode, setColorMode] = useState('light')
    const [skinMode, setSkinMode] = useState('modern')
    const [cursor, setCursor] = useState('default')

    const handleColorModeChange = (value: string) => {
        window.__setPreferredTheme(value)
        setColorMode(value)
    }

    const handleSkinChange = (value: string) => {
        localStorage.setItem('skin', value)
        setSkinMode(value)
        document.body.setAttribute('data-skin', value)
        // Dispatch custom event for real-time updates
        window.dispatchEvent(new CustomEvent('skinchange', { detail: value }))
    }

    const applyStyles = (content: string) => {
        let styleElement = document.getElementById('custom-cursor-style')
        if (!styleElement) {
            styleElement = document.createElement('style')
            styleElement.id = 'custom-cursor-style'
            document.head.appendChild(styleElement)
        }
        styleElement.textContent = content
    }

    const updateCursor = (cursor: string) => {
        localStorage.setItem('cursor', cursor)
        setCursor(cursor)
        if (cursor === 'james') {
            applyStyles(`
                :root {
                    --cursor-default: url(https://res.cloudinary.com/dmukukwp6/image/upload/james_cursor_default_d6f7983b0a.png), auto;
                    --cursor-pointer: url(https://res.cloudinary.com/dmukukwp6/image/upload/james_cursor_pointer_8bf0dd7a15.png), auto;
                }
                * { cursor: var(--cursor-default) !important; }
                button, a { cursor: var(--cursor-pointer) !important; }
            `)
        } else if (cursor === 'xl') {
            // Default XL cursor
            const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><path fill="#000" stroke="#fff" stroke-width="5" d="m57.77 96.196.024.01.025.008c.48.177 1.014.286 1.58.286.665 0 1.28-.147 1.837-.392l.012-.006.013-.006 8.8-3.997.002-.001a4.5 4.5 0 0 0 2.225-5.969l-10.73-23.395 16.828-1.446.008-.001a4.504 4.504 0 0 0 2.678-7.78L33.073 8.712a4.51 4.51 0 0 0-4.858-.844l-.011.006A4.499 4.499 0 0 0 25.5 12v66a4.503 4.503 0 0 0 2.715 4.132l.01.004a4.505 4.505 0 0 0 4.86-.859L45.01 70.072l10.259 23.717.005.012.005.011a4.527 4.527 0 0 0 2.492 2.384Z"/></svg>`
            const encodedSvg = encodeURIComponent(svg)
            const cursorUrl = `url('data:image/svg+xml;utf8,${encodedSvg}'), auto`

            // Hand cursor for links/buttons
            const handSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><path fill="#fff" stroke="#000" stroke-width="5" d="M34.5 12.5V57l-13-7.5L15 57l33.5 32.5H72L84.5 75V39h-13v-6h-24V14L41 9l-6.5 3.5Z"/><path fill="#000" d="M40.625 6.25c-5.139 0-9.375 4.236-9.375 9.375v36.914l-2.05-2.148-.782-.684c-3.601-3.601-9.485-3.601-13.086 0-3.6 3.601-3.6 9.485 0 13.086v.098l25.586 25.293.195.097.098.196c4.212 3.161 9.583 5.273 15.625 5.273h5.371a25.533 25.533 0 0 0 25.586-25.586V43.75c0-5.14-4.236-9.375-9.375-9.375-1.33 0-2.563.366-3.71.879-1.026-4.065-4.725-7.129-9.083-7.129-2.392 0-4.59.94-6.25 2.441-1.66-1.501-3.857-2.441-6.25-2.441-1.099 0-2.136.232-3.125.586V15.625c0-5.14-4.236-9.375-9.375-9.375Zm0 6.25a3.115 3.115 0 0 1 3.125 3.125V50H50V37.5a3.115 3.115 0 0 1 3.125-3.125A3.115 3.115 0 0 1 56.25 37.5V50h6.25V37.5a3.115 3.115 0 0 1 3.125-3.125A3.115 3.115 0 0 1 68.75 37.5V50h6.543v-6.25a3.115 3.115 0 0 1 3.125-3.125 3.115 3.115 0 0 1 3.125 3.125v24.414c0 10.828-8.508 19.336-19.336 19.336h-5.37c-4.579 0-8.534-1.636-11.817-4.102l-25.293-25c-1.392-1.391-1.392-2.905 0-4.296 1.391-1.392 2.905-1.392 4.297 0L37.5 67.578V15.625a3.115 3.115 0 0 1 3.125-3.125Z"/></svg>`
            const encodedHandSvg = encodeURIComponent(handSvg)
            const handCursorUrl = `url('data:image/svg+xml;utf8,${encodedHandSvg}'), auto`

            // Move cursor for draggable elements
            const moveSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><path fill="#000" stroke="#fff" stroke-width="5" d="M46.836 6.098 35.443 17.365a6.506 6.506 0 0 0-1.795 6.3l.001.004a6.51 6.51 0 0 0 4.617 4.668 6.49 6.49 0 0 0 5.234-.839v8.484a6.477 6.477 0 0 0 3.22 5.682 6.464 6.464 0 0 0 6.56 0 6.477 6.477 0 0 0 3.22-5.682v-8.484a6.49 6.49 0 0 0 5.233.839 6.51 6.51 0 0 0 4.618-4.668v-.003a6.505 6.505 0 0 0-1.794-6.3L53.164 6.097a4.5 4.5 0 0 0-6.328 0Zm31.213 27.418h-.006a6.486 6.486 0 0 0-6.033 4.021 6.49 6.49 0 0 0 .555 6.018h-8.492a6.477 6.477 0 0 0-5.683 3.22 6.464 6.464 0 0 0 0 6.56 6.477 6.477 0 0 0 5.683 3.22h8.484a6.49 6.49 0 0 0-.839 5.233 6.51 6.51 0 0 0 4.668 4.618h.003a6.506 6.506 0 0 0 6.3-1.794l11.268-11.393a4.5 4.5 0 0 0 0-6.329l-11.27-11.394a6.503 6.503 0 0 0-4.638-1.98ZM17.315 64.624l.002.002a6.508 6.508 0 0 0 9.2.049 6.502 6.502 0 0 0 .907-8.12h8.496a6.5 6.5 0 1 0 0-13h-8.485a6.512 6.512 0 0 0 .52-6.1 6.483 6.483 0 0 0-6.196-3.93 6.495 6.495 0 0 0-4.451 1.968l-11.26 11.4a4.5 4.5 0 0 0 0 6.324l11.267 11.407Zm22.622 6.946h-.023a6.516 6.516 0 0 0-5.991 4.091l-.003.006a6.512 6.512 0 0 0 1.518 7.08l9.53 9.422c.285.346.61.671.972.962l.897.884a4.5 4.5 0 0 0 6.327-.005l.88-.872a6.439 6.439 0 0 0 1.01-1l9.502-9.385a6.513 6.513 0 0 0 1.515-7.163 6.5 6.5 0 0 0-6.136-4.027c-1.23.019-2.42.392-3.435 1.056v-8.486a6.499 6.499 0 0 0-1.904-4.674 6.46 6.46 0 0 0-4.703-1.896 6.497 6.497 0 0 0-6.393 6.57v8.492a6.539 6.539 0 0 0-3.563-1.055Z"/></svg>`
            const encodedMoveSvg = encodeURIComponent(moveSvg)
            const moveCursorUrl = `url('data:image/svg+xml;utf8,${encodedMoveSvg}'), auto`

            // Vertical resize cursor
            const verticalResizeSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><path fill="#000" stroke="#fff" stroke-width="5" d="M50 10L30 30H40V60H30L50 80L70 60H60V30H70L50 10Z"/></svg>`
            const encodedVerticalResizeSvg = encodeURIComponent(verticalResizeSvg)
            const verticalResizeCursorUrl = `url('data:image/svg+xml;utf8,${encodedVerticalResizeSvg}'), auto`

            // Horizontal resize cursor
            const horizontalResizeSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><path fill="#000" stroke="#fff" stroke-width="5" d="M10 50L30 30V40H60V30L80 50L60 70V60H30V70L10 50Z"/></svg>`
            const encodedHorizontalResizeSvg = encodeURIComponent(horizontalResizeSvg)
            const horizontalResizeCursorUrl = `url('data:image/svg+xml;utf8,${encodedHorizontalResizeSvg}'), auto`

            applyStyles(`
                :root {
                    --cursor-default: ${cursorUrl};
                    --cursor-pointer: ${handCursorUrl};
                    --cursor-move: ${moveCursorUrl};
                    --cursor-ew-resize: ${horizontalResizeCursorUrl};
                    --cursor-ns-resize: ${verticalResizeCursorUrl};
                }
                
                * { cursor: var(--cursor-default); }
                
                a, button, [role="button"], [tabindex="0"],
                input[type="button"], input[type="submit"], input[type="reset"],
                .cursor-pointer { 
                    cursor: var(--cursor-pointer) !important; 
                }
                
                [data-draggable="true"], .cursor-move {
                    cursor: var(--cursor-move) !important;
                }
                
                .cursor-ew-resize {
                    cursor: var(--cursor-ew-resize) !important;
                }
                
                .cursor-ns-resize {
                    cursor: var(--cursor-ns-resize) !important;
                }
            `)
        } else {
            const styleElement = document.getElementById('custom-cursor-style')
            if (styleElement) {
                styleElement.remove()
            }
        }
    }

    const handleCursorChange = (value: string) => {
        updateCursor(value)
    }

    useEffect(() => {
        const colorMode = localStorage.getItem('theme') || 'light'
        const savedCursor = localStorage.getItem('cursor') || 'default'
        const savedSkin = localStorage.getItem('skin') || 'modern'
        setColorMode(colorMode)
        setCursor(savedCursor)
        setSkinMode(savedSkin)
        updateCursor(savedCursor)
    }, [])

    return (
        <>
            <SEO title="Display options" description="Change the display options for PostHog." />
            <div data-scheme="secondary" className="w-full h-full bg-primary text-primary p-2">
                <Fieldset legend="Display">
                    <div className="bg-primary grid grid-cols-2 gap-2">
                        <ToggleGroup
                            title="Color mode"
                            options={colorModeOptions}
                            onValueChange={handleColorModeChange}
                            value={colorMode}
                        />
                    </div>
                    <div className="bg-primary grid grid-cols-2 gap-2">
                        <ToggleGroup
                            title="Theme"
                            options={skinOptions}
                            onValueChange={handleSkinChange}
                            value={skinMode}
                        />
                    </div>
                    <div className="bg-primary grid grid-cols-2 gap-2 mt-2">
                        <ToggleGroup
                            title="Cursor"
                            options={cursorOptions}
                            onValueChange={handleCursorChange}
                            value={cursor}
                        />
                    </div>
                </Fieldset>
            </div>
        </>
    )
}
