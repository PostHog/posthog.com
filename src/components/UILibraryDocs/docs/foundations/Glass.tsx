import React from 'react'
import { SearchInput } from 'components/UI/SearchInput'

export default function Glass(): JSX.Element {
    return (
        <div className="flex h-36 items-center justify-center rounded-[8px] bg-[linear-gradient(135deg,theme(colors.orange)_0%,theme(colors.brand.purple.DEFAULT)_55%,theme(colors.brand.blue.DEFAULT)_100%)] p-4">
            <SearchInput appearance="floating" aria-label="Search over a photo" placeholder="Search" className="w-64" />
        </div>
    )
}
