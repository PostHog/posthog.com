import React from 'react'

import remoteIcon from './images/remote.svg'
import transparencyIcon from './images/transparency.svg'
import communicationIcon from './images/communication.svg'
import diversityIcon from './images/diversity.svg'
import positionSkillsImg from './images/position-skills.svg'

const CultureValue = ({ title, icon, children }: { title: string; icon: string; children: any }) => {
    return (
        <div className="flex">
            <img src={icon} alt={title} className="w-full md:w-1/3 md:mr-2" />
            <div className="w-full md:w-2/3 md:ml-2">
                <h4 className="mb-4">{title}</h4>
                {children}
            </div>
        </div>
    )
}

export const Culture = () => {
    return (
        <div className="mt-12 text-white text-left">
            <div className="w-11/12 max-w-xl mx-auto">
                <h2 className="text-center">Our culture</h2>

                <CultureValue title="All Remote" icon={remoteIcon}>
                    <p>We are fully-remote and hire anywhere in the world.</p>
                    <p>
                        If you are on planet earth, please consider applying. We are unfortunately not able to accept
                        candidates from other planets or galaxies at this time.
                    </p>
                </CultureValue>

                <CultureValue title="Transparency" icon={transparencyIcon}>
                    <p>We build an open source product, and try to be as transparent as possible about our company.</p>
                    <p>
                        Our roadmap, employee handbook, salary calculator, investor emails, and most communication are
                        public on GitHub.
                    </p>
                </CultureValue>

                <CultureValue title="Written communication" icon={communicationIcon}>
                    <p>
                        Being fully-remote, it’s critical we practice clear communication so we stay connected and work
                        efficiently.
                    </p>
                    <p>
                        Collaborating through public GitHub issues and pull requests helps us clarify our ideas and
                        allows others to provide feedback, both key to our development and growth.
                    </p>
                </CultureValue>

                <CultureValue title="Diversity" icon={diversityIcon}>
                    <p>Being fully remote means we're able to create a team that is truly diverse.</p>
                    <p>
                        We value diversity and believe it’s important to acknowledge and appreciate each other's
                        differences.
                    </p>
                </CultureValue>
            </div>
            <div className="mt-12">
                <img src={positionSkillsImg} className="max-w-3xl mx-auto" />
            </div>
        </div>
    )
}
