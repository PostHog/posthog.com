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
    const destinationPath = path.resolve(process.cwd(), destination)

    await client.send(
        new HeadObjectCommand({
            Bucket: bucket,
            Key: key,
        })
    )

    if (fs.existsSync(destinationPath)) {
        fs.rmSync(destinationPath, {
            recursive: true,
            force: true,
        })
    }

    const stream = fs.createWriteStream('archive.tar.gz')

    console.time('fetchData')
    const obj = await client.send(
        new GetObjectCommand({
            Bucket: bucket,
            Key: key,
        })
    )
    console.timeEnd('fetchData')

    const reader = obj.Body.transformToWebStream().getReader()

    console.time('writeArchive')
    while (true) {
        const result = await reader.read()

        stream.write(result.value)

        if (result.done) {
            break
        }
    }
    console.timeEnd('writeArchive')

    console.time('extractArchive')
    execSync(`tar -xzf archive.tar.gz`)
    console.timeEnd('extractArchive')

    execSync('ls -la')

    fs.rmSync('archive.tar.gz')
}

const uploadDir = async (client: S3Client, bucket: string, key: string, source: string) => {
    const sourcePath = path.relative(process.cwd(), source)

    console.time('compressingArchive')
    execSync(`tar -czf archive.tar.gz ${sourcePath}`)
    console.timeEnd('compressingArchive')

    console.time('createReadStream')
    const stream = fs.createReadStream('archive.tar.gz', { highWaterMark: CHUNK_SIZE })
    console.timeEnd('createReadStream')

    console.time('putObject')
    await client.send(
        new PutObjectCommand({
            Bucket: bucket,
            Key: key,
            Body: stream,
        })
    )
    console.timeEnd('putObject')

    console.time('removeArchive')
    fs.rmSync('archive.tar.gz')
    console.timeEnd('removeArchive')

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

        await fetchAndExtract(client, bucket, `${branch}/cache.tar.gz`, '.cache')
        await fetchAndExtract(client, bucket, `${branch}/public.tar.gz`, 'public')
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

        await uploadDir(client, bucket, `${branch}/cache.tar.gz`, '.cache')
        await uploadDir(client, bucket, `${branch}/public.tar.gz`, 'public')
    } catch (error) {
        console.error(error)
    }
}
