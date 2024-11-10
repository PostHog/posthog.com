import { button, CallToAction } from 'components/CallToAction'
import { PineappleText } from 'components/Job/Sidebar'
import Layout from 'components/Layout'
import Link from 'components/Link'
import { InProgress } from 'components/Roadmap/InProgress'
import { Question } from 'components/Squeak'
import useTeamUpdates from 'hooks/useTeamUpdates'
import { graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { kebabCase } from 'lib/utils'
import React, { useCallback, useState } from 'react'
import { UnderConsideration } from 'components/Roadmap/UnderConsideration'
import { Change } from '../../templates/Changelog'
import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { SmoothScroll } from 'components/Products/SmoothScroll'
import Tooltip from 'components/Tooltip'
import SEO from 'components/seo'
import SideModal from 'components/Modal/SideModal'
import { Avatar } from 'components/MainNav'
import getAvatarURL from 'components/Squeak/util/getAvatar'
import Markdown from 'markdown-to-jsx'
import { AddTeamMember } from 'components/TeamMembers'
import useTeam from 'hooks/useTeam'
import { IconArrowLeft, IconInfo, IconX } from '@posthog/icons'
import { useUser } from 'hooks/useUser'
import { useFormik } from 'formik'
import TeamUpdate from 'components/TeamUpdate'
import { RenderInClient } from 'components/RenderInClient'
import usePostHog from '../../hooks/usePostHog'
import { companyMenu } from '../navs'
import { PrivateLink } from 'components/PrivateLink'
import Stickers from 'components/ProfileStickers'
import TeamPatch from 'components/TeamPatch'
import CloudinaryImage from 'components/CloudinaryImage'
import AutosizeInput from 'react-input-autosize'
import { useDropzone } from 'react-dropzone'
import ImageDrop from 'components/ImageDrop'
import uploadImage from 'components/Squeak/util/uploadImage'
import Modal from 'components/Modal'
import Select from 'components/Select'

const hedgehogImageWidth = 30
const hedgehogLengthInches = 7

const Hedgehog = ({ className = '' }) => {
    return (
        <img
            style={{ width: hedgehogImageWidth, height: hedgehogImageWidth }}
            className={className}
            src="/images/hedgehog.svg"
        />
    )
}

const SidebarSection = ({ title, tooltip, children }) => {
    return (
        <div>
            <h5 className="m-0 text-[15px] opacity-75 font-normal mb-2">
                {title}
                {tooltip && (
                    <Tooltip content={tooltip}>
                        <IconInfo className="w-4 h-4 ml-0.5 relative -top-px inline-block" />
                    </Tooltip>
                )}
            </h5>
            <div>{children}</div>
        </div>
    )
}

const Section = ({ children, cta, title, className = '', id = '' }) => {
    return (
        <section id={id} className={`max-w-screen-xl mx-auto px-5 mt-6 mb-12 ${className}`}>
            {title && (
                <div className="flex flex-col md:flex-row justify-between items-baseline w-full mb-6 md:mb-8 relative after:h-px after:bg-border dark:after:bg-border-dark after:absolute after:top-1/2 after:left-0 after:w-full">
                    <h4 className="m-0 bg-light dark:bg-dark relative z-10 pr-2">{title}</h4>
                    {cta && (
                        <aside className="bg-light dark:bg-dark relative z-10 md:pl-2 leading-tight -top-1">
                            {cta}
                        </aside>
                    )}
                </div>
            )}
            <div>{children}</div>
        </section>
    )
}

export const Profile = (profile) => {
    const { firstName, lastName, country, companyRole, pineappleOnPizza, biography, isTeamLead, id, location, color } =
        profile
    const name = [firstName, lastName].filter(Boolean).join(' ')
    return (
        <div>
            <div className="flex space-x-2 mb-6">
                <Avatar
                    className={`w-24 h-24 ${
                        color ? `bg-${color}` : 'bg-accent dark:bg-dark'
                    } rounded-full border border-border dark:border-dark`}
                    src={getAvatarURL(profile)}
                />
                <div>
                    <h2 className="m-0">{name}</h2>
                    <p className="text-primary/50 text-sm dark:text-primary-dark/50 m-0">{companyRole}</p>
                    <div className="flex space-x-1 items-center mt-1">
                        <Stickers
                            className="w-8 h-8"
                            country={country}
                            location={location}
                            pineappleOnPizza={pineappleOnPizza}
                            isTeamLead={isTeamLead}
                        />
                    </div>
                </div>
            </div>

            {biography ? (
                <Markdown className="bio-sidebar">{biography}</Markdown>
            ) : (
                <p className="bg-accent dark:bg-accent-dark border border-light dark:border-dark rounded p-4 text-sm">
                    {firstName} has been too busy writing code to fill out a bio!
                </p>
            )}
            <div className="mt-4">
                <CallToAction
                    to={`/community/profiles/${id}`}
                    type="secondary"
                    size="sm"
                    width="full [&_span]:w-[calc(100%_+_3px)]"
                >
                    Visit full profile
                </CallToAction>
            </div>
        </div>
    )
}

const Description = ({ description, handleChange, values, editing }) => {
    return editing ? (
        <textarea
            rows={5}
            name="description"
            onChange={handleChange}
            placeholder="Description"
            value={values.description}
            className="w-full p-2 text-[15px] rounded-md bg-white dark:bg-accent-dark border border-border dark:border-dark mb-2 resize-none"
        />
    ) : description ? (
        <p className="my-2 md:mb-4 text-[15px]" dangerouslySetInnerHTML={{ __html: description }} />
    ) : null
}

const TeamName = ({ teamName, handleChange, values, editing }) => {
    return (
        <div className="mb-2">
            {editing ? (
                <div className="font-bold flex space-x-1 items-baseline">
                    <AutosizeInput
                        inputClassName="p-2 rounded-md bg-white dark:bg-accent-dark border border-border dark:border-dark"
                        placeholder="Team name"
                        type="text"
                        name="name"
                        onChange={handleChange}
                        value={values.name}
                    />
                    <span>Team</span>
                </div>
            ) : (
                <h1 className="m-0">{teamName} Team</h1>
            )}
        </div>
    )
}

const TeamImage = ({ teamImage, editing, setFieldValue, values }) => {
    const handleDrop = (image) => {
        setFieldValue('teamImage', image)
    }

    return !!teamImage?.image?.data || editing ? (
        <figure className="rotate-2 max-w-sm flex flex-col gap-2 mt-8 md:mt-0 ml-auto">
            <div className="bg-accent aspect-video flex justify-center items-center shadow-xl border-8 border-white rounded-md">
                {editing ? (
                    <div className="w-96">
                        <ImageDrop
                            onRemove={() => setFieldValue('teamImage', null)}
                            onDrop={handleDrop}
                            image={values.teamImage}
                        />
                    </div>
                ) : (
                    <CloudinaryImage src={teamImage?.image?.data?.attributes?.url} className="" />
                )}
            </div>
            {editing ? (
                <input
                    name="teamImageCaption"
                    onChange={(e) => setFieldValue('teamImageCaption', e.target.value)}
                    value={values.teamImageCaption}
                    placeholder="Caption"
                    className="p-2 text-[13px] rounded-md bg-white dark:bg-accent-dark border border-border dark:border-dark"
                />
            ) : (
                <div className="text-right text-[13px] mr-2">{teamImage?.caption}</div>
            )}
        </figure>
    ) : null
}

const CrestBuilderField = ({ label, name, value, setFieldValue, type = 'text' }) => {
    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={name} className="text-sm opacity-60 font-semibold block text-black dark:text-primary-dark">
                {label}
            </label>
            <input
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={(e) => setFieldValue(name, e.target.value)}
                className="border border-border dark:border-dark rounded-md p-2"
                placeholder={label}
            />
        </div>
    )
}

