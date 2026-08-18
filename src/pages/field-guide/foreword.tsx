import React from 'react'
import Link from 'components/Link'
import FieldGuideProse from 'components/FieldGuide/FieldGuideProse'

export default function Page(): JSX.Element {
    return (
        <FieldGuideProse
            title="Foreword from the naturalist"
            seoTitle="Foreword - The Field Guide to Wild Users"
            dropCap
            image="/images/field-guide/naturalist.png"
            signature="– Sir Bartholomew Hogworth, F.R.S. First Edition, 2026"
            paragraphs={[
                `There is a particular kind of patience required to watch users. In my early years of fieldwork, before any of this was possible, I would sit at the edge of a single session recording and wait. Most yielded nothing. A handful would reveal something so quietly remarkable that it justified the previous forty hours of nothing in particular. By tradition, the rate of user species discovery is slow.`,
                <>
                    Until the nice people of PostHog made{' '}
                    <Link to="/replay-vision" state={{ newWindow: true }}>
                        Replay Vision
                    </Link>
                    . Replay Vision watches every session on a schedule that does not require my presence. It
                    prioritizes the problems worth surfacing, and it brings the findings to whoever is meant to receive
                    them. The species are still out there in the field, behaving as they always have. They are simply
                    being cataloged without me. I no longer wade through the field; I only read the field notes that
                    come back and make decisions about the next step.
                </>,
                <>
                    This is, in essence, the same shift that has overtaken the motorcar, now applied to software. The
                    product{' '}
                    <Link to="/blog/self-driving-product" state={{ newWindow: true }}>
                        self-drives
                    </Link>
                    , while the human reads the road ahead and decides what direction to take.
                </>,
                `The species cataloged here are the ones we have observed often enough to name. There are more, almost certainly living in your product right now. Replay Vision is still watching. The field guide that follows is, in effect, a list of things you no longer have to look for yourself. Your job is to decide what to do about the Rage-Clicker.`,
            ]}
        />
    )
}
