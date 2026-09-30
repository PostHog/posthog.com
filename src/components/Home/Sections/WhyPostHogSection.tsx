import React from 'react'
import Link from 'components/Link'
import Markdown from 'components/Markdown'
import SupportSmallTeamLink from 'components/Home/SupportSmallTeamLink'
import CloudinaryImage from 'components/CloudinaryImage'
import { useTranslation } from 'i18n'

export const WhyPostHogSection = () => {
    const { t, rich } = useTranslation()

    return (
        <div id="why-posthog">
            <h2>{t('section.6.heading')}</h2>
            <CloudinaryImage
                src="https://res.cloudinary.com/dmukukwp6/image/upload/steve_hogs_17c7900b07.png"
                className="@lg:float-end max-w-[300px] w-full @lg:ms-12 mb-2"
            />

            <Markdown>{`${t('section.6.body')}

- ${t('section.6.list.1')}
- ${t('section.6.list.2')}`}</Markdown>

            <ul>
                <li>
                    {rich('section.6.list.3', {
                        emphasis: (text) => (
                            <strong>
                                <em>{text}</em>
                            </strong>
                        ),
                        bold: (text) => <strong>{text}</strong>,
                        team: (text) => <SupportSmallTeamLink>{text}</SupportSmallTeamLink>,
                    })}
                </li>
            </ul>

            <Link to="/about" state={{ newWindow: true }}>
                {t('section.6.button')}
            </Link>
        </div>
    )
}

export default WhyPostHogSection
