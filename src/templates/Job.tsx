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

const allowedFileTypes = ['application/pdf']

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
                    accept={allowedFileTypes.join(',')}
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

function Apply({ id, info }) {
    const [submitted, setSubmitted] = useState(false)
    const [error, setError] = useState(null)
    const handleSubmit = (e) => {
        e.preventDefault()
        const data = new FormData(e.target)
        const form = new FormData()
        let error = null
        for (const [name, value] of data) {
            const el = e.target.querySelector(`[name="${name}"]`)
            const path = el.dataset.path
            if (el.type === 'file') {
                if (!allowedFileTypes.includes(value.type)) {
                    error = `Allowed file types: ${allowedFileTypes.join(', ')}`
                    break
                }
                form.append(name, value)
                form.append(path, name)
            } else {
                form.append(path, value)
            }
        }
        setError(error)
        if (error) return
        form.append('jobPostingId', id)
        fetch('/.netlify/functions/apply', {
            method: 'POST',
            body: form,
        })
            .then((res) => res.json())
            .then((submission) => setSubmitted(true))
    }
    return submitted ? (
        <p>Thanks for your submission!</p>
    ) : (
        <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-y-3 ">
                {info?.applicationFormDefinition?.sections?.map(({ fields }) => {
                    return fields.map(({ field }) => {
                        return (
                            <div key={field?.path}>
                                <label className="opacity-70 mb-1 inline-block" htmlFor={field?.title}>
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
            {error && <p className="font-bold text-red m-0 mt-4">{error}</p>}
            <button className={`${button()} mt-6 shadow-none`}>Submit</button>
        </form>
    )
}

export default function Job({
    data: {
        ashbyJobPosting: { title, departmentName, info, id },
    },
    pageContext: { slug },
}) {
    const [activeTab, setActiveTab] = useState('overview')
    return (
        <Layout>
            <SEO title={`${title} - PostHog`} />
            <div className="border-t border-dashed border-gray-accent-light dark:border-gray-accent-dark">
                <PostLayout hideSearch hideSurvey sidebar={<JobSidebar />} title="careers">
                    <div className="mb-8 relative">
                        <div>
                            <h1 className="m-0 text-5xl">{title}</h1>
                            <h2 className="m-0 text-2xl text-black/50 dark:text-white/50 font-normal">
                                {departmentName}
                            </h2>
                            <div className="grid grid-cols-2 w-full mt-6 sticky top-0 z-10 bg-tan dark:bg-primary">
                                <button
                                    onClick={() => setActiveTab('overview')}
                                    className={`py-4 font-semibold opacity-70 hover:opacity-100 transition-all ${
                                        activeTab === 'overview' ? 'text-red opacity-100' : ''
                                    }`}
                                >
                                    Overview
                                </button>
                                <button
                                    onClick={() => setActiveTab('apply')}
                                    className={`py-4 font-semibold opacity-70 hover:opacity-100 transition-all ${
                                        activeTab === 'apply' ? 'text-red opacity-100' : ''
                                    }`}
                                >
                                    Apply
                                </button>
                                <div
                                    style={{ transform: `translateX(${activeTab === 'overview' ? 0 : '100%'})` }}
                                    className="absolute bottom-0 w-1/2 h-[2px] bg-red transition-all"
                                />
                            </div>
                            <div className="flex overflow-hidden">
                                <div
                                    style={{
                                        transform: `translateX(${activeTab === 'apply' ? '-100%' : 0})`,
                                        maxHeight: activeTab === 'overview' ? 10000 : 0,
                                    }}
                                    className="job-content mt-12 w-full flex-shrink-0 transition-all"
                                    dangerouslySetInnerHTML={{ __html: info?.descriptionHtml }}
                                />
                                <div
                                    style={{
                                        transform: `translateX(${activeTab === 'apply' ? '-100%' : 0})`,
                                        maxHeight: activeTab === 'apply' ? 10000 : 0,
                                    }}
                                    className="w-full mt-12 flex-shrink-0 transition-all"
                                >
                                    <Apply id={id} info={info} />
                                </div>
                            </div>
                        </div>
                    </div>
                </PostLayout>
            </div>
        </Layout>
    )
}

export const query = graphql`
    query JobQuery($id: String!) {
        ashbyJobPosting(id: { eq: $id }) {
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
