import React from 'react'

export default function Logo({ noText = false, color = '', fill = '', className = '' }) {
    return (
        <svg
            className={`${className} ${fill ? 'fill-' + fill : ''}`}
            width={noText ? '52' : '161'}
            height="28"
            viewBox={`0 0 ${noText ? '52' : '161'} 28`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g id="Logo 3001">
                <g id="Group 144111">
                    <g id="Primative/Logomark" clipPath="url(#clip0_3109_164)">
                        <path
                            id="head"
                            fill={fill || '#111'}
                            d="m50.01 23.338-.338-.041a4.48 4.48 0 0 1-2.654-1.327L33.285 7.743V28h15.712c1.478 0 2.672-1.199 2.672-2.672v-.104a1.9 1.9 0 0 0-1.665-1.886zm-10.81.21a1.781 1.781 0 1 1 0-3.563 1.781 1.781 0 0 1 0 3.562"
                        />
                        <path
                            id="yellow-3"
                            fill={fill || 'url(#paint0_linear_3109_164)'}
                            d="M21.97 28h9.046l-9.047-9.308z"
                        />
                        <path
                            id="yellow-2"
                            fill={fill || 'url(#paint1_linear_3109_164)'}
                            d="M21.97 7.65v11.042L31.015 28h2.276v-8.71z"
                        />
                        <path
                            id="yellow-1"
                            fill={fill || 'url(#paint2_linear_3109_164)'}
                            d="M33.292 19.298V7.742L26.556.815C24.886-.908 21.97.28 21.97 2.678V7.65l11.323 11.642z"
                        />
                        <path
                            id="red-3"
                            fill={fill || 'url(#paint3_linear_3109_164)'}
                            d="M10.74 28h8.86l-8.86-9.267z"
                        />
                        <path
                            id="red-2"
                            fill={fill || 'url(#paint4_linear_3109_164)'}
                            d="M10.74 7.143v11.59L19.6 28h2.37v-9.308z"
                        />
                        <path
                            id="red-1"
                            fill={fill || 'url(#paint5_linear_3109_164)'}
                            d="M21.97 7.65 15.326.814C13.657-.908 10.74.28 10.74 2.678V7.15l11.23 11.542z"
                        />
                        <path
                            id="blue-3"
                            fill={fill || 'url(#paint6_linear_3109_164)'}
                            d="M0 25.41A2.59 2.59 0 0 0 2.59 28h6.355L0 18.18z"
                        />
                        <path
                            id="blue-2"
                            fill={fill || 'url(#paint7_linear_3109_164)'}
                            d="M10.74 18.725V28H8.941L0 18.184V7.509z"
                        />
                        <path
                            id="blue-1"
                            fill={fill || 'url(#paint8_linear_3109_164)'}
                            d="M10.74 7.143 4.587.815C2.917-.908 0 .28 0 2.678V7.51l10.74 11.223z"
                        />
                    </g>
                </g>
                {!noText && (
                    <g id="Wordmark frame">
                        <g id="Primative/Wordmark">
                            <g id="PostHog" fill={fill || '#111'}>
                                <path d="M64.907 22.876c-.68 0-1.232-.551-1.232-1.232V5.232c0-.68.552-1.232 1.232-1.232h6.588c3.91 0 6.418 2.32 6.418 5.906s-2.508 5.905-6.418 5.905h-3.56v5.833c0 .68-.551 1.232-1.232 1.232zm3.029-11.938c0 .681.551 1.233 1.232 1.233h1.896c1.618 0 2.588-.863 2.588-2.265s-.97-2.266-2.588-2.266h-1.896c-.68 0-1.233.552-1.233 1.233zM84.812 23.092c-4.206 0-7.173-2.966-7.173-7.011s2.967-7.011 7.173-7.011c4.153 0 7.173 2.966 7.173 7.01 0 4.046-3.02 7.012-7.173 7.012m-3.236-7.011c0 2.157 1.295 3.64 3.236 3.64 1.915 0 3.21-1.483 3.21-3.64s-1.295-3.64-3.21-3.64c-1.941 0-3.236 1.483-3.236 3.64M97.995 23.092c-2.733 0-4.605-1.372-5.572-3.002-.337-.568-.01-1.259.605-1.499l.784-.306c.69-.268 1.447.156 1.91.733a2.86 2.86 0 0 0 2.273 1.08c1.051 0 1.752-.511 1.752-1.267 0-2.13-7.2-.7-7.2-5.851 0-2.13 1.861-3.91 4.854-3.91 2.273 0 4.22.902 5.193 2.309.363.525.045 1.195-.545 1.44l-.859.357c-.681.283-1.449-.14-1.998-.635a2.52 2.52 0 0 0-1.656-.64c-.89 0-1.51.378-1.51.97 0 2.158 7.308.378 7.308 5.88 0 2.346-2.157 4.341-5.34 4.341M112.699 21.78c.045.565-.3 1.098-.858 1.199a7 7 0 0 1-1.277.113c-2.94 0-5.178-1.564-5.178-4.854v-5.663h-.925a1.23 1.23 0 0 1-1.232-1.232v-.825c0-.68.551-1.233 1.232-1.233h.925V6.581c0-.68.552-1.233 1.232-1.233h1.5c.68 0 1.232.552 1.232 1.233v2.704h2.058c.68 0 1.232.552 1.232 1.233v.825c0 .68-.552 1.232-1.232 1.232h-2.058v5.15c0 1.214.647 1.915 1.618 1.915.749 0 1.603.51 1.662 1.257zM125.787 5.232c0-.68.552-1.232 1.232-1.232h1.823c.681 0 1.232.552 1.232 1.232v16.412c0 .68-.551 1.232-1.232 1.232h-1.823c-.68 0-1.232-.551-1.232-1.232v-5.436c0-.681-.552-1.233-1.233-1.233h-5.031c-.681 0-1.233.552-1.233 1.233v5.436c0 .68-.552 1.232-1.232 1.232h-1.796a1.23 1.23 0 0 1-1.232-1.232V5.232c0-.68.551-1.232 1.232-1.232h1.796c.68 0 1.232.552 1.232 1.232v4.87c0 .681.552 1.233 1.233 1.233h5.031c.681 0 1.233-.552 1.233-1.233zM138.723 23.092c-4.207 0-7.173-2.966-7.173-7.011s2.966-7.011 7.173-7.011c4.152 0 7.173 2.966 7.173 7.01 0 4.046-3.021 7.012-7.173 7.012m-3.236-7.011c0 2.157 1.294 3.64 3.236 3.64 1.914 0 3.209-1.483 3.209-3.64s-1.295-3.64-3.209-3.64c-1.942 0-3.236 1.483-3.236 3.64M152.738 22.445c-3.856 0-6.229-2.589-6.229-6.688s2.373-6.687 6.148-6.687c1.591 0 2.831.539 3.559 1.375 0-.64.52-1.16 1.16-1.16h1.518c.681 0 1.233.552 1.233 1.233v11.388c0 3.64-2.778 6.094-6.958 6.094-2.655 0-4.915-1.201-5.873-3.087-.316-.621.159-1.29.847-1.398l1.156-.18c.665-.105 1.284.399 1.782.853.502.459 1.263.71 2.088.71 1.861 0 3.074-1.05 3.074-2.56v-1.295c-.701.89-2.022 1.402-3.505 1.402m-2.373-6.688c0 2.023 1.186 3.317 3.02 3.317 1.861 0 3.047-1.294 3.047-3.317 0-2.022-1.186-3.317-3.047-3.317-1.834 0-3.02 1.295-3.02 3.317" />
                            </g>
                        </g>
                    </g>
                )}
            </g>
            <defs>
                <linearGradient
                    id="paint0_linear_3109_164"
                    x1="22.071"
                    x2="30.982"
                    y1="18.91"
                    y2="27.977"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#ff9500" />
                    <stop offset="1" stopColor="#f8aa00" />
                </linearGradient>
                <linearGradient
                    id="paint1_linear_3109_164"
                    x1="21.918"
                    x2="33.327"
                    y1="7.967"
                    y2="27.933"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#ffb700" />
                    <stop offset="1" stopColor="#f9aa01" />
                </linearGradient>
                <linearGradient
                    id="paint2_linear_3109_164"
                    x1="21.918"
                    x2="33.327"
                    y1="1.962"
                    y2="18.776"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#ffd849" />
                    <stop offset=".956" stopColor="#fbae01" />
                </linearGradient>
                <linearGradient
                    id="paint3_linear_3109_164"
                    x1="10.358"
                    x2="16.631"
                    y1="19.676"
                    y2="27.977"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#c42c00" />
                    <stop offset="1" stopColor="#d63600" />
                </linearGradient>
                <linearGradient
                    id="paint4_linear_3109_164"
                    x1="10.659"
                    x2="22.668"
                    y1="7.366"
                    y2="28.233"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#ef3c00" />
                    <stop offset="1" stopColor="#d63601" />
                </linearGradient>
                <linearGradient
                    id="paint5_linear_3109_164"
                    x1="10.776"
                    x2="21.967"
                    y1="7.253"
                    y2="18.651"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#ff651e" />
                    <stop offset="1" stopColor="#e4400a" />
                </linearGradient>
                <linearGradient
                    id="paint6_linear_3109_164"
                    x1="0"
                    x2="9.222"
                    y1="18.94"
                    y2="28.266"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#0041c6" />
                    <stop offset="1" stopColor="#0045d0" />
                </linearGradient>
                <linearGradient
                    id="paint7_linear_3109_164"
                    x1="-4.654"
                    x2="8.859"
                    y1="13.811"
                    y2="27.977"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#0255ff" />
                    <stop offset="1" stopColor="#0145d2" />
                </linearGradient>
                <linearGradient
                    id="paint8_linear_3109_164"
                    x1="-5.104"
                    x2="10.809"
                    y1="1.802"
                    y2="19.516"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#3f80ff" />
                    <stop offset="1" stopColor="#084fe0" />
                </linearGradient>
                <clipPath id="clip0_3109_164">
                    <path fill="#fff" d="M0 0h51.675v28H0z" />
                </clipPath>
            </defs>
        </svg>
    )
}
