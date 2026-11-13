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
    const [error, setError] = useState('')
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
            setError('')
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
                const res = await fetch(
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
                if (!res.ok) {
                    const json = await res.json().catch(() => null)
                    throw new Error(json?.error?.message || 'Your edit could not be saved. Please try again.')
                }
                await onSubmit()
            } catch (err) {
                if (mutate) await mutate()
                setError((err as Error).message)
                handleSetEditing(true)
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
                                <OSButton
                                    onClick={() => {
                                        setError('')
                                        handleSetEditing(false)
                                    }}
                                    variant="secondary"
                                    size="md"
                                >
                                    Cancel
                                </OSButton>
                                {error && <span className="text-sm text-red dark:text-yellow">{error}</span>}
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
