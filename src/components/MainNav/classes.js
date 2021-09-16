import cntl from 'cntl'

export const submenu = {
    container: (className = '') => cntl`
        lg:dark:bg-gray-accent-dark
        text-[14px]
        lg:p-12
        p-0
        max-w-screen-xl
        mx-auto
        px-4
        ${className}
    `,
    section: {
        title: (className) => cntl`
            text-lg
            lg:text-xl
            font-bold
            ${className}
            `,
        description: (className = '') => cntl`
            my-3
            text-almost-black
            dark:text-white
            ${className}`,
        link: (className) => cntl`
            text-light-yellow
            hover:text-light-yellow
            font-bold
            ${className}
        `,
    },
}

const border = cntl`
    lg:border-b-0
    border-b
    border-dashed
    border-gray-accent-light
    dark:border-opacity-30
`

export const menuItem = (hideBorder) => cntl`
    lg:flex
    lg:justify-center
    menu-item
    ${!hideBorder ? border : ''}
`
export const link = (className = '') => cntl`
    relative
    font-semibold
    px-4
    py-3
    lg:py-2
    text-[15px]
    dark:text-white
    dark:hover:text-white
    text-almost-black
    hover:text-almost-black
    ${className}
`
