import React, { useEffect, useState } from 'react'
import { Digit0, Digit1, Digit2, Digit3, Digit4, Digit5, Digit6, Digit7, Digit8, Digit9 } from 'components/OSIcons'

const digitComponents: { [key: string]: React.ComponentType<any> } = {
    '0': Digit0,
    '1': Digit1,
    '2': Digit2,
    '3': Digit3,
    '4': Digit4,
    '5': Digit5,
    '6': Digit6,
    '7': Digit7,
    '8': Digit8,
    '9': Digit9,
}

const getDigitComponent = (digit: string) => digitComponents[digit] || Digit0

export const HitCounter = () => {
    const [hitCount, setHitCount] = useState<number | null>(null)

    useEffect(() => {
        fetch(`/api/homepage-hits`)
            .then((res) => res.json())
            .then((count) => setHitCount(count))
            .catch((err) => console.error(err))
    }, [])

    if (hitCount === null) return null

    const digits = hitCount.toString().padStart(7, '0').split('')

    return (
        <span className="inline-flex items-center gap-0.5">
            {digits.map((digit, index) => {
                const DigitComp = getDigitComponent(digit)
                return <DigitComp key={index} className="h-4 w-auto" />
            })}
        </span>
    )
}

export default HitCounter
