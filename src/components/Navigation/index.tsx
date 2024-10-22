import CloudinaryImage from 'components/CloudinaryImage'
import Link from 'components/Link'
import Logo from 'components/Logo'
import { layoutLogic } from '../../logic/layoutLogic'
import { useValues } from 'kea'
import * as icons from '@posthog/icons'
import { useLocation } from '@reach/router'
import { CallToAction } from 'components/CallToAction'
import { useLayoutData } from 'components/Layout/hooks'
import { SignupCTA } from 'components/SignupCTA'
import Toggle from 'components/Toggle'
import HoverTooltip from 'components/Tooltip'
import dayjs from 'dayjs'
import usePostHog from 'hooks/usePostHog'
import { useUser } from 'hooks/useUser'
import React, { useEffect, useRef, useState } from 'react'
import { useSearch } from 'components/Search/SearchContext'
import menu from '../../navs/index'

const ActiveBackground = ({ mobile = false }) => {
  return (
    <span
      className={`bg-light dark:bg-dark absolute w-full h-[calc(100%+1px)] left-0 inset-0
              before:absolute before:border-r before:top-0 before:h-full before:border-light dark:before:border-dark before:w-[10px] before:left-0 before:bg-accent dark:before:bg-accent-dark before:z-10
              after:absolute after:border-l after:top-0 after:h-full after:border-light dark:after:border-dark after:w-[10px] after:right-0 after:bg-accent dark:after:bg-accent-dark ${mobile
          ? 'before:rounded-tr-lg after:rounded-tl-lg top-[-1px] before:border-t after:border-t'
          : 'before:rounded-br-lg after:rounded-bl-lg before:border-b after:border-b'
        }`}
    >
      <span
        className={`absolute ${mobile ? 'top-0' : 'bottom-0'
          } left-0 border-b border-bg-light dark:border-bg-dark w-full`}
      />
    </span>
  )
}


const Navigation: React.FC<{ className?: string }> = ({ className }) => {
  const { user } = useUser()
  const { open } = useSearch()
  const {
    menu,
    parent,
    internalMenu,
    activeInternalMenu,
    fullWidthContent,
    setFullWidthContent,
    enterpriseMode,
    setEnterpriseMode,
    theoMode,
    setTheoMode,
    post,
  } = useLayoutData()
  const { pathname } = useLocation()
  const { websiteTheme } = useValues(layoutLogic)
  const [posthogInstance, setPosthogInstance] = useState<string>()
  const [mediaModalOpen, setMediaModalOpen] = useState(false)
  const posthog = usePostHog()
  const [openAccordions, setOpenAccordions] = useState<string[]>(['Products'])

  useEffect(() => {
    const currentPath = pathname
    const openSections = menu.flatMap(item =>
      item.children?.flatMap((child: any) => {
        if (currentPath.startsWith(child.url)) {
          return [item.name, child.name]
        }
        return child.children?.some((grandchild: any) => currentPath.startsWith(grandchild.url))
          ? [item.name, child.name]
          : []
      }) || []
    )

    setOpenAccordions(prev => Array.from(new Set([...prev, ...openSections])))
  }, [pathname])

  const toggleAccordion = (name: string) => {
    setOpenAccordions(prev =>
      prev.includes(name) ? prev.filter(item => item !== name) : [...prev, name]
    )
  }

  const renderMenuItem = (item: any, depth = 0) => {
    const hasChildren = item.children && item.children.length > 0
    const isOpen = openAccordions.includes(item.name)
    const IconComponent = depth > 0 && item.icon ? icons[item.icon as keyof typeof icons] : null
    const isActive = pathname === item.url || pathname.startsWith(item.url + '/')

    return (
      <li key={item.name} className={`ml-${depth * 2}`}>
        <div className="flex items-center px-1">
          {hasChildren ? (
            <button
              onClick={() => toggleAccordion(item.name)}
              className="flex items-center justify-between w-full p-1 hover:bg-accent dark:hover:bg-accent-dark rounded text-sm"
            >
              <span className="flex items-center gap-1">
                {IconComponent && <IconComponent className={`size-5 text-${item.color || 'current'}`} />}
                {item.name}
              </span>
              {isOpen ? <icons.IconMinus className="size-4" /> : <icons.IconPlus className="size-4" />}
            </button>
          ) : (
            <Link
              to={item.url}
              className={`w-full flex items-center gap-1 text-sm py-1 px-1 rounded hover:bg-accent dark:hover:bg-accent-dark ${isActive ? 'font-bold bg-accent dark:bg-accent-dark' : ''
                }`}
            >
              {IconComponent && <IconComponent className={`size-5 text-${item.color || 'current'}`} />}
              <span>{item.name}</span>
            </Link>
          )}
        </div>
        {hasChildren && (
          <ul className={`p-0 m-0 mt-px space-y-px list-none overflow-hidden transition-all duration-100 ease-in-out ${isOpen ? 'max-h-[1000px] opacity-300 mb-2' : 'max-h-0 opacity-0'}`}>
            {item.children.map((child: any) => renderMenuItem(child, depth + 1))}
          </ul>
        )}
      </li>
    )
  }

  return (
    <nav className={className}>
      <Link className="flex justify-center p-1 rounded hover:bg-accent dark:hover:bg-accent-dark grow-0 shrink-0 basis-[auto] dark:text-primary-dark relative mb-2" to="/">
        {pathname === '/' && <ActiveBackground />}
        {enterpriseMode ? (
          <CloudinaryImage src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/MainNav/posthog-tm.png" className="h-6 mx-6" />
        ) : (
          <Logo
            color={websiteTheme === 'dark' && 'white'}
            className="h-[24px] fill-current relative px-2 box-content"
          />
        )}
      </Link>

      <ul className="p-0 m-0 list-none">
        {menu.map(item => renderMenuItem(item))}
      </ul>
    </nav>
  );
};

export default Navigation;
