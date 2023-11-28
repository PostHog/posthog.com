import uploadImage from './uploadImage'

export default async function transformValues(
    values: {
        images: { fakeImagePath: string; file: File; objectURL: string }[]
        body: string
    },
    profileID: number,
    jwt: string | null
) {
    if (values.images.length <= 0) return values
    if (!jwt || !profileID) return values
    let transformedBody = values.body
    const uploadedImages = []
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
                    uploadedImages.push(uploadedImage)
                }
            } catch (err) {
                console.error(err)
                return { ...values, body: transformedBody }
            }
        }
    }

    return { ...values, body: transformedBody, uploadedImages }
}
