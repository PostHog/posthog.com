import React from 'react'
import Modal from 'react-modal'
import './SignupModal.scss'
import { Button, Input } from 'antd'

export const SignupModal = (): JSX.Element => {
    return (
        <Modal
            isOpen={true}
            onRequestClose={() => undefined}
            className="modalContent"
            overlayClassName="modalOverlay"
            ariaHideApp={false}
        >
            <h3 className="font-sans">Unlock insights.</h3>
            <form
                name="gated-signup"
                onSubmit={(data) => {
                    console.log({ data }) //TODO
                }}
            >
                <p>What's your email?</p>
                <Input name="email" type="email" className="signup-email-field" placeholder="Email address" />
                <Button htmlType="submit" type="primary" block>
                    Next
                </Button>
                <div className="bottom-actions">
                    <Button htmlType="submit" type="link">
                        <strong>Next: </strong> Choose your edition
                    </Button>
                    <Button type="link">Skip</Button>
                </div>
            </form>
        </Modal>
    )
}
