import React, { HTMLProps } from 'react'

export const iframe = (props: HTMLProps<HTMLIFrameElement>) => {
    if (props.src && /youtube.com|youtube-nocookie.com/gi.test(props.src)) {
        return <iframe {...props} width="100%" height="auto" className={`aspect-video ${props.className ?? ''}`} />
    } else {
        return <iframe {...props} />
    }
}
