import React from 'react'
import { SnufflPageId } from '../overlay/types'
import RidePage from './RidePage'
import HighwayPage from './HighwayPage'
import SafetyPage from './SafetyPage'

interface SnufflSiteProps {
    page: SnufflPageId
    onNavigate: (page: SnufflPageId) => void
}

const NAV_ITEMS: { id: SnufflPageId; label: string }[] = [
    { id: 'ride', label: 'Ride' },
    { id: 'highway', label: 'Open your highway' },
    { id: 'safety', label: 'Safety' },
]

export default function SnufflSite({ page, onNavigate }: SnufflSiteProps): JSX.Element {
    return (
        <>
            <nav className="sn-topnav" data-snuffl-id="topnav">
                <button className="sn-wordmark" onClick={() => onNavigate('ride')}>
                    Snuffl
                </button>
                {NAV_ITEMS.map(({ id, label }) => (
                    <button
                        key={id}
                        className={`sn-nlink${page === id ? ' active' : ''}`}
                        onClick={() => onNavigate(id)}
                    >
                        {label}
                    </button>
                ))}
                <span className="sn-spacer" />
                <span className="sn-nlink quiet">EN-GB</span>
                <span className="sn-nlink quiet">Help</span>
                <span className="sn-nlink quiet">Log in</span>
                <button className="sn-pill">Sign up</button>
            </nav>

            <main>
                {page === 'ride' && <RidePage onNavigate={onNavigate} />}
                {page === 'highway' && <HighwayPage />}
                {page === 'safety' && <SafetyPage />}
            </main>

            <footer className="sn-footer">
                <div className="sn-shell">
                    <div className="sn-fbrand">Snuffl</div>
                    <div className="sn-fcols">
                        <div>
                            <h5>Company</h5>
                            <span>About us</span>
                            <span>Newsroom</span>
                            <span>Notes from the underground (blog)</span>
                            <span>Careers (unpaid, all of them)</span>
                        </div>
                        <div>
                            <h5>Products</h5>
                            <span>Ride</span>
                            <span>Reserve</span>
                            <span>Snuffl for Broods</span>
                            <span>Snuffl Host</span>
                            <span>API</span>
                        </div>
                        <div>
                            <h5>Global citizenship</h5>
                            <span>Safety</span>
                            <span>Sustainability (we are a conservation charity in a gilet)</span>
                            <span>Accessibility: the 15cm gap programme</span>
                        </div>
                    </div>
                    <div className="sn-fbottom">
                        <div className="sn-real">
                            <b>Snuffl is made up. The holes are not.</b> Urban hedgehogs commute through 13cm gaps in
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
                        <div className="sn-flinks">
                            <span>Privacy</span>
                            <span>Terms</span>
                            <span>© 2026 Snuffl Technologies (a shed)</span>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}
