import React, { useState } from 'react'

import { Dialog } from '@headlessui/react'
import { Close } from 'components/Icons/Icons'

import { QuestionForm } from 'components/Squeak'
import { CallToAction } from 'components/CallToAction'

type QuestionFormProps = {
    onSubmit: () => void
    topicID?: number
    showTopicSelector?: boolean
}

export default function Questions(props: QuestionFormProps): JSX.Element {
    const [showModal, setShowModal] = useState(false)

    const handleSubmit = () => {
        props.onSubmit()
        setShowModal(false)
    }

    return (
        <>
            <Dialog open={showModal} onClose={(isOpen) => setShowModal(isOpen)}>
                <div className="fixed inset-0 bg-black opacity-30 z-40" />

                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <Dialog.Panel className="p-4 shadow dark:shadow-none w-full max-w-2xl bg-tan dark:bg-gray-accent-dark rounded">
                        <div className="flex justify-between items-center mb-3">
                            <Dialog.Title className="text-2xl font-bold m-0">Ask a question</Dialog.Title>
                            <button className="p-2" onClick={() => setShowModal(false)}>
                                <Close className="w-3 h-3" />
                            </button>
                        </div>
                        <QuestionForm
                            showTopicSelector={props.showTopicSelector}
                            topicID={props.topicID}
                            slug={(typeof window !== 'undefined' && window.location.pathname) || ''}
                            initialView="question-form"
                            formType="question"
                            onSubmit={handleSubmit}
                        />
                    </Dialog.Panel>
                </div>
            </Dialog>
            <CallToAction size="md" onClick={() => setShowModal(true)}>
                Ask a question
            </CallToAction>
        </>
    )
}
