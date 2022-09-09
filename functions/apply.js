/* eslint-disable @typescript-eslint/no-var-requires */
const Busboy = require('busboy')
const request = require('request')

function multipartToAshby(event) {
    return new Promise((resolve) => {
        const applicationForm = { fieldSubmissions: [] }
        const formData = {}
        const busboy = Busboy({
            headers: event.headers,
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

        busboy.end(Buffer.from(event.body, 'base64'))
    })
}

exports.handler = async (e) => {
    const formData = await multipartToAshby(e)
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

    return {
        statusCode: 200,
        body: JSON.stringify({ submission }),
    }
}
