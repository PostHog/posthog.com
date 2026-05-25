import React, { useContext, useState } from 'react'
import { useUser } from 'hooks/useUser'
import RichText from './RichText'
import { useFormik } from 'formik'
import transformValues from '../util/transformValues'
import OSButton from 'components/OSButton'
import { CurrentQuestionContext } from './Question'

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
    const { mutate } = useContext(CurrentQuestionContext)
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

            if (mutate) {
                mutate((current: any) => {
                    if (!current) return current
                    if (type === 'question') {
                        return {
                            ...current,
                            attributes: { ...current.attributes, body: transformedValues.body },
                        }
                    }
                    if (type === 'reply') {
                        const optimisticReplies = current.attributes.replies?.data?.map((r: any) =>
                            r.id === contentID
                                ? { ...r, attributes: { ...r.attributes, body: transformedValues.body } }
                                : r
                        )
                        return {
                            ...current,
                            attributes: { ...current.attributes, replies: { data: optimisticReplies } },
                        }
                    }
                    return current
                }, false)
            }

            handleSetEditing(false)

            try {
                await fetch(
                    `${process.env.GATSBY_SQUEAK_API_HOST}/api/${
                        type === 'reply' ? 'replies' : 'questions'
                    }/${contentID}`,
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
            } catch {
                if (mutate) await mutate()
            }
            setLoading(false)
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
