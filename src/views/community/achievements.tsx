import { IconCheck } from '@posthog/icons'
import CloudinaryImage from 'components/CloudinaryImage'
import Link from 'components/Link'
import ScrollArea from 'components/RadixUI/ScrollArea'
import SEO from 'components/seo'
import { useUser } from 'hooks/useUser'
import React from 'react'
import achievementsJson from '@data/roadmap-achievements.json'
import type { AchievementGroupItem, AchievementItem, Achievements } from '~/data-layer/queries/roadmap'

const allAchievements = achievementsJson as Achievements

const TransactionTitle = ({ type, metadata }) => {
    return (
        <>
            <p className="text-sm capitalize m-0 font-bold">{type.replace(/_/g, ' ').toLowerCase()}</p>
            {metadata?.achievement?.title && (
                <p className="text-sm text-primary dark:text-primary-dark m-0 mb-0.5">{metadata.achievement.title}</p>
            )}
        </>
    )
}

// The profile type does not declare `achievements`, which Strapi populates for this page.
type Profile = ({ achievements?: { achievement?: { id: number } | null }[] } & Record<string, unknown>) | undefined

const profileHasAchievement = (profile: Profile, achievement: { id: number }) => {
    return profile?.achievements?.some((profileAchievement) => profileAchievement.achievement?.id === achievement.id)
}

const AchievementRow = ({
    achievement,
    badge,
    achieved,
    showCheck = true,
}: {
    achievement: Omit<AchievementItem, 'id' | 'points'> & { points?: number | null }
    badge?: string
    achieved?: boolean
    showCheck?: boolean
}) => {
    return (
        <div className="flex items-end justify-between w-full">
            <span className="flex space-x-1">
                <div className="flex-shrink-0">
                    <CloudinaryImage
                        width={32}
                        height={32}
                        src={achievement.iconUrl as `https://res.cloudinary.com/${string}`}
                    />
                </div>
                <span>
                    <h4 className="m-0 text-base leading-tight flex space-x-1 items-center">
                        <span className={`${achieved ? 'line-through' : ''}`}>{achievement.title}</span>
                        {badge && (
                            <span
                                className={`${
                                    achieved ? 'line-through' : ''
                                } text-xs bg-accent rounded-md px-1 border border-primary`}
                            >
                                {badge}
                            </span>
                        )}
                    </h4>
                    <p className="m-0 text-sm">{achievement.description}</p>
                </span>
            </span>
            <p className="text-sm text-secondary m-0 flex space-x-1 items-center">
                {achieved && showCheck && <IconCheck className="size-3 text-green" />}
                {achievement.points && (
                    <span className={achieved ? 'text-green font-semibold' : ''}>
                        {achievement.points} point{achievement.points === 1 ? '' : 's'}
                    </span>
                )}
            </p>
        </div>
    )
}

const AchievementGroupRow = ({
    achievementGroup,
    profile,
}: {
    achievementGroup: AchievementGroupItem
    profile: Profile
}) => {
    const groupHasIcon = !!achievementGroup.iconUrl
    const tiered = achievementGroup.tiered
    const achievements = groupHasIcon ? achievementGroup.achievements : achievementGroup.achievements.slice(1)
    const allAchieved = achievementGroup.achievements.every((a) => profileHasAchievement(profile, a))
    return (
        <div className="text-left w-full">
            {groupHasIcon ? (
                <AchievementRow
                    achievement={{
                        title: achievementGroup.title,
                        description: achievementGroup.description,
                        iconUrl: achievementGroup.iconUrl,
                    }}
                    achieved={allAchieved}
                    showCheck={false}
                />
            ) : (
                <AchievementRow
                    achievement={achievementGroup.achievements[0]}
                    badge={tiered ? 'Level 1' : undefined}
                    achieved={profileHasAchievement(profile, achievementGroup.achievements[0])}
                />
            )}
            <ul className="m-0 p-0 list-none mt-2 ml-[16px]">
                {achievements.map((achievement, index) => (
                    <li
                        key={achievement.id}
                        className="mt-2 border-l border-primary relative pl-[16px] before:content-[''] before:absolute before:left-[-1px] before:-top-4 before:w-[32px] before:border-l before:h-[calc(50%+1rem)] before:border-b before:border-primary before:rounded-bl-md last:border-l-0 last:before:left-0"
                    >
                        <div className="relative">
                            <AchievementRow
                                achievement={achievement}
                                badge={tiered ? `Level ${groupHasIcon ? index + 1 : index + 2}` : undefined}
                                achieved={profileHasAchievement(profile, achievement)}
                            />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

const Points = () => {
    const { user } = useUser()
    const profile = user?.profile
    return (
        <div>
            <div className="p-4">
                <p className="text-sm text-secondary m-0">
                    Earn achievements by contributing to{' '}
                    <Link to="/questions" className="font-bold text-red dark:text-yellow" state={{ newWindow: true }}>
                        discussions
                    </Link>
                    , helping others, and achieving milestones in the PostHog community.
                </p>

                <ul className="m-0 p-0 list-none mt-4">
                    {allAchievements.map((achievement) => {
                        return (
                            <li
                                className="flex mt-2 pt-2 border-t border-primary first:mt-0 first:pt-0 first:border-t-0"
                                key={achievement.id}
                            >
                                {'achievements' in achievement ? (
                                    <AchievementGroupRow achievementGroup={achievement} profile={profile} />
                                ) : (
                                    <AchievementRow
                                        achievement={achievement}
                                        achieved={profileHasAchievement(profile, achievement)}
                                    />
                                )}
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default function Achievements() {
    return (
        <div data-scheme="secondary" className="h-full bg-primary text-primary">
            <SEO title={`Achievements - PostHog`} />
            <ScrollArea>
                <Points />
            </ScrollArea>
        </div>
    )
}
