import React, { useState } from 'react'
import { useUser } from 'hooks/useUser'
import { IconCheck, IconX } from '@posthog/icons'
import RichText from './RichText'
import { useFormik } from 'formik'
import transformValues from '../util/transformValues'
import OSButton from 'components/OSButton'

export default function EditWrapper({
    data,
    editing,
    onEditingChange,
    onSubmit,
    children,
    type,
}: {
    data: any
    editing: boolean
    onEditingChange: (editing: boolean) => void
    onSubmit: () => void
    children: React.ReactNode
    type: 'reply' | 'question'
}): JSX.Element {
    const handleSetEditing = (value: boolean) => {
        onEditingChange?.(value)
    }
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
            handleSetEditing(false)
        },
    })

    return (
        <div>
            {editing ? (
                <>
                    <RichText
                        initialValue={values.body}
                        setFieldValue={setFieldValue}
                        values={values}
                        onSubmit={submitForm}
                        cta={() => (
                            <>
                                <OSButton
                                    disabled={loading || values.body?.trim() === body?.trim()}
                                    onClick={submitForm}
                                    variant="primary"
                                    size="md"
                                >
                                    {loading ? 'Saving...' : 'Save'}
                                </OSButton>
                                <OSButton onClick={() => handleSetEditing(false)} variant="secondary" size="md">
                                    Cancel
                                </OSButton>
                            </>
                        )}
                    />
                </>
            ) : (
                children
            )}
        </div>
    )
}
