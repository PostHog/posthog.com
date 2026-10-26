import React from 'react'
import { SearchInput } from 'components/UI/SearchInput'
import { Card } from 'components/UI/Card'

const imageLight =
    'https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/Clean_Shot_2025_09_09_at_17_05_35_2x_42e293fddd.png'
const imageDark =
    'https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/Clean_Shot_2025_09_09_at_17_05_50_2x_8d74438a4a.png'

export default function Appearances(): JSX.Element {
    return (
        <div className="flex flex-col gap-6">
            <div className="grid gap-6 @2xl:grid-cols-3">
                <div className="flex flex-col gap-2">
                    <span className="text-sm font-bold">Inset (default)</span>
                    <SearchInput aria-label="Search docs" placeholder="Search docs" />
                </div>
                <div className="flex flex-col gap-2">
                    <span className="text-sm font-bold">Soft</span>
                    <Card.Root padding="sm">
                        <SearchInput appearance="soft" aria-label="Search members" placeholder="Search members" />
                    </Card.Root>
                </div>
                <div className="flex flex-col gap-2">
                    <span className="text-sm font-bold">Pill</span>
                    <SearchInput appearance="pill" aria-label="Search insights" placeholder="Search insights" />
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <span className="text-sm font-bold">Floating</span>
                <div className="relative h-48 overflow-hidden rounded-md border border-[rgb(var(--text-primary)/0.12)]">
                    <img
                        src={imageLight}
                        alt=""
                        className="m-0 block size-full object-cover object-left-top dark:hidden"
                    />
                    <img
                        src={imageDark}
                        alt=""
                        className="m-0 hidden size-full object-cover object-left-top dark:block"
                    />
                    <div className="absolute inset-x-0 top-4 flex justify-center px-4">
                        <SearchInput
                            appearance="floating"
                            aria-label="Search this dashboard"
                            placeholder="Search this dashboard"
                            className="max-w-sm"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
