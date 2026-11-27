import React from 'react'
import { cn } from '../../utils'
import { SCENE_TEXT } from '../Home/DataStory/sceneScale'
import { BORDER, BotAvatar, Header, LINK, MessageRow, MUTED, PANE, PersonAvatar, Rich } from './SlackWindow'

const PERSON = 'Rafael Audibert'
const PROMPT = "@PostHog use GPT-6.2 Sol, I'm told it's the good one this week"
const REPLY = 'It is. Check back on Monday.'

export default function ModelDemo(): JSX.Element {
    return (
        <div className="@container">
            <div className={cn(SCENE_TEXT[12], 'flex flex-col gap-3 rounded-md border p-3 leading-snug', BORDER, PANE)}>
                <MessageRow avatar={<PersonAvatar name={PERSON} />} header={<Header name={PERSON} time="3:40 PM" />}>
                    <p className="m-0">
                        <Rich text={PROMPT} />
                    </p>
                </MessageRow>
                <MessageRow avatar={<BotAvatar />} header={<Header name="PostHog" time="3:41 PM" bot />}>
                    <p className="m-0">{REPLY}</p>
                    <p className={cn('m-0', SCENE_TEXT[11], MUTED)}>
                        <span className={cn('underline', LINK)}>View session</span> · <strong>GPT-6.2 Sol</strong> ·
                        Thread cost: $0.01 · Project: <strong>Your project name</strong> ·{' '}
                        <span className={cn('underline', LINK)}>Configure</span>
                    </p>
                </MessageRow>
            </div>
        </div>
    )
}
