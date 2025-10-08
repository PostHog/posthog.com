import React, { useLayoutEffect, useRef } from 'react'
import * as am5 from '@amcharts/amcharts5'
import * as am5map from '@amcharts/amcharts5/map'
import am5geodata_worldLow from '@amcharts/amcharts5-geodata/worldLow'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'
type ExclusionReason = 'sanctions' | 'high-cost' | 'only-contractor-setup' | 'germany' | 'timezone'

interface CountryRestriction {
    code: string
    reason: ExclusionReason
}

// Map of country names to ISO2 codes and exclusion reasons
const countryRestrictions: { [key: string]: CountryRestriction } = {
    // US sanctions
    Cuba: { code: 'CU', reason: 'sanctions' },
    Iran: { code: 'IR', reason: 'sanctions' },
    'North Korea': { code: 'KP', reason: 'sanctions' },
    Russia: { code: 'RU', reason: 'sanctions' },
    Syria: { code: 'SY', reason: 'sanctions' },

    // High employer costs (EOR not available)
    Belgium: { code: 'BE', reason: 'high-cost' },
    Bolivia: { code: 'BO', reason: 'high-cost' },
    Denmark: { code: 'DK', reason: 'high-cost' },
    France: { code: 'FR', reason: 'high-cost' },
    Iceland: { code: 'IS', reason: 'high-cost' },
    Italy: { code: 'IT', reason: 'high-cost' },
    Luxembourg: { code: 'LU', reason: 'high-cost' },
    Sweden: { code: 'SE', reason: 'high-cost' },
    Switzerland: { code: 'CH', reason: 'high-cost' },

    // Only contractor setup
    Brazil: { code: 'BR', reason: 'only-contractor-setup' },
    Uruguay: { code: 'UY', reason: 'only-contractor-setup' },

    // Germany (10 employee limit)
    Germany: { code: 'DE', reason: 'germany' },

    // Outside timezone range (UTC+3 and beyond, or UTC-9 and beyond)
    Afghanistan: { code: 'AF', reason: 'timezone' },
    Armenia: { code: 'AM', reason: 'timezone' },
    Australia: { code: 'AU', reason: 'timezone' },
    Azerbaijan: { code: 'AZ', reason: 'timezone' },
    Bahrain: { code: 'BH', reason: 'timezone' },
    Bangladesh: { code: 'BD', reason: 'timezone' },
    Belarus: { code: 'BY', reason: 'timezone' },
    Bhutan: { code: 'BT', reason: 'timezone' },
    Brunei: { code: 'BN', reason: 'timezone' },
    Cambodia: { code: 'KH', reason: 'timezone' },
    China: { code: 'CN', reason: 'timezone' },
    Comoros: { code: 'KM', reason: 'timezone' },
    Djibouti: { code: 'DJ', reason: 'timezone' },
    Eritrea: { code: 'ER', reason: 'timezone' },
    Ethiopia: { code: 'ET', reason: 'timezone' },
    Fiji: { code: 'FJ', reason: 'timezone' },
    Georgia: { code: 'GE', reason: 'timezone' },
    India: { code: 'IN', reason: 'timezone' },
    Indonesia: { code: 'ID', reason: 'timezone' },
    Iraq: { code: 'IQ', reason: 'timezone' },
    Japan: { code: 'JP', reason: 'timezone' },
    Jordan: { code: 'JO', reason: 'timezone' },
    Kenya: { code: 'KE', reason: 'timezone' },
    Kazakhstan: { code: 'KZ', reason: 'timezone' },
    Kiribati: { code: 'KI', reason: 'timezone' },
    Kuwait: { code: 'KW', reason: 'timezone' },
    Kyrgyzstan: { code: 'KG', reason: 'timezone' },
    Laos: { code: 'LA', reason: 'timezone' },
    Madagascar: { code: 'MG', reason: 'timezone' },
    Malaysia: { code: 'MY', reason: 'timezone' },
    Maldives: { code: 'MV', reason: 'timezone' },
    Mauritius: { code: 'MU', reason: 'timezone' },
    Mongolia: { code: 'MN', reason: 'timezone' },
    Myanmar: { code: 'MM', reason: 'timezone' },
    Nauru: { code: 'NR', reason: 'timezone' },
    Nepal: { code: 'NP', reason: 'timezone' },
    'New Caledonia': { code: 'NC', reason: 'timezone' },
    'New Zealand': { code: 'NZ', reason: 'timezone' },
    Oman: { code: 'OM', reason: 'timezone' },
    Pakistan: { code: 'PK', reason: 'timezone' },
    'Papua New Guinea': { code: 'PG', reason: 'timezone' },
    Philippines: { code: 'PH', reason: 'timezone' },
    Qatar: { code: 'QA', reason: 'timezone' },
    Samoa: { code: 'WS', reason: 'timezone' },
    'Saudi Arabia': { code: 'SA', reason: 'timezone' },
    Seychelles: { code: 'SC', reason: 'timezone' },
    Singapore: { code: 'SG', reason: 'timezone' },
    'Solomon Islands': { code: 'SB', reason: 'timezone' },
    Somalia: { code: 'SO', reason: 'timezone' },
    'South Korea': { code: 'KR', reason: 'timezone' },
    'Sri Lanka': { code: 'LK', reason: 'timezone' },
    'Taiwan': { code: 'TW', reason: 'timezone' },
    Tajikistan: { code: 'TJ', reason: 'timezone' },
    Tanzania: { code: 'TZ', reason: 'timezone' },
    Thailand: { code: 'TH', reason: 'timezone' },
    'Timor-Leste': { code: 'TL', reason: 'timezone' },
    Tonga: { code: 'TO', reason: 'timezone' },
    Turkey: { code: 'TR', reason: 'timezone' },
    Turkmenistan: { code: 'TM', reason: 'timezone' },
    Tuvalu: { code: 'TV', reason: 'timezone' },
    Uganda: { code: 'UG', reason: 'timezone' },
    'United Arab Emirates': { code: 'AE', reason: 'timezone' },
    Uzbekistan: { code: 'UZ', reason: 'timezone' },
    Vanuatu: { code: 'VU', reason: 'timezone' },
    Vietnam: { code: 'VN', reason: 'timezone' },
    Yemen: { code: 'YE', reason: 'timezone' },
}

