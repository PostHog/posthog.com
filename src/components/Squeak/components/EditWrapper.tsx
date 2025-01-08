import React, { useState } from 'react'
import { useUser } from 'hooks/useUser'
import { IconCheck, IconX } from '@posthog/icons'
import RichText from './RichText'
import { useFormik } from 'formik'
import transformValues from '../util/transformValues'

export default function EditWrapper({
    data,
    onSubmit,
    children,
    type,
}: {
    data: any
    onSubmit: () => void
    children: (props: { setEditing: (editing: boolean) => void }) => React.ReactNode
    type: 'reply' | 'question'
}): JSX.Element {
    const [editing, setEditing] = useState(false)
    const [loading, setLoading] = useState(false)
    const { user, getJwt } = useUser()
    const body = data?.attributes?.body
    const contentID = data?.id
    const { values, setFieldValue, submitForm } = useFormik({
        initialValues: {
            body,
            images: [],
        },
        onSubmit: async (values) => {
            if (loading || !user?.profile?.id) return
            setLoading(true)
            const jwt = await getJwt()
            const transformedValues = await transformValues(values, user?.profile?.id, jwt)
            await fetch(
                `${process.env.GATSBY_SQUEAK_API_HOST}/api/${type === 'reply' ? 'replies' : 'questions'}/${contentID}`,
                {
                    method: 'PUT',
                    headers: {
                        'content-type': 'application/json',
                        Authorization: `Bearer ${jwt}`,
                    },
                    body: JSON.stringify({
                        data: {
                            body: transformedValues.body,
                        },
                    }),
                }
            )
            await onSubmit()
            setLoading(false)
            setEditing(false)
        },
    })

    return (
        <div>
            {editing ? (
                <>
                    <div className="bg-white dark:bg-accent-dark border border-light dark:border-dark rounded-md overflow-hidden mb-2">
                        <RichText
                            initialValue={values.body}
                            setFieldValue={setFieldValue}
                            values={values}
                            onSubmit={submitForm}
                        />
                    </div>
                    <div className="flex items-baseline justify-end space-x-1">
                        <button
                            onClick={() => setEditing(false)}
                            className="text-red dark:text-yellow font-semibold text-sm flex items-center py-1 px-1.5 rounded hover:bg-accent dark:hover:bg-border-dark/50"
                        >
                            <IconX className="size-4 mr-1 text-red inline-block" />
                            Cancel
                        </button>
                        <button
                            disabled={loading || values.body?.trim() === body?.trim()}
                            onClick={submitForm}
                            className="text-red dark:text-yellow font-semibold text-sm flex items-center py-1 px-1.5 rounded hover:bg-accent dark:hover:bg-border-dark/50 disabled:opacity-60 disabled:!bg-transparent disabled:cursor-not-allowed"
                        >
                            <IconCheck className="size-4 mr-1 text-green inline-block" />
                            {loading ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                </>
            ) : (
                children({ setEditing })
            )}
        </div>
    )
}
