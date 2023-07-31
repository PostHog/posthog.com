import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import Lottie from 'react-lottie'

const LazyHog = ({ data, placeholder }: { data: any; placeholder: React.ReactElement }) => {
    return data ? (
        <Lottie
            options={{
                loop: true,
                autoplay: true,
                animationData: data,
            }}
        />
    ) : (
        placeholder
    )
}

export const AboutHero = () => {
    const [hog1Data, setHog1Data] = React.useState<any | null>(null)
    const [hog2Data, setHog2Data] = React.useState<any | null>(null)
    const [hog3Data, setHog3Data] = React.useState<any | null>(null)
    const [hog4Data, setHog4Data] = React.useState<any | null>(null)

    React.useEffect(() => {
        import('../../../../static/lotties/about-hog-1.json').then((data) => setHog1Data(data.default))
        import('../../../../static/lotties/about-hog-2.json').then((data) => setHog2Data(data.default))
        import('../../../../static/lotties/about-hog-3.json').then((data) => setHog3Data(data.default))
        import('../../../../static/lotties/about-hog-4.json').then((data) => setHog4Data(data.default))
    }, [])

    return (
        <>
            <header id="our-story" className="pt-8 pb-4 md:pb-8 px-4 md:px-12">
                <h1 className="text-4xl md:text-6xl text-center mb-4 leading-none">
                    We're a little hog-wild about <br className="hidden xl:block" />{' '}
                    <span className="text-red">helping you build successful products.</span>
                </h1>
                <h3 className="text-center opacity-60 font-semibold">
                    <p className="pb-0 mb-0 text-xl">
                        PostHog started as open source product analytics. <br className="hidden md:block" />
                        We've grown into a product &amp; data toolkit, used by 10,000+ customers.
                    </p>
                </h3>
            </header>
            <div className="flex flex-col md:flex-row justify-center items-center max-w-screen-xl mx-auto gap-4 md:gap-16 px-4 md:px-8 pb-12">
                <div className="flex justify-between items-center">
                    <div className="">
                        <LazyHog
                            data={hog1Data}
                            placeholder={
                                <StaticImage src="../../../images/about-hog-1.svg" alt="Hog" placeholder="blurred" />
                            }
                        />
                    </div>
                    <div className="">
                        <LazyHog
                            data={hog2Data}
                            placeholder={
                                <StaticImage src="../../../images/about-hog-2.svg" alt="Hog" placeholder="blurred" />
                            }
                        />
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <div className="">
                        <LazyHog
                            data={hog3Data}
                            placeholder={
                                <StaticImage src="../../../images/about-hog-3.svg" alt="Hog" placeholder="blurred" />
                            }
                        />
                    </div>
                    <div className="">
                        <LazyHog
                            data={hog4Data}
                            placeholder={
                                <StaticImage src="../../../images/about-hog-4.svg" alt="Hog" placeholder="blurred" />
                            }
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
