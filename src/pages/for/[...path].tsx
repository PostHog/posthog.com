import React, { useEffect, useState, useMemo } from 'react'
import { navigate } from 'gatsby'
import Presentation from 'components/Presentation'
import ScalableSlide from 'components/Presentation/ScalableSlide'
import ResponsiveSlideContent from 'components/Presentation/ResponsiveSlideContent'
import SlideThumbnails from 'components/Products/Slides/SlideThumbnails'
import StackedTemplate from 'components/Presentation/Templates/StackedTemplate'
import ColumnsTemplate from 'components/Presentation/Templates/ColumnsTemplate'
import ProductTemplate from 'components/Presentation/Templates/ProductTemplate'
import { DemoScheduler } from 'components/DemoScheduler'
import SEO from 'components/seo'

// Import configuration files
import defaultConfig from '../../presentations/default.json'
import productEngineersConfig from '../../presentations/product-engineers.json'
import engineeringManagersConfig from '../../presentations/engineering-managers.json'
import productManagersConfig from '../../presentations/product-managers.json'
import productDirectorsConfig from '../../presentations/product-directors.json'
import { useWindow } from '../../context/Window'

const roleConfigs = {
    'product-engineers': productEngineersConfig,
    'engineering-managers': engineeringManagersConfig,
    'product-managers': productManagersConfig,
    'product-directors': productDirectorsConfig,
}

interface SalesRep {
    name: string
    title: string
    email: string
    photo: string
    color: string
}

interface CompanyData {
    name?: string
    domain?: string
    logo?: string
}

interface SlideConfig {
    template: string
    name?: string
    title?: string
    description?: string
    handle?: string
    screenshot?: string
    image?: string
    imageDark?: string
    imageAlt?: string
    children?: React.ReactNode
    bgColor?: string
    textColor?: string
}

interface PresentationConfig {
    name: string
    slides: Record<string, SlideConfig>
}

