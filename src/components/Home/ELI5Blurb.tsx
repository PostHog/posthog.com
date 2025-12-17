import React, { useEffect, useState } from 'react'
import usePostHog from 'hooks/usePostHog'
import { CallToAction } from "components/CallToAction"
import OSButton from "components/OSButton"
import CloudinaryImage from "components/CloudinaryImage"

const eli5Content = {
  control: '',
  test: 'content-placeholder',
}

export default function ELI5Blurb(): JSX.Element {
  const posthog = usePostHog()
  const [content, setContent] = useState<string>(eli5Content.control)
  const [ready, setReady] = useState<boolean>(false)

  useEffect(() => {
    try {
      const ffVariant = posthog?.getFeatureFlag?.('home-tagline')
      if (ffVariant) {
        setContent(eli5Content[ffVariant as keyof typeof eli5Content])
      }
    } catch (error) {
      console.error('Error getting feature flag for home tagline', error)
    } finally {
      setReady(true)
    }
  }, [posthog])

  // Only render content if it exists (test variant)
  if (!content) {
    return null
  }

  return (
    <div data-scheme="secondary" className={`${ready ? 'opacity-100' : 'opacity-0'} bg-primary border border-primary rounded mt-8 px-4 py-3 flex flex-col gap-2 @xl:flex-row @xl:justify-between @xl:items-center pr-20 relative text-sm @xl:text-unset`}>
      <div>
        Trying to understand what PostHog is all about?
      </div>
      <aside>
        <OSButton asLink to="/posthog-101" variant="secondary" size="md" state={{ newWindow: true }}>PostHog 101</OSButton>
      </aside>
      <CloudinaryImage src="https://res.cloudinary.com/dmukukwp6/image/upload/confused_d261ceaaf8.png" width={71} className="absolute right-0 bottom-0" />
    </div>
  )
}
