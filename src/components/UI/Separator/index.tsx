import { Separator as BaseSeparator } from '@base-ui/react/separator'
import { withClassName } from '../utils'

export const Separator = withClassName(
    BaseSeparator,
    'shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px data-[orientation=vertical]:self-stretch'
)
