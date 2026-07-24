import React from 'react'
import ImpactCalculator from './ImpactCalculator'
import Faq from './Faq'
import { FenceSpec } from './svgs'

export default function HighwayPage(): JSX.Element {
    return (
        <>
            <div className="sn-shell">
                <section className="sn-hw-hero">
                    <div>
                        <h1 className="sn-h1">
                            Earn nothing.
                            <br />
                            Change everything.
                        </h1>
                        <p className="sn-lede">
                            Your fence is a wall across someone's commute, and a 13cm hole (about a CD case) turns it
                            into a junction. Nobody will pay you, and the traffic comes while you're asleep. Margaret,
                            further down, describes the feeling better than we can.
                        </p>
                    </div>
                    <div className="sn-hw-form" data-snuffl-id="hw-form">
                        <h3>Open your highway</h3>
                        <p className="sn-note">Takes 2 minutes. The hole takes 10 with a jigsaw.</p>
                        <div className="sn-field" data-snuffl-id="input-postcode">
                            <input type="text" placeholder="Postcode" defaultValue="N16 7AR" />
                        </div>
                        <div className="sn-field">
                            <select defaultValue="Timber panel fence" aria-label="Fence type">
                                <option>Timber panel fence</option>
                                <option>Brick wall (we'll talk)</option>
                                <option>Chain link (already permeable, legend)</option>
                                <option>Hedge (you're perfect, sign anyway)</option>
                            </select>
                        </div>
                        <div className="sn-field">
                            <input type="email" placeholder="Email" defaultValue="gardener@example.com" />
                        </div>
                        <button className="sn-btn-black" data-snuffl-id="btn-start-cutting">
                            Start cutting
                        </button>
                        <p className="sn-legal">
                            By continuing, you agree that the hole is permanent, the traffic is nocturnal, and the
                            gratitude is theoretical.
                        </p>
                    </div>
                </section>
            </div>

            <div className="sn-shell">
                <div className="sn-specwrap">
                    <FenceSpec />
                </div>

                <ImpactCalculator />

                <section className="sn-hiw">
                    <h2 className="sn-h2">Four steps to becoming infrastructure</h2>
                    <div className="sn-steps">
                        <div className="sn-step">
                            <span className="sn-n">01</span>
                            <h4>Ask your neighbour</h4>
                            <p>The hole goes both ways. This is legally their problem too.</p>
                        </div>
                        <div className="sn-step">
                            <span className="sn-n">02</span>
                            <h4>Cut the gap</h4>
                            <p>13×13cm at ground level. A CD case is the official measuring device of the movement.</p>
                        </div>
                        <div className="sn-step">
                            <span className="sn-n">03</span>
                            <h4>Register it</h4>
                            <p>Pin your gap on the map so riders can route through it.</p>
                        </div>
                        <div className="sn-step">
                            <span className="sn-n">04</span>
                            <h4>Sleep through rush hour</h4>
                            <p>Peak traffic is 2am. You will never witness your own success.</p>
                        </div>
                    </div>
                </section>

                <Faq />

                <section className="sn-refer">
                    <div>
                        <h2 className="sn-h2">Fences work better in pairs</h2>
                        <p>
                            A gap into a sealed garden is a cul-de-sac. Refer your neighbour and turn it into a
                            through-road.
                        </p>
                    </div>
                    <button className="sn-btn-white" data-snuffl-id="btn-refer">
                        Send a very polite note
                    </button>
                </section>

                <div className="sn-host-quote">
                    <div className="sn-face">M</div>
                    <div>
                        <blockquote>
                            “I cut the hole in 2024. I've since learned I'm the M25 junction of Stoke Newington. Nobody
                            asked me. I've never been prouder.”
                        </blockquote>
                        <div className="sn-who">Margaret, 71 — Host since 2024 · 4,000+ crossings facilitated</div>
                    </div>
                </div>
            </div>
        </>
    )
}
