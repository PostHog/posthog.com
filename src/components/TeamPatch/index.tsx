import React from 'react'

// source for this entire SVG lives here:
// https://www.figma.com/design/QCYxjm4wVVVvs6UA27xRmz/Website-art?node-id=2806-100&t=OEHDCRsAlrgEUkV4-1

interface TeamNameProps {
    id?: string
    name?: string
    href?: string
    fill?: string
    textColor?: string
    textShadow?: string
    textSize?: string
    children?: React.ReactNode
    startOffset?: string
    textAnchor?: string
    tracking?: string
    x?: string
}

const TeamName: React.FC<TeamNameProps> = ({
    id,
    name,
    href,
    fill,
    textColor,
    textShadow,
    textSize,
    children,
    startOffset,
    textAnchor,
    tracking,
    x,
}) => {
    return (
        <text
            {...(id ? { id: id } : {})}
            fill={fill}
            xmlSpace="preserve"
            {...(x ? { x: x } : {})}
            textAnchor={textAnchor}
            className={`leading-none uppercase font-bold font-squeak [font-variant:none] text-${
                textSize ? textSize : '3xl'
            } 
        fill-${textColor ? textColor : 'white [text-shadow:0_1px_0_rgba(0,0,0,.5)]'} 
        ${
            textShadow === 'light'
                ? '[text-shadow:0_-1px_0_rgba(255,255,255,.5)]'
                : textShadow === 'dark'
                ? '[text-shadow:0_-1px_0_rgba(0,0,0,.5)]'
                : ''
        }
        ${tracking ? 'tracking-' + tracking : ''}
      `}
        >
            {children ? (
                children
            ) : (
                <textPath href={`#${href}`} startOffset={startOffset}>
                    {name}
                </textPath>
            )}
        </text>
    )
}

interface TeamPatchProps {
    name?: string
    imageUrl: string
    color: string
    textColor?: string
    textShadow?: string
    fontSize?: string
    frameColor?: string
    plaqueColor?: string
    plaque?: string
    size?: string
    imageXOffset?: number
    imageYOffset?: number
    imageScale?: number
    className?: string
}

