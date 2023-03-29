import React, { InputHTMLAttributes } from 'react'
import { TrackedCTA } from 'components/CallToAction'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string
    showSubmit?: boolean
    inputFieldClassName?: string
}

export const Input = ({ label, showSubmit, inputFieldClassName, ...props }: InputProps): JSX.Element => {
    return (
        <div className={`w-full px-4 py-2`}>
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
                    name={props.name}
                    className={`py-[12px] block px-[13px] text-[15px] rounded-sm border border-gray-accent-light mt-1 flex-grow ${inputFieldClassName}`}
                    type={props.type}
                    required={props.required}
                    placeholder={props.placeholder}
                    {...props}
                />
                {showSubmit && (
                    <TrackedCTA
                        event={{
                            name: 'submit quesiton to max ai',
                        }}
                        size="xs"
                    >
                        Submit
                    </TrackedCTA>
                )}
            </div>
        </div>
    )
}
