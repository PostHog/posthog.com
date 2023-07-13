import IdentifyUser from './IdentifyUser'
import TrackEvent from './TrackEvent'

export default [
    {
        title: 'Track an event',
        body: TrackEvent,
        bodyType: 'component',
        tags: ['capture'],
    },
    {
        title: 'Identify a user',
        body: IdentifyUser,
        bodyType: 'component',
        tags: ['identify', 'group'],
    },
]
