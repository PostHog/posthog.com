import React from 'react'

const NewsletterSignup = () => {
    return (
        <div className="w-11/12 max-w-4xl mx-auto mb-24">
            <div className="bg-neon w-full h-full p-2 rounded">
                <div
                    className="rounded flex justify-between flex-col md:flex-row p-8"
                    style={{ backgroundColor: '#222D5B' }}
                >
                    <div className="w-full lg:w-2/3 lg:mr-4">
                        <h5 className="text-white text-3xl gosha">Your inbox but better...</h5>
                        <p className="opacity-80 text-sm">
                            Our newsletter keeps you up to date on what great things we are doing here at PostHog, and
                            trust me you don’t want to miss a thing.
                        </p>
                        <p className="opacity-80 mt-2 text-sm">
                            Plus if you decide that these emails aren’t brightening your day, you can unsuscribe at any
                            time, no hard feelings.
                        </p>
                    </div>

                    <div className="w-full lg:w-1/3 lg:ml-4">
                        <strong className="text-white gosha text-lg">Join our newsletter</strong>

                        <label className="text-white opacity-80 mt-3 block">Email address</label>
                        <input type="email" className="block w-full py-2 px-3 bg-white text-gray-900 rounded mt-1" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewsletterSignup /* Rectangle 996 (Stroke) */
