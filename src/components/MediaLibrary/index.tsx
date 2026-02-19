import React, { useState } from 'react'
import Tabs from 'components/RadixUI/Tabs'
import Libraries from './Libraries'
import Uploads from './Uploads'

interface MediaLibraryProps {
    mediaUploading: number
}

export default function MediaLibrary({ mediaUploading }: MediaLibraryProps): JSX.Element {
    const [activeTab, setActiveTab] = useState('libraries')

    return (
        <div data-scheme="primary" className="h-full">
            <Tabs.Root
                value={activeTab}
                onValueChange={setActiveTab}
                orientation="horizontal"
                className="h-full flex-col w-full"
            >
                <div className="flex justify-center w-full rounded-md border border-primary mb-4">
                    <Tabs.List className="grid grid-cols-2 w-full" aria-label="Media library tabs">
                        <Tabs.Trigger value="libraries" className="justify-center cursor-pointer !h-[40px]">
                            Libraries
                        </Tabs.Trigger>
                        <Tabs.Trigger value="uploads" className="justify-center cursor-pointer !h-[40px]">
                            Uploads
                        </Tabs.Trigger>
                    </Tabs.List>
                </div>
                <Tabs.Content value="libraries" className="w-full">
                    <Libraries />
                </Tabs.Content>
                <Tabs.Content value="uploads" className="w-full">
                    <Uploads mediaUploading={mediaUploading} />
                </Tabs.Content>
            </Tabs.Root>
        </div>
    )
}
