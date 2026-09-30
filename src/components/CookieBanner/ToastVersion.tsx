import React, { useEffect, useState } from 'react'
import { useToast } from '../../context/Toast'
import usePostHog from '../../hooks/usePostHog'
import CloudinaryImage from 'components/CloudinaryImage'
import Tooltip from 'components/RadixUI/Tooltip'
import { IconX } from '@posthog/icons'
import { useTranslation } from 'i18n'

export default function CookieBannerToast() {
    const { addToast } = useToast()
    const posthog = usePostHog()
    const [hasShownBanner, setHasShownBanner] = useState(false)
    const { t, rich } = useTranslation()

    useEffect(() => {
        const consent = localStorage.getItem('cookie_consent')

        if (!consent && !hasShownBanner) {
            setHasShownBanner(true)
            addToast({
                title: t('cookie.heading'),
                description: (
                    <>
                        <p className="mt-1">{t('cookie.body.1')}</p>
                        <p className="pr-28">
                            {rich('cookie.body.2', {
                                tooltip: (text) => (
                                    <Tooltip
                                        trigger={<span className="border-b border-primary border-dashed">{text}</span>}
                                        delay={0}
                                    >
                                        <div className="max-w-64">
                                            <span className="text-sm">{t('cookie.tooltip.label')}</span>
                                        </div>
                                    </Tooltip>
                                ),
                            })}
                        </p>
                    </>
                ),
                image: (
                    <div className="absolute bottom-0 -right-4 leading-[0]">
                        <CloudinaryImage
                            alt={t('cookie.tooltip.image.alt')}
                            width={180}
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/EU/images/ursula.png"
                        />
                    </div>
                ),
                onAction: () => {
                    localStorage.setItem('cookie_consent', 'acknowledged')
                    posthog?.set_config({ persistence: 'localStorage+cookie' })
                },
                actionLabel: t('cookie.close'),
                actionAsIcon: <IconX className="size-4" />,
                verticalAlign: 'items-start',
                duration: 999999999,
            })
        } else if (consent) {
            // If acknowledgement was already received, ensure PostHog is configured correctly
            posthog?.set_config({ persistence: 'localStorage+cookie' })
        }
    }, [addToast, posthog, hasShownBanner, t, rich])

    return null
}
