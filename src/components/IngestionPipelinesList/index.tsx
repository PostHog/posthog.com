import React from 'react'
import { Link } from 'lib/navigation'
import ingestionPipelinesJson from '@data/content-ingestion-pipelines.json'
import type { IngestionPipelines } from '~/data-layer/queries/content'

const pipelines = ingestionPipelinesJson as IngestionPipelines

export const IngestionPipelinesList = (): JSX.Element => {
    return (
        <ul className="list-none p-0 border-t border-l border-dashed border-primary dark:">
            {pipelines.map((pipeline) => {
                return (
                    <li
                        key={pipeline.id}
                        style={{ margin: 0 }}
                        className="border-r border-b border-dashed border-primary dark: hover:bg-primary hover:bg-accent"
                    >
                        <Link to={pipeline.documentation} className="flex p-2 !bg-none">
                            <div className="shrink-0 grow-0 basis-[84px] flex justify-center pt-1">
                                <img className="icon w-8 h-8" src={pipeline.thumbnailUrl ?? undefined} />
                            </div>

                            <div className="flex-1">
                                <div className="text-black dark:text-white leading-none pt-2">{pipeline.title}</div>
                                <p className="text-black/60 dark:text-white/60 font-normal mt-0.5 !text-[15px] !mb-2">
                                    {pipeline.description}
                                </p>
                            </div>
                        </Link>
                    </li>
                )
            })}
        </ul>
    )
}

export default IngestionPipelinesList
