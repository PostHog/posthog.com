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
            { task: 'UK payroll', owner: ['Tara Alcantarilla-Howard'] },
            { task: 'Deel payroll', owner: ['Tara Alcantarilla-Howard'] },
            { task: 'UK benefits & pension', owner: ['Tara Alcantarilla-Howard'] },
            { task: 'US benefits & 401k', owner: ['Carol Donnelly'] },
            { task: 'Onboarding & contracts', owner: ['Carol Donnelly'] },
            { task: 'State registrations', owner: ['Carol Donnelly'] },
            { task: 'System automations', owner: ['Tara Alcantarilla-Howard'] },
            { task: 'People systems', owner: ['Carol Donnelly'] },
            { task: 'Total rewards', owner: ['Fraser Hopper'] },
            { task: 'Performance enablement', owner: ['Tara Alcantarilla-Howard'] },
            { task: 'Grievance & disciplinary process', owner: ['Fraser Hopper'] },
            { task: 'Termination & offboarding', owner: ['Tara Alcantarilla-Howard'] },
            { task: 'Access & permissions governance', owner: ['Tara Alcantarilla-Howard'] },
            { task: 'Compliance correspondence', owner: ['Carol Donnelly'] },
            { task: 'Insurance & risk renewals', owner: ['Carol Donnelly'] },
            { task: 'Vendor management', owner: ['Tara Alcantarilla-Howard'] },
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
            { task: 'Vendor management', owner: ['Kendal Ijeh'] },
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
            { task: 'Accounting - US', owner: ['Janani K'] },
            { task: 'Accounting - UK', owner: ['Janani K'] },
            { task: 'Accounting - DE', owner: ['Janani K'] },
            { task: 'Financial planning/review', owner: ['Fraser Hopper'] },
            { task: 'Financial audit coordination', owner: ['Janani K'] },
            { task: 'Board reporting', owner: ['Fraser Hopper'] },
            { task: 'Chasing receipts & invoices', owner: ['Janani K'] },
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
