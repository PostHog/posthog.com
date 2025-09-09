export const PRODUCT_COUNT = 10
export const APP_COUNT = 34 // total of /products - ai agents.md and cdp readme.md
export const CUSTOMER_COUNT = 190254

// screensaver
export const INACTIVITY_TIMEOUTS = {
    FOCUSED: 240000, // 240 seconds (4 minutes)
    UNFOCUSED: 120000, // 120 seconds (2 minutes)
} as const

export const explorerGridColumns =
    'grid-cols-2 @xs:grid-cols-3 @md:grid-cols-3 @lg:grid-cols-4 @xl:grid-cols-5 @2xl:grid-cols-6 @3xl:grid-cols-7 @4xl:grid-cols-8 @5xl:grid-cols-9 @6xl:grid-cols-10 @7xl:grid-cols-11'

// Base prose classes without size modifiers
export const PROSE_CORE = `prose dark:prose-invert
    prose-a:underline 
    prose-a:font-semibold
    
    prose-p:leading-normal 

    prose-li:leading-normal

    prose-h1:tracking-tight
    prose-h1:text-3xl
    prose-h1:mt-0
    prose-h1:mb-2
    
    prose-h2:tracking-tight

    prose-h3:tracking-tight

    prose-img:m-0

    `

export const PROSE = `${PROSE_CORE} `

// Function to generate prose classes with size variations
export const getProseClasses = (size?: 'sm' | 'base' | 'lg') => {
    switch (size) {
        case 'base':
            return PROSE_CORE
        case 'lg':
            return `${PROSE_CORE} prose-lg`
        case 'sm':
        default:
            return `${PROSE_CORE} prose-sm prose-h1:text-2xl`
    }
}
