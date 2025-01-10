import React, { useEffect, useState } from 'react'
import Modal from 'components/Modal'
import TeamPatch from 'components/TeamPatch'
import ImageDrop, { Image } from 'components/ImageDrop'
import Select from 'components/Select'
import { CallToAction } from 'components/CallToAction'
import { IconX } from '@posthog/icons'
import { useUser } from 'hooks/useUser'

const ModalViewButton = ({
    active,
    children,
    onClick,
}: {
    active: boolean
    children: React.ReactNode
    onClick: () => void
}) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`p-2 px-6 text-sm relative -bottom-[1px] transition-opacity even:-mx-2 ${
                active
                    ? `before:absolute before:border-r before:top-0 before:h-full before:border-light dark:before:border-dark before:w-[10px] before:left-0 before:bg-accent dark:before:bg-accent-dark before:z-10
                after:absolute after:border-l after:top-0 after:h-full after:border-light dark:after:border-dark after:w-[10px] after:right-0 after:bg-accent dark:after:bg-accent-dark before:rounded-br-lg after:rounded-bl-lg before:border-b after:border-b
                bg-white dark:bg-dark font-bold`
                    : 'opacity-70 hover:opacity-100'
            }`}
        >
            {children}
        </button>
    )
}

export default function Crest({
    teamName,
    editing,
    setFieldValue,
    values,
}: {
    teamName: string
    editing: boolean
    setFieldValue: (field: string, value: any) => void
    values: any
}): JSX.Element {
    const { isModerator } = useUser()
    const [crestBuilderOpen, setCrestBuilderOpen] = useState(false)
    const [view, setView] = useState<'main' | 'mini'>('main')

    useEffect(() => {
        setView('main')
    }, [crestBuilderOpen])

    return (
        <>
            <Modal open={crestBuilderOpen} setOpen={setCrestBuilderOpen}>
                <div
                    onClick={() => setCrestBuilderOpen(false)}
                    className="flex flex-start items-start justify-center absolute w-full h-full p-4"
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="mt-28 max-w-2xl w-full relative flex flex-col rounded-md border border-border dark:border-border-dark overflow-hidden"
                    >
                        <div className="bg-accent dark:bg-accent-dark border-b border-border dark:border-border-dark flex justify-between items-center">
                            <div className="flex -mt-[1px]">
                                <ModalViewButton active={view === 'main'} onClick={() => setView('main')}>
                                    Main
                                </ModalViewButton>
                                <ModalViewButton active={view === 'mini'} onClick={() => setView('mini')}>
                                    Mini
                                </ModalViewButton>
                            </div>
                            <button onClick={() => setCrestBuilderOpen(false)} className="pr-3">
                                <IconX className="size-4 opacity-60 hover:opacity-100 transition-opacity" />
                            </button>
                        </div>
                        <div className="bg-white dark:bg-dark p-4">
                            {view === 'main' ? (
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex items-center justify-center relative group">
                                        <TeamPatch
                                            name={teamName}
                                            imageUrl={values.crestImage?.objectURL}
                                            className="h-48 md:h-80 -mt-2 md:-mt-6 mb-2 md:mb-0"
                                            {...values.crestOptions}
                                        />
                                        {!values.crestImage?.objectURL ? (
                                            <div className="absolute">
                                                <ImageDrop
                                                    className="!size-12 -ml-2"
                                                    onRemove={() => setFieldValue('crestImage', null)}
                                                    onDrop={(image) => setFieldValue('crestImage', image)}
                                                    image={values.crestImage}
                                                />
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => setFieldValue('crestImage', null)}
                                                className="group-hover:opacity-100 opacity-0 transition-opacity absolute size-8 bg-white rounded-full border border-border dark:border-dark flex items-center justify-center"
                                            >
                                                <IconX className="size-4" />
                                            </button>
                                        )}
                                    </div>

                                    <div>
                                        <form className="grid gap-2">
                                            <div className="grid grid-cols-2 gap-2 gap-x-4">
                                                <Select
                                                    className="!p-0"
                                                    options={[
                                                        { label: 'Black', value: 'black' },
                                                        { label: 'Brown', value: 'brown' },
                                                        { label: 'Navy', value: 'navy' },
                                                        { label: 'White', value: 'white' },
                                                    ]}
                                                    onChange={(value) => setFieldValue('crestOptions.textColor', value)}
                                                    value={values.crestOptions.textColor}
                                                    placeholder="Text color"
                                                />
                                                <Select
                                                    className="!p-0"
                                                    options={[
                                                        { label: 'Dark', value: 'dark' },
                                                        { label: 'Light', value: 'light' },
                                                    ]}
                                                    onChange={(value) =>
                                                        setFieldValue('crestOptions.textShadow', value)
                                                    }
                                                    value={values.crestOptions.textShadow}
                                                    placeholder="Text shadow"
                                                />
                                                <Select
                                                    className="!p-0"
                                                    options={[
                                                        { label: 'Round', value: 'round' },
                                                        { label: 'Half Round', value: 'half-round' },
                                                        { label: 'Square', value: 'square' },
                                                        { label: 'Hexagon', value: 'hexagon' },
                                                        { label: 'Oval', value: 'oval' },
                                                        { label: 'Squareish', value: 'squareish' },
                                                        { label: 'Shield', value: 'shield' },
                                                    ]}
                                                    onChange={(value) => setFieldValue('crestOptions.frame', value)}
                                                    value={values.crestOptions.frame}
                                                    placeholder="Frame style"
                                                />
                                                <Select
                                                    className="!p-0"
                                                    options={[
                                                        { label: 'Blue', value: 'blue-2' },
                                                        { label: 'Burnt Orange', value: 'burnt-orange' },
                                                        { label: 'Creamsicle', value: 'creamsicle' },
                                                        { label: 'Fuchsia', value: 'fuchsia' },
                                                        { label: 'Green', value: 'green' },
                                                        { label: 'Gold', value: 'gold' },
                                                        { label: 'Light Blue', value: 'light-blue' },
                                                        { label: 'Light Purple', value: 'light-purple' },
                                                        { label: 'Light Yellow', value: 'light-yellow' },
                                                        { label: 'Navy', value: 'navy' },
                                                        { label: 'Orange', value: 'orange' },
                                                        { label: 'Pale Blue', value: 'pale-blue' },
                                                        { label: 'Pink', value: 'pink' },
                                                        { label: 'Purple 2', value: 'purple-2' },
                                                        { label: 'Red 2', value: 'red-2' },
                                                        { label: 'Teal 2', value: 'teal-2' },
                                                    ]}
                                                    onChange={(value) =>
                                                        setFieldValue('crestOptions.frameColor', value)
                                                    }
                                                    value={values.crestOptions.frameColor}
                                                    placeholder="Frame color"
                                                />
                                                <Select
                                                    className="!p-0"
                                                    options={[
                                                        { label: 'Straight', value: 'straight' },
                                                        { label: 'Curved', value: 'curved' },
                                                        { label: 'Wavy', value: 'wavy' },
                                                        { label: 'Downward Curve', value: 'downward-curve' },
                                                        { label: 'Upward Curve', value: 'upward-curve' },
                                                        { label: 'Stepped', value: 'stepped' },
                                                    ]}
                                                    onChange={(value) => setFieldValue('crestOptions.plaque', value)}
                                                    value={values.crestOptions.plaque}
                                                    placeholder="Plaque style"
                                                />
                                                <Select
                                                    className="!p-0"
                                                    options={[
                                                        { label: 'Blue', value: 'blue-2' },
                                                        { label: 'Burnt Orange', value: 'burnt-orange' },
                                                        { label: 'Creamsicle', value: 'creamsicle' },
                                                        { label: 'Fuchsia', value: 'fuchsia' },
                                                        { label: 'Green', value: 'green' },
                                                        { label: 'Gold', value: 'gold' },
                                                        { label: 'Light Blue', value: 'light-blue' },
                                                        { label: 'Light Purple', value: 'light-purple' },
                                                        { label: 'Navy', value: 'navy' },
                                                        { label: 'Orange', value: 'orange' },
                                                        { label: 'Pale Blue', value: 'pale-blue' },
                                                        { label: 'Pink', value: 'pink' },
                                                        { label: 'Purple 2', value: 'purple-2' },
                                                        { label: 'Red 2', value: 'red-2' },
                                                        { label: 'Teal 2', value: 'teal-2' },
                                                        { label: 'White', value: 'white' },
                                                    ]}
                                                    onChange={(value) =>
                                                        setFieldValue('crestOptions.plaqueColor', value)
                                                    }
                                                    value={values.crestOptions.plaqueColor}
                                                    placeholder="Plaque color"
                                                />
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <label className="text-sm opacity-60 font-semibold block text-black dark:text-primary-dark mb-1">
                                                    Image scale
                                                </label>
                                                <input
                                                    type="range"
                                                    min="50"
                                                    max="100"
                                                    step="5"
                                                    className="w-full accent-red dark:accent-yellow"
                                                    value={values.crestOptions.imageScale}
                                                    onChange={(e) =>
                                                        setFieldValue('crestOptions.imageScale', e.target.value)
                                                    }
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 gap-2">
                                                <div className="flex flex-col gap-1">
                                                    <label className="text-sm opacity-60 font-semibold block text-black dark:text-primary-dark mb-1">
                                                        Image X offset
                                                    </label>
                                                    <input
                                                        type="range"
                                                        min="-100"
                                                        max="100"
                                                        step="5"
                                                        className="w-full accent-red dark:accent-yellow"
                                                        value={values.crestOptions.imageXOffset}
                                                        onChange={(e) =>
                                                            setFieldValue('crestOptions.imageXOffset', e.target.value)
                                                        }
                                                    />
                                                </div>
                                                <div className="flex flex-col gap-1">
                                                    <label className="text-sm opacity-60 font-semibold block text-black dark:text-primary-dark mb-1">
                                                        Image Y offset
                                                    </label>
                                                    <input
                                                        type="range"
                                                        min="-100"
                                                        max="100"
                                                        step="5"
                                                        className="w-full accent-red dark:accent-yellow"
                                                        value={values.crestOptions.imageYOffset}
                                                        onChange={(e) =>
                                                            setFieldValue('crestOptions.imageYOffset', e.target.value)
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <div className="w-full">
                                        <ImageDrop
                                            onRemove={() => setFieldValue('miniCrest', null)}
                                            onDrop={(image) => setFieldValue('miniCrest', image)}
                                            image={values.miniCrest}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Modal>

            <div className="relative">
                {isModerator ? (
                    <div className="absolute top-0 right-0 size-11">
                        {editing ? (
                            <ImageDrop
                                onRemove={() => setFieldValue('miniCrest', null)}
                                onDrop={(image) => setFieldValue('miniCrest', image)}
                                image={values.miniCrest}
                                className="!size-full bg-white rounded-full border border-border dark:border-border-dark overflow-hidden !p-2"
                            />
                        ) : values.miniCrest?.objectURL ? (
                            <div className="size-full">
                                <img
                                    src={values.miniCrest?.objectURL}
                                    className="absolute w-full h-full object-contain object-center inset-0 size-full bg-white rounded-full border border-border dark:border-border-dark overflow-hidden"
                                />
                            </div>
                        ) : null}
                    </div>
                ) : null}
                {values.crestOptions ? (
                    <div className="flex flex-col gap-2">
                        <TeamPatch
                            name={teamName}
                            imageUrl={values.crestImage?.objectURL}
                            className="h-48 md:h-80 -mt-2 md:-mt-6 mb-2 md:mb-0"
                            {...values.crestOptions}
                        />
                        {editing && (
                            <CallToAction onClick={() => setCrestBuilderOpen(true)} size="sm" type="secondary">
                                Edit crest
                            </CallToAction>
                        )}
                    </div>
                ) : editing ? (
                    <div className="size-60 border border-border dark:border-border-dark rounded-md flex items-center justify-center">
                        <CallToAction onClick={() => setCrestBuilderOpen(true)} size="sm" type="secondary">
                            Crest builder
                        </CallToAction>
                    </div>
                ) : null}
            </div>
        </>
    )
}
