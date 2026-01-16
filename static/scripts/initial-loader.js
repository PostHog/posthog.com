;(function () {
    try {
        const LOADING_MESSAGES = [
            'Booting the PostHog.com experience',
            'Sourcing and transforming nodes',
            'Compiling hedgehog shaders',
            'Rebuilding webpack',
            `Running <code>yarn serve</code>`,
        ]
        const body = document.body
        const loadingWrapper = document.createElement('div')
        const loadingStyles = document.createElement('style')
        loadingStyles.textContent = `
            #initial-loader {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                pointer-events: none;
            }
            #initial-loader-content {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0.5rem;
                width: 20rem;
                background: #FDFDF8;
                backdrop-filter: blur(8px);
                border: 1px solid #BFC1B7;
                border-radius: 0.25rem;
                padding: 1rem;
                box-shadow: 0 25px 25px -12px rgb(0 0 0 / 0.1);
            }
            body.dark #initial-loader-content {
                background: rgba(30, 31, 35, 0.75);
                border-color: rgba(255, 255, 255, 0.1);
            }
            .hourglass-spinner {
                animation: hourglass-flip 2.4s ease-in-out infinite;
                opacity: 0.75;
            }
            @keyframes hourglass-flip {
                0%, 40% { transform: rotate(0deg); }
                48%, 90% { transform: rotate(180deg); }
                98%, 100% { transform: rotate(360deg); }
            }
            .sand-top {
                transform-origin: center bottom;
                animation: sand-drain-top 2.4s ease-in-out infinite;
            }
            .sand-bottom {
                transform-origin: center top;
                animation: sand-drain-bottom 2.4s ease-in-out infinite;
            }
            @keyframes sand-drain-top {
                0% { transform: scaleY(1); opacity: 0.6; }
                40% { transform: scaleY(0); opacity: 0; }
                48%, 100% { transform: scaleY(0); opacity: 0; }
            }
            @keyframes sand-drain-bottom {
                0%, 48% { transform: scaleY(0); opacity: 0; }
                50% { transform: scaleY(1); opacity: 0.6; }
                90% { transform: scaleY(0); opacity: 0; }
                100% { transform: scaleY(0); opacity: 0; }
            }
            #initial-loader-text {
                flex: 1;
                font-weight: 500;
                color: rgba(0, 0, 0, 0.8);
            }
            body.dark #initial-loader-text {
                color: rgba(255, 255, 255, 0.8);
            }
            body.dark .hourglass-spinner {
                color: rgba(255, 255, 255, 0.8);
            }
        `
        loadingWrapper.id = 'initial-loader'
        loadingWrapper.innerHTML = `
            <div id="initial-loader-content">
                <svg class="hourglass-spinner" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M6 2h12M6 22h12M18 2v3.5c0 1.5-1 2.5-2.5 4L12 13l-3.5-3.5C7 8 6 7 6 5.5V2M18 22v-3.5c0-1.5-1-2.5-2.5-4L12 11l-3.5 3.5C7 16 6 17 6 18.5V22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path class="sand-top" d="M8 4 L16 4 L14.5 7 L9.5 7 Z" fill="currentColor" opacity="0.6"/>
                    <path class="sand-bottom" d="M8 20 L16 20 L14.5 17 L9.5 17 Z" fill="currentColor" opacity="0.6"/>
                </svg>
                <div id="initial-loader-text" class="text-sm">Hydrating the hedgehogs...</div>
            </div>
        `
        body.appendChild(loadingStyles)
        body.appendChild(loadingWrapper)
        let currentMessageIndex = 0
        const intervalId = setInterval(() => {
            const currentMessage = LOADING_MESSAGES[currentMessageIndex]
            loadingWrapper.querySelector('#initial-loader-text').innerHTML = currentMessage
            currentMessageIndex = (currentMessageIndex + 1) % LOADING_MESSAGES.length
        }, 1300)

        const cleanup = () => {
            clearInterval(intervalId)
            loadingWrapper.remove()
            loadingStyles.remove()
        }

        if (window.__desktopLoaded) {
            cleanup()
        } else {
            window.addEventListener('desktopLoaded', cleanup, { once: true })
        }
    } catch (error) {
        console.error('Failed to initialize loading spinner:', error)
    }
})()
