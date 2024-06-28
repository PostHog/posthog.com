import React, { useState, useRef } from 'react';
import { IconGraph, IconRewindPlay, IconToggle, IconFlask, IconMessage, IconMinus, IconPlus } from '@posthog/icons'
import { motion } from 'framer-motion'

export const tiers = [
  {
    icon: <IconGraph className="text-blue" />,
    title: 'Analytics',
    startsAt: <><strong className="text-sm">$0.00031</strong><span className="opacity-60 text-[13px]">/event (or cheaper)</span></>,
    children: (
      <>
        content
      </>
    )
  },
  {
    icon: <IconRewindPlay className="text-yellow" />,
    title: 'Session replay',
    startsAt: <><strong className="text-sm">$0.0050</strong><span className="opacity-60 text-[13px]">/recording</span></>,
    children: (
      <>
        content
      </>
    )
  },
  {
    icon: <IconToggle className="text-seagreen" />,
    title: 'Feature flags',
    startsAt: <><strong className="text-sm">$0.0001</strong><span className="opacity-60 text-[13px]">/recording</span></>,
    children: (
      <>
        content
      </>
    )
  },
  {
    icon: <IconFlask className="text-purple" />,
    title: 'A/B testing',
    children: (
      <>
        content
      </>
    )
  },
  {
    icon: <IconMessage className="text-salmon" />,
    title: 'Surveys',
    startsAt: <><strong className="text-sm">$0.2000</strong><span className="opacity-60 text-[13px]">/response</span></>,
    children: (
      <>
        content
      </>
    )
  }

]

const AccordionItem = ({
  icon,
  title,
  startsAt = '',
  description,
  children,
  isOpen,
  onClick,
  onAnimationComplete,
}) => {
  const contentRef = useRef(null)

  return (
    <li
      className={`border-t relative ${isOpen
        ? 'active border-transparent bg-white dark:bg-accent-dark rounded shadow-lg z-10 overflow-hidden'
        : 'inactive border-light dark:border-dark first:border-transparent'
        }`}
    >
      <button
        onClick={onClick}
        className={`text-left pl-3 pr-4 cursor-pointer w-full flex justify-between items-center transition-all rounded relative ${isOpen
          ? 'pt-4 pb-2 z-20'
          : 'text-primary/90 hover:text-primary/100 dark:text-primary-dark/90 dark:hover:text-primary-dark/100 py-2 hover:bg-accent/80 dark:hover:bg-accent/5 hover:scale-[1.0025] hover:top-[-.5px] active:scale-[.9999] active:top-[3px]'
          }`}
      >
        <div className="grid grid-cols-12 w-full gap-1 items-center">
          <div className="col-span-5">
            <div className="flex gap-1 items-center">
              <div className={isOpen ? 'size-6' : 'size-5'}>{icon}</div>
              <span
                className={`transition-all leading-tight font-bold ${isOpen ? 'text-base md:text-[17px]' : 'text-[15px] md:text-base'
                  }`}
              >
                {title}
              </span>
            </div>
          </div>
          <div className="col-span-6">
            <span>
              {startsAt}
            </span>
          </div>
          <span>
            {isOpen ? (
              <IconMinus className="size-4 inline-block transform rotate-180" />
            ) : (
              <IconPlus className="size-4 inline-block transform rotate-0" />
            )}
          </span>
        </div>

      </button>
      <motion.div
        onAnimationComplete={onAnimationComplete}
        ref={contentRef}
        animate={{ height: isOpen ? 'auto' : 0, transition: { duration: 0.3, type: 'tween' } }}
        className={isOpen ? '' : 'overflow-hidden'}
      >
        <div className="px-4 pb-4">
          {children}
        </div>
      </motion.div>
    </li>
  )
}

export const Accordion = ({ items }) => {
  const ref = useRef<HTMLOListElement>(null)
  const [openIndex, setOpenIndex] = useState(null)

  const scrollToIndex = (index) => {
    if (ref.current && window.innerWidth <= 639) {
      const element = ref.current.children[index]
      const y = element.getBoundingClientRect().top + window.scrollY - 56
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  return (
    <ol ref={ref} className="space-y-px p-0 list-none">
      {items.map((item, index) => (
        <AccordionItem
          onAnimationComplete={({ height }) => {
            if (height === 'auto') {
              scrollToIndex(index)
            }
          }}
          key={index}
          icon={item.icon}
          title={item.title}
          startsAt={item.startsAt}
          isOpen={openIndex === index}
          onClick={() => {
            setOpenIndex(openIndex === index ? null : index)
          }}
        >
          {item.children}
        </AccordionItem>
      ))}
    </ol>
  )
}