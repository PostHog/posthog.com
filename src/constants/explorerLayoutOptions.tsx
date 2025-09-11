import React from 'react'
import { IconGrid, IconListSquare } from 'components/OSIcons/Icons'

export const explorerLayoutOptions = [
  { label: <IconGrid className="size-4" />, value: 'grid', default: true },
  { label: <IconListSquare className="size-4" />, value: 'list' },
]
