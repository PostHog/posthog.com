import CloudinaryImage from 'components/CloudinaryImage'
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
    const [hogData, setHogData] = React.useState<(any | null)[]>([null, null, null, null])

    React.useEffect(() => {
        const hogFiles = [
            'about_hog_1_1731825e07.json',
            'about_hog_2_099aab2326.json',
            'about_hog_3_60946cdf0a.json',
            'about_hog_4_d76ef8db00.json'
        ];

        const loadHogData = async () => {
            const newHogData = await Promise.all(
                hogFiles.map(async (file) => {
                    try {
                        const response = await fetch(`https://res.cloudinary.com/dmukukwp6/raw/upload/${file}`);
                        if (!response.ok) {
                            throw new Error(`HTTP error! status: ${response.status}`);
                        }
                        return await response.json();
                    } catch (error) {
                        console.error(`Failed to load ${file}:`, error);
                        return null;
                    }
                })
            );
            setHogData(newHogData);
        };

        loadHogData();
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
                        We've grown into a product &amp; data toolkit, used by 70,000+ teams.
                    </p>
                </h3>
            </header>
            <div className="flex flex-col md:flex-row justify-center items-center max-w-screen-xl mx-auto gap-4 md:gap-16 px-4 md:px-8 pb-12">
                <div className="flex justify-between items-center">
                    <div className="">
                        <LazyHog
                            data={hogData[0]}
                            placeholder={
                                <CloudinaryImage src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/images/about-hog-1.svg" alt="Hog" placeholder="blurred" />
                            }
                        />
                    </div>
                    <div className="">
                        <LazyHog
                            data={hogData[1]}
                            placeholder={
                                <CloudinaryImage src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/images/about-hog-2.svg" alt="Hog" placeholder="blurred" />
                            }
                        />
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <div className="">
                        <LazyHog
                            data={hogData[2]}
                            placeholder={
                                <CloudinaryImage src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/images/about-hog-3.svg" alt="Hog" placeholder="blurred" />
                            }
                        />
                    </div>
                    <div className="">
                        <LazyHog
                            data={hogData[3]}
                            placeholder={
                                <CloudinaryImage src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/images/about-hog-4.svg" alt="Hog" placeholder="blurred" />
                            }
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
