import React from 'react'
import { CodeBlock } from '../CodeBlock'
import Tab from '../Tab'
import languageMap from '../CodeBlock/languages'

interface Example {
    id: string
    name: string
    code: string
}

const FunctionExamples = ({ examples, title, language }: { examples: Example[]; title: string; language: string }) => {
    if (!examples || examples.length === 0) return null

    // Get language info from the languageMap
    const languageInfo = languageMap[language] || languageMap['js'] // fallback to 'js' if not found

    return (
        <div>
            <h4 className="text-lg font-semibold mb-4">Examples</h4>
            <div className="space-y-4">
                {examples.length > 1 ? (
                    <Tab.Group>
                        <Tab.List>
                            {examples.map((example) => (
                                <Tab key={example.id}>{example.name}</Tab>
                            ))}
                        </Tab.List>
                        <Tab.Panels>
                            {examples.map((example) => {
                                return (
                                    <Tab.Panel key={example.id}>
                                        <CodeBlock
                                            selector="dropdown"
                                            currentLanguage={{
                                                label: languageInfo.label as string,
                                                language: languageInfo.language,
                                                code: example.code,
                                            }}
                                            label={
                                                <div className="code-example flex text-xs space-x-1.5 my-1">
                                                    <code className="shrink-0 text-blue">{title}</code>
                                                </div>
                                            }
                                        >
                                            {[
                                                {
                                                    label: languageInfo.label as string,
                                                    language: languageInfo.language,
                                                    code: example.code,
                                                },
                                            ]}
                                        </CodeBlock>
                                    </Tab.Panel>
                                )
                            })}
                        </Tab.Panels>
                    </Tab.Group>
                ) : (
                    <CodeBlock
                        selector="dropdown"
                        currentLanguage={{
                            label: languageInfo.label as string,
                            language: languageInfo.language,
                            code: examples[0].code,
                        }}
                        label={
                            <div className="code-example flex text-xs space-x-1.5 my-1">
                                <code className="shrink-0 text-blue">{title}</code>
                            </div>
                        }
                    >
                        {[
                            {
                                label: languageInfo.label as string,
                                language: languageInfo.language,
                                code: examples[0].code,
                            },
                        ]}
                    </CodeBlock>
                )}
            </div>
        </div>
    )
}

export default FunctionExamples
