import { button, CallToAction } from 'components/CallToAction'
import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'

export default function ChatHog() {
    const handleClick = () => {
        if (typeof window !== 'undefined') {
            document.body.style.paddingRight = '400px'
            window.$unthread('toggleBubble', 'hide')
            window.$unthread('toggle', 'show')
        }
    }
    return (
        <div className="fixed bottom-0 right-2 text-left">
            <div className="bg-white p-4 rounded-md shadow-lg max-w-[250px] mb-4">
                <h3 className="m-0 text-lg">Pricing questions?</h3>
                <p className="m-0 text-sm mb-2">Our customer success hedgehogs are ready to help.</p>
                <button
                    onClick={handleClick}
                    style={{ border: '1px solid #E5E7E0' }}
                    className={button('secondary', 'full', 'shadow-none text-red', 'xs')}
                >
                    Ask a question
                </button>
                <svg
                    style={{ transform: 'translate(70%, 16px)', left: '50%' }}
                    className="absolute"
                    width="18"
                    height="12"
                    viewBox="0 0 18 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M18 0H0L18 12V0Z" fill="white" />
                </svg>
            </div>
            <div className="text-right">
                <StaticImage
                    placeholder="none"
                    loading="eager"
                    alt="Chat hog"
                    src="./images/chat-hog.png"
                    width={150}
                    className=" -scale-x-1"
                />
            </div>
        </div>
    )
}
