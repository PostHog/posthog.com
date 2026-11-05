import React from 'react'
import { CallToAction } from 'components/CallToAction'
import type { SectionComponentProps } from 'components/Products/ReaderViewProduct'

// Promo callout for /field-guide, rendered as a hidden `productMenu` section on the
// Session Replay and Replay Vision product pages. Styled to match `MaxCTA`, with the
// naturalist hog breaking out of the top border.
const FieldGuideCallout = ({ id }: SectionComponentProps): JSX.Element => (
    <section id={id} className="not-prose scroll-mt-20 max-w-7xl w-full pt-8">
        <div className="ph-callout relative p-4 pl-28 @xl/reader-content:pl-40 border rounded bg-accent border-primary">
            <img
                src="/images/field-guide/naturalist.png"
                alt="The naturalist, Sir Bartholomew Hogworth"
                className="absolute -top-8 left-2 w-24 @xl/reader-content:left-3 @xl/reader-content:w-32"
            />
            <div className="flex flex-col @xl/reader-content:flex-row @xl/reader-content:items-center gap-3 @xl/reader-content:gap-4">
                <div className="flex-1">
                    <strong className="block text-lg mb-0.5">Meet the 10 species living in your replays</strong>
                    <p className="m-0 text-[15px] !leading-relaxed">
                        A naturalist's field guide to the rage-clickers, tab-hoppers, and other wild users you'll spot
                        in user recordings.
                    </p>
                </div>
                <aside>
                    <CallToAction
                        type="secondary"
                        size="sm"
                        to="/field-guide"
                        state={{ newWindow: true }}
                        childClassName="whitespace-nowrap"
                    >
                        Start the safari
                    </CallToAction>
                </aside>
            </div>
        </div>
    </section>
)

export default FieldGuideCallout
