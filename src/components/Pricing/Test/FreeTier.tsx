import React from 'react'
import FreeTierItem from './FreeTierItem'
import * as Icons from '@posthog/icons'
import Tooltip from 'components/Tooltip'

export default function FreeTier({ size = 'normal' }: { size?: 'normal' | 'large' }) {
    return (
        <>
            <FreeTierItem
                name="Analytics"
                allocation="1M events"
                icon={<Icons.IconGraph className={`text-blue size-5 ${size === 'large' && 'size-7'}`} />}
                icon2={<Icons.IconPieChart className={`text-green size-5 ${size === 'large' && 'size-7'}`} />}
                size={size}
            />
            <FreeTierItem
                name="Session replay"
                allocation="5K recordings"
                icon={<Icons.IconRewindPlay className={`text-yellow size-5 ${size === 'large' && 'size-7'}`} />}
                size={size}
            />
            <FreeTierItem
                name="Feature flags"
                allocation="1M requests"
                icon={<Icons.IconToggle className={`text-seagreen size-5 ${size === 'large' && 'size-7'}`} />}
                size={size}
            />
            <FreeTierItem
                name="Experiments"
                description="Billed with feature flags"
                icon={<Icons.IconFlask className={`text-purple size-5 ${size === 'large' && 'size-7'}`} />}
                size={size}
            />
            <FreeTierItem
                name="Error tracking"
                allocation="100K exceptions"
                icon={<Icons.IconWarning className={`text-orange size-5 ${size === 'large' && 'size-7'}`} />}
                size={size}
            />
            <FreeTierItem
                name="Surveys"
                allocation="1500 responses"
                icon={<Icons.IconMessage className={`text-red size-5 ${size === 'large' && 'size-7'}`} />}
                size={size}
            />
            <FreeTierItem
                name="Data warehouse"
                allocation="1M rows"
                icon={<Icons.IconDatabase className={`text-purple size-5 ${size === 'large' && 'size-7'}`} />}
                size={size}
            />
            <FreeTierItem
                name="Data pipelines"
                allocation={
                    <>
                        10K events + 1M rows{' '}
                        <Tooltip
                            content={() => (
                                <>
                                    Real-time destinations: Send events to Slack, webhooks, and 40+ tools as they
                                    happen.
                                    <br />
                                    Batch exports: Reliable scheduled exports to S3, Snowflake, BigQuery, and more
                                </>
                            )}
                            placement="top"
                        >
                            <Icons.IconInfo
                                className={`size-3 inline-block relative -top-px ${size === 'large' && 'size-5'}`}
                            />
                        </Tooltip>
                    </>
                }
                icon={<Icons.IconDecisionTree className={`text-seagreen size-5 ${size === 'large' && 'size-7'}`} />}
                size={size}
            />
            <FreeTierItem
                name="LLM analytics"
                allocation="100K events"
                icon={<Icons.IconLlmAnalytics className={`text-purple size-5 ${size === 'large' && 'size-7'}`} />}
                size={size}
            />
        </>
    )
}
