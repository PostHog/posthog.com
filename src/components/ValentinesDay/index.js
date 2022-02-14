import { CallToAction } from 'components/CallToAction'
import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'

export default function ValentinesDay() {
    return (
        <section className="px-2 md:px-5 dark relative">
            <div className="text-center bg-primary rounded-lg flex justify-center items-center px-5 py-10 sm:py-[10%]">
                <div className="max-w-[1020px] mx-auto">
                    <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[92px] text-white mb-8">
                        Share the l
                        <svg
                            className="inline-block mx-1 heart-pulse w-full max-w-[25px] sm:max-w-[32px] md:max-w-[40px] lg:max-w-[56px] h-auto"
                            width="56"
                            height="50"
                            viewBox="0 0 56 50"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M5.8283 27.0098C2.28143 24.248 0 19.9373 0 15.0937C0 6.75769 6.75769 0 15.0937 0C20.5627 0 25.3523 2.90863 28 7.26335C30.6477 2.90863 35.4373 0 40.9063 0C49.2423 0 56 6.75769 56 15.0937C56 19.6295 53.9993 23.6981 50.8321 26.4649L29.5053 48.9445C28.6879 49.8061 27.3145 49.8039 26.4999 48.9397L5.8283 27.0098Z"
                                fill="#F54E00"
                            />
                        </svg>
                        ve
                    </h1>
                    <h2 className="text-lg md:text-xl lg:text-[30px] text-white leading-tight mb-1">
                        Fall in <span className="text-red">love</span> with open source projects this Valentine's Day.
                    </h2>
                    <p className="text-white mb-9 text-base lg:text-[18px] mt-0 text-opacity-75">
                        For every star our GitHub repo gets, we'll donate $5 to open source projects - up to $50,000.
                    </p>
                    <div className="flex flex-col space-y-4 justify-center items-center">
                        <CallToAction
                            event="valentines day - Find out more"
                            type="outline"
                            className="!w-64"
                            to="/blog/send-love-to-open-source"
                        >
                            Find out more
                        </CallToAction>
                        <CallToAction
                            event="valentines day - Give a star"
                            to="https://github.com/PostHog/posthog"
                            className="!bg-red !border-red !w-64"
                        >
                            Give a star
                        </CallToAction>
                    </div>
                </div>
            </div>
            <div className="absolute left-2 bottom-[-5vw] w-[30vw]">
                <div className="absolute transform translate-y-[-69%] right-[13%]">
                    <svg
                        className="w-[14vw] md:w-auto hidden sm:block"
                        width="106"
                        height="100"
                        viewBox="0 0 106 100"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            style={{ animationDelay: '.5s' }}
                            className="heart-fade"
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M18.8424 88.9494C19.3294 87.5238 19.2214 85.9032 18.4089 84.4961C16.9158 81.91 13.609 81.0239 11.0229 82.517C9.32625 83.4965 8.36133 85.2568 8.31992 87.082C6.71853 86.2053 4.71166 86.1608 3.01501 87.1403C0.428912 88.6334 -0.457152 91.9403 1.03593 94.5264C1.90351 96.0291 3.38347 96.9578 4.97858 97.1792L13.9749 99.8768C15.1124 100.218 16.3029 99.5332 16.58 98.3783L18.8424 88.9494Z"
                            fill="#F54E00"
                        />
                        <path
                            style={{ animationDelay: '1s' }}
                            className="heart-fade delay-300"
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M35.5099 8.1359C35.9969 6.71026 35.8889 5.08969 35.0765 3.68252C33.5834 1.09642 30.2765 0.210354 27.6904 1.70344C25.9938 2.683 25.0289 4.44324 24.9875 6.26846C23.3861 5.39172 21.3792 5.34725 19.6826 6.32681C17.0965 7.81989 16.2104 11.1267 17.7035 13.7128C18.5711 15.2155 20.051 16.1442 21.6461 16.3657L30.6424 19.0633C31.78 19.4044 32.9705 18.7196 33.2476 17.5648L35.5099 8.1359Z"
                            fill="#F54E00"
                        />
                        <path
                            className="heart-fade delay-500"
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M90.2797 54.2988C89.4644 53.2206 89.1372 51.7909 89.5142 50.384C90.1629 47.9628 92.6517 46.5259 95.0729 47.1747C96.6614 47.6003 97.8261 48.8179 98.2563 50.2888C99.3642 49.23 100.982 48.758 102.57 49.1836C104.991 49.8324 106.428 52.3211 105.78 54.7423C105.427 56.0598 104.529 57.0858 103.394 57.6429L96.7535 61.7131C95.741 62.3337 94.415 61.9761 93.8518 60.9306L90.2797 54.2988Z"
                            fill="#F54E00"
                        />
                    </svg>
                </div>

                <StaticImage width={560} placeholder="none" loading="eager" src="./images/hogs.png" />
            </div>
        </section>
    )
}
