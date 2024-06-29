import React from "react"
import { section, SectionHeader } from './Sections'
import { usePlatform } from '../Platform/usePlatform'
import useProducts from '../Products'
import * as Icons from '@posthog/icons'

export const Addons = (props) => {
  const addons = props.addons

  const platform = usePlatform()
  const products = useProducts()
  const platformAddons = platform.addons.filter((addon) => !addon.inclusion_only)
  const productAddons = products.flatMap((product) => product.addons)
  const allAddons = [...platformAddons, ...productAddons]

  return (
    <section className={`${section} mb-12 mt-8 md:px-4`}>
      <SectionHeader>
        <h3 className="mb-2">Add-ons</h3>
        <p>We've moved specialized functionality into add-ons so you never pay for things you don't need.</p>
      </SectionHeader>
      <div className="mt-4 -mx-4 px-4 overflow-x-auto">


        <div className="grid grid-flow-col auto-cols-max gap-4 mb-4">
          {allAddons.map(({ name, icon_key, description }) => {
            // Assuming Icons object is available and contains all necessary icons
            const Icon = Icons[icon_key];
            return (
              <div key={name} className="bg-white dark:bg-white/5 border border-light dark:border-dark p-4 rounded max-w-2xs lg:max-w-xs flex flex-col">
                <div className="flex gap-1 items-center mb-2">
                  <Icon className="w-6 h-6 opacity-75" />
                  <div className="font-bold">{name}</div>
                </div>
                <div className="text-[15px] mb-4">{description}</div>
                <div className="mt-auto">
                  Pricing starts at...
                </div>
              </div>
            );
          })}

        </div>
      </div>

    </section>
  )
}