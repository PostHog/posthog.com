import React from 'react'
import Modal from 'react-modal'
import { Spacer } from '../Spacer'
import Markdown from 'react-markdown'
import { Button } from 'antd'
import { ExportOutlined } from '@ant-design/icons'
import { useActions, useValues } from 'kea'
import { pluginLibraryLogic } from '../../logic/pluginLibraryLogic'

export const PluginModal = () => {
    const { activePlugin, modalOpen } = useValues(pluginLibraryLogic)
    const { setModalOpen } = useActions(pluginLibraryLogic)

    return (
        <Modal
            isOpen={modalOpen}
            onRequestClose={() => setModalOpen(false)}
            className="pluginModalContent"
            overlayClassName="modalOverlay"
            ariaHideApp={false}
        >
            <div>
                <Spacer />
                <img src={activePlugin.imageSrc} />
                <Markdown source={activePlugin.markdown} linkTarget="_blank" />
                <Spacer />
                <a className="centered" href={activePlugin.url} target="_blank" rel="noreferrer">
                    Learn More <ExportOutlined />
                </a>
            </div>
            <Button icon="close" onClick={() => setModalOpen(false)} className="modalClose" />
        </Modal>
    )
}
