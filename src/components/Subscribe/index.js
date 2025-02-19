import CloudinaryImage from 'components/CloudinaryImage'
import { Check } from 'components/Icons/Icons'
import { StaticImage } from 'gatsby-plugin-image'
import addToMailchimp from 'gatsby-plugin-mailchimp'
import React, { useState } from 'react'
import GitHubButton from 'react-github-btn'

const Form = () => {
    const [email, setEmail] = useState(null)
    const [subscribed, setSubscribed] = useState(null)
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (email) {
            await addToMailchimp(email)
            setSubscribed(true)
        }
    }
    return subscribed ? (
        <>
            <p className="flex justify-center items-center space-x-1 font-semibold text-[#43AF79] m-0">
                <span className=" w-[24px] h-[24px] bg-[#43AF79] rounded-full flex justify-center items-center">
                    <Check className="w-[12px] h-[12px] text-white" />
                </span>
                <span>You're subscribed!</span>
            </p>
            <h6 className="mt-2 mb-3 text-center">
                Be sure to check us out on <a href="https://github.com/PostHog/posthog">Github.com</a>
            </h6>
            <p className="m-0 flex justify-center items-centertext-white font-semibold">
                <GitHubButton
                    className="text-white hover:text-white"
                    href="https://github.com/posthog/posthog"
                    data-size="large"
                    data-show-count="true"
                    aria-label="Star posthog/posthog on GitHub"
                >
                    Star
                </GitHubButton>
            </p>
        </>
    ) : (
        <>
            <h4>Join our mailing list</h4>
            <form
                className="flex items-end sm:space-x-2 sm:space-y-0 sm:flex-row flex-col space-y-2 m-0"
                onSubmit={handleSubmit}
            >
                <span className="flex-grow w-full">
                    <label htmlFor="email" className="text-lg">
                        Email address
                    </label>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        name="email"
                        className="py-[12px] block px-[13px] text-[15px] rounded-sm border border-gray-accent-light mt-1 w-full"
                        type="email"
                        required
                        placeholder="Email address..."
                    />
                </span>
                <button
                    className="bg-red py-[12px] px-[30px] font-bold border border-red text-white text-[15px] rounded-sm sm:w-auto w-full"
                    type="submit"
                >
                    Subscribe
                </button>
            </form>
        </>
    )
}

export default function Subscribe() {
    return (
        <div className="max-w-[800px] sm:mt-0 mt-12 w-full flex sm:space-x-9 sm:space-y-0 space-y-4 relative bg-white py-9 px-7 border border-gray-accent-light rounded-md sm:flex-row flex-col">
            <div className="w-[233px] sm:mt-0 -mt-24">
                <div className="sm:absolute bottom-0">
                    <CloudinaryImage width={233} src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Subscribe/hog-the-builder.png" />
                </div>
            </div>
            <div className="flex-grow">
                <Form />
            </div>
        </div>
    )
}
