import { IconX } from '@posthog/icons'
import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

type Image = {
    file: File
    objectURL: string
}

export default function ImageDrop({
    image,
    onDrop,
    onRemove,
}: {
    image?: Image
    onDrop: (image: Image) => void
    onRemove: () => void
}): JSX.Element {
    const handleDrop = useCallback(
        async (acceptedFiles) => {
            const file = acceptedFiles[0]
            onDrop({
                file,
                objectURL: URL.createObjectURL(file),
            })
        },
        [image]
    )

    const { getRootProps, getInputProps, open } = useDropzone({
        onDrop: handleDrop,
        noClick: true,
        noKeyboard: true,
        multiple: false,
        accept: { 'image/png': ['.png'], 'image/jpeg': ['.jpg', '.jpeg'] },
    })

    return (
        <div className="relative h-[200px] w-full bg-border/20 group" {...getRootProps()}>
            <input className="hidden" {...getInputProps()} />
            <button className="w-full h-full flex justify-center items-center" type="button" onClick={() => open()}>
                {image ? (
                    <img
                        className="absolute w-full h-full object-contain object-center inset-0"
                        src={image.objectURL}
                    />
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-10 h-10 text-black/50 dark:text-white/50"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                        />
                    </svg>
                )}
            </button>
            {image && (
                <div className="hidden group-hover:flex absolute h-full w-full inset-0 bg-border/70 justify-center items-center z-10">
                    <button
                        type="button"
                        className="p-2 border border-black/50 rounded-full bg-white"
                        onClick={onRemove}
                    >
                        <IconX className="w-5 h-5 text-black/50" />
                    </button>
                </div>
            )}
        </div>
    )
}
