import React from 'react'
import { GatsbyImage, getImage, IGatsbyImageData } from 'gatsby-plugin-image'

interface TeamPatchProps {
  name: string
  imageUrl: IGatsbyImageData | undefined
  color: string
  textColor?: string
  textShadow?: string
  frame: string
  plaque: string
  size?: string
  imageXOffset?: number
  imageYOffset?: number
  imageScale?: number
  className?: string
}

export default function TeamPatch({ name, imageUrl, color, textColor, textShadow, frame, plaque, imageXOffset, imageYOffset, imageScale, className }: TeamPatchProps) {
  return (
    <svg viewBox="0 0 278 305" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" className={`w-full ${className}`}>
      <g id="all variants - slice">
        <g id="marquees - background">
          {plaque === 'straight' && (
            <g id="straight">
              <rect id="Rectangle 170" x="19.555" y="280.42" width="238.888" height="14.2546" rx="7.12732" strokeWidth="2.4577" className={`fill-team-${color}-plaque-shadow stroke-team-${color}-border`} />
          </g>
          )}
          {plaque === 'curved' && (
            <g id="curved">
            <path id="Rectangle 136" d="M4.05433 268.289C53.9505 245.878 93.7581 234.065 134.869 233.736C175.982 233.407 218.525 244.564 273.885 268.32C275.242 268.903 276.14 270.253 276.14 271.711V295.158C276.14 297.82 273.348 299.625 270.87 298.528C220.602 276.276 180.175 264.932 139.516 264.849C98.8568 264.766 58.0882 275.944 7.1364 298.522C4.65676 299.621 1.86166 297.815 1.86166 295.153V271.653C1.86166 270.215 2.72994 268.884 4.05433 268.289Z" strokeWidth="2.4577" className={`fill-team-${color}-plaque-shadow stroke-team-${color}-border`}/>
            </g>
          )}
        </g>

        {frame === 'half-round' && (
          <path id="half-round" d="M237.548 140.827V303.035H38.9662V140.827C38.9662 85.9905 83.4202 41.5365 138.257 41.5365C193.094 41.5365 237.548 85.9905 237.548 140.827Z" stroke-width="3.93231" className={`fill-team-${color}-bg stroke-team-${color}-border`}/>
        )}
        {frame === 'rectangle' && (
          <rect id="rectangle" x="38.9662" y="41.9662" width="198.578" height="261.498" stroke-width="3.93231" className={`fill-team-${color}-bg stroke-team-${color}-border`}/>
        )}
        {frame === 'round' && (
          <rect id="round" x="38.9662" y="41.9662" width="198.578" height="261.498" rx="28.0338" stroke-width="3.93231" className={`fill-team-${color}-bg stroke-team-${color}-border`}/>
        )}
  
        <path id="frame" d="M238.29 140.827V303.035H39.7083V140.827C39.7083 85.9905 84.1624 41.5365 138.999 41.5365C193.836 41.5365 238.29 85.9905 238.29 140.827Z"  strokeWidth="3.93231"  />
        <g id="marquees - solids">
        {plaque === 'curved' && (
          <g id="curved_2">
            <path id="Rectangle 139" d="M23.1566 240.914C95.3745 208.334 181.331 207.803 254.838 240.915C256.135 241.499 256.968 242.8 256.968 244.237V279.091C256.153 280.3 255.53 280.761 255.084 280.923C254.67 281.073 254.193 281.041 253.437 280.695C252.775 280.391 252.066 279.929 251.17 279.344C250.988 279.225 250.797 279.101 250.597 278.971C249.462 278.237 248.124 277.411 246.533 276.74C163.105 241.526 78.7314 253.416 32.0769 276.773C31.1729 277.226 30.235 277.785 29.3373 278.321C29.0899 278.468 28.8456 278.614 28.6059 278.755C27.4598 279.43 26.3936 280.017 25.3946 280.38C24.3954 280.743 23.5905 280.834 22.926 280.662C22.3326 280.507 21.6816 280.099 21.0296 279.106V244.235C21.0296 242.798 21.8614 241.498 23.1566 240.914Z" fill="white" stroke="black" strokeWidth="2.4577"/>
          </g>
        )}
        {plaque === 'straight' && (
          <g id="straight_2">
            <path id="solid white background" d="M23.2416 245.772H254.756C256.792 245.772 258.443 247.422 258.443 249.458V286.181C257.137 284.985 255.777 284.098 254.197 283.487C252.132 282.689 249.786 282.399 246.86 282.399H31.4842C27.5414 282.399 23.2354 283.383 19.555 286.382V249.458C19.555 247.422 21.2055 245.772 23.2416 245.772Z" fill="white" stroke="#40396E" strokeWidth="2.4577"/>
            </g>
          )}
        </g>
      <image 
        id="team-image"
        x={imageXOffset ? imageXOffset : '0'}
        y={imageYOffset ? imageYOffset : '0'}
        width="200"
        height="300"
        href={imageUrl}
        className={`w-full transform ${imageScale && 'scale-' + imageScale}`}
        preserveAspectRatio="xMidYMid meet"
        style={{ pointerEvents: 'none' }}
      />
        <g id="marquees - foreground">
        {plaque === 'curved' && (
          <g id="curved_3">
            <path id="Rectangle 138" d="M23.1566 240.914C95.3745 208.334 181.331 207.803 254.838 240.915C256.135 241.499 256.968 242.8 256.968 244.237V279.091C256.153 280.3 255.53 280.761 255.084 280.923C254.67 281.073 254.193 281.041 253.437 280.695C252.775 280.391 252.066 279.929 251.17 279.344C250.988 279.225 250.797 279.101 250.597 278.971C249.462 278.237 248.124 277.411 246.533 276.74C163.105 241.526 78.7314 253.416 32.0769 276.773C31.1729 277.226 30.235 277.785 29.3373 278.321C29.0899 278.468 28.8456 278.614 28.6059 278.755C27.4598 279.43 26.3936 280.017 25.3946 280.38C24.3954 280.743 23.5905 280.834 22.926 280.662C22.3326 280.507 21.6816 280.099 21.0296 279.106V244.235C21.0296 242.798 21.8614 241.498 23.1566 240.914Z" fill="#FFCD81" fillOpacity="0.8" stroke="black" strokeWidth="2.4577"/>
            <path id="name" fillRule="evenodd" clipRule="evenodd" pathLength="1" d="M20.0462 274.378C20.0299 274.348 19.9353 274.176 19.3856 273.18C18.7214 271.976 18.722 271.975 18.7227 271.975L18.7333 271.969L18.7632 271.953C18.7892 271.939 18.8272 271.918 18.8771 271.891C18.9769 271.837 19.1244 271.758 19.3184 271.656C19.7066 271.451 20.2815 271.153 21.0357 270.775C22.544 270.017 24.7697 268.939 27.6535 267.648C33.4207 265.064 41.8218 261.624 52.3817 258.185C73.4979 251.308 103.269 244.43 137.886 244.43C172.502 244.43 202.087 251.309 223.018 258.186C233.485 261.625 241.793 265.066 247.491 267.65C250.34 268.942 252.536 270.021 254.025 270.778C254.769 271.157 255.336 271.455 255.719 271.66C255.91 271.762 256.055 271.841 256.154 271.895C256.203 271.922 256.24 271.943 256.266 271.957L256.296 271.973L256.304 271.978L256.306 271.979C256.307 271.98 256.308 271.98 255.636 273.18C254.964 274.379 254.964 274.379 254.964 274.379L254.963 274.379L254.958 274.376L254.934 274.363C254.912 274.351 254.878 274.332 254.833 274.307C254.742 274.257 254.605 274.183 254.421 274.085C254.055 273.888 253.504 273.599 252.777 273.229C251.324 272.489 249.164 271.429 246.355 270.155C240.736 267.606 232.521 264.203 222.16 260.799C201.434 253.988 172.144 247.18 137.886 247.18C103.627 247.18 74.1483 253.989 53.2332 260.8C42.7775 264.204 34.4677 267.608 28.7778 270.157C25.9331 271.432 23.7438 272.492 22.2692 273.232C21.5319 273.602 20.9734 273.892 20.601 274.089C20.4148 274.187 20.2752 274.262 20.183 274.311C20.1369 274.336 20.1027 274.355 20.0804 274.367L20.0561 274.38L20.0506 274.383L20.0496 274.384C20.0496 274.384 20.0496 274.384 20.0462 274.378Z" fill="none"/>
            <text fill="#1E2F46" className={`leading-none uppercase font-bold font-squeak [font-variant:none] text-3xl text-${textColor ? textColor : 'white [text-shadow:0_1px_0_rgba(0,0,0,.5)]'
                } ${textShadow === 'light'
                  ? '0_1px_0_rgba(255,255,255,.5)'
                  : textShadow === 'dark'
                    ? '0_1px_0_rgba(0,0,0,.5)'
                    : ''
                }`}>
              <textPath
                href="#name"
                startOffset="26%"
                textAnchor="middle"
              >
                {name}
              </textPath>
            </text>
          </g>
        )}
          {plaque === 'straight' && (
            <g id="straight_3">
              <path id="name background (partially transparent)" d="M23.2416 245.772H254.756C256.792 245.772 258.443 247.422 258.443 249.458V286.181C257.137 284.985 255.777 284.098 254.197 283.487C252.132 282.689 249.786 282.399 246.86 282.399H31.4842C27.5414 282.399 23.2354 283.383 19.555 286.382V249.458C19.555 247.422 21.2055 245.772 23.2416 245.772Z"  fillOpacity="0.8" strokeWidth="2.4577" className={`fill-team-${color}-plaque-bg stroke-team-${color}-plaque-border`} />
              <g id="team name" filter="url(#filter0_i_2806_100)">
                <text className={`leading-none uppercase font-bold font-squeak [font-variant:none] text-3xl text-${textColor ? textColor : 'white [text-shadow:0_1px_0_rgba(0,0,0,.5)]'
                } ${textShadow === 'light'
                  ? '0_1px_0_rgba(255,255,255,.5)'
                  : textShadow === 'dark'
                    ? '0_1px_0_rgba(0,0,0,.5)'
                    : ''
                }`} fill="#FDE3EC" xmlSpace="preserve" style={{ whiteSpace: 'pre' }} letterSpacing="0em" textAnchor="middle" x="140">
                  <tspan y="273.218">{name}</tspan>
                </text>
              </g>
            </g>
          )}
        </g>
      </g>
      <defs>
        <filter id="filter0_i_2806_100" x="30.4902" y="252.41" width="217.025" height="20.6172" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dy="0.737309"/>
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"/>
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow_2806_100"/>
        </filter>
      </defs>
      
    </svg>
  )
}
