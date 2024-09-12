const { getLowResolutionImageURL, generateImageData } = require('gatsby-plugin-image')

const { generateCloudinaryAssetUrl } = require('./generate-asset-url')
const { getAssetAsTracedSvg, getUrlAsBase64Image, getAssetMetadata } = require('./asset-data')
const { Joi } = require('gatsby-plugin-utils/joi')

const { resolverReporter } = require('./resolver-reporter')

const generateCloudinaryAssetSource = (filename, width, height, format, _fit, options) => {
    const [cloudName, publicId] = filename.split('>>>')
    const cloudinarySrcUrl = generateCloudinaryAssetUrl({
        cloudName: cloudName,
        publicId: publicId,
        width,
        height,
        format,
        options,
    })

    const imageSource = {
        src: cloudinarySrcUrl,
        width: width,
        height: height,
        format: format,
    }

    return imageSource
}

const generateMetadata = async (source, args, transformType, reporter) => {
    const schema = Joi.object({
        width: Joi.number().positive().required(),
        height: Joi.number().positive().required(),
        format: Joi.string().default('auto'),
    }).required()

    const originalMetadata = {
        width: source.originalWidth,
        height: source.originalHeight,
        format: source.originalFormat,
    }

    const { value, error } = schema.validate(originalMetadata)

    if (!error) {
        // Original metadata is valid,
        // use validated value
        return value
    } else {
        return null
    }

    try {
        // Lacking metadata, so let's fetch it
        reporter.verbose(
            `[gatsby-transformer-cloudinary] Missing metadata fields on ${transformType}: cloudName=${source.cloudName}, publicId=${source.publicId} >>> To save on network requests add originalWidth, originalHeight and originalFormat to ${transformType}`
        )

        const fetchedMetadata = await getAssetMetadata({ source, args })
        const { value, error } = schema.validate(fetchedMetadata)

        if (!error) {
            // Fetched metadata is valid,
            // use validated value
            return value
        } else {
            // Fetched metadata is not valid
            reporter.verbose(
                `[gatsby-transformer-cloudinary] Invalid fetched metadata for ${transformType}: cloudName=${source.cloudName}, publicId=${source.publicId} >>> ${error.message}`
            )
            return null
        }
    } catch (error) {
        // Error fetching
        reporter.verbose(
            `[gatsby-transformer-cloudinary] Could not fetch metadata for ${transformType}: cloudName=${source.cloudName}, publicId=${source.publicId} >>> ${error.message}`
        )
        return null
    }
}

// Make it testable
exports._generateCloudinaryAssetSource = generateCloudinaryAssetSource

exports.createResolveCloudinaryAssetData = (gatsbyUtils) => async (source, args, _context, info) => {
    let { reporter } = gatsbyUtils
    reporter = resolverReporter({ reporter, logLevel: args.logLevel })
    const transformType = info.parentType || 'UnknownTransformType'

    const schema = Joi.object({
        cloudName: Joi.string().required(),
        publicId: Joi.string().required(),
    }).required()

    const { error } = schema.validate(source, {
        allowUnknown: true,
        abortEarly: false,
    })

    if (error) {
        if (error.details.length < 2 && error.details[0].path.length > 0) {
            reporter.warn(
                `[gatsby-transformer-cloudinary] Missing required field on ${transformType}: cloudName=${source?.cloudName}, publicId=${source?.publicId} >>> gatsbyImageData will resolve to null`
            )
        } else {
            reporter.verbose(
                `[gatsby-transformer-cloudinary] Missing cloudName and publicId on ${transformType} >>> gatsbyImageData will resolve to null`
            )
        }

        return null
    }

    const metadata = await generateMetadata(source, args, transformType, reporter)

    if (!metadata) {
        reporter.warn(
            `[gatsby-transformer-cloudinary] No metadata for ${transformType}: cloudName=${source.cloudName}, publicId=${source.publicId} >>> gatsbyImageData will resolve to null`
        )
        return null
    }

    const assetDataArgs = {
        ...args,
        filename: source.cloudName + '>>>' + source.publicId,
        // Passing the plugin name allows for better error messages
        pluginName: `gatsby-transformer-cloudinary`,
        sourceMetadata: metadata,
        generateImageSource: generateCloudinaryAssetSource,
        options: args,
    }

    try {
        if (args.placeholder === 'blurred') {
            if (source.defaultBase64) {
                assetDataArgs.placeholderURL = source.defaultBase64
            } else {
                const lowResolutionUrl = getLowResolutionImageURL(assetDataArgs)
                const base64 = await getUrlAsBase64Image(lowResolutionUrl)
                assetDataArgs.placeholderURL = base64
            }
        } else if (args.placeholder === 'tracedSVG') {
            if (source.defaultTracedSVG) {
                assetDataArgs.placeholderURL = source.defaultTracedSVG
            } else {
                const tracedSvg = await getAssetAsTracedSvg({ source, args })
                assetDataArgs.placeholderURL = tracedSvg
            }
        }
    } catch (error) {
        reporter.error(
            `[gatsby-transformer-cloudinary] Could not generate placeholder (${args.placeholder}) for ${source.cloudName} > ${source.publicId}: ${error.message}`
        )
    }

    return generateImageData(assetDataArgs)
}
