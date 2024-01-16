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

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!validateEmail(email)) {
            setEmailError('Invalid email format')
        } else {
            setEmailError('')
            // handle form submission logic here
            console.log(`Form submitted with: ${email}`)
        }
    }

    const classes = cn('', className)

    // TODO add "submitting" & "submitted" states when posting to upcoming endpoint
    return (
        <form className={classes} onSubmit={handleSubmit}>
            <input type="text" placeholder="Email Address" value={email} onChange={handleEmailChange} />
            {emailError && <div style={{ color: 'red' }}>{emailError}</div>}
            <button type="submit">Submit</button>
        </form>
    )
}
