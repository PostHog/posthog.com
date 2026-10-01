import React from 'react'
import { RoughAnnotation } from 'components/Code/RoughAnnotation'
import { useTranslation } from 'i18n'

const Highlight = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
    <RoughAnnotation
        type="highlight"
        color="rgba(247, 165, 1, 0.15)"
        strokeWidth={1}
        padding={2}
        delay={delay}
        multiline
    >
        {children}
    </RoughAnnotation>
)

const Underline = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
    <RoughAnnotation
        type="underline"
        color="currentColor"
        strokeWidth={1}
        delay={delay}
        multiline
        className="text-secondary"
    >
        {children}
    </RoughAnnotation>
)

const Paragraph = ({ children }: { children: React.ReactNode }) => (
    <p className="text-balance @xl:text-wrap text-[17px]">{children}</p>
)

export const HeroBodyCopy = (): JSX.Element => {
    const { rich } = useTranslation()

    return (
        <Paragraph>
            {rich('hero.body.1', {
                highlight: (text) => <Highlight>{text}</Highlight>,
                underline: (text) => <Underline delay={900}>{text}</Underline>,
            })}
        </Paragraph>
    )
}
