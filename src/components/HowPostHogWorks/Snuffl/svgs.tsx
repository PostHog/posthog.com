import React from 'react'

// The Snuffl hedgehog silhouette. Rendered as a plain <g> so it can be
// composed into larger scenes with a transform (no SVG <use>/<defs> plumbing).
export const Hog = ({ fill = '#000', transform }: { fill?: string; transform?: string }): JSX.Element => (
    <g fill={fill} transform={transform}>
        <path d="M3 14 L4.2 7.2 5.6 10.4 7.4 4.6 8.9 9.6 11.4 3.6 12.9 9.2 15.4 4.6 16.4 10 18.6 6.6 19.6 11 21 14 Z" />
        <path d="M3 14 Q1 13.6 0.6 12.2 Q1.6 11 3.4 11.2 L4 12.4 Z" />
        <ellipse cx="21" cy="13.4" rx="1.6" ry="0.6" />
    </g>
)

export const HogIcon = ({ fill = '#fff', className }: { fill?: string; className?: string }): JSX.Element => (
    <svg viewBox="0 0 22 16" className={className} aria-hidden>
        <Hog fill={fill} />
    </svg>
)

// Ride hero: aerial garden map with the route, fence gaps, and Colin.
export const GardenMap = (): JSX.Element => (
    <svg
        viewBox="0 0 660 470"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Map of gardens with a hedgehog route through fence gaps"
    >
        <rect width="660" height="470" fill="#f4f4f2" />
        {/* street (bottom) */}
        <rect x="0" y="418" width="660" height="52" fill="#fff" />
        <line x1="12" y1="444" x2="648" y2="444" stroke="#d9d9d6" strokeWidth="2.5" strokeDasharray="14 12" />
        {/* houses row (top) */}
        <g fill="#e8e8e5">
            <rect x="24" y="18" width="128" height="64" rx="6" />
            <rect x="172" y="18" width="118" height="64" rx="6" />
            <rect x="310" y="18" width="132" height="64" rx="6" />
            <rect x="462" y="18" width="122" height="64" rx="6" />
            <rect x="604" y="18" width="34" height="64" rx="6" />
        </g>
        <g fill="#dcdcd8">
            <rect x="52" y="34" width="24" height="16" rx="2" />
            <rect x="200" y="34" width="24" height="16" rx="2" />
            <rect x="352" y="34" width="24" height="16" rx="2" />
            <rect x="496" y="34" width="24" height="16" rx="2" />
        </g>
        {/* gardens: two rows of cells */}
        <g>
            <rect x="24" y="100" width="196" height="148" rx="8" fill="#e9ede2" />
            <rect x="236" y="100" width="196" height="148" rx="8" fill="#e4e9dc" />
            <rect x="448" y="100" width="190" height="148" rx="8" fill="#e9ede2" />
            <rect x="24" y="264" width="196" height="138" rx="8" fill="#e4e9dc" />
            <rect x="236" y="264" width="196" height="138" rx="8" fill="#e9ede2" />
            <rect x="448" y="264" width="190" height="138" rx="8" fill="#e4e9dc" />
        </g>
        {/* garden details */}
        <g fill="#dbe2d1">
            <circle cx="90" cy="150" r="22" />
            <circle cx="560" cy="330" r="26" />
            <rect x="300" y="300" width="70" height="44" rx="6" />
        </g>
        <ellipse cx="520" cy="150" rx="34" ry="20" fill="#dde6ea" />
        <g fill="#d3dcc6">
            <rect x="150" y="300" width="44" height="70" rx="6" />
            <circle cx="330" cy="150" r="18" />
        </g>
        {/* fences (vertical) */}
        <g stroke="#c9bfb2" strokeWidth="3.5" strokeLinecap="round">
            <line x1="228" y1="102" x2="228" y2="196" />
            <line x1="228" y1="222" x2="228" y2="246" />
            <line x1="440" y1="102" x2="440" y2="150" />
            <line x1="440" y1="176" x2="440" y2="246" />
            <line x1="228" y1="266" x2="228" y2="400" />
            <line x1="440" y1="266" x2="440" y2="400" />
        </g>
        {/* fence (horizontal) with gap */}
        <g stroke="#c9bfb2" strokeWidth="3.5" strokeLinecap="round">
            <line x1="26" y1="256" x2="120" y2="256" />
            <line x1="146" y1="256" x2="636" y2="256" />
        </g>
        {/* route: origin garden → three fence gaps → destination garden */}
        <path
            d="M 72 358
               C 96 340, 122 316, 133 256
               C 141 216, 180 209, 228 209
               C 300 209, 320 190, 360 170
               C 396 152, 420 163, 440 163
               C 480 163, 520 178, 545 196"
            fill="none"
            stroke="#000"
            strokeWidth="4.5"
            strokeLinecap="round"
        />
        <circle cx="72" cy="358" r="7" fill="#000" />
        <circle cx="72" cy="358" r="2.6" fill="#fff" />
        <rect x="538" y="189" width="14" height="14" fill="#000" />
        <rect x="542.5" y="193.5" width="5" height="5" fill="#fff" />
        {/* hedgehog marker on route */}
        <g transform="translate(300,209)">
            <circle r="15" fill="#000" stroke="#fff" strokeWidth="2.5" />
            <Hog fill="#fff" transform="translate(-11,-8)" />
        </g>
        {/* gap chips */}
        <g fontFamily="Helvetica Neue,Helvetica,Arial,sans-serif" fontSize="11" fontWeight="700">
            {[
                [89, 242],
                [190, 181],
                [408, 128],
            ].map(([x, y]) => (
                <g key={`${x}-${y}`} transform={`translate(${x},${y})`}>
                    <rect
                        x="0"
                        y="0"
                        width="86"
                        height="22"
                        rx="11"
                        fill="#fff"
                        filter="drop-shadow(0 1px 3px rgba(0,0,0,.18))"
                    />
                    <text x="10" y="15" fill="#000">
                        GAP · 13 cm
                    </text>
                </g>
            ))}
        </g>
    </svg>
)

