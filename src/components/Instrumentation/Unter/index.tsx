import React from 'react'
import { UnterPageId } from '../overlay/types'
import RidePage from './RidePage'
import HighwayPage from './HighwayPage'
import HelpPage from './HelpPage'
import SafetyPage from './SafetyPage'

interface UnterSiteProps {
    page: UnterPageId
    onNavigate: (page: UnterPageId) => void
    /** Fired when the host signup form is submitted, which is the survey's real trigger. */
    onSignupCompleted: () => void
}

const NAV_ITEMS: { id: UnterPageId; label: string }[] = [
    { id: 'ride', label: 'Shuffle' },
    { id: 'highway', label: 'Open your highway' },
    { id: 'help', label: 'Help' },
    { id: 'safety', label: 'Safety' },
]

export default function UnterSite({ page, onNavigate, onSignupCompleted }: UnterSiteProps): JSX.Element {
    return (
        <>
            <nav className="un-topnav" data-unter-id="topnav">
                <button className="un-wordmark" onClick={() => onNavigate('ride')}>
                    Unter
                </button>
                {NAV_ITEMS.map(({ id, label }) => (
                    <button
                        key={id}
                        className={`un-nlink${page === id ? ' active' : ''}`}
                        onClick={() => onNavigate(id)}
                    >
                        {label}
                    </button>
                ))}
                <span className="un-spacer" />
                <span className="un-nlink quiet">EN-GB</span>
                <span className="un-nlink quiet">Log in</span>
                <button className="un-pill" data-unter-id="btn-signup">
                    Sign up
                </button>
            </nav>

            <main>
                {page === 'ride' && <RidePage onNavigate={onNavigate} />}
                {page === 'highway' && <HighwayPage onSignupCompleted={onSignupCompleted} />}
                {page === 'help' && <HelpPage />}
                {page === 'safety' && <SafetyPage />}
            </main>

            <footer className="un-footer" data-unter-id="footer">
                <div className="un-shell">
                    <div className="un-fbrand">Unter</div>
                    <div className="un-fcols">
                        <div>
                            <h5>Company</h5>
                            <span>Newsroom</span>
                            <span>Blog</span>
                            <span>Careers</span>
                        </div>
                        <div>
                            <h5>Products</h5>
                            <span>Shuffle</span>
                            <span>Reserve</span>
                            <span>Unter Host</span>
                        </div>
                        <div>
                            <h5>Responsibility</h5>
                            <span>Safety</span>
                            <span>Sustainability</span>
                            <span>Accessibility</span>
                        </div>
                    </div>
                    <div className="un-fbottom">
                        <div className="un-real">
                            <b>Unter is made up. The holes are not.</b> Urban hedgehogs commute through 13cm gaps in
                            garden fences every night, and there aren't enough of them. Cut a real one via{' '}
                            <a href="https://www.hedgehogstreet.org" target="_blank" rel="noreferrer">
                                Hedgehog Street
                            </a>
                            , or watch Sir David Attenborough escort a hedgehog through one in{' '}
                            <a href="https://www.youtube.com/watch?v=Gsd5_xzebH0" target="_blank" rel="noreferrer">
                                BBC's Wild London
                            </a>
                            .
                        </div>
                        <div className="un-flinks" data-unter-id="footer-legal">
                            <span>Privacy</span>
                            <span>Terms</span>
                            <span>© 2026 Unter Technologies</span>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}
