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
}

export default function TeamPatch({ name, imageUrl, color, textColor, textShadow, frame, plaque, size }: TeamPatchProps) {
  return (
    <div className={`size-${size === 'lg' ? '72' : size === 'md' ? '56' : size === 'sm' ? '36' : '72'} mx-auto flex justify-center`}>
      <div
        className={`relative ${size === 'lg' ? 'w-48 h-64' : size === 'md' ? 'w-36 h-48' : size === 'sm' ? 'w-24 h-32' : 'w-48 h-64'} shadow-xl ${size === 'lg' ? 'border-4' : size === 'md' ? 'border-3' : size === 'sm' ? 'border-2' : 'border-4'} mx-auto flex items-center justify-center border-team-${color}-border bg-team-${color}-bg ${frame === 'half-round'
          ? 'rounded-tl-[100px] rounded-tr-[100px]'
          : frame === 'rounded'
            ? size === 'lg' ? 'rounded-lg' : size === 'md' ? 'rounded-md' : size === 'sm' ? 'rounded-sm' : 'rounded-lg'
            : frame === 'square'
              ? ''
              : ''
          }`}
      >
        {plaque === 'straight' && (
          <>
            <div
              className={`left-round-behind w-4 h-1.5 border-l-2 border-b-2 border-team-${color}-border bg-team-${color}-plaque-shadow rounded-bl-full absolute left-[calc(-1rem_-_0px)] ${size === 'lg' ? 'bottom-1.5' : size === 'md' ? 'bottom-1' : size === 'sm' ? 'bottom-0' : 'bottom-1.5'} z-[-1]`}
            />
            <div
              className={`right-round-behind w-4 h-1.5 border-r-2 border-b-2 border-team-${color}-border bg-team-${color}-plaque-shadow rounded-br-full absolute right-[calc(-1rem_-_0px)] ${size === 'lg' ? 'bottom-1.5' : size === 'md' ? 'bottom-1' : size === 'sm' ? 'bottom-0' : 'bottom-1.5'} z-[-1]`}
            />
            <div
              className={`banner-text-bg bg-team-${color}-plaque-bg bg-opacity-80 border-2 border-team-${color}-border rounded-tl rounded-tr absolute ${size === 'lg' ? 'bottom-4' : size === 'md' ? 'bottom-3' : size === 'sm' ? 'bottom-2' : 'bottom-4'} -left-4 -right-4 z-20 flex items-center justify-center text-center leading-none uppercase ${size === 'lg' ? 'text-xl h-8' : size === 'md' ? 'text-lg h-7' : size === 'sm' ? 'text-sm h-6' : 'text-xl h-8'} font-bold font-squeak [font-variant:none] text-${textColor ? textColor : 'white [text-shadow:0_1px_0_rgba(0,0,0,.5)]'
                } ${textShadow === 'light'
                  ? '0_1px_0_rgba(255,255,255,.5)'
                  : textShadow === 'dark'
                    ? '0_1px_0_rgba(0,0,0,.5)'
                    : ''
                }`}
            >
              {name}
            </div>
            <div className={`fake-corners absolute ${size === 'lg' ? 'bottom-4' : size === 'md' ? 'bottom-3' : size === 'sm' ? 'bottom-2' : 'bottom-4'} -left-3.5 -right-3.5`}>
              <div className="relative mt-[-2px]">
                <div
                  className={`left-line bg-team-${color}-plaque-bg dark:team-${color}-plaque-bg-dark border-l-2 border-team-${color}-border w-2 h-3 absolute -left-0.5 -bottom-1 z-20 [clip-path:polygon(6px_8px,0px_6px,0px_12px,10px_12px)]`}
                />
                <div
                  className={`left-rounded-corner bg-team-${color}-plaque-shadow border-l-2 border-t-2 rounded-tl-full border-team-${color}-border ${size === 'lg' ? 'w-3' : size === 'md' ? 'w-3.5' : size === 'sm' ? 'w-3.5' : 'w-3'} h-1.5 absolute -left-0.5 -bottom-1.5 z-20 `}
                />
                <div
                  className={`right-line bg-team-${color}-plaque-bg dark:team-${color}-plaque-bg-dark border-r-2 border-team-${color}-border w-2 h-3 absolute -right-0.5 -bottom-1 z-20 [clip-path:polygon(4px_8px,10px_6px,10px_12px,0px_12px)]`}
                />
                <div
                  className={`right-rounded-corner bg-team-${color}-plaque-shadow border-r-2 border-t-2 rounded-tr-full border-team-${color}-border ${size === 'lg' ? 'w-3' : size === 'md' ? 'w-3.5' : size === 'sm' ? 'w-3.5' : 'w-3'} h-1.5 absolute -right-0.5 -bottom-1.5 z-20`}
                />
              </div>
            </div>
          </>
        )}
        {plaque === 'curved' && (
          <div className={`absolute ${size === 'lg' ? 'bottom-4' : size === 'md' ? 'bottom-3' : size === 'sm' ? 'bottom-2' : 'bottom-4'} -left-3.5 -right-3.5 z-20`}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 970 274" fill="none" className="w-full">
              <path
                className={`fill-team-${color}-plaque-bg`}
                stroke="#000"
                strokeWidth="10"
                d="M13.654 105.234c293.844-132.564 643.588-134.723 942.678.002 5.276 2.377 8.668 7.67 8.668 13.518v141.807c-3.107 4.539-5.978 6.733-8.436 7.709-2.513.997-5.208.966-8.367-.052-3.255-1.05-6.781-3.082-10.647-5.811-2.993-2.114-5.966-4.48-9.055-6.937-.908-.723-1.826-1.454-2.758-2.188a24.213 24.213 0 0 0-5.615-3.296C581.456 107.952 239.33 156.327 49.95 251.139c-3.679 1.842-7.495 4.118-11.148 6.297-1.006.6-2 1.193-2.975 1.767-4.664 2.747-9.002 5.136-13.067 6.613-4.065 1.478-7.34 1.847-10.044 1.145-2.414-.628-5.063-2.291-7.716-6.33V118.744c0-5.846 3.384-11.133 8.654-13.51Z"
              />
              <path
                fill="none"
                fillRule="evenodd"
                d="m15.642 234.291-2.643-4.791c-2.656-4.816-2.654-4.817-2.651-4.819l.042-.023.12-.065a182.363 182.363 0 0 1 2.22-1.188 385.126 385.126 0 0 1 6.87-3.526c6.033-3.028 14.936-7.34 26.471-12.508 23.069-10.335 56.673-24.095 98.913-37.851 84.465-27.506 203.55-55.02 342.015-55.02 138.468 0 256.807 27.515 340.53 55.025 41.868 13.757 75.1 27.52 97.891 37.857 11.396 5.169 20.183 9.482 26.135 12.511a369.576 369.576 0 0 1 6.776 3.528c.766.409 1.347.725 1.741.941l.45.247.118.066.033.018.009.006c.003.001.005.002-2.683 4.801l-2.687 4.799-.004-.002-.021-.012-.095-.053a158.362 158.362 0 0 0-2.05-1.112 361.2 361.2 0 0 0-6.575-3.423c-5.815-2.959-14.454-7.201-25.691-12.297-22.475-10.195-55.336-23.807-96.781-37.425-82.902-27.24-200.063-54.475-337.096-54.475-137.034 0-254.949 27.235-338.609 54.48-41.823 13.619-75.062 27.233-97.822 37.43-11.379 5.098-20.136 9.34-26.034 12.301a380.72 380.72 0 0 0-6.673 3.424c-.745.393-1.303.692-1.672.891l-.41.223-.098.053-.021.012-.005.002-.013-.025Z"
                clipRule="evenodd"
                id="name"
                pathLength="4"
              />
              <text fill="#000">
                <textPath
                  href="#name"
                  startOffset="1"
                  textAnchor="middle"
                  fontSize="96px"
                  className={`font-squeak [font-variant:none] uppercase fill-${textColor ? textColor : 'white [text-shadow:0_1px_0_rgba(0,0,0,.5)]'
                    } ${textShadow === 'light'
                      ? '0_1px_0_rgba(255,255,255,.5)'
                      : textShadow === 'dark'
                        ? '0_1px_0_rgba(0,0,0,.5)'
                        : ''
                    }`}
                >
                  {name}
                </textPath>
              </text>
            </svg>
          </div>
        )}
      </div>
      {imageUrl && (
        <GatsbyImage 
          image={imageUrl} 
          alt={`${name} Team`} 
          className={`${size === 'lg' ? 'w-56' : size === 'md' ? 'w-44' : 'w-28'} absolute -translate-y-14 z-10`}
          imgStyle={{ objectFit: "contain", width: "100%", height: "auto" }}
        />
      )}
    </div>
  )
}
