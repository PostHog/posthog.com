import React from 'react'
import SEO from 'components/seo'
import ReaderView from 'components/ReaderView'
import TableOfContents from './TableOfContents'
import { INK } from './heroData'

const PLATE_PAPER = '#F0ECD9'

interface Props {
    title: string
    seoTitle: string
    paragraphs: React.ReactNode[]
    signature: string
    dropCap?: boolean
    image?: string
}

export default function FieldGuideProse({
    title,
    seoTitle,
    paragraphs,
    signature,
    dropCap,
    image,
}: Props): JSX.Element {
    return (
        <>
            <SEO title={seoTitle} description="The Field Guide to Wild Users." image={`/images/og/default.png`} />
            <ReaderView
                leftSidebar={<TableOfContents />}
                hideRightSidebar
                hideTitle
                showQuestions={false}
                showAbout={false}
                padding={false}
                contentMaxWidthClass="max-w-none"
            >
                <div className="fgp">
                    <article className={`fgp-article${dropCap ? ' fgp-article--dropcap' : ''}`}>
                        <h1 className="fgp-title">{title}</h1>
                        {paragraphs.map((p, i) => (
                            <p key={i} className="fgp-p">
                                {p}
                            </p>
                        ))}
                        {image ? (
                            <div className="fgp-signoff">
                                <img
                                    className="fgp-signoff-img"
                                    src={image}
                                    alt="Sir Bartholomew Hogworth, F.R.S."
                                    loading="lazy"
                                />
                                <p className="fgp-signature">{signature}</p>
                            </div>
                        ) : (
                            <p className="fgp-signature">{signature}</p>
                        )}
                    </article>
                </div>
                <style>{`
                    [class~="pt-12"]:has(.fgp) { padding-top: 0 !important; }
                    .fgp {
                        container-type: inline-size;
                        background: ${PLATE_PAPER};
                        color: ${INK};
                        min-height: 100%;
                        padding: clamp(1.5rem, 5cqw, 4rem);
                    }
                    .fgp-article { max-width: 68ch; margin: 0 auto; }
                    .fgp-title {
                        font-family: 'RoundHog', sans-serif;
                        font-weight: 800;
                        text-transform: uppercase;
                        letter-spacing: 0.5px;
                        font-size: clamp(22px, 3.5cqw, 34px);
                        line-height: 1.1;
                        color: ${INK};
                        margin: 0 0 1.75rem;
                    }
                    .fgp-p {
                        font-size: clamp(14px, 1.7cqw, 16px);
                        line-height: 1.7;
                        margin: 0 0 1.15rem;
                        color: ${INK};
                    }
                    .fgp-article--dropcap .fgp-p:first-of-type::first-letter {
                        font-family: 'RoundHog', sans-serif;
                        font-weight: 800;
                        float: left;
                        font-size: 3.4em;
                        line-height: 0.8;
                        padding: 0.05em 0.12em 0 0;
                        color: ${INK};
                    }
                    .fgp-signature {
                        font-style: italic;
                        font-size: clamp(13px, 1.6cqw, 15px);
                        margin-top: 2rem;
                        color: ${INK};
                    }
                    .fgp-signoff {
                        display: flex;
                        flex-direction: column;
                        align-items: flex-end;
                        gap: 0.25rem;
                        margin-top: 2.5rem;
                    }
                    .fgp-signoff-img {
                        width: clamp(96px, 22cqw, 150px);
                        height: auto;
                        filter: drop-shadow(2px 4px 3px rgba(69, 28, 1, 0.22));
                    }
                    .fgp-signoff .fgp-signature { margin-top: 0.25rem; }
                    .fgp-p a { color: ${INK}; text-decoration: underline; text-underline-offset: 2px; font-weight: 600; }
                    .fgp-p a:hover { color: #E1554E; }
                `}</style>
            </ReaderView>
        </>
    )
}
