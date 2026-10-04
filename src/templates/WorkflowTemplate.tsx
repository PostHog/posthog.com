import React from 'react'
import ReaderView from 'components/ReaderView'
import { SEO } from 'components/seo'
import { TreeMenu } from 'components/TreeMenu'
import { CallToAction } from 'components/CallToAction'
import CloudinaryImage from 'components/CloudinaryImage'
import TemplateCTAs from 'components/TemplateCTAs'
import type { WorkflowTemplateProps } from '../lib/content/templates'

export default function WorkflowTemplate({ workflow, menu }: WorkflowTemplateProps) {
    const { name, description, image_url, created_by } = workflow

    const authorName = created_by ? [created_by.first_name, created_by.last_name].filter(Boolean).join(' ') : 'PostHog'

    return (
        <>
            <SEO
                image={image_url ?? undefined}
                title={`${name} workflow template - PostHog`}
                description={description ?? undefined}
            />
            <ReaderView
                body={{
                    type: 'plain',
                }}
                title={name}
                leftSidebar={<TreeMenu items={menu} />}
                hideRightSidebar
                hideTitle
                showQuestions={false}
            >
                <div className="max-w-3xl mx-auto prose">
                    <h1 className="!mb-4">{name}</h1>
                    {image_url && (
                        <div className="mb-4">
                            <CloudinaryImage
                                src={image_url as `https://res.cloudinary.com/${string}`}
                                alt={name}
                                className="rounded w-full"
                                imgClassName="w-full"
                            />
                        </div>
                    )}
                    {description && <p className="mb-1.5 mt-0">{description}</p>}
                    {authorName && (
                        <p className="text-sm text-muted m-0">
                            Created by <span className="font-semibold">{authorName}</span>
                        </p>
                    )}
                    <div className="mb-12 mt-5">
                        <TemplateCTAs
                            urls={{
                                primary: `https://app.posthog.com/workflows?templateFilter=${name}#newWorkflow`,
                                secondary: `https://app.posthog.com/workflows/new/workflow`,
                            }}
                        />
                    </div>
                </div>
            </ReaderView>
        </>
    )
}
