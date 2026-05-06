import React from 'react'
import CodeBlock from 'components/Home/CodeBlock'
import CloudinaryImage from 'components/CloudinaryImage'
import SnippetRenderer from 'components/SnippetRenderer'

export const features = {
    event_timeline: {
        title: 'Event timeline',
        headline: 'Event timeline',
        description:
            "See the history of everything that happened in a user's session, including clicks, scrolls, and more.",
        images: [
            {
                src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/SessionReplay/images/timeline.png',
                alt: 'Timeline',
            },
        ],
    },
    event_properties: {
        title: 'Event properties',
        description: "Page URL, user's IP address, the timestamp of the event, etc.",
    },
    error_details: {
        title: 'Exception details',
        description:
            'Error message, stack trace, and the timestamp of the error. You can also see the full request and response headers.',
    },
    web_vitals: {
        title: 'Web vitals',
        description: 'Performance metrics like FCP, LCP, INP, CLS, and any other acronyms they might think up next',
    },
    network_monitor: {
        title: 'Network monitor',
        headline: 'Network monitor',
        description:
            'Capture every request and response with timing, method, and status code – spot slow API calls or failed requests the moment they happen.',
        images: [
            {
                src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/SessionReplay/images/network.png',
                alt: 'Network monitor',
                stylize: true,
            },
        ],
    },
    console_logs: {
        title: 'Console logs',
        headline: 'Console logs',
        description:
            'Record all warnings and errors in real time, correlated to the exact point in the session they happened. Pair with Error Tracking for full stack traces linked directly to the replay.',
        children: (
            <>
                <div className="flex @lg:flex-row @lg:gap-x-6 flex-col">
                    <div className="shrink">
                        <h4 className="text-lg">Your code</h4>
                        <CodeBlock
                            code={`posthog.init('<ph_project_token>', {
  api_host: '<ph_client_api_host>',
  defaults: '<ph_posthog_js_defaults>',
  enable_recording_console_log: true,
});`}
                            language="js"
                        />
                    </div>
                    <div className="flex-1">
                        <h4 className="text-lg">Console logs in a session replay</h4>
                        <CloudinaryImage
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Home/CodeBlocks/SessionReplay/console-logs.png"
                            alt="Console logs in PostHog"
                            placeholder="blurred"
                        />
                    </div>
                </div>
            </>
        ),
    },
    autocapture: {
        title: 'Autocapture',
        headline: 'Autocapture',
        description:
            "Capture sessions without extra code. If you're already using PostHog.js for analytics, there's nothing else to install.",
        children: <SnippetRenderer />,
    },
    capture_form_data: {
        title: 'Capture form data',
        headline: 'Capture form data',
        description: (
            <>
                HTML <code>input</code> fields are masked by default. But if you'd like to see what users are typing
                into a form, set <code>maskAllInputs</code> to <code>false</code>. (Password fields will still remain
                masked.)
            </>
        ),
        children: (
            <>
                <div className="flex flex-col md:flex-row gap-x-6">
                    <div className="shrink">
                        <h4 className="text-lg">Your code</h4>
                        <CodeBlock
                            code={`posthog.init('<YourPostHogKey>', {
    session_recording: {
        maskAllInputs: false
    }
})`}
                            language="js"
                        />
                        <div className="pt-4">
                            <CodeBlock
                                code={`<label>Name</label>
<input type="text" />

<label>Email</label>
<input type="email" />

<label>Password</label>
<input type="password" />`}
                                language="html"
                            />
                        </div>
                    </div>
                    <div className="flex-1">
                        <h4 className="text-lg">Session replay</h4>
                        <CloudinaryImage
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Home/CodeBlocks/SessionReplay/session-replay.png"
                            alt="A screenshot of a session replay"
                            placeholder="blurred"
                        />
                    </div>
                </div>
            </>
        ),
    },
    // {
    //     title: 'Canvas recording',
    //     headline: 'Canvas recording',
    //     description:
    //         "Capture canvas elements from your application. It works in both 2D and WebGL environments.",
    //     children: <OSButton asLink to="/docs/session-replay/canvas-recording" state={{ newWindow: true }}>Read the docs</OSButton>,
    // },
    // {
    //     title: 'Collections',
    //     headline: 'Collections',
    //     description:
    //         'Create a dynamic playlist of sessions to watch based on visitor activity, user properties, or cohort',
    //     images: [
    //         {
    //             src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/SessionReplay/images/network.png',
    //             alt: 'Playlist',
    //         },
    //     ],
    // },
    dom_explorer: {
        title: 'DOM explorer',
        headline: 'DOM explorer',
        description:
            "Shows a live DOM snapshot at any point in the recording – catch layout shifts, broken styles, or elements that weren't rendering when they should.",
        images: [
            {
                src: 'https://res.cloudinary.com/dmukukwp6/image/upload/inspect_dom_e9376c469a.png',
                alt: 'DOM explorer',
            },
        ],
    },
    technical_context: {
        title: 'Technical context',
        headline: 'A DevTools panel, synced to the recording',
        description:
            'Every session comes with a panel of technical data synced to the video. Scrub to any point and see exactly what your app was doing at that moment.',
    },
    sampling: {
        title: 'Sampling',
        description: 'Records a percentage of all sessions. Start at 100% and dial it down as your volume grows.',
    },
    url_event_triggers: {
        title: 'URL and event triggers',
        description:
            'Start recording when a user visits a specific page or fires a specific event – like reaching checkout, hitting an error, or completing onboarding.',
    },
    feature_flag_targeting: {
        title: 'Feature flag targeting',
        description:
            'Limits recordings to a specific rollout – record your experiment group without capturing everyone.',
    },
    privacy_masking: {
        title: 'Privacy masking',
        description: (
            <>
                Redacts sensitive fields by default. Passwords are always masked; opt in to capturing other inputs with{' '}
                <code>maskAllInputs: false</code>. Exclude any element with a <code>ph-no-capture</code> class. Masked
                data never leaves the browser.
            </>
        ),
    },
    event_filters: {
        title: 'Event filters',
        description:
            'Narrow recordings to sessions where a specific action was triggered – a button click, page view, or custom event.',
    },
    person_properties: {
        title: 'Person properties',
        description: 'Filter by country, plan, email, or any user attribute to find sessions from the right segment.',
    },
    frustration_signals: {
        title: 'Frustration signals',
        description:
            'Surface recordings with rage clicks, dead clicks, or exceptions – the sessions most likely to show you something worth fixing.',
    },
    ai_search: {
        title: 'PostHog AI',
        description: (
            <>
                Takes a plain-English description of the behavior you're looking for – "users who dropped off during
                checkout" – and returns a matching playlist. Once found, AI summaries give you a breakdown of what
                happened without watching the whole thing.
            </>
        ),
    },
    recording_rules: {
        title: 'Recording rules',
        headline: 'Recording rules',
        description:
            'You can limit the sessions that are recorded to a percentage of randomized traffic, or based on triggered events, user properties, or browsing behavior. You can also manually enable recording in your code when a user is opted in to a feature flag.',
        codeExample: `posthog.init('<ph_project_token>', {
  disable_session_recording: true,
})
window.posthog.onFeatureFlags(() => {
  if (window.posthog.isFeatureEnabled('your-feature-flag')) {
    window.posthog.startSessionRecording()
  }
})`,
    },
}
