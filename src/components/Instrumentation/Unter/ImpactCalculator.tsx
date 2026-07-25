import React, { useState } from 'react'

// The slider works; the earnings never do. Numbers match the mockup:
// 7 hedgehogs and 0.4 acres per hole.
export default function ImpactCalculator(): JSX.Element {
    const [holes, setHoles] = useState(2)

    return (
        <section className="un-calc" data-unter-id="impact-calc">
            <div>
                <h2 className="un-h2">What one hole does</h2>
                <p className="un-lede">
                    Drag the slider. The hedgehog numbers come from the ecology literature. The earnings number is
                    exact.
                </p>
                <input
                    type="range"
                    min={1}
                    max={6}
                    value={holes}
                    onChange={(e) => setHoles(parseInt(e.target.value, 10))}
                    aria-label="Number of holes"
                />
                <div className="un-slider-label">
                    <span>1 hole</span>
                    <span>6 holes (a legend)</span>
                </div>
            </div>
            <div className="un-calc-out">
                <div className="un-calc-cell">
                    <b>{holes * 7}</b>
                    <span>
                        hedgehogs served
                        <br />
                        per night
                    </span>
                </div>
                <div className="un-calc-cell">
                    <b>{(holes * 0.4).toFixed(1)}</b>
                    <span>
                        acres of territory
                        <br />
                        reconnected
                    </span>
                </div>
                <div className="un-calc-cell">
                    <b>£0.00</b>
                    <span>
                        projected earnings,
                        <br />
                        regardless of slider position
                    </span>
                </div>
            </div>
        </section>
    )
}
