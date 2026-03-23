import React, { useState, useEffect } from 'react'
import { Select } from '../RadixUI/Select'
import { useLocation } from '@reach/router'
import { useApp } from '../../context/App'
import { WEBSITE_MODE_CLASSES } from '../../constants'

export interface FilterConfig {
    label: string
    value?: any
    options: {
        label: string
        value: any
    }[]
    onChange?: (value: string) => void
    operator: string
    filter?: (obj: any, value: any) => boolean
    initialValue?: any
}

interface ViewerFiltersProps {
    availableFilters: FilterConfig[]
    dataToFilter: any[]
    onFilterChange?: (data: any[]) => void
    handleFilterChange?: (filters: Record<string, { value: any; filter: (obj: any, value: any) => boolean }>) => void
    disableFilterChange?: boolean
    availableGroups?: {
        label: string
        value: string
    }[]
    onGroupChange?: (group: string) => void
    sortOptions?: {
        label: string
        value: string
        icon?: string
        color?: string
    }[]
    onSortChange?: (sort: string) => void
    defaultSortValue?: string
}

const filterData = (
    data: any[],
    filters: Record<string, { value: any; filter: (obj: any, value: any) => boolean }>
) => {
    return data.filter((obj: any) => {
        return Object.keys(filters).every((key) => {
            const { value, filter } = filters[key]
            if (value === null) {
                return true
            }
            return filter(obj, value)
        })
    })
}

export default function ViewerFilters({
    availableFilters,
    dataToFilter,
    onFilterChange,
    handleFilterChange: handleFilterChangeProp,
    disableFilterChange = false,
    availableGroups,
    onGroupChange,
    sortOptions,
    onSortChange,
    defaultSortValue,
}: ViewerFiltersProps) {
    const [filters, setFilters] = useState<Record<string, { value: any; filter: (obj: any, value: any) => boolean }>>(
        {}
    )
    const { search } = useLocation()
    const { websiteMode } = useApp()

    const handleFilterChange = (key: string, value: any, filter: (obj: any, value: any) => boolean) => {
        const newFilters = { ...filters, [key]: { value, filter } }
        setFilters(newFilters)
        if (handleFilterChangeProp) {
            handleFilterChangeProp(newFilters)
        } else {
            const filteredData = filterData(dataToFilter, newFilters)
            onFilterChange?.(filteredData)
        }
    }

    useEffect(() => {
        if (availableFilters && availableFilters.length > 0) {
            const searchParams = new URLSearchParams(search)
            if (searchParams.size <= 0) return
            const newFilters: Record<
                string,
                { value: any; filter: (obj: any, value: any) => boolean; initialValue?: any }
            > = {}

            searchParams.forEach((value, key) => {
                const filter = availableFilters.find((f) => (f.value || f.label).toLowerCase() === key.toLowerCase())
                if (filter) {
                    newFilters[filter.value || filter.label] = { value, filter: filter.filter!, initialValue: value }
                }
            })
            setFilters(newFilters)
            if (handleFilterChangeProp) {
                handleFilterChangeProp(newFilters)
            } else {
                const filteredData = filterData(dataToFilter, newFilters)
                onFilterChange?.(filteredData)
            }
        }
    }, [availableFilters])

    return (
        <div className="text-sm text-primary gap-1">
            <div className={`flex flex-wrap gap-2 ${websiteMode && WEBSITE_MODE_CLASSES}`}>
                {availableFilters.map((filter) => {
                    const resolvedDefault =
                        filter.initialValue === null || filter.initialValue === undefined
                            ? filters[filter.value ?? filter.label]?.value ?? undefined
                            : filter.initialValue
                    return (
                        <Select
                            key={`${Object.keys(filters).length}-${filter.label}`}
                            disabled={disableFilterChange}
                            placeholder={filter.label}
                            defaultValue={resolvedDefault === null ? undefined : resolvedDefault}
                            groups={[
                                {
                                    label: '',
                                    items: filter.options.map((option) => ({
                                        label: option.label,
                                        value: option.value,
                                    })),
                                },
                            ]}
                            onValueChange={(value) =>
                                handleFilterChange(filter.value ?? filter.label, value, filter.filter!)
                            }
                        />
                    )
                })}
                {availableGroups && availableGroups.length > 0 && (
                    <div className="@xl:ml-auto flex items-center space-x-1">
                        <span className="text-sm font-bold">Group by</span>
                        <Select
                            placeholder="Group by"
                            defaultValue="none"
                            groups={[
                                {
                                    label: '',
                                    items: [
                                        { label: 'None', value: 'none' },
                                        ...availableGroups.map((group) => ({
                                            label: group.label,
                                            value: group.value,
                                        })),
                                    ],
                                },
                            ]}
                            onValueChange={(value) => onGroupChange?.(value)}
                        />
                    </div>
                )}
                {sortOptions && sortOptions.length > 0 && (
                    <div className="ml-auto flex items-center space-x-2">
                        <span className="text-sm font-bold">Sort by:</span>
                        <Select
                            placeholder="Sort by"
                            defaultValue={defaultSortValue}
                            groups={[
                                {
                                    label: '',
                                    items: sortOptions.map((option) => ({
                                        label: option.label,
                                        value: option.value,
                                    })),
                                },
                            ]}
                            onValueChange={(value) => onSortChange?.(value)}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}
