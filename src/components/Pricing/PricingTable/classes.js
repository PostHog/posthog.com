import cntl from 'cntl'

export const feature = (size = 'md') => cntl`
    flex
    space-x-2
    items-start
    font-semibold
    ${
        {
            md: 'text-base',
            sm: 'text-[14px]',
        }[size]
    }
`
