import Chip from 'components/Chip'
import React from 'react'
import { BlogCategories, CategoryInterface } from '../constants/categories'

export function BlogCategoriesList({ activeSlug = 'blog' }: { activeSlug?: string }): JSX.Element {
    return (
        <div className="flex justify-center mb-4">
            <div className="flex flex-nowrap space-x-2 overflow-x-auto pb-1 px-2 default-scrollbar">
                {BlogCategories.filter((cat) => !cat.hideFromNavigation).map((category: CategoryInterface) => {
                    const isActive = category.slug === activeSlug
                    return (
                        <Chip className="whitespace-nowrap" href={category.link} key={category.slug} active={isActive}>
                            {category.title}
                        </Chip>
                    )
                })}
            </div>
        </div>
    )
}
