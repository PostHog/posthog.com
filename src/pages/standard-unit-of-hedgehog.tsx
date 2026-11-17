import React from "react"
import Editor from "components/Editor"
import Link from "components/Link"
import OSTable from "components/OSTable"
import { Fieldset } from "components/OSFieldset"
import SEO from "components/seo"
import SuhLab, { HedgehogRuler } from "components/SuhLab"
import { hedgehogLengthMeters } from "components/SuhLab/physics"

const hedgehogLengthCm = hedgehogLengthMeters * 100

const baseUnits = [
    ["Length", "hedgehog", "h", "The hedgehog is a unit of length equal to exactly 0.1778 m."],
    ["Mass", "heft", "hf", "The heft is a unit of mass equal to exactly 1 kg."],
    ["Time", "snuffle", "sn", "The snuffle is a unit of time equal to exactly 1 s."],
    ["Electric current", "hedgeamp", "hA", "The hedgeamp is a unit of electric current equal to exactly 1 mA."],
    [
        "Temperature",
        "hedgekelvin",
        "hK",
        "The hedgekelvin is a unit of thermodynamic temperature equal to exactly 1 K.",
    ],
    [
        "Amount of substance",
        "hedgemole",
        "hmol",
        "The hedgemole contains exactly 6.02214076 × 10²³ elementary entities. Specify the type of entity for each measurement.",
    ],
    ["Luminous intensity", "hedgela", "hcd", "The hedgela is a unit of luminous intensity equal to exactly 1 cd."],
]

const derivedUnits = [
    ["Area", "square hedgehog", "h²", "The area of a square with a side length of 1 h."],
    ["Volume", "cubic hedgehog", "h³", "The volume of a cube with an edge length of 1 h."],
    ["Speed", "hedgehog per snuffle", "h/sn", "The speed of a body that moves a distance of 1 h in 1 sn."],
    [
        "Acceleration",
        "hedgehog per snuffle squared",
        "h/sn²",
        "The acceleration that changes velocity by 1 h/sn in 1 sn.",
    ],
    ["Force", "newhog", "hf·h/sn²", "The force that gives a mass of 1 hf an acceleration of 1 h/sn²."],
    ["Frequency", "hertzog", "sn⁻¹", "The frequency of a periodic event that occurs once in 1 sn."],
]

const prefixes = [
    ["nano", "n", "10⁻⁹", "1 nh = 0.1778 nm"],
    ["micro", "μ", "10⁻⁶", "1 μh = 0.1778 μm"],
    ["milli", "m", "10⁻³", "1 mh = 0.1778 mm"],
    ["centi", "c", "10⁻²", "1 ch = 1.778 mm"],
    ["kilo", "k", "10³", "1 kh = 177.8 m"],
    ["mega", "M", "10⁶", "1 Mh = 177.8 km"],
    ["giga", "G", "10⁹", "1 Gh = 177,800 km"],
]

const examples = [
    { label: "Reference length, 1 h", centimeters: hedgehogLengthCm },
    { label: "Ruler length, 1 m", centimeters: 100 },
    { label: "Human height, 1.8 m", centimeters: 180 },
]

