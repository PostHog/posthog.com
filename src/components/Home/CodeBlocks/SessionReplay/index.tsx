import CodeBlock from 'components/Home/CodeBlock'
import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'

function CaptureFormInputs() {
    return (
        <div className="-mt-5">
            <p className="leading-tight">
                <code>input</code> fields are masked by default. But if you'd like to see what users are typing into a
                form, set <code>maskAllInputs</code> to <code>false</code>. (Password fields will still remain masked.)
            </p>
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
                    <StaticImage
                        src="./session-replay.png"
                        alt="A screenshot of a session replay"
                        placeholder="blurred"
                    />
                </div>
            </div>
        </div>
    )
}

function ConsoleLogs() {
    return (
        <div className="-mt-5">
            <p className="leading-tight">
                Console logs are useful for debugging and can be enabled by passing{' '}
                <code>enable_recording_console_logs: true</code> or in your project's settings.
            </p>
            <div className="flex lg:flex-row lg:gap-x-6 flex-col">
                <div className="shrink">
                    <h4 className="text-lg">Your code</h4>
                    <CodeBlock
                        code={`posthog.init('<ph_project_api_key>', {
  api_host: '<ph_client_api_host>',
  enable_recording_console_log: true,
});`}
                        language="js"
                    />
                </div>
                <div className="flex-1">
                    <h4 className="text-lg">Console logs in a session replay</h4>
                    <StaticImage src="./console-logs.png" alt="Console logs in PostHog" placeholder="blurred" />
                </div>
            </div>
        </div>
    )
}

function EnableCohortRecordings() {
    return (
        <div className="-mt-5">
            <p className="leading-tight">
                If you don't want to record all user sessions, you can choose to only enable it when a user is opted in
                to a feature flag. You can also use feature flags to record only a specific volume of randomized
                traffic.
            </p>
            <div>
                <h4 className="text-lg">Your code</h4>
                <CodeBlock
                    code={`posthog.init('<ph_project_api_key>', {
  api_host: '<ph_client_api_host>',
  disable_session_recording: true,
});
window.posthog.onFeatureFlags(function () {
  if (window.posthog.isFeatureEnabled('your-feature-flag')) {
    window.posthog.startSessionRecording();
  }
});
`}
                    language="js"
                />
            </div>
        </div>
    )
}

export default [
    {
        title: 'Capture form inputs',
        body: CaptureFormInputs,
        bodyType: 'component',
        code: ['maskAllInputs'],
    },
    {
        title: 'Record console logs',
        body: ConsoleLogs,
        bodyType: 'component',
        code: ['enable_recording_console_logs'],
    },
    {
        title: 'Enable recording for users testing new features',
        body: EnableCohortRecordings,
        bodyType: 'component',
        code: ['disable_session_recording'],
    },
]
