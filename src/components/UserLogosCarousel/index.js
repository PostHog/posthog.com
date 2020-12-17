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
        website: 'https://hasura.io/',
    },
    {
        logo: tinkoffLogo,
        name: 'Tinkoff',
        website: 'https://www.tinkoffgroup.com/',
    },
    {
        logo: spacexLogo,
        name: 'SpaceX',
        website: 'https://spacex.com/',
    },
    {
        logo: airbalticLogo,
        name: 'AirBaltic',
        website: 'https://airbaltic.com/',
    },
    {
        logo: ycLogo,
        name: 'YCombinator',
        website: 'https://ycombinator.com/',
    },
    {
        logo: staplesLogo,
        name: 'Staples',
        website: 'https://staples.com/',
    },
    {
        logo: landmarkLogo,
        name: 'Landmark Group',
        website: 'https://landmarkgroup.com/',
    },
    {
        logo: webinyLogo,
        name: 'Webiny',
        website: 'https://webiny.com/',
    },
]

export const UserLogosCarousel = () => {
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
                        <a href={company.website} target="_blank" rel="noreferrer">
                            <img alt="user logo" className="user-logos" src={company.logo} style={{ maxWidth: 200 }} />
                        </a>
                    </div>
                ))}
            </InfiniteCarousel>
        </div>
    )
}
