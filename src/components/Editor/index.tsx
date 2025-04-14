import React from 'react'
import { Select } from '../RadixUI/Select'
import HeaderBar from 'components/OSChrome/HeaderBar'
import * as Icons from '@posthog/icons'
import { Link, navigate } from 'gatsby'
import { useLocation } from '@reach/router'
import OSButton from 'components/OSButton'
import CloudinaryImage from 'components/CloudinaryImage'
import { DebugContainerQuery } from 'components/DebugContainerQuery'
import ScrollArea from 'components/RadixUI/ScrollArea'
import { productMenu } from '../../navs'
import { Accordion } from '../RadixUI/Accordion'
import { FileMenu } from '../RadixUI/FileMenu'
import ToolbarDemo from '../RadixUI/Toolbar'

interface EditorProps {
    slug: string
    title: string
    children?: React.ReactNode
}

export default function Editor({
    title,
    children,
}: EditorProps) {
    return (
        <div className="@container w-full h-full flex flex-col min-h-1">
          <aside data-scheme="secondary" className="bg-primary p-2 border-r border-primary">
            <ToolbarDemo />
          </aside>
            <div className="flex flex-col flex-grow min-h-0">
                <main data-scheme="primary" className="@container flex-1 bg-primary relative h-full">
                  <ScrollArea>
                    <div className="p-4">
                      <h1 className="text-2xl font-bold">{title}</h1>
                      {children}
                    </div>
                  </ScrollArea>
                </main>
            </div>
        </div>
    )
}