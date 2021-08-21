const fs = require('fs')

const baseDir = './src/components'
const componentsToIgnore = new Set([
    'Layout',
    'SidebarContents',
    'Header',
    'Menu',
    'UserLogosCarousel',
    'MethodTags',
    'AllTheFeaturesCloud',
    'AnchorScrollNavbar',
    'BlogAuthor',
    'BlogCategoriesList',
    'BlogFeaturedImage',
    'BlogIntro',
    'BlogPostLayout',
    'BlogPosts',
    'BlogShareButtons',
    'BlogFooter',
    'Benefits',
    'CareersHero',
    'InterviewProcess',
    'OpenRoles',
    'Transparency',
    'WhyWereHere',
    'WorkingAtPostHog',
    'CodeBlock',
    'Container',
    'ContributorAvatars',
    'ContributorCard',
    'ContributorSearch',
    'ContributorsChart',
    'DarkModeToggle',
    'DemoScheduler',
    'DocsPageSurvey',
    'DocsSearch',
    'Doodle',
    'DoodleCircle',
    'DoodleRectangle',
    'DoodleTriangle',
    'DoodleZigzag',
    'FeaturesComparisonTable',
    'FeaturesNav',
    'FeaturesSelfHost',
    'Footer',
    'GetStartedModal',
    'HostingOption',
    'Blockquote',
    'Features',
    'Hero',
    'LandingPageCallToAction',
    'PrivateCloud',
    'ProductFeatureIcons',
    'RecentBlogPosts',
    'Roadmap',
    'SocialProof',
    'Tutorials',
    'MdxAnchorHeaders',
    'NewsletterForm',
    'NotFoundPage',
    'OtherFeaturesBlock',
    'PageHeader',
    'PlanComparisonTable',
    'PostCard',
    'CloudVsSelfHost',
    'FAQs',
    'PlanComparison',
    'PricingHero',
    'PricingTable',
    'Quote',
    'Savings',
    'PricingSlider',
    'ProductAnchorNavbar',
    'ProductFeature',
    'ProductFeaturePlugin',
    'ProductFooter',
    'ProductHero',
    'ProductSectionHeader',
    'ResponsiveAnchor',
    'ResponsiveSidebar',
    'ResponsiveTopBar',
    'RocketHorizontalRule',
    'DesignedForYourStackBlock',
    'FeaturedSectionTextLeft',
    'FeaturedSectionTextRight',
    'FeaturedSectionTripleImage',
    'SignupModal',
    'Spacer',
    'StarRepoButton',
    'StartNowButton',
    'Structure',
    'TableOfContents',
    'WorkableSnippet',
])

const getComponentsInDir = (dir, components = []) => {
    const dirContents = fs.readdirSync(dir)
    let subdirectories = []
    let indexFileInDir = false
    for (let f of dirContents) {
        if (fs.lstatSync(`${dir}/${f}`).isDirectory() && !componentsToIgnore.has(f)) {
            subdirectories.push(f)
            continue
        }
        if (!indexFileInDir && f.includes('index') && !f.includes('css')) {
            indexFileInDir = true
        }
    }
    if (!subdirectories || indexFileInDir) {
        return [...components, dir]
    }
    for (let subdir of subdirectories) {
        components = getComponentsInDir(`${dir}/${subdir}`, components)
    }
    return components
}

const generateFile = () => {
    let imports = '// AUTO GENERATED FILE \n\n'
    let componentNames = []
    for (let component of getComponentsInDir(baseDir)) {
        const destructuredPath = component.split('/')
        const relativePath = './' + destructuredPath.slice(2).join('/')
        const componentName = destructuredPath[destructuredPath.length - 1]
        imports += `import { ${componentName} } from '${relativePath}'\n`
        componentNames.push(componentName)
    }
    imports += '\nexport const shortcodes = {\n\t' + componentNames.join(',\n\t') + '\n}'
    fs.writeFileSync('./src/mdxGlobalComponents.js', imports)
}

generateFile()
