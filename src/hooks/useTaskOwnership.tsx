import { useMemo } from 'react'

export interface Task {
    task: string
    owner: string[]
}

export interface TaskGroup {
    key: string
    name: string
    columns: Array<{ key: string; label: string }>
    tasks: Task[]
}

interface TaskData {
    groups: TaskGroup[]
    tasks: Record<string, Task[]>
}

// People team task ownership data
const PEOPLE_TASK_DATA: Record<
    string,
    { name: string; columns: Array<{ key: string; label: string }>; tasks: Task[] }
> = {
    people_ops: {
        name: 'People ops',
        columns: [
            { key: 'task', label: 'Task' },
            { key: 'owner', label: 'Owner' },
        ],
        tasks: [
            { task: 'US payroll', owner: ['Carol Donnelly'] },
            { task: 'UK payroll', owner: ['Tara Howard'] },
            { task: 'Deel payroll', owner: ['Tara Howard'] },
            { task: 'UK benefits & pension', owner: ['Tara Howard'] },
            { task: 'US benefits & 401k', owner: ['Carol Donnelly'] },
            { task: 'Onboarding & contracts', owner: ['Carol Donnelly'] },
            { task: 'State registrations', owner: ['Carol Donnelly'] },
            { task: 'System automations', owner: ['Tara Howard'] },
            { task: 'People systems', owner: ['Carol Donnelly'] },
            { task: 'Total rewards', owner: ['Fraser Hopper'] },
            { task: 'Performance enablement', owner: ['Tara Howard'] },
            { task: 'Grievance & disciplinary process', owner: ['Fraser Hopper'] },
            { task: 'Termination & offboarding', owner: ['Tara Howard'] },
            { task: 'Access & permissions governance', owner: ['Tara Howard'] },
            { task: 'Compliance correspondence', owner: ['Carol Donnelly'] },
            { task: 'Insurance & risk renewals', owner: ['Carol Donnelly'] },
        ],
    },
    culture: {
        name: 'Culture',
        columns: [
            { key: 'task', label: 'Task' },
            { key: 'owner', label: 'Owner' },
        ],
        tasks: [
            { task: 'Swag & merch', owner: ['Kendal Ijeh'] },
            { task: 'Culture campaigns & recognition', owner: ['Kendal Ijeh'] },
            { task: 'Global offsites', owner: ['Kendal Ijeh'] },
            { task: 'Engagement surveys', owner: ['Kendal Ijeh'] },
            { task: 'Budget management', owner: ['Kendal Ijeh'] },
        ],
    },
    finance: {
        name: 'Finance',
        columns: [
            { key: 'task', label: 'Task' },
            { key: 'owner', label: 'Owner' },
        ],
        tasks: [
            { task: 'Accounting - US', owner: ['Ahmed Amaar'] },
            { task: 'Accounting - UK', owner: ['Ahmed Amaar'] },
            { task: 'Accounting - DE', owner: ['Ahmed Amaar'] },
            { task: 'Financial planning/review', owner: ['Fraser Hopper'] },
            { task: 'Financial audit coordination', owner: ['Janani K'] },
            { task: 'Board reporting', owner: ['Fraser Hopper'] },
            { task: 'Chasing receipts & invoices', owner: ['Janani K'] },
            { task: 'Operational finance', owner: ['Janani K'] },
        ],
    },
    vendor_management: {
        name: 'Vendor management',
        columns: [
            { key: 'task', label: 'Task' },
            { key: 'owner', label: 'Owner' },
        ],
        tasks: [
            { task: 'SaaS, IT & HR vendors', owner: ['Tara Howard'] },
            { task: 'Facilities & events vendors (London House, travel, merch)', owner: ['Kendal Ijeh'] },
            { task: 'COGS, R&D & infra vendors', owner: ['Janani K'] },
        ],
    },
    legal: {
        name: 'Legal',
        columns: [
            { key: 'task', label: 'Task' },
            { key: 'owner', label: 'Owner' },
        ],
        tasks: [
            { task: 'Commercial agreements', owner: ['Hector Rodriguez'] },
            { task: 'Fundraising agreements', owner: ['Hector Rodriguez'] },
            { task: 'IP & confidentiality', owner: ['Hector Rodriguez'] },
            { task: 'Privacy & compliance', owner: ['Hector Rodriguez'] },
            { task: 'Share options', owner: ['Hector Rodriguez'] },
        ],
    },
}

// Data registry - add new task datasets here
const TASK_DATA_REGISTRY: Record<
    string,
    Record<string, { name: string; columns: Array<{ key: string; label: string }>; tasks: Task[] }>
> = {
    people: PEOPLE_TASK_DATA,
}

export const useTaskOwnership = ({ dataKey = 'people' }: { dataKey?: string } = {}) => {
    const taskData = TASK_DATA_REGISTRY[dataKey] || PEOPLE_TASK_DATA

    // Sort tasks alphabetically within each group
    const sortedData = useMemo(() => {
        return Object.entries(taskData).reduce((acc, [key, group]) => {
            return {
                ...acc,
                [key]: {
                    ...group,
                    tasks: [...group.tasks].sort((a, b) => a.task.localeCompare(b.task)),
                },
            }
        }, {} as typeof taskData)
    }, [taskData])

    // Create groups array for rendering
    const groups: TaskGroup[] = useMemo(() => {
        return Object.entries(sortedData).map(([key, group]) => ({
            key,
            name: group.name,
            columns: group.columns,
            tasks: group.tasks,
        }))
    }, [sortedData])

    // Create tasks lookup by group key
    const tasks = useMemo(() => {
        return Object.entries(sortedData).reduce((acc, [key, group]) => {
            return {
                ...acc,
                [key]: group.tasks,
            }
        }, {} as Record<string, Task[]>)
    }, [sortedData])

    return {
        groups,
        tasks,
    }
}
