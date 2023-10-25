import React, { useState } from 'react'

async function uploadFile(fileName: string, file: File): Promise<void> {
    return new Promise((resolve, reject) => {
        const upload = new tus.Upload(file, {
            endpoint: 'https://lkmbdqgomhvlbqqblkga.supabase.co/storage/v1/upload/resumable',
            retryDelays: [0, 3000, 5000, 10000, 20000],
            headers: {
                // Supabase anon key
                authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxrbWJkcWdvbWh2bGJxcWJsa2dhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTgyMzM2MTMsImV4cCI6MjAxMzgwOTYxM30.TndT-c0Ae2EyV2Fp0w5nFf2jhOrGXThsMcM9VNi6DWM`,
            },
            uploadDataDuringCreation: true,
            removeFingerprintOnSuccess: false,
            metadata: {
                bucketName: 'videos',
                objectName: fileName,
                contentType: 'video/webm',
                cacheControl: '3600',
            },
            chunkSize: 6 * 1024 * 1024, // NOTE: it must be set to 6MB (for now) do not change it
            onError: function (error) {
                console.log('Failed because: ' + error)
                reject(error)
            },
            onProgress: function (bytesUploaded, bytesTotal) {
                const percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2)
                console.log(bytesUploaded, bytesTotal, percentage + '%')
            },
            onSuccess: function () {
                console.log('Download %s from %s', upload.url)
                resolve()
            },
        })

        // Check if there are any previous uploads to continue.
        return upload.findPreviousUploads().then(function (previousUploads) {
            // Found previous uploads so we select the first one.
            if (previousUploads.length) {
                upload.resumeFromPreviousUpload(previousUploads[0])
            }

            // Start the upload
            upload.start()
        })
    })
}

const FileUploader: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [uploading, setUploading] = useState(false)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0])
        }
    }

    const handleUploadClick = async () => {
        if (selectedFile) {
            setUploading(true)
            try {
                await uploadFile(selectedFile.name, selectedFile)
                alert('File uploaded successfully!')
            } catch (error) {
                alert('Error uploading file: ' + error)
                console.log(error)
            } finally {
                setUploading(false)
            }
        } else {
            alert('Please select a file to upload.')
        }
    }

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUploadClick} disabled={uploading}>
                {uploading ? 'Uploading...' : 'Upload'}
            </button>
        </div>
    )
}

export default FileUploader
