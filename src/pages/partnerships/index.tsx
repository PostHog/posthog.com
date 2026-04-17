import React from 'react'
import SEO from 'components/seo'
import Editor from 'components/Editor'
import PartnershipsSurvey from 'components/PartnershipsSurvey'

export default function Partnerships(): JSX.Element {
    return (
        <>
            <SEO
                title="Partnerships – PostHog"
                description="PostHog is selective about the partners we work with. Register your interest and we'll be in touch when we're ready to move forward."
                image={`/images/og/default.png`}
            />
            <Editor title="Partnerships">
                {/* TODO: swap this illustration for a more on-brand partnerships image */}
                <img
                    src="https://res.cloudinary.com/dmukukwp6/image/upload/happy_hog_ebc59e4658.png"
                    alt="PostHog hedgehog"
                    className="float-right max-w-[300px] max-h-48 -mt-2 -mr-2"
                />

                <p>
                    We're currently being <strong>very selective</strong> about the partners we work with. Building the
                    right partnerships takes time, and we'd rather do a small number of them exceptionally well than
                    spread ourselves thin.
                </p>

                <p>
                    If you think there's a strong fit between your company and PostHog, we'd love to hear from you. Fill
                    in the form below to register your interest — we'll reach out when we're ready to move forward.
                </p>

                <p>
                    We consider partnerships across technical integrations, implementation services, and affiliate
                    programs. If you're unsure which category fits best, just pick "Other" and tell us more.
                </p>

                <PartnershipsSurvey />
            </Editor>
        </>
    )
}
