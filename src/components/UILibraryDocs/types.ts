import type React from 'react'

export type DocExample = {
    id: string
    title: string
    description?: React.ReactNode
    Component: React.ComponentType
    source: string
    replay?: boolean
}

export type DocProp = {
    name: string
    type: string
    defaultValue?: string
    description: React.ReactNode
}

export type DocPropsGroup = {
    component: string
    rows: DocProp[]
}

export type DocLink = {
    label: string
    url: string
}

export type DocImport = {
    path: string
    names: string[]
}

export type ComponentDoc = {
    slug: string
    importPath?: string
    importNames?: string[]
    imports?: DocImport[]
    sourcePath?: string
    sourcePaths?: string[]
    apiNote?: React.ReactNode
    baseUi?: DocLink[]
    examples: DocExample[]
    notes?: React.ReactNode[]
    props?: DocPropsGroup[]
}
