import React from 'react'
interface TeamPatchProps {
    name?: string
    imageUrl: string
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

interface TeamNameProps {
  id?: string
  name?: string
  href?: string
  fill?: string
  textColor?: string
  textShadow?: string
  children?: React.ReactNode
  startOffset?: string
  textAnchor?: string
  tracking?: string
  x?: string
}

const TeamName: React.FC<TeamNameProps> = ({ id, name, href, fill, textColor, textShadow, children, startOffset, textAnchor, tracking, x }) => {
  return (
    <text
      {...(id ? { id: id } : {})}
      fill={fill}
      xmlSpace="preserve"
      {...(x ? { x: x } : {})}
      textAnchor={textAnchor}
      
      className={`leading-none uppercase font-bold font-squeak [font-variant:none] text-3xl 
        fill-${textColor ? textColor : 'white [text-shadow:0_1px_0_rgba(0,0,0,.5)]'} 
        ${ textShadow === 'light' ? '[text-shadow:0_-1px_0_rgba(255,255,255,.5)]' : textShadow === 'dark' ? '[text-shadow:0_-1px_0_rgba(0,0,0,.5)]' : '' }
        ${tracking ? 'tracking-' + tracking : ''}
      `}>
        {children ? children : <textPath href={`#${href}`} startOffset={startOffset}>
            {name}
        </textPath>}
    </text>
  )
}

export default function TeamPatch({
    name,
    imageUrl,
    color,
    textColor,
    textShadow,
    frame,
    plaque,
    imageXOffset,
    imageYOffset,
    imageScale,
    className,
}: TeamPatchProps) {
    return (
        <svg
            viewBox="0 0 288 305"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            className={`w-full ${className}`}
        >
            <g id="all variants - slice">
                <g id="marquees - background">
                    {plaque === 'straight' && (
                        <g id="straight">
                            <rect
                                id="Rectangle 170"
                                x="19.555"
                                y="280.42"
                                width="238.888"
                                height="14.2546"
                                rx="7.12732"
                                strokeWidth="2.4577"
                                className={`fill-team-${color}-plaque-shadow stroke-team-${color}-border`}
                            />
                        </g>
                    )}
                    {plaque === 'curved' && (
                        <g id="curved">
                            <path
                                id="Rectangle 136"
                                d="M4.05433 268.289C53.9505 245.878 93.7581 234.065 134.869 233.736C175.982 233.407 218.525 244.564 273.885 268.32C275.242 268.903 276.14 270.253 276.14 271.711V295.158C276.14 297.82 273.348 299.625 270.87 298.528C220.602 276.276 180.175 264.932 139.516 264.849C98.8568 264.766 58.0882 275.944 7.1364 298.522C4.65676 299.621 1.86166 297.815 1.86166 295.153V271.653C1.86166 270.215 2.72994 268.884 4.05433 268.289Z"
                                strokeWidth="2.4577"
                                className={`fill-team-${color}-plaque-shadow stroke-team-${color}-border`}
                            />
                        </g>
                    )}
                    {plaque === 'wavy' && (
                      <g id="wavy background">
                        <path id="wavy marquee (right)"
                          d="M209.321 232.219L206.509 269.421C206.376 271.175 207.798 272.655 209.556 272.593L212.845 272.477C232.457 271.789 252.081 273.432 271.305 277.371L275.517 278.234C277.259 278.591 278.919 277.338 279.053 275.565L281.864 238.382C281.976 236.9 280.969 235.566 279.513 235.268L274.073 234.154C255.154 230.277 235.842 228.661 216.541 229.338L212.161 229.491C210.658 229.544 209.435 230.719 209.321 232.219Z"
                          strokeWidth="3.93536"
                          className={`fill-team-${color}-plaque-bg stroke-team-${color}-plaque-border`}
                        />
                        <path id="wavy marquee (left)"
                          d="M74.6788 232.219L77.491 269.421C77.6236 271.175 76.2023 272.655 74.4444 272.593L71.1552 272.477C51.5435 271.789 31.9194 273.432 12.695 277.371L8.48288 278.234C6.74102 278.591 5.08135 277.338 4.94732 275.565L2.13648 238.382C2.02447 236.9 3.03145 235.566 4.48715 235.268L9.92654 234.154C28.8458 230.277 48.1583 228.661 67.4587 229.338L71.8392 229.491C73.3423 229.544 74.5654 230.719 74.6788 232.219Z"
                          strokeWidth="3.93536"
                          className={`fill-team-${color}-plaque-bg stroke-team-${color}-plaque-border`}
                        />
                        <path id="wavy shadow"
                          d="M224.391 269.804L213.467 249.955C213.371 249.78 213.453 249.56 213.641 249.491C224.535 245.489 234.771 239.884 244.012 232.86L244.411 232.557C244.603 232.411 244.878 232.47 244.994 232.68L255.854 252.413C255.968 252.62 255.913 252.879 255.724 253.023L255.325 253.326C246.066 260.364 235.808 265.981 224.891 269.991C224.701 270.061 224.488 269.981 224.391 269.804Z"
                          strokeWidth="3.93536"
                          className={`fill-team-${color}-plaque-shadow stroke-team-${color}-plaque-border`}
                          />
                        <path id="wavy shadow_2"
                          d="M60.4784 269.804L71.402 249.955C71.4983 249.78 71.4162 249.56 71.2286 249.491C60.3341 245.489 50.0977 239.884 40.8576 232.86L40.4577 232.557C40.2665 232.411 39.9909 232.47 39.8751 232.68L29.0155 252.413C28.9015 252.62 28.9565 252.879 29.1447 253.023L29.5443 253.326C38.8035 260.364 49.061 265.981 59.9779 269.991C60.1681 270.061 60.3807 269.981 60.4784 269.804Z"
                          strokeWidth="3.93536"
                          className={`fill-team-${color}-plaque-shadow stroke-team-${color}-plaque-border`}
                        />
                      </g>
                    )}
                    {plaque === 'stepped' && (
                      <g id="stepped bg">
                        <rect id="stepped bg_2" x="10.0478" y="232.028" width="258.995" height="47.6707" rx="2.9487"
                          fill="white" stroke="#1E2F46" stroke-width="3.9316" />
                        <path id="Vector 182"
                          d="M44.0709 256.605H27.3567C26.9316 256.605 26.707 257.109 26.9908 257.425L44.8135 277.3C45.4155 277.971 46.5282 277.546 46.5282 276.644V259.063C46.5282 257.706 45.428 256.605 44.0709 256.605Z"
                          fill="white" stroke="#1E2F46" stroke-width="3.9316" />
                        <path id="Vector 183"
                          d="M235.611 256.605H252.325C252.75 256.605 252.975 257.109 252.691 257.425L234.868 277.3C234.266 277.971 233.153 277.546 233.153 276.644V259.063C233.153 257.706 234.254 256.605 235.611 256.605Z"
                          fill="white" stroke="#1E2F46" stroke-width="3.9316" />
                      </g>
                    )}
                    {plaque === 'downward-curve' && (
                        <g id="plaque bg downward-curve">
                        <path id="Rectangle 213"
                          d="M264.035 280.737V244.712C264.035 243.535 263.335 242.471 262.255 242.005L235.677 230.542C174.385 204.104 104.932 203.967 43.5358 230.162L15.7562 242.015C14.67 242.478 13.9652 243.545 13.9652 244.726V280.769C13.9652 282.884 16.1252 284.31 18.0698 283.481L41.9934 273.274C104.379 246.656 174.953 246.796 237.234 273.659L259.92 283.444C261.865 284.283 264.035 282.857 264.035 280.737Z"
                          stroke-width="3.93037"
                          className={`fill-team-${color}-plaque-shadow stroke-team-${color}-plaque-border`}
                        />
                        <path id="Vector 184"
                          d="M28.3467 263.209L28.3467 225.353C28.3467 224.932 28.4592 224.51 28.6667 224.144C38.5417 206.738 45.8494 203.988 61.069 203.082C62.3685 203.005 63.4974 203.971 63.6333 205.266L68.2916 249.654C68.4173 250.852 67.6517 251.965 66.4914 252.289C54.015 255.775 45.5384 259.072 31.8612 265.437C30.2274 266.198 28.3467 265.011 28.3467 263.209Z"
                          stroke-width="3.93037"
                          className={`fill-team-${color}-plaque-shadow stroke-team-${color}-plaque-border`}
                        />
                        <path id="Vector 185"
                          d="M252.472 263.209L252.472 225.353C252.472 224.932 252.359 224.51 252.152 224.144C242.277 206.738 234.969 203.988 219.749 203.082C218.45 203.005 217.321 203.971 217.185 205.266L212.527 249.654C212.401 250.852 213.167 251.965 214.327 252.289C226.803 255.775 235.28 259.072 248.957 265.437C250.591 266.198 252.472 265.011 252.472 263.209Z"
                          stroke-width="3.93037"
                          className={`fill-team-${color}-plaque-shadow stroke-team-${color}-plaque-border`}
                           />
                      </g>
                    )}
                </g>

                {frame === 'half-round' && (
                    <path
                        id="half-round"
                        d="M237.548 140.827V303.035H38.9662V140.827C38.9662 85.9905 83.4202 41.5365 138.257 41.5365C193.094 41.5365 237.548 85.9905 237.548 140.827Z"
                        strokeWidth="3.93231"
                        className={`fill-team-${color}-bg stroke-team-${color}-border`}
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
                        className={`fill-team-${color}-bg stroke-team-${color}-border`}
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
                        className={`fill-team-${color}-bg stroke-team-${color}-border`}
                    />
                )}
                {frame === 'hexagon' && (
                    <path
                        id="hexagon"
                        d="M45.2966 76.0206V264.552C45.2966 275.576 53.2417 284.996 64.1083 286.856L94.3286 292.027L144.664 300.64L225.221 286.856C236.087 284.996 244.032 275.576 244.032 264.552V76.0206C244.032 65.0917 236.221 55.7245 225.47 53.7607L144.664 39.0002L63.8588 53.7607C53.1078 55.7245 45.2966 65.0917 45.2966 76.0206Z"
                        strokeWidth="3.93536"
                        className={`fill-team-${color}-bg stroke-team-${color}-border`}
                    />

                )}
                {frame === 'squareish' && (
                  <path id="squareish"
                  d="M62.5725 38.9658H215.905C228.39 38.9658 238.512 49.0872 238.512 61.5725V277.811C238.512 290.296 228.39 300.417 215.905 300.417H62.5725C50.0872 300.417 39.9658 290.296 39.9658 277.811V61.5726C39.9658 49.0872 50.0872 38.9658 62.5725 38.9658Z"
                  stroke-width="3.9316"
                  className={`fill-team-${color}-bg stroke-team-${color}-border`}
                  />
                )}
                {frame === 'oval' && (
                  <path id="frame oval"
                    d="M238.449 138.207V201.093C238.449 255.903 194.017 300.335 139.207 300.335C84.3972 300.335 39.9652 255.903 39.9652 201.093V138.207C39.9652 83.3973 84.3972 38.9652 139.207 38.9652C194.017 38.9652 238.449 83.3972 238.449 138.207Z"
                    stroke-width="3.93037" 
                    className={`fill-team-${color}-bg stroke-team-${color}-border`}
                  />
                )}
                
                <g id="marquees - solids">
                    {plaque === 'curved' && (
                        <g id="curved_2">
                            <path
                                id="Rectangle 139"
                                d="M23.1566 240.914C95.3745 208.334 181.331 207.803 254.838 240.915C256.135 241.499 256.968 242.8 256.968 244.237V279.091C256.153 280.3 255.53 280.761 255.084 280.923C254.67 281.073 254.193 281.041 253.437 280.695C252.775 280.391 252.066 279.929 251.17 279.344C250.988 279.225 250.797 279.101 250.597 278.971C249.462 278.237 248.124 277.411 246.533 276.74C163.105 241.526 78.7314 253.416 32.0769 276.773C31.1729 277.226 30.235 277.785 29.3373 278.321C29.0899 278.468 28.8456 278.614 28.6059 278.755C27.4598 279.43 26.3936 280.017 25.3946 280.38C24.3954 280.743 23.5905 280.834 22.926 280.662C22.3326 280.507 21.6816 280.099 21.0296 279.106V244.235C21.0296 242.798 21.8614 241.498 23.1566 240.914Z"
                                fill="white"
                                stroke="black"
                                strokeWidth="2.4577"
                            />
                        </g>
                    )}
                    {plaque === 'straight' && (
                        <g id="straight_2">
                            <path
                                id="solid white background"
                                d="M23.2416 245.772H254.756C256.792 245.772 258.443 247.422 258.443 249.458V286.181C257.137 284.985 255.777 284.098 254.197 283.487C252.132 282.689 249.786 282.399 246.86 282.399H31.4842C27.5414 282.399 23.2354 283.383 19.555 286.382V249.458C19.555 247.422 21.2055 245.772 23.2416 245.772Z"
                                fill="white"
                                stroke="#40396E"
                                strokeWidth="2.4577"
                            />
                        </g>
                    )}
                    {plaque === 'wavy' && (
                      <>
                        <g id="wavy marquee" filter="url(#filter0_b_2806_100)">
                          <path d="M25.5508 205.668C25.5508 204.064 26.6688 202.678 28.2358 202.338L39.4732 199.9C60.8194 195.269 83.0003 196.238 103.862 202.711V202.711C128.311 210.297 154.587 210.265 179.036 202.679V202.679C199.782 196.242 221.915 195.194 243.167 199.685L255.676 202.329C257.307 202.674 258.475 204.113 258.475 205.781V250.349C258.475 252.525 256.472 254.149 254.343 253.699L243.167 251.337C221.915 246.845 199.782 247.893 179.036 254.331V254.331C154.587 261.917 128.311 261.948 103.862 254.362V254.362C83.0003 247.889 60.8194 246.921 39.4732 251.552L29.5561 253.703C27.4967 254.15 25.5508 252.581 25.5508 250.473V205.668Z" fill="white"/>
                        </g>
                      </>
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
                            <path
                                id="Rectangle 138"
                                d="M23.1566 240.914C95.3745 208.334 181.331 207.803 254.838 240.915C256.135 241.499 256.968 242.8 256.968 244.237V279.091C256.153 280.3 255.53 280.761 255.084 280.923C254.67 281.073 254.193 281.041 253.437 280.695C252.775 280.391 252.066 279.929 251.17 279.344C250.988 279.225 250.797 279.101 250.597 278.971C249.462 278.237 248.124 277.411 246.533 276.74C163.105 241.526 78.7314 253.416 32.0769 276.773C31.1729 277.226 30.235 277.785 29.3373 278.321C29.0899 278.468 28.8456 278.614 28.6059 278.755C27.4598 279.43 26.3936 280.017 25.3946 280.38C24.3954 280.743 23.5905 280.834 22.926 280.662C22.3326 280.507 21.6816 280.099 21.0296 279.106V244.235C21.0296 242.798 21.8614 241.498 23.1566 240.914Z"
                                fill="#FFCD81"
                                fillOpacity="0.8"
                                stroke="black"
                                strokeWidth="2.4577"
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
                                d="M23.2416 245.772H254.756C256.792 245.772 258.443 247.422 258.443 249.458V286.181C257.137 284.985 255.777 284.098 254.197 283.487C252.132 282.689 249.786 282.399 246.86 282.399H31.4842C27.5414 282.399 23.2354 283.383 19.555 286.382V249.458C19.555 247.422 21.2055 245.772 23.2416 245.772Z"
                                fillOpacity="0.8"
                                strokeWidth="2.4577"
                                className={`fill-team-${color}-plaque-bg stroke-team-${color}-plaque-border`}
                            />

                            <g id="team name">
                              <TeamName
                                textColor={textColor}
                                textShadow={textShadow}
                                textAnchor="middle"
                                x="140" 
                              >
                                  <tspan y="273.218">{name}</tspan>
                              </TeamName>
                            </g>
                        </g>
                    )}
                    {plaque === 'wavy' && (
                      <>
                        <g id="wavy">
                          <g id="wavy marquee" filter="url(#filter0_b_2806_100)">
                          <path d="M25.5508 205.668C25.5508 204.064 26.6688 202.678 28.2358 202.338L39.4732 199.9C60.8194 195.269 83.0003 196.238 103.8618 202.711V202.711C128.311 210.297 154.587 210.265 179.036 202.679V202.679C199.782 196.242 221.915 195.194 243.167 199.685L255.676 202.329C257.307 202.674 258.475 204.113 258.475 205.781V250.349C258.475 252.525 256.472 254.149 254.343 253.699L243.167 251.337C221.915 246.845 199.782 247.893 179.036 254.331V254.331C154.587 261.917 128.311 261.948 103.8618 254.362V254.362C83.0003 247.889 60.8194 246.921 39.4732 251.552L29.5561 253.703C27.4967 254.15 25.5508 252.581 25.5508 250.473V205.668Z" fill="#F87A4C" fill-opacity="0.8"/>
                          <path d="M256.507 205.781V250.349C256.507 251.274 255.655 251.965 254.75 251.773L243.574 249.412C221.992 244.851 199.518 245.915 178.453 252.451C154.382 259.92 128.513 259.951 104.4449 252.483C83.2593 245.909 60.7338 244.926 39.0561 249.629L29.139 251.78C28.3057 251.961 27.5185 251.326 27.5185 250.473V205.668C27.5185 204.99 27.9909 204.404 28.653 204.261L39.8903 201.823C60.9049 197.264 82.7413 198.217 103.2787 204.59C128.109 212.294 154.792 212.262 179.619 204.558C200.045 198.22 221.838 197.189 242.76 201.61L255.269 204.254C255.991 204.406 256.507 205.043 256.507 205.781Z" stroke="#C03300" stroke-width="3.93536"/>
                          </g>
                        </g>
                        <path id="name-wavy"
                          pathLength="1"
                          d="M30 235.5C30 235.5 49.1306 230.5 71 230.5C92.8694 230.5 120.131 243.5 142 243.5C163.869 243.5 191.131 230.5 213 230.5C234.869 230.5 254 235.5 254 235.5"
                          stroke="none" 
                        />

                        <TeamName
                          name={name}
                          fill="#1E2F46"
                          textColor={textColor}
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
                      <rect id="stepped - mid" x="212.522" y="208.685" width="40.7904" height="47.6707"
                        rx="2.9487" fill="white" stroke="#1E2F46" stroke-width="3.9316" />
                      <rect id="stepped - mid_2" x="26.2588" y="208.685" width="40.5447" height="47.6707"
                        rx="2.9487" fill="white" stroke="#1E2F46" stroke-width="3.9316" />
                      <path id="Vector 186"
                        d="M66.3112 234.613H49.5969C49.1718 234.613 48.9472 235.116 49.231 235.433L67.0538 255.308C67.6557 255.979 68.7684 255.553 68.7684 254.652V237.071C68.7684 235.713 67.6683 234.613 66.3112 234.613Z"
                        fill="white" stroke="#1E2F46" stroke-width="3.9316" />
                      <path id="Vector 187"
                        d="M213.007 234.613H229.721C230.147 234.613 230.371 235.116 230.087 235.433L212.265 255.308C211.663 255.979 210.55 255.553 210.55 254.652V237.071C210.55 235.713 211.65 234.613 213.007 234.613Z"
                        fill="white" stroke="#1E2F46" stroke-width="3.9316" />
                      <g id="Rectangle 218" filter="url(#filter0_b_2806_100)">
                        <rect x="46" y="186" width="186.505" height="51.6023" rx="4.91451" fill="white"
                          fill-opacity="0.8" />
                        <rect x="47.9658" y="187.966" width="182.574" height="47.6707" rx="2.9487"
                          stroke="#1E2F46" stroke-width="3.9316" />
                      </g>
                      <TeamName
                          id="stepped-name"
                          fill="#1E2F46"
                          textColor={textColor}
                          textShadow={textShadow}
                          textAnchor="middle"
                          x="139.2529" 
                        >
                            <tspan y="220.463">{name}</tspan>
                        </TeamName>
                    </g>
                    )}
                    {plaque === 'downward-curve' && (
                      <>
                        <g id="plaque downward curve" filter="url(#filter0_b_2806_100)">
                        <path
                          d="M26 264.602C26 268.184 29.7093 270.562 32.9639 269.066L37.3391 267.056C103.36 236.726 179.422 237.177 245.078 268.289L246.453 268.941C249.713 270.485 253.47 268.108 253.47 264.501V227.227C253.47 225.329 252.376 223.6 250.661 222.787L245.078 220.142C179.422 189.03 103.36 188.579 37.3391 218.909L28.862 222.804C27.1178 223.605 26 225.349 26 227.268V264.602Z"
                         fill-opacity="0.8"
                         className={`fill-team-${color}-plaque-bg`}
                          />
                        <path
                          d="M251.505 264.501V227.227C251.505 226.088 250.849 225.051 249.819 224.563L244.237 221.918C179.105 191.055 103.653 190.607 38.1595 220.695L29.6824 224.59C28.6359 225.07 27.9652 226.117 27.9652 227.268V264.602C27.9652 266.751 30.1907 268.178 32.1435 267.281L36.5187 265.271C103.068 234.697 179.738 235.152 245.92 266.513L247.295 267.165C249.25 268.091 251.505 266.665 251.505 264.501Z"
                          stroke-width="3.93037" 
                          className={`stroke-team-${color}-plaque-border`}
                          />
                        </g>

                        <path id="downward-curve-name"
                          d="M31 254.5C31 254.5 83 230.5 139.5 230.5C196 230.5 248 254.5 248 254.5" stroke="none" />

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