// Ride feature: reserved crossing held until dusk.
export const ReserveArt = (): JSX.Element => (
    <svg viewBox="0 0 560 340" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <rect width="560" height="340" fill="#eceff3" />
        <circle cx="440" cy="80" r="38" fill="#f6f6f4" />
        <circle cx="426" cy="72" r="34" fill="#eceff3" />
        <rect x="0" y="250" width="560" height="90" fill="#dfe5d8" />
        <g>
            {[40, 110, 180, 250, 320, 390, 460].map((x, i) => (
                <rect key={x} x={x} y="140" width="66" height="112" fill={i % 2 === 0 ? '#e3dfd8' : '#ddd8d0'} />
            ))}
        </g>
        <path d="M262 252 v-26 a16 16 0 0 1 32 0 v26 Z" fill="#15181c" />
        <Hog fill="#15181c" transform="translate(180,236) scale(1.35)" />
        <g transform="translate(316,196)">
            <rect
                x="0"
                y="0"
                width="152"
                height="34"
                rx="17"
                fill="#fff"
                filter="drop-shadow(0 2px 6px rgba(0,0,0,.15))"
            />
            <circle cx="20" cy="17" r="7" fill="none" stroke="#000" strokeWidth="1.6" />
            <line x1="20" y1="17" x2="20" y2="12.5" stroke="#000" strokeWidth="1.6" strokeLinecap="round" />
            <line x1="20" y1="17" x2="23.5" y2="17" stroke="#000" strokeWidth="1.6" strokeLinecap="round" />
            <text
                x="36"
                y="22"
                fontFamily="Helvetica Neue,Helvetica,Arial,sans-serif"
                fontSize="13"
                fontWeight="700"
                fill="#000"
            >
                Held until 21:47
            </text>
        </g>
    </svg>
)

