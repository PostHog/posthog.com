import { useControllableValue } from 'ahooks'
import { CallToAction } from 'components/CallToAction'
import React from 'react'
import { cn } from '../../utils'
import { IconPlus, IconMinus } from '@posthog/icons'

type QuantityProps = {
    className?: string
    value?: number
    defaultValue?: number
    onChange?: React.Dispatch<React.SetStateAction<number>>
    buttonSize?: string
}

export function Quantity(props: QuantityProps): React.ReactElement {
    const { className, buttonSize, ...rest } = props
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

    const classes = cn('', className)

    return (
        <div
            className={`${classes} bg-light dark:bg-dark inline-flex items-center border border-light dark:border-dark rounded px-2`}
        >
            <button
                onClick={decreaseQuantity}
                className="w-8 h-8 inline-flex justify-center items-center hover:bg-accent dark:bg-accent-dark border border-transparent hover:border-light dark:hover:border-dark border-b-[3px] rounded relative hover:top-[-1px] hover:scale-[1.05] active:top-[1px] active:scale-[.99]"
            >
                <IconMinus className="w-4 h-4" />
            </button>
            <input
                className="w-12 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none appearance-textfield focus:outline-none border-none bg-transparent font-bold text-center"
                type="number"
                min="1"
                value={quantity}
                onChange={handleInputChange}
            />
            <button
                onClick={increaseQuantity}
                className="w-8 h-8 inline-flex justify-center items-center hover:bg-accent dark:bg-accent-dark border border-transparent hover:border-light dark:hover:border-dark border-b-[3px] rounded relative hover:top-[-1px] hover:scale-[1.05] active:top-[1px] active:scale-[.99]"
            >
                <IconPlus className="w-4 h-4" />
            </button>
        </div>
    )
}
