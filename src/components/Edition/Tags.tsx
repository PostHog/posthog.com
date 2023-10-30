import { navigate } from 'gatsby'
import React, { useContext } from 'react'
import { PostsContext } from './Posts'
import * as Icons from '@posthog/icons'
import Slider from 'components/Slider'

const Tag = ({ name, active, onClick, icon, color }) => {
    const Icon = Icons[icon]
    return (
        <div className="h-full relative hover:scale-[1.02] active:top-[.5px] active:scale-[.99] snap-start">
            <button
                onClick={onClick}
                className={`flex flex-col items-center text-center w-24 px-4 h-full py-2 rounded gap-2 hover:bg-border/30 hover:dark:bg-border/30 ${
                    active ? 'font-bold ' : ''
                }`}
            >
                {Icon && (
                    <span
                        className={`rounded-full p-2 w-12 h-12 flex items-center justify-center ${
                            active ? `bg-${color} text-white` : `bg-${color}/10 text-${color}`
                        }`}
                    >
                        <Icon className="w-6" />
                    </span>
                )}
                <span className={`text-[13px] leading-tight ${Icon ? '' : 'mt-auto'}`}>{name}</span>
            </button>
        </div>
    )
}

export default function Tags() {
    const { activeMenu, tag, setTag, setRoot } = useContext(PostsContext)
    return activeMenu?.children?.length > 0 ? (
        <div className="-mx-4 pl-2 pr-4 md:-mx-8 md:pl-2 md:pr-4 2xl:-mx-12 2xl:pl-2 2xl:pr-4 border-y my-4 py-2 border-light dark:border-dark">
            <Slider>
                {[
                    {
                        name: 'All',
                        icon: 'IconRocket',
                        color: 'purple',
                        onClick: () => {
                            setRoot(activeMenu?.url === '/posts' ? undefined : activeMenu?.url?.split('/')[1])
                            setTag(undefined)
                            navigate(activeMenu?.url)
                        },
                        active: !tag,
                    },
                    ...activeMenu?.children,
                ].map((menuItem, index) => {
                    return (
                        <Tag
                            key={`${menuItem.name}-${index}`}
                            active={menuItem.active || (tag && (tag === menuItem.tag || tag === menuItem.name))}
                            {...menuItem}
                            onClick={() => {
                                if (menuItem.onClick) {
                                    menuItem.onClick()
                                } else {
                                    setTag(menuItem.tag || menuItem.name)
                                    navigate(menuItem.url)
                                }
                            }}
                        />
                    )
                })}
            </Slider>
        </div>
    ) : null
}
