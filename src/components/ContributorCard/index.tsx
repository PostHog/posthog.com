import React from 'react'
import { Card, Col, Progress, Tag } from 'antd'
import { ContributorImage } from './ContributorImage'
import { Link } from 'gatsby'
import './style.scss'

interface ContributorCardStructureMeta {
    name: string
    description: string
    imageSrc: string
}

interface ContributorCardMeta extends ContributorCardStructureMeta {
    link: string
    onClick?: () => void | undefined
}

const ContributorCardStructure = ({ name, description, imageSrc }: ContributorCardStructureMeta) => {
    return (
        <Col sm={12} md={12} lg={8} xl={6} style={{ marginBottom: 20 }}>
            <Card
                style={{ height: 450, display: 'flex', marginBottom: 20 }}
                bodyStyle={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}
                className="card-elevated"
            >

                <img src='https://avatars.githubusercontent.com/u/38760734?s=460&u=52654307ff8d81226bf858fb3b3ced474ee6c88c&v=4' style={{ maxWidth: 60, maxHeight: 60, marginBottom: 0, borderRadius: 10 }} className='center' alt='contributor image' />

                <br />

                <h5 className='centered' style={{ color: '#fff' }}>{name}</h5>
                <p style={{     color: 'rgb(231 184 250)', marginBottom: 5 }}>lvl 3</p>
                <Progress
                    strokeColor={{
                        '0%': '#220f3f',
                        '100%': '#ab75ff',
                    }}
                    percent={40}
                    className='progress-bar'
                    showInfo={false}
                />
                <p style={{ color: 'rgb(231 184 250)', fontSize: 20, marginTop: 30 }}>Powers</p>
                <h2>
                🐛 🔌 💻
                </h2>
            </Card>
        </Col>
    )
}

export const ContributorCard = ({ name, description, link, imageSrc, onClick }: ContributorCardMeta) => {
    const ContributorDetails = () => (
        <ContributorCardStructure
            name={name}
            description={description}
            imageSrc={imageSrc}
        />
    )

    return (
        <div className='contributor-card-wrapper'>
            {onClick ? (
                <span onClick={onClick}>
                    <ContributorDetails />
                </span>
            ) : link.includes('.') ? (
                <a href={link}>
                    <ContributorDetails />
                </a>
            ) : (
                <Link to={link}>
                    <ContributorDetails />
                </Link>
            )}
        </div>
    )
}
