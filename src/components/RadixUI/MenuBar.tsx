import * as React from 'react'
import { Menubar as RadixMenubar } from 'radix-ui'
import { IconChevronRight } from '@posthog/icons'

const MenuBar = ({ children }: { children: React.ReactNode }) => {
    return (
        <RadixMenubar.Root data-scheme="tertiary" className="flex gap-1">
            <RadixMenubar.Menu>
                <RadixMenubar.Trigger className="flex select-none items-center justify-between gap-0.5 rounded px-3 py-2 text-[13px] font-medium leading-none text-primary outline-none data-[highlighted]:bg-accent hover:bg-primary data-[state=open]:bg-accent">
                    File
                </RadixMenubar.Trigger>
                <RadixMenubar.Portal>
                    <RadixMenubar.Content
                        className="min-w-[220px] rounded-md bg-white p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[transform,opacity] [animation-duration:_400ms] [animation-timing-function:_cubic-bezier(0.16,_1,_0.3,_1)]"
                        align="start"
                        sideOffset={5}
                        alignOffset={-3}
                        data-scheme="primary"
                    >
                        <RadixMenubar.Item className="hover-invert group relative flex h-[25px] select-none items-center rounded px-2.5 text-[13px] leading-none text-primary hover:bg-primary outline-none data-[disabled]:pointer-events-none data-[state=open]:bg-accent data-[highlighted]:bg-input-bg data-[disabled]:text-muted data-[highlighted]:data-[state=open]:text-secondary data-[highlighted]:bg-text-secondary data-[state=open]:text-secondary">
                            New Tab{' '}
                            <div className="ml-auto pl-5 text-mauve9 group-data-[disabled]:text-mauve8 group-data-[highlighted]:text-white">
                                ⌘ T
                            </div>
                        </RadixMenubar.Item>
                        <RadixMenubar.Item className="hover-invert group relative flex h-[25px] select-none items-center rounded px-2.5 text-[13px] leading-none text-primary hover:bg-primary outline-none data-[disabled]:pointer-events-none data-[state=open]:bg-accent data-[disabled]:text-muted data-[highlighted]:data-[state=open]:text-secondary data-[highlighted]:bg-text-secondary data-[state=open]:text-secondary">
                            New Window{' '}
                            <div className="ml-auto pl-5 text-mauve9 group-data-[disabled]:text-mauve8 group-data-[highlighted]:text-white">
                                ⌘ N
                            </div>
                        </RadixMenubar.Item>
                        <RadixMenubar.Item
                            className="hover-invert group relative flex h-[25px] select-none items-center rounded px-2.5 text-[13px] leading-none text-muted outline-none data-[disabled]:pointer-events-none data-[state=open]:bg-violet4 data-[highlighted]:bg-gradient-to-br data-[highlighted]:from-violet9 data-[highlighted]:to-violet10 data-[disabled]:text-mauve8 data-[highlighted]:data-[state=open]:text-violet1 data-[highlighted]:text-violet1 data-[state=open]:text-violet11"
                            disabled
                        >
                            New Incognito Window
                        </RadixMenubar.Item>
                        <RadixMenubar.Separator className="m-[5px] h-px bg-border" />
                        <RadixMenubar.Sub>
                            <RadixMenubar.SubTrigger className="hover-invert group relative flex h-[25px] select-none items-center rounded px-2.5 text-[13px] leading-none text-primary hover:bg-primary outline-none data-[disabled]:pointer-events-none data-[state=open]:bg-primary data-[disabled]:text-muted data-[highlighted]:data-[state=open]:text-secondary data-[highlighted]:bg-text-secondary data-[state=open]:text-secondary">
                                Share
                                <div className="ml-auto pl-5 text-secondary group-data-[disabled]:text-muted group-data-[highlighted]:text-primary">
                                    <IconChevronRight className="size-4" />
                                </div>
                            </RadixMenubar.SubTrigger>
                            <RadixMenubar.Portal>
                                <RadixMenubar.SubContent
                                    className="min-w-[220px] rounded-md bg-white p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[transform,opacity] [animation-duration:_400ms] [animation-timing-function:_cubic-bezier(0.16,_1,_0.3,_1)]"
                                    alignOffset={-5}
                                    data-scheme="primary"
                                >
                                    <RadixMenubar.Item className="hover-invert group relative flex h-[25px] select-none items-center rounded px-2.5 text-[13px] leading-none text-primary hover:bg-primary outline-none data-[disabled]:pointer-events-none data-[state=open]:bg-primary data-[disabled]:text-muted data-[highlighted]:data-[state=open]:text-secondary data-[highlighted]:bg-text-secondary data-[state=open]:text-secondary">
                                        Email Link
                                    </RadixMenubar.Item>
                                    <RadixMenubar.Item className="hover-invert group relative flex h-[25px] select-none items-center rounded px-2.5 text-[13px] leading-none text-primary hover:bg-primary outline-none data-[disabled]:pointer-events-none data-[state=open]:bg-primary data-[disabled]:text-muted data-[highlighted]:data-[state=open]:text-secondary data-[highlighted]:bg-text-secondary data-[state=open]:text-secondary">
                                        Messages
                                    </RadixMenubar.Item>
                                    <RadixMenubar.Item className="hover-invert group relative flex h-[25px] select-none items-center rounded px-2.5 text-[13px] leading-none text-primary hover:bg-primary outline-none data-[disabled]:pointer-events-none data-[state=open]:bg-primary data-[disabled]:text-muted data-[highlighted]:data-[state=open]:text-secondary data-[highlighted]:bg-text-secondary data-[state=open]:text-secondary">
                                        Notes
                                    </RadixMenubar.Item>
                                </RadixMenubar.SubContent>
                            </RadixMenubar.Portal>
                        </RadixMenubar.Sub>
                        <RadixMenubar.Separator className="m-[5px] h-px bg-border" />
                        <RadixMenubar.Item className="group relative flex h-[25px] select-none items-center rounded px-2.5 text-[13px] leading-none text-violet11 outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-gradient-to-br data-[highlighted]:from-violet9 data-[highlighted]:to-violet10 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1">
                            Print…{' '}
                            <div className="ml-auto pl-5 text-mauve9 group-data-[disabled]:text-mauve8 group-data-[highlighted]:text-white">
                                ⌘ P
                            </div>
                        </RadixMenubar.Item>
                    </RadixMenubar.Content>
                </RadixMenubar.Portal>
            </RadixMenubar.Menu>
            <RadixMenubar.Menu>
                <RadixMenubar.Trigger>Edit</RadixMenubar.Trigger>
                <RadixMenubar.Portal>
                    <RadixMenubar.Content>
                        <RadixMenubar.Label>Options</RadixMenubar.Label>
                        <RadixMenubar.Item>New Tab</RadixMenubar.Item>

                        <RadixMenubar.Group>
                            <RadixMenubar.Item>New Window</RadixMenubar.Item>
                            <RadixMenubar.Item>Open File…</RadixMenubar.Item>
                        </RadixMenubar.Group>

                        <RadixMenubar.CheckboxItem checked>
                            Show Toolbar
                            <RadixMenubar.ItemIndicator>✓</RadixMenubar.ItemIndicator>
                        </RadixMenubar.CheckboxItem>

                        <RadixMenubar.RadioGroup value="auto">
                            <RadixMenubar.RadioItem value="auto">
                                Auto Save
                                <RadixMenubar.ItemIndicator>●</RadixMenubar.ItemIndicator>
                            </RadixMenubar.RadioItem>
                            <RadixMenubar.RadioItem value="manual">
                                Manual Save
                                <RadixMenubar.ItemIndicator>●</RadixMenubar.ItemIndicator>
                            </RadixMenubar.RadioItem>
                        </RadixMenubar.RadioGroup>

                        <RadixMenubar.Sub>
                            <RadixMenubar.SubTrigger>Export</RadixMenubar.SubTrigger>
                            <RadixMenubar.Portal>
                                <RadixMenubar.SubContent>
                                    <RadixMenubar.Item>As PDF</RadixMenubar.Item>
                                    <RadixMenubar.Item>As DOCX</RadixMenubar.Item>
                                </RadixMenubar.SubContent>
                            </RadixMenubar.Portal>
                        </RadixMenubar.Sub>

                        <RadixMenubar.Separator />
                        <RadixMenubar.Item>Exit</RadixMenubar.Item>
                        <RadixMenubar.Arrow />
                    </RadixMenubar.Content>
                </RadixMenubar.Portal>
            </RadixMenubar.Menu>
        </RadixMenubar.Root>
    )
}

export default MenuBar
