import React, { useRef } from 'react'
import Explorer from 'components/Explorer'
import Canvas from './Canvas'
import Toolbar from './Toolbar'
import ThemePicker from './controls/ThemePicker'
import TitleControl from './controls/TitleControl'
import TextControl from './controls/TextControl'
import ImageControl from './controls/ImageControl'
import LogosControl from './controls/LogosControl'
import EventControl from './controls/EventControl'
import { useGeneratorState } from './state'
import { useDownload } from './hooks/useDownload'
import type { Aspect, TemplateId } from './types'

export default function ImageGenerator() {
    const { state, setState, update } = useGeneratorState()
    const canvasRef = useRef<HTMLDivElement>(null)
    const { download, downloaded, downloading } = useDownload()

    const onChange = (next: typeof state) => setState(next)

    const accordionItems = [
        { title: 'Theme', content: <ThemePicker value={state.theme} onChange={(t) => update('theme', t)} /> },
        { title: 'Title', content: <TitleControl state={state} onChange={onChange} /> },
        { title: 'Subtext', content: <TextControl state={state} onChange={onChange} /> },
        { title: 'Image', content: <ImageControl state={state} onChange={onChange} /> },
        { title: 'Logos', content: <LogosControl state={state} onChange={onChange} /> },
        { title: 'Event details', content: <EventControl state={state} onChange={onChange} /> },
    ]

    return (
        <Explorer
            template="generic"
            slug="image-generator"
            title="Image generator"
            showTitle={false}
            padding={false}
            fullScreen
            leftSidebarContent={accordionItems}
            headerBarOptions={['showBack', 'showForward']}
        >
            <div className="w-full h-full flex flex-col">
                <Toolbar
                    state={state}
                    onAspectChange={(aspect: Aspect) => update('aspect', aspect)}
                    onTemplateChange={(template: TemplateId) => update('template', template)}
                    onDownload={() => download(canvasRef.current, state)}
                    downloaded={downloaded}
                    downloading={downloading}
                />
                <div className="flex-1 min-h-0">
                    <Canvas ref={canvasRef} state={state} />
                </div>
            </div>
        </Explorer>
    )
}
