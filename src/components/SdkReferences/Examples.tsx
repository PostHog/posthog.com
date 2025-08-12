import React from 'react'
import { SingleCodeBlock } from '../CodeBlock'
import languageMap from '../CodeBlock/languages'
import Tab from 'components/Tab'

interface Example {
    id: string
    name: string
    code: string
}

const FunctionExamples = ({ examples, language }: { examples: Example[]; language: string }) => {
    if (!examples || examples.length === 0) return null

    // Get language info from the languageMap
    const languageInfo = languageMap[language] || languageMap['js'] // fallback to 'js' if not found

    const renderCodeBlock = (code: string) => (
        <SingleCodeBlock language={languageInfo.language} showLabel={true} showLineNumbers={false} showCopy={true}>
            {code}
        </SingleCodeBlock>
    )

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
                            {examples.map((example) => (
                                <Tab.Panel key={example.id}>{renderCodeBlock(example.code)}</Tab.Panel>
                            ))}
                        </Tab.Panels>
                    </Tab.Group>
                ) : (
                    renderCodeBlock(examples[0].code)
                )}
            </div>
        </div>
    )
}

export default FunctionExamples
