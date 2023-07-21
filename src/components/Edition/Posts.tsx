import React, { useEffect, useRef, useState } from 'react'
import useSWRInfinite from 'swr/infinite'
import qs from 'qs'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Link from 'components/Link'
import { Check, Heart } from 'components/Icons'
import { Menu } from '@headlessui/react'
import { ChevronDown } from '@posthog/icons'
import { useInView } from 'react-intersection-observer'
import { Skeleton } from 'components/Questions/QuestionsTable'
dayjs.extend(relativeTime)

const query = (params, offset) => {
    return qs.stringify(
        {
            populate: '*',
            sort: 'date:desc',
            pagination: {
                start: offset * 20,
                limit: 20,
            },
            ...params,
        },
        {
            encodeValuesOnly: true,
        }
    )
}

const Post = ({ title, featuredImage, date, publishedAt, post_category, authors, fetchMore, isLoading }) => {
    const [liked, setLiked] = useState(false)
    const [likeCount, setLikeCount] = useState(0)
    const category = post_category?.data?.attributes?.label

    const { ref, inView } = useInView({
        threshold: 0,
        triggerOnce: true,
    })

    useEffect(() => {
        if (inView) {
            fetchMore()
        }
    }, [inView])

    const handleLike = () => {
        setLiked(!liked)
        setLikeCount(likeCount + (!liked ? 1 : -1))
    }

    return (
        <li ref={fetchMore ? ref : null} className="flex space-x-6 items-center">
            <button className={liked ? 'text-red' : 'text-inherit'} onClick={handleLike}>
                <Heart active={liked} />
            </button>
            <div className="w-[150px] h-[85px] bg-accent dark:bg-accent-dark rounded-sm overflow-hidden">
                <img className="object-cover w-full h-full" src={featuredImage?.url} />
            </div>
            <div>
                <span className="flex items-baseline space-x-1">
                    <p className="m-0 text-lg font-bold">{title}</p>
                    {category && <p className="m-0 text-sm font-medium opacity-60">{category}</p>}
                </span>
                <ul className="m-0 p-0 list-none flex space-x-2 items-center mt-1">
                    <li className="text-sm font-medium leading-none flex space-x-1 items-center">
                        <button className={liked ? 'text-red' : 'text-inherit'} onClick={handleLike}>
                            <Heart active={likeCount > 0} className="w-4 h-4" />
                        </button>

                        <span className="opacity-60">{likeCount}</span>
                    </li>
                    {authors?.data?.length > 0 && (
                        <li className="text-sm font-medium leading-none pl-2 border-l border-light dark:border-dark">
                            {authors?.data.map(({ id, attributes: { firstName, lastName } }) => {
                                const name = [firstName, lastName].filter(Boolean).join(' ')
                                return (
                                    <Link key={id} to={`/community/profiles/${id}`}>
                                        {name}
                                    </Link>
                                )
                            })}
                        </li>
                    )}
                    <li className="text-sm font-medium pl-2 leading-none border-l border-light dark:border-dark">
                        <span className="opacity-60">{dayjs(date || publishedAt).fromNow()}</span>
                    </li>
                </ul>
            </div>
        </li>
    )
}

const Categories = ({ setSelectedCategories, selectedCategories }) => {
    const containerEl = useRef(null)
    const [categories, setCategories] = useState([])
    const [open, setOpen] = useState(false)

    useEffect(() => {
        fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/post-categories`)
            .then((res) => res.json())
            .then((data) => setCategories(data?.data))
    }, [])

    const handleClick = (newCategory) => {
        const newCategories = selectedCategories.some((selectedCategory) => selectedCategory.id === newCategory.id)
            ? selectedCategories.filter((selectedCategory) => selectedCategory.id !== newCategory.id)
            : [...selectedCategories, newCategory]
        return setSelectedCategories(newCategories)
    }

    useEffect(() => {
        function handleClick(e) {
            if (containerEl?.current && !containerEl?.current.contains(e.target)) {
                setOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClick)
        return () => {
            document.removeEventListener('mousedown', handleClick)
        }
    }, [containerEl])

    return categories?.length > 0 ? (
        <div ref={containerEl} className="relative">
            <Menu>
                <Menu.Button
                    onClick={() => setOpen(!open)}
                    className={`text-left text-sm flex space-x-2 justify-between items-end relative px-4 py-1 rounded border border-b-3 hover:border-light dark:hover:border-dark bg-accent dark:bg-accent-dark border-light dark:border-dark hover:top-[0px] hover:scale-[1]`}
                >
                    <span>Filters</span>
                    <ChevronDown className="w-5 mb-[-1px]" />
                </Menu.Button>
                {open && (
                    <Menu.Items
                        static
                        className="absolute grid gap-y-2 right-0 bg-accent dark:bg-accent-dark p-2 border border-border dark:border-dark rounded mt-1"
                    >
                        {categories.map((category) => {
                            const active = selectedCategories.some(
                                (selectedCategory) => selectedCategory.id === category.id
                            )
                            return (
                                <Menu.Item key={category.id}>
                                    <button
                                        onClick={() => handleClick(category)}
                                        className="text-left whitespace-nowrap flex items-center space-x-2"
                                    >
                                        <span
                                            className={`w-4 h-4 rounded-sm border text-white ${
                                                active ? 'bg-red border-red' : 'border-border dark:border-dark'
                                            }`}
                                        >
                                            {active && <Check />}
                                        </span>
                                        <span className="text-sm">{category?.attributes?.label}</span>
                                    </button>
                                </Menu.Item>
                            )
                        })}
                    </Menu.Items>
                )}
            </Menu>
        </div>
    ) : null
}

export default function Posts() {
    const [params, setParams] = useState({})
    const [selectedCategories, setSelectedCategories] = useState([])
    const { data, size, setSize, isLoading, error, mutate, isValidating } = useSWRInfinite(
        (offset) => `${process.env.GATSBY_SQUEAK_API_HOST}/api/posts?${query(params, offset)}`,
        (url: string) => fetch(url).then((r) => r.json())
    )
    const posts = React.useMemo(() => {
        return data?.reduce((acc, cur) => [...acc, ...cur.data], []) ?? []
    }, [size, data])

    useEffect(() => {
        if (!selectedCategories) {
            return setParams({})
        }
        const categoryIDs = selectedCategories.map((category) => category.id)
        setParams({
            filters: {
                post_category: {
                    id: {
                        $in: categoryIDs,
                    },
                },
            },
        })
    }, [selectedCategories])

    const fetchMore = () => setSize(size + 1)

    return (
        <div className="my-8">
            <div className="my-4 flex justify-between">
                <h5 className="m-0">Posts</h5>
                <Categories setSelectedCategories={setSelectedCategories} selectedCategories={selectedCategories} />
            </div>
            <ul className="list-none p-0 m-0 grid gap-y-4">
                {posts.map(({ id, attributes }, index) => {
                    return <Post key={id} {...attributes} fetchMore={posts.length === index + 1 && fetchMore} />
                })}
                {(isLoading || isValidating) && (
                    <li>
                        <Skeleton />
                    </li>
                )}
            </ul>
        </div>
    )
}
