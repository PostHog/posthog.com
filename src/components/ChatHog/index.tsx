import { button } from 'components/CallToAction'
import { StaticImage } from 'gatsby-plugin-image'
import React, { useState } from 'react'
import { ChatWindow } from './ChatWindow'

export default function ChatHog(): JSX.Element {
    const [isChatActive, setIsChatActive] = useState<boolean>(false)
    const handleClick = () => {
        if (typeof window !== 'undefined') {
            setIsChatActive(true)
        }
    }
    return (
        <>
            <div className="fixed bottom-0 right-0 text-left group z-[9999999999]">
                <div
                    className={`p-4 group-hover:block ${
                        isChatActive ? 'block h-screen w-screen md:h-[620px] md:w-[420px]' : 'hidden'
                    }`}
                >
                    {isChatActive ? (
                        <ChatWindow setIsChatActive={setIsChatActive} />
                    ) : (
                        <div className="max-w-[250px] p-4 bg-white rounded-md shadow-lg">
                            <h3 className="m-0 text-lg">Questions about PostHog?</h3>
                            <p className="m-0 text-sm mb-2">Our friendly AI hedgehog Max is here to help!</p>
                            <button
                                onClick={handleClick}
                                style={{ border: '1px solid #E5E7E0' }}
                                className={button(
                                    'outline',
                                    'full',
                                    'shadow-none text-red hover:!text-red hover:!border-black/30 transition-colors',
                                    'xs'
                                )}
                            >
                                Ask a question
                            </button>
                        </div>
                    )}
                    <svg
                        style={{ transform: 'translate(70%)', left: '65%' }}
                        className={`absolute ${isChatActive && 'hidden md:block'}`}
                        width="18"
                        height="12"
                        viewBox="0 0 18 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M18 0H0L18 12V0Z" fill="white" />
                    </svg>
                </div>
                <div className={`text-right ${isChatActive && 'hidden'} md:block mr-2`}>
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
        </>
    )
}
