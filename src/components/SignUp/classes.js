import cntl from 'cntl'

export const heading = (classes = '') => cntl`
    m-0
    text-center
    text-3xl
    lg:text-5xl
    text-primary
    ${classes}
`

export const section = (className = '') => cntl`
    max-w-screen-2xl
    mx-auto
    my-16
    md:my-[87px]
    px-4
    ${className}
`
