import React from 'react'
import useSWRImmutable from 'swr/immutable'
import { Avatar } from 'components/UI/Avatar'
import { Chip } from 'components/UI/Chip'
import type { ChipSize } from 'components/UI/Chip'
import { DemoRow, DemoRows } from 'components/UILibraryDocs/DemoLayout'

type Profile = {
    firstName: string
    lastName: string
    companyRole?: string
    avatar?: { data?: { attributes: { url: string } } }
    teams?: { data: { attributes: { name: string } }[] }
}

type Team = {
    name: string
    tagline?: string
    description?: string
    miniCrest?: { data?: { attributes: { url: string } } }
    profiles?: { data: unknown[] }
}

const fetchFromStrapi = async <Attributes,>(path: string): Promise<Attributes> => {
    const response = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}${path}`)
    if (!response.ok) throw new Error(`Request failed (${response.status})`)
    const { data } = await response.json()
    return (Array.isArray(data) ? data[0] : data).attributes
}

const profilePath = (id: number): string =>
    `/api/profiles/${id}?fields[0]=firstName&fields[1]=lastName&fields[2]=companyRole&populate[avatar][fields][0]=url&populate[teams][fields][0]=name`

const teamPath = (slug: string): string =>
    `/api/teams?filters[slug][$eqi]=${encodeURIComponent(
        slug
    )}&fields[0]=name&fields[1]=tagline&fields[2]=description&populate[miniCrest][fields][0]=url&populate[profiles][fields][0]=id`

const sized = (url: string | undefined, pixels: number): string | undefined =>
    url?.replace('/upload/', `/upload/c_fill,w_${pixels},h_${pixels}/`)

function ProfilePreview({ id }: { id: number }): JSX.Element {
    const { data: profile, error } = useSWRImmutable<Profile>(profilePath(id), fetchFromStrapi)
    if (error) return <div className="text-13 text-secondary">This profile did not load.</div>
    if (!profile) return <div className="text-13 text-secondary">Loading...</div>
    const team = profile.teams?.data[0]?.attributes.name
    return (
        <div className="flex items-center gap-3">
            <Avatar.Root size="lg">
                <Avatar.Image src={sized(profile.avatar?.data?.attributes.url, 96)} alt="" />
                <Avatar.Fallback>{profile.firstName[0]}</Avatar.Fallback>
            </Avatar.Root>
            <div className="min-w-0">
                <div className="text-15 font-semibold leading-snug text-primary">
                    {profile.firstName} {profile.lastName}
                </div>
                <div className="text-13 text-secondary">{profile.companyRole}</div>
                {team && <div className="text-13 text-secondary">{team} team</div>}
            </div>
        </div>
    )
}

function TeamPreview({ slug }: { slug: string }): JSX.Element {
    const { data: team, error } = useSWRImmutable<Team>(teamPath(slug), fetchFromStrapi)
    if (error) return <div className="text-13 text-secondary">This team did not load.</div>
    if (!team) return <div className="text-13 text-secondary">Loading...</div>
    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
                <img
                    src={sized(team.miniCrest?.data?.attributes.url, 64)}
                    alt=""
                    className="size-8 shrink-0 rounded-[5px] border border-[rgb(var(--text-primary)/0.16)] object-cover"
                />
                <div className="min-w-0">
                    <div className="text-15 font-semibold leading-snug text-primary">{team.name} team</div>
                    <div className="text-13 text-secondary">{team.tagline}</div>
                </div>
            </div>
            <div className="text-sm text-secondary">{team.description}</div>
            <div className="text-13 text-secondary">{team.profiles?.data.length} members</div>
        </div>
    )
}

function ProfileChip({ id, name, size }: { id: number; name: string; size?: ChipSize }): JSX.Element {
    const { data: profile } = useSWRImmutable<Profile>(profilePath(id), fetchFromStrapi)
    return (
        <Chip
            size={size}
            href={`/community/profiles/${id}`}
            image={sized(profile?.avatar?.data?.attributes.url, 48)}
            preview={<ProfilePreview id={id} />}
        >
            {name}
        </Chip>
    )
}

function TeamChip({
    slug,
    name,
    size,
    link = true,
}: {
    slug: string
    name: string
    size?: ChipSize
    link?: boolean
}): JSX.Element {
    const { data: team } = useSWRImmutable<Team>(teamPath(slug), fetchFromStrapi)
    return (
        <Chip
            size={size}
            href={link ? `/teams/${slug}` : undefined}
            image={sized(team?.miniCrest?.data?.attributes.url, 48)}
            imageShape="square"
            preview={<TeamPreview slug={slug} />}
        >
            {name}
        </Chip>
    )
}

export default function ChipReferences(): JSX.Element {
    return (
        <DemoRows>
            <DemoRow label="Link">
                <ProfileChip id={46139} name="Ian" />
                <TeamChip slug="website" name="Website" />
            </DemoRow>
            <DemoRow label="No link">
                <TeamChip slug="website" name="Website" link={false} />
            </DemoRow>
            <DemoRow label="In a sentence" fill>
                <p className="m-0 max-w-[65ch] text-15">
                    Thanks <ProfileChip id={46139} name="Ian" size="inline" />, that fixed it. The{' '}
                    <TeamChip slug="website" name="Website" size="inline" /> team owns this page.
                </p>
            </DemoRow>
        </DemoRows>
    )
}
