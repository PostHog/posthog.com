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
    ["Length", "hedgehog", "h", "Exactly 17.78 cm. Nose to rump, with the hedgehog's cooperation."],
    ["Mass", "heft", "hf", "Exactly 1 kg. The mass of the reference hedgehog after a very successful lunch."],
    ["Time", "snuffle", "sn", "Exactly 1 second. The committee refused to wait for an actual hedgehog."],
    ["Electric current", "hedgeamp", "hA", "Exactly 1 mA. A theoretical quantity; do not wire up a hedgehog."],
    [
        "Temperature",
        "hedgekelvin",
        "hK",
        "Exactly 1 K. Zero is absolute zero, at which point the hedgehog has left the experiment.",
    ],
    [
        "Amount of substance",
        "hedgemole",
        "hmol",
        "Exactly 6.02214076 × 10²³ specified entities. If the entities are hedgehogs, we need a bigger garden.",
    ],
    [
        "Luminous intensity",
        "hedgela",
        "hcd",
        "Exactly 1 cd. The reference hedgehog holding a flashlight in a specified direction.",
    ],
]

const derivedUnits = [
    ["Area", "square hedgehog", "h²", "A square one hedgehog long on each side. No hedgehogs are flattened."],
    ["Volume", "cubic hedgehog", "h³", "A cube one hedgehog long on each edge. Contents may be spiky."],
    [
        "Speed",
        "hedgehog per snuffle",
        "h/sn",
        "One reference length per snuffle. Whether the hedgehog agrees to move is a separate question.",
    ],
    [
        "Acceleration",
        "hedgehog per snuffle squared",
        "h/sn²",
        "A change in speed of one hedgehog per snuffle, every snuffle. Usually snack-induced.",
    ],
    ["Force", "newhog", "hf·h/sn²", "The force needed to accelerate one heft by one hedgehog per snuffle squared."],
    ["Frequency", "hertzog", "sn⁻¹", "One recurring event per snuffle. Includes unsolicited rustling at night."],
]

const prefixes = [
    ["nano", "n", "10⁻⁹", "A hedgehog's contribution to the rent."],
    ["micro", "μ", "10⁻⁶", "The chance of the committee agreeing on a logo."],
    ["milli", "m", "10⁻³", "A small but formally recognized amount of hog."],
    ["centi", "c", "10⁻²", "One hundredth of a hedgehog. A measurement, not an instruction."],
    ["kilo", "k", "10³", "One thousand hedgehogs. The garden is now their garden."],
    ["mega", "M", "10⁶", "One million hedgehogs. A planning problem."],
    ["giga", "G", "10⁹", "One billion hedgehogs. A government problem."],
]

const examples = [
    { label: "The reference hedgehog", centimeters: hedgehogLengthCm },
    { label: "A one-meter ruler", centimeters: 100 },
    { label: "A 1.8-meter human", centimeters: 180 },
]

