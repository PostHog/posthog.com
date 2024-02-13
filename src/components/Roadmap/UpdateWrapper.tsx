import Link from 'components/Link'
import RoadmapForm, { Status } from 'components/RoadmapForm'
import { useUser } from 'hooks/useUser'
import React, { useEffect, useState } from 'react'

export const RoadmapSuccess = ({
    id,
    description = 'Roadmap item will be appear on next build',
}: {
    id: number
    description?: string
}) => {
    return (
        <div className="p-2 mb-4">
            <h4 className="m-0">Success!</h4>
            <p className="m-0">{description}</p>
            <Link
                external
                to={`${process.env.GATSBY_SQUEAK_API_HOST}/admin/content-manager/collectionType/api::roadmap.roadmap/${id}`}
                className="mt-2 text-sm"
            >
                View in Strapi
            </Link>
        </div>
    )
}

export default function UpdateWrapper({
    id,
    children,
    status,
    formClassName = '',
    editButtonClassName = '',
}: {
    id: number
    children: JSX.Element
    status: Status
    formClassName?: string
    editButtonClassName?: string
}) {
    const { user } = useUser()
    const [editing, setEditing] = useState(false)
    const [initialValues, setInitialValues] = useState<any>(null)
    const [success, setSuccess] = useState(false)

    const fetchRoadmapItem = () =>
        fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/roadmaps/${id}?populate=*`)
            .then((res) => res.json())
            .then(({ data: { attributes } }) => {
                const { title, description, topic, teams, image, betaAvailable, milestone, category, githubUrls } =
                    attributes
                setInitialValues({
                    title,
                    body: description,
                    images: [],
                    topic: topic?.id || undefined,
                    team: teams?.data?.[0]?.id || undefined,
                    featuredImage: image?.data ? { file: null, objectURL: image.data.attributes.url } : undefined,
                    betaAvailable,
                    milestone,
                    category: category || undefined,
                    githubUrls: githubUrls?.length > 0 ? githubUrls : [''],
                })
            })

    useEffect(() => {
        if (user?.role?.type !== 'moderator') return
        fetchRoadmapItem()
    }, [user])

    return editing ? (
        <div className={formClassName}>
            <RoadmapForm
                status={status}
                hideStatusSelector={false}
                initialValues={initialValues}
                buttonText="Update"
                id={id}
                onSubmit={() => {
                    fetchRoadmapItem()
                    setSuccess(true)
                    setEditing(false)
                }}
            />
        </div>
    ) : (
        <>
            {success && <RoadmapSuccess description="Roadmap will update on next build" id={id} />}
            <div className="relative">
                {initialValues && (
                    <button className={`font-bold text-red ${editButtonClassName}`} onClick={() => setEditing(true)}>
                        Edit
                    </button>
                )}
                <span>{children}</span>
            </div>
        </>
    )
}
