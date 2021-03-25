import React from 'react'

import remoteIcon from './images/remote.png'
import transparencyIcon from './images/transparency.png'
import communicationIcon from './images/communication.png'
import diversityIcon from './images/diversity.png'
import positionSkillsImg from './images/position-skills.svg'

const CultureValue = ({
    title,
    icon,
    children,
    className = '',
}: {
    title: string
    icon: string
    children: any
    className?: string
}) => {
    const classList = ['flex', className].join(' ')
    return (
        <div className={classList}>
            <img src={icon} alt={title} className="mx-auto h-24 w-24 md:mx-0 md:mr-6" />
            <div className="w-full md:mx-0">
                <h4 className="mb-2 text-lg">{title}</h4>
                <div className="opacity-80">{children}</div>
            </div>
        </div>
    )
}

export const Culture = () => {
    return (
        <div className="careers-culture pt-24 text-white text-left">
            <div className="w-11/12 max-w-xl mx-auto">
                <h2 className="text-center mb-8">Our culture</h2>

                <CultureValue title="All Remote" icon={remoteIcon}>
                    <p>We are fully-remote and hire anywhere in the world.</p>
                    <p>
                        If you are on planet earth, please consider applying. We are unfortunately not able to accept
                        candidates from other planets or galaxies at this time.
                    </p>
                </CultureValue>

                <CultureValue title="Transparency" icon={transparencyIcon} className="mt-8">
                    <p>We build an open source product, and try to be as transparent as possible about our company.</p>
                    <p>
                        Our roadmap, employee handbook, salary calculator, investor emails, and most communication are
                        public on GitHub.
                    </p>
                </CultureValue>

                <CultureValue title="Written communication" icon={communicationIcon} className="mt-8">
                    <p>
                        Being fully-remote, it’s critical we practice clear communication so we stay connected and work
                        efficiently.
                    </p>
                    <p>
                        Collaborating through public GitHub issues and pull requests helps us clarify our ideas and
                        allows others to provide feedback, both key to our development and growth.
                    </p>
                </CultureValue>

                <CultureValue title="Diversity" icon={diversityIcon} className="mt-8">
                    <p>Being fully remote means we're able to create a team that is truly diverse.</p>
                    <p>
                        We value diversity and believe it’s important to acknowledge and appreciate each other's
                        differences.
                    </p>
                </CultureValue>
            </div>
            <div className="mt-12">
                <img src={positionSkillsImg} className="max-w-3xl mx-auto mb-0" />
            </div>
        </div>
    )
}
