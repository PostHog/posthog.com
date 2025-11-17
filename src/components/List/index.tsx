import Link from 'components/Link'
import React, { useEffect, useState } from 'react'
import * as NewIcons from '@posthog/icons'

interface IItem {
    label: string | React.ReactNode
    icon?: string
    image?: string
    url: string
    badge?: string
    iconColor?: string
    description?: string
    lineClamp?: number
    children?: IItem[]
}

export const ListItem = ({
    label,
    image,
    url,
    badge,
    icon,
    iconColor,
    description,
    lineClamp = 1,
    children,
}: IItem): JSX.Element => {
    const Icon = icon && NewIcons[icon]
    const [open, setOpen] = useState(false)
    const ref = React.useRef<HTMLLIElement>(null)

    const handleClick = (e) => {
        if (children) {
            e.preventDefault()
            setOpen(!open)
        }
    }

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener('click', handleClick)
        return () => document.removeEventListener('click', handleClick)
    }, [])

    return (
        <li ref={ref} className="relative">
            <Link
                onClick={handleClick}
                to={url}
                className={`group flex justify-between items-center space-x-2 relative rounded border border-b-3 border-transparent hover:border hover:translate-y-[-1px] active:translate-y-[1px] active:transition-all !text-inherit hover:!text-inherit`}
            >
                <span className="flex items-center space-x-2">
                    {image && <img className="icon size-8 rounded-sm" src={image} />}
                    {Icon && (
                        <Icon
                            className={`size-8 ${
                                iconColor ? `text-${iconColor} bg-${iconColor} bg-opacity-20` : `bg-accent`
                            }  rounded-sm shrink-0`}
                        />
                    )}

                    <span className="grid">
                        <span className="overflow-hidden text-ellipsis whitespace-nowrap">{label}</span>
                        {description && (
                            <span className={`text-sm font-normal opacity-60 line-clamp-${lineClamp}`}>
                                {description}
                            </span>
                        )}
                    </span>
                </span>
                {badge && (
                    <span className="inline-flex px-2 items-center text-[12px] uppercase text-muted">{badge}</span>
                )}
                {children && (
                    <NewIcons.IconChevronDown className={`w-7 h-7 transition-transform ${open ? 'rotate-180' : ''}`} />
                )}
            </Link>
            {children && open && (
                <ul className="list-none m-0 py-1 px-0 border border-input rounded-md absolute w-full z-10 bg-accent">
                    {children.map((item) => (
                        <li key={`${label}-${item.name}`}>
                            <Link
                                className="!text-inherit opacity-70 hover:opacity-100 transition-opacity py-1 px-4 inline-block"
                                to={item.url}
                            >
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </li>
    )
}

export default function List({ items, className }: { items: IItem[]; className?: string }) {
    return (
        <ul className={`list-none m-0 p-0 ${className}`}>
            {items.map((item, index) => (
                <ListItem key={index} {...item} />
            ))}
        </ul>
    )
}
