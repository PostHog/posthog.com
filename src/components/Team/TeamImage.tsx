import React from 'react'
import ImageDrop, { Image } from 'components/ImageDrop'
import CloudinaryImage from 'components/CloudinaryImage'
export default function TeamImage({
    values,
    setFieldValue,
    teamImage,
    editing,
    polaroidSrc,
}: {
    values: any
    setFieldValue: (field: string, value: any) => void
    teamImage: any
    editing: boolean
    polaroidSrc?: `https://res.cloudinary.com/${string}`
}): JSX.Element | null {
    const handleDrop = (image: Image) => {
        setFieldValue('teamImage', image)
    }

    return polaroidSrc || teamImage?.image?.data || editing ? (
        <figure className="rotate-2 max-w-md w-full flex flex-col gap-2 mx-auto @2xl/reader-content:mr-0">
            <div
                className={`flex justify-center items-center ${
                    polaroidSrc ? '' : 'bg-accent shadow-xl border-8 border-white rounded-md'
                }`}
            >
                {editing && !polaroidSrc ? (
                    <div className="w-96">
                        <ImageDrop
                            onRemove={() => setFieldValue('teamImage', null)}
                            onDrop={handleDrop}
                            image={values.teamImage}
                        />
                    </div>
                ) : (
                    <CloudinaryImage src={polaroidSrc ?? teamImage?.image?.data?.attributes?.url} className="" />
                )}
            </div>
            {editing ? (
                <input
                    name="teamImageCaption"
                    onChange={(e) => setFieldValue('teamImageCaption', e.target.value)}
                    value={values.teamImageCaption}
                    placeholder="Caption"
                    className="p-2 text-[13px] rounded-md bg-white dark:bg-accent-dark border border-input"
                />
            ) : (
                <div className="text-right text-[13px] mr-2">{teamImage?.caption}</div>
            )}
        </figure>
    ) : null
}
