import React from 'react'
interface CallToActionProps {
    backgroundColor?: string
    textColor?: string
    fontSize?: string
    width: string
    value: string
    author: string
    role: string
    img: string
}

export const TeamQuote = ({ backgroundColor, textColor, fontSize, width, value, author, role, img }) => {
    return (
        <div className={`${backgroundColor}`}>
            <blockquote className={`${backgroundColor} ${width} mx-auto px-8 xl:px-0 py-16`}>
                <h4 className={`${textColor} ${fontSize} leading-snug`}>{value}</h4>
                <footer className="flex mt-4">
                    <div className="flex-0 mr-4">{img}</div>
                    <div className="flex-1 flex flex-col justify-center">
                        <h4 className={`${textColor} mb-0 leading-tight`}>{author}</h4>
                        <h4 className={`${textColor} text-opacity-50 mb-0 leading-tight`}>{role}</h4>
                    </div>
                </footer>
            </blockquote>
        </div>
    )
}
