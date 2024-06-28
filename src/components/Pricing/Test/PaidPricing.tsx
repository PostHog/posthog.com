import React from "react"
import { section, SectionLayout, SectionHeader, SectionColumns, SectionMainCol, SectionSidebar } from './Sections'
import { IconCheck, IconGraph, IconRewindPlay, IconToggle, IconFlask, IconMessage, IconHandMoney, IconInfo, IconRocket, IconStarFilled, IconStar } from '@posthog/icons'
import * as Icons from '@posthog/icons'
import { CallToAction } from 'components/CallToAction'
import { Accordion, tiers } from './PricingAccordion';


export const PaidPricing = () => {
  return (
    <section className={`${section} `}>
      <div className="grid grid-cols-2 gap-12">
        <div>
          <div className="max-w-lg">
            <h4 className="text-2xl">Usage-based pricing</h4>
            <p>If your usage goes beyond the free tier limits, we offer <strong>usage-based pricing.</strong> You can set a billing limit for each product so you never get an unexpected bill.</p>

            <p className="mb-3"><strong>Add a <Icons.IconCreditCard className="size-6 inline-block -rotate-6 relative -top-0.5" /> credit card and also get:</strong></p>

            <ul className="mb-4 pl-6">
              <li>
                <s>1 project</s> <span className="bg-highlight p-0.5 font-bold text-[15px]">7 projects</span>
              </li>
              <li>
                <s>1-year data retention</s> <span className="bg-highlight p-0.5 font-bold text-[15px]">7-year data retention</span>
              </li>
              <li>
                <s>Community support</s> <span className="bg-highlight p-0.5 font-bold text-[15px]">Priority support</span>
              </li>
            </ul>

            <CallToAction size="sm" type="secondary">Pricing calculator</CallToAction>
          </div>
        </div>
        <div>
          <div className="flex justify-between">
            <div>
              <h4 className="mb-0 tracking-tight">Rates (after the monthly free tier)</h4>
              <p className="text-sm opacity-60">Prices reduce with scale</p>
            </div>
            <div>
              <button>Expand all</button>
            </div>
          </div>

          <Accordion items={tiers} />
        </div>
      </div>
    </section>
  )
}
