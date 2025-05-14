declare module 'react-simple-maps' {
  import React from 'react'
  
  export interface ComposableMapProps {
    projection?: string
    projectionConfig?: {
      scale?: number
      center?: [number, number]
      rotate?: [number, number, number]
    }
    width?: number
    height?: number
    className?: string
    children?: React.ReactNode
  }
  
  export interface ZoomableGroupProps {
    zoom?: number
    center?: [number, number]
    minZoom?: number
    maxZoom?: number
    translateExtent?: [[number, number], [number, number]]
    onMoveStart?: (position: { coordinates: [number, number], zoom: number }) => void
    onMove?: (position: { x: number, y: number, k: number, dragging: boolean }) => void
    onMoveEnd?: (position: { coordinates: [number, number], zoom: number }) => void
    children?: React.ReactNode
  }
  
  export interface GeographiesProps {
    geography: string
    children: (props: { geographies: any[] }) => React.ReactNode
  }
  
  export interface GeographyProps {
    geography: any
    style?: {
      default?: React.CSSProperties
      hover?: React.CSSProperties
      pressed?: React.CSSProperties
    }
    className?: string
    key?: string | number
    fill?: string
    stroke?: string
  }
  
  export interface MarkerProps {
    coordinates: [number, number]
    onClick?: () => void
    className?: string
    key?: string | number
    children?: React.ReactNode
  }
  
  export const ComposableMap: React.FC<ComposableMapProps>
  export const ZoomableGroup: React.FC<ZoomableGroupProps>
  export const Geographies: React.FC<GeographiesProps>
  export const Geography: React.FC<GeographyProps>
  export const Marker: React.FC<MarkerProps>
} 