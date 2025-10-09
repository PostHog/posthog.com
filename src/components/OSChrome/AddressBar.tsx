import React, { useMemo, useState, useEffect } from 'react'
import { useWindow } from '../../context/Window'
import SearchBar from 'components/Editor/SearchBar'
import Tooltip from 'components/RadixUI/Tooltip'
import Toast from 'components/RadixUI/Toast'
import { useUser } from 'hooks/useUser'
import { useApp } from '../../context/App'
import { useToast } from '../../context/Toast'
import Link from 'components/Link'
import { useCartStore } from '../../templates/merch/store'
import { Select } from 'components/RadixUI/Select'
import { navigate } from 'gatsby'

interface AddressBarProps {
  selectOptions: any[]
  currentPath: string
  handleValueChange: (value: string) => void
  selectedCategory?: string
}

export default function AddressBar({
  selectOptions,
  currentPath,
  handleValueChange,
  selectedCategory,
}: AddressBarProps) {
  return (
    <div data-scheme="secondary" className="bg-primary px-2 pb-2 border-b border-primary">
      <Select
        groups={selectOptions}
        placeholder="Select..."
        ariaLabel="Products"
        defaultValue={selectedCategory || currentPath}
        onValueChange={handleValueChange}
        className="w-full"
        dataScheme="primary"
      />
    </div>
  )
}
