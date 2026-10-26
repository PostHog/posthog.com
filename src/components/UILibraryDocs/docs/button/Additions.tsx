import React from 'react'
import { IconArrowUpRight, IconPlus } from '@posthog/icons'
import { Button, ButtonGroup, IconButton } from 'components/UI/Button'

export default function Additions(): JSX.Element {
    const [loading, setLoading] = React.useState(false)
    const timeout = React.useRef<ReturnType<typeof setTimeout>>()
    React.useEffect(() => () => clearTimeout(timeout.current), [])
    const startLoading = () => {
        setLoading(true)
        timeout.current = setTimeout(() => setLoading(false), 2000)
    }
    return (
        <div className="flex flex-wrap items-center gap-3">
            <Button appearance="raised" variant="primary" loading={loading} onClick={startLoading}>
                Save changes
            </Button>
            <IconButton icon={<IconPlus />} aria-label="Add item" loading={loading} onClick={startLoading} />
            <Button appearance="raised" variant="danger">
                Delete insight
            </Button>
            <ButtonGroup appearance="raised" variant="danger" aria-label="Delete options">
                <Button>Delete selected</Button>
                <Button>Delete all</Button>
            </ButtonGroup>
            <Button icon={<IconPlus />} iconEnd={<IconArrowUpRight />}>
                Create insight
            </Button>
        </div>
    )
}
