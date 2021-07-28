import React from 'react'
import { Link } from 'gatsby'
import Modal from 'react-modal'
import './SignupModal.scss'
import { Input } from 'antd'

export const SignupModal = () => {
    return (
        <Modal
            isOpen={true}
            onRequestClose={() => undefined}
            className="modalContent"
            overlayClassName="modalOverlay"
            ariaHideApp={false}
        >
            <h3 className="font-sans">Unlock insights.</h3>
            <p>What's your email?</p>
            <Input bordered={false} /* TODO older antd doesn't support bordered prop. */ />
        </Modal>
    )
}
