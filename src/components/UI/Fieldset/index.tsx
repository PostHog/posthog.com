import React from 'react'
import { Fieldset as BaseFieldset } from '@base-ui/react/fieldset'
import { sectionSurface, surfaceDivider } from '../styles'
import { withClassName } from '../utils'

const Root = withClassName(BaseFieldset.Root, `m-0 flex min-w-0 flex-col gap-3 px-3 pb-3 pt-3 ${sectionSurface}`)

const Legend = withClassName(
    BaseFieldset.Legend,
    '-mx-1 bg-transparent px-1 text-[15px] font-bold text-primary data-[disabled]:text-muted',
    {
        render: <legend />,
    }
)

const Footer = withClassName(
    'div',
    `flex flex-wrap items-center justify-between gap-3 border-t pt-3 text-sm text-secondary ${surfaceDivider}`
)

export const Fieldset = { Root, Legend, Footer }
