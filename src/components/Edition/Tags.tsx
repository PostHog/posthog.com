import { navigate } from 'gatsby'
import React, { useContext } from 'react'
import { PostsContext } from './Posts'
import * as Icons from '@posthog/icons'

const Tag = ({ name, active, onClick, icon, color }) => {
    const Icon = Icons[icon]
    return (
        <li className="relative hover:scale-[1.02] active:top-[.5px] active:scale-[.99] snap-start">
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
        </li>
    )
}

export default function Tags() {
    const { activeMenu, tag, setTag, setRoot } = useContext(PostsContext)
    return activeMenu?.children?.length > 0 ? (
        <div className="-mx-4 px-4 md:-mx-8 md:px-8 xl:-mx-12 xl:px-12 border-y my-4 py-2 overflow-y-hidden overflow-x-auto border-light dark:border-border-dark">
            <ul className="list-none p-0 flex gap-x-1 snap-x   ">
                <Tag
                    icon="IconRocket"
                    color="purple"
                    name="All"
                    active={!tag}
                    onClick={() => {
                        setRoot(activeMenu?.url === '/posts' ? undefined : activeMenu?.url?.split('/')[1])
                        setTag(undefined)
                        navigate(activeMenu?.url)
                    }}
                />
                {activeMenu?.children?.map((menuItem, index) => {
                    return (
                        <Tag
                            key={`${menuItem.name}-${index}`}
                            active={tag === menuItem.name}
                            {...menuItem}
                            onClick={() => {
                                setTag(menuItem.name)
                                navigate(menuItem.url)
                            }}
                        />
                    )
                })}
            </ul>
        </div>
    ) : null
}
