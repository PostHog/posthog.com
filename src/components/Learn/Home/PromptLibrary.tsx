import React, { useMemo, useState } from 'react'
import { IconCheck, IconCopy } from '@posthog/icons'
import OSButton from 'components/OSButton'
import { ToggleGroup } from 'components/RadixUI/ToggleGroup'
import { SearchInput } from 'components/UI/SearchInput'
import usePostHog from 'hooks/usePostHog'
import { POCKET_GUIDE_VOLUMES } from '../../../constants/pocketGuides'
import { LEARN_PROMPT_SETS, learnPrompts, type LearnPrompt } from '../learnPrompts'

const ALL = 'all'

function PromptCard({ prompt, volume }: { prompt: LearnPrompt; volume?: string }): JSX.Element {
    const posthog = usePostHog()
    const [copied, setCopied] = useState(false)
    const copy = () => {
        navigator.clipboard.writeText(prompt.prompt)
        // Records the copy, not the prompt text. Same event as the product prompt pages.
        posthog?.capture('learn_prompt_copied', { volume, resource: prompt.resource, surface: 'prompt_library' })
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
    }
    return (
        <article className="flex min-w-0 flex-col gap-3 rounded-md border border-primary bg-primary p-4">
            <div className="flex items-center justify-between gap-3">
                <h4 className="m-0 text-base font-bold">{prompt.title}</h4>
                <OSButton
                    type="button"
                    size="sm"
                    variant="secondary"
                    icon={copied ? <IconCheck /> : <IconCopy />}
                    onClick={copy}
                    aria-label={`Copy prompt: ${prompt.title}`}
                >
                    {copied ? 'Copied' : 'Copy'}
                </OSButton>
            </div>
            {/* A preview: the card copies the full prompt. */}
            <pre className="m-0 line-clamp-4 whitespace-pre-wrap break-words rounded border border-primary bg-white p-3 font-code text-[13px] leading-5 text-secondary dark:bg-dark">
                {prompt.prompt}
            </pre>
        </article>
    )
}

/** Every Learn agent prompt in one place, grouped by product, with search and a product filter. */
export default function PromptLibrary(): JSX.Element {
    const [query, setQuery] = useState('')
    const [product, setProduct] = useState(ALL)

    const groups = useMemo(() => {
        const q = query.trim().toLowerCase()
        return LEARN_PROMPT_SETS.filter((set) => product === ALL || set.productHandle === product)
            .map((set) => ({
                set,
                volume: POCKET_GUIDE_VOLUMES.find((v) => v.productHandle === set.productHandle)?.id,
                prompts: learnPrompts(set).filter(
                    ({ title, prompt }) => !q || `${set.productName} ${title} ${prompt}`.toLowerCase().includes(q)
                ),
            }))
            .filter((group) => group.prompts.length > 0)
    }, [query, product])

    return (
        <section>
            <h2 className="m-0 text-xl font-bold">Prompts for your agent</h2>
            <p className="mb-0 mt-1 text-secondary">
                Prompts that teach you PostHog using your own code and data. Copy one into your coding agent.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
                <SearchInput
                    value={query}
                    onValueChange={setQuery}
                    placeholder="Search prompts"
                    aria-label="Search prompts"
                    className="w-full @md:w-60"
                />
                <ToggleGroup
                    title="Filter by product"
                    hideTitle
                    value={product}
                    onValueChange={setProduct}
                    options={[
                        { label: 'All', value: ALL, default: true },
                        ...LEARN_PROMPT_SETS.map((set) => ({ label: set.productName, value: set.productHandle })),
                    ]}
                />
            </div>
            {groups.length === 0 && (
                <p className="mb-0 mt-6 rounded-md border border-dashed border-primary p-6 text-center text-secondary">
                    No prompts match. Try another word, like "flags" or "cost".
                </p>
            )}
            {groups.map(({ set, volume, prompts }) => (
                <div key={set.productHandle} className="mt-8">
                    <h3 className="m-0 text-lg font-bold">{set.productName}</h3>
                    <div className="mt-3 grid grid-cols-1 gap-4 @2xl:grid-cols-2">
                        {prompts.map((prompt) => (
                            <PromptCard key={prompt.title} prompt={prompt} volume={volume} />
                        ))}
                    </div>
                </div>
            ))}
        </section>
    )
}
