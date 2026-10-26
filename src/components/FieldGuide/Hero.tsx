import React from 'react'
import Link from 'components/Link'
import { INK, PAPER } from './heroData'

export default function Hero(): JSX.Element {
    return (
        <div className="fg-hero">
            <div className="fg-title-block">
                <h1 className="fg-title">The Field Guide to Wild Users</h1>
                <p className="fg-subtitle">
                    Observed in their natural habitat: the{' '}
                    <Link to="/session-replay" state={{ newWindow: true }} className="fg-subtitle-link">
                        Session Replay
                    </Link>
                </p>
            </div>

            <style>{`
                [class~="pt-12"]:has(.fg-hero) { padding-top: 0 !important; }
                .fg-hero {
                    container-type: inline-size;
                    position: relative;
                    width: 100%;
                    padding: clamp(1.5rem, 4cqw, 3rem) 0 clamp(1rem, 3cqw, 2rem);
                    background: ${PAPER};
                    color: ${INK};
                }
                .fg-title-block { text-align: center; padding-inline: clamp(1.5rem, 7cqw, 6rem); }
                .fg-title {
                    font-family: 'RoundHog', sans-serif;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: clamp(1px, 0.35cqw, 4px);
                    line-height: 1.05;
                    font-size: clamp(18px, 4cqw, 50px);
                    white-space: nowrap;
                    color: ${INK};
                    margin: 0;
                }
                .fg-subtitle { font-style: italic; font-size: clamp(12px, 1.8cqw, 18px); margin: 0.6rem 0 0; color: ${INK}; }
                .fg-subtitle-link {
                    color: ${INK};
                    text-decoration: underline;
                    text-underline-offset: 2px;
                    text-decoration-thickness: 1px;
                }
                .fg-subtitle-link:hover { color: #E1554E; }

            `}</style>
        </div>
    )
}
