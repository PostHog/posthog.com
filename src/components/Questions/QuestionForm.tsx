import React, { useState } from 'react'

import { Dialog } from '@headlessui/react'
import { Close } from 'components/Icons/Icons'

import { Form } from 'squeak-react'

type QuestionFormProps = {
    onSubmit: () => void
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
                        <Form
                            apiHost={process.env.GATSBY_SQUEAK_API_HOST as string}
                            organizationId={process.env.GATSBY_SQUEAK_ORG_ID as string}
                            initialView="question-form"
                            onSubmit={handleSubmit}
                        />
                    </Dialog.Panel>
                </div>
            </Dialog>
            <button
                type="button"
                className="flex-shrink-0 inline-flex items-center justify-center rounded border border-transparent bg-red px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-red focus:ring-offset-2 sm:w-auto shadow-lg"
                onClick={() => setShowModal(true)}
            >
                Ask a question
            </button>
        </>
    )
}
