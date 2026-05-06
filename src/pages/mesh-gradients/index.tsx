import React from 'react'
import SEO from 'components/seo'
import ReaderView from 'components/ReaderView'
import { TreeMenu } from 'components/TreeMenu'
import { internalToolsNav } from '../../navs/internalTools'

type MeshVariant = {
    name: string
    lightClass: string
    darkClass: string
}

const variants: MeshVariant[] = [
    { name: 'green', lightClass: 'bg-mesh-green-light', darkClass: 'bg-mesh-green-dark' },
    { name: 'red', lightClass: 'bg-mesh-red-light', darkClass: 'bg-mesh-red-dark' },
    { name: 'yellow', lightClass: 'bg-mesh-yellow-light', darkClass: 'bg-mesh-yellow-dark' },
    { name: 'blue', lightClass: 'bg-mesh-blue-light', darkClass: 'bg-mesh-blue-dark' },
    { name: 'purple', lightClass: 'bg-mesh-purple-light', darkClass: 'bg-mesh-purple-dark' },
]

const Swatch = ({ className, label }: { className: string; label: string }) => (
    <div>
        <div className={`aspect-video w-full rounded-md border border-primary ${className}`} />
        <div className="mt-2 text-sm font-mono text-primary">{label}</div>
    </div>
)

export default function MeshGradients(): JSX.Element {
    return (
        <>
            <SEO
                title="Mesh gradients - Internal"
                description="Preview of mesh-gradient backgrounds used for app windows."
                image={`/images/og/default.png`}
            />
            <ReaderView
                title="Mesh gradients"
                leftSidebar={<TreeMenu items={internalToolsNav} />}
                showQuestions={false}
            >
                <div className="@container text-primary">
                    <p className="mt-0 mb-6">
                        Background gradients applied to app windows. Light and dark variants are paired by name; each
                        window picks one randomly on mount. Defined in <code>tailwind.config.js</code> under{' '}
                        <code>theme.extend.backgroundImage</code>.
                    </p>
                    <div className="space-y-10">
                        {variants.map((v) => (
                            <section key={v.name}>
                                <h2 className="text-xl font-semibold mb-4 border-b border-primary pb-2 capitalize">
                                    {v.name}
                                </h2>
                                <div className="grid grid-cols-1 @2xl:grid-cols-2 gap-4">
                                    <Swatch className={`bg-light ${v.lightClass}`} label={`${v.name}-light`} />
                                    <Swatch className={`bg-dark ${v.darkClass}`} label={`${v.name}-dark`} />
                                </div>
                            </section>
                        ))}
                    </div>
                </div>
            </ReaderView>
        </>
    )
}
