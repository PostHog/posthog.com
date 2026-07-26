import React from 'react'
import ImpactCalculator from './ImpactCalculator'
import Faq from './Faq'

export default function HighwayPage(): JSX.Element {
    return (
        <>
            <div className="un-shell">
                <section className="un-hw-hero">
                    <div>
                        <h1 className="un-h1">
                            Earn nothing.
                            <br />
                            Change everything.
                        </h1>
                        <p className="un-lede">
                            Your fence is a wall across someone's commute, and a 13cm hole (about a CD case) turns it
                            into a junction. Nobody will pay you, and the traffic comes while you're asleep. Margaret,
                            further down, describes the feeling better than we can.
                        </p>
                    </div>
                    <div className="un-hw-form" data-unter-id="hw-form">
                        <h3>Open your highway</h3>
                        <p className="un-note">Takes 2 minutes. Cutting the gap takes about 10 more.</p>
                        <div className="un-field" data-unter-id="input-postcode">
                            <input type="text" placeholder="Postcode" />
                        </div>
                        {/* An empty, disabled first option is what makes a native select
                            show grey placeholder text the way the inputs do. */}
                        <div className="un-field">
                            <select defaultValue="" aria-label="Fence type">
                                <option value="" disabled>
                                    Fence type
                                </option>
                                <option>Timber panel fence</option>
                                <option>Brick wall (we'll talk)</option>
                                <option>Chain link (already permeable, legend)</option>
                                <option>Hedge (you're perfect, sign anyway)</option>
                            </select>
                        </div>
                        <div className="un-field">
                            <input type="email" placeholder="Email address" />
                        </div>
                        <button className="un-btn-black" data-unter-id="btn-start-cutting">
                            Sign up to host
                        </button>
                        <p className="un-legal">
                            By continuing, you agree that the hole is permanent, the traffic is nocturnal, and the
                            gratitude is theoretical.
                        </p>
                    </div>
                </section>
            </div>

            <div className="un-shell">
                <div className="un-specwrap">
                    <div className="un-ph un-ph-spec">Map</div>
                </div>

                <ImpactCalculator />

                <section className="un-hiw">
                    <h2 className="un-h2">How it works</h2>
                    <div className="un-steps">
                        <div className="un-step">
                            <span className="un-n">01</span>
                            <h4>Ask your neighbour</h4>
                            <p>The hole goes both ways. This is legally their problem too.</p>
                        </div>
                        <div className="un-step">
                            <span className="un-n">02</span>
                            <h4>Cut the gap</h4>
                            <p>13×13cm at ground level. A CD case is the official measuring device of the movement.</p>
                        </div>
                        <div className="un-step">
                            <span className="un-n">03</span>
                            <h4>Register it</h4>
                            <p>Pin your gap on the map so riders can route through it.</p>
                        </div>
                        <div className="un-step">
                            <span className="un-n">04</span>
                            <h4>Sleep through rush hour</h4>
                            <p>Peak traffic is 2am. You will never witness your own success.</p>
                        </div>
                    </div>
                </section>

                <Faq />

                <section className="un-refer">
                    <div>
                        <h2 className="un-h2">Two holes make a route</h2>
                        <p>
                            A gap into a sealed garden is a cul-de-sac. Refer your neighbour and turn it into a
                            through-road.
                        </p>
                    </div>
                    <button className="un-btn-white" data-unter-id="btn-refer">
                        Send a very polite note
                    </button>
                </section>

                <div className="un-host-quote">
                    <div className="un-face">M</div>
                    <div>
                        <blockquote>“Took ten minutes. I'll never meet any of them.”</blockquote>
                        <div className="un-who">Margaret, 71 · Host since 2024 · 4,000+ crossings facilitated</div>
                    </div>
                </div>
            </div>
        </>
    )
}
