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

export default function TeamUpdate({ teamName, onSubmit }: { teamName?: string; onSubmit?: () => void }) {
    const [teamID, setTeamID] = useState<number | null>(null)
    const { getJwt, user } = useUser()
    const [updateCount, setUpdateCount] = useState(0)
    const { handleSubmit, values, setFieldValue, initialValues, submitForm, isSubmitting, resetForm } = useFormik({
        validateOnMount: false,
        initialValues: {
            body: '',
            thingOfTheWeek: false,
            roadmap: false,
            roadmapID: null,
            images: [],
        },
        onSubmit: async ({ body, thingOfTheWeek, roadmap, roadmapID, images }) => {
            if (!teamID) return
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
                                connect: [teamID],
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
            data: [{ id: teamID }],
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
        setTeamID(teamID)
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
                            <TeamSelect value={teamID} onChange={(teamID) => setTeamID(teamID)} />
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
                <div className="mt-4 mb-6">
                    <Toggle
                        checked={values.roadmap}
                        onChange={(checked) => setFieldValue('roadmap', checked)}
                        label="This is connected to a roadmap item"
                    />
                    {values.roadmap && teamID && (
                        <div className="border border-border dark:border-dark rounded-md mt-4">
                            <RoadmapSelect
                                onChange={(value) => setFieldValue('roadmapID', value)}
                                value={values.roadmapID}
                            />
                        </div>
                    )}
                </div>
            </div>
            <span className="ml-[50px]">
                <Button loading={isSubmitting} disabled={isSubmitting} type="submit" className="w-[calc(100%_-_50px)]">
                    Post update
                </Button>
            </span>
        </form>
    ) : null
}
