import React, { useState, useEffect } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import slugify from 'slugify'
import { Link } from 'gatsby'
import {
    StickerPineapple,
    StickerPineappleYes,
    StickerPineappleNo,
    StickerPineappleUnknown,
} from 'components/Stickers/Index'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, A11y } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { IconChevronDown } from '@posthog/icons'
import CloudinaryImage from 'components/CloudinaryImage'

interface FullscreenModalProps {
    image: { image: React.ReactNode; pineapple: boolean }
    onClose: () => void
}

const FullscreenModal: React.FC<FullscreenModalProps> = ({ image, onClose }) => {
    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center z-[9999999]"
            onClick={onClose}
        >
            <div className="max-w-7xl max-h-screen overflow-hidden" onClick={(e) => e.stopPropagation()}>
                {image.image}
            </div>
            <button className="absolute top-4 right-4 text-white text-2xl" onClick={onClose}>
                ×
            </button>
        </div>
    )
}

const pizzaImages = [
    {
        image: (
            <CloudinaryImage
                src="https://res.cloudinary.com/dmukukwp6/image/upload/PXL_20220926_122003344_f2ecbfb133.jpg"
                alt="Pizza 4"
            />
        ),
        pineapple: false,
    },
    {
        image: (
            <CloudinaryImage
                src="https://res.cloudinary.com/dmukukwp6/image/upload/PXL_20221104_004314601_y_f698bf09b8.jpg"
                alt="Pizza 5"
            />
        ),
        pineapple: true,
    },
    {
        image: (
            <CloudinaryImage
                src="https://res.cloudinary.com/dmukukwp6/image/upload/20210902_203941_y_1852a0cbfb.jpg"
                alt="Pizza 6"
            />
        ),
        pineapple: true,
    },
    {
        image: (
            <CloudinaryImage
                src="https://res.cloudinary.com/dmukukwp6/image/upload/DSCF_0417_86971e3157.jpg"
                alt="Pizza 2"
            />
        ),
        pineapple: false,
    },
    {
        image: (
            <CloudinaryImage
                src="https://res.cloudinary.com/dmukukwp6/image/upload/PXL_20211214_165823360_PORTRAIT_6023eb7c12.jpg"
                alt="Pizza 7"
            />
        ),
        pineapple: false,
    },
    {
        image: (
            <CloudinaryImage
                src="https://res.cloudinary.com/dmukukwp6/image/upload/PXL_20231203_022415683_b6cc6a4419.jpg"
                alt="Pizza 8"
            />
        ),
        pineapple: false,
    },
    {
        image: (
            <CloudinaryImage
                src="https://res.cloudinary.com/dmukukwp6/image/upload/PXL_20210902_201120213_MP_y_ea7ebfee9f.jpg"
                alt="Pizza 9"
            />
        ),
        pineapple: true,
    },
    {
        image: (
            <CloudinaryImage
                src="https://res.cloudinary.com/dmukukwp6/image/upload/PXL_20220927_115940380_092cb3d14e.jpg"
                alt="Pizza 10"
            />
        ),
        pineapple: false,
    },
    {
        image: (
            <CloudinaryImage
                src="https://res.cloudinary.com/dmukukwp6/image/upload/PXL_20220927_120456325_PORTRAIT_d47c8b41b1.jpg"
                alt="Pizza 11"
            />
        ),
        pineapple: false,
    },
    {
        image: (
            <CloudinaryImage
                src="https://res.cloudinary.com/dmukukwp6/image/upload/PXL_20220330_232649824_y_e574d0d797.jpg"
                alt="Pizza 12"
            />
        ),
        pineapple: true,
    },
    {
        image: (
            <CloudinaryImage
                src="https://res.cloudinary.com/dmukukwp6/image/upload/PXL_20210929_183537661_PORTRAIT_2c9d82d7bb.jpg"
                alt="Pizza 13"
            />
        ),
        pineapple: false,
    },
    {
        image: (
            <CloudinaryImage
                src="https://res.cloudinary.com/dmukukwp6/image/upload/PXL_20220926_184039530_c12bfb3800.jpg"
                alt="Pizza 14"
            />
        ),
        pineapple: false,
    },
    {
        image: (
            <CloudinaryImage
                src="https://res.cloudinary.com/dmukukwp6/image/upload/DSCF_0194_b7276079a4.jpg"
                alt="Pizza 1"
            />
        ),
        pineapple: false,
    },
    {
        image: (
            <CloudinaryImage
                src="https://res.cloudinary.com/dmukukwp6/image/upload/PXL_20240915_172705072_eaba45a567.jpg"
                alt="Pizza 15"
            />
        ),
        pineapple: false,
    },
    {
        image: (
            <CloudinaryImage
                src="https://res.cloudinary.com/dmukukwp6/image/upload/PXL_20231203_022158957_f8a82551da.jpg"
                alt="Pizza 16"
            />
        ),
        pineapple: false,
    },
    {
        image: (
            <CloudinaryImage
                src="https://res.cloudinary.com/dmukukwp6/image/upload/IMG_2628_y_adb2c7d449.jpg"
                alt="Pizza 3"
            />
        ),
        pineapple: true,
    },
]

