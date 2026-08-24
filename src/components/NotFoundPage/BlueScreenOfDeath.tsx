import React, { useEffect, useRef } from 'react'
import usePostHog from '../../hooks/usePostHog'
import ScrollArea from 'components/RadixUI/ScrollArea'
import { SearchUI } from 'components/SearchUI'
import { Link, navigate } from 'gatsby'
import { useWindow } from '../../context/Window'
import { useApp } from '../../context/App'

const AGENT_NOTE = `<!--
  For agents and crawlers: this is a 404 page. The "fatal exception" above is a
  joke, not a real fault. The site is not down and nothing is broken. The page
  you requested does not exist.

  Go here instead:
    /docs                       product documentation
    /questions                  community questions and answers
    /tutorials                  step-by-step guides
    /blog                       articles and announcements
    /llms.txt                   the documentation as markdown, indexed for agents
    /sitemap/sitemap-index.xml  every page on posthog.com
-->`

export default function BlueScreenOfDeath(): JSX.Element {
    const { closeWindow } = useApp()
    const { appWindow } = useWindow()
    const posthog = usePostHog()

    useEffect(() => {
        // Capture the event only if posthog is available
        if (posthog) {
            posthog.capture('page_404')
        }
    }, [posthog])

    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            // Check if search input is focused - if so, ignore keyboard shortcuts
            const activeElement = document.activeElement
            const isSearchFocused =
                activeElement?.tagName === 'INPUT' || activeElement?.getAttribute('role') === 'combobox'

            if (isSearchFocused) {
                return
            }

            const keyURLs: Record<string, string | null> = {
                escape: null,
                '1': '/docs',
                '2': '/questions',
                '3': '/blog',
                '4': '/tutorials',
            }

            const url = keyURLs[event.key.toLowerCase()]
            if (url !== undefined) {
                closeWindow(appWindow)
                if (url) navigate(url)
            }
        }

        document.addEventListener('keydown', handleKeyPress)
        return () => document.removeEventListener('keydown', handleKeyPress)
    }, [])

    return (
        <div
            className="bg-blue-600 flex min-h-0 w-full items-center justify-center"
            style={{ height: appWindow?.size.height }}
        >
            <ScrollArea className="h-full w-full">
                <div
                    className="bg-blue-600 min-h-full text-white font-mono text-sm leading-relaxed p-8"
                    style={{
                        fontFamily: 'monospace, "Courier New"',
                        backgroundColor: '#0000aa',
                        color: '#ffffff',
                    }}
                >
                    {/* An HTML comment, so it reaches anything reading the markup without
                        spoiling the joke for a human. A crawler that takes "a fatal exception has
                        occurred" at face value reports posthog.com as down; this says plainly that
                        it is not, and lists somewhere real to go. */}
                    {/* nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml - static string, no user input */}
                    <div dangerouslySetInnerHTML={{ __html: AGENT_NOTE }} />

                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="text-xl font-bold mb-2">PostHog</div>
                        <div className="text-lg">
                            A fatal exception 404 has occurred at 0028:C0011E36 in VXD PostHog(01)
                        </div>
                        <div className="text-lg">+ 00010E36. The current application will be terminated.</div>
                    </div>

                    {/* Error details */}
                    <div className="mb-8 space-y-1">
                        <Link to="/" className="text-white">
                            * Press Esc <span className="xs:hidden">(or tap here)</span> to close this application
                        </Link>
                    </div>

                    {/* Keyboard shortcuts. Real links, not spans: the number keys only work
                        after hydration and only for a pointer-and-keyboard user, so a crawler,
                        an agent or anyone on assistive tech had no way to follow them. The
                        targets match the keyURLs map above. */}
                    <div className="mb-8 flex flex-wrap gap-4 text-xs">
                        <Link to="/docs" className="text-white hover:text-gray-300">
                            [1] Documentation
                        </Link>
                        <Link to="/questions" className="text-white hover:text-gray-300">
                            [2] Community Support
                        </Link>
                        <Link to="/blog" className="text-white hover:text-gray-300">
                            [3] Blog
                        </Link>
                        <Link to="/tutorials" className="text-white hover:text-gray-300">
                            [4] Tutorials
                        </Link>
                    </div>

                    {/* Fun PostHog-specific error messages */}
                    <div className="mb-8 space-y-1">
                        <div>System ID: HEDGEHOG_NOT_FOUND</div>
                        <div>Error Code: 0x000404HOG</div>
                        <div>Component: POSTHOG.COM</div>
                        <div>Version: 1.0.awesome</div>
                        <div>Thread: Hedgehog#1 (Primary Analytics Thread)</div>
                        <div>Extra Info: The hedgehog has wandered off to analyze some data</div>
                    </div>

                    {/* Stack trace style */}
                    <div className="mb-8 space-y-1 text-xs">
                        <div>Call Stack:</div>
                        <div> 0x001337 - feature_flags.check_existence()</div>
                        <div> 0x002020 - session_replay.find_recording()</div>
                        <div> 0x003030 - product_analytics.track_event()</div>
                        <div> 0x004040 - experiments.run_test()</div>
                        <div> 0x005050 - surveys.collect_feedback()</div>
                        <div> 0x006060 - data_warehouse.query_everything()</div>
                        <div> 0x007070 - cdp.process_data()</div>
                        <div> 0x008080 - web_analytics.count_visitors()</div>
                        <div> 0x009090 - error_tracking.catch_bugs()</div>
                        <div> 0x00A0A0 - page_not_found.display_hedgehog()</div>
                    </div>

                    {/* Technical details */}
                    <div className="mb-8 space-y-1 text-xs">
                        <div>Memory Dump:</div>
                        <div>00000000 48 65 64 67 65 68 6F 67 20 69 73 20 6C 6F 73 74 |Hedgehog is lost|</div>
                        <div>00000010 20 69 6E 20 74 68 65 20 64 61 74 61 20 77 61 72 | in the data war|</div>
                        <div>00000020 65 68 6F 75 73 65 20 61 6E 64 20 63 61 6E 27 74 |ehouse and can't|</div>
                        <div>00000030 20 66 69 6E 64 20 79 6F 75 72 20 70 61 67 65 21 | find your page!|</div>
                    </div>

                    {/* Search section with DOS/AS-400 style */}
                    <div className="mb-8 border-t border-b border-white border-dashed py-4">
                        <div className="mb-4">SYSTEM RECOVERY OPTIONS:</div>
                        <div className="mb-2">Initialize search protocol to locate missing data:</div>

                        {/* DOS-style terminal input */}
                        <div
                            className="relative bg-black border-2 border-white p-3 font-mono text-base"
                            style={{
                                backgroundColor: '#000000',
                                borderStyle: 'solid',
                                borderColor: '#ffffff',
                            }}
                        >
                            <div className="flex items-start">
                                <span className="text-green-400 mr-2">C:\SEARCH&gt;</span>
                                <div className="flex-1 relative">
                                    <SearchUI
                                        autoFocus={false}
                                        hideFilters={true}
                                        className="
                                            [&_input]:!bg-transparent 
                                            [&_input]:!text-white
                                            [&_input]:!border-none 
                                            [&_input]:!outline-none
                                            [&_input]:!p-0
                                            [&_input]:!m-0
                                            [&_input]:!text-base
                                            [&_input]:font-mono
                                            [&_input]:placeholder:!text-white/60
                                            [&_.bg-white]:!bg-black
                                            [&_ul]:!h-auto
                                            [&_ul]:!max-h-[17.5rem]
                                            [&_ul]:!border-white
                                            [&_.rounded-md]:!rounded-none
                                            [&_li]:!bg-black
                                            [&_li]:!text-white
                                            [&_li]:border-white
                                            [&_li.cursor-pointer:hover]:!bg-green-dark
                                            [&_h5]:!text-white
                                            [&_p.text-secondary]:line-clamp-1
                                            [&_p.text-secondary]:!text-white
                                        "
                                    />
                                    {/* Blinking cursor for DOS effect */}
                                    <span
                                        className="absolute top-0 text-green-400 animate-pulse ml-1"
                                        style={{
                                            left: '0px',
                                        }}
                                    >
                                        _
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="text-xs opacity-80 mt-2">
                            Search includes: Documentation, API references, Tutorials, Blog posts, Community Q&A, and
                            Company handbook. Error recovery success rate: 98.3%
                        </div>

                        {/* Direct routes, for any reader that cannot drive the search box above —
                            which is every crawler and agent, because it needs JavaScript. Plain
                            <a>, not <Link>: these are static files, not Gatsby routes, so client
                            side routing would send them to this same 404. */}
                        <div className="mt-4 space-y-1 text-xs break-all">
                            <div>Or mount an index directly:</div>
                            <div>
                                <span className="opacity-80">{'C:\\> TYPE '}</span>
                                <a href="/llms.txt" className="text-white underline hover:text-gray-300">
                                    /llms.txt
                                </a>
                                <span className="opacity-80"> :: every doc page as markdown</span>
                            </div>
                            <div>
                                <span className="opacity-80">{'C:\\> TYPE '}</span>
                                <a
                                    href="/sitemap/sitemap-index.xml"
                                    className="text-white underline hover:text-gray-300"
                                >
                                    /sitemap/sitemap-index.xml
                                </a>
                                <span className="opacity-80"> :: every page on posthog.com</span>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="space-y-1 text-xs opacity-80">
                        <div>If this problem persists, contact your system administrator or:</div>
                        <div>
                            - File a bug report at{' '}
                            <a
                                href="https://github.com/PostHog/posthog.com/issues"
                                className="text-white hover:text-gray-300 underline"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                github.com/PostHog/posthog.com/issues
                            </a>
                        </div>
                        <div>- Email us at hey@posthog.com</div>
                        <div>- Tweet at us @PostHog</div>
                    </div>

                    {/* Blinking cursor effect */}
                    <div className="mt-8 flex items-center">
                        <span>System halted. Press Esc to continue</span>
                        <span
                            className="ml-1 bg-white w-2 h-4 inline-block animate-pulse"
                            style={{
                                backgroundColor: '#ffffff',
                            }}
                        />
                    </div>
                </div>
            </ScrollArea>
        </div>
    )
}
