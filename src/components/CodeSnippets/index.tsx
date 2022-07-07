import React from 'react'
import { Tab } from '@headlessui/react'

type CodeSnippetsProps = {
    snippets: [string, () => JSX.Element][]
}

export const CodeSnippets = (props: CodeSnippetsProps) => {
    return (
        <Tab.Group as="div" className="my-12">
            <Tab.List className="flex items-center flex-wrap space-x-2">
                {props.snippets.map(([name]) => (
                    <Tab
                        key={name}
                        className={({ selected }) =>
                            `px-2.5 py-1 rounded font-medium ${
                                selected ? 'bg-orange text-white' : 'bg-white'
                            } text-sm border border-gray-accent-light shadow-sm`
                        }
                    >
                        {name}
                    </Tab>
                ))}
            </Tab.List>
            <Tab.Panels className="mt-6">
                {props.snippets.map(([name, panel]) => (
                    <Tab.Panel key={name}>{panel}</Tab.Panel>
                ))}
            </Tab.Panels>
        </Tab.Group>
    )
}

export default CodeSnippets
