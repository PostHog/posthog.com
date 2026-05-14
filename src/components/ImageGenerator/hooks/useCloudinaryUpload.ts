import { useCallback, useState } from 'react'
import { useUser } from 'hooks/useUser'
import uploadImage from 'components/Squeak/util/uploadImage'

export function useCloudinaryUpload() {
    const { getJwt } = useUser()
    const [uploading, setUploading] = useState(false)

    const upload = useCallback(
        async (file: File): Promise<string> => {
            setUploading(true)
            try {
                const jwt = await getJwt()
                if (!jwt) throw new Error('Sign in required')
                const result = await uploadImage(file, jwt)
                const url = result?.url
                if (!url) throw new Error('Upload returned no URL')
                return url
            } finally {
                setUploading(false)
            }
        },
        [getJwt]
    )

    return { upload, uploading }
}
