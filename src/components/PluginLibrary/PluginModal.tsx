import React from 'react'
import Modal from 'react-modal'
import { Spacer } from '../Spacer'
import Markdown from 'react-markdown'
import { Button, Spin } from 'antd'
import { CloseOutlined, ExportOutlined } from '@ant-design/icons'
import { useActions, useValues } from 'kea'
import { pluginLibraryLogic, toPathName } from '../../logic/pluginLibraryLogic'
import { SEO } from '../seo'
import './style.scss'

export const PluginModal = () => {
    const { activePlugin, activePluginName, pluginLoading } = useValues(pluginLibraryLogic)
    const { openLibrary } = useActions(pluginLibraryLogic)

    return (
        <>
            {activePluginName ? (
                <SEO
                    title={activePluginName + ' • PostHog Plugin'}
                    description={activePlugin.description}
                    image={activePlugin.imageSrc}
                    canonicalUrl={`https://posthog.com/plugins/${toPathName(activePluginName)}`}
                />
            ) : null}
            <Modal
                isOpen={!!activePluginName}
                onRequestClose={openLibrary}
                className="plugin-modal-content"
                overlayClassName="modalOverlay"
                ariaHideApp={false}
            >
                {pluginLoading ? (
                    <Spin size="large" className="centered-spin" />
                ) : (
                    <>
                        <Spacer />
                        <img className="logo" src={activePlugin.imageSrc} />
                        <Markdown source={activePlugin.markdown} linkTarget="_blank" />
                        <Spacer />
                        <a className="centered" href={activePlugin.url} target="_blank" rel="noreferrer">
                            Learn More <ExportOutlined />
                        </a>
                        <Button icon={<CloseOutlined />} onClick={openLibrary} className="modalClose" />
                    </>
                )}
            </Modal>
        </>
    )
}
