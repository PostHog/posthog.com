import React, { useState } from 'react';
import { IconCheck, IconChevronDown } from '@posthog/icons'
import cntl from 'cntl'
import Tooltip from 'components/Tooltip'
import Plans, { CTA as PlanCTA, PricingTiers } from '../Plans'

interface PlanData {
  title: string
  price: string
  priceSubtitle?: string | JSX.Element
  features: React.ReactNode[]
  CTAText?: string
  CTALink?: string
}

const Plan: React.FC<{ planData: PlanData }> = ({ planData }) => (
  <div>
    <h4 className="text-lg mb-2">{planData.title}</h4>
    <div className="flex flex-col h-full border border-light dark:border-dark bg-white dark:bg-accent-dark rounded">
      <div className="flex flex-col h-full gap-4 pt-3 px-4 xl:px-4 pb-6">
        <div>
          <h4 className="inline text-lg">
            {planData.price != 'Free' && planData.price != 'Custom pricing' && (
              <span className="text-sm opacity-60 font-normal">Starts at</span>
            )}{' '}
            {planData.price}
            {planData.price != 'Free' && planData.price != 'Custom pricing' && (
              <span className="text-sm opacity-60 font-normal">/mo</span>
            )}
          </h4>
          &nbsp;
          <p className="inline opacity-75 text-sm">{planData.priceSubtitle}</p>
        </div>
        <ul className="p-0 list-none flex flex-col gap-2 [&_li]:text-sm xl:[&_li]:text-[15px]">
          {planData.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
        <div className="mt-auto">
          <PlanCTA
            type={planData.title === 'Ridiculously cheap' ? 'primary' : 'secondary'}
            ctaText={planData.CTAText}
            ctaLink={planData.CTALink}
          />
        </div>
      </div>
    </div>
  </div>
)

const planSummary = [
  {
    title: 'Totally free',
    price: 'Free',
    priceSubtitle: '- no credit card required',
    features: [
      'Generous free monthly tier',
      'Basic product features',
      '1 project',
      '1 year data retention',
      'Community support',
    ],
  },
  {
    title: 'Ridiculously cheap',
    price: '$0',
    features: [
      'Generous free tier on all products',
      'Advanced product features',
      '6 projects',
      '7 year data retention',
      'Email support',
      'Pay only for what you use',
      <>
        <span className="opacity-60 text-sm">* Included with any product subscription</span>
      </>,
    ],
  },
  {
    title: 'Enterprise',
    price: 'Custom pricing',
    priceSubtitle: 'w/ fixed terms',
    features: [
      'Unlimited everything',
      'SAML SSO',
      'Custom MSA',
      'Dedicated support',
      'Personalized onboarding & training',
      'Advanced permissions & audit logs',
    ],
    CTAText: 'Get in touch',
    CTALink: '/talk-to-a-human',
  },
]

export const section = cntl`
    max-w-6xl
    xl:max-w-7xl
    mx-auto
    px-4
`

export const PlanColumns = ({ billingProducts, highlight = 'paid' }) => {
  const platformAndSupportProduct = billingProducts.find(
    (product: BillingProductV2Type) => product.type === 'platform_and_support'
  )
  const highestSupportPlan = platformAndSupportProduct?.plans?.slice(-1)[0]

  const [isPlanComparisonVisible, setIsPlanComparisonVisible] = useState(false)
  return (
    <>
      <section className={`${section} mb-12 mt-8 md:px-4`}>
        <h3 className="border-b border-light dark:border-dark pb-2 mb-6">Platform plans</h3>
        <p className="text-[15px] text-primary/75 dark:text-primary-dark/75">
          All plans include unlimited team members and no limits on tracked users.
        </p>
        <div className="col-span-4 -mx-4 lg:mx-0 mb-4 px-4 lg:px-0 overflow-x-auto">
          <div
            className={`grid grid-cols-[repeat(3,_minmax(260px,_1fr))] xl:max-w-4xl xl:mx-auto gap-4 mb-12 ${highlight === 'free'
              ? '[&>*:nth-child(1)_>div]:border-red [&>*:nth-child(1)_>div]:border-3'
              : '[&>*:nth-child(2)_>div]:border-red [&>*:nth-child(2)_>div]:border-3'
              }`}
          >
            {planSummary.map((plan, index) => (
              <Plan key={index} planData={plan} highlight={plan.intent === highlight} />
            ))}
          </div>
        </div>
        <p
          className="text-center text-red dark:text-yellow font-bold cursor-pointer flex items-center justify-center"
          onClick={() => setIsPlanComparisonVisible(!isPlanComparisonVisible)}
        >
          {isPlanComparisonVisible ? (
            <>
              Hide full plan comparison <IconChevronDown className="w-8 rotate-180" />
            </>
          ) : (
            <>
              Show full plan comparison <IconChevronDown className="w-8" />
            </>
          )}
        </p>
      </section>

      <section
        className={`${section} ${isPlanComparisonVisible
          ? 'visible max-h-full opacity-1 mb-12 mt-8 md:px-4'
          : 'overflow-y-hidden invisible max-h-0 opacity-0'
          } transition duration-500 ease-in-out transform`}
      >
        <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
          <div className="grid grid-cols-16 mb-1 min-w-[1000px]">
            <div className="col-span-4 px-3 py-1">&nbsp;</div>
            {platformAndSupportProduct?.plans
              ?.filter((plan: BillingV2PlanType) => plan.name !== 'Teams') // This is a temporary addition until the teams addon is shipped and the teams plan is removed
              ?.map((plan: BillingV2PlanType) => (
                <div className="col-span-4 px-3 py-1" key={plan.key}>
                  <strong className="text-sm opacity-75">{plan.name}</strong>
                </div>
              ))}
          </div>

          <div className="grid grid-cols-16 mb-2 border-x border-b border-light dark:border-dark bg-white dark:bg-accent-dark [&>div]:border-t [&>div]:border-light dark:[&>div]:border-dark min-w-[1000px]">
            <div className="col-span-4 bg-accent/50 dark:bg-black/75 px-3 py-2 text-sm">
              <strong className="text-primary/75 dark:text-primary-dark/75">Base price</strong>
            </div>
            {platformAndSupportProduct?.plans
              ?.filter((plan: BillingV2PlanType) => plan.name !== 'Teams') // This is a temporary addition until the teams addon is shipped and the teams plan is removed
              ?.map((plan: BillingV2PlanType) => {
                return (
                  <div className="col-span-4 px-3 py-2 text-sm" key={`${plan.key}-base-price`}>
                    {plan.included_if === 'no_active_subscription' ? (
                      <span>Free forever</span>
                    ) : plan.included_if === 'has_subscription' ? (
                      <span>$0</span>
                    ) : plan.unit_amount_usd ? (
                      `$${parseFloat(plan.unit_amount_usd).toFixed(0)}/mo`
                    ) : plan.contact_support ? (
                      'Contact us'
                    ) : (
                      'Contact us'
                    )}
                  </div>
                )
              })}
            {highestSupportPlan?.features
              ?.filter(
                (f: BillingV2FeatureType) =>
                  ![
                    // TODO: this shouldn't be necessary, update billing products api to include entitlement_only info
                    'role_based_access',
                    'project_based_permissioning',
                    'ingestion_taxonomy',
                    'tagging',
                  ].includes(f.key)
              )
              .map((feature: BillingV2FeatureType) => (
                <>
                  <div className="col-span-4 bg-accent/50 dark:bg-black/75 px-3 py-2 text-sm">
                    {feature.description ? (
                      <Tooltip content={feature.description}>
                        <strong className="border-b border-dashed border-light dark:border-dark cursor-help text-primary/75 dark:text-primary-dark/75">
                          {feature.name}
                        </strong>
                      </Tooltip>
                    ) : (
                      <strong className="text-primary/75 dark:text-primary-dark/75">
                        {feature.name}
                      </strong>
                    )}
                  </div>
                  {platformAndSupportProduct?.plans
                    ?.filter((plan: BillingV2PlanType) => plan.name !== 'Teams') // This is a temporary addition until the teams addon is shipped and the teams plan is removed
                    ?.map((plan: BillingV2PlanType) => {
                      const planFeature = plan?.features?.find((f) => f.key === feature.key)
                      return (
                        <div
                          className="col-span-4 px-3 py-2 text-sm"
                          key={`${plan.key}-${feature.key}`}
                        >
                          {planFeature ? (
                            <div className="flex gap-x-2">
                              {planFeature.note ?? (
                                <IconCheck className="w-5 h-5 text-green" />
                              )}
                              {planFeature.limit && (
                                <span className="opacity-75">
                                  <>
                                    {planFeature.limit} {planFeature.unit}
                                  </>
                                </span>
                              )}
                            </div>
                          ) : (
                            <></>
                          )}
                        </div>
                      )
                    })}
                </>
              ))}
          </div>
        </div>
      </section>
    </>
  )
}