; (function () {
    try {
        const websiteMode = JSON.parse(localStorage.getItem('siteSettings') || '{}').experience === 'boring'
        if (websiteMode) return
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
                width: 20rem;
                --logomark-jump-magnitude: 1;
                --logomark-jump-time: .4s;
            }
            body.dark #initial-loader-content {
                background: rgba(30, 31, 35, 0.75);
                border-color: rgba(255, 255, 255, 0.1);
            }
            body.dark #initial-loader-logomark #blue,
            body.dark #initial-loader-logomark #red,
            body.dark #initial-loader-logomark #yellow,
            body.dark #initial-loader-logomark #head path {
                fill: #ffffff;
            }
            #initial-loader-logomark {
                width: 48px;
                height: 28px;
                overflow: visible;
                flex-shrink: 0;
            }
            #initial-loader-content.animate-logomark-jump #initial-loader-logomark > * {
                animation-name: initial-loader-logomark-jump;
                animation-timing-function: cubic-bezier(.6, 0, .2, .8);
                animation-iteration-count: infinite;
                animation-duration: calc(var(--logomark-jump-time, .4s) * 25);
                animation-fill-mode: both;
                transform-box: fill-box;
                transform-origin: 50% 100%;
                transform: translateZ(0);
                backface-visibility: hidden;
                will-change: transform;
            }
            #initial-loader-content.animate-logomark-jump #initial-loader-logomark #red {
                animation-delay: calc(var(--logomark-jump-time, .4s) * 0.2666667);
            }
            #initial-loader-content.animate-logomark-jump #initial-loader-logomark #yellow {
                animation-delay: calc(var(--logomark-jump-time, .4s) * 0.5333333);
            }
            #initial-loader-content.animate-logomark-jump #initial-loader-logomark #head {
                animation-delay: calc(var(--logomark-jump-time, .4s) * 0.8);
            }
            @keyframes initial-loader-logomark-jump {
                0%,
                8.5%,
                100% {
                    transform: translateY(0);
                }
                2.8% {
                    transform: translateY(calc(var(--logomark-jump-magnitude, 1) * -2.8px));
                }
                4.6% {
                    transform: translateY(calc(var(--logomark-jump-magnitude, 1) * -1px));
                }
                6.4% {
                    transform: translateY(calc(var(--logomark-jump-magnitude, 1) * -0.2px));
                }
            }
        `
        loadingWrapper.id = 'initial-loader'
        loadingWrapper.innerHTML = `
            <div id="initial-loader-content" class="animate-logomark-jump" style="--logomark-jump-magnitude: 1.75;">
                <svg id="initial-loader-logomark" width="48" height="28" viewBox="0 0 48 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path id="blue" class="segment"
                        d="M0 22.4082C0 21.5173 1.07707 21.0712 1.70703 21.7012L6.29004 26.2842C6.92 26.9141 6.47391 27.9912 5.58301 27.9912H1C0.447715 27.9912 0 27.5435 0 26.9912V22.4082ZM0 12.4112C0 11.5203 1.07707 11.0742 1.70703 11.7041L9.99707 19.9942V27.9912L0.292969 18.2871C0.105496 18.0996 0 17.8453 0 17.5801V12.4112ZM0 2.41412C4.22779e-05 1.52327 1.07708 1.07718 1.70703 1.70709L9.99707 9.99711V17.9942L0.292969 8.29008C0.10552 8.10256 0 7.8482 0 7.58306V2.41412Z"
                        fill="#3F80FF"></path>
                    <path id="red" class="segment"
                        d="M16.2861 26.2842C16.9161 26.9141 16.47 27.9912 15.5791 27.9912H9.99609V19.9942L16.2861 26.2842ZM19.7002 19.7012C19.8877 19.8887 19.9932 20.143 19.9932 20.4082V27.9912L10.2891 18.2871C10.1016 18.0996 9.99609 17.8453 9.99609 17.5801V9.99711L19.7002 19.7012ZM9.99609 2.41412C9.99613 1.52326 11.0732 1.07718 11.7031 1.70709L19.7002 9.70414C19.8877 9.89167 19.9932 10.146 19.9932 10.4112V17.9942L10.2891 8.29008C10.1016 8.10256 9.99609 7.8482 9.99609 7.58305V2.41412Z"
                        fill="#DF3902"></path>
                    <path id="yellow" class="segment"
                        d="M16.2871 26.2842C16.9171 26.9141 16.471 27.9912 15.5801 27.9912H15.5791C16.47 27.9912 16.9161 26.9141 16.2861 26.2842L9.99707 19.9951V19.9941L16.2871 26.2842ZM26.2842 26.2842C26.9141 26.9141 26.4681 27.9912 25.5771 27.9912H20.4082C20.2633 27.9912 20.1224 27.9585 19.9932 27.8994V20.4082C19.9931 20.143 19.8877 19.8887 19.7002 19.7012L9.99707 9.99805V9.99707L26.2842 26.2842ZM5.89453 27.9434L5.89551 27.9443L5.89453 27.9434ZM6.44434 27.501C6.39679 27.5822 6.33829 27.6572 6.26953 27.7227H6.26855C6.30313 27.6898 6.33488 27.6544 6.36426 27.6172C6.39365 27.58 6.42047 27.5408 6.44434 27.5V27.501ZM6.57031 26.8164C6.59507 26.9587 6.5885 27.1033 6.55273 27.2402L6.50684 27.374C6.57896 27.1999 6.60326 27.0061 6.57031 26.8164ZM11.0283 1.41211C11.2662 1.41789 11.507 1.51 11.7041 1.70703L29.6982 19.7012C29.8857 19.8887 29.9912 20.143 29.9912 20.4082V25.5771C29.9912 26.4681 28.9141 26.9141 28.2842 26.2842L19.9932 17.9932V10.4111C19.9931 10.146 19.8877 9.89162 19.7002 9.7041L11.7031 1.70703C11.5063 1.51027 11.2659 1.41812 11.0283 1.41211ZM6.39551 26.4072H6.39648H6.39551ZM9.99707 17.5996C10.002 17.8529 10.1028 18.0946 10.2793 18.2764L9.99707 17.9941V17.5996ZM19.9941 2.41406C19.9943 1.52326 21.0712 1.07711 21.7012 1.70703L29.6982 9.7041C29.8857 9.89161 29.9912 10.146 29.9912 10.4111V15.5801C29.9912 16.471 28.9141 16.9171 28.2842 16.2871L20.2871 8.29004C20.0996 8.10251 19.9941 7.84817 19.9941 7.58301V2.41406Z"
                        fill="#FE9B02"></path>
                    <g id="head" class="segment">
                        <path
                            d="M42.5261 22.5308L33.1134 13.1181C32.4834 12.4881 31.4062 12.9343 31.4062 13.8252V26.9916C31.4062 27.5439 31.854 27.9916 32.4062 27.9916H46.9869C47.5392 27.9916 47.9869 27.5439 47.9869 26.9916V25.7926C47.9869 25.2403 47.5373 24.7992 46.9896 24.7279C45.3088 24.5091 43.7368 23.7415 42.5261 22.5308ZM36.2048 24.7926C35.3219 24.7926 34.6053 24.076 34.6053 23.193C34.6053 22.3101 35.3219 21.5935 36.2048 21.5935C37.0877 21.5935 37.8043 22.3101 37.8043 23.193C37.8043 24.076 37.0877 24.7926 36.2048 24.7926Z"
                            fill="#111111"></path>
                    </g>
                </svg>
            </div>
        `
        body.appendChild(loadingStyles)
        body.appendChild(loadingWrapper)

        const cleanup = () => {
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
