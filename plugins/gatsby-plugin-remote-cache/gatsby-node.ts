import {
    S3Client,
    CreateMultipartUploadCommand,
    UploadPartCommand,
    CompleteMultipartUploadCommand,
    CompletedPart,
    GetObjectCommand,
    HeadObjectCommand,
} from '@aws-sdk/client-s3'
import type { GatsbyNode, PluginOptions } from 'gatsby'
import path from 'path'
import fs from 'fs'

import AdmZip from 'adm-zip'

type RemoteCacheConfigOptions = {
    region: string
    endpoint: string
    accessKeyId: string
    secretAccessKey: string
} & PluginOptions

const createS3Client = (options: RemoteCacheConfigOptions) => {
    const { region, endpoint, accessKeyId, secretAccessKey } = options

    return new S3Client({
        region,
        endpoint,
        credentials: {
            accessKeyId,
            secretAccessKey,
        },
    })
}

export const onPreInit: GatsbyNode['onPreInit'] = async (_, options: RemoteCacheConfigOptions) => {
    try {
        const client = createS3Client(options)

        const exists = await client.send(
            new HeadObjectCommand({
                Bucket: 'posthog-com-cache',
                Key: 'cache.zip',
            })
        )

        console.time('fetchCache')
        const cache = await client.send(
            new GetObjectCommand({
                Bucket: 'posthog-com-cache',
                Key: 'cache.zip',
            })
        )
        console.timeEnd('fetchCache')

        const data = await cache.Body.transformToByteArray()

        const zip = new AdmZip(Buffer.from(data))

        if (fs.existsSync(path.join(process.cwd(), '.cache'))) {
            fs.rmSync(path.join(process.cwd(), '.cache'), {
                recursive: true,
                force: true,
            })
        }

        zip.extractAllTo(path.join(process.cwd(), '.cache'))
    } catch (error) {
        if (error.name === 'NotFound') {
            console.warn('No remote cache found - skipping')
        } else {
            console.error(error)
        }
    }
}

export const onPostBuild: GatsbyNode['onPostBuild'] = async (_, options: RemoteCacheConfigOptions) => {
    const client = createS3Client(options)

    console.time('compressingArchive')
    const zip = new AdmZip()
    zip.addLocalFolder(path.join(process.cwd(), '.cache'))
    console.timeEnd('compressingArchive')

    const upload = await client.send(
        new CreateMultipartUploadCommand({
            Bucket: 'posthog-com-cache',
            Key: 'cache.zip',
        })
    )

    const chunkSize = 50 * 1024 * 1024 // 1MiB
    let numRead = 0
    let i = 1
    const buf = zip.toBuffer()

    console.log(buf.byteLength)

    const parts: UploadPartCommand[] = []

    while (numRead < buf.length) {
        const part = new UploadPartCommand({
            Bucket: 'posthog-com-cache',
            Key: 'cache.zip',
            Body: buf.subarray(numRead, numRead + chunkSize),
            PartNumber: i,
            UploadId: upload.UploadId,
        })
        parts.push(part)

        numRead += chunkSize
        i++
    }

    console.time('uploadParts')

    const partResults: CompletedPart[] = await Promise.all(
        parts.map(async (part) => {
            const result = await client.send(part)
            return {
                PartNumber: part.input.PartNumber,
                ETag: result.ETag,
            }
        })
    )
    console.timeEnd('uploadParts')

    try {
        const data = await client.send(
            new CompleteMultipartUploadCommand({
                Bucket: 'posthog-com-cache',
                Key: 'cache.zip',
                MultipartUpload: {
                    Parts: partResults,
                },
                UploadId: upload.UploadId,
            })
        )
        console.log('Success', data)
    } catch (error) {
        console.error(error)
    }
}
