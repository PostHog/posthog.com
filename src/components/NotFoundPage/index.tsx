import Chip from 'components/Chip'
import React, { useEffect, useState } from 'react'
import usePostHog from '../../hooks/usePostHog'
import { CallToAction } from '../CallToAction'
import Layout from '../Layout'
import Lottie from 'react-lottie'
import { StaticImage } from 'gatsby-plugin-image'
import SearchBox from 'components/Search/SearchBox'

export default function NotFoundPage(): JSX.Element {
    const posthog = usePostHog()
    const [hogData, setHogData] = useState<any | null>(null)
    const [submittedPreference, setSubmittedPreference] = useState(false)

    useEffect(() => {
        fetch('/lotties/pizza-fight.json', {
            headers: {
                'Content-Type': 'application/json',
                'Accept-Encoding': 'gzip, deflate, br',
            },
        })
            .then((res) => res.json())
            .then(setHogData)

        posthog?.capture('page_404')
    }, [])

    const capturePineapplePreference = (userLikesPineappleOnPizzaAkaTheyreCorrect = false) => {
        setSubmittedPreference(true)
        if (posthog) {
            posthog.capture('pineapple_on_pizza_survey', {
                does_pineapple_go_on_pizza: userLikesPineappleOnPizzaAkaTheyreCorrect,
            })
        }
    }

    return (
        <Layout className="not-found-page-container">
            <div className="centered py-12">
                <div className="relative z-10">
                    <h2>Oops, there's nothing here</h2>

                    <p>
                        Think this is a mistake? Email <a href="mailto:hey@posthog.com">hey@posthog.com</a> and we'll
                        fix it!
                    </p>

                    <div className="m-4 pt-8 pb-4 flex flex-col items-center gap-2">
                        <h3>You might have better luck searching.</h3>
                        <SearchBox placeholder="Search..." location="404" />
                        <p className="text-sm max-w-lg mx-auto px-4 pt-2 text-center opacity-75">
                            This searches our docs, API, product manual, tutorials, blog, community questions, and
                            company handbook – <em>and it's actually pretty good!</em>
                        </p>
                    </div>

                    <div className="border-t border-dashed border-gray-accent-light max-w-2xl mx-auto my-8 pt-8">
                        <p>
                            <strong>By the way – while you're here,</strong> we have an important question...
                        </p>

                        <h4>Does pineapple belong on pizza?</h4>

                        <div style={{ paddingBottom: 10 }}>
                            {submittedPreference ? (
                                <p>Thanks for letting us know!</p>
                            ) : (
                                <div className="flex justify-center space-x-2">
                                    <Chip onClick={() => capturePineapplePreference(true)} text="Yes" />
                                    <Chip onClick={() => capturePineapplePreference(false)} text="No" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="-mt-20 sm:-mt-32 max-w-2xl w-full mx-auto relative h-[378px]">
                    <span className="w-full h-[2px] bg-black absolute left-0 bottom-[20%] rounded-md" />
                    {hogData ? (
                        <Lottie
                            options={{
                                loop: true,
                                autoplay: true,
                                animationData: hogData,
                            }}
                        />
                    ) : (
                        <StaticImage src="../../images/pizza-fight.svg" alt="Pizza fight" placeholder="blurred" />
                    )}
                </div>
                <CallToAction type="primary" width="84" to="/">
                    Take me back to the homepage
                </CallToAction>
            </div>
        </Layout>
    )
}
