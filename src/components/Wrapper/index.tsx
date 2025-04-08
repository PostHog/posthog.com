import React, { useRef } from 'react'
import { useApp } from '../../context/App'
import Desktop from 'components/Desktop'
import TaskBarMenu from 'components/TaskBarMenu'
import AppWindow from 'components/AppWindow'

export default function Wrapper() {
    const constraintsRef = useRef(null)
    const { windows } = useApp()

    return (
        <div className="fixed inset-0 size-full flex flex-col">
            <TaskBarMenu />
            <div ref={constraintsRef} className="flex-grow">
                <Desktop />
            </div>
            {windows.map((item) => (
                <AppWindow item={item} key={item.key} constraintsRef={constraintsRef} />
            ))}
        </div>
    )
}
