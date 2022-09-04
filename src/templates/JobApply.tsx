import { button, CallToAction } from 'components/CallToAction'
import Layout from 'components/Layout'
import PostLayout, { ShareLinks, SidebarSection } from 'components/PostLayout'
import { SEO } from 'components/seo'
import { graphql } from 'gatsby'
import React, { useRef, useState } from 'react'

const JobSidebar = () => {
    return (
        <>
            <SidebarSection>
                <ShareLinks />
            </SidebarSection>
        </>
    )
}

const components = {
    string: ({ title, required, path }) => (
        <input
            data-path={path}
            required={required}
            className="w-full block bg-white p-1.5 rounded-sm shadow-sm border border-black/20 text-base dark:bg-white/10 dark:text-white"
            placeholder={title}
            name={title}
        />
    ),
    email: ({ title, required, path }) => (
        <input
            data-path={path}
            required={required}
            className="w-full block bg-white p-1.5 rounded-sm shadow-sm border border-black/20 text-base dark:bg-white/10 dark:text-white"
            type="email"
            placeholder={title}
            name={title}
        />
    ),
    longtext: ({ title, required, path }) => (
        <textarea
            rows={5}
            data-path={path}
            required={required}
            className="w-full block bg-white p-1.5 rounded-sm shadow-sm border border-black/20 text-base dark:bg-white/10 dark:text-white"
            placeholder={title}
            name={title}
        />
    ),
    file: ({ title, required, path }) => {
        const [fileName, setFileName] = useState()
        const inputRef = useRef(null)

        const handleDrop = (e) => {
            setFileName(e.target.files.item(0).name)
        }

        return (
            <div className="relative h-52 border border-gray-accent-light dark:border-gray-accent-dark border-dashed rounded-md flex justify-center items-center text-black/50 dark:text-white/50">
                <input
                    ref={inputRef}
                    onChange={handleDrop}
                    data-path={path}
                    required={required}
                    className="opacity-0 absolute w-full h-full inset-0 cursor-pointer"
                    placeholder={title}
                    name={title}
                    type="file"
                    accept="application/pdf"
                />
                <div className="absolute">
                    {fileName ? (
                        <p className="m-0">{fileName}</p>
                    ) : (
                        <p className="flex space-x-1 items-center m-0">
                            <button
                                onClick={() => inputRef?.current.click()}
                                type="button"
                                className={button('secondary', undefined, 'cursor-pointer', 'sm')}
                            >
                                Upload file
                            </button>
                            <span>or drag and drop here</span>
                        </p>
                    )}
                </div>
            </div>
        )
    },
}

export default function JobApply({
    data: {
        ashbyJob: { title, id, departmentName, info },
    },
}) {
    const [submitted, setSubmitted] = useState(false)
    const handleSubmit = (e) => {
        e.preventDefault()
        const data = new FormData(e.target)
        const form = new FormData()
        for (const [name, value] of data) {
            const el = e.target.querySelector(`[name="${name}"]`)
            const path = el.dataset.path
            if (el.type === 'file') {
                form.append(name, value)
                form.append(path, name)
            } else {
                form.append(path, value)
            }
        }
        form.append('jobPostingId', id)
        fetch('/.netlify/functions/apply', {
            method: 'POST',
            body: form,
        })
            .then((res) => res.json())
            .then((submission) => setSubmitted(true))
    }
    return (
        <Layout>
            <SEO title={`${title} - PostHog`} />
            <PostLayout hideSurvey sidebar={<JobSidebar />} title="careers">
                <div className="mb-8 overflow-hidden relative">
                    <div>
                        <h1 className="m-0 text-5xl">{title}</h1>
                        <h2 className="m-0 text-2xl text-black/50 dark:text-white/50 font-normal">{departmentName}</h2>
                        {submitted ? (
                            <p className="mt-12">Thanks for your submission!</p>
                        ) : (
                            <form className="mt-12" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 gap-y-3 ">
                                    {info?.applicationFormDefinition?.sections?.map(({ fields }) => {
                                        return fields.map(({ field }) => {
                                            return (
                                                <div key={field?.path}>
                                                    <label
                                                        className="opacity-70 mb-1 inline-block"
                                                        htmlFor={field?.title}
                                                    >
                                                        {field?.title}
                                                    </label>
                                                    {components[field?.type?.toLowerCase()] &&
                                                        components[field?.type?.toLowerCase()]({
                                                            title: field?.title,
                                                            required: !field?.isNullable,
                                                            path: field?.path,
                                                        })}
                                                </div>
                                            )
                                        })
                                    })}
                                </div>
                                <button className={`${button()} mt-6`}>Submit application</button>
                            </form>
                        )}
                    </div>
                </div>
            </PostLayout>
        </Layout>
    )
}

export const query = graphql`
    query JobApplyQuery($id: String!) {
        ashbyJob(id: { eq: $id }) {
            id
            title
            departmentName
            info {
                descriptionHtml
                applicationFormDefinition {
                    sections {
                        fields {
                            field {
                                type
                                title
                                isNullable
                                path
                            }
                        }
                    }
                }
            }
        }
    }
`