const Crest = ({ crest, crestOptions, teamName, editing, setFieldValue, values, updateTeam }) => {
    const [crestBuilderOpen, setCrestBuilderOpen] = useState(false)
    const { user, getJwt } = useUser()

    const handleDrop = (image) => {
        setFieldValue('crestImage', image)
    }

    const handleSaveCrest = async () => {
        const jwt = await getJwt()
        const profileID = user?.profile?.id
        if (!profileID || !jwt) return
        const uploadedCrestImage =
            values?.crestImage?.file &&
            (await uploadImage(values.crestImage.file, jwt, {
                field: 'images',
                id: profileID,
                type: 'api::profile.profile',
            }))
        await updateTeam({
            crestOptions: values.crestOptions,
            ...(uploadedCrestImage ? { crest: uploadedCrestImage.id } : {}),
        })
        setCrestBuilderOpen(false)
    }

    return (
        <>
            <Modal open={crestBuilderOpen} setOpen={setCrestBuilderOpen}>
                <div
                    onClick={() => setCrestBuilderOpen(false)}
                    className="flex flex-start justify-center absolute w-full p-4"
                >
                    <div
                        className="max-w-2xl w-full bg-white dark:bg-dark rounded-md border border-border dark:border-dark relative p-4 grid grid-cols-2 gap-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-center relative group">
                            <TeamPatch
                                name={teamName}
                                imageUrl={values.crestImage?.objectURL}
                                className="h-48 md:h-80 -mt-2 md:-mt-6 mb-2 md:mb-0"
                                {...values.crestOptions}
                            />
                            {!values.crestImage?.objectURL ? (
                                <div className="absolute">
                                    <ImageDrop
                                        className="!size-12 -ml-2"
                                        onRemove={() => setFieldValue('crestImage', null)}
                                        onDrop={handleDrop}
                                        image={values.crestImage}
                                    />
                                </div>
                            ) : (
                                <button
                                    onClick={() => setFieldValue('crestImage', null)}
                                    className="group-hover:opacity-100 opacity-0 transition-opacity absolute size-8 bg-white rounded-full border border-border dark:border-dark flex items-center justify-center"
                                >
                                    <IconX className="size-4" />
                                </button>
                            )}
                        </div>

                        <div>
                            <form className="grid gap-2">
                                <div className="grid grid-cols-2 gap-2 gap-x-4">
                                    <Select
                                        className="!p-0"
                                        options={[
                                            { label: 'Black', value: 'black' },
                                            { label: 'Brown', value: 'brown' },
                                            { label: 'Navy', value: 'navy' },
                                            { label: 'White', value: 'white' },
                                        ]}
                                        onChange={(value) => setFieldValue('crestOptions.textColor', value)}
                                        value={values.crestOptions.textColor}
                                        placeholder="Text color"
                                    />
                                    <Select
                                        className="!p-0"
                                        options={[
                                            { label: 'Dark', value: 'dark' },
                                            { label: 'Light', value: 'light' },
                                        ]}
                                        onChange={(value) => setFieldValue('crestOptions.textShadow', value)}
                                        value={values.crestOptions.textShadow}
                                        placeholder="Text shadow"
                                    />
                                    <Select
                                        className="!p-0"
                                        options={[
                                            { label: 'Round', value: 'round' },
                                            { label: 'Half Round', value: 'half-round' },
                                            { label: 'Square', value: 'square' },
                                            { label: 'Hexagon', value: 'hexagon' },
                                            { label: 'Oval', value: 'oval' },
                                            { label: 'Squareish', value: 'squareish' },
                                            { label: 'Shield', value: 'shield' },
                                        ]}
                                        onChange={(value) => setFieldValue('crestOptions.frame', value)}
                                        value={values.crestOptions.frame}
                                        placeholder="Frame style"
                                    />
                                    <Select
                                        className="!p-0"
                                        options={[
                                            { label: 'Blue', value: 'blue-2' },
                                            { label: 'Burnt Orange', value: 'burnt-orange' },
                                            { label: 'Creamsicle', value: 'creamsicle' },
                                            { label: 'Fuchsia', value: 'fuchsia' },
                                            { label: 'Green', value: 'green' },
                                            { label: 'Gold', value: 'gold' },
                                            { label: 'Light Blue', value: 'light-blue' },
                                            { label: 'Light Purple', value: 'light-purple' },
                                            { label: 'Light Yellow', value: 'light-yellow' },
                                            { label: 'Navy', value: 'navy' },
                                            { label: 'Orange', value: 'orange' },
                                            { label: 'Pale Blue', value: 'pale-blue' },
                                            { label: 'Pink', value: 'pink' },
                                            { label: 'Purple 2', value: 'purple-2' },
                                            { label: 'Red 2', value: 'red-2' },
                                            { label: 'Teal 2', value: 'teal-2' },
                                        ]}
                                        onChange={(value) => setFieldValue('crestOptions.frameColor', value)}
                                        value={values.crestOptions.frameColor}
                                        placeholder="Frame color"
                                    />
                                    <Select
                                        className="!p-0"
                                        options={[
                                            { label: 'Straight', value: 'straight' },
                                            { label: 'Curved', value: 'curved' },
                                            { label: 'Wavy', value: 'wavy' },
                                            { label: 'Downward Curve', value: 'downward-curve' },
                                            { label: 'Upward Curve', value: 'upward-curve' },
                                            { label: 'Stepped', value: 'stepped' },
                                        ]}
                                        onChange={(value) => setFieldValue('crestOptions.plaque', value)}
                                        value={values.crestOptions.plaque}
                                        placeholder="Plaque style"
                                    />
                                    <Select
                                        className="!p-0"
                                        options={[
                                            { label: 'Blue', value: 'blue-2' },
                                            { label: 'Burnt Orange', value: 'burnt-orange' },
                                            { label: 'Creamsicle', value: 'creamsicle' },
                                            { label: 'Fuchsia', value: 'fuchsia' },
                                            { label: 'Green', value: 'green' },
                                            { label: 'Gold', value: 'gold' },
                                            { label: 'Light Blue', value: 'light-blue' },
                                            { label: 'Light Purple', value: 'light-purple' },
                                            { label: 'Navy', value: 'navy' },
                                            { label: 'Orange', value: 'orange' },
                                            { label: 'Pale Blue', value: 'pale-blue' },
                                            { label: 'Pink', value: 'pink' },
                                            { label: 'Purple 2', value: 'purple-2' },
                                            { label: 'Red 2', value: 'red-2' },
                                            { label: 'Teal 2', value: 'teal-2' },
                                            { label: 'White', value: 'white' },
                                        ]}
                                        onChange={(value) => setFieldValue('crestOptions.plaqueColor', value)}
                                        value={values.crestOptions.plaqueColor}
                                        placeholder="Plaque color"
                                    />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-sm opacity-60 font-semibold block text-black dark:text-primary-dark mb-1">
                                        Image scale
                                    </label>
                                    <input
                                        type="range"
                                        min="50"
                                        max="100"
                                        step="5"
                                        className="w-full accent-red dark:accent-yellow"
                                        value={values.crestOptions.imageScale}
                                        onChange={(e) => setFieldValue('crestOptions.imageScale', e.target.value)}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="flex flex-col gap-1">
                                        <label className="text-sm opacity-60 font-semibold block text-black dark:text-primary-dark mb-1">
                                            Image X offset
                                        </label>
                                        <input
                                            type="range"
                                            min="-100"
                                            max="100"
                                            step="5"
                                            className="w-full accent-red dark:accent-yellow"
                                            value={values.crestOptions.imageXOffset}
                                            onChange={(e) => setFieldValue('crestOptions.imageXOffset', e.target.value)}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label className="text-sm opacity-60 font-semibold block text-black dark:text-primary-dark mb-1">
                                            Image Y offset
                                        </label>
                                        <input
                                            type="range"
                                            min="-100"
                                            max="100"
                                            step="5"
                                            className="w-full accent-red dark:accent-yellow"
                                            value={values.crestOptions.imageYOffset}
                                            onChange={(e) => setFieldValue('crestOptions.imageYOffset', e.target.value)}
                                        />
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={handleSaveCrest}
                                    className={button('primary', 'full', undefined, 'md')}
                                >
                                    Save
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </Modal>

            {crest?.data ? (
                <div className="flex flex-col gap-2">
                    <TeamPatch
                        name={teamName}
                        imageUrl={crest?.data?.attributes?.url}
                        className="h-48 md:h-80 -mt-2 md:-mt-6 mb-2 md:mb-0"
                        {...crestOptions}
                    />
                    {editing && (
                        <CallToAction onClick={() => setCrestBuilderOpen(true)} size="sm" type="secondary">
                            Edit crest
                        </CallToAction>
                    )}
                </div>
            ) : editing ? (
                <div className="size-60 border border-border dark:border-border-dark rounded-md flex items-center justify-center">
                    <CallToAction onClick={() => setCrestBuilderOpen(true)} size="sm" type="secondary">
                        Crest builder
                    </CallToAction>
                </div>
            ) : null}
        </>
    )
}