export default function StandardUnitOfHedgehog(): JSX.Element {
    return (
        <>
            <SEO
                title="Standard Unit of Hedgehog (SUH) - PostHog"
                description="Definitions, conversion factors, notation, and calculation methods for the Standard Unit of Hedgehog (SUH)."
                image="/images/og/default.png"
            />
            <Editor title="Standard Unit of Hedgehog" proseSize="base" hideToolbar className="[&_article]:pt-10">
                <p className="text-secondary !mt-0">International Bureau of Weights and Hedgehogs</p>
                <p>
                    The <strong>Standard Unit of Hedgehog (SUH)</strong> defines seven base units. This document
                    specifies conversions to the International System of Units (SI). The hedgehog, symbol h, is the base
                    unit of length.
                </p>
                <p>
                    This document specifies unit definitions, derived quantities, decimal prefixes, and notation.
                    PostHog uses the reference length to express combined{" "}
                    <Link to="/teams/growth" state={{ newWindow: true }}>
                        team heights
                    </Link>
                    .
                </p>

                <figure className="not-prose !my-8 border-y border-primary py-6">
                    <div className="flex flex-col @sm:flex-row items-center justify-center gap-6 @sm:gap-10">
                        <div className="w-44 shrink-0">
                            <img
                                src="/images/hedgehog.svg"
                                alt="Reference hedgehog with a length indicator"
                                width="176"
                                height="176"
                                className="w-full h-auto"
                            />
                            <div className="border-x border-b border-primary h-3" />
                            <p className="text-center text-sm font-mono mt-2 mb-0">1 h</p>
                        </div>
                        <div className="text-center @sm:text-left">
                            <p className="text-xl font-bold mb-2">Reference length</p>
                            <p className="font-mono mb-2">1 h = 7 in = 17.78 cm</p>
                            <p className="text-sm text-secondary mb-0">
                                The length extends from the nose to the rump.
                                <br />
                                The reference excludes spines.
                                <br />
                                The illustration does not indicate scale.
                            </p>
                        </div>
                    </div>
                    <figcaption className="text-sm text-secondary text-center mt-5">
                        Figure 1. The reference hedgehog represents a length of 1 h.
                    </figcaption>
                </figure>

                <nav aria-label="On this page" className="border border-primary rounded p-4">
                    <strong>Contents</strong>
                    <ol className="!mb-0 !mt-2 @md:columns-2">
                        <li>
                            <a href="#definition">Definition</a>
                        </li>
                        <li>
                            <a href="#base-units">Base units</a>
                        </li>
                        <li>
                            <a href="#derived-units">Derived units</a>
                        </li>
                        <li>
                            <a href="#prefixes">Prefixes</a>
                        </li>
                        <li>
                            <a href="#practical-measurement">Practical measurement</a>
                        </li>
                        <li>
                            <a href="#calculators">Conversion and calculation</a>
                        </li>
                        <li>
                            <a href="#experiments">Physical simulations</a>
                        </li>
                        <li>
                            <a href="#writing-units">Writing units</a>
                        </li>
                        <li>
                            <a href="#history">History and governance</a>
                        </li>
                    </ol>
                </nav>

                <h2 id="definition">Definition</h2>
                <p>
                    One hedgehog, symbol <strong>h</strong>, equals exactly seven inches (0.1778 meters). This
                    definition uses the reference length from PostHog's team pages.
                </p>
                <p>
                    The reference length is a fixed numerical value. Biological variation does not change the unit.
                    Measurement does not require a physical hedgehog.
                </p>
                <p className="text-sm text-secondary">
                    SUH is a fictional system of units. Its definitions do not specify the biological properties of
                    hedgehogs.
                </p>

                <h2 id="base-units">Base units</h2>
                <p>
                    Each base unit corresponds to one physical quantity. The definitions below specify exact conversion
                    factors to SI units.
                </p>
                <div className="not-prose">
                    <OSTable
                        width="full"
                        size="sm"
                        editable={false}
                        rowAlignment="top"
                        columns={[
                            { name: "Quantity", width: "minmax(115px, 1fr)" },
                            { name: "Unit", width: "minmax(110px, 1fr)" },
                            { name: "Symbol", width: "75px" },
                            { name: "Definition", width: "minmax(220px, 3fr)" },
                        ]}
                        rows={baseUnits.map(([quantity, unit, symbol, definition]) => ({
                            cells: [
                                { content: quantity },
                                { content: unit },
                                { content: <span className="font-mono">{symbol}</span> },
                                { content: definition },
                            ],
                        }))}
                    />
                </div>
                <p className="text-sm text-secondary">
                    Add quantities only when their dimensions agree. A mass and a time have different dimensions.
                </p>

                <h2 id="derived-units">Derived units</h2>
                <p>
                    Products and quotients of base units define derived units. Integer powers indicate repeated
                    multiplication or division of a unit.
                </p>
                <div className="not-prose">
                    <OSTable
                        width="full"
                        size="sm"
                        editable={false}
                        rowAlignment="top"
                        columns={[
                            { name: "Quantity / unit", width: "minmax(170px, 2fr)" },
                            { name: "Symbol", width: "110px" },
                            { name: "Interpretation", width: "minmax(220px, 3fr)" },
                        ]}
                        rows={derivedUnits.map(([quantity, unit, symbol, definition]) => ({
                            cells: [
                                {
                                    content: (
                                        <>
                                            <strong>{quantity}</strong>
                                            <br />
                                            {unit}
                                        </>
                                    ),
                                },
                                { content: <span className="font-mono">{symbol}</span> },
                                { content: definition },
                            ],
                        }))}
                    />
                </div>

                <h2 id="prefixes">Prefixes</h2>
                <p>
                    A decimal prefix multiplies a unit by a specified power of ten. For example, 1 kh equals 1,000 h, or
                    177.8 meters.
                </p>
                <div className="not-prose">
                    <OSTable
                        width="full"
                        size="sm"
                        editable={false}
                        rowAlignment="top"
                        columns={[
                            { name: "Prefix", width: "80px" },
                            { name: "Symbol", width: "70px" },
                            { name: "Factor", width: "80px" },
                            { name: "Equivalent length", width: "minmax(230px, 1fr)" },
                        ]}
                        rows={prefixes.map(([prefix, symbol, factor, application]) => ({
                            cells: [
                                { content: prefix },
                                { content: <span className="font-mono">{symbol}</span> },
                                { content: factor },
                                { content: application },
                            ],
                        }))}
                    />
                </div>
                <p className="text-sm text-secondary">
                    This table lists selected prefixes. Prefix symbols are case-sensitive. The symbols M and m indicate
                    factors of 10⁶ and 10⁻³, respectively.
                </p>

                <h2 id="practical-measurement">Practical measurement</h2>
                <p>
                    Divide a length in centimeters by 17.78 to calculate its value in hedgehogs. Each complete icon
                    represents 1 h. A partial icon represents the remaining fraction.
                </p>
                <div className="not-prose space-y-4 my-6">
                    {examples.map(({ label, centimeters }) => {
                        const hedgehogs = centimeters / hedgehogLengthCm
                        return (
                            <Fieldset key={label} legend={label}>
                                <p className="text-sm font-mono m-0">
                                    {centimeters} cm = {hedgehogs.toFixed(3)} h
                                </p>
                                <HedgehogRuler value={hedgehogs} />
                            </Fieldset>
                        )
                    })}
                </div>
                <p>
                    A line break does not change the measurement. Use a length instrument to obtain the input value.
                    Apply the conversion factor after measurement.
                </p>

                <SuhLab />

                <h2 id="writing-units">Writing units</h2>
                <ul>
                    <li>
                        Insert a space between the numerical value and the unit symbol. Write <strong>12 h</strong>.
                    </li>
                    <li>
                        Do not add a plural ending to a unit symbol. Write <strong>2 h</strong>.
                    </li>
                    <li>
                        Attach the prefix directly to the unit symbol. Write <strong>1 kh</strong>.
                    </li>
                    <li>
                        Use <strong>h</strong> for the hedgehog only within the SUH context. In SI notation, h denotes
                        the hour.
                    </li>
                    <li>Use the exact conversion factor. Round the final result to the required precision.</li>
                </ul>

                <h2 id="history">History and governance</h2>
                <p>
                    PostHog's team pages use seven inches as the reference length for a hedgehog. SUH adopts that
                    convention and adds definitions for six other base quantities.
                </p>
                <p>
                    The International Bureau of Weights and Hedgehogs is the fictional authority for this document. The
                    numerical definitions in this document determine the units.
                </p>
                <p>
                    The calculators use these definitions. Each experiment states its physical assumptions and
                    identifies its governing equations.
                </p>
                <hr />
                <p className="text-sm text-secondary">
                    Structural reference:{" "}
                    <a href="https://en.wikipedia.org/wiki/International_System_of_Units">
                        International System of Units
                    </a>
                    . PostHog maintains this fictional specification. The specification does not represent an official
                    metrology standard. Site directory:{" "}
                    <Link to="/sparks-joy" state={{ newWindow: true }}>
                        things that spark joy
                    </Link>
                    .
                </p>
            </Editor>
        </>
    )
}
