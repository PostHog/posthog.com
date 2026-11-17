import React, { useEffect, useRef, useState } from "react"
import { usePrefersReducedMotion } from "components/Code/usePrefersReducedMotion"
import OSButton from "components/OSButton"
import { OSInput, OSSelect } from "components/OSForm"
import { Fieldset } from "components/OSFieldset"
import Slider from "components/RadixUI/Slider"
import {
    boxMeasurements,
    freeFall,
    gravityInHedgehogs,
    hedgehogLengthMeters,
    lengthUnits,
    pendulumPeriod,
    readMeasurement,
} from "./physics"

const format = (value: number) => value.toLocaleString("en-US", { maximumSignificantDigits: 5 })
const measurementError = "Enter a number from 0 to 1,000,000."

export function HedgehogRuler({ value }: { value: number }): JSX.Element {
    const perIcon = Math.max(1, 10 ** Math.ceil(Math.log10(value / 30)))
    const icons = value / perIcon
    return (
        <div>
            <div className="flex flex-wrap gap-y-2 mt-2" role="img" aria-label={`${format(value)} hedgehogs`}>
                {Array.from({ length: Math.ceil(icons) }, (_, index) => (
                    <span
                        key={index}
                        className="block overflow-hidden shrink-0"
                        style={{ width: Math.min(1, icons - index) * 30 }}
                    >
                        <img src="/images/hedgehog.svg" alt="" width="30" height="30" className="!max-w-none" />
                    </span>
                ))}
            </div>
            {perIcon > 1 && (
                <p className="text-sm text-secondary mt-2 mb-0">Each icon represents {format(perIcon)} h.</p>
            )}
        </div>
    )
}

