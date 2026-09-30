import React from 'react'
import Markdown from 'components/Markdown'
import { ImageReading1, ImageReading2 } from 'components/Home/Decorations'
import CloudinaryImage from 'components/CloudinaryImage'
import { useTranslation } from 'i18n'

export const BedtimeReadingSection = () => {
    const { t } = useTranslation()

    return (
        <div id="bedtime-reading">
            <h2>{t('section.7.heading')}</h2>

            <CloudinaryImage
                src="https://res.cloudinary.com/dmukukwp6/image/upload/night_hog_219fff00f3.png"
                className="@lg:float-right max-w-[340px] w-full @lg:ml-12 mb-2 rotate-[5deg]"
            />

            <p>{t('section.7.body')}</p>

            <Markdown>{`- [demo.mov](/demo)
- [${t('section.7.link.2')}](/docs)
- [${t('section.7.link.3')}](/docs/api)
- [${t('section.7.link.4')}](/questions)
- [${t('section.7.link.5')}](/teams)`}</Markdown>
        </div>
    )
}

export default BedtimeReadingSection
