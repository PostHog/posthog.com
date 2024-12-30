import React from 'react'
import ImageDrop, { Image } from 'components/ImageDrop'
import CloudinaryImage from 'components/CloudinaryImage'
export default function TeamImage({
    values,
    setFieldValue,
    teamImage,
    editing,
}: {
    values: any
    setFieldValue: (field: string, value: any) => void
    teamImage: any
    editing: boolean
}): JSX.Element | null {
    const handleDrop = (image: Image) => {
        setFieldValue('teamImage', image)
    }

    return !!teamImage?.image?.data || editing ? (
        <figure className="rotate-2 max-w-sm w-full flex flex-col gap-2 mt-8 md:mt-0 ml-auto">
            <div className="bg-accent flex justify-center items-center shadow-xl border-8 border-white rounded-md">
                {editing ? (
                    <div className="w-96">
                        <ImageDrop
                            onRemove={() => setFieldValue('teamImage', null)}
                            onDrop={handleDrop}
                            image={values.teamImage}
                        />
                    </div>
                ) : (
                    <CloudinaryImage src={teamImage?.image?.data?.attributes?.url} className="" />
                )}
            </div>
            {editing ? (
                <input
                    name="teamImageCaption"
                    onChange={(e) => setFieldValue('teamImageCaption', e.target.value)}
                    value={values.teamImageCaption}
                    placeholder="Caption"
                    className="p-2 text-[13px] rounded-md bg-white dark:bg-accent-dark border border-border dark:border-dark"
                />
            ) : (
                <div className="text-right text-[13px] mr-2">{teamImage?.caption}</div>
            )}
        </figure>
    ) : null
}
