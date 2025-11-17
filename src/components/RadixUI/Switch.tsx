import * as React from 'react'
import { Switch as RadixSwitch } from 'radix-ui'

const Switch = ({
    label,
    className = '',
    onChange,
    initialChecked = false,
    checked: controlledChecked,
}: {
    label: string
    className?: string
    onChange?: (checked: boolean) => void
    initialChecked?: boolean
    checked?: boolean
}): JSX.Element => {
    const [uncontrolledChecked, setUncontrolledChecked] = React.useState(initialChecked)
    const isControlled = controlledChecked !== undefined
    const checked = isControlled ? controlledChecked : uncontrolledChecked
    const id = label.toLowerCase().replace(/[^a-z0-9]+/g, '-')

    return (
        <form data-scheme="primary" className={`inline-flex items-center ${className}`}>
            <label className="pr-[15px] text-[15px] leading-none text-primary" htmlFor={id}>
                {label}
            </label>
            <RadixSwitch.Root
                checked={checked}
                onCheckedChange={(newChecked) => {
                    if (!isControlled) {
                        setUncontrolledChecked(newChecked)
                    }
                    onChange?.(newChecked)
                }}
                className="relative h-[27px] w-[44px] cursor-default border border-primary rounded-full bg-primary outline-none focus-visible:shadow-[0_0_0_2px] focus-visible:shadow-black data-[state=checked]:bg-green"
                id={id}
                style={{ '-webkit-tap-highlight-color': 'rgba(0, 0, 0, 0)' }}
            >
                <RadixSwitch.Thumb className="block size-[21px] translate-x-0.5 rounded-full bg-dark dark:bg-light transition-transform duration-100 will-change-transform data-[state=checked]:bg-white data-[state=checked]:translate-x-[19px]" />
            </RadixSwitch.Root>
        </form>
    )
}

export default Switch
