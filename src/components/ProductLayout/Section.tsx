import React from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { ISection, ISectionHeading, ISectionWrapper } from './types'
import { FeatureList } from './Feature'
import TwoCol from './TwoCol'

export const SectionHeading = ({ title, subtitle }: ISectionHeading) => {
    return (
        <div className="mb-6">
            {title && <h2 className="text-3xl m-0">{title}</h2>}
            {subtitle && typeof subtitle === 'string' ? (
                <p className="text-base font-semibold opacity-70 m-0">{subtitle}</p>
            ) : (
                subtitle
            )}
        </div>
    )
}

export const SectionWrapper = ({ children, className = '' }: ISectionWrapper) => {
    return (
        <section className={`list-none my-1 py-4 md:py-12 ${className}`}>
            <div className={`max-w-7xl mx-auto`}>{children}</div>
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
    className = '',
}: ISection) {
    const gatsbImage = image && getImage(image)
    return (
        <div className={className} style={{ alignSelf: align }}>
            {(title || subtitle) && <SectionHeading title={title} subtitle={subtitle} />}
            {content && <div dangerouslySetInnerHTML={{ __html: content }} />}
            {features && features?.length > 0 && <FeatureList features={features} />}
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
        </div>
    )
}
