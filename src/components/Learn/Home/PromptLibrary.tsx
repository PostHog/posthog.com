import React, { useMemo, useState } from 'react'
import { Select } from 'components/RadixUI/Select'
import { SearchInput } from 'components/UI/SearchInput'
import PromptSnippet from 'components/Learn/PromptSnippet'
import usePostHog from 'hooks/usePostHog'
import useProduct from 'hooks/useProduct'
import { POCKET_GUIDE_VOLUMES } from '../../../constants/pocketGuides'
import { LEARN_PROMPT_SETS, learnPrompts } from '../learnPrompts'

const ALL = 'all'

/** Every Learn agent prompt in one place, grouped by product, with search and a product filter. */
export default function PromptLibrary(): JSX.Element {
    const posthog = usePostHog()
    const products = useProduct() as any[]
    // Same icon and color as the Products menu.
    const productIcon = (handle: string, className: string) => {
        const info = products.find((p) => p.handle === handle)
        return info?.Icon ? <info.Icon className={`${className} shrink-0 text-${info.color}`} /> : null
    }
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
            <div className="mt-5 flex flex-wrap items-center gap-2">
                <SearchInput
                    value={query}
                    onValueChange={setQuery}
                    appearance="pill"
                    placeholder="Search prompts"
                    aria-label="Search prompts"
                    className="min-w-[200px] flex-1"
                />
                <Select
                    groups={[
                        {
                            label: '',
                            items: [
                                { value: ALL, label: 'All products' },
                                ...LEARN_PROMPT_SETS.map((set) => ({
                                    value: set.productHandle,
                                    label: set.productName,
                                    icon: productIcon(set.productHandle, 'size-4'),
                                })),
                            ],
                        },
                    ]}
                    placeholder="Product"
                    ariaLabel="Filter by product"
                    value={product}
                    onValueChange={setProduct}
                    dataScheme="primary"
                />
            </div>
            {groups.length === 0 && (
                <p className="mb-0 mt-6 rounded-md border border-dashed border-primary p-6 text-center text-secondary">
                    No prompts match. Try another word, like "flags" or "cost".
                </p>
            )}
            {groups.map(({ set, volume, prompts }) => (
                <div key={set.productHandle} className="mt-8">
                    <h3 className="m-0 flex items-center gap-2 text-lg font-bold">
                        {productIcon(set.productHandle, 'size-5')}
                        {set.productName}
                    </h3>
                    <div className="mt-3 grid grid-cols-1 gap-3 @2xl:grid-cols-2">
                        {prompts.map((prompt) => (
                            <PromptSnippet
                                key={prompt.title}
                                title={prompt.title}
                                prompt={prompt.prompt}
                                // Records the copy, not the prompt text. Same event as the product prompt pages.
                                onCopy={() =>
                                    posthog?.capture('learn_prompt_copied', {
                                        volume,
                                        resource: prompt.resource,
                                        surface: 'prompt_library',
                                    })
                                }
                            />
                        ))}
                    </div>
                </div>
            ))}
        </section>
    )
}
