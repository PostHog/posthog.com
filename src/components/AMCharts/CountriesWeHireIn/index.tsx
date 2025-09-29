import React, { useLayoutEffect, useRef } from 'react'
import * as am5 from '@amcharts/amcharts5'
import * as am5map from '@amcharts/amcharts5/map'
import am5geodata_worldLow from '@amcharts/amcharts5-geodata/worldLow'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'
import { PatternSet, LinePattern } from '@amcharts/amcharts5'

type ExclusionReason = 'sanctions' | 'high-cost' | 'possible-high-cost' | 'germany' | 'timezone'

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

    // Possible with more research
    Brazil: { code: 'BR', reason: 'possible-high-cost' },
    Uruguay: { code: 'UY', reason: 'possible-high-cost' },

    // Germany (10 employee limit)
    Germany: { code: 'DE', reason: 'germany' },

    // Outside timezone range (UTC+3 and beyond)
    Afghanistan: { code: 'AF', reason: 'timezone' },
    Armenia: { code: 'AM', reason: 'timezone' },
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
    Iraq: { code: 'IQ', reason: 'timezone' },
    Japan: { code: 'JP', reason: 'timezone' },
    Jordan: { code: 'JO', reason: 'timezone' },
    Kenya: { code: 'KE', reason: 'timezone' },
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
    'New Zealand': { code: 'NZ', reason: 'timezone' },
    Oman: { code: 'OM', reason: 'timezone' },
    Pakistan: { code: 'PK', reason: 'timezone' },
    'Papua New Guinea': { code: 'PG', reason: 'timezone' },
    Philippines: { code: 'PH', reason: 'timezone' },
    Qatar: { code: 'QA', reason: 'timezone' },
    Russia: { code: 'RU', reason: 'timezone' },
    Samoa: { code: 'WS', reason: 'timezone' },
    'Saudi Arabia': { code: 'SA', reason: 'timezone' },
    Seychelles: { code: 'SC', reason: 'timezone' },
    Singapore: { code: 'SG', reason: 'timezone' },
    'Solomon Islands': { code: 'SB', reason: 'timezone' },
    Somalia: { code: 'SO', reason: 'timezone' },
    'South Korea': { code: 'KR', reason: 'timezone' },
    'Sri Lanka': { code: 'LK', reason: 'timezone' },
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
    sanctions: 0x333333, // Dark gray
    'high-cost': 0xcc6666, // Red
    'possible-high-cost': 0xf4b427, // Yellow (will have pattern)
    germany: 0x6699cc, // Blue
    timezone: 0xaaaaaa, // Light gray
}

const reasonLabels: { [key in ExclusionReason]: string } = {
    sanctions: 'Restricted due to US sanctions',
    'high-cost': 'High employer costs',
    'possible-high-cost': 'High employer costs (possible with more research)',
    germany: 'Limited to 10 employees',
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

        const root = am5.Root.new(chartRef.current)
        root.setThemes([am5themes_Animated.new(root)])

        const chart = root.container.children.push(
            am5map.MapChart.new(root, {
                projection: am5map.geoMercator(),
                panX: 'rotateX',
                minZoomLevel: 0.8,
            })
        )

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

        // Set fill color and pattern based on exclusion reason
        polygonSeries.mapPolygons.template.adapters.add('fill', (_fill, target) => {
            const dataItem = target.dataItem as am5.DataItem<any>
            const id = (dataItem?.dataContext as any)?.id

            const restriction = restrictionMap.get(id)
            if (restriction) {
                return am5.color(reasonColors[restriction.reason])
            }
            return am5.color(0xf4b427) // PostHog yellow for hiring countries
        })

        // Add diagonal pattern for Brazil and Uruguay using stroke
        polygonSeries.mapPolygons.template.adapters.add('stroke', (_stroke, target) => {
            const dataItem = target.dataItem as am5.DataItem<any>
            const id = (dataItem?.dataContext as any)?.id

            if (id === 'BR' || id === 'UY') {
                return am5.color(0x333333)
            }
            return am5.color(0xffffff)
        })

        polygonSeries.mapPolygons.template.adapters.add('strokeWidth', (_strokeWidth, target) => {
            const dataItem = target.dataItem as am5.DataItem<any>
            const id = (dataItem?.dataContext as any)?.id

            if (id === 'BR' || id === 'UY') {
                return 3
            }
            return 0.5
        })

        polygonSeries.mapPolygons.template.adapters.add('strokeDasharray', (_strokeDasharray, target) => {
            const dataItem = target.dataItem as am5.DataItem<any>
            const id = (dataItem?.dataContext as any)?.id

            if (id === 'BR' || id === 'UY') {
                return [5, 5]
            }
            return []
        })

        // Set tooltip based on exclusion reason
        polygonSeries.mapPolygons.template.adapters.add('tooltipText', (_text, target) => {
            const dataItem = target.dataItem as am5.DataItem<any>
            const id = (dataItem?.dataContext as any)?.id
            const name = (dataItem?.dataContext as any)?.name

            const restriction = restrictionMap.get(id)
            if (restriction) {
                return `${name}\n${reasonLabels[restriction.reason]}`
            }
            return `We hire from ${name}!`
        })

        polygonSeries.mapPolygons.template.states.create('hover', {
            fill: am5.color(0xff6a00), // PostHog orange on hover
        })

        // Add zoom control
        chart.set(
            'zoomControl',
            am5map.ZoomControl.new(root, {
                position: 'absolute',
            })
        )

        return () => {
            root.dispose()
        }
    }, [excludedCountries])

    return (
        <div>
            <div ref={chartRef} style={{ width: '100%', height: '500px' }} />
            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '1rem',
                    marginTop: '1rem',
                    fontSize: '0.875rem',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div
                        style={{
                            width: '20px',
                            height: '20px',
                            backgroundColor: '#f4b427',
                            border: '1px solid #ddd',
                        }}
                    />
                    <span>Countries we hire from</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div
                        style={{
                            width: '20px',
                            height: '20px',
                            backgroundColor: '#333333',
                            border: '1px solid #ddd',
                        }}
                    />
                    <span>US sanctions</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div
                        style={{
                            width: '20px',
                            height: '20px',
                            backgroundColor: '#cc6666',
                            border: '1px solid #ddd',
                        }}
                    />
                    <span>High employer costs</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div
                        style={{
                            width: '20px',
                            height: '20px',
                            backgroundColor: '#f4b427',
                            backgroundImage:
                                'repeating-linear-gradient(45deg, #333 0, #333 2px, transparent 2px, transparent 6px)',
                            border: '1px solid #ddd',
                        }}
                    />
                    <span>High employer costs (possible with research)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div
                        style={{
                            width: '20px',
                            height: '20px',
                            backgroundColor: '#6699cc',
                            border: '1px solid #ddd',
                        }}
                    />
                    <span>Limited to 10 employees</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div
                        style={{
                            width: '20px',
                            height: '20px',
                            backgroundColor: '#aaaaaa',
                            border: '1px solid #ddd',
                        }}
                    />
                    <span>Outside hiring timezone range</span>
                </div>
            </div>
            {children}
        </div>
    )
}
