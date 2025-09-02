import React from 'react'
import './style.scss'

interface TeamVideoProps {
    videoId: string
    title: string
}

export const TeamVideo: React.FC<TeamVideoProps> = ({ videoId, title }) => {
    return (
        <section className="team-video-section">
            <div className="container">
                <div className="video-content">
                    <h2 className="video-title">{title}</h2>
                    <p className="video-subtitle">(some of them are weird, we know)</p>
                    <div className="video-container">
                        <iframe
                            src={`https://www.youtube-nocookie.com/embed/${videoId}`}
                            title={title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="youtube-iframe"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
