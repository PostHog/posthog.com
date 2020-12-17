import React from 'react'
import InfiniteCarousel from 'react-leaf-carousel'
import hasuraLogo from '../../images/user-logos/hasura.svg'
import spacexLogo from '../../images/user-logos/spacex.svg'
import tinkoffLogo from '../../images/user-logos/tinkoff.svg'
import airbalticLogo from '../../images/user-logos/airbaltic.svg'
import ycLogo from '../../images/user-logos/yc.svg'
import landmarkLogo from '../../images/user-logos/landmark.svg'
import staplesLogo from '../../images/user-logos/staples.svg'
import webinyLogo from '../../images/user-logos/webiny.svg'
import './style.scss'

const companies = [
    {
        logo: hasuraLogo,
        name: 'Hasura',
    },
    {
        logo: tinkoffLogo,
        name: 'Tinkoff',
    },
    {
        logo: spacexLogo,
        name: 'SpaceX',
    },
    {
        logo: airbalticLogo,
        name: 'AirBaltic',
    },
    {
        logo: ycLogo,
        name: 'YCombinator',
    },
    {
        logo: staplesLogo,
        name: 'Staples',
    },
    {
        logo: landmarkLogo,
        name: 'Landmark Group',
    },
    {
        logo: webinyLogo,
        name: 'Webiny',
    },
]

const UserLogosCarousel = () => {
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
                {companies.map((company) => (
                    <div key={company.name.toLowerCase()}>
                        <img alt="user logo" className="user-logos" src={company.logo} style={{ maxWidth: 200 }} />
                    </div>
                ))}
            </InfiniteCarousel>
        </div>
    )
}

export default UserLogosCarousel
