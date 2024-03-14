import { Avatar, Question } from 'components/Squeak'
import Button from 'components/Squeak/components/Button'
import RichText from 'components/Squeak/components/RichText'
import getAvatarURL from 'components/Squeak/util/getAvatar'
import transformValues from 'components/Squeak/util/transformValues'
import Toggle from 'components/Toggle'
import { useFormik } from 'formik'
import { useUser } from 'hooks/useUser'
import React, { useEffect, useState } from 'react'
import RoadmapSelect from 'components/RoadmapSelect'
import qs from 'qs'
import TeamSelect from 'components/TeamSelect'

export default function TeamUpdate({
    teamName,
    onSubmit,
    roadmapID,
}: {
    teamName?: string
    onSubmit?: () => void
    roadmapID?: number
}) {
    const [team, setTeam] = useState<any>(null)
    const { getJwt, user } = useUser()
    const [updateCount, setUpdateCount] = useState(0)
    const { handleSubmit, values, setFieldValue, initialValues, submitForm, isSubmitting, resetForm } = useFormik({
        validateOnMount: false,
        initialValues: {
            body: '',
            thingOfTheWeek: false,
            roadmap: !!roadmapID,
            roadmapID,
            images: [],
            impersonate: false,
        },
        onSubmit: async ({ body, thingOfTheWeek, roadmap, roadmapID, images, impersonate }) => {
            if (!team) return
            try {
                const jwt = await getJwt()
                const profileID = user?.profile?.id
                if (!profileID || !jwt) return

                const {
                    data: { id: updateID },
                } = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/team-updates`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${jwt}`,
                    },
                    body: JSON.stringify({
                        data: {
                            thingOfTheWeek,
                            team: {
                                connect: [team.id],
                            },
                            ...(roadmap && roadmapID
                                ? {
                                      roadmap: {
                                          connect: [roadmapID],
                                      },
                                  }
                                : null),
                        },
                    }),
                }).then((res) => res.json())

                const transformedValues = await transformValues({ body, images: images ?? [] }, profileID, jwt)
                await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/questions`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${jwt}`,
                    },
                    body: JSON.stringify({
                        data: {
                            subject: '',
                            body: transformedValues?.body,
                            slugs: [],
                            permalink: '',
                            update: {
                                connect: [updateID],
                            },
                            ...(impersonate
                                ? {
                                      profile: team.attributes.leadProfiles.data[0].id,
                                  }
                                : null),
                        },
                    }),
                }).then((res) => res.json())
                resetForm()
                setUpdateCount(updateCount + 1)
                onSubmit?.()
            } catch (err) {
                console.error(err)
            }
        },
    })

    const fetchTeam = async () => {
        const {
            data: [team],
        } = await fetch(
            `${process.env.GATSBY_SQUEAK_API_HOST}/api/teams?${qs.stringify(
                {
                    filters: {
                        name: {
                            $eqi: teamName,
                        },
                    },
                },
                { encodeValuesOnly: true }
            )}`
        ).then((res) => res.json())
        setTeam(team)
    }

    useEffect(() => {
        if (teamName) {
            fetchTeam()
        }
    })

    return user?.role?.type === 'moderator' ? (
        <form onSubmit={handleSubmit} className="m-0">
            <Avatar className="w-[40px] mr-[10px]" image={getAvatarURL(user?.profile)} />
            <div className="ml-[50px]">
                <div className="bg-white dark:bg-accent-dark border border-light dark:border-dark rounded-md overflow-hidden mb-4">
                    {!teamName && (
                        <div className="border-b border-border dark:border-dark">
                            <TeamSelect value={team} onChange={(team) => setTeam(team)} />
                        </div>
                    )}
                    <div className="leading-[0]">
                        <RichText
                            key={updateCount}
                            onSubmit={submitForm}
                            autoFocus
                            setFieldValue={setFieldValue}
                            initialValue={initialValues?.body}
                            values={values}
                        />
                    </div>
                </div>
                <Toggle
                    checked={values.thingOfTheWeek}
                    onChange={(checked) => setFieldValue('thingOfTheWeek', checked)}
                    label="Thing of the week"
                />
                {team && (
                    <>
                        <div className="my-4">
                            <Toggle
                                checked={values.impersonate}
                                onChange={(checked) => setFieldValue('impersonate', checked)}
                                label="Post as team lead"
                            />
                        </div>
                        {!roadmapID && (
                            <>
                                <Toggle
                                    checked={values.roadmap}
                                    onChange={(checked) => setFieldValue('roadmap', checked)}
                                    label="This is connected to a roadmap item"
                                />
                                {values.roadmap && (
                                    <div className="border border-border dark:border-dark rounded-md mt-4">
                                        <RoadmapSelect
                                            teamID={team.id}
                                            onChange={(value) => setFieldValue('roadmapID', value)}
                                            value={values.roadmapID}
                                        />
                                    </div>
                                )}
                            </>
                        )}
                    </>
                )}
            </div>
            <span className="ml-[50px] mt-6 inline-block">
                <Button loading={isSubmitting} disabled={isSubmitting} type="submit" className="w-[calc(100%_-_50px)]">
                    Post update
                </Button>
            </span>
        </form>
    ) : null
}
