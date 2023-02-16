import path from 'path'
import fs from 'fs'
import { execSync } from 'child_process'

import {
    S3Client,
    CreateMultipartUploadCommand,
    UploadPartCommand,
    CompleteMultipartUploadCommand,
    CompletedPart,
    GetObjectCommand,
    HeadObjectCommand,
    PutObjectCommand,
} from '@aws-sdk/client-s3'
import type { GatsbyNode, PluginOptions } from 'gatsby'
import AdmZip from 'adm-zip'

type RemoteCacheConfigOptions = {
    region: string
    endpoint: string
    bucket: string
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

const fetchAndExtract = async (client: S3Client, bucket: string, key: string, destination: string) => {
    const destinationPath = path.join(process.cwd(), destination)

    await client.send(
        new HeadObjectCommand({
            Bucket: bucket,
            Key: key,
        })
    )

    console.time('fetchData')
    const obj = await client.send(
        new GetObjectCommand({
            Bucket: bucket,
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

const uploadDir = async (client: S3Client, bucket: string, key: string, source: string) => {
    const sourcePath = path.join(process.cwd(), source)

    console.time('compressingArchive')
    execSync(`tar -czf ${key}.tar.gz ${sourcePath}`)
    console.timeEnd('compressingArchive')

    const stream = fs.createReadStream(key + '.tar.gz', { highWaterMark: CHUNK_SIZE })

    await client.send(
        new PutObjectCommand({
            Bucket: bucket,
            Key: key,
            Body: stream,
        })
    )

    fs.rmSync(key + '.tar.gz')

    /*const upload = await client.send(
        new CreateMultipartUploadCommand({
            Bucket: bucket,
            Key: key,
        })
    )

    return new Promise((resolve, reject) => {
        const parts: UploadPartCommand[] = []

        stream.on('error', (err) => {
            reject(err)
        })

        stream.on('data', (chunk) => {
            const part = new UploadPartCommand({
                Bucket: bucket,
                Key: key,
                Body: chunk,
                PartNumber: i,
                UploadId: upload.UploadId,
            })
            parts.push(part)

            i++
        })

        stream.on('end', async () => {
            const partResults: CompletedPart[] = await Promise.all(
                parts.map(async (part) => {
                    const result = await client.send(part)
                    return {
                        PartNumber: part.input.PartNumber,
                        ETag: result.ETag,
                    }
                })
            )

            const data = await client.send(
                new CompleteMultipartUploadCommand({
                    Bucket: bucket,
                    Key: key,
                    MultipartUpload: {
                        Parts: partResults,
                    },
                    UploadId: upload.UploadId,
                })
            )

            resolve(data)
        })
    })*/
}

export const onPreInit: GatsbyNode['onPreInit'] = async (_, options: RemoteCacheConfigOptions) => {
    try {
        const { bucket } = options
        const branch = currentBranch()

        console.log(branch)

        if (!branch) {
            console.warn('No branch found - skipping cache download')
            return
        }

        const client = createS3Client(options)

        await fetchAndExtract(client, bucket, `${branch}/cache.zip`, '.cache')
        await fetchAndExtract(client, bucket, `${branch}/public.zip`, 'public')
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
        const { bucket } = options
        const branch = currentBranch()

        console.log(branch)

        if (!branch) {
            console.warn('No branch found - skipping cache upload')
            return
        }

        const client = createS3Client(options)

        await uploadDir(client, bucket, `${branch}/cache.zip`, '.cache')
        await uploadDir(client, bucket, `${branch}/public.zip`, 'public')
    } catch (error) {
        console.error(error)
    }
}
