import CloudinaryImage from 'components/CloudinaryImage'
import React, { useState, useRef } from 'react'
import InterviewProcess from 'components/Job/InterviewProcess'
import { StaticImage } from 'gatsby-plugin-image'

export const InterviewProcessOverview = () => {
  return (
    <div className="px-4 max-w-7xl mx-auto my-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        <div className="flex flex-col justify-between">
          <div>
            <div className="opacity-60 mb-2">Interview process</div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-2">Get paid to try working here</h2>
            <p className="max-w-md">We do 2-3 short interviews, then pay you to do some real-life (or close to real-life) work.</p>
          </div>

          <div className="md:pr-12 md:-ml-4 inline-block -rotate-1 md:rotate-0">
            <CloudinaryImage quality={90} placeholder="blurred" src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/images/sales/posthog-ae.png" width={872} height={476} alt="You in the interview process" className="w-full" />
            <p className="font-medium pl-4 mb-0 text-sm text-center">POV: We're excited to meet you!</p>

          </div>
        </div>
        <div>
          <InterviewProcess />
        </div>
      </div>
    </div >
  )
}
