import React from 'react'
import Modal from 'react-modal'
import { useValues, useActions } from 'kea'
import './SignupModal.scss'
import { Button, Input } from 'antd'
import { ButtonBlock } from 'components/ButtonBlock/ButtonBlock'
import { signupLogic, SignupModalView } from 'logic/signupLogic'

export const SignupModal = (): JSX.Element => {
    const { email } = useValues(signupLogic)
    const { setEmail, submitForm, setModalView } = useActions(signupLogic)

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
                onSubmit={(e) => {
                    e.preventDefault()
                    submitForm()
                }}
            >
                <p>What's your email?</p>
                <Input
                    name="email"
                    type="email"
                    autoFocus
                    className="signup-email-field"
                    placeholder="Email address"
                    required
                    value={email}
                    onChange={({ target: { value } }) => setEmail(value)}
                />
                <ButtonBlock htmlType="submit">Next</ButtonBlock>
                <div className="bottom-actions">
                    <Button htmlType="submit" type="link">
                        <strong>Next: </strong> Choose your edition
                    </Button>
                    <Button type="link" onClick={() => setModalView(SignupModalView.DEPLOYMENT_OPTIONS)}>
                        Skip
                    </Button>
                </div>
            </form>
        </Modal>
    )
}

export { SignupBorderGraphic } from './SignupBorderGraphic'
export { SignupCircleGraphic } from './SignupCircleGraphic'