const CustomPresentationPage = () => {
    const { appWindow } = useWindow()
    const [companyData, setCompanyData] = useState<CompanyData>({})
    const [isLoading, setIsLoading] = useState(true)
    const [calendlyLoaded, setCalendlyLoaded] = useState(false)
    const [salesRep, setSalesRep] = useState<SalesRep | null>(null)

    // Parse the URL path
    const pathSegments = appWindow?.path ? appWindow?.path.split('/') : []
    const companyDomain = pathSegments[2] || ''
    const roleOrId = pathSegments[3] || ''

    // Redirect to homepage if no company is specified
    useEffect(() => {
        if (!companyDomain) {
            navigate('/')
        }
    }, [companyDomain])

    // Load custom configuration if available
    const [customConfig, setCustomConfig] = useState<any>(null)

    useEffect(() => {
        const loadCustomConfig = async () => {
            if (roleOrId && !roleConfigs[roleOrId as keyof typeof roleConfigs]) {
                try {
                    // Try to load custom configuration for this company
                    const module = await import(`../../presentations/dream-customers/${companyDomain}.json`)
                    if (module.default && module.default[roleOrId]) {
                        setCustomConfig(module.default[roleOrId])
                    }
                } catch (error) {
                    // No custom config found, will use default
                    console.log('No custom config found for', companyDomain, roleOrId)
                }
            }
        }

        if (companyDomain && roleOrId) {
            loadCustomConfig()
        }
    }, [companyDomain, roleOrId])

    // Determine which configuration to use
    const config: PresentationConfig = useMemo(() => {
        // Check for custom configuration first
        if (customConfig) {
            // Process custom config with inheritance
            const processedConfig: PresentationConfig = {
                name: customConfig.name || 'Custom Presentation',
                slides: {},
            }

            Object.entries(customConfig.slides || {}).forEach(([slideKey, slideConfig]: [string, any]) => {
                if (slideConfig.inherit) {
                    // Inherit from another role's configuration
                    const sourceConfig = roleConfigs[slideConfig.inherit as keyof typeof roleConfigs] || defaultConfig
                    const sourceSlide = sourceConfig.slides[slideConfig.slideKey || slideKey]
                    if (sourceSlide) {
                        processedConfig.slides[slideKey] = {
                            ...sourceSlide,
                            ...slideConfig,
                            inherit: undefined,
                            slideKey: undefined,
                        }
                    }
                } else {
                    // Use slide config as-is
                    processedConfig.slides[slideKey] = slideConfig
                }
            })

            return processedConfig
        }

        // Check for standard role configuration
        if (roleOrId && roleConfigs[roleOrId as keyof typeof roleConfigs]) {
            return roleConfigs[roleOrId as keyof typeof roleConfigs]
        }

        // Default configuration
        return defaultConfig
    }, [roleOrId, customConfig])

    // Fetch company data from Clearbit
    useEffect(() => {
        if (!companyDomain) return

        const fetchCompanyData = async () => {
            try {
                const response = await fetch(`/api/customer?domain=${companyDomain}`)
                if (response.ok) {
                    const data = await response.json()
                    setCompanyData({
                        name: data?.companyInfo?.name || companyDomain,
                        domain: data?.companyInfo?.domain || companyDomain,
                        logo: data?.companyInfo?.logo || null,
                    })
                    setSalesRep({
                        email: data?.accountManager?.email,
                        name: [data?.accountManager?.firstName, data?.accountManager?.lastName]
                            .filter(Boolean)
                            .join(' '),
                        title: data?.accountManager?.companyRole,
                        photo: data?.accountManager?.avatar?.url,
                        color: data?.accountManager?.color,
                    })
                } else {
                    // Fallback if Clearbit fails
                    setCompanyData({
                        name: companyDomain.replace('.com', '').replace('.io', ''),
                        domain: companyDomain,
                        logo: null,
                    })
                }
            } catch (error) {
                console.error('Error fetching company data:', error)
                setCompanyData({
                    name: companyDomain.replace('.com', '').replace('.io', ''),
                    domain: companyDomain,
                    logo: null,
                })
            } finally {
                setIsLoading(false)
            }
        }

        fetchCompanyData()
    }, [companyDomain])

    // Load Calendly widget dynamically for CTA slide
    useEffect(() => {
        if (!calendlyLoaded && config.slides.cta) {
            const script = document.createElement('script')
            script.src = 'https://assets.calendly.com/assets/external/widget.js'
            script.async = true
            script.onload = () => setCalendlyLoaded(true)
            document.body.appendChild(script)

            return () => {
                document.body.removeChild(script)
            }
        }
    }, [config, calendlyLoaded])

    // Create slide content based on template
    const createSlideContent = (slideKey: string, slideConfig: SlideConfig) => {
        const props = {
            ...slideConfig,
            companyName: companyData.name,
            companyLogo: companyData.logo,
        }

        switch (slideConfig.template) {
            case 'stacked':
                return (
                    <StackedTemplate
                        title={props.title || ''}
                        description={props.description}
                        image={props.image}
                        imageDark={props.imageDark}
                        imageAlt={props.imageAlt}
                        bgColor={props.bgColor}
                        textColor={props.textColor}
                        companyLogo={props.companyLogo}
                        companyName={props.companyName}
                        salesRep={salesRep}
                        slideKey={slideKey}
                    >
                        {slideKey === 'cta' && calendlyLoaded && (
                            <div className="w-full max-w-4xl mx-auto">
                                <DemoScheduler
                                    iframeSrc="https://calendly.com/chris-m-posthog"
                                    className="h-72 w-full"
                                />
                            </div>
                        )}
                        {props.children}
                    </StackedTemplate>
                )

            case 'columns':
                return (
                    <ColumnsTemplate
                        title={props.title || ''}
                        description={props.description}
                        image={props.image}
                        imageDark={props.imageDark}
                        imageAlt={props.imageAlt}
                        bgColor={props.bgColor}
                        textColor={props.textColor}
                    >
                        {props.children}
                    </ColumnsTemplate>
                )

            case 'product':
                return (
                    <ProductTemplate
                        handle={props.handle || ''}
                        screenshot={props.screenshot}
                        title={props.title || ''}
                        description={props.description}
                        bgColor={props.bgColor}
                        textColor={props.textColor}
                    />
                )

            default:
                return <div>Unknown template: {slideConfig.template}</div>
        }
    }

    // Process slides from configuration
    const slides = useMemo(() => {
        if (!config || !config.slides) return []

        return Object.entries(config.slides).map(([slideKey, slideConfig]) => {
            const rawContent = createSlideContent(slideKey, slideConfig)

            return {
                name: slideConfig.name || slideKey,
                slug: slideKey,
                content: (
                    <ScalableSlide mode="editor" baseWidth={1280} baseHeight={720}>
                        {rawContent}
                    </ScalableSlide>
                ),
                mobileContent: (
                    <ScalableSlide mode="editor" baseWidth={720} baseHeight={1280}>
                        {rawContent}
                    </ScalableSlide>
                ),
                rawContent,
                thumbnailContent: rawContent,
            }
        })
    }, [config, companyData, calendlyLoaded])

    if (isLoading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <div className="text-2xl">Loading presentation...</div>
            </div>
        )
    }

    const presentationId = `custom-${companyDomain}-${roleOrId || 'default'}`
    const seoTitle = `${config.name} - ${companyData.name || companyDomain} | PostHog`

    return (
        <>
            <SEO
                title={seoTitle}
                description={`Custom PostHog presentation for ${companyData.name || companyDomain}`}
                image="/images/og/posthog-og.png"
            />
            <Presentation
                template="generic"
                slug={presentationId}
                title=""
                slideId={presentationId}
                sidebarContent={(activeSlideIndex: number, onClick: any) => (
                    <SlideThumbnails
                        slides={slides}
                        activeSlideIndex={activeSlideIndex}
                        slideId={presentationId}
                        onClick={onClick}
                    />
                )}
                slides={slides}
                presenterNotes={{}}
            >
                <div
                    data-scheme="primary"
                    className="bg-accent grid grid-cols-1 gap-2 [&>div:first-child_>span]:hidden p-2 @md:p-4"
                >
                    {slides.map((slide, index) => (
                        <div
                            key={slide.slug}
                            className="@container flex flex-col justify-center bg-accent"
                            data-slide={index}
                            data-slide-id={presentationId}
                        >
                            <span
                                data-scheme="secondary"
                                className="slideName inline-flex mx-auto bg-accent rounded-sm px-4 py-0.5 text-sm font-semibold text-primary my-2"
                            >
                                {slide.name}
                            </span>
                            <ResponsiveSlideContent
                                mobileContent={slide.mobileContent}
                                desktopContent={slide.content}
                            />
                        </div>
                    ))}
                </div>
            </Presentation>
        </>
    )
}

export default CustomPresentationPage
