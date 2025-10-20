import React, { useMemo, useState, useRef, useEffect } from 'react'
import { useTaskOwnership } from '../../hooks/useTaskOwnership'
import SmallTeam from '../SmallTeam'
import TeamMember from '../TeamMember'
import { OSInput } from '../OSForm'
import Mark from 'mark.js'

interface TaskOwnershipTableProps {
    dataset: string
}

export default function TaskOwnershipTable({ dataset }: TaskOwnershipTableProps): JSX.Element {
    const { tasks: allTasks, groups: allGroups } = useTaskOwnership({ dataKey: dataset })
    const [searchQuery, setSearchQuery] = useState('')
    const containerRef = useRef<HTMLDivElement>(null)
    const markedRef = useRef<Mark | null>(null)

    // Filter tasks based on search query
    const groups = useMemo(() => {
        if (!searchQuery.trim()) {
            return allGroups
        }

        const searchLower = searchQuery.toLowerCase()

        return allGroups
            .map((group) => {
                const groupTasks = allTasks[group.key] || []
                const filteredTasks = groupTasks.filter((task) => {
                    // Search in task name
                    if (task.task.toLowerCase().includes(searchLower)) {
                        return true
                    }

                    // Search in owner names/slugs
                    if (
                        task.owner.some((owner) => {
                            if (typeof owner === 'string') {
                                return owner.toLowerCase().includes(searchLower)
                            }
                            return false
                        })
                    ) {
                        return true
                    }

                    return false
                })

                return {
                    ...group,
                    tasks: filteredTasks,
                }
            })
            .filter((group) => group.tasks.length > 0) // Only show groups with matching tasks
    }, [allGroups, allTasks, searchQuery])

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setSearchQuery(value)

        // Apply highlighting after a brief delay
        setTimeout(() => {
            if (containerRef.current && value.trim()) {
                if (markedRef.current) {
                    markedRef.current.unmark()
                }
                // Highlight in task names
                const searchableElements = containerRef.current.querySelectorAll('[data-searchable]')
                if (searchableElements.length > 0) {
                    const elements = Array.from(searchableElements) as HTMLElement[]
                    markedRef.current = new Mark(elements)
                    markedRef.current.mark(value, {
                        separateWordSearch: false,
                        accuracy: 'partially',
                    })
                }
            } else if (markedRef.current) {
                markedRef.current.unmark()
            }
        }, 100)
    }

    const handleSearchKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') {
            setSearchQuery('')
            if (markedRef.current) {
                markedRef.current.unmark()
            }
        }
    }

    const handleClearSearch = () => {
        setSearchQuery('')
        if (markedRef.current) {
            markedRef.current.unmark()
        }
    }

    // Cleanup highlighting on unmount
    useEffect(() => {
        return () => {
            if (markedRef.current) {
                markedRef.current.unmark()
            }
        }
    }, [])

    return (
        <>
            <div>
                <OSInput
                    type="text"
                    label="Search tasks"
                    showLabel={false}
                    placeholder="Search tasks or owners..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onKeyDown={handleSearchKeyDown}
                    onClear={handleClearSearch}
                    showClearButton={true}
                    size="sm"
                    width="full"
                    name="task-search"
                />
            </div>

            <div ref={containerRef}>
                {groups.map((group) => (
                    <div key={group.key} className="">
                        <h3 className="text-xl font-bold mb-4">{group.name}</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full my-0">
                                <thead>
                                    <tr>
                                        {group.columns.map((col, idx) => (
                                            <th key={idx} className="text-left">
                                                {col.label}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {group.tasks.map((task, taskIdx) => (
                                        <tr key={taskIdx}>
                                            <td className="align-top">
                                                <span data-searchable>{task.task}</span>
                                            </td>
                                            <td className="align-top">
                                                {task.owner.length > 0 ? (
                                                    <div className="flex flex-wrap gap-2" data-searchable>
                                                        {task.owner.map((owner, ownerIdx) => {
                                                            // Check if it's a team slug (lowercase with hyphens)
                                                            if (typeof owner === 'string' && owner.includes('-')) {
                                                                return (
                                                                    <SmallTeam
                                                                        key={ownerIdx}
                                                                        slug={owner}
                                                                        noMiniCrest
                                                                    />
                                                                )
                                                            }
                                                            // Otherwise it's a person's full name
                                                            return (
                                                                <TeamMember
                                                                    key={ownerIdx}
                                                                    name={owner as string}
                                                                    photo
                                                                />
                                                            )
                                                        })}
                                                    </div>
                                                ) : null}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))}
            </div>

            {groups.length === 0 && searchQuery && (
                <div className="text-center py-8">
                    <p className="text-secondary">No tasks found matching "{searchQuery}"</p>
                </div>
            )}
        </>
    )
}
