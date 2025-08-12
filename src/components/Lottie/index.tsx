import loadable from '@loadable/component'

// wrap with Gatsby's loadable component to prevent SSR issues
export const SSRLottie = loadable(() => import('react-lottie'), {
    ssr: false,
})
