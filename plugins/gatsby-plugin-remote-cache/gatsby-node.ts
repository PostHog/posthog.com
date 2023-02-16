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

const CHUNK_SIZE = 30 * 1024 * 1024 // 30MiB

const currentBranch = () => {
    return process.env.VERCEL_GIT_COMMIT_REF
}

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

const fetchAndExtract = async (client: S3Client, key: string, destination: string) => {
    const destinationPath = path.join(process.cwd(), destination)

    await client.send(
        new HeadObjectCommand({
            Bucket: 'posthog-com-cache',
            Key: key,
        })
    )

    console.time('fetchData')
    const obj = await client.send(
        new GetObjectCommand({
            Bucket: 'posthog-com-cache',
            Key: key,
        })
    )
    console.timeEnd('fetchData')

    if (fs.existsSync(destinationPath)) {
        fs.rmSync(destinationPath, {
            recursive: true,
            force: true,
        })
    }

    const data = await obj.Body.transformToByteArray()
    const zip = new AdmZip(Buffer.from(data))

    zip.extractAllTo(destinationPath)
}

const uploadDir = async (client: S3Client, key: string, source: string) => {
    const sourcePath = path.join(process.cwd(), source)

    console.time('compressingArchive')
    const zip = new AdmZip()
    zip.addLocalFolder(sourcePath)
    console.timeEnd('compressingArchive')

    const upload = await client.send(
        new CreateMultipartUploadCommand({
            Bucket: 'posthog-com-cache',
            Key: key,
        })
    )

    let numRead = 0
    let i = 1
    const buf = zip.toBuffer()

    console.log(buf.byteLength)

    const parts: UploadPartCommand[] = []

    while (numRead < buf.length) {
        const part = new UploadPartCommand({
            Bucket: 'posthog-com-cache',
            Key: key,
            Body: buf.subarray(numRead, numRead + CHUNK_SIZE),
            PartNumber: i,
            UploadId: upload.UploadId,
        })
        parts.push(part)

        numRead += CHUNK_SIZE
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

    await client.send(
        new CompleteMultipartUploadCommand({
            Bucket: 'posthog-com-cache',
            Key: key,
            MultipartUpload: {
                Parts: partResults,
            },
            UploadId: upload.UploadId,
        })
    )
}

export const onPreInit: GatsbyNode['onPreInit'] = async (_, options: RemoteCacheConfigOptions) => {
    try {
        const branch = currentBranch()

        console.log(branch)

        if (!branch) {
            console.warn('No branch found - skipping cache download')
            return
        }

        const client = createS3Client(options)

        await fetchAndExtract(client, `${branch}/cache.zip`, '.cache')
        await fetchAndExtract(client, `${branch}/public.zip`, 'public')
    } catch (error) {
        if (error.name === 'NotFound') {
            console.warn('No remote cache found - skipping')
        } else {
            console.error(error)
        }
    }
}

export const onPostBuild: GatsbyNode['onPostBuild'] = async (_, options: RemoteCacheConfigOptions) => {
    try {
        const branch = currentBranch()

        console.log(branch)

        if (!branch) {
            console.warn('No branch found - skipping cache upload')
            return
        }

        const client = createS3Client(options)

        await uploadDir(client, `${branch}/cache.zip`, '.cache')
        await uploadDir(client, `${branch}/public.zip`, 'public')
    } catch (error) {
        console.error(error)
    }
}
