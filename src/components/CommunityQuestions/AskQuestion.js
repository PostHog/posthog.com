import { Field } from 'formik'
import React from 'react'
import Button from './Button'
import RichText from './RichText'

export default function AskQuestion({ isValid, loading, setFieldValue, submitForm }) {
    return (
        <>
            <Field
                className="bg-white dark:bg-gray-accent-light dark:text-primary py-2 px-4 text-lg rounded-md w-full shadow-md"
                type="text"
                name="name"
                placeholder="Full name"
            />
            <Field
                className="bg-white dark:bg-gray-accent-light dark:text-primary py-2 px-4 text-lg rounded-md mt-2 w-full shadow-md"
                type="email"
                name="email"
                placeholder="Email"
            />
            <Field
                className="bg-white dark:bg-gray-accent-light dark:text-primary py-2 px-4 text-lg rounded-md mt-2 w-full shadow-md"
                type="text"
                name="subject"
                placeholder="Subject"
            />
            <Field className="mary-chain" type="text" placeholder="Ignore if human" name="mary-chain" />
            <RichText setFieldValue={setFieldValue} />
            <div className="flex items-center justify-between">
                <Button onClick={() => submitForm()} loading={loading} type="submit" disabled={!isValid}>
                    Submit
                </Button>
                <p className="m-0 flex items-center space-x-2">
                    <span className="text-[13px] opacity-30 font-semibold">Supports</span>
                    <svg
                        className="text-black dark:text-gray-accent-light"
                        width="30"
                        height="18"
                        viewBox="0 0 30 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g clipPath="url(#clip0_3781_82340)">
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M2.11791 1.40625C1.72802 1.40625 1.41194 1.72105 1.41194 2.10938V15.8906C1.41194 16.2789 1.72802 16.5938 2.11791 16.5938H27.2505C27.6404 16.5938 27.9565 16.2789 27.9565 15.8906V2.10938C27.9565 1.72105 27.6404 1.40625 27.2505 1.40625H2.11791ZM0 2.10938C0 0.944399 0.948223 0 2.11791 0H27.2505C28.4202 0 29.3684 0.944399 29.3684 2.10938V15.8906C29.3684 17.0556 28.4202 18 27.2505 18H2.11791C0.948223 18 0 17.0556 0 15.8906V2.10938Z"
                                fill="currentColor"
                            />
                            <path
                                d="M4.23584 13.7812V4.21875H7.05973L9.88361 7.73438L12.7075 4.21875H15.5314V13.7812H12.7075V8.29688L9.88361 11.8125L7.05973 8.29688V13.7812H4.23584ZM21.8851 13.7812L17.6493 9.14062H20.4732V4.21875H23.2971V9.14062H26.121L21.8851 13.7812Z"
                                fill="currentColor"
                            />
                        </g>
                        <defs>
                            <clipPath id="clip0_3781_82340">
                                <rect width="29.3684" height="18" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                    <a
                        className="text-black dark:text-white hover:text-black dark:hover:text-white"
                        href="https://www.markdownguide.org/basic-syntax/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g opacity="0.2">
                                <path
                                    d="M5.99988 0.283127C4.48392 0.283127 3.02988 0.885467 1.95732 1.95749C0.885287 3.02999 0.282959 4.48409 0.282959 6.00005C0.282959 7.51601 0.885299 8.97005 1.95732 10.0426C3.02982 11.1146 4.48392 11.717 5.99988 11.717C7.51584 11.717 8.96988 11.1146 10.0424 10.0426C11.1145 8.97011 11.7168 7.51601 11.7168 6.00005C11.7168 4.48409 11.1145 3.03005 10.0424 1.95749C8.96994 0.885455 7.51584 0.283127 5.99988 0.283127ZM5.99988 2.29217C6.19769 2.29217 6.38754 2.37092 6.52769 2.5106C6.66785 2.65076 6.74659 2.8406 6.74612 3.03888C6.74659 3.23669 6.66784 3.42654 6.52769 3.56669C6.38753 3.70638 6.19769 3.78512 5.99988 3.78512C5.80207 3.78512 5.61222 3.70637 5.47207 3.56669C5.33191 3.42653 5.25317 3.23669 5.25363 3.03888C5.25317 2.8406 5.33192 2.65075 5.47207 2.5106C5.61223 2.37091 5.80207 2.29217 5.99988 2.29217ZM5.99988 4.71893C6.39269 4.71893 6.70862 5.03486 6.70862 5.42767V8.99911C6.70862 9.39192 6.39269 9.70786 5.99988 9.70786C5.60707 9.70786 5.29113 9.39192 5.29113 8.99911V5.42767C5.29113 5.03486 5.60707 4.71893 5.99988 4.71893Z"
                                    fill="currentColor"
                                />
                            </g>
                        </svg>
                    </a>
                </p>
            </div>
        </>
    )
}
