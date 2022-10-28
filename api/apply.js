/* eslint-disable @typescript-eslint/no-var-requires */
const Busboy = require('busboy')
const request = require('request')

function multipartToAshby(req) {
    return new Promise((resolve) => {
        const applicationForm = { fieldSubmissions: [] }
        const formData = {}
        const busboy = Busboy({
            headers: req.headers,
        })

        busboy.on('file', (name, filestream, file) => {
            filestream.on('data', (data) => {
                formData[name] = {
                    value: data,
                    options: {
                        filename: file.filename,
                        contentType: null,
                    },
                }
            })
        })

        busboy.on('field', (name, value) => {
            if (name === 'jobPostingId') {
                formData[name] = value
            } else {
                applicationForm.fieldSubmissions.push({
                    path: name,
                    value,
                })
            }
        })

        busboy.on('finish', () => {
            formData.applicationForm = JSON.stringify(applicationForm)
            resolve(formData)
        })

        req.pipe(busboy)
    })
}

const handler = async (req, res) => {
    const formData = await multipartToAshby(req, res)
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
