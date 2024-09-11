import React, { useEffect, useState } from 'react'
import { pricingMenu } from '../navs'
import Layout from 'components/Layout'
import { SectionHeader } from 'components/Pricing/Test/Sections'
import Link from 'components/Link'
import Tooltip from 'components/Tooltip'
import { IconInfo } from '@posthog/icons'
import { CTA as PlanCTA } from 'components/Pricing/Plans'
import { StaticImage } from 'gatsby-plugin-image'

const Addons = (): JSX.Element => {
    return <Layout parent={pricingMenu}>Addons</Layout>
}

export default Addons
