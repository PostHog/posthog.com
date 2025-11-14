import React from 'react'
import { IconPlusSquare } from '@posthog/icons'
import TapeButton from './TapeButton'
import CassetteTape from './CassetteTape'

export default function Mixtapes(): JSX.Element {
    const handleAddMixtape = () => {
        // TODO: Implement add mixtape functionality
    }

    return (
        <div className="flex-grow p-4 flex items-start border-l border-primary">
            <div className="grid grid-cols-2 gap-4 w-full">
                <TapeButton
                    icon={
                        <span className="flex items-center justify-center space-x-1">
                            <IconPlusSquare className="size-5" />
                            <p className="text-base m-0 font-bold underline">Create a mixtape</p>
                        </span>
                    }
                    onClick={handleAddMixtape}
                />
                <CassetteTape />
                <CassetteTape />
                <CassetteTape />
            </div>
        </div>
    )
}
