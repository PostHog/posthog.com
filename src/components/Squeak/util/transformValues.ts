import { useUser } from 'hooks/useUser'
import uploadImage from './uploadImage'

export default async function transformValues(values: {
    images: { fakeImagePath: string; file: File; objectURL: string }[]
    body: string
}) {
    if (values.images.length <= 0) return values
    const { user, getJwt } = useUser()
    const jwt = await getJwt()
    const profileID = user?.profile?.id
    if (!jwt || !profileID) return values
    let transformedBody = values.body
    for (const image of values.images) {
        const { file, fakeImagePath, objectURL } = image
        URL.revokeObjectURL(objectURL)
        if (transformedBody.includes(fakeImagePath)) {
            try {
                const uploadedImage = await uploadImage(file, jwt, {
                    field: 'images',
                    id: profileID,
                    type: 'api::profile.profile',
                })
                if (uploadedImage?.url) {
                    transformedBody = transformedBody.replaceAll(fakeImagePath, uploadedImage.url)
                }
            } catch (err) {
                console.error(err)
                return { ...values, body: transformedBody }
            }
        }
    }

    return { ...values, body: transformedBody }
}
