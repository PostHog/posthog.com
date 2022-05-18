/* eslint-disable @typescript-eslint/no-var-requires */
const sharp = require(`sharp`)
const glob = require(`glob`)
const fs = require(`fs-extra`)

const matches = glob.sync(`contents/**/*.{png,jpg,jpeg}`)
const MAX_WIDTH = 1800
const QUALITY = 70

Promise.all(
    matches.map(async (match) => {
        const stream = sharp(match)
        const info = await stream.metadata().catch((err) => console.log(err, match))

        if (!info || info.width < MAX_WIDTH) {
            return
        }

        const optimizedName = match.replace(/(\..+)$/, (match, ext) => `-optimized${ext}`)

        await stream
            .resize(MAX_WIDTH)
            .jpeg({ quality: QUALITY })
            .toFile(optimizedName)
            .catch((err) => console.log(err, match))

        return fs.rename(optimizedName, match)
    })
)
