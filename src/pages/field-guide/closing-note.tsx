import React from 'react'
import Link from 'components/Link'
import FieldGuideProse from 'components/FieldGuide/FieldGuideProse'

export default function Page(): JSX.Element {
    return (
        <FieldGuideProse
            title="Closing note"
            seoTitle="Closing note - The Field Guide to Wild Users"
            signature="– S.B.H."
            image="/images/field-guide/naturalist.png"
            paragraphs={[
                `The species I have set down here are the ones I have observed often enough, and with sufficient certainty, to risk naming. You will catch more in your own user base.`,
                `There are species that have appeared in my notebooks only once or twice, behaviors I have seen which I am not yet ready to call patterns, peculiarities I do not understand. Some of them will turn out to be species in their own right. The work of naming proceeds slowly, even now that the work of watching does not.`,
                `Replay Vision, which helped me compile this guide, remains in the field, and does not require my presence to continue. By the time this volume is printed, it will have observed more than I will read in a lifetime.`,
                `If the reader has a product of their own, they will find species in it that this guide does not yet describe. I would encourage them, on Hogworth's own authority, to give those species names.`,
                <>
                    The work, for any reader who wishes to take it up, begins at{' '}
                    <Link to="/replay-vision" state={{ newWindow: true }}>
                        posthog.com/replay-vision
                    </Link>
                    .
                </>,
            ]}
        />
    )
}
