import React from 'react'
import InfiniteCarousel from 'react-leaf-carousel'
import hasuraLogo from '../../images/user-logos/hasura.png'
import spacexLogo from '../../images/user-logos/spacex.png'
import tinkoffLogo from '../../images/user-logos/tinkoff.png'
import airbalticLogo from '../../images/user-logos/airbaltic.png'
import ycLogo from '../../images/user-logos/yc.png'
import landmarkLogo from '../../images/user-logos/landmark.png'
import staplesLogo from '../../images/user-logos/staples.png'
import webinyLogo from '../../images/user-logos/webiny.png'
import './style.scss'

export const UserLogosCarousel = () => {
    const logos = [hasuraLogo, tinkoffLogo, spacexLogo, airbalticLogo, ycLogo, staplesLogo, landmarkLogo, webinyLogo]
    return (
        <div className="centered logo-carousel-wrapper">
            <InfiniteCarousel
                breakpoints={[
                    {
                        breakpoint: 500,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2,
                        },
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3,
                        },
                    },
                ]}
                dots={false}
                showSides={true}
                sidesOpacity={1}
                sideSize={0.1}
                slidesToScroll={5}
                slidesToShow={5}
                scrollOnDevice={true}
            >
                {logos.map((logo) => (
                    <div key={logo}>
                        <img alt="user logo" src={logo} style={{ maxWidth: 200 }} />
                    </div>
                ))}
            </InfiniteCarousel>
        </div>
    )
}
