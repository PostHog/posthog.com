import CodeBlock from 'components/Home/CodeBlock'
import React from 'react'

export default function IdentifyUser() {
    return (
        <div className="grid grid-cols-2 gap-x-6">
            <div>
                <h4>Your code</h4>
                <CodeBlock code={`console.log('test')`} language="js" />
            </div>
            <div>
                <h4>Available in PostHog</h4>
                <CodeBlock code={`console.log('test')`} language="js" />
            </div>
        </div>
    )
}
