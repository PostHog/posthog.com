import React from 'react'
import Link from 'components/Link'
import { IconDemoThumb, AppIcon } from 'components/OSIcons'
import { AppItem } from 'components/OSIcons/AppIcon'
import { useApp } from '../../context/App'
import { useToast } from '../../context/Toast'
import usePostHog from '../../hooks/usePostHog'

// Desktop icon definitions. Extracted into their own light module so consumers
// (e.g. the /trash page, which reconstructs trashed icons by label) can import
// the lists without pulling the entire Desktop chunk (ReactConfetti, Hedgehog
// mode, Screensaver, …) into their bundle. Re-exported from `./index` for
// backwards compatibility.

export const useProductLinks = () => {
    const { posthogInstance, openNewChat, siteSettings, updateSiteSettings } = useApp()
    const { addToast } = useToast()
    const posthog = usePostHog()

    return [
        {
            label: 'home.mdx',
            Icon: <AppIcon name="doc" />,
            url: '/',
            source: 'desktop',
        },
        {
            label: 'Products',
            Icon: <AppIcon name="notebook" />,
            url: '/products',
            source: 'desktop',
        },
        {
            label: 'Pricing',
            Icon: <AppIcon name="pricing" />,
            url: '/pricing',
            source: 'desktop',
        },
        {
            label: 'customers.mdx',
            Icon: <AppIcon name="spreadsheet" />,
            url: '/customers',
            source: 'desktop',
        },
        {
            label: 'demo.mov',
            Icon: IconDemoThumb,
            url: '/demo',
            className: 'size-14 -my-1',
            source: 'desktop',
        },
        {
            label: 'Docs',
            Icon: <AppIcon name="notebook" />,
            url: '/docs',
            source: 'desktop',
        },
        {
            label: 'Talk to a human',
            Icon: <AppIcon name="envelope" />,
            url: '/talk-to-a-human',
            source: 'desktop',
        },
        {
            label: 'Ask a question',
            Icon: <AppIcon name="forums" />,
            onClick: () => openNewChat({ path: `ask-max` }),
            source: 'desktop',
        },
        ...(posthogInstance
            ? [
                  {
                      label: 'Open app ↗',
                      Icon: <AppIcon name="computerCoffee" />,
                      url: 'https://app.posthog.com',
                      external: true,
                      source: 'desktop',
                  },
              ]
            : [
                  {
                      label: 'Sign up ↗',
                      Icon: <AppIcon name="compass" />,
                      url: 'https://app.posthog.com/signup',
                      external: true,
                      source: 'desktop',
                  },
              ]),
        {
            label: 'Switch to website mode',
            Icon: <AppIcon name="switch" />,
            onClick: () => {
                updateSiteSettings({ ...siteSettings, experience: 'boring' })
                posthog?.capture('switched site mode', {
                    value: 'website',
                    source: 'desktop',
                })
                addToast({
                    title: 'Switched to website mode',
                    description: 'Hover the logo to return to OS mode.',
                    duration: 5000,
                    onUndo: () => {
                        updateSiteSettings({ ...siteSettings, experience: 'posthog' })
                    },
                })
            },
            source: 'desktop',
        },
    ]
}

export const apps: AppItem[] = [
    {
        label: 'Why PostHog?',
        Icon: <AppIcon name="posthog" />,
        url: '/about',
        source: 'desktop',
    },
    {
        label: 'Changelog',
        Icon: <AppIcon name="invite" />,
        url: '/changelog',
        source: 'desktop',
    },
    // {
    //     label: 'Cool tech events',
    //     Icon: <AppIcon name="invite" />,
    //     url: '/events',
    //     source: 'desktop',
    // },
    {
        label: 'Company handbook',
        Icon: <AppIcon name="handbook" />,
        url: '/handbook',
        source: 'desktop',
    },
    {
        label: 'Store',
        Icon: <AppIcon name="shoppingBag" />,
        url: '/merch',
        source: 'desktop',
    },
    {
        label: 'Work here',
        Icon: <AppIcon name="typewriter" />,
        url: '/careers',
        source: 'desktop',
    },
    {
        label: 'Trash',
        Icon: <AppIcon name="trash" />,
        url: '/trash',
        source: 'desktop',
    },
]
