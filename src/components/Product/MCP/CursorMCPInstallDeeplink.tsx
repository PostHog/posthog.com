import React from 'react'
import { useValues } from 'kea'
import { layoutLogic } from '../../../logic/layoutLogic'

export const CursorMCPInstallDeeplink = (): JSX.Element => {
    const { websiteTheme } = useValues(layoutLogic)

    const href =
        'cursor://anysphere.cursor-deeplink/mcp/install?name=posthog&config=eyJjb21tYW5kIjoibnB4IC15IG1jcC1yZW1vdGVAbGF0ZXN0IGh0dHBzOi8vbWNwLnBvc3Rob2cuY29tL3NzZSAtLWhlYWRlciBBdXRob3JpemF0aW9uOiR7UE9TVEhPR19BVVRIX0hFQURFUn0iLCJlbnYiOnsiUE9TVEhPR19BVVRIX0hFQURFUiI6IkJlYXJlciB7SU5TRVJUX1lPVVJfUEVSU09OQUxfQVBJX0tFWV9IRVJFfSJ9fQ%3D%3D'

    const imgSrc =
        websiteTheme === 'dark'
            ? 'https://cursor.com/deeplink/mcp-install-light.svg'
            : 'https://cursor.com/deeplink/mcp-install-dark.svg'

    return (
        <div className={'w-fit mb-2 -mt-2'}>
            <a href={href}>
                <img src={imgSrc} alt="Add posthog MCP server to Cursor" height="32" />
            </a>
        </div>
    )
}