const PizzaBox = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="bg-white dark:bg-black border-8 border-white rounded-md shadow-md overflow-hidden mb-2 xl:mb-6">
            {children}
        </div>
    )
}

export const Pizza = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null)

    const [filter, setFilter] = useState('All')
    const [filteredImages, setFilteredImages] = useState(pizzaImages)

    useEffect(() => {
        let filtered = pizzaImages
        if (filter === 'Pineapple') {
            filtered = pizzaImages.filter((img) => img.pineapple)
        } else if (filter === 'No pineapple') {
            filtered = pizzaImages.filter((img) => !img.pineapple)
        }
        setFilteredImages(filtered)
    }, [filter])

    const openFullscreen = (index: number) => {
        setActiveIndex(index)
    }

    const closeFullscreen = () => {
        setActiveIndex(null)
    }

    const { allTeams } = useStaticQuery(graphql`
        {
            allTeams: allSqueakTeam(filter: { name: { ne: "Hedgehogs" }, miniCrest: { publicId: { ne: null } } }) {
                nodes {
                    id
                    name
                    miniCrest {
                        gatsbyImageData(width: 40, height: 40)
                    }
                    profiles {
                        data {
                            attributes {
                                pineappleOnPizza
                            }
                        }
                    }
                }
            }
        }
    `)

    const teamsWithPineapplePercentage = allTeams.nodes.map((team) => {
        const teamLength = team.profiles?.data?.length || 0
        const pineappleLovers = team.profiles?.data?.filter(({ attributes }) => attributes.pineappleOnPizza).length || 0
        const percentage = teamLength > 0 ? (pineappleLovers / teamLength) * 100 : 0

        return {
            name: team.name,
            pineapplePercentage: percentage.toFixed(1),
        }
    })

    const groupedTeams = {
        moreThan50: [],
        exactly50: [],
        lessThan50: [],
    }

    teamsWithPineapplePercentage.forEach((team) => {
        const percentage = parseFloat(team.pineapplePercentage)
        if (percentage > 50) {
            groupedTeams.moreThan50.push(team)
        } else if (percentage === 50) {
            groupedTeams.exactly50.push(team)
        } else {
            groupedTeams.lessThan50.push(team)
        }
    })

    // Sort teams within each group by percentage (highest to lowest)
    Object.keys(groupedTeams).forEach((key) => {
        groupedTeams[key].sort((a, b) => parseFloat(b.pineapplePercentage) - parseFloat(a.pineapplePercentage))
    })

    return (
        <div className="px-4 max-w-7xl mx-auto py-12">
            <div className="text-center">
                <div className="text-lg opacity-70 mb-2">Speaking of small teams...</div>
                <h2 className="text-4xl font-bold mb-2 flex items-center gap-2 justify-center flex-col md:flex-row leading-none">
                    <StickerPineapple className="inline-block size-10" />
                    Pineapple on pizza:{' '}
                    <span className="whitespace-nowrap">
                        a house <em className="text-red dark:text-yellow">divided</em>
                    </span>
                </h2>
                <div className="max-w-2xl mx-auto">
                    <p>
                        Our small teams meet up in various places around the world. Pizza is often involved. Pineapple
                        on the pizza is <span className="opacity-60 line-through">optional</span> contentious.
                    </p>
                    <p className="mb-2">
                        <strong>Here's how our teams feel.</strong> (Choose your team wisely.)
                    </p>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-10 md:gap-6 lg:gap-12 pt-6 pb-12">
                <div>
                    <div className="mb-4 border-b border-light dark:border-dark pb-2 flex gap-2 items-center md:items-start">
                        <StickerPineappleYes className="inline-block size-12" />
                        <div className="flex-1 items-baseline gap-1 md:block">
                            <p className="m-0 text-[15px] md:text-sm mdlg:text-[15px] font-bold md:font-normal">
                                Small teams who<span className="hidden md:inline-block">...</span>
                            </p>
                            <h3 className="text-[19px] leading-tight m-0 font-bold">
                                <span className="text-green">CORRECTLY agree</span>
                            </h3>
                            <p className="text-[15px] md:text-sm mdlg:text-[15px] mb-0 font-bold md:font-normal">
                                pineapple belongs on pizza
                            </p>
                        </div>
                    </div>

                    <ul className="list-none p-0 space-y-3">
                        {groupedTeams.moreThan50.map((team) => {
                            const teamData = allTeams.nodes.find((node) => node.name === team.name)
                            const teamMiniCrest = getImage(teamData.miniCrest)
                            return (
                                <li key={team.name} className="">
                                    <div className="flex gap-2">
                                        {teamMiniCrest && (
                                            <GatsbyImage
                                                image={teamMiniCrest}
                                                alt={`${team.name} mini crest`}
                                                className="mr-2"
                                            />
                                        )}
                                        <div className="flex-1">
                                            <Link
                                                to={`/teams/${slugify(team.name.toLowerCase().replace('ops', ''), {
                                                    lower: true,
                                                    remove: /and/,
                                                })}`}
                                                className="text-[15px] font-semibold text-primary dark:text-primary-dark hover:text-red dark:hover:text-yellow"
                                            >
                                                {team.name}
                                            </Link>
                                            <div className="flex gap-2 items-center -mt-1">
                                                <div className="flex-1 relative h-2 w-full bg-accent dark:bg-white/10 rounded-full">
                                                    <div
                                                        className="absolute left-0 top-0 h-full bg-green rounded-full"
                                                        style={{ width: `${team.pineapplePercentage}%` }}
                                                    ></div>
                                                </div>
                                                <span className="text-sm font-medium">
                                                    {Math.round(team.pineapplePercentage)}%
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>

                <div>
                    <div className="mb-4 border-b border-light dark:border-dark pb-2 flex gap-2 items-center md:items-start">
                        <StickerPineappleUnknown className="inline-block size-12" />
                        <div className="flex-1 items-baseline gap-1 md:block">
                            <p className="m-0 text-[15px] md:text-sm mdlg:text-[15px] font-bold md:font-normal">
                                Small teams who<span className="hidden md:inline-block">...</span>
                            </p>
                            <div className="flex items-baseline gap-1">
                                <h3 className="text-[19px] leading-tight m-0 font-bold">
                                    <span className="text-yellow">are SPLIT</span>
                                </h3>
                                on whether
                            </div>
                            <p className="text-[15px] md:text-sm mdlg:text-[15px] mb-0 font-bold md:font-normal">
                                pineapple belongs on pizza
                            </p>
                        </div>
                    </div>

                    <ul className="list-none p-0 space-y-3">
                        {groupedTeams.exactly50.map((team) => {
                            const teamData = allTeams.nodes.find((node) => node.name === team.name)
                            const teamMiniCrest = getImage(teamData.miniCrest)
                            return (
                                <li key={team.name} className="">
                                    <div className="flex gap-2">
                                        {teamMiniCrest && (
                                            <GatsbyImage
                                                image={teamMiniCrest}
                                                alt={`${team.name} mini crest`}
                                                className="mr-2"
                                            />
                                        )}
                                        <div className="flex-1">
                                            <Link
                                                to={`/teams/${slugify(team.name.toLowerCase().replace('ops', ''), {
                                                    lower: true,
                                                    remove: /and/,
                                                })}`}
                                                className="text-[15px] font-semibold text-primary dark:text-primary-dark hover:text-red dark:hover:text-yellow"
                                            >
                                                {team.name}
                                            </Link>
                                            <div className="flex gap-2 items-center -mt-1">
                                                <div className="flex-1 relative h-2 w-full bg-accent dark:bg-white/10 rounded-full">
                                                    <div
                                                        className="absolute left-0 top-0 h-full bg-yellow rounded-full"
                                                        style={{ width: `${team.pineapplePercentage}%` }}
                                                    ></div>
                                                </div>
                                                <span className="text-sm font-medium">
                                                    {Math.round(team.pineapplePercentage)}%
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                    <p className="text-sm mt-2 italic pl-14 font-medium">(You could break the tie!)</p>
                </div>

                <div>
                    <div className="mb-4 border-b border-light dark:border-dark pb-2 flex gap-2 items-center md:items-start">
                        <StickerPineappleNo className="inline-block size-12" />
                        <div className="flex-1 items-baseline gap-1 md:block">
                            <p className="m-0 text-[15px] md:text-sm mdlg:text-[15px] font-bold md:font-normal">
                                Small teams who<span className="hidden md:inline-block">...</span>
                            </p>
                            <h3 className="text-[19px] leading-tight m-0 font-bold">
                                <span className="text-red">shockingly DISAGREE</span>
                            </h3>
                            <p className="text-[15px] md:text-sm mdlg:text-[15px] mb-0 font-bold md:font-normal">
                                pineapple belongs on pizza
                            </p>
                        </div>
                    </div>

                    <ul className="list-none p-0 space-y-3">
                        {groupedTeams.lessThan50.map((team) => {
                            const teamData = allTeams.nodes.find((node) => node.name === team.name)
                            const teamMiniCrest = getImage(teamData.miniCrest)
                            return (
                                <li key={team.name} className="">
                                    <div className="flex gap-2">
                                        {teamMiniCrest && (
                                            <GatsbyImage
                                                image={teamMiniCrest}
                                                alt={`${team.name} mini crest`}
                                                className="mr-2"
                                            />
                                        )}
                                        <div className="flex-1">
                                            <Link
                                                to={`/teams/${slugify(team.name.toLowerCase().replace('ops', ''), {
                                                    lower: true,
                                                    remove: /and/,
                                                })}`}
                                                className="text-[15px] font-semibold text-primary dark:text-primary-dark hover:text-red dark:hover:text-yellow"
                                            >
                                                {team.name}
                                            </Link>
                                            <div className="flex gap-2 items-center -mt-1">
                                                <div className="flex-1 relative h-2 w-full bg-accent dark:bg-white/10 rounded-full">
                                                    <div
                                                        className="absolute left-0 top-0 h-full bg-red rounded-full"
                                                        style={{ width: `${team.pineapplePercentage}%` }}
                                                    ></div>
                                                </div>
                                                <span className="text-sm font-medium">
                                                    {Math.round(team.pineapplePercentage)}%
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>

            <h3 className="text-3xl mb-0 text-center">Speaking of pizza...</h3>
            <div className="text-lg opacity-70 mb-6 text-center">Here are some of our creations.</div>

            <div className="flex justify-center space-x-4 mb-6">
                {['All', 'Pineapple', 'No pineapple'].map((option) => (
                    <button
                        key={option}
                        onClick={() => setFilter(option)}
                        className={`px-1 pt-1 pb-0.5 border-b-2 text-[15px] font-medium ${
                            filter === option
                                ? 'border-red dark:border-yellow font-bold'
                                : 'border-transparent hover:border-light dark:hover:border-dark text-primary/60 hover:text-primary/100 dark:text-primary-dark/60 dark:hover:text-primary-dark/100'
                        }`}
                    >
                        {option}
                    </button>
                ))}
            </div>

            <Swiper
                key={filter}
                modules={[Navigation, Pagination, A11y]}
                autoHeight={true}
                spaceBetween={20}
                slidesPerView={1}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }}
                speed={500}
                pagination={{ clickable: true }}
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                        slidesPerGroup: 2,
                    },
                    1024: {
                        slidesPerView: 3,
                        slidesPerGroup: 3,
                    },
                }}
                className="pizza-swiper relative"
            >
                {filteredImages.map((image, index) => (
                    <SwiperSlide key={index}>
                        <div
                            className="cursor-pointer transition-all duration-300 hover:scale-105"
                            onClick={() => openFullscreen(index)}
                        >
                            <PizzaBox>
                                <div className="animate-fade-in">{image.image}</div>
                            </PizzaBox>
                        </div>
                    </SwiperSlide>
                ))}
                <button className="swiper-button-prev absolute left-0 top-1/2 -translate-y-1/2 -mt-8 hover:scale-[1.01] hover:top-[calc(50%-1px)] active:top-[calc(50%+0.5px)] active:scale-[.99] md:z-30 p-2 xl:p-6 box-border peer z-10">
                    <IconChevronDown className="w-12 h-12 rounded-sm text-white hover:text-white/100 dark:text-primary-dark dark:hover:text-primary-dark/100 rotate-90 bg-black/75 hover:bg-black/90 dark:hover:bg-accent-dark/25 hover:backdrop-blur-sm active:backdrop-blur-sm border border-r-3 border-black dark:border-dark peer-disabled:bg-transparent peer-disabled:border-transparent" />
                </button>
                <button className="swiper-button-next absolute right-0 top-1/2 -translate-y-1/2 -mt-8 hover:scale-[1.01] hover:top-[calc(50%-1px)] active:top-[calc(50%+0.5px)] active:scale-[.99] md:z-30 p-2 xl:p-6 box-border peer z-10">
                    <IconChevronDown className="w-12 h-12 rounded-sm text-white hover:text-white/100 dark:text-primary-dark dark:hover:text-primary-dark/100 -rotate-90 bg-black/75 hover:bg-black/90 dark:hover:bg-accent-dark/25 hover:backdrop-blur-sm active:backdrop-blur-sm border border-l-3 border-black dark:border-dark peer-disabled:bg-transparent peer-disabled:border-transparent" />
                </button>
            </Swiper>

            {activeIndex !== null && <FullscreenModal image={filteredImages[activeIndex]} onClose={closeFullscreen} />}
        </div>
    )
}
