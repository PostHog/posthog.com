import React from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { IMarquee, ISection, ISectionHeading, ISectionWrapper } from './types'
import { FeatureGrid, FeatureList } from './Feature'
import TwoCol from './TwoCol'
import slugify from 'slugify'
import { CallToAction } from 'components/CallToAction'
import { LightBulbIcon } from '@heroicons/react/outline'
import GatsbyLink from 'components/Link'
import MarqueeContainer from 'react-fast-marquee'

export const SectionHeading = ({ title, subtitle }: ISectionHeading) => {
    return (
        <div className="mb-6">
            {title && (
                <h2 className="text-3xl pt-4 m-0 -mt-4" id={slugify(title.replace('&-', ''), { lower: true })}>
                    {title}
                </h2>
            )}
            {subtitle && typeof subtitle === 'string' ? (
                <p className="text-base font-semibold opacity-70 m-0" dangerouslySetInnerHTML={{ __html: subtitle }} />
            ) : (
                subtitle
            )}
        </div>
    )
}

const Marquee = ({ slides }: { slides: IMarquee[] }) => {
    return (
        <div className="w-full absolute left-0 bg-border/75 dark:bg-border-dark/75 border-y border-light dark:border-dark py-4">
            <MarqueeContainer autoFill pauseOnHover>
                {slides.map(({ text, url }, index) => {
                    const Container = url ? GatsbyLink : 'div'
                    return (
                        <Container {...(url ? { to: url } : null)} key={text + index} className="mx-2">
                            "{text}"
                        </Container>
                    )
                })}
            </MarqueeContainer>
        </div>
    )
}

export const SectionWrapper = ({ children, className = '' }: ISectionWrapper) => {
    return (
        <section className={`list-none my-1 py-4 md:my-0 md:py-0 ${className}`}>
            <div className={`max-w-screen-2xl mx-auto`}>{children}</div>
        </section>
    )
}

export const Sections = ({ sections }: { sections: ISection[][] }) => {
    return (
        <>
            {sections.map((section, sectionIndex) => {
                return (
                    <SectionWrapper className="py-12 md:py-14 md:my-auto !my-0" key={sectionIndex}>
                        {section.length > 1 ? (
                            <TwoCol>
                                {section.map((section, index) => (
                                    <Section
                                        align={section?.align}
                                        key={index}
                                        {...section}
                                        className={sectionIndex % 2 && index % 2 ? 'md:-order-1' : ''}
                                    />
                                ))}
                            </TwoCol>
                        ) : section[0].marquee ? (
                            <Marquee slides={section[0].marquee} />
                        ) : (
                            <Section {...section[0]} />
                        )}
                    </SectionWrapper>
                )
            })}
        </>
    )
}

export default function Section({
    title,
    subtitle,
    features,
    image,
    content,
    align,
    sections,
    imageFrame = true,
    hideImage,
    className = '',
    callout,
    featuresType = 'list',
}: ISection) {
    const gatsbImage = !hideImage && image && getImage(image)
    return (
        <div className={className} style={{ alignSelf: align }}>
            {(title || subtitle) && <SectionHeading title={title} subtitle={subtitle} />}
            {content && <div dangerouslySetInnerHTML={{ __html: content }} />}
            {features &&
                features?.length > 0 &&
                (featuresType === 'card' ? <FeatureGrid features={features} /> : <FeatureList features={features} />)}
            {gatsbImage && (
                <GatsbyImage
                    alt={title || ''}
                    image={gatsbImage}
                    className={imageFrame ? 'rounded overflow-hidden shadow-xl' : ''}
                />
            )}
            {sections &&
                (sections?.length > 1 ? (
                    <TwoCol>
                        {sections.map((section, index) => (
                            <Section align={section?.align} key={index} {...section} />
                        ))}
                    </TwoCol>
                ) : (
                    <Section {...sections[0]} />
                ))}
            {callout && (
                <div className="p-5  rounded-md mt-4 inline-block">
                    <div className="flex space-x-2 items-start">
                        <LightBulbIcon className="w-6 flex-shrink-0" />
                        <div>
                            <div dangerouslySetInnerHTML={{ __html: callout.content }} />
                            <CallToAction size="sm" type="secondary" to={callout.cta.url}>
                                {callout.cta.label}
                            </CallToAction>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
