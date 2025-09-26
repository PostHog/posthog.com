import React from 'react'
import ZoomHover from 'components/ZoomHover'
import Link from 'components/Link'
import CloudinaryImage from 'components/CloudinaryImage'

interface AISlideProps {
    ai: any
    productName: string
}

export default function AISlide({ ai, productName }: AISlideProps) {
    return (
        <div className="h-full p-8 flex flex-col justify-center bg-ai">
            <div className="bg-white/80 backdrop-blur-lg h-full rounded-lg shadow-2xl flex flex-col @2xl:flex-row gap-8 @2xl:gap-12 p-8">
                <aside className="text-center">
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/max_aeaeca84a3.png"
                        alt="Max AI"
                        className="max-w-[469px]"
                    />
                </aside>
                <div className="flex-1 prose">
                    <h2 className="text-5xl font-bold text-primary mb-4">
                        {ai?.title || 'Max does ' + productName.toLowerCase() + '.'}
                    </h2>
                    <p className="text-2xl text-secondary mx-auto">
                        Our{' '}
                        <Link to="/max" className="font-semibold underline" state={{ newWindow: true }}>
                            AI-powered product assistant
                        </Link>{' '}
                        can help you {ai?.description || 'work with ' + productName + ' more efficiently'}.
                    </p>
                    <h3 className="text-2xl mt-4">Skills</h3>
                    <ul>
                        {ai?.skills?.map((skill: string) => (
                            <li key={skill} className="text-xl">
                                {skill}
                            </li>
                        ))}
                    </ul>
                    <h3 className="text-2xl mt-4">Example prompts</h3>
                    <ul>
                        {ai?.prompts?.map((prompt: string) => (
                            <li key={prompt} className="text-xl">
                                "{prompt}"
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}