export default function SuhLab(): JSX.Element {
    const [length, setLength] = useState("180")
    const [unit, setUnit] = useState("cm")
    const [dimensions, setDimensions] = useState({ length: "2", width: "1", height: "0.5" })
    const [fallHeight, setFallHeight] = useState(50)
    const [fallTime, setFallTime] = useState(0)
    const [pendulumLength, setPendulumLength] = useState(5)
    const [pendulumTime, setPendulumTime] = useState(0)
    const [running, setRunning] = useState<"fall" | "pendulum" | null>(null)
    const startedAt = useRef(0)
    const reducedMotion = usePrefersReducedMotion()
    const measurement = readMeasurement(length)
    const selectedUnit = lengthUnits.find((item) => item.value === unit)
    const hogs =
        measurement === null || !selectedUnit ? null : (measurement * selectedUnit.meters) / hedgehogLengthMeters
    const boxLength = readMeasurement(dimensions.length)
    const boxWidth = readMeasurement(dimensions.width)
    const boxHeight = readMeasurement(dimensions.height)
    const box =
        boxLength === null || boxWidth === null || boxHeight === null
            ? null
            : boxMeasurements(boxLength, boxWidth, boxHeight)
    const fall = freeFall(fallHeight, fallTime)
    const period = pendulumPeriod(pendulumLength)
    const angle = 10 * Math.cos((2 * Math.PI * pendulumTime) / period)
    const ropeLength = 65 + pendulumLength * 3

    useEffect(() => {
        if (!running) return
        if (reducedMotion) {
            setRunning(null)
            return
        }
        let frame: number
        const tick = (now: number) => {
            const elapsed = (now - startedAt.current) / 1000
            if (running === "fall") {
                setFallTime(Math.min(elapsed, fall.duration))
                if (elapsed >= fall.duration) {
                    setRunning(null)
                    return
                }
            } else {
                setPendulumTime(elapsed % period)
            }
            frame = requestAnimationFrame(tick)
        }
        frame = requestAnimationFrame(tick)
        return () => cancelAnimationFrame(frame)
    }, [running, reducedMotion, fall.duration, period])

    const play = (experiment: "fall" | "pendulum") => {
        if (running === experiment) {
            setRunning(null)
            return
        }
        const time = experiment === "fall" ? (fallTime >= fall.duration ? 0 : fallTime) : pendulumTime
        startedAt.current = performance.now() - time * 1000
        if (experiment === "fall") setFallTime(time)
        setRunning(experiment)
    }

    return (
        <>
            <h2 id="calculators">Hedgehog calculators</h2>
            <p>Bring your own dimensions. We'll supply the hedgehogs.</p>
            <div className="not-prose space-y-6">
                <Fieldset legend="Length converter">
                    <div className="grid @md:grid-cols-2 gap-3">
                        <OSInput
                            label="Length"
                            id="suh-length"
                            type="number"
                            min="0"
                            max="1000000"
                            step="any"
                            direction="column"
                            value={length}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setLength(event.target.value)}
                            aria-invalid={measurement === null}
                            aria-describedby={measurement === null ? "suh-length-error" : undefined}
                        />
                        <OSSelect
                            label="Length unit"
                            direction="column"
                            searchable={false}
                            options={lengthUnits}
                            value={unit}
                            onChange={setUnit}
                        />
                    </div>
                    <output htmlFor="suh-length" className="block font-mono break-words mt-3" aria-live="polite">
                        {hogs === null ? <span id="suh-length-error">{measurementError}</span> : `${format(hogs)} h`}
                    </output>
                    {hogs !== null && <HedgehogRuler value={hogs} />}
                </Fieldset>
                <Fieldset legend="Area and volume calculator">
                    <div className="grid @md:grid-cols-3 gap-3">
                        {(["length", "width", "height"] as const).map((dimension) => (
                            <OSInput
                                key={dimension}
                                label={`${dimension[0].toUpperCase()}${dimension.slice(1)} (m)`}
                                id={`suh-box-${dimension}`}
                                type="number"
                                min="0"
                                max="1000000"
                                step="any"
                                direction="column"
                                value={dimensions[dimension]}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                    setDimensions({ ...dimensions, [dimension]: event.target.value })
                                }
                                aria-invalid={readMeasurement(dimensions[dimension]) === null}
                                aria-describedby={box === null ? "suh-box-error" : undefined}
                            />
                        ))}
                    </div>
                    <output
                        htmlFor="suh-box-length suh-box-width suh-box-height"
                        className="block font-mono break-words mt-3"
                        aria-live="polite"
                    >
                        {box === null ? (
                            <span id="suh-box-error">{measurementError}</span>
                        ) : (
                            <>
                                {format(box.area)} h² footprint
                                <br />
                                {format(box.volume)} h³ volume
                            </>
                        )}
                    </output>
                    <p className="text-sm text-secondary mt-2 mb-0">
                        Footprint = length × width. Volume = length × width × height. The hedgehogs remain
                        three-dimensional.
                    </p>
                </Fieldset>
            </div>

            <h2 id="experiments">The hedgehog physics laboratory</h2>
            <p>
                One snuffle is one second. Here, Earth's gravity is {format(gravityInHedgehogs)} h/sn² (9.81 m/s²).
                These are idealized experiments without air resistance. Only virtual hedgehogs participate.
            </p>
            {reducedMotion && (
                <p>Reduced motion is on. Use the time sliders to inspect each experiment without playback.</p>
            )}
            <div className="not-prose space-y-6">
                <Fieldset legend="Free fall">
                    <p className="text-sm mt-0">
                        Release a hedgehog from rest. Double the height and see whether the fall takes twice as long.
                    </p>
                    <label className="text-sm mb-2">
                        Drop height: {fallHeight} h ({format(fallHeight * hedgehogLengthMeters)} m)
                    </label>
                    <Slider
                        label="Drop height in hedgehogs"
                        defaultValue={50}
                        min={1}
                        max={100}
                        step={1}
                        value={[fallHeight]}
                        onValueChange={([value]) => {
                            setRunning(null)
                            setFallHeight(value)
                            setFallTime(0)
                        }}
                    />
                    <div
                        className="relative h-64 my-4 border-b border-primary overflow-hidden"
                        role="img"
                        aria-label={`Virtual hedgehog has fallen ${format(fall.distance)} of ${fallHeight} hedgehogs`}
                    >
                        <div className="absolute left-3 inset-y-2 border-l border-dashed border-primary" />
                        <span className="absolute left-6 top-0 text-sm">{fallHeight} h</span>
                        <span className="absolute left-6 bottom-0 text-sm">0 h</span>
                        <img
                            src="/images/hedgehog.svg"
                            alt=""
                            width="36"
                            height="36"
                            className="absolute left-1/2 -ml-4 !max-w-none"
                            style={{
                                top: `${(fall.distance / fallHeight) * 100}%`,
                                transform: `translateY(-${(fall.distance / fallHeight) * 100}%)`,
                            }}
                        />
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                        <OSButton size="sm" disabled={!!reducedMotion} onClick={() => play("fall")}>
                            {running === "fall"
                                ? "Pause fall"
                                : fallTime >= fall.duration
                                ? "Drop again"
                                : "Drop hedgehog"}
                        </OSButton>
                        <OSButton
                            size="sm"
                            onClick={() => {
                                setRunning(null)
                                setFallTime(0)
                            }}
                        >
                            Reset fall
                        </OSButton>
                    </div>
                    <label className="text-sm mb-2">
                        Fall time: {format(fall.time)} / {format(fall.duration)} sn
                    </label>
                    <Slider
                        label="Fall progress"
                        defaultValue={0}
                        max={1}
                        step={0.001}
                        value={[fall.time / fall.duration]}
                        onValueChange={([value]) => {
                            setRunning(null)
                            setFallTime(value * fall.duration)
                        }}
                    />
                    <p className="font-mono text-sm mt-3 mb-0" data-fall-readout>
                        {format(fall.distance)} h fallen · {format(fall.speed)} h/sn{" "}
                        {fallTime >= fall.duration ? "just before landing" : "downward"}
                    </p>
                    <p className="text-sm text-secondary mt-2 mb-0">
                        d = ½gt² · v = gt · landing time = √(2H/g). Motion is to scale within the drop; the icon is not.
                    </p>
                    <p className="text-sm m-0" role="status">
                        {fallTime >= fall.duration
                            ? "Landed. The hedgehog has filed a complaint."
                            : running === "fall"
                            ? "Falling."
                            : "Ready when you are."}
                    </p>
                </Fieldset>

                <Fieldset legend="Hedgehog pendulum">
                    <p className="text-sm mt-0">
                        A longer string makes a slower clock. The hedgehog's mass does not change the period.
                    </p>
                    <label className="text-sm mb-2">
                        String length: {pendulumLength} h ({format(pendulumLength * hedgehogLengthMeters)} m)
                    </label>
                    <Slider
                        label="Pendulum length in hedgehogs"
                        defaultValue={5}
                        min={1}
                        max={50}
                        step={1}
                        value={[pendulumLength]}
                        onValueChange={([value]) => {
                            setRunning(null)
                            setPendulumLength(value)
                            setPendulumTime(0)
                        }}
                    />
                    <div
                        className="relative h-64 my-4 overflow-hidden"
                        role="img"
                        aria-label={`Hedgehog pendulum at ${format(angle)} degrees from vertical`}
                    >
                        <div className="absolute top-2 left-1/2 h-56 border-l border-dashed border-primary" />
                        <div
                            className="absolute top-2 left-1/2 w-px bg-current origin-top"
                            style={{ height: ropeLength, transform: `rotate(${angle}deg)` }}
                        >
                            <img
                                src="/images/hedgehog.svg"
                                alt=""
                                width="36"
                                height="36"
                                className="absolute bottom-0 left-1/2 !max-w-none"
                                style={{ transform: `translate(-50%, 50%) rotate(${-angle}deg)` }}
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                        <OSButton size="sm" disabled={!!reducedMotion} onClick={() => play("pendulum")}>
                            {running === "pendulum" ? "Pause pendulum" : "Swing hedgehog"}
                        </OSButton>
                        <OSButton
                            size="sm"
                            onClick={() => {
                                setRunning(null)
                                setPendulumTime(0)
                            }}
                        >
                            Reset pendulum
                        </OSButton>
                    </div>
                    <label className="text-sm mb-2">
                        Cycle time: {format(pendulumTime)} / {format(period)} sn
                    </label>
                    <Slider
                        label="Pendulum cycle progress"
                        defaultValue={0}
                        max={1}
                        step={0.001}
                        value={[pendulumTime / period]}
                        onValueChange={([value]) => {
                            setRunning(null)
                            setPendulumTime(value * period)
                        }}
                    />
                    <p className="font-mono text-sm mt-3 mb-0" data-pendulum-readout>
                        Period: {format(period)} sn · frequency: {format(1 / period)} hertzog
                    </p>
                    <p className="text-sm text-secondary mt-2 mb-0">
                        T = 2π√(L/g) · f = 1/T. Small-angle model, released at 10°, with a massless string and no
                        friction. Illustration not to scale.
                    </p>
                </Fieldset>
            </div>
            <p className="text-sm text-secondary">
                Physics references: OpenStax on{" "}
                <a href="https://openstax.org/books/university-physics-volume-1/pages/3-5-free-fall">free fall</a> and{" "}
                <a href="https://openstax.org/books/university-physics-volume-1/pages/15-4-pendulums">
                    simple pendulums
                </a>
                .
            </p>
        </>
    )
}