// Ride feature: a brood crossing in single file.
export const BroodsArt = (): JSX.Element => (
    <svg viewBox="0 0 560 340" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <rect width="560" height="340" fill="#f6f6f4" />
        <rect x="0" y="238" width="560" height="102" fill="#e6ebe0" />
        <path d="M0 244 H560" stroke="#d5dccb" strokeWidth="2" />
        <Hog fill="#15181c" transform="translate(96,196) scale(2.6)" />
        <Hog fill="#15181c" transform="translate(216,214) scale(1.5)" />
        <Hog fill="#15181c" transform="translate(286,218) scale(1.25)" />
        <Hog fill="#15181c" transform="translate(344,220) scale(1.1)" />
        <Hog fill="#15181c" transform="translate(396,222) scale(1.0)" />
        <g transform="translate(380,120)">
            <rect
                x="0"
                y="0"
                width="128"
                height="34"
                rx="17"
                fill="#fff"
                filter="drop-shadow(0 2px 6px rgba(0,0,0,.15))"
            />
            <text
                x="18"
                y="22"
                fontFamily="Helvetica Neue,Helvetica,Arial,sans-serif"
                fontSize="13"
                fontWeight="700"
                fill="#000"
            >
                4 of 4 in line
            </text>
        </g>
    </svg>
)

// Highway: the 13×13cm hole spec drawing.
export const FenceSpec = (): JSX.Element => (
    <svg
        viewBox="0 0 1164 380"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Fence diagram with a 13 by 13 centimeter hole at ground level"
    >
        <rect width="1164" height="380" fill="#f6f6f4" />
        <rect x="0" y="308" width="1164" height="72" fill="#e6ebe0" />
        {/* fence planks */}
        <g>
            {[60, 152, 244, 336, 428, 520, 612, 704, 796, 888, 980].map((x, i) => (
                <rect key={x} x={x} y="60" width="88" height="252" fill={i % 2 === 0 ? '#efece7' : '#eae6e0'} />
            ))}
            <rect x="1072" y="60" width="32" height="252" fill="#eae6e0" />
        </g>
        {/* plank tops */}
        <g fill="#e0dbd3">
            {[60, 152, 244, 336, 428, 520, 612, 704, 796, 888, 980].map((x) => (
                <path key={x} d={`M${x} 60 h88 l-44 -14 Z`} />
            ))}
        </g>
        {/* rails */}
        <rect x="60" y="118" width="1044" height="10" fill="#dfdad2" />
        <rect x="60" y="236" width="1044" height="10" fill="#dfdad2" />
        {/* the hole */}
        <path d="M538 312 v-44 a26 26 0 0 1 52 0 v44 Z" fill="#111" />
        {/* dimension: width */}
        <g stroke="#000" strokeWidth="1.5">
            <line x1="538" y1="340" x2="590" y2="340" />
            <line x1="538" y1="334" x2="538" y2="346" />
            <line x1="590" y1="334" x2="590" y2="346" />
        </g>
        <text
            x="564"
            y="366"
            textAnchor="middle"
            fontFamily="Helvetica Neue,Helvetica,Arial,sans-serif"
            fontSize="15"
            fontWeight="700"
            fill="#000"
        >
            13 cm
        </text>
        {/* dimension: height */}
        <g stroke="#000" strokeWidth="1.5">
            <line x1="618" y1="312" x2="618" y2="260" />
            <line x1="612" y1="312" x2="624" y2="312" />
            <line x1="612" y1="260" x2="624" y2="260" />
        </g>
        <text
            x="634"
            y="292"
            fontFamily="Helvetica Neue,Helvetica,Arial,sans-serif"
            fontSize="15"
            fontWeight="700"
            fill="#000"
        >
            13 cm
        </text>
        <Hog fill="#000" transform="translate(430,286) scale(1.7)" />
        <g transform="translate(700,180)">
            <rect
                x="0"
                y="0"
                width="252"
                height="34"
                rx="17"
                fill="#fff"
                filter="drop-shadow(0 2px 6px rgba(0,0,0,.14))"
            />
            <text
                x="18"
                y="22"
                fontFamily="Helvetica Neue,Helvetica,Arial,sans-serif"
                fontSize="13.5"
                fontWeight="700"
                fill="#000"
            >
                13cm × 13cm — the industry standard
            </text>
        </g>
    </svg>
)

