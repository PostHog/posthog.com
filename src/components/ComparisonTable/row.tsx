import React from 'react'

export const True = () => <span className="text-green text-lg">✔</span>
export const False = () => <span className="text-red text-lg">✖</span>

export const ComparisonRow = ({ feature, description, posthog, competitor }) => {
    return (
        <tr>
            <td>
                <p className="!mb-0 pb-0.5 !leading-tight">
                    <strong>{feature}</strong>
                </p>
                <p className="!mb-0 !text-sm text-opacity-75 leading-none">{description}</p>
            </td>
            <td className="text-center">{typeof posthog === 'string' ? posthog : posthog ? <True /> : <False />}</td>
            <td className="text-center">
                {typeof competitor === 'string' ? competitor : competitor ? <True /> : <False />}
            </td>
        </tr>
    )
}
