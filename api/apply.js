/* eslint-disable @typescript-eslint/no-var-requires */
const request = require('request')
const multiparty = require('multiparty')
const fs = require('fs')

const submitApplication = async (req) => {
    const form = new multiparty.Form()
    const formData = await new Promise((resolve, reject) => {
        form.parse(req, function (err, fields, files) {
            if (err) return reject(err)

            try {
                const fieldSubmissions = []
                Object.keys(fields).forEach((key) => {
                    if (key !== 'jobPostingId') {
                        fieldSubmissions.push({
                            path: key,
                            value: fields[key][0],
                        })
                    }
                })
                const resumeKey = Object.keys(files)[0]
                const file = files[resumeKey][0]
                const data = {
                    applicationForm: JSON.stringify({ fieldSubmissions }),
                    jobPostingId: fields['jobPostingId'][0],
                    [resumeKey]: {
                        value: fs.createReadStream(file.path),
                        options: {
                            filename: file.originalFilename,
                            contentType: null,
                        },
                    },
                }

                resolve(data)
            } catch (error) {
                reject(error)
            }
        })
    })
    const options = {
        method: 'POST',
        url: 'https://api.ashbyhq.com/applicationForm.submit',
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Basic ${Buffer.from(`${process.env.ASHBY_API_KEY}:`).toString('base64')}`,
        },
        formData,
    }
    const submission = await new Promise((resolve, reject) => {
        request(options, function (err, response) {
            if (err) return reject(err)

            // request() only reports transport failures through err; an Ashby HTTP 4xx/5xx
            // arrives as a normal response. Reject on those so the handler logs and answers a
            // matching status, instead of passing an error body through as a 200. The status
            // alone is enough — the body can quote candidate input, so it is left out.
            if (response.statusCode < 200 || response.statusCode >= 300) {
                return reject(new Error(`Ashby responded with status ${response.statusCode}`))
            }

            try {
                resolve(JSON.parse(response.body))
            } catch (error) {
                reject(error)
            }
        })
    })

    return submission
}

const handler = async (req, res) => {
    try {
        res.status(200).json(await submitApplication(req))
    } catch (error) {
        console.error('Job application submission failed:', error)
        res.status(500).json({ success: false, error: 'Failed to submit application' })
    }
}

export default handler

export const config = {
    api: {
        bodyParser: false,
    },
}
