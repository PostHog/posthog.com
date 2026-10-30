import { Radio as BaseRadio } from '@base-ui/react/radio'
import { RadioGroup as BaseRadioGroup } from '@base-ui/react/radio-group'
import { cn } from '../../../utils'
import { controlSurface, focusRing } from '../styles'
import { withClassName } from '../utils'

export const RadioGroup = withClassName(BaseRadioGroup, 'flex flex-col gap-2')

const Root = withClassName(
    BaseRadio.Root,
    cn(
        'group flex size-5 shrink-0 items-center justify-center rounded-full',
        controlSurface,
        'transition-[border-color] duration-150 ease-out hover:border-orange data-[checked]:border-orange motion-reduce:transition-none',
        'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[disabled]:hover:border-primary',
        focusRing
    )
)

const Indicator = withClassName(
    BaseRadio.Indicator,
    cn(
        'block size-3 scale-50 rounded-full bg-orange opacity-0 forced-colors:border-[6px] forced-colors:border-solid forced-colors:border-[color:Highlight]',
        'transition-[transform,opacity] duration-100 ease-out motion-reduce:transition-none',
        'group-data-[checked]:scale-100 group-data-[checked]:opacity-100 group-data-[checked]:duration-200 group-data-[checked]:ease-[cubic-bezier(0.34,1.56,0.64,1)]'
    ),
    { keepMounted: true }
)

export const Radio = { Root, Indicator }
