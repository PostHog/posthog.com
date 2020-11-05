import eventAutocaptureIcon from '../../images/autocapture-icon.svg'
import featureFlagsIcon from '../../images/feature-flags-icon.svg'
import trendsIcon from '../../images/trends-icon.svg'
import funnelsIcon from '../../images/funnels-icon.svg'
import retentionIcon from '../../images/retention-icon.svg'
import selfHostedIcon from '../../images/self-hosted-icon.svg'
import pluginsIcon from '../../images/plugins-icon.svg'
import sessionRecordingIcon from '../../images/session-recording-icon.svg'

import { FeaturesPageData } from '../../types'

const featurePagesData: FeaturesPageData[] = [
    {
        key: 'self-hosted',
        title: 'Self-Hosted',
        href: '/product-features/self-hosted',
        icon: selfHostedIcon,
    },
    {
        key: 'autocapture',
        title: 'Event Autocapture',
        href: '/product-features/event-autocapture',
        icon: eventAutocaptureIcon,
    },
    {
        key: 'feature-flags',
        title: 'Feature Flags',
        href: '/product-features/feature-flags',
        icon: featureFlagsIcon,
    },
    {
        key: 'trends',
        title: 'Trends',
        href: '/product-features/trends',
        icon: trendsIcon,
    },
    {
        key: 'funnels',
        title: 'Funnels',
        href: '/product-features/funnels',
        icon: funnelsIcon,
    },
    {
        key: 'session-recording',
        title: 'Session Recording',
        href: '/product-features/session-recording',
        icon: sessionRecordingIcon,
    },
    {
        key: 'retention',
        title: 'Retention',
        href: '/product-features/retention',
        icon: retentionIcon,
    },
    {
        key: 'plugins',
        title: 'Plugins',
        href: '/product-features/plugins',
        icon: pluginsIcon,
    },
]

export default featurePagesData
