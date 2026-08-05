import React from 'react'
import CopyButton from 'components/Points/CopyButton'

interface Props {
    prompt: string
    outcome: string
    step?: number
}

const PromptExample = ({ prompt, outcome, step }: Props) => {
    return (
        <div className="flex items-start gap-2 my-2 not-prose text-[15px] leading-relaxed">
            {typeof step === 'number' && (
                <span className="flex-shrink-0 mt-[1px] inline-flex items-center justify-center size-5 rounded-full bg-accent text-[12px] font-semibold tabular-nums">
                    {step}
                </span>
            )}
            <span className="pt-[3px] flex-shrink-0" title="Copy prompt to clipboard">
                <CopyButton text={prompt} />
            </span>
            <p className="m-0">
                <strong>"{prompt}"</strong> <span className="opacity-75">– {outcome}</span>
            </p>
        </div>
    )
}

export default PromptExample
