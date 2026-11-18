import React from 'react'
import { Button } from 'components/UI/Button'
import type { ButtonAppearance } from 'components/UI/Button'
import { DemoRow, DemoRows } from 'components/UILibraryDocs/DemoLayout'

const appearances: ButtonAppearance[] = ['raised', 'flat', 'outline']
const LOADING_MS = 2000

export default function SizesAndStates(): JSX.Element {
    const [loading, setLoading] = React.useState(false)
    const timeout = React.useRef<ReturnType<typeof setTimeout>>()
    React.useEffect(() => () => clearTimeout(timeout.current), [])
    const startLoading = () => {
        setLoading(true)
        timeout.current = setTimeout(() => setLoading(false), LOADING_MS)
    }
    return (
        <DemoRows>
            {appearances.map((appearance) => (
                <DemoRow key={appearance} label={appearance}>
                    {(['sm', 'md', 'lg'] as const).map((size) => (
                        <Button key={size} appearance={appearance} size={size}>
                            {size}
                        </Button>
                    ))}
                    <Button appearance={appearance} disabled>
                        Disabled
                    </Button>
                    <Button appearance={appearance} loading={loading} onClick={startLoading}>
                        Save
                    </Button>
                </DemoRow>
            ))}
        </DemoRows>
    )
}
