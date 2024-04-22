import React, { useState } from 'react'
import { cn } from '../../utils'

type BackInStockFormProps = {
    className?: string
}

const validateEmail = (email: string) => {
    const re =
        // eslint-disable-next-line no-useless-escape
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email)
}

export function BackInStockForm(props: BackInStockFormProps): React.ReactElement {
    const { className } = props
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState('')
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false)

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSubmitting(true)

        setTimeout(() => {
            if (!validateEmail(email)) {
                setEmailError('Invalid email format')
                setIsSubmitting(false)
            } else {
                setEmailError('')
                setIsSubmitting(false)
                setIsSubmitted(true)
                // handle form submission logic here
                console.log(`Form submitted with: ${email}`)
            }
        }, 1000)
    }

    const classes = cn('flex gap-4', className)

    if (isSubmitted) {
        return <div>Submitted! Get back to you soon!</div>
    }

    return (
        <>
            <h3>Get notified!</h3>
            <p>Sign up and we'll get back to you as soon as this product is back in stock</p>
            <form className={classes} onSubmit={handleSubmit}>
                <div className="px-4 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue sm:max-w-md">
                    <input
                        type="text"
                        placeholder="Email Address"
                        value={email}
                        onChange={handleEmailChange}
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                </div>

                {emailError && <div style={{ color: 'red' }}>{emailError}</div>}
                <button
                    type="submit"
                    className="flex-shrink-0 rounded-md bg-blue px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
                >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
            </form>
        </>
    )
}