const Header = ({
    teamName,
    crest,
    crestOptions,
    description,
    teamImage,
    hasInProgress,
    editing,
    handleChange,
    values,
    setFieldValue,
    updateTeam,
}) => {
    return (
        <Section className="mb-6">
            <div className="flex flex-col md:flex-row space-x-4 items-center">
                <Crest
                    crest={crest}
                    crestOptions={crestOptions}
                    teamName={teamName}
                    editing={editing}
                    setFieldValue={setFieldValue}
                    values={values}
                    updateTeam={updateTeam}
                />
                <div className="max-w-xl w-full">
                    <Link
                        href="/teams"
                        className="-ml-2 mb-1 inline-flex items-center gap-1 text-sm text-primary/50 dark:text-primary-dark/50 hover:text-primary dark:hover:text-primary-dark relative px-2 pt-1.5 pb-1 rounded hover:bg-light/50 hover:dark:bg-dark/50 border border-b-3 border-transparent md:hover:border-light dark:md:hover:border-dark hover:translate-y-[-1px] active:translate-y-[1px] active:transition-all"
                    >
                        <IconArrowLeft className="size-5" />
                        <span>Teams</span>
                    </Link>
                    <TeamName teamName={teamName} handleChange={handleChange} values={values} editing={editing} />
                    <Description
                        description={description}
                        handleChange={handleChange}
                        values={values}
                        editing={editing}
                    />
                    {hasInProgress && !editing && (
                        <CallToAction type="secondary" size="md" to="#in-progress">
                            See what we're building
                        </CallToAction>
                    )}
                </div>
                <TeamImage values={values} setFieldValue={setFieldValue} teamImage={teamImage} editing={editing} />
            </div>
        </Section>
    )
}

