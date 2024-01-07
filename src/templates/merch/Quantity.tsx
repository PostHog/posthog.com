import { useControllableValue } from 'ahooks'
import { CallToAction } from 'components/CallToAction'
import React from 'react'

type QuantityProps = {
    className?: string
    value?: number
    onChange?: React.Dispatch<React.SetStateAction<number>>
}

export function Quantity(props: QuantityProps): React.ReactElement {
    const { className, ...rest } = props
    const [quantity, setQuantity] = useControllableValue(rest, { defaultValue: 1 })

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }

    const increaseQuantity = () => {
        setQuantity(quantity + 1)
    }

    const handleInputChange = (event) => {
        const newValue = Number(event.target.value)

        if (newValue >= 1) {
            setQuantity(newValue)
        }
    }

    return (
        <div>
            <CallToAction
                onClick={decreaseQuantity}
                type="secondary"
                className="[&_span]:py-2 [&_span]:px-4 text-large"
            >
                -
            </CallToAction>
            <input
                className="w-10 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none appearance-textfield focus:outline-none border-none bg-transparent font-bold text-center"
                type="number"
                min="1"
                value={quantity}
                onChange={handleInputChange}
            />
            <CallToAction
                onClick={increaseQuantity}
                type="secondary"
                className="[&_span]:py-2 [&_span]:px-4 text-large"
            >
                +
            </CallToAction>
        </div>
    )
}
