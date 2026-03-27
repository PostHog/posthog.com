import React from 'react'
import { createInstallation } from 'components/Docs/OnboardingContentWrapper'

const getUnitySteps = (ctx: any) => {
    const { CodeBlock, Markdown, CalloutBox, dedent, snippets } = ctx
    const SessionReplayFinalSteps = snippets?.SessionReplayFinalSteps

    return [
        {
            title: 'Install the SDK',
            badge: 'required',
            content: (
                <>
                    <Markdown>
                        Requires **Unity 2021.3 LTS** or later with **.NET Standard 2.1** API compatibility level.
                    </Markdown>
                    <Markdown>
{"In the Unity Editor, open **Window > Package Manager**, click the **+** button, select **Add package from git URL**, and enter:"}
                    </Markdown>
                    <CodeBlock
                        blocks={[
                            {
                                language: 'text',
                                code: dedent`
                                    https://github.com/PostHog/posthog-unity.git?path=com.posthog.unity
                                `,
                            },
                        ]}
                    />
                    <Markdown>
                        See the [Unity SDK docs](/docs/libraries/unity) for other installation methods and full setup
                        instructions.
                    </Markdown>
                </>
            ),
        },
        {
            title: 'Enable session recordings in project settings',
            badge: 'required',
            content: (
                <Markdown>
                    Go to your PostHog [Project Settings](https://us.posthog.com/settings/project-replay) and enable
                    **Record user sessions**. Session recordings will not work without this setting enabled.
                </Markdown>
            ),
        },
        {
            title: 'Configure PostHog with session replay',
            badge: 'required',
            content: (
                <>
                    <Markdown>
{"Add `SessionReplay = true` to your PostHog configuration. You can also configure it via the Unity Inspector in **Edit > Project Settings > PostHog**."}
                    </Markdown>
                    <CodeBlock
                        blocks={[
                            {
                                language: 'csharp',
                                file: 'GameManager.cs',
                                code: dedent`
                                    using PostHogUnity;
                                    using PostHogUnity.SessionReplay;

                                    PostHog.Setup(new PostHogConfig
                                    {
                                        ApiKey = "<ph_project_token>",
                                        Host = "<ph_client_api_host>",
                                        SessionReplay = true,
                                        SessionReplayConfig = new PostHogSessionReplayConfig
                                        {
                                            // Min seconds between captures (default: 1.0)
                                            ThrottleDelaySeconds = 1.0f,

                                            // JPEG quality 1-100 (default: 80)
                                            ScreenshotQuality = 80,

                                            // Resolution scale 0.1-1.0 (default: 0.75)
                                            ScreenshotScale = 0.75f,

                                            // Record HTTP request metadata (default: true)
                                            CaptureNetworkTelemetry = true,

                                            // Record console logs (default: false)
                                            CaptureLogs = false,

                                            // Log, Warning, or Error (default: Error)
                                            MinLogLevel = SessionReplayLogLevel.Error,
                                        }
                                    });
                                `,
                            },
                        ]}
                    />
                    <CalloutBox type="fyi" title="How it works">
                        <Markdown>
                            The Unity SDK captures screenshots using `AsyncGPUReadback` to avoid blocking the main
                            thread. It also records touch/mouse input, network requests, and console logs alongside each
                            screenshot. Session replay requires `AsyncGPUReadback` support and is automatically disabled
                            on WebGL.
                        </Markdown>
                    </CalloutBox>
                    <CalloutBox type="caution" title="No masking support">
                        <Markdown>
                            The Unity SDK uses screenshot-based capture. Unlike web and mobile SDKs, there is **no
                            built-in masking** for text, images, or other UI elements. Screenshots may contain sensitive
                            information. Make sure you are not displaying personal data or secrets on screen during
                            recorded sessions.
                        </Markdown>
                    </CalloutBox>
                    <CalloutBox type="info" title="Limitations">
                        <Markdown>
                            The Unity SDK does **not** currently support remote configuration via PostHog project
                            settings. Options like `CaptureNetworkTelemetry`, `CaptureLogs`, and sampling must be
                            configured locally in code. All Session Replay settings are applied at initialization time.
                        </Markdown>
                    </CalloutBox>
                </>
            ),
        },
        {
            title: 'Watch session recordings',
            badge: 'recommended',
            content: <>{SessionReplayFinalSteps && <SessionReplayFinalSteps />}</>,
        },
    ]
}

export const UnityInstallation = createInstallation(getUnitySteps)
