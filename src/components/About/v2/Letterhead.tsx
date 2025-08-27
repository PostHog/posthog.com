import React from 'react'
import Link from 'components/Link'
import { IconXNotTwitter } from 'components/OSIcons'
import Logo from 'components/Logo'
import CloudinaryImage from 'components/CloudinaryImage'
import { useApp } from '../../../context/App'

export const Letterhead = () => {
    const { siteSettings } = useApp()

    return (
        <div className="not-prose border-b border-primary py-4 flex items-center justify-between">
            <div>
                <Logo className="inline-block" fill={siteSettings.theme === 'dark' ? 'white' : undefined} />
            </div>
            <aside className="flex gap-2 items-center">
                <div>
                    <Link
                        to="/community/profiles/27732"
                        state={{ newWindow: true }}
                        className="inline-block aspect-square size-16 rounded-full overflow-hidden bg-yellow"
                    >
                        <CloudinaryImage
                            alt="James Hawkins"
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/v1738943658/James_H_5cb4c53d9a.png"
                        />
                    </Link>
                </div>
                <div className="flex flex-col gap-0 leading-none">
                    <div className="uppercase text-xs tracking-wider text-center text-muted pb-0.5">From the desk of</div>
                    <strong>James Hawkins</strong>
                    <span className="text-secondary text-sm">Co-founder</span>
                    <div>
                        <IconXNotTwitter className="inline-block size-4" />
                        <Link to="https://x.com/james406" external className="text-sm">
                            james406
                        </Link>
                    </div>
                </div>
            </aside>
        </div>
    )
}
