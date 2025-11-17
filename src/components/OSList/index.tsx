import React from 'react'
import Link from 'components/Link'

interface OSListItem {
  icon: React.ReactNode
  label: string
  url: string
}

interface OSListProps {
  items: OSListItem[]
  className?: string
}

export const OSList: React.FC<OSListProps> = ({ items, className = "" }) => {
  return (
    <div className={`not-prose divide-y divide-primary ${className}`}>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <Link to={item.url} className="flex items-center gap-2 p-2 font-semibold hover:underline">
            <div className="w-8">
              <div className="size-8">
                {item.icon}
              </div>
            </div>
            <div className="flex-1 line-clamp-1">
              {item.label}
            </div>
          </Link>
        </React.Fragment>
      ))}
    </div>
  )
}
