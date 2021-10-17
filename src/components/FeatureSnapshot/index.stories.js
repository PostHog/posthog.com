import React from 'react'
import { FeatureSnapshot as FeatureSnapshotComponent } from '.'

export default {
    component: FeatureSnapshotComponent,
    title: 'Components/Feature Snapshot',
    argTypes: {
        features: {
            table: {
                type: {
                    summary: 'List of features',
                },
            },
        },
        reverse: {
            table: {
                type: {
                    summary: 'Reverses direction of columns',
                },
            },
        },
        image: {
            table: {
                type: {
                    summary: 'URL to image shown to the left of the features (or right if reversed)',
                },
            },
        },
    },
}

export const FeatureSnapshot = (args) => <FeatureSnapshotComponent {...args} />
FeatureSnapshot.args = {
    features: [
        <>
            <strong>Roll-out new updates in stages,</strong> so you can effortlessly roll-back if an issue arises.
        </>,
        <>
            <strong>Toggle features for specific cohorts</strong> or beta-testing groups before a full release.
        </>,
        <>
            <strong>Run multivariate A/B tests</strong> to gather insights and launch new features successfully.
        </>,
    ],
    reverse: false,
    image: '',
}