export default function Team({ body, name, roadmaps, objectives, emojis, newTeam }) {
    const { team, addTeamMember, removeTeamMember, handleTeamLead, updateTeam } = useTeam({
        teamName: name,
    })

    const { crest, crestOptions, description, profiles, leadProfiles, teamImage } = team?.attributes || {}
    const { user, getJwt } = useUser()
    const isModerator = user?.role?.type === 'moderator'
    const {
        allSlackEmoji: { totalCount: totalSlackEmojis },
    } = useStaticQuery(graphql`
        {
            allSlackEmoji {
                totalCount
            }
        }
    `)
    const [editing, setEditing] = useState(newTeam)
    const { handleChange, values, submitForm, setFieldValue, handleSubmit } = useFormik({
        enableReinitialize: true,
        initialValues: {
            name,
            description,
            teamImage: teamImage?.image?.data
                ? { file: null, objectURL: teamImage?.image?.data?.attributes?.url }
                : undefined,
            teamImageCaption: teamImage?.caption,
            crestImage: crest?.data ? { file: null, objectURL: crest?.data?.attributes?.url } : undefined,
            crestOptions: crestOptions || {
                fontSize: 'base',
                textColor: 'black',
                textShadow: 'light',
                frameColor: 'gold',
                plaqueColor: 'pale-blue',
                plaque: 'downward-curve',
                frame: 'half-round',
                imageScale: '50',
                imageXOffset: '0',
                imageYOffset: '0',
            },
        },
        onSubmit: async ({ name, description, teamImageCaption, crestImage, crestOptions, ...other }) => {
            const jwt = await getJwt()
            const profileID = user?.profile?.id
            if (!profileID || !jwt) return
            const uploadedTeamImage =
                other.teamImage?.file &&
                (await uploadImage(other.teamImage.file, jwt, {
                    field: 'images',
                    id: profileID,
                    type: 'api::profile.profile',
                }))
            const updatedTeam = {
                name,
                description,
                teamImage: {
                    image: uploadedTeamImage
                        ? uploadedTeamImage.id
                        : other.teamImage === null
                        ? null
                        : teamImage?.image?.data?.id,
                    caption: teamImageCaption,
                },
            }
            await updateTeam(updatedTeam)
            setEditing(false)
        },
    })

    const teamName = name
    const teamLength = profiles?.data?.length
    const pineapplePercentage =
        teamLength &&
        teamLength > 0 &&
        Math.round(
            (profiles?.data?.filter(({ attributes: { pineappleOnPizza } }) => pineappleOnPizza).length / teamLength) *
                100
        )

    const underConsideration = roadmaps?.filter(
        (roadmap) =>
            !roadmap.dateCompleted &&
            !roadmap.projectedCompletion &&
            roadmap.githubPages &&
            roadmap.githubPages.length > 0
    )

    const inProgress = roadmaps?.filter((roadmap) => !roadmap.complete && roadmap.projectedCompletion)

    const [recentlyShipped] =
        roadmaps
            ?.filter((roadmap) => roadmap.complete)
            .sort((a, b) => (new Date(a.dateCompleted).getTime() > new Date(b.dateCompleted).getTime() ? -1 : 1)) || []

    const { updates } = useTeamUpdates({
        teamName: name,
        filters: {
            roadmap: {
                id: {
                    $null: true,
                },
            },
        },
    })

    function isTeamLead(id) {
        return leadProfiles?.data?.some(({ id: leadID }) => leadID === id)
    }

    const hasUnderConsideration = underConsideration?.length > 0
    const hasInProgress = inProgress?.length > 0
    const hasBody = !!body
    const [activeProfile, setActiveProfile] = useState(false)
    const heightToHedgehogs =
        profiles?.data?.reduce((acc, curr) => acc + (curr?.attributes?.height || 0), 0) / hedgehogLengthInches || 0
    const hedgehogPercentage =
        (heightToHedgehogs % 1 !== 0 &&
            Math.round(hedgehogImageWidth * (heightToHedgehogs - Math.floor(heightToHedgehogs)))) ||
        0

    const teamEmojis = emojis?.filter((emoji) => !!emoji?.name && !!emoji?.localFile?.publicURL)

    const posthog = usePostHog()

    return (
        <>
            <SideModal open={!!activeProfile} setOpen={setActiveProfile}>
                <Profile {...activeProfile} />
            </SideModal>
            <Header
                teamName={teamName}
                crest={crest}
                crestOptions={crestOptions}
                description={description}
                teamImage={teamImage}
                hasInProgress={hasInProgress}
                handleChange={handleChange}
                values={values}
                submitForm={submitForm}
                editing={editing}
                setFieldValue={setFieldValue}
                updateTeam={updateTeam}
            />
            <SmoothScroll
                menuItems={[
                    {
                        label: 'People',
                        id: 'people',
                    },
                    ...(hasInProgress
                        ? [
                              {
                                  label: "What we're building",
                                  id: 'in-progress',
                              },
                          ]
                        : []),
                    ...(hasUnderConsideration || !!recentlyShipped
                        ? [
                              {
                                  label: 'Roadmap & recently shipped',
                                  id: 'roadmap',
                              },
                          ]
                        : []),
                    ...(objectives?.body
                        ? [
                              {
                                  label: 'Goals',
                                  id: 'goals',
                              },
                          ]
                        : []),
                    ...(hasBody
                        ? [
                              {
                                  label: 'Handbook',
                                  id: 'handbook',
                              },
                          ]
                        : []),
                ]}
            />
            <Section title="People" id="people">
                <div className="lg:flex lg:space-x-12 space-y-12 lg:space-y-0">
                    <div className="@container flex-1">
                        <ul className="list-none p-0 m-0 grid grid-cols-2 @lg:grid-cols-3 @2xl:grid-cols-4 @4xl:grid-cols-5 gap-4">
                            {profiles?.data
                                ? [...profiles.data]
                                      .sort((a, b) => isTeamLead(b.id) - isTeamLead(a.id))
                                      .map((profile) => {
                                          const {
                                              id,
                                              attributes: {
                                                  avatar,
                                                  firstName,
                                                  lastName,
                                                  country,
                                                  location,
                                                  companyRole,
                                                  pineappleOnPizza,
                                              },
                                          } = profile
                                          const name = [firstName, lastName].filter(Boolean).join(' ')
                                          return (
                                              <li
                                                  key={id}
                                                  className="bg-border dark:bg-border-dark rounded-md relative"
                                              >
                                                  <button
                                                      onClick={() =>
                                                          setActiveProfile({
                                                              ...profile.attributes,
                                                              isTeamLead: isTeamLead(id),
                                                              id,
                                                          })
                                                      }
                                                      className="text-left w-full border border-border dark:border-border-dark rounded-md h-full bg-accent dark:bg-accent-dark flex flex-col p-4 relative hover:-top-0.5 active:top-[.5px] hover:transition-all z-10 overflow-hidden max-h-64"
                                                  >
                                                      <div className="mb-auto">
                                                          <h3
                                                              className="mb-0 text-base leading-tight"
                                                              id={kebabCase(name) + '-' + kebabCase(companyRole)}
                                                          >
                                                              {name}
                                                          </h3>
                                                          <p className="text-primary/50 text-sm dark:text-primary-dark/50 m-0">
                                                              {companyRole}
                                                          </p>

                                                          <div className="mt-1 flex space-x-1 items-center">
                                                              <Stickers
                                                                  country={country}
                                                                  location={location}
                                                                  isTeamLead={isTeamLead(id)}
                                                                  pineappleOnPizza={pineappleOnPizza}
                                                                  handleTeamLead={handleTeamLead}
                                                                  isModerator={isModerator}
                                                                  id={id}
                                                              />
                                                          </div>
                                                      </div>
                                                      <div className="ml-auto -mb-4 -mr-4 mt-2">
                                                          <img
                                                              src={
                                                                  avatar?.data?.attributes?.url ||
                                                                  'https://res.cloudinary.com/dmukukwp6/image/upload/v1698231117/max_6942263bd1.png'
                                                              }
                                                              className="w-[165px]"
                                                          />
                                                      </div>
                                                  </button>
                                                  {isModerator && (
                                                      <button
                                                          onClick={() => removeTeamMember(id)}
                                                          className="w-7 h-7 rounded-full border border-border dark:border-dark absolute -right-2 flex items-center justify-center -top-2 z-10 bg-accent dark:bg-accent-dark"
                                                      >
                                                          <Tooltip content="Remove team member" placement="top">
                                                              <IconX className="w-4 h-4" />
                                                          </Tooltip>
                                                      </button>
                                                  )}
                                              </li>
                                          )
                                      })
                                : new Array(4).fill(0).map((_, i) => (
                                      <li key={i}>
                                          <div className="w-full border border-border dark:border-border-dark rounded-md bg-accent dark:bg-accent-dark flex flex-col p-4 relative overflow-hidden h-64 animate-pulse" />
                                      </li>
                                  ))}
                        </ul>
                        {isModerator && <AddTeamMember handleChange={(user) => addTeamMember(user.profile.id)} />}
                    </div>

                    {profiles?.data?.length > 0 && (
                        <div className="@container w-full lg:max-w-[420px] shrink-1 basis-sm space-y-4 divide-y divide-border dark:divide-border-dark">
                            <SidebarSection title="Small team FAQ">
                                <p className="font-bold m-0 text-[15px]">Q: Does pineapple belong on pizza?</p>
                                <p className="m-0 mt-2 text-sm">A: {PineappleText(pineapplePercentage)}.</p>
                            </SidebarSection>
                            <div className="grid @xl:grid-cols-2 gap-6 pt-4 divide-y @xl:divide-y-0 divide-border dark:divide-border-dark">
                                <div>
                                    <SidebarSection
                                        title="Total team height as measured in hedgehogs"
                                        tooltip={`The average hedgehog is ${
                                            posthog?.getFeatureFlag?.('are-you-in-the-us')
                                                ? '7 inches'
                                                : '17 centimeters'
                                        } long`}
                                    >
                                        <ul className="list-none m-0 p-0 flex flex-wrap">
                                            {new Array(Math.floor(heightToHedgehogs)).fill(0).map((_, i) => (
                                                <li className="m-0.5" key={i}>
                                                    <Hedgehog />
                                                </li>
                                            ))}
                                            {hedgehogPercentage && (
                                                <li
                                                    style={{
                                                        width: hedgehogPercentage,
                                                    }}
                                                    className="overflow-hidden relative m-0.5"
                                                >
                                                    <Hedgehog className="absolute object-none object-left" />
                                                </li>
                                            )}
                                        </ul>
                                    </SidebarSection>
                                </div>
                                {teamEmojis?.length > 0 && (
                                    <div className="pt-6 @xl:pt-0">
                                        <h5 className="m-0 text-base font-normal">
                                            PostHog has created <strong>{totalSlackEmojis}</strong> custom Slack emojis.
                                        </h5>
                                        <p className="text-[15px] mb-4">
                                            Here's some of this small team's best contributions.
                                        </p>
                                        <ul className="list-none m-0 p-0 mt-2 flex flex-wrap gap-2">
                                            {teamEmojis?.map(({ name, localFile }) => (
                                                <li key={name}>
                                                    <Tooltip content={`:${name}:`}>
                                                        <img className="w-8 h-8" src={localFile?.publicURL} />
                                                    </Tooltip>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </Section>
            {hasInProgress && (
                <Section title="What we're building" id="in-progress">
                    <div className="lg:flex lg:space-x-12 space-y-8 lg:space-y-0 items-start">
                        <ul className="list-none m-0 p-0 flex flex-col gap-4">
                            {inProgress.map((roadmap) => (
                                <InProgress key={roadmap.squeakId} {...roadmap} />
                            ))}
                        </ul>
                        {(updates.length > 0 || isModerator) && (
                            <div className="lg:max-w-[340px] w-full flex-shrink-0">
                                {isModerator && (
                                    <div className="mb-8 pb-8 border-b border-border dark:border-dark">
                                        <SidebarSection title="Post an update">
                                            <TeamUpdate teamName={name} hideTeamSelect />
                                        </SidebarSection>
                                    </div>
                                )}
                                {updates.length > 0 && (
                                    <SidebarSection title="Latest update">
                                        <Question key={updates[0].question} id={updates[0].question} />
                                    </SidebarSection>
                                )}
                            </div>
                        )}
                    </div>
                </Section>
            )}
            <div id="roadmap">
                {hasUnderConsideration && (
                    <Section title="Roadmap">
                        <p className="-mt-2">
                            Here’s what we’re considering building next. Vote for your favorites or share a new idea on{' '}
                            <Link to="https://github.com/PostHog/posthog">GitHub</Link>.
                        </p>
                        <div className="max-w-2xl">
                            <ul className="list-none m-0 p-0 space-y-4">
                                {underConsideration.map((roadmap) => (
                                    <UnderConsideration key={roadmap.squeakId} {...roadmap} />
                                ))}
                            </ul>
                        </div>
                    </Section>
                )}
                {recentlyShipped && (
                    <Section title="Recently shipped">
                        <div className="max-w-2xl team-page-content">
                            <div className="border border-light dark:border-dark rounded bg-white dark:bg-accent-dark p-6">
                                <Change {...recentlyShipped} />
                            </div>
                        </div>
                    </Section>
                )}
            </div>
            {objectives?.body && (
                <Section title="Goals" id="goals">
                    <div className="article-content max-w-2xl team-page-content">
                        <MDXProvider components={{}}>
                            <MDXRenderer>{objectives?.body}</MDXRenderer>
                        </MDXProvider>
                    </div>
                </Section>
            )}
            {hasBody && (
                <Section title="Handbook" id="handbook">
                    <div className="article-content max-w-2xl team-page-content">
                        <MDXProvider components={{ PrivateLink }}>
                            <MDXRenderer>{body}</MDXRenderer>
                        </MDXProvider>
                    </div>
                </Section>
            )}
            <div className="flex justify-end space-x-2 fixed bottom-4 right-4 z-50">
                <CallToAction
                    size="sm"
                    onClick={() => {
                        if (editing) {
                            submitForm()
                        } else {
                            setEditing(true)
                        }
                    }}
                >
                    {editing ? 'Save' : 'Edit'}
                </CallToAction>
                {editing && (
                    <CallToAction type="secondary" size="sm" onClick={() => setEditing(false)}>
                        Cancel
                    </CallToAction>
                )}
            </div>
        </>
    )
}
