// CloudinaryImage: the hedgehog images in the `hogs` folder, for the roadmap form's image picker.
import type { Source } from '../index'
import { CLOUDINARY_CLOUD_NAME, env } from '../env'
import { fetchJson } from '../http'
import type { CloudinaryImageNode, Without } from '../types'

/* Cloudinary Admin API */

export type CloudinaryResource = Without<CloudinaryImageNode, 'id'>

export interface ResourcesResponse {
    resources: CloudinaryResource[]
    next_cursor?: string
}

const image = (publicId: string, version: number): CloudinaryImageNode => ({
    id: `cloudinary-image-${publicId}`,
    asset_id: `fake-${publicId}`,
    public_id: publicId,
    // The picker lists the `hogs` folder only, so the fakes claim it
    folder: 'hogs',
    format: 'png',
    version,
    resource_type: 'image',
    type: 'upload',
    width: 800,
    height: 800,
    url: `http://res.cloudinary.com/dmukukwp6/image/upload/v${version}/${publicId}.png`,
    secure_url: `https://res.cloudinary.com/dmukukwp6/image/upload/v${version}/${publicId}.png`,
})

export const cloudinaryImageSource: Source = {
    name: 'cloudinary-images',
    types: ['CloudinaryImage'],
    requires: ['CLOUDINARY_API_KEY', 'CLOUDINARY_API_SECRET'],
    async fetch() {
        const auth = Buffer.from(`${env('CLOUDINARY_API_KEY')}:${env('CLOUDINARY_API_SECRET')}`).toString('base64')
        const { resources } = await fetchJson<ResourcesResponse>(
            `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME()}/resources/image?prefix=hogs&type=upload&max_results=500`,
            { headers: { Authorization: `Basic ${auth}` } }
        )
        const nodes: CloudinaryImageNode[] = resources.map((resource) => ({
            ...resource,
            id: `cloudinary-image-${resource.public_id}`,
        }))
        return { CloudinaryImage: nodes }
    },
    fake: () => ({
        CloudinaryImage: [
            image('hogs/sleeping', 1724378609),
            image('business_hog_adb9cf3c35', 1),
            image('arthog_ed871b96df', 1),
        ],
    }),
}