const QR_RIDER = [
    [30, 6, 6, 6],
    [36, 14, 6, 6],
    [30, 22, 6, 6],
    [48, 30, 6, 6],
    [60, 34, 6, 6],
    [30, 34, 10, 10],
    [48, 48, 8, 8],
    [60, 58, 6, 6],
    [34, 52, 6, 6],
    [30, 62, 6, 6],
]

const QR_HOST = [
    [34, 8, 6, 6],
    [30, 18, 6, 6],
    [40, 26, 6, 6],
    [52, 32, 6, 6],
    [30, 38, 8, 8],
    [44, 44, 6, 6],
    [56, 52, 8, 8],
    [32, 56, 6, 6],
    [62, 40, 4, 4],
]

// Decorative fake QR code (does not scan; it's a hedgehog app).
export const FakeQr = ({ variant }: { variant: 'rider' | 'host' }): JSX.Element => (
    <svg width="72" height="72" viewBox="0 0 72 72" aria-hidden>
        <rect width="72" height="72" fill="#fff" />
        <g fill="#000">
            {[
                [6, 6],
                [48, 6],
                [6, 48],
            ].map(([x, y]) => (
                <React.Fragment key={`${x}-${y}`}>
                    <rect x={x} y={y} width="18" height="18" />
                    <rect x={x + 4} y={y + 4} width="10" height="10" fill="#fff" />
                </React.Fragment>
            ))}
            {(variant === 'rider' ? QR_RIDER : QR_HOST).map(([x, y, w, h]) => (
                <rect key={`${x}-${y}`} x={x} y={y} width={w} height={h} />
            ))}
        </g>
    </svg>
)

export const PersonIcon = (): JSX.Element => (
    <svg viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21 C4 16.5 7.5 14 12 14 C16.5 14 20 16.5 20 21" />
    </svg>
)

// Safety page card icons
const safetyIconProps = {
    className: 'sn-sicon',
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: '#000',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
}

export const ShieldIcon = (): JSX.Element => (
    <svg {...safetyIconProps}>
        <path d="M12 2 20 5.5 V11 C20 16.5 12 21.5 12 21.5 C12 21.5 4 16.5 4 11 V5.5 Z" />
        <path d="M8.5 11.5 11 14 15.5 9" />
    </svg>
)

export const BellIcon = (): JSX.Element => (
    <svg {...safetyIconProps}>
        <path d="M6 9 a6 6 0 0 1 12 0 c0 5 2 6.5 2 6.5 H4 c0 0 2-1.5 2-6.5" />
        <path d="M10 19.5 a2.2 2.2 0 0 0 4 0" />
    </svg>
)

export const NoRoadIcon = (): JSX.Element => (
    <svg {...safetyIconProps}>
        <circle cx="12" cy="12" r="9" />
        <line x1="5.5" y1="5.5" x2="18.5" y2="18.5" />
    </svg>
)

export const StarIcon = (): JSX.Element => (
    <svg {...safetyIconProps}>
        <path d="M12 3 14.7 8.6 20.8 9.4 16.4 13.7 17.5 19.8 12 16.9 6.5 19.8 7.6 13.7 3.2 9.4 9.3 8.6 Z" />
    </svg>
)

export const LockIcon = (): JSX.Element => (
    <svg {...safetyIconProps}>
        <rect x="5" y="10" width="14" height="10" rx="2" />
        <path d="M8 10 V7 a4 4 0 0 1 8 0 v3" />
        <circle cx="12" cy="15" r="1.6" fill="#000" stroke="none" />
    </svg>
)

export const WarnIcon = (): JSX.Element => (
    <svg {...safetyIconProps}>
        <path d="M12 3 21 19 H3 Z" />
        <line x1="12" y1="10" x2="12" y2="14" />
        <circle cx="12" cy="16.6" r="0.6" fill="#000" stroke="none" />
    </svg>
)