export default function TeamPatch({
    name,
    imageUrl,
    textColor,
    textShadow,
    fontSize,
    frame,
    frameColor,
    plaque,
    plaqueColor,
    imageScale,
    imageXOffset,
    imageYOffset,
    className = '',
}: TeamPatchProps) {
    return (
        <svg
            viewBox="0 0 288 305"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            className={className}
        >
            <g id="all variants - slice">
                <g id="marquees - background">
                    {plaque === 'straight' && (
                        <g id="straight">
                            <rect
                                id="Rectangle 170"
                                x="19.555"
                                y="270.42"
                                width="238.888"
                                height="14.2546"
                                rx="7.12732"
                                fill="#47416C"
                                stroke="black"
                                strokeWidth="2.4577"
                                className={`fill-${plaqueColor} stroke-${plaqueColor}-dark`}
                            />
                        </g>
                    )}
                    {plaque === 'curved' && (
                        <g id="curved">
                            <path
                                id="Rectangle 136"
                                d="M4.05433 268.289C53.9505 245.878 93.7581 234.065 134.869 233.736C175.982 233.407 218.525 244.564 273.885 268.32C275.242 268.903 276.14 270.253 276.14 271.711V295.158C276.14 297.82 273.348 299.625 270.87 298.528C220.602 276.276 180.175 264.932 139.516 264.849C98.8568 264.766 58.0882 275.944 7.1364 298.522C4.65676 299.621 1.86166 297.815 1.86166 295.153V271.653C1.86166 270.215 2.72994 268.884 4.05433 268.289Z"
                                strokeWidth="2.4577"
                                className={`fill-${plaqueColor} stroke-${plaqueColor}-dark`}
                            />
                        </g>
                    )}
                    {plaque === 'wavy' && (
                        <g id="wavy background">
                            <path
                                id="wavy marquee (right)"
                                d="M209.321 237.219L206.509 274.421C206.376 276.175 207.798 277.655 209.556 277.593L212.845 277.477C232.457 276.789 252.081 278.432 271.305 282.371L275.517 283.234C277.259 283.591 278.919 282.338 279.053 280.565L281.864 243.382C281.976 241.9 280.969 240.566 279.513 240.268L274.073 239.154C255.154 235.277 235.842 233.661 216.541 234.338L212.161 234.491C210.658 234.544 209.435 235.719 209.321 237.219Z"
                                strokeWidth="3.93536"
                                className={`fill-${plaqueColor} stroke-${plaqueColor}-dark`}
                            />
                            <path
                                id="wavy marquee (left)"
                                d="M74.6788 237.219L77.491 274.421C77.6236 276.175 76.2023 277.655 74.4444 277.593L71.1552 277.477C51.5435 276.789 31.9194 278.432 12.695 282.371L8.48288 283.234C6.74102 283.591 5.08135 282.338 4.94732 280.565L2.13648 243.382C2.02447 241.9 3.03145 240.566 4.48715 240.268L9.92654 239.154C28.8458 235.277 48.1583 233.661 67.4587 234.338L71.8392 234.491C73.3423 234.544 74.5654 235.719 74.6788 237.219Z"
                                strokeWidth="3.93536"
                                className={`fill-${plaqueColor} stroke-${plaqueColor}-dark`}
                            />
                            <path
                                id="wavy shadow"
                                d="M224.391 279.804L213.467 259.955C213.371 259.78 213.453 259.56 213.641 259.491C224.535 255.489 234.771 249.884 244.012 242.86L244.411 242.557C244.603 242.411 244.878 242.47 244.994 242.68L255.854 262.413C255.968 262.62 255.913 262.879 255.724 263.023L255.325 263.326C246.066 270.364 235.808 275.981 224.891 279.991C224.701 280.061 224.488 279.981 224.391 279.804Z"
                                strokeWidth="3.93536"
                                className={`fill-${plaqueColor} stroke-${plaqueColor}-dark`}
                            />
                            <path
                                id="wavy shadow_2"
                                d="M60.4784 279.804L71.402 259.955C71.4983 259.78 71.4162 259.56 71.2286 259.491C60.3341 255.489 50.0977 249.884 40.8576 242.86L40.4577 242.557C40.2665 242.411 39.9909 242.47 39.8751 242.68L29.0155 262.413C28.9015 262.62 28.9565 262.879 29.1447 263.023L29.5443 263.326C38.8035 270.364 49.061 275.981 59.9779 279.991C60.1681 280.061 60.3807 279.981 60.4784 279.804Z"
                                strokeWidth="3.93536"
                                className={`fill-${plaqueColor} stroke-${plaqueColor}-dark`}
                            />
                        </g>
                    )}
                    {plaque === 'stepped' && (
                        <g id="stepped bg">
                            <rect
                                id="stepped bg_2"
                                x="10.0478"
                                y="242.028"
                                width="258.995"
                                height="47.6707"
                                rx="2.9487"
                                strokeWidth="3.9316"
                                className={`fill-${plaqueColor} stroke-${plaqueColor}-dark`}
                            />
                            <path
                                id="Vector 182"
                                d="M44.0709 266.605H27.3567C26.9316 266.605 26.707 267.109 26.9908 267.425L44.8135 287.3C45.4155 287.971 46.5282 287.546 46.5282 286.644V269.063C46.5282 267.706 45.428 266.605 44.0709 266.605Z"
                                strokeWidth="3.9316"
                                className={`fill-${plaqueColor} stroke-${plaqueColor}-dark`}
                            />
                            <path
                                id="Vector 183"
                                d="M235.611 266.605H252.325C252.75 266.605 252.975 267.109 252.691 267.425L234.868 287.3C234.266 287.971 233.153 287.546 233.153 286.644V269.063C233.153 267.706 234.254 266.605 235.611 266.605Z"
                                strokeWidth="3.9316"
                                className={`fill-${plaqueColor} stroke-${plaqueColor}-dark`}
                            />
                        </g>
                    )}
                    {plaque === 'downward-curve' && (
                        <g id="plaque bg downward-curve">
                            <path
                                id="Rectangle 213"
                                d="M264.035 280.737V244.712C264.035 243.535 263.335 242.471 262.255 242.005L235.677 230.542C174.385 204.104 104.932 203.967 43.5358 230.162L15.7562 242.015C14.67 242.478 13.9652 243.545 13.9652 244.726V280.769C13.9652 282.884 16.1252 284.31 18.0698 283.481L41.9934 273.274C104.379 246.656 174.953 246.796 237.234 273.659L259.92 283.444C261.865 284.283 264.035 282.857 264.035 280.737Z"
                                strokeWidth="3.93037"
                                className={`fill-${plaqueColor} stroke-${plaqueColor}-dark`}
                            />
                            <path
                                id="Vector 184"
                                d="M28.3467 263.209L28.3467 225.353C28.3467 224.932 28.4592 224.51 28.6667 224.144C38.5417 206.738 45.8494 203.988 61.069 203.082C62.3685 203.005 63.4974 203.971 63.6333 205.266L68.2916 249.654C68.4173 250.852 67.6517 251.965 66.4914 252.289C54.015 255.775 45.5384 259.072 31.8612 265.437C30.2274 266.198 28.3467 265.011 28.3467 263.209Z"
                                strokeWidth="3.93037"
                                className={`fill-${plaqueColor} stroke-${plaqueColor}-dark`}
                            />
                            <path
                                id="Vector 185"
                                d="M252.472 263.209L252.472 225.353C252.472 224.932 252.359 224.51 252.152 224.144C242.277 206.738 234.969 203.988 219.749 203.082C218.45 203.005 217.321 203.971 217.185 205.266L212.527 249.654C212.401 250.852 213.167 251.965 214.327 252.289C226.803 255.775 235.28 259.072 248.957 265.437C250.591 266.198 252.472 265.011 252.472 263.209Z"
                                strokeWidth="3.93037"
                                className={`fill-${plaqueColor} stroke-${plaqueColor}-dark`}
                            />
                        </g>
                    )}
                    {plaque === 'upward-curve' && (
                        <g id="wavy background">
                            <g id="shield">
                                <path
                                    id="Rectangle 208"
                                    d="M263.852 197.518V240.537C263.852 241.704 263.158 242.758 262.087 243.22L235.74 254.585C174.979 280.793 106.127 280.929 45.2626 254.961L17.7236 243.211C16.6468 242.752 15.9482 241.694 15.9482 240.523V197.486C15.9482 195.391 18.0894 193.976 20.0172 194.799L43.7336 204.917C105.579 231.304 175.542 231.166 237.283 204.535L259.772 194.835C261.701 194.003 263.852 195.417 263.852 197.518Z"
                                    strokeWidth="3.89632"
                                    className={`fill-${plaqueColor} stroke-${plaqueColor}-dark`}
                                />
                                <path
                                    id="Vector 182"
                                    d="M251.755 218.827L251.755 258.142C251.755 258.559 251.644 258.978 251.439 259.34C241.848 276.296 235.385 280.404 220.957 281.508C219.371 281.63 218.136 280.182 218.459 278.624L230.057 222.655C230.246 221.744 230.937 221.02 231.838 220.79L248.716 216.468C250.256 216.074 251.755 217.237 251.755 218.827Z"
                                    strokeWidth="3.89632"
                                    className={`fill-${plaqueColor} stroke-${plaqueColor}-dark`}
                                />
                                <path
                                    id="Vector 183"
                                    d="M30.4536 218.827L30.4538 258.142C30.4538 258.559 30.5651 258.978 30.7704 259.34C40.361 276.296 46.8238 280.404 61.2522 281.508C62.8382 281.63 64.0731 280.182 63.7503 278.624L52.1519 222.655C51.9632 221.744 51.2723 221.02 50.3714 220.79L33.4928 216.468C31.9525 216.074 30.4536 217.237 30.4536 218.827Z"
                                    strokeWidth="3.89632"
                                    className={`fill-${plaqueColor} stroke-${plaqueColor}-dark`}
                                />
                            </g>
                        </g>
                    )}
                </g>

                {frame === 'half-round' && (
                    <path
                        id="half-round"
                        d="M237.548 130.827V293.035H38.9662V130.827C38.9662 75.9905 83.4202 31.5365 138.257 31.5365C193.094 31.5365 237.548 75.9905 237.548 130.827Z"
                        strokeWidth="3.93231"
                        className={`fill-${frameColor} stroke-${frameColor}-dark`}
                    />
                )}
                {frame === 'rectangle' && (
                    <rect
                        id="rectangle"
                        x="38.9662"
                        y="41.9662"
                        width="198.578"
                        height="261.498"
                        strokeWidth="3.93231"
                        className={`fill-${frameColor} stroke-${frameColor}-dark`}
                    />
                )}
                {frame === 'round' && (
                    <rect
                        id="round"
                        x="38.9662"
                        y="41.9662"
                        width="198.578"
                        height="261.498"
                        rx="28.0338"
                        strokeWidth="3.93231"
                        className={`fill-${frameColor} stroke-${frameColor}-dark`}
                    />
                )}
                {frame === 'hexagon' && (
                    <path
                        id="hexagon"
                        d="M40.2966 76.0206V264.552C40.2966 275.576 48.2417 284.996 59.1083 286.856L89.3286 292.027L139.664 300.64L220.221 286.856C231.087 284.996 239.032 275.576 239.032 264.552V76.0206C239.032 65.0917 231.221 55.7245 220.47 53.7607L139.664 39.0002L58.8588 53.7607C48.1078 55.7245 40.2966 65.0917 40.2966 76.0206Z"
                        strokeWidth="3.93536"
                        className={`fill-${frameColor} stroke-${frameColor}-dark`}
                    />
                )}
                {frame === 'square' && (
                    <rect
                        id="square"
                        x="44.9662"
                        y="41.9662"
                        width="198.068"
                        height="261.068"
                        rx="6.03384"
                        strokeWidth="3.93231"
                        className={`fill-${frameColor} stroke-${frameColor}-dark`}
                    />
                )}
                {frame === 'squareish' && (
                    <path
                        id="squareish"
                        d="M62.5725 38.9658H215.905C228.39 38.9658 238.512 49.0872 238.512 61.5725V277.811C238.512 290.296 228.39 300.417 215.905 300.417H62.5725C50.0872 300.417 39.9658 290.296 39.9658 277.811V61.5726C39.9658 49.0872 50.0872 38.9658 62.5725 38.9658Z"
                        strokeWidth="3.9316"
                        className={`fill-${frameColor} stroke-${frameColor}-dark`}
                    />
                )}
                {frame === 'oval' && (
                    <path
                        id="frame oval"
                        d="M238.449 138.207V201.093C238.449 255.903 194.017 300.335 139.207 300.335C84.3972 300.335 39.9652 255.903 39.9652 201.093V138.207C39.9652 83.3973 84.3972 38.9652 139.207 38.9652C194.017 38.9652 238.449 83.3972 238.449 138.207Z"
                        strokeWidth="3.93037"
                        className={`fill-${frameColor} stroke-${frameColor}-dark`}
                    />
                )}
                {frame === 'shield' && (
                    <path
                        id="shield frame"
                        d="M139.897 40.0861L238.279 77.7619V200.672C238.279 255.007 194.232 299.054 139.897 299.054C85.5618 299.054 41.5146 255.007 41.5146 200.672V77.7619L139.897 40.0861Z"
                        strokeWidth="3.89632"
                        className={`fill-${frameColor} stroke-${frameColor}-dark`}
                    />
                )}

                <g id="marquees - solids">
                    {plaque === 'curved' && (
                        <g id="curved_2">
                            <path
                                id="Rectangle 139"
                                d="M23.1566 240.914C95.3745 208.334 181.331 207.803 254.838 240.915C256.135 241.499 256.968 242.8 256.968 244.237V279.091C256.153 280.3 255.53 280.761 255.084 280.923C254.67 281.073 254.193 281.041 253.437 280.695C252.775 280.391 252.066 279.929 251.17 279.344C250.988 279.225 250.797 279.101 250.597 278.971C249.462 278.237 248.124 277.411 246.533 276.74C163.105 241.526 78.7314 253.416 32.0769 276.773C31.1729 277.226 30.235 277.785 29.3373 278.321C29.0899 278.468 28.8456 278.614 28.6059 278.755C27.4598 279.43 26.3936 280.017 25.3946 280.38C24.3954 280.743 23.5905 280.834 22.926 280.662C22.3326 280.507 21.6816 280.099 21.0296 279.106V244.235C21.0296 242.798 21.8614 241.498 23.1566 240.914Z"
                                fill="white"
                                strokeWidth="2.4577"
                                className={`stroke-${plaqueColor}-dark`}
                            />
                        </g>
                    )}
                    {plaque === 'straight' && (
                        <g id="straight_2">
                            <path
                                id="solid white background"
                                d="M23.2416 231.772H254.756C256.792 231.772 258.443 233.422 258.443 235.458V276.181C257.137 274.985 255.777 274.098 254.197 273.487C252.132 272.689 249.786 272.399 246.86 272.399H31.4842C27.5414 272.399 23.2354 273.383 19.555 276.382V235.458C19.555 233.422 21.2055 231.772 23.2416 231.772Z"
                                fill="white"
                                strokeWidth="2.4577"
                                className={`stroke-${plaqueColor}-dark`}
                            />
                        </g>
                    )}
                    {plaque === 'wavy' && (
                        <>
                            <g id="wavy marquee">
                                <path
                                    d="M25.5508 215.668C25.5508 214.064 26.6688 212.678 28.2358 212.338L39.4732 209.9C60.8194 205.269 83.0003 206.238 103.862 212.711V212.711C128.311 220.297 154.587 220.265 179.036 212.679V212.679C199.782 206.242 221.915 205.194 243.167 209.685L255.676 212.329C257.307 212.674 258.475 214.113 258.475 215.781V260.349C258.475 262.525 256.472 264.149 254.343 263.699L243.167 261.337C221.915 256.845 199.782 257.893 179.036 264.331V264.331C154.587 271.917 128.311 271.948 103.862 264.362V264.362C83.0003 257.889 60.8194 256.921 39.4732 261.552L29.5561 263.703C27.4967 264.15 25.5508 262.581 25.5508 260.473V215.668Z"
                                    fill="white"
                                />
                            </g>
                        </>
                    )}
                    {plaque === 'upward-curve' && (
                        <g id="shield marquee">
                            <path
                                d="M28.3672 217.441C28.3672 213.89 32.0443 211.533 35.2708 213.015L39.6081 215.008C105.058 245.076 180.46 244.628 245.548 213.786L246.911 213.14C250.142 211.609 253.867 213.965 253.867 217.541V257.901C253.867 259.783 252.783 261.497 251.082 262.303L245.548 264.925C180.46 295.768 105.058 296.215 39.6081 266.147L31.2044 262.286C29.4753 261.492 28.3672 259.764 28.3672 257.861V217.441Z"
                                fill="white"
                            />
                            <path
                                d="M251.919 217.541V257.901C251.919 259.03 251.268 260.059 250.248 260.542L244.714 263.165C180.146 293.76 105.347 294.204 40.4214 264.377L32.0177 260.516C30.9802 260.04 30.3153 259.002 30.3153 257.861V217.441C30.3153 215.311 32.5216 213.896 34.4575 214.786L38.7949 216.778C104.768 247.087 180.774 246.636 246.382 215.546L247.745 214.9C249.684 213.982 251.919 215.396 251.919 217.541Z"
                                className={`stroke-${plaqueColor}-dark`}
                                strokeWidth="3.89632"
                            />
                        </g>
                    )}
                    {plaque === 'downward-curve' && (
                        <g id="downward curve marquee">
                            <path
                                d="M26 264.602C26 268.184 29.7093 270.562 32.9639 269.066L37.3391 267.056C103.36 236.726 179.422 237.177 245.078 268.289L246.453 268.941C249.713 270.485 253.47 268.108 253.47 264.501V227.227C253.47 225.329 252.376 223.6 250.661 222.787L245.078 220.142C179.422 189.03 103.36 188.579 37.3391 218.909L28.862 222.804C27.1178 223.605 26 225.349 26 227.268V264.602Z"
                                fill="#fff"
                            />
                            <path
                                d="M251.505 264.501V227.227C251.505 226.088 250.849 225.051 249.819 224.563L244.237 221.918C179.105 191.055 103.653 190.607 38.1595 220.695L29.6824 224.59C28.6359 225.07 27.9652 226.117 27.9652 227.268V264.602C27.9652 266.751 30.1907 268.178 32.1435 267.281L36.5187 265.271C103.068 234.697 179.738 235.152 245.92 266.513L247.295 267.165C249.25 268.091 251.505 266.665 251.505 264.501Z"
                                strokeWidth="3.93037"
                                className={`stroke-${plaqueColor}-dark`}
                            />
                        </g>
                    )}
                </g>
                <image
                    id="team-image"
                    x={imageXOffset ? imageXOffset : '0'}
                    y={imageYOffset ? imageYOffset : '0'}
                    width="288"
                    height="305"
                    href={imageUrl}
                    className={`transform ${imageScale ? 'scale-' + imageScale : 'scale-75'}`}
                    preserveAspectRatio="xMidYMid meet"
                    style={{ pointerEvents: 'none', transformOrigin: 'center center' }}
                />
                <g id="marquees - foreground">
                    {plaque === 'curved' && (
                        <g id="curved_3">
                            <path
                                id="Rectangle 138"
                                d="M23.1566 240.914C95.3745 208.334 181.331 207.803 254.838 240.915C256.135 241.499 256.968 242.8 256.968 244.237V279.091C256.153 280.3 255.53 280.761 255.084 280.923C254.67 281.073 254.193 281.041 253.437 280.695C252.775 280.391 252.066 279.929 251.17 279.344C250.988 279.225 250.797 279.101 250.597 278.971C249.462 278.237 248.124 277.411 246.533 276.74C163.105 241.526 78.7314 253.416 32.0769 276.773C31.1729 277.226 30.235 277.785 29.3373 278.321C29.0899 278.468 28.8456 278.614 28.6059 278.755C27.4598 279.43 26.3936 280.017 25.3946 280.38C24.3954 280.743 23.5905 280.834 22.926 280.662C22.3326 280.507 21.6816 280.099 21.0296 279.106V244.235C21.0296 242.798 21.8614 241.498 23.1566 240.914Z"
                                fillOpacity="0.8"
                                strokeWidth="2.4577"
                                className={`fill-${plaqueColor} stroke-${plaqueColor}-dark`}
                            />
                            <path
                                id="curved-name"
                                fillRule="evenodd"
                                clipRule="evenodd"
                                pathLength="1"
                                d="M20.0462 274.378C20.0299 274.348 19.9353 274.176 19.3856 273.18C18.7214 271.976 18.722 271.975 18.7227 271.975L18.7333 271.969L18.7632 271.953C18.7892 271.939 18.8272 271.918 18.8771 271.891C18.9769 271.837 19.1244 271.758 19.3184 271.656C19.7066 271.451 20.2815 271.153 21.0357 270.775C22.544 270.017 24.7697 268.939 27.6535 267.648C33.4207 265.064 41.8218 261.624 52.3817 258.185C73.4979 251.308 103.269 244.43 137.886 244.43C172.502 244.43 202.087 251.309 223.018 258.186C233.485 261.625 241.793 265.066 247.491 267.65C250.34 268.942 252.536 270.021 254.025 270.778C254.769 271.157 255.336 271.455 255.719 271.66C255.91 271.762 256.055 271.841 256.154 271.895C256.203 271.922 256.24 271.943 256.266 271.957L256.296 271.973L256.304 271.978L256.306 271.979C256.307 271.98 256.308 271.98 255.636 273.18C254.964 274.379 254.964 274.379 254.964 274.379L254.963 274.379L254.958 274.376L254.934 274.363C254.912 274.351 254.878 274.332 254.833 274.307C254.742 274.257 254.605 274.183 254.421 274.085C254.055 273.888 253.504 273.599 252.777 273.229C251.324 272.489 249.164 271.429 246.355 270.155C240.736 267.606 232.521 264.203 222.16 260.799C201.434 253.988 172.144 247.18 137.886 247.18C103.627 247.18 74.1483 253.989 53.2332 260.8C42.7775 264.204 34.4677 267.608 28.7778 270.157C25.9331 271.432 23.7438 272.492 22.2692 273.232C21.5319 273.602 20.9734 273.892 20.601 274.089C20.4148 274.187 20.2752 274.262 20.183 274.311C20.1369 274.336 20.1027 274.355 20.0804 274.367L20.0561 274.38L20.0506 274.383L20.0496 274.384C20.0496 274.384 20.0496 274.384 20.0462 274.378Z"
                                fill="none"
                            />
                            <TeamName
                                textColor={textColor}
                                fill={textColor}
                                textShadow={textShadow}
                                textAnchor="middle"
                                href="curved-name"
                                startOffset="26%"
                                name={name}
                            />
                        </g>
                    )}
                    {plaque === 'straight' && (
                        <g id="straight_3">
                            <path
                                id="name background (partially transparent)"
                                d="M23.2416 231.772H254.756C256.792 231.772 258.443 233.422 258.443 235.458V276.181C257.137 274.985 255.777 274.098 254.197 273.487C252.132 272.689 249.786 272.399 246.86 272.399H31.4842C27.5414 272.399 23.2354 273.383 19.555 276.382V235.458C19.555 233.422 21.2055 231.772 23.2416 231.772Z"
                                fillOpacity="0.8"
                                strokeWidth="2.4577"
                                className={`fill-${plaqueColor} stroke-${plaqueColor}-dark`}
                            />
                            <g id="team name">
                                <TeamName
                                    fill={textColor}
                                    textColor={textColor}
                                    textShadow={textShadow}
                                    textSize={fontSize}
                                    textAnchor="middle"
                                    x="138"
                                >
                                    <tspan y="261.218">{name}</tspan>
                                </TeamName>
                            </g>
                        </g>
                    )}
                    {plaque === 'wavy' && (
                        <>
                            <g id="wavy">
                                <g id="wavy marquee">
                                    <path
                                        d="M25.5508 215.668C25.5508 214.064 26.6688 212.678 28.2358 212.338L39.4732 209.9C60.8194 205.269 83.0003 206.238 103.8618 212.711V212.711C128.311 220.297 154.587 220.265 179.036 212.679V212.679C199.782 206.242 221.915 205.194 243.167 209.685L255.676 212.329C257.307 212.674 258.475 214.113 258.475 215.781V260.349C258.475 262.525 256.472 264.149 254.343 263.699L243.167 261.337C221.915 256.845 199.782 257.893 179.036 264.331V264.331C154.587 271.917 128.311 271.948 103.8618 264.362V264.362C83.0003 257.889 60.8194 256.921 39.4732 261.552L29.5561 263.703C27.4967 264.15 25.5508 262.581 25.5508 260.473V215.668Z"
                                        fillOpacity="0.8"
                                        className={`fill-${plaqueColor}`}
                                    />
                                    <path
                                        d="M256.507 215.781V260.349C256.507 261.274 255.655 261.965 254.75 261.773L243.574 259.412C221.992 254.851 199.518 255.915 178.453 262.451C154.382 269.92 128.513 269.951 104.4449 262.483C83.2593 255.909 60.7338 254.926 39.0561 259.629L29.139 261.78C28.3057 261.961 27.5185 261.326 27.5185 260.473V215.668C27.5185 214.99 27.9909 214.404 28.653 214.261L39.8903 211.823C60.9049 207.264 82.7413 208.217 103.2787 214.59C128.109 222.294 154.792 222.262 179.619 214.558C200.045 208.22 221.838 207.189 242.76 211.61L255.269 214.254C255.991 214.406 256.507 215.043 256.507 215.781Z"
                                        strokeWidth="3.93536"
                                        className={`stroke-${plaqueColor}-dark`}
                                    />
                                </g>
                            </g>
                            <path
                                id="name-wavy"
                                pathLength="1"
                                d="M30 246.5C30 246.5 49.1306 241.5 71 241.5C92.8694 241.5 120.131 254.5 142 254.5C163.869 254.5 191.131 241.5 213 241.5C234.869 241.5 254 246.5 254 246.5"
                                stroke="none"
                            />

                            <TeamName
                                name={name}
                                fill={textColor}
                                textColor={textColor}
                                textSize="[1.65rem]"
                                textShadow={textShadow}
                                href="name-wavy"
                                startOffset="50%"
                                textAnchor="middle"
                                tracking="wider"
                            />
                        </>
                    )}
                    {plaque === 'stepped' && (
                        <g id="stepped marquee">
                            <rect
                                id="stepped - mid"
                                x="212.522"
                                y="218.685"
                                width="40.7904"
                                height="47.6707"
                                rx="2.9487"
                                strokeWidth="3.9316"
                                fillOpacity="0.8"
                                className={`fill-${plaqueColor} stroke-${plaqueColor}-dark`}
                            />
                            <rect
                                id="stepped - mid_2"
                                x="26.2588"
                                y="218.685"
                                width="40.5447"
                                height="47.6707"
                                rx="2.9487"
                                strokeWidth="3.9316"
                                fillOpacity="0.8"
                                className={`fill-${plaqueColor} stroke-${plaqueColor}-dark`}
                            />
                            <path
                                id="Vector 186"
                                d="M66.3112 244.613H49.5969C49.1718 244.613 48.9472 245.116 49.231 245.433L67.0538 265.308C67.6557 265.979 68.7684 265.553 68.7684 264.652V247.071C68.7684 245.713 67.6683 244.613 66.3112 244.613Z"
                                strokeWidth="3.9316"
                                fillOpacity="0.8"
                                className={`fill-${plaqueColor} stroke-${plaqueColor}-dark`}
                            />
                            <path
                                id="Vector 187"
                                d="M213.007 244.613H229.721C230.147 244.613 230.371 245.116 230.087 245.433L212.265 265.308C211.663 265.979 210.55 265.553 210.55 264.652V247.071C210.55 245.713 211.65 244.613 213.007 244.613Z"
                                strokeWidth="3.9316"
                                fillOpacity="0.8"
                                className={`fill-${plaqueColor} stroke-${plaqueColor}-dark`}
                            />
                            <g id="Rectangle 218">
                                <rect x="46" y="196" width="186.505" height="51.6023" rx="4.91451" fillOpacity="0.8" />
                                <rect
                                    x="47.9658"
                                    y="197.966"
                                    width="182.574"
                                    height="47.6707"
                                    rx="2.9487"
                                    strokeWidth="3.9316"
                                    fillOpacity="0.8"
                                    className={`fill-${plaqueColor} stroke-${plaqueColor}-dark`}
                                />
                            </g>
                            <TeamName
                                id="stepped-name"
                                fill={textColor}
                                textColor={textColor}
                                textShadow={textShadow}
                                textAnchor="middle"
                                x="139.2529"
                            >
                                <tspan y="230.463">{name}</tspan>
                            </TeamName>
                        </g>
                    )}
                    {plaque === 'downward-curve' && (
                        <>
                            <g id="plaque downward curve">
                                <path
                                    d="M26 264.602C26 268.184 29.7093 270.562 32.9639 269.066L37.3391 267.056C103.36 236.726 179.422 237.177 245.078 268.289L246.453 268.941C249.713 270.485 253.47 268.108 253.47 264.501V227.227C253.47 225.329 252.376 223.6 250.661 222.787L245.078 220.142C179.422 189.03 103.36 188.579 37.3391 218.909L28.862 222.804C27.1178 223.605 26 225.349 26 227.268V264.602Z"
                                    fillOpacity="0.8"
                                    className={`fill-${plaqueColor}`}
                                />
                                <path
                                    d="M251.505 264.501V227.227C251.505 226.088 250.849 225.051 249.819 224.563L244.237 221.918C179.105 191.055 103.653 190.607 38.1595 220.695L29.6824 224.59C28.6359 225.07 27.9652 226.117 27.9652 227.268V264.602C27.9652 266.751 30.1907 268.178 32.1435 267.281L36.5187 265.271C103.068 234.697 179.738 235.152 245.92 266.513L247.295 267.165C249.25 268.091 251.505 266.665 251.505 264.501Z"
                                    strokeWidth="3.93037"
                                    className={`stroke-${plaqueColor}-dark`}
                                />
                            </g>

                            <path
                                id="downward-curve-name"
                                d="M31 254.5C31 254.5 83 230.5 139.5 230.5C196 230.5 248 254.5 248 254.5"
                                stroke="none"
                            />

                            <TeamName
                                textColor={textColor}
                                fill={textColor}
                                textShadow={textShadow}
                                textAnchor="middle"
                                href="downward-curve-name"
                                startOffset="50%"
                                name={name}
                            />
                        </>
                    )}
                    {plaque === 'upward-curve' && (
                        <g id="shield marquee_2">
                            <path
                                d="M28.3672 217.441C28.3672 213.89 32.0443 211.533 35.2708 213.015L39.6081 215.008C105.058 245.076 180.46 244.628 245.548 213.786L246.911 213.14C250.142 211.609 253.867 213.965 253.867 217.541V257.901C253.867 259.783 252.783 261.497 251.082 262.303L245.548 264.925C180.46 295.768 105.058 296.215 39.6081 266.147L31.2044 262.286C29.4753 261.492 28.3672 259.764 28.3672 257.861V217.441Z"
                                fillOpacity="0.8"
                                className={`fill-${plaqueColor}`}
                            />
                            <path
                                d="M251.919 217.541V257.901C251.919 259.03 251.268 260.059 250.248 260.542L244.714 263.165C180.146 293.76 105.347 294.204 40.4214 264.377L32.0177 260.516C30.9802 260.04 30.3153 259.002 30.3153 257.861V217.441C30.3153 215.311 32.5216 213.896 34.4575 214.786L38.7949 216.778C104.768 247.087 180.774 246.636 246.382 215.546L247.745 214.9C249.684 213.982 251.919 215.396 251.919 217.541Z"
                                strokeWidth="3.89632"
                                className={`stroke-${plaqueColor}-dark`}
                            />
                            <path
                                id="upward-curve-name"
                                d="M32 249.5C32 246.5 97.0179 274.5 140.5 271.5C194 274.5 249 249.5 249 249.5"
                                stroke="none"
                            />

                            <TeamName
                                textColor={textColor}
                                fill={textColor}
                                textShadow={textShadow}
                                textAnchor="middle"
                                href="upward-curve-name"
                                startOffset="50%"
                                name={name}
                            />
                        </g>
                    )}
                </g>
            </g>
            <defs>
                <filter
                    id="filter0_i_2806_100"
                    x="30.4902"
                    y="252.41"
                    width="217.025"
                    height="20.6172"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                    />
                    <feOffset dy="0.737309" />
                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" />
                    <feBlend mode="normal" in2="shape" result="effect1_innerShadow_2806_100" />
                </filter>
            </defs>
        </svg>
    )
}