export default function StandardUnitOfHedgehog(): JSX.Element {
    return (
        <>
            <SEO
                title="Standard Unit of Hedgehog (SUH) - PostHog"
                description="A perfectly serious system of measurement in which everything is measured in hedgehogs. Definitions, base units, prefixes, and unusually cooperative wildlife."
                image="/images/og/default.png"
            />
            <Editor title="Standard Unit of Hedgehog" proseSize="base" hideToolbar className="[&_article]:pt-10">
                <p className="text-secondary !mt-0">From the International Bureau of Weights and Hedgehogs</p>
                <p>
                    The <strong>Standard Unit of Hedgehog (SUH)</strong> is a system of measurement based on an
                    unusually cooperative hedgehog. It provides a common language for length, mass, time, and four other
                    things the committee insisted we include.
                </p>
                <p>
                    Its central achievement is replacing the question "How big is that?" with the much more useful
                    question "How many hedgehogs is that?" PostHog already uses the system to measure{" "}
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
                                alt="The reference hedgehog, facing left"
                                width="176"
                                height="176"
                                className="w-full h-auto"
                            />
                            <div className="border-x border-b border-primary h-3" />
                            <p className="text-center text-sm font-mono mt-2 mb-0">1 h</p>
                        </div>
                        <div className="text-center @sm:text-left">
                            <p className="text-xl font-bold mb-2">One hedgehog. Exactly.</p>
                            <p className="font-mono mb-2">1 h = 7 in = 17.78 cm</p>
                            <p className="text-sm text-secondary mb-0">
                                Measured nose to rump. Spines excluded.
                                <br />
                                Illustration not to scale.
                            </p>
                        </div>
                    </div>
                    <figcaption className="text-sm text-secondary text-center mt-5">
                        Figure 1. The reference hedgehog. Please do not feed the standard.
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
                            <a href="#calculators">Hedgehog calculators</a>
                        </li>
                        <li>
                            <a href="#experiments">Physics experiments</a>
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
                    One hedgehog, symbol <strong>h</strong>, is defined as exactly seven inches (0.1778 meters). This
                    follows the convention used by PostHog's team pages. The definition is fixed; actual hedgehogs
                    remain free to vary in length, curl into balls, or walk off the ruler.
                </p>
                <p>
                    A reference hedgehog must be awake, uncurled, and facing the same way as the other reference
                    hedgehogs. A curled hedgehog is a different instrument, known as a ball bearing.
                </p>
                <p className="text-sm text-secondary">
                    This is a parody standard. The reference values below are stipulated for this system, not claims
                    about the size, mass, temperature, or electrical properties of real hedgehogs.
                </p>

                <h2 id="base-units">Base units</h2>
                <p>
                    There are seven base units. Each measures a different physical quantity using a reference hedgehog,
                    a hedgehog-related event, or a hedgehog with an implausibly specific job description.
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
                    Symbols belong to their own quantities. A heft cannot be added to a snuffle, even if both hedgehogs
                    look roughly the same.
                </p>

                <h2 id="derived-units">Derived units</h2>
                <p>
                    Base units can be multiplied and divided to describe more complicated things. This is how the
                    committee discovered that a hedgehog can be squared without upsetting it.
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
                    Decimal prefixes let us describe very small and very large quantities without recruiting more
                    hedgehogs. For example, 1 kh = 1,000 h = 177.8 meters. No actual giant hedgehog is required.
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
                            { name: "Suggested application", width: "minmax(230px, 1fr)" },
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
                    Selected prefixes shown. Uppercase matters: a megahog and a millihog require very different
                    enclosures.
                </p>

                <h2 id="practical-measurement">Practical measurement</h2>
                <p>
                    Divide a length in centimeters by 17.78 to obtain its length in hedgehogs. The following
                    measurements use the same icon as our team pages. A partial icon denotes a fractional hedgehog; no
                    hedgehogs were divided in the preparation of this document.
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
                    The icons wrap when the window gets smaller. The human does not. For real-world measurement, use a
                    tape measure and do the arithmetic; lining up live hedgehogs introduces significant drift.
                </p>

                <SuhLab />

                <h2 id="writing-units">Writing units</h2>
                <ul>
                    <li>
                        Put a space between the number and symbol: <strong>12 h</strong>, not 12h.
                    </li>
                    <li>
                        Symbols do not become plural: two hedgehogs is <strong>2 h</strong>, not 2 hs.
                    </li>
                    <li>
                        Keep prefixes attached to symbols: <strong>1 kh</strong>, not 1 k h.
                    </li>
                    <li>
                        Use <strong>h</strong> for hedgehog in this document. Elsewhere it may mean hour. Check before
                        scheduling a meeting.
                    </li>
                    <li>Round the result, not the hedgehog.</li>
                </ul>

                <h2 id="history">History and governance</h2>
                <p>
                    In the beginning, PostHog measured team heights in hedgehogs. Someone then asked whether this
                    counted as a system of units. Rather than answer the question, we established a bureau.
                </p>
                <p>
                    The fictional International Bureau of Weights and Hedgehogs maintains the reference standard in a
                    climate-controlled garden. The General Conference on Weights and Hedgehogs meets whenever everyone
                    is awake at the same time. No resolutions have passed during hibernation season.
                </p>
                <p>
                    Earlier attempts to keep a physical reference hedgehog under glass were abandoned when the reference
                    standard ate its certificate. The current definition is numerical, which is harder to eat.
                </p>
                <hr />
                <p className="text-sm text-secondary">
                    Inspired by the{" "}
                    <a href="https://en.wikipedia.org/wiki/International_System_of_Units">
                        International System of Units
                    </a>
                    . Original parody by PostHog. Not endorsed by any metrology organization, or by the hedgehog. More
                    questionable uses of our time:{" "}
                    <Link to="/sparks-joy" state={{ newWindow: true }}>
                        things that spark joy
                    </Link>
                    .
                </p>
            </Editor>
        </>
    )
}
