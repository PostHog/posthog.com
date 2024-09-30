import { IconChevronDown } from '@posthog/icons'
import React, { useRef } from 'react'
import { useLayoutData } from '../Layout/hooks'

type CardProps = {
  top: React.ReactNode
  bottom: React.ReactNode
  Image: React.ReactNode
  ImageSize: string
  color?: string
}

const Card = ({ top, bottom, Image, ImageSize, color }: CardProps) => {
  const { enterpriseMode } = useLayoutData()
  return (
    <li
      style={{ backgroundColor: color || 'white' }}
      className="h-[400px] w-[300px] flex flex-col justify-between p-5 rounded-md relative even:rotate-3 odd:-rotate-3 flex-shrink-0 snap-center overflow-hidden md:first:ml-12 shadow-xl"
    >
      <div className={`absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 px-8 ${ImageSize}`}>
        {Image}
      </div>
      <h5 className="m-0 text-2xl text-black relative leading-7">{top}</h5>
      {!enterpriseMode && <p className="text-sm text-black m-0 relative">{bottom}</p>}
    </li>
  )
}

export default function NoHatingAllowed({ data, youllHate, size }: { data: CardProps[]; youllHate: string, size: string }) {
  const listRef = useRef<HTMLUListElement>(null)
  const { enterpriseMode } = useLayoutData()

  const getScrollDistance = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 768) return 300
      if (window.innerWidth < 1024) return 600
      return 900
    }
    return 300 // Default value if window is not available
  }

  return (
    <div className="relative my-12 overflow-hidden">
      <h2 className={`text-center mb-5 ${size}`}>
        {!enterpriseMode && <span className="text-red uppercase block md:inline">Warning:</span>} You'll{' '}
        {enterpriseMode ? <span className="text-red">LOVE</span> : 'hate'} {youllHate} if...
      </h2>
      <div className="absolute z-10 -left-10 top-64 bottom-32 w-48 bg-gradient-radial from-light/30 via-light/0 to-light/0 dark:from-dark/30 dark:via-dark/0 dark:to-dark/0" />
      <div className="absolute z-20 top-1/2 -left-6 md:left-0 -translate-y-1/2 mt-12">
        <button
          onClick={() => listRef?.current?.scrollBy({ left: -getScrollDistance(), behavior: 'smooth' })}
          className="relative hover:scale-[1.01] hover:top-[-1px] active:top-[.5px] active:scale-[.99] md:z-30 p-8"
        >
          <IconChevronDown className="w-12 h-12 rounded-sm text-primary-dark/60 hover:text-primary-dark/100 dark:text-primary/60 dark:hover:text-primary/100 rotate-90 bg-accent-dark dark:bg-accent hover:backdrop-blur-sm active:backdrop-blur-sm" />
        </button>
      </div>
      <ul
        ref={listRef}
        className="list-none m-0 p-0 flex space-x-12 w-full px-5 snap-x overflow-x-auto overflow-y-hidden py-6 lg:py-12"
      >
        {data.map((card, index) => {
          return <Card {...card} key={index} />
        })}
      </ul>
      <div className="absolute -right-10 top-64 bottom-32 w-48 bg-gradient-radial from-light/30 via-light/0 to-light/0 dark:from-dark/30 dark:via-dark/0 dark:to-dark/0" />
      <div className="absolute top-1/2 -right-6 md:right-0 -translate-y-1/2 mt-12">
        <button
          onClick={() => listRef?.current?.scrollBy({ left: getScrollDistance(), behavior: 'smooth' })}
          className="relative hover:scale-[1.01] hover:top-[-1px] active:top-[.5px] active:scale-[.99] md:z-30 p-8"
        >
          <IconChevronDown className="w-12 h-12 rounded-sm text-primary-dark/60 hover:text-primary-dark/100 dark:text-primary/60 dark:hover:text-primary/100 -rotate-90 bg-accent-dark dark:bg-accent hover:backdrop-blur-sm active:backdrop-blur-sm" />
        </button>
      </div>
    </div>
  )
}
