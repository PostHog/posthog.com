export const PRODUCT_COUNT = 10

// Base prose classes without size modifiers
export const PROSE_CORE = `prose 
    prose-a:underline 
    prose-a:font-semibold
    
    prose-p:mt-0 
    prose-p:leading-normal 
    prose-p:mb-2 
    prose-li:leading-normal

    prose-h1:tracking-tight
    prose-h2:tracking-tight
    prose-h3:tracking-tight

    prose-h1:mt-0
    prose-h2:mt-0
    
    max-w-none`

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
