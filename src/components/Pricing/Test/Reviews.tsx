import React from "react"
import { section, SectionLayout, SectionHeader, SectionColumns, SectionMainCol, SectionSidebar } from './Sections'
import { IconCheck, IconGraph, IconRewindPlay, IconToggle, IconFlask, IconMessage, IconHandMoney, IconInfo, IconRocket, IconStarFilled, IconStar } from '@posthog/icons'
import Link from "components/Link"

const Review = () => {
  return (
    <div className="space-y-4 border-t first:border-t-0 border-light dark:border-dark pt-8 first:pt-0 mb-8">
      <div>
        <p className="text-lg mb-1"><strong>"A great insights tool!"</strong></p>
        <div className="inline-grid grid-cols-5">
          <IconStarFilled className="size-5 text-yellow" />
          <IconStarFilled className="size-5 text-yellow" />
          <IconStarFilled className="size-5 text-yellow" />
          <IconStarFilled className="size-5 text-yellow" />
          <div className="relative">
            <IconStar className="size-5 text-yellow" />
            <div className="absolute left-0 top-0 w-2 overflow-hidden">
              <IconStarFilled className="size-5 text-yellow" />
            </div>
          </div>
        </div>
      </div>

      <div>
        <strong>What do you like best about PostHog?</strong>
        <p>It was easy to install and add to my Wordpress installation. I started getting insights immediately. It's been more helpful in tracking users and their behavior than Google Analytics.</p>
      </div>

      <div>
        <strong>What do you dislike about PostHog?</strong>
        <p>I had to perform so "manual" work to add this to Wordpress. Having a plugin to automatically install the tracking scripts to my Wordpress instance would have been more helpful.</p>
        <p>This adds initial loading time to my site, having a way to ideally defer loading of the scripts until later would help as well.</p>
      </div>

      <div>
        <strong>What problems is PostHog solving and how is that benefiting you?</strong>
        <p>Getting the best insights from my website</p>
      </div>
    </div>
  )
}

export const Reviews = () => {
  return (
    <section className={`${section} `}>

      <SectionHeader>
        <h3 className="mb-2">Reviews</h3>
      </SectionHeader>
      <div className="grid md:grid-cols-12 gap-12 my-6">
        <div className="col-span-3">
          <label className="block font-semibold opacity-70">Overall rating</label>
          <h3 className="mb-1">4.6</h3>
          <div className="inline-grid grid-cols-5">
            <IconStarFilled className="size-5 text-yellow" />
            <IconStarFilled className="size-5 text-yellow" />
            <IconStarFilled className="size-5 text-yellow" />
            <IconStarFilled className="size-5 text-yellow" />
            <div className="relative">
              <IconStar className="size-5 text-yellow" />
              <div className="absolute left-0 top-0 w-2 overflow-hidden">
                <IconStarFilled className="size-5 text-yellow" />
              </div>
            </div>
          </div>
          <p className="text-sm mt-2 text-opacity-75">Reviews collected by <Link href="https://www.g2.com/products/posthog/reviews" externalNoIcon>G2</Link></p>
        </div>
        <div className="col-span-9">

          <Review />
          <Review />
          <Review />

        </div>
      </div>
    </section>
  )
}
