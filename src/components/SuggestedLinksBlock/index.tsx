import React from 'react'
import Link from 'components/Link'
import OSButton from 'components/OSButton'
import CloudinaryImage from 'components/CloudinaryImage'

interface SuggestedLink {
  title: string
  image: string
  imageAlt: string
  buttonText: string
  buttonLink: string
  imageSize: string
  imagePosition: string
}

interface SuggestedLinksBlockProps {
  links: string[]
  className?: string
}

// Master list of all available suggested links
const SUGGESTED_LINKS: Record<string, SuggestedLink> = {
  sales: {
    title: "How we (don't) do sales",
    image: "https://res.cloudinary.com/dmukukwp6/image/upload/hog_phone_638d7d1ae4.png",
    imageAlt: "Hog on the phone",
    buttonText: "Take the tour",
    buttonLink: "/sales",
    imageSize: "w-24",
    imagePosition: "-top-2"
  },
  pricing: {
    title: "Usage-based pricing",
    image: "https://res.cloudinary.com/dmukukwp6/image/upload/hog_cash_64f561fac6.png",
    imageAlt: "Hog with cash",
    buttonText: "Explore pricing",
    buttonLink: "/pricing",
    imageSize: "w-28",
    imagePosition: "-left-1"
  },
  careers: {
    title: "Want to work here?",
    image: "https://res.cloudinary.com/dmukukwp6/image/upload/hog_zilla_7414378873.png",
    imageAlt: "Hogzilla",
    buttonText: "View careers",
    buttonLink: "/careers",
    imageSize: "w-28",
    imagePosition: ""
  },
  hate: {
    title: "Will you hate PostHog?",
    image: "https://res.cloudinary.com/dmukukwp6/image/upload/commitment_issues_d433b343b5.png",
    imageAlt: "Hogzilla",
    buttonText: "Find out",
    buttonLink: "/ick",
    imageSize: "w-28",
    imagePosition: ""
  },


}

export default function SuggestedLinksBlock({ links, className = '' }: SuggestedLinksBlockProps) {
  const selectedLinks = links.map(key => SUGGESTED_LINKS[key]).filter(Boolean)
  const gridCols = `grid-cols-${selectedLinks.length}`

  return (
    <div className={`grid @xl:${gridCols} divide-y @xl:divide-y-0 gap-8 @xl:gap-0 @xl:divide-x divide-primary @xl:pt-4 ${className}`}>
      {selectedLinks.map((link, index) => (
        <div key={index} className="flex flex-col items-center gap-4 pt-8 @xl:pt-0">
          <h3>{link.title}</h3>
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 rounded-full bg-accent" />
            <CloudinaryImage
              src={link.image}
              alt={link.imageAlt}
              className={`${link.imageSize} relative ${link.imagePosition}`}
            />
          </div>
          <OSButton
            asLink
            to={link.buttonLink}
            variant="secondary"
            state={{ newWindow: true }}
            size="md"
          >
            {link.buttonText}
          </OSButton>
        </div>
      ))}
    </div>
  )
}
