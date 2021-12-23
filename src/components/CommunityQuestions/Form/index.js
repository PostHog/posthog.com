// Render Prop
import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useLocation } from '@reach/router'
import { Check } from 'components/Icons/Icons'
import emailSaved from '../email-saved.svg'
import GitHubButton from 'react-github-btn'

const Question = () => {
    const location = useLocation()
    const [timestamp, setTimestamp] = useState(null)
    const [emailSubmitted, setEmailSubmitted] = useState(false)
    const [subscribed, setSubscribed] = useState(false)

    const handleSubscribe = () => {
        setSubscribed(true)
    }

    return (
        <div className="flex items-start space-x-4">
            <div className="bg-gray-accent-light rounded-full w-[40px] h-[40px] overflow-hidden">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M20.0782 41.0392H5.42978C4.03134 41.0392 3.1173 40.1642 3.09386 38.7736C3.07823 37.7814 3.07042 36.797 3.10948 35.8048C3.15636 34.6329 3.72668 33.7345 4.74228 33.1798C8.0782 31.3595 11.4299 29.5783 14.7659 27.7658C15.0081 27.633 15.1565 27.758 15.3362 27.8517C18.1878 29.3439 21.0942 29.4689 24.0626 28.2267C24.1485 28.1955 24.2423 28.1721 24.3126 28.1096C24.9298 27.5861 25.4845 27.7971 26.1251 28.1486C29.1173 29.7971 32.1331 31.4143 35.1487 33.0238C36.4534 33.7191 37.094 34.766 37.0706 36.2426C37.0549 37.0785 37.0706 37.9067 37.0706 38.7426C37.0628 40.1254 36.1409 41.0395 34.7659 41.0395H20.0783L20.0782 41.0392Z"
                        fill="#BFBFBC"
                    />
                    <path
                        d="M19.8359 27.0625C17.0859 26.9687 14.8047 25.6094 13.1251 23.1953C10.3751 19.2344 10.7032 13.6093 13.8516 10.0001C17.2735 6.08599 22.9452 6.10943 26.336 10.0469C29.9376 14.2345 29.711 20.8437 25.8126 24.6405C24.2188 26.1952 22.3126 27.0312 19.8362 27.0624L19.8359 27.0625Z"
                        fill="#BFBFBC"
                    />
                </svg>
            </div>
            <div className="w-full max-w-[405px]">
                <Formik
                    validateOnMount
                    initialValues={{ name: '', question: '' }}
                    validate={(values) => {
                        const errors = {}
                        if (!values.name) {
                            errors.name = 'Required'
                        }
                        if (!values.question) {
                            errors.question = 'Required'
                        }
                        return errors
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        const body = JSON.stringify({ ...values, url: location.href })
                        fetch('/.netlify/functions/ask-a-question', { method: 'POST', body })
                            .then((res) => res.json())
                            .then((data) => {
                                setTimestamp(data.timestamp)
                            })
                    }}
                >
                    {({ isSubmitting, isValid, values }) => {
                        return !timestamp ? (
                            <Form className="grid">
                                <Field
                                    className="bg-gray-accent-light py-2 px-4 text-base rounded-md w-full"
                                    type="text"
                                    name="name"
                                    placeholder="Full name"
                                />
                                <Field
                                    className="bg-gray-accent-light py-2 px-4 text-base rounded-md mt-2 mb-3 w-full"
                                    type="text"
                                    name="question"
                                    as="textarea"
                                    placeholder="Type your question..."
                                />
                                <button
                                    className={`w-full text-base font-bold py-3 px-5 border-2 rounded-full ${
                                        !isValid ? 'border-gray-accent-light text-gray' : 'bg-red text-white border-red'
                                    }`}
                                    type="submit"
                                    disabled={!isValid}
                                >
                                    Submit
                                </button>
                            </Form>
                        ) : (
                            <div>
                                <p className="mb-0">{values.question}</p>
                                <p className="text-[14px] font-semibold opacity-50">by {values.name}</p>
                                <p className="flex items-center space-x-1 font-semibold text-[#43AF79]">
                                    <span className=" w-[24px] h-[24px] bg-[#43AF79] rounded-full flex justify-center items-center">
                                        <Check className="w-[12px] h-[12px] text-white" />
                                    </span>
                                    <span>Question sent. Answer will be posted here.</span>
                                </p>
                                <div className="p-6 bg-white rounded-[10px]">
                                    {emailSubmitted ? (
                                        <div className="text-center">
                                            {subscribed ? (
                                                <>
                                                    <p className="flex justify-center items-center space-x-1 font-semibold text-[#43AF79] m-0">
                                                        <span className=" w-[24px] h-[24px] bg-[#43AF79] rounded-full flex justify-center items-center">
                                                            <Check className="w-[12px] h-[12px] text-white" />
                                                        </span>
                                                        <span>You're subscribed!</span>
                                                    </p>
                                                    <h6 className="mt-2 mb-3">
                                                        Be sure to check us out on{' '}
                                                        <a href="https://github.com/PostHog/posthog">Github.com</a>
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
                                                    <div className="bg-tan p-4 rounded-sm mb-4">
                                                        <h6 className="m-0">We’ll email you.</h6>
                                                        <p className="text-[14px] opacity-50 m-0">
                                                            We typically answer in 1-2 days.
                                                        </p>
                                                        <img className="mx-auto mt-2" src={emailSaved} />
                                                    </div>
                                                    <p className="text-[14px] opacity-50 m-0">While we have you...</p>
                                                    <h6 className="m-0">Care to receive our email updates?</h6>
                                                    <button
                                                        onClick={handleSubscribe}
                                                        className={`w-full mt-3 text-base font-bold py-2 px-5 border-2 rounded-full bg-red text-white border-red`}
                                                    >
                                                        Sure, subscribe me to the newsletter!
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    ) : (
                                        <>
                                            <h4 className="text-[20px] m-0">Get your answer by email</h4>
                                            <p>No need to constantly refresh this page for updates!</p>
                                            <Formik
                                                validateOnMount
                                                initialValues={{ email: '', ...values }}
                                                validate={(values) => {
                                                    const errors = {}
                                                    if (!values.email) {
                                                        errors.name = 'Required'
                                                    }
                                                    return errors
                                                }}
                                                onSubmit={(values, { setSubmitting }) => {
                                                    const body = JSON.stringify({
                                                        ...values,
                                                        url: location.href,
                                                        timestamp,
                                                    })
                                                    console.log(timestamp)
                                                    fetch('/.netlify/functions/ask-a-question', {
                                                        method: 'POST',
                                                        body,
                                                    })
                                                        .then((res) => res.json())
                                                        .then((data) => {
                                                            setEmailSubmitted(true)
                                                        })
                                                }}
                                            >
                                                {({ isSubmitting, isValid, values }) => {
                                                    return (
                                                        <Form className="grid m-0">
                                                            <Field
                                                                className="bg-gray-accent-light py-2 px-4 text-base rounded-md w-full"
                                                                type="email"
                                                                name="email"
                                                                placeholder="Email"
                                                            />
                                                            <button
                                                                className={`w-full my-3 text-base font-bold py-3 px-5 border-2 rounded-full ${
                                                                    !isValid
                                                                        ? 'border-gray-accent-light text-gray'
                                                                        : 'bg-red text-white border-red'
                                                                }`}
                                                                type="submit"
                                                                disabled={!isValid}
                                                            >
                                                                Send email updates
                                                            </button>
                                                        </Form>
                                                    )
                                                }}
                                            </Formik>
                                            <p className="text-[14px] opacity-50 text-center m-0">
                                                We’ll only email you when an answer is posted. We don’t share emails,
                                                and if you use Gravatar, we’ll include your photo next to your question.
                                            </p>
                                        </>
                                    )}
                                </div>
                            </div>
                        )
                    }}
                </Formik>
            </div>
        </div>
    )
}

export default Question