const reasonColors: { [key in ExclusionReason]: number } = {
    sanctions: 0xf35454, // Red
    'high-cost': 0xb62ad9, // Purple
    'only-contractor-setup': 0xf7a501, // Orange (will have pattern)
    germany: 0x3b2b26, // Dark brown
    timezone: 0xaaaaaa, // Light gray
}

const reasonLabels: { [key in ExclusionReason]: string } = {
    sanctions: 'Restricted due to US sanctions',
    'high-cost': 'High employer costs',
    'only-contractor-setup': 'Only contractor setup',
    germany: 'No longer hiring (limited to 10 employees)',
    timezone: 'Outside of timezones we currently hire in',
}

export default function CountriesWeHireIn({
    excludedCountries = [],
    children,
}: {
    excludedCountries?: string[]
    children?: JSX.Element
}): JSX.Element {
    const chartRef = useRef<HTMLDivElement>(null)

    useLayoutEffect(() => {
        if (!chartRef.current) return

        am5.addLicense('AM5M-1930-8548-3690-4255')

        const root = am5.Root.new(chartRef.current)
        root.setThemes([am5themes_Animated.new(root)])

        const chart = root.container.children.push(
            am5map.MapChart.new(root, {
                projection: am5map.geoEqualEarth(),
                panX: 'rotateX',
                panY: 'translateY',
                wheelY: 'zoom',
                homeGeoPoint: { latitude: 20, longitude: 0 },
                zoomLevel: 1.2,
            })
        )

        // Add zoom control
        chart.set(
            'zoomControl',
            am5map.ZoomControl.new(root, {
                position: 'absolute',
            })
        )

        // Log zoom level and rotation when they change
        chart.events.on('wheelended', function () {
            console.log('Zoom level:', chart.get('zoomLevel'))
            console.log('Rotation X:', chart.get('rotationX'))
            console.log('Rotation Y:', chart.get('rotationY'))
        })

        chart.events.on('panended', function () {
            console.log('Zoom level:', chart.get('zoomLevel'))
            console.log('Rotation X:', chart.get('rotationX'))
            console.log('Rotation Y:', chart.get('rotationY'))
        })

        // Add background series with rounded edges
        const backgroundSeries = chart.series.unshift(am5map.MapPolygonSeries.new(root, {}))

        backgroundSeries.mapPolygons.template.setAll({
            fill: am5.color(0xf5f5f5),
            stroke: am5.color(0xcccccc),
            strokeWidth: 1,
        })

        backgroundSeries.data.push({
            geometry: am5map.getGeoRectangle(90, 180, -90, -180),
        })

        // Add graticule (grid lines)
        const graticuleSeries = chart.series.push(am5map.GraticuleSeries.new(root, {}))

        graticuleSeries.mapLines.template.setAll({
            stroke: am5.color(0x000000),
            strokeOpacity: 0.1,
        })

        const polygonSeries = chart.series.push(
            am5map.MapPolygonSeries.new(root, {
                geoJSON: am5geodata_worldLow,
                exclude: ['AQ'], // Antarctica
            })
        )

        // Build a map of country codes to restrictions
        const restrictionMap = new Map<string, CountryRestriction>()
        excludedCountries.forEach((country) => {
            const restriction = countryRestrictions[country]
            if (restriction) {
                restrictionMap.set(restriction.code, restriction)
            }
        })

        polygonSeries.mapPolygons.template.setAll({
            toggleKey: 'active',
            interactive: true,
        })

        // Style tooltip with white background and black text
        const tooltip = am5.Tooltip.new(root, {
            getFillFromSprite: false,
            getStrokeFromSprite: false,
            autoTextColor: false,
            pointerOrientation: 'vertical',
        })
        tooltip.get('background')?.setAll({
            fill: am5.color(0xffffff),
            fillOpacity: 1,
            stroke: am5.color(0xcccccc),
            strokeWidth: 1,
        })
        tooltip.label.setAll({
            fill: am5.color(0x000000),
        })
        polygonSeries.set('tooltip', tooltip)

        // Set fill color and pattern based on exclusion reason
        polygonSeries.mapPolygons.template.adapters.add('fill', (_fill, target) => {
            const dataItem = target.dataItem as am5.DataItem<any>
            const id = (dataItem?.dataContext as any)?.id

            const restriction = restrictionMap.get(id)
            if (restriction) {
                return am5.color(reasonColors[restriction.reason])
            }
            return am5.color(0x2f80fa) // Blue for hiring countries
        })

        // Set tooltip based on exclusion reason
        polygonSeries.mapPolygons.template.adapters.add('tooltipHTML', (_html, target) => {
            const dataItem = target.dataItem as am5.DataItem<any>
            const id = (dataItem?.dataContext as any)?.id
            const name = (dataItem?.dataContext as any)?.name

            const checkIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display: inline-block; vertical-align: middle; margin-right: 4px; color: #22c55e;"><polyline points="20 6 9 17 4 12"></polyline></svg>`
            const xIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display: inline-block; vertical-align: middle; margin-right: 4px; color: #ef4444;"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`

            const restriction = restrictionMap.get(id)
            if (restriction) {
                return `${xIcon}<strong>${name}</strong><br/><span style="margin-left: 28px;">${
                    reasonLabels[restriction.reason]
                }</span>`
            }
            return `${checkIcon} We hire from ${name}!`
        })

        polygonSeries.mapPolygons.template.states.create('hover', {
            fill: am5.color(0xff6a00), // PostHog orange on hover
        })

        return () => {
            root.dispose()
        }
    }, [excludedCountries])

    return (
        <div>
            <div ref={chartRef} style={{ width: '100%', height: '400px' }} />
            <div className="flex flex-wrap gap-2 mt-4 text-sm">
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue rounded-sm" />
                    <span>Countries we hire from</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red rounded-sm" />
                    <span>US sanctions</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-purple rounded-sm" />
                    <span>High employer costs</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-yellow rounded-sm" />
                    <span>Unlikely to hire (high employer costs)</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-brown rounded-sm" />
                    <span>Limited to 10 employees</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray rounded-sm" />
                    <span>Outside hiring timezone range</span>
                </div>
            </div>
            {children}
        </div>
    )
}
