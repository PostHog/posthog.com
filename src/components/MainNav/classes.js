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
