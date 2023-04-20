export default async function uploadImage(
    image: string | Blob,
    jwt: string,
    ref?: { id: number; type: string; field: string }
) {
    const formData = new FormData()
    formData.append('files', image)
    if (ref && ref.field && ref.id && ref.type) {
        formData.append('refId', String(ref.id))
        formData.append('ref', ref.type)
        formData.append('field', ref.field)
    }

    const imageRes = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/upload`, {
        method: 'POST',
        body: formData,
        headers: {
            Authorization: `Bearer ${jwt}`,
        },
    })

    const imageData = await imageRes.json()

    if (!imageRes?.ok) {
        throw new Error(imageData?.error?.message)
    }

    return imageData?.[0]
}
