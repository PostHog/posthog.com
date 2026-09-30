import React from 'react'
import { cn } from '../../../utils'
import { useTranslation } from '../../../i18n'
import { HeroBodyCopy } from './variants'

/** The emphasis clause is the one that gets the blue highlight treatment. */
export const HeroHeadline = ({ className }: { className?: string }): JSX.Element => {
    const { rich } = useTranslation()

    return (
        <h1 className={cn('!text-3xl @xl:!text-4xl mt-0', className)}>
            {rich('home.hero.headline', {
                emphasis: (text) => (
                    <span className="bg-blue/10 dark:bg-blue/20 text-blue rounded-md px-1 @xl:whitespace-nowrap">
                        {text}
                    </span>
                ),
            })}
        </h1>
    )
}

export const HeroBody = (): JSX.Element => {
    const { t } = useTranslation()

    return (
        <>
            <HeroBodyCopy />
            <p className="text-balance @xl:text-wrap text-secondary">{t('home.hero.social_proof')}</p>
        </>
    )
}
