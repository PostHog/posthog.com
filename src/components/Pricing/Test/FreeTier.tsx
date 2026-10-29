import React from 'react'
import FreeTierItem from './FreeTierItem'
import * as Icons from '@posthog/icons'
import Tooltip from 'components/Tooltip'
import { freeTierProducts } from './freeTierData'

export default function FreeTier({ size = 'normal' }: { size?: 'normal' | 'large' }) {
    const iconSize = size === 'large' ? 'size-7' : 'size-5'

    return (
        <>
            {freeTierProducts.map(
                ({ name, allocation, description, badge, note, icon: Icon, iconColor, icon2: Icon2, icon2Color }) => (
                    <FreeTierItem
                        key={name}
                        name={name}
                        badge={badge}
                        description={description}
                        allocation={
                            note ? (
                                <>
                                    {allocation}{' '}
                                    <Tooltip content={() => <>{note}</>} placement="top">
                                        <Icons.IconInfo
                                            className={`size-3 inline-block relative -top-px ${
                                                size === 'large' ? 'size-5' : ''
                                            }`}
                                        />
                                    </Tooltip>
                                </>
                            ) : (
                                allocation
                            )
                        }
                        icon={<Icon className={`${iconColor} ${iconSize}`} />}
                        icon2={Icon2 && <Icon2 className={`${icon2Color} ${iconSize}`} />}
                        size={size}
                    />
                )
            )}
        </>
    )
}
