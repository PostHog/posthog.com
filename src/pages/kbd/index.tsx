import React from 'react'
import SEO from 'components/seo'
import ScrollArea from 'components/RadixUI/ScrollArea'
import { Fieldset } from 'components/OSFieldset'
import KeyboardShortcut from 'components/KeyboardShortcut'
import CloudinaryImage from 'components/CloudinaryImage'

interface ShortcutItem {
  keys: string[]
  description: string
  info?: string
}

interface ShortcutSection {
  title: string
  shortcuts: ShortcutItem[]
}

export default function KBDShortcuts(): JSX.Element {
  const shortcutSections: ShortcutSection[] = [
    {
      title: 'Navigation',
      shortcuts: [
        { keys: ['/'], description: 'Open search' },
        { keys: ['Shift', '?'], description: 'Open Max AI chat' },
      ],
    },
    {
      title: 'Appearance',
      shortcuts: [
        { keys: [','], description: 'Open display options' },
        { keys: ['Shift', '\\'], description: 'Cycle wallpapers' },
        { keys: ['Shift', 'Z'], description: 'Start screensaver' },
        { keys: ['\\'], description: 'Cycle color themes', info: 'Light, dark, system' },
      ],
    },
    {
      title: 'Window management',
      shortcuts: [
        { keys: ['Shift', '<'], description: 'Show active windows panel' },
        { keys: ['Shift', '>'], description: 'Focus next open window' },
        { keys: ['Shift', 'X'], description: 'Close all windows' },
      ],
    },
    {
      title: 'Active window',
      shortcuts: [
        { keys: ['Shift', 'W'], description: 'Close window' },
        { keys: ['Shift', '↑'], description: 'Maximize window' },
        { keys: ['Shift', '↓'], description: 'Minimize window' },
        { keys: ['Shift', '←'], description: 'Snap window to left half' },
        { keys: ['Shift', '→'], description: 'Snap window to right half' },
      ],
    },
  ]

  return (
    <>
      <SEO
        title="Clicky clicky"
        description="Navigate PostHog.com faster with keyboard shortcuts"
      />
      <div data-scheme="secondary" className="w-full h-full bg-primary text-primary">
        <ScrollArea className="h-full">
          <div className="p-4 max-w-4xl mx-auto">
            <CloudinaryImage src="https://res.cloudinary.com/dmukukwp6/image/upload/mind_blown_b40a9d0e47.png" className="float-right -mt-1 ml-2" imgClassName="max-h-[161px]" />
            <div className="mb-6">
              <h1 className="text-xl font-bold mb-2">Keyboard shortcuts</h1>
              <p className="text-secondary text-sm">
                Navigate PostHog.com like an elite hacker with these intuitive keystrokes that are guaranteed to save you valuable milliseconds.
              </p>
              <p className="text-secondary text-sm">
                Open this page anytime with <KeyboardShortcut text="." size="sm" />
              </p>
            </div>

            <div className="clear-both" />

            <div className="grid grid-cols-2 gap-4">

              {shortcutSections.map((section) => (
                <Fieldset key={section.title} legend={section.title} className="mb-0">
                  <div className="space-y-2 text-sm">
                    {section.shortcuts.map((shortcut, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <div className="flex-1">
                          <div className="text-primary">
                            {shortcut.description}
                          </div>
                          <span className="text-secondary text-xs">
                            {shortcut.info}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          {shortcut.keys.map((key, keyIndex) => (
                            <React.Fragment key={keyIndex}>
                              {/* {keyIndex > 0 && (<>&nbsp;</>)} */}
                              <KeyboardShortcut
                                text={key}
                                size="sm"
                              />
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </Fieldset>
              ))}
            </div>
          </div>
        </ScrollArea>
      </div>
    </>
  )
}