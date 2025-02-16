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
import * as Yup from 'yup'

const ValidationSchema = Yup.object().shape({
    team: Yup.mixed().required('Please select a team'),
})

export default function TeamUpdate({
    teamName,
    onSubmit,
    roadmapID,
    hideTeamSelect,
}: {
    teamName?: string
    onSubmit?: () => void
    roadmapID?: number
    hideTeamSelect?: boolean
}) {
    const { getJwt, user } = useUser()
    const [updateCount, setUpdateCount] = useState(0)
    const { handleSubmit, values, setFieldValue, initialValues, submitForm, isSubmitting, resetForm, errors } =
        useFormik({
            validationSchema: ValidationSchema,
            validateOnBlur: false,
            validateOnChange: false,
            validateOnMount: false,
            initialValues: {
                body: '',
                thingOfTheWeek: false,
                roadmap: !!roadmapID,
                roadmapID,
                images: [],
                impersonate: false,
                team: null,
            },
            onSubmit: async ({ body, thingOfTheWeek, roadmap, roadmapID, images, impersonate, team }) => {
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
                    populate: ['profiles', 'leadProfiles'],
                    filters: {
                        name: {
                            $eqi: teamName,
                        },
                    },
                },
                { encodeValuesOnly: true }
            )}`
        ).then((res) => res.json())
        setFieldValue('team', team)
    }

    useEffect(() => {
        if (teamName) {
            fetchTeam()
        }
    }, [])

    return user?.role?.type === 'moderator' ? (
        <form onSubmit={handleSubmit} className="m-0 mt-4">
            <Avatar className="w-[40px] mr-[10px]" image={getAvatarURL(user?.profile)} />
            <div className="ml-[50px]">
                <div className="bg-white dark:bg-accent-dark border border-light dark:border-dark rounded-md overflow-hidden mb-4">
                    {!hideTeamSelect && (
                        <div className="border-b border-border dark:border-dark">
                            <TeamSelect value={values.team} onChange={(team) => setFieldValue('team', team)} />
                        </div>
                    )}
                    <div className="leading-[0]">
                        <RichText
                            key={updateCount}
                            onSubmit={submitForm}
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
                    tooltip="Toggle this ON if you want this update to appear in the TOTW (Thing of the Week) page at /team-updates"
                />
                {values.team && (
                    <>
                        <div className="my-4">
                            <Toggle
                                checked={values.impersonate}
                                onChange={(checked) => setFieldValue('impersonate', checked)}
                                label="Post as team lead"
                                tooltip="Attribute this update to the team lead"
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
                                            teamID={values.team.id}
                                            onChange={(value) => setFieldValue('roadmapID', value)}
                                            value={values.roadmapID}
                                        />
                                    </div>
                                )}
                            </>
                        )}
                    </>
                )}
                {errors.team && <p className="text-red mt-6 font-bold mb-0">{errors.team}</p>}
            </div>
            <span className="ml-[50px] mt-6 inline-block">
                <Button loading={isSubmitting} disabled={isSubmitting} type="submit" className="w-[calc(100%_-_50px)]">
                    Post update
                </Button>
            </span>
        </form>
    ) : null
}
