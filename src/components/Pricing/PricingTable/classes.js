import cntl from 'cntl'

export const feature = (size = 'md') => cntl`
    flex
    space-x-2
    items-center
    font-semibold
    ${
        {
            md: 'text-base',
            sm: 'text-[14px]',
        }[size]
    }
`
