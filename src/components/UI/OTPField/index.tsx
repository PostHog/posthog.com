import { OTPField as BaseOTPField } from '@base-ui/react/otp-field'
import { cn } from '../../../utils'
import { textInput } from '../styles'
import { withClassName } from '../utils'

const Root = withClassName(BaseOTPField.Root, 'group flex items-center gap-2')

const Input = withClassName(
    BaseOTPField.Input,
    cn(textInput, 'size-10 shrink-0 p-0 text-center text-lg font-semibold tabular-nums')
)

const Separator = withClassName(
    BaseOTPField.Separator,
    'h-0.5 w-2.5 shrink-0 rounded-full bg-[rgb(var(--text-secondary))] group-data-[disabled]:opacity-50'
)

export const OTPField = { Root, Input, Separator }
