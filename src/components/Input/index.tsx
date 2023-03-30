import React, { InputHTMLAttributes } from 'react'
import { TrackedCTA } from 'components/CallToAction'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string
    showSubmit?: boolean
    inputFieldClassName?: string
    onSubmit?: (inputContent: string) => void
}

export const Input = ({ label, showSubmit, inputFieldClassName, onSubmit, ...props }: InputProps): JSX.Element => {
    const inputRef = React.useRef<HTMLInputElement>(null)
    const [inputValue, setInputValue] = React.useState<string>('')
    return (
        <div className={`w-full px-4 py-4`}>
            {label && (
                <label
                    className={`opacity-70 mb-1 inline-block ${props.required ? 'font-bold' : ''}`}
                    htmlFor={props.title}
                >
                    {label}
                </label>
            )}
            <div className="flex w-full gap-x-2">
                <input
                    ref={inputRef}
                    value={inputValue}
                    name={props.name}
                    className={`py-2 block px-3 text-[15px] rounded-sm border border-gray-accent-light flex-grow ${inputFieldClassName}`}
                    type={props.type}
                    required={props.required}
                    placeholder={props.placeholder}
                    onChange={(e) => {
                        setInputValue(e.target.value)
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            onSubmit && onSubmit(inputValue)
                            setInputValue('')
                        }
                    }}
                    {...props}
                />
                {showSubmit && (
                    <TrackedCTA
                        event={{
                            name: 'submit quesiton to max ai',
                        }}
                        size="xs"
                        onClick={() => {
                            onSubmit && onSubmit(inputValue)
                            setInputValue('')
                        }}
                        shadow={false}
                    >
                        Submit
                    </TrackedCTA>
                )}
            </div>
        </div>
    )
}
