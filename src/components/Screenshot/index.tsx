import React from 'react'
import usePostHog from '../../hooks/usePostHog'
import { useValues } from 'kea'
import { layoutLogic } from 'logic/layoutLogic'

interface ScreenshotProps {
  icon: React.ReactNode
  product: string
  slug: string
  order: number
  src: string
  className?: string
}

export const Screenshot = ({ icon, product, slug, order, src, className = '' }: ScreenshotProps): JSX.Element => {
  const posthog = usePostHog()
  const region = posthog?.getFeatureFlag?.('are-you-in-the-eu') ? 'eu' : 'us'

  // each nav item is 36.5px tall. specify the order in the instance (starting at 0).
  const navOrder = 36.5 * order
  // offset the nav item's vertical positioning by the order. (adds it to the Y-axis.)
  const navOrderOffset = navOrder

  const { websiteTheme } = useValues(layoutLogic)
  const isDark = websiteTheme === 'dark'

  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 1280 736" className={`${className} rounded-md reasonable:max-h-full border border-transparent dark:border-dark/50`}>
      <g clipPath="url(#a)">
        {/* content frame */}
        <path className="fill-light dark:fill-dark" d="M0 0h1280v736H0z" />
        <path fill="url(#b)" d="M0 0h1280v40.937H0z" />
        <path fill="#606367"
          d="M340 19a1 1 0 0 0-1 1v4h-4a1 1 0 0 0 0 2h4v4a1 1 0 0 0 2 0v-4h4a1 1 0 0 0 0-2h-4v-4a1 1 0 0 0-1-1Z" />
        <g filter="url(#c)">
          <path fill="#ED6A5E" fillRule="evenodd" d="M19 28a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z"
            clipRule="evenodd" />
        </g>
        <path stroke="#CE5347" strokeWidth=".5"
          d="M24.75 22a5.75 5.75 0 1 1-11.5 0 5.75 5.75 0 0 1 11.5 0Z" />
        <g filter="url(#d)">
          <path fill="#F6BE4F" fillRule="evenodd" d="M39 28a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z"
            clipRule="evenodd" />
        </g>
        <path stroke="#D6A243" strokeWidth=".5"
          d="M44.75 22a5.75 5.75 0 1 1-11.5 0 5.75 5.75 0 0 1 11.5 0Z" />
        <g filter="url(#e)">
          <path fill="#62C554" fillRule="evenodd" d="M59 28a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z"
            clipRule="evenodd" />
        </g>
        <path stroke="#58A942" strokeWidth=".5"
          d="M64.75 22a5.75 5.75 0 1 1-11.5 0 5.75 5.75 0 0 1 11.5 0Z" />

        {/* active browser tab background */}
        <path fill={isDark ? '#35363A' : '#fff'} fillRule="evenodd"
          d="M86 8a8 8 0 0 0-8 8v18a8 8 0 0 1-8 8h256a8 8 0 0 1-8-8V16a8 8 0 0 0-8-8H86Z"
          clipRule="evenodd" />

        <mask id="g" width="177" height="20" x="114" y="15" maskUnits="userSpaceOnUse"
          style={{ maskType: 'alpha' }}>
          <path fill="url(#f)" d="M114 15h177v20H114z" />
        </mask>
        <g mask="url(#g)">
          <text xmlSpace="preserve" fill={isDark ? '#fff' : '#3D4043'} fontFamily="-apple-system,BlinkMacSystemFont,avenir next, sans-serif" fontSize="12"
            letterSpacing="0em" style={{ whiteSpace: 'pre' }}><tspan x="114" y="29.266">{product} | PostHog</tspan></text>
        </g>
        <path fill="#5E6063"
          d="M298.281 27.816a.707.707 0 0 0 1 1l2.758-2.758 2.758 2.758a.707.707 0 0 0 1-1l-2.758-2.758 2.758-2.758a.707.707 0 0 0-1-1l-2.758 2.758-2.758-2.758a.707.707 0 1 0-1 1l2.758 2.758-2.758 2.758Z" />
        {/* favicon */}
        <rect width="18" height="18" x="91" y="16" fill="#111" rx="2" />
        <g fill="#fff" clipPath="url(#h)">
          <path
            d="M96.21 25.054a.572.572 0 1 1-1.024-.512.572.572 0 1 1 1.024.512ZM96.21 28.253a.572.572 0 1 1-1.024-.512.572.572 0 1 1 1.024.512Z" />
          <path
            d="M92.5 28.22c0-.554.67-.832 1.062-.44l.435.435a.622.622 0 0 1-.44 1.062h-.435a.622.622 0 0 1-.622-.622v-.435Zm0-2.4c0 .165.066.324.182.44l2.835 2.835a.622.622 0 0 0 .44.182h.8c.553 0 .831-.67.44-1.062l-3.635-3.634a.622.622 0 0 0-1.062.44v.8Zm0-3.199c0 .165.066.324.182.44l6.034 6.034a.622.622 0 0 0 .44.182h.8c.553 0 .831-.67.439-1.062l-6.833-6.833a.622.622 0 0 0-1.062.44v.8Zm3.199 0c0 .165.066.324.182.44l5.154 5.154a.622.622 0 0 0 1.062-.44v-.8a.62.62 0 0 0-.182-.44l-5.154-5.153a.622.622 0 0 0-1.062.44v.8Zm4.261-1.239a.622.622 0 0 0-1.062.44v.8c0 .164.066.323.182.44l1.955 1.954a.622.622 0 0 0 1.062-.44v-.8a.62.62 0 0 0-.182-.44l-1.955-1.954ZM106.105 27.53l-2.496-2.497a.622.622 0 0 0-1.062.44v3.182c0 .343.278.622.622.622h4.172c.283 0 .512-.23.512-.512 0-.282-.232-.506-.509-.564a2.472 2.472 0 0 1-1.239-.672Zm-2.023.723a.512.512 0 1 1 .001-1.023.512.512 0 0 1-.001 1.023Z" />
          <path
            d="M92.5 28.655c0 .343.279.622.622.622h.435c.554 0 .832-.67.44-1.062l-.435-.435a.622.622 0 0 0-1.062.44v.435ZM95.699 23.519l-2.137-2.137a.622.622 0 0 0-1.062.44v.8c0 .164.066.323.182.44l3.017 3.016v-2.56ZM93.562 24.58a.622.622 0 0 0-1.062.44v.8c0 .165.066.323.182.44l3.017 3.017v-2.56l-2.137-2.136ZM98.898 23.777a.622.622 0 0 0-.182-.44l-1.955-1.955a.622.622 0 0 0-1.062.44v.8c0 .164.066.323.183.44l3.016 3.016v-2.301ZM95.7 29.277h1.056c.555 0 .832-.67.44-1.062L95.7 26.718v2.559Z" />
          <path
            d="M95.7 23.519v2.302c0 .165.065.323.181.44l3.017 3.016v-2.301a.622.622 0 0 0-.182-.44l-3.017-3.017Z" />
        </g>

        {/* address bar row background */}
        <path fill={isDark ? '#35363A' : '#fff'} d="M0 40.937h1280V77H0z" />

        <path className="fill-[#B6B6B6] dark:fill-[#282828]" d="M0 76.513h1280V77H0z" />

        {/* back button */}
        <path fill={isDark ? '#F1F3F4' : '#606367'} fillRule="evenodd"
          d="M22.285 53.818a.75.75 0 0 1-.01 1.06L18.084 59h9.667a.75.75 0 0 1 0 1.5h-9.66l4.184 4.089a.75.75 0 0 1-1.048 1.072l-5.5-5.375a.75.75 0 0 1-.002-1.07l5.5-5.407a.75.75 0 0 1 1.06.009Z"
          clipRule="evenodd" />

        {/* forward button */}
        <path fill={isDark ? "#86888A" : "#BABCBE"} fillRule="evenodd"
          d="M53.715 53.818a.75.75 0 0 0 .01 1.06L57.916 59H48.25a.75.75 0 0 0 0 1.5h9.66l-4.184 4.089a.75.75 0 0 0 1.048 1.072l5.5-5.375a.75.75 0 0 0 .002-1.07l-5.5-5.407a.75.75 0 0 0-1.06.009Z"
          clipRule="evenodd" />

        {/* refresh button */}
        <path fill={isDark ? '#F1F3F4' : '#606367'}
          d="M81 60a5 5 0 0 1 8.777-3.277L87.5 59H93v-5.5l-2.16 2.16a6.5 6.5 0 1 0 1.015 7.166.75.75 0 1 0-1.35-.653A5 5 0 0 1 81 60Z" />

        {/* address bar background */}
        <rect width="1128" height="28" x="108" y="46" fill={isDark ? '#202124' : '#F1F3F4'} rx="14" />

        {/* secure site */}
        <path fill={isDark ? '#EAEAEA' : '#606367'} fillRule="evenodd"
          d="M126 55a2.5 2.5 0 0 0-2.5 2.5v1h-.5a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1h-.5v-1A2.5 2.5 0 0 0 126 55Zm1.5 3.5v-1a1.5 1.5 0 0 0-3 0v1h3Z"
          clipRule="evenodd" />

        {/* address bar text */}
        <text xmlSpace="preserve" fill={isDark ? '#fff' : '#202124'} fontFamily="-apple-system,BlinkMacSystemFont,avenir next, sans-serif" fontSize="14" letterSpacing="0em" style={{ whiteSpace: 'pre' }}><tspan x="204.48" y="64.977">.posthog.com/{slug}</tspan></text>

        {/* protocol */}
        <text xmlSpace="preserve" fill={isDark ? '#fff' : '#767676'} fontFamily="-apple-system,BlinkMacSystemFont,avenir next, sans-serif" fontSize="14"
          letterSpacing="0em" style={{ whiteSpace: 'pre' }}><tspan x="142" y="64.977">https://{region}</tspan></text>

        {/* hamburger menu */}
        <path fill={isDark ? '#F1F3F4' : '#606367'}
          d="M1259.5 55.1a1.499 1.499 0 1 1-3 0 1.499 1.499 0 1 1 3 0ZM1259.5 60.1a1.499 1.499 0 1 1-3 0 1.499 1.499 0 1 1 3 0ZM1259.5 65.1a1.499 1.499 0 1 1-3 0 1.499 1.499 0 1 1 3 0Z" />
        <mask id="i" fill="#fff">
          <path d="M215 77h1065v60H215V77Z" />
        </mask>

        {/* app header background */}
        <path className="fill-accent dark:fill-accent-dark" d="M215 77h1065v60H215V77Z" />

        {/* app header bottom border */}
        <path className="fill-border dark:fill-border-dark" d="M1280 136H215v2h1065v-2Z" mask="url(#i)" />

        {/* app header slash */}
        <text xmlSpace="preserve" className="fill-dark dark:fill-white opacity-50" fontFamily="-apple-system,BlinkMacSystemFont,avenir next, sans-serif" fontSize="12" fontWeight="600" letterSpacing="0em" style={{ whiteSpace: 'pre' }}><tspan x="318.578" y="99.165">/</tspan></text>

        {/* breadcrumb skeleton */}
        <rect width="100" height="20" x="330.531" y="84" className="fill-border dark:fill-border-dark" rx="4" />
        <rect width="81" height="20" x="232" y="84" className="fill-border dark:fill-border-dark" rx="4" />

        {/* breadcrumb product name */}
        <text xmlSpace="preserve" className="fill-dark dark:fill-white font-bold" fontFamily="-apple-system,BlinkMacSystemFont,avenir next, sans-serif" fontSize="16" letterSpacing="0em" style={{ whiteSpace: 'pre' }}><tspan x="231" y="125.187">{product}</tspan></text>

        {/* app background */}
        <path fill="url(#j)" d="M215 77h1017v659H215z" />
        <mask id="k" fill="#fff">
          <path d="M0 77h215v659H0V77Z" />
        </mask>
        <path className="fill-light dark:fill-dark" d="M0 77h215v659H0V77Z" />
        <path className="fill-border dark:fill-border-dark" d="M214 77v659h2V77h-2Z" mask="url(#k)" />

        <mask id="l" fill="#fff">
          <path d="M-2 76h217v194H-2V76Z" />
        </mask>
        <path className="fill-border dark:fill-border-dark" d="M215 269H-2v2h217v-2Z" mask="url(#l)" />
        <rect width="81" height="24" x="8" y="86" className="fill-border dark:fill-border-dark" rx="4" />
        <rect width="172" height="24" x="8" y="116" className="fill-border dark:fill-border-dark" rx="4" />
        <rect width="101" height="24" x="8" y="146" className="fill-border dark:fill-border-dark" rx="4" />
        <rect width="126" height="24" x="8" y="176" className="fill-border dark:fill-border-dark" rx="4" />
        <rect width="81" height="24" x="8" y="206" className="fill-border dark:fill-border-dark" rx="4" />
        <rect width="87" height="24" x="8" y="236" className="fill-border dark:fill-border-dark" rx="4" />
        <rect width="81" height="24" x="8" y="640" className="fill-border dark:fill-border-dark" rx="4" />
        <rect width="126" height="24" x="8" y="670" className="fill-border dark:fill-border-dark" rx="4" />
        <rect width="81" height="24" x="8" y="700" className="fill-border dark:fill-border-dark" rx="4" />
        <rect width="151" height="28" x="8" y="280" className="fill-border dark:fill-border-dark" rx="4" />
        <rect width="109" height="28" x="8" y="316" className="fill-border dark:fill-border-dark" rx="4" />
        <rect width="116" height="28" x="8" y="352" className="fill-border dark:fill-border-dark" rx="4" />
        <rect width="126" height="28" x="8" y="388" className="fill-border dark:fill-border-dark" rx="4" />
        <rect width="102" height="28" x="8" y="424" className="fill-border dark:fill-border-dark" rx="4" />
        <rect width="87" height="28" x="8" y="460" className="fill-border dark:fill-border-dark" rx="4" />
        <rect width="151" height="28" x="8" y="496" className="fill-border dark:fill-border-dark" rx="4" />
        <rect width="121" height="28" x="8" y="532" className="fill-border dark:fill-border-dark" rx="4" />

        {/* active button shadow */}
        <rect width="192.5" height="10" x="8.75" y={301.5 + navOrderOffset} className="fill-[#E0DDDD] dark:fill-[#2E2F36] stroke-[#ccc] dark:stroke-[#464A55]" strokeWidth="1.5" rx="5.25" />

        {/* active button background */}
        <rect width="192.5" height="31.5" x="8.75" y={275.75 + navOrderOffset}
          strokeWidth="1.5" rx="5.25" className="fill-white dark:fill-accent-dark stroke-border dark:stroke-border-dark" />

        {/* active product icon */}
        <g transform={`translate(8, ${280 + navOrderOffset})`}>
          <g transform="scale(0.03)" opacity=".5">
            {icon}
          </g>
        </g>

        {/* product label */}
        <text xmlSpace="preserve" className="fill-[#121212] dark:fill-white" fontFamily="-apple-system,BlinkMacSystemFont,avenir next, sans-serif" fontSize="14"
          fontWeight="600" letterSpacing="0em" transform={`translate(40, ${284.5 + navOrderOffset})`} style={{ whiteSpace: 'pre', fontVariationSettings: "'wght' 800" }}>
          <tspan x="0" y="12.498">{product}</tspan>
        </text>
        {/* end */}

        {/* side panel */}
        <mask id="m" className="fill-border dark:fill-border-dark">
          <path d="M1232 77h48v661h-48V77Z" />
        </mask>
        <path className="fill-light dark:fill-dark" d="M1232 77h48v661h-48V77Z" />
        <path className="fill-border dark:fill-border-dark" d="M1233 738V77h-2v661h2Z" mask="url(#m)" />

        <path className="fill-primary dark:fill-primary-dark" fillRule="evenodd"
          d="M1247.5 90.25c0-.966.78-1.75 1.75-1.75h13.5c.97 0 1.75.784 1.75 1.75v15.5c0 .966-.78 1.75-1.75 1.75h-13.5c-.97 0-1.75-.784-1.75-1.75v-3.25h-.25a.753.753 0 0 1-.75-.75c0-.414.34-.75.75-.75h.25v-2.25h-.25a.753.753 0 0 1-.75-.75c0-.414.34-.75.75-.75h.25V95h-.25a.753.753 0 0 1-.75-.75c0-.414.34-.75.75-.75h.25v-3.25ZM1249 95h.25c.41 0 .75-.336.75-.75s-.34-.75-.75-.75h-.25v-3.25c0-.138.11-.25.25-.25h13.5c.14 0 .25.112.25.25v15.5c0 .138-.11.25-.25.25h-13.5a.249.249 0 0 1-.25-.25v-3.25h.25c.41 0 .75-.336.75-.75s-.34-.75-.75-.75h-.25v-2.25h.25c.41 0 .75-.336.75-.75s-.34-.75-.75-.75h-.25V95Zm4-.75c0-.414.34-.75.75-.75h4.5c.41 0 .75.336.75.75s-.34.75-.75.75h-4.5a.753.753 0 0 1-.75-.75Zm0 3.75c0-.414.34-.75.75-.75h2.5c.41 0 .75.336.75.75s-.34.75-.75.75h-2.5a.753.753 0 0 1-.75-.75Z"
          clipRule="evenodd" opacity=".5" />

        <text xmlSpace="preserve" className="fill-[#121212] dark:fill-primary-dark" fillOpacity=".6" fontFamily="-apple-system,BlinkMacSystemFont,avenir next, sans-serif"
          fontSize="14" fontWeight="570" letterSpacing="0em" transform="rotate(90 571.25 692.25)" style={{ whiteSpace: 'pre' }}><tspan x="0" y="12.498">Notebooks</tspan></text>
        <g className="fill-primary dark:fill-primary-dark" opacity=".5">
          <path fillRule="evenodd"
            d="M1256 212.5c-4.69 0-8.5 3.806-8.5 8.5s3.81 8.5 8.5 8.5c4.69 0 8.5-3.806 8.5-8.5s-3.81-8.5-8.5-8.5Zm-10 8.5c0-5.523 4.48-10 10-10s10 4.477 10 10-4.48 10-10 10-10-4.477-10-10Zm8-1c0-.414.34-.75.75-.75h1.25c.41 0 .75.336.75.75v5.25c0 .414-.34.75-.75.75a.753.753 0 0 1-.75-.75v-4.5h-.5a.753.753 0 0 1-.75-.75Z"
            clipRule="evenodd" />
          <path d="M1255.5 217c0-.276.22-.5.5-.5s.5.224.5.5-.22.5-.5.5-.5-.224-.5-.5Z" />
          <path fillRule="evenodd"
            d="M1256 217.75a.753.753 0 0 1-.75-.75c0-.414.34-.75.75-.75s.75.336.75.75-.34.75-.75.75Zm0-1.25c-.28 0-.5.224-.5.5s.22.5.5.5.5-.224.5-.5-.22-.5-.5-.5Z"
            clipRule="evenodd" />
        </g>
        <text xmlSpace="preserve" className="fill-[#121212] dark:fill-primary-dark" fillOpacity=".6" fontFamily="-apple-system,BlinkMacSystemFont,avenir next, sans-serif"
          fontSize="14" fontWeight="570" letterSpacing="0em" transform="rotate(90 509.75 753.75)" style={{ whiteSpace: 'pre' }}><tspan x="0" y="12.498">Docs</tspan></text>
        <path className="fill-primary dark:fill-primary-dark" fillRule="evenodd"
          d="M1249.48 300.543a8.507 8.507 0 0 0 0 10.914l2.49-2.492A4.986 4.986 0 0 1 1251 306c0-1.11.36-2.136.97-2.965l-2.49-2.492Zm1.06-1.06 2.49 2.491A4.993 4.993 0 0 1 1256 301c1.11 0 2.14.362 2.97.974l2.49-2.491a8.473 8.473 0 0 0-5.46-1.983c-2.08 0-3.98.745-5.46 1.983Zm11.98 1.06-2.49 2.492c.61.829.97 1.855.97 2.965 0 1.11-.36 2.136-.97 2.965l2.49 2.492a8.507 8.507 0 0 0 0-10.914Zm-1.06 11.974-2.49-2.491c-.83.612-1.86.974-2.97.974s-2.14-.362-2.97-.974l-2.49 2.491a8.473 8.473 0 0 0 5.46 1.983c2.08 0 3.98-.745 5.46-1.983ZM1246 306c0-5.523 4.48-10 10-10s10 4.477 10 10-4.48 10-10 10-10-4.477-10-10Zm10-3.5c-1.93 0-3.5 1.567-3.5 3.5s1.57 3.5 3.5 3.5 3.5-1.567 3.5-3.5-1.57-3.5-3.5-3.5Z"
          clipRule="evenodd" opacity=".5" />
        <text xmlSpace="preserve" className="fill-[#121212] dark:fill-primary-dark" fillOpacity=".6" fontFamily="-apple-system,BlinkMacSystemFont,avenir next, sans-serif"
          fontSize="14" fontWeight="570" letterSpacing="0em" transform="rotate(90 467.25 796.25)" style={{ whiteSpace: 'pre' }}><tspan x="0" y="12.498">Support</tspan></text>
      </g>
      <defs>
        <filter id="c" width="12" height="12" x="13" y="16" colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix in="SourceAlpha" result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
          <feOffset />
          <feGaussianBlur stdDeviation="3" />
          <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
          <feColorMatrix values="0 0 0 0 0.92549 0 0 0 0 0.427451 0 0 0 0 0.384314 0 0 0 1 0" />
          <feBlend in2="shape" result="effect1_innerShadow_16328_83463" />
        </filter>
        <filter id="d" width="12" height="12" x="33" y="16" colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix in="SourceAlpha" result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
          <feOffset />
          <feGaussianBlur stdDeviation="3" />
          <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
          <feColorMatrix values="0 0 0 0 0.960784 0 0 0 0 0.768627 0 0 0 0 0.317647 0 0 0 1 0" />
          <feBlend in2="shape" result="effect1_innerShadow_16328_83463" />
        </filter>
        <filter id="e" width="12" height="12" x="53" y="16" colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix in="SourceAlpha" result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
          <feOffset />
          <feGaussianBlur stdDeviation="3" />
          <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
          <feColorMatrix values="0 0 0 0 0.407843 0 0 0 0 0.8 0 0 0 0 0.345098 0 0 0 1 0" />
          <feBlend in2="shape" result="effect1_innerShadow_16328_83463" />
        </filter>
        <linearGradient id="b" x1="640" x2="640" y1="0" y2="40.937" gradientUnits="userSpaceOnUse">
          <stop offset=".006" stopColor={isDark ? '#202124' : '#DFE1E5'} />
          <stop offset=".994" stopColor={isDark ? '#202124' : '#DFE1E5'} />
        </linearGradient>
        <linearGradient id="f" x1="291" x2="114" y1="25" y2="25" gradientUnits="userSpaceOnUse">
          <stop stopOpacity="0" />
          <stop offset=".1" />
        </linearGradient>
        <clipPath id="a">
          {/* background */}
          <path fill={isDark ? '#202124' : '#fff'} d="M0 0h1280v736H0z" />
        </clipPath>
        {/* not sure */}
        <clipPath id="h">
          <path fill={isDark ? '#202124' : '#fff'} d="M92.5 20h16v9.6h-16z" />
        </clipPath>
        <pattern id="j" width="1" height="1" patternContentUnits="objectBoundingBox">
          <use xlinkHref="#n" transform="matrix(.00833 0 0 .01286 0 -.079)" />
        </pattern>
        {/* product screenshot */}
        <image xlinkHref={src} id="n" width="120" height="90" />
      </defs>
    </svg>
  )
}

export default Screenshot