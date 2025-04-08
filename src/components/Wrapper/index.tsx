import React, { useRef } from 'react'
import { useApp } from '../../context/App'
import Desktop from 'components/Desktop'
import TaskBarMenu from 'components/TaskBarMenu'
import AppWindow from 'components/AppWindow'

export default function Wrapper() {
    const constraintsRef = useRef(null)
    const { windows } = useApp()

    return (
        <div ref={constraintsRef} className="fixed inset-0 size-full">
            <TaskBarMenu />
            <Desktop />
            {windows.map((item) => (
                <AppWindow item={item} key={item.key} constraintsRef={constraintsRef} />
            ))}
        </div>
    )
}
