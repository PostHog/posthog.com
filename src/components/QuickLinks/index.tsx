import { useLayoutData } from 'components/Layout/hooks'
import List from 'components/List'
import { groupMenuItems } from 'lib/utils'
import React from 'react'

export default function QuickLinks({ items }) {
    const { compact } = useLayoutData()
    const groupedMenuItems = compact && groupMenuItems(items)
    return compact ? (
        Object.keys(groupedMenuItems).map((key) => {
            return (
                <>
                    <h3 className="mt-0 text-xl">{key}</h3>
                    <List
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mb-6"
                        items={groupedMenuItems[key]
                            .filter(({ url }) => url)
                            .map(({ url, name, icon, color }) => ({ label: name, url, icon, iconColor: color }))}
                    />
                </>
            )
        })
    ) : (
        <>
            <h3 className="mt-0 text-xl">Quick links</h3>
            <List
                className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-6"
                items={items
                    .filter(({ url }) => url)
                    .map(({ url, name, icon, color }) => ({ label: name, url, icon, iconColor: color }))}
            />
        </>
    )
}
