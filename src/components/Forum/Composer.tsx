import React, { useMemo, useState } from 'react'
import { navigate } from 'gatsby'
import { IconTrash } from '@posthog/icons'
import { QuestionForm } from 'components/Squeak'
import { ForumFormOptions } from 'components/Squeak/components/QuestionForm'
import { OSSelect } from 'components/OSForm'
import Link from 'components/Link'
import OSButton from 'components/OSButton'
import SEO from 'components/seo'
import { useToast } from '../../context/Toast'
import { ForumTopic, useForumDraft } from './hooks'
import DeletePostDialog from './DeletePostDialog'
import TopicIcon from './TopicIcon'

export default function Composer({
    topics,
    initialTopicId,
    draftId,
}: {
    topics: ForumTopic[]
    initialTopicId?: number
    // Editing a draft: the form loads it, "Save draft" updates it, and "Publish" publishes it.
    draftId?: number
}) {
    const { draft, isLoading: draftLoading } = useForumDraft(draftId)
    const { addToast } = useToast()
    const [deleting, setDeleting] = useState(false)
    // 0 is "Choose for me": Jev picks the topic from the post when it is saved. It is the default for a new post.
    const topicOptions = [
        { label: 'Choose for me', value: 0, icon: <TopicIcon icon="IconSparkles" /> },
        ...topics.map((topic) => ({
            label: `#${topic.attributes.slug}`,
            value: topic.id,
            icon: <TopicIcon icon={topic.attributes.icon} />,
        })),
    ]

    const forum: ForumFormOptions = useMemo(
        () => ({
            initialValues: draft
                ? {
                      subject: draft.attributes.subject,
                      body: draft.attributes.body,
                      forumTopic: draft.attributes.forumTopic?.data?.id,
                  }
                : { forumTopic: initialTopicId ?? 0 },
            allowDraft: true,
            draftId: draft?.id,
            // The server chooses tags when the post goes live, so authors only choose a topic.
            fields: ({ values, setFieldValue }) => (
                <OSSelect
                    label="Posting to:"
                    direction="row"
                    labelWidth="w-[100px] shrink-0"
                    options={topicOptions}
                    value={values.forumTopic}
                    placeholder="Choose a topic"
                    onChange={(topicId) => setFieldValue('forumTopic', topicId)}
                />
            ),
        }),
        [topics, initialTopicId, draft?.id]
    )

    if (draftId && !draftLoading && !draft) {
        return (
            <div className="px-6 py-12 text-center text-secondary">
                <SEO title="Draft not found" />
                <p className="font-semibold text-primary">This draft does not exist, or it is already published.</p>
                <Link to="/forum/drafts">Back to your drafts</Link>
            </div>
        )
    }

    return (
        <div className="@container px-4 @xl:px-6 py-6">
            <SEO title={draftId ? 'Edit draft' : 'New post'} />
            <div className="max-w-2xl mx-auto">
                <div className="flex items-center gap-2 mb-4">
                    <h1 className="text-2xl font-bold text-primary m-0">{draftId ? 'Edit draft' : "What's up?"}</h1>
                    {draft && (
                        <div className="ml-auto">
                            <OSButton size="md" icon={<IconTrash />} onClick={() => setDeleting(true)}>
                                Delete draft
                            </OSButton>
                        </div>
                    )}
                </div>
                {draftLoading && (
                    // A placeholder with the shape of the form while the draft loads.
                    <div className="space-y-3" aria-busy>
                        <div className="h-10 rounded bg-accent animate-pulse" />
                        <div className="h-10 rounded bg-accent animate-pulse" />
                        <div className="h-48 rounded bg-accent animate-pulse" />
                    </div>
                )}
                {!draftLoading && (
                    <QuestionForm
                        // Formik reads its initial values once, so a loaded draft needs a fresh form.
                        key={draft?.id ?? 'new'}
                        formType="question"
                        initialView="question-form"
                        disclaimer={false}
                        forum={forum}
                        onSubmit={(values, _formType, data) => {
                            const chosen = data?.chosenForumTopic
                            if (values.draft) {
                                addToast({
                                    title: chosen ? `Draft saved to #${chosen.slug}` : 'Draft saved',
                                    description: values.subject,
                                })
                                navigate('/forum/drafts')
                                return
                            }
                            if (chosen) addToast({ title: `Posted to #${chosen.slug}`, description: values.subject })
                            const permalink = data?.attributes?.permalink
                            if (permalink) navigate(`/forum/p/${permalink}`, { state: { askMax: true } })
                        }}
                    />
                )}
                {draft && (
                    <DeletePostDialog
                        draft
                        postId={draft.id}
                        open={deleting}
                        onOpenChange={setDeleting}
                        onDeleted={() => navigate('/forum/drafts')}
                    />
                )}
            </div>
        </div>
    )
}
