/* eslint-disable @typescript-eslint/no-var-requires */
const request = require('request')
const multiparty = require('multiparty')
const fs = require('fs')

const handler = async (req, res) => {
    const form = new multiparty.Form()
    const formData = await new Promise((resolve, reject) => {
        form.parse(req, function (err, fields, files) {
            if (err) reject({ err })
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
        request(options, function (err, res) {
            if (err) throw new Error(err)
            resolve(res.body)
        })
    })

    res.status(200).json({ submission })
}

export default handler

export const config = {
    api: {
        bodyParser: false,
    },
}
