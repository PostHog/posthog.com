import React from 'react'
import { Video } from 'components/UI/Video'

export default function Themed(): JSX.Element {
    return (
        <Video
            src="https://res.cloudinary.com/dmukukwp6/video/upload/posthog.com/contents/images/docs/notebooks/popover-light-mode.mp4"
            darkSrc="https://res.cloudinary.com/dmukukwp6/video/upload/posthog.com/contents/images/docs/notebooks/popover-dark-mode.mp4"
            label="Open a notebook in the popover"
            caption="Open a notebook beside your current page."
        />
    )
}
