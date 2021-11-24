import React from 'react'
import { Link } from 'gatsby'
import modalSaasCloud from '../../images/modal-saas-cloud.svg'
import modalSelfDeploy from '../../images/modal-self-deploy.svg'
import { Button } from 'antd'
import Modal from 'react-modal'
import { useValues, useActions } from 'kea'
import { layoutLogic } from '../../logic/layoutLogic'
import './style.scss'

export const GetStartedModal = () => {
    const { isGetStartedModalOpen } = useValues(layoutLogic)
    const { setIsGetStartedModalOpen, onChangeMenuState } = useActions(layoutLogic)

    const closeEverythingOnClick = () => {
        setIsGetStartedModalOpen(false)
        onChangeMenuState(1)
    }

    return (
        <Modal
            isOpen={isGetStartedModalOpen}
            onRequestClose={() => setIsGetStartedModalOpen(false)}
            className="modalContent"
            overlayClassName="modalOverlay"
            ariaHideApp={false}
        >
            <h2>Try PostHog for free</h2>
            <div className="modalCardsWrapper">
                <a href="https://app.posthog.com/signup">
                    <div className="modalSaasCloud modalCard">
                        <div className="modalCardHeader">
                            <img src={modalSaasCloud} alt="modal-saas-cloud" />
                            <h2>Cloud</h2>
                        </div>
                        <h4>Small business or low volumes and don't want hassle?</h4>
                        <p>This is the simplest way to get started. Create an account.</p>
                    </div>
                </a>
                <Link to="/docs/deployment" onClick={closeEverythingOnClick}>
                    <div className="modalSelfDeploy modalCard">
                        <div className="modalCardHeader">
                            <img src={modalSelfDeploy} alt="modal-self-deploy " />
                            <h2>Open Source</h2>
                        </div>
                        <h4>Want to use our free open source product?</h4>
                        <p>Deploy PostHog Open Source on your own infrastructure. Free forever.</p>
                    </div>
                </Link>
                <a href="/schedule-demo#contact">
                    <div className="modalSelfDeploy modalCard">
                        <div className="modalCardHeader">
                            <img src={modalSelfDeploy} alt="modal-self-deploy " />
                            <h2>Enterprise</h2>
                        </div>
                        <h4>10K+ users? Need support?</h4>
                        <p>Managed on your infrastructure with greater scalability and support. Book a pilot.</p>
                    </div>
                </a>
            </div>
            <Button icon="close" onClick={() => setIsGetStartedModalOpen(false)} className="modalClose" />
        </Modal>
    )
}
