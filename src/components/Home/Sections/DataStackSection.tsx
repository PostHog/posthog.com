import React from 'react'
import Link from 'components/Link'
import Markdown from 'components/Markdown'
import { ImageDW, TooltipDW } from 'components/Home/Decorations'
import { useTranslation } from 'i18n'

const Highlight = (text: string) => <span className="bg-blue/10 dark:bg-blue/20 text-blue rounded-md px-1">{text}</span>

export const DataStackSection = () => {
    const { t, rich } = useTranslation()

    return (
        <div id="customer-infrastructure">
            <h2>{rich('section.4.heading', { highlight: Highlight })}</h2>

            <div className="@lg:float-end text-sm @lg:max-w-xs bg-accent p-4 rounded-sm @lg:ms-6 @lg:mb-2 relative overflow-hidden">
                <p className="my-0 [&_p]:my-0">
                    <strong>{rich('section.4.list.heading', { highlight: Highlight })}</strong>
                </p>
                <span className="[&_ul]:mb-0">
                    <ul>
                        <li>{rich('section.4.list.1', { tooltip: () => <TooltipDW /> })}</li>
                        <li>{t('section.4.list.2')}</li>
                        <li>{t('section.4.list.3')}</li>
                        <li>{t('section.4.list.4')}</li>
                        <li>{t('section.4.list.5')}</li>
                    </ul>
                </span>
                <ImageDW />
            </div>

            <Markdown className="[&_li]:marker:text-primary/50">{`${t('section.4.body.1')}

${t('section.4.body.2')}

- ${t('section.4.body.list.1')}
- ${t('section.4.body.list.2')}

${t('section.4.body.3')}`}</Markdown>

            <Link to="/context-warehouse/sources" state={{ newWindow: true }}>
                {t('section.4.button')}
            </Link>
        </div>
    )
}

export default DataStackSection
