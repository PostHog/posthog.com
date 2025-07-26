import React, { useState, useEffect } from 'react'
import { Select } from '../RadixUI/Select'
import { IconCheck, IconCopy, IconRefresh } from '@posthog/icons'
import OSButton from 'components/OSButton'
import ScrollArea from 'components/RadixUI/ScrollArea'
import OSTabs from 'components/OSTabs'
import { useWindow } from '../../context/Window'
import { useApp } from '../../context/App'

interface TweetTemplate {
    id: string
    content: string
    description: string
}

interface TweetPersona {
    name: string
    description: string
    templates: TweetTemplate[]
}

const generateContextualTweet = (persona: TweetPersona, pageTitle?: string, pageType?: string): string => {
    const template = persona.templates[Math.floor(Math.random() * persona.templates.length)]
    let tweet = template.content

    // Replace placeholders with actual content
    if (pageTitle) {
        tweet = tweet.replace(/\{title\}/g, pageTitle)
        tweet = tweet.replace(/\{page\}/g, pageTitle)
    }

    if (pageType) {
        tweet = tweet.replace(/\{type\}/g, pageType)
    }

    // Add PostHog branding if not already present
    if (!tweet.toLowerCase().includes('posthog')) {
        tweet = tweet.replace(/\{product\}/g, 'PostHog')
    }

    return tweet
}

const generateContextualEmail = (
    persona: EmailPersona,
    url: string,
    pageTitle?: string,
    pageType?: string
): { subject: string; body: string } => {
    const template = persona.templates[Math.floor(Math.random() * persona.templates.length)]
    let subject = template.subject
    let body = template.body

    // Replace placeholders with actual content
    if (pageTitle) {
        subject = subject.replace(/\{title\}/g, pageTitle)
        subject = subject.replace(/\{page\}/g, pageTitle)
        body = body.replace(/\{title\}/g, pageTitle)
        body = body.replace(/\{page\}/g, pageTitle)
    }

    if (pageType) {
        subject = subject.replace(/\{type\}/g, pageType)
        body = body.replace(/\{type\}/g, pageType)
    }

    // Add PostHog branding if not already present
    if (!subject.toLowerCase().includes('posthog')) {
        subject = subject.replace(/\{product\}/g, 'PostHog')
    }
    if (!body.toLowerCase().includes('posthog')) {
        body = body.replace(/\{product\}/g, 'PostHog')
    }

    // Add page URL to body
    body = body.replace(/\{url\}/g, url)

    return { subject, body }
}

interface EmailTemplate {
    id: string
    subject: string
    body: string
    description: string
}

interface EmailPersona {
    name: string
    description: string
    templates: EmailTemplate[]
}

const EmailGenerator = ({ url }: { url: string }) => {
    const [currentPersona, setCurrentPersona] = useState(0)
    const [currentEmail, setCurrentEmail] = useState({ subject: '', body: '' })
    const [copied, setCopied] = useState(false)

    const emailPersonas: EmailPersona[] = [
        {
            name: 'Friendly colleague',
            description: 'Casual and approachable',
            templates: [
                {
                    id: '1',
                    subject: 'You have to see this {page}!',
                    body: "Hey!\n\nI just came across this amazing {page} and thought you'd find it interesting. {product} really knows what they're doing.\n\nCheck it out: {url}\n\nLet me know what you think!",
                    description: 'Casual recommendation',
                },
                {
                    id: '2',
                    subject: 'Found something cool for you',
                    body: "Hi there!\n\nRemembered you were interested in analytics tools, so I wanted to share this {page} from {product}. It's really well done and might be exactly what you're looking for.\n\n{url}\n\nHope this helps!",
                    description: 'Personal recommendation',
                },
                {
                    id: '3',
                    subject: 'Quick share: {product} {page}',
                    body: "Hey!\n\nJust stumbled upon this and had to share. The way {product} handles their {page} is pretty impressive.\n\nTake a look: {url}\n\nThought you'd appreciate the attention to detail!",
                    description: 'Appreciation focused',
                },
            ],
        },
        {
            name: 'Professional networker',
            description: 'Business-focused and polished',
            templates: [
                {
                    id: '1',
                    subject: "Thought leadership example: {product}'s {page}",
                    body: "Hello,\n\nI wanted to share an excellent example of effective {type} communication. {product}'s approach to their {page} demonstrates best practices that many in our industry could learn from.\n\nYou can view it here: {url}\n\nI'd be interested in your thoughts on their strategy.\n\nBest regards",
                    description: 'Industry analysis',
                },
                {
                    id: '2',
                    subject: 'Resource recommendation: {product}',
                    body: "Hi,\n\nI came across {product}'s {page} and believe it would be valuable for your current projects. Their approach to user experience and clear value communication is exemplary.\n\nLink: {url}\n\nWould love to discuss how we might apply similar principles to our own work.\n\nBest",
                    description: 'Professional development',
                },
                {
                    id: '3',
                    subject: 'Market insight: {product} case study',
                    body: "Good morning,\n\nI wanted to flag {product}'s {page} as a notable example of effective product positioning in the analytics space. Their messaging strategy and user journey design offer valuable insights.\n\n{url}\n\nThis could inform our upcoming strategy discussions.\n\nRegards",
                    description: 'Strategic insight',
                },
            ],
        },
        {
            name: 'Excited evangelist',
            description: 'Enthusiastic and passionate',
            templates: [
                {
                    id: '1',
                    subject: 'You NEED to see this {product} {page}!',
                    body: "OMG!\n\nI just discovered {product}'s {page} and I'm absolutely blown away! 🤯 The level of detail and thought that went into this is incredible.\n\nSeriously, drop everything and check this out: {url}\n\nI guarantee you'll be as excited as I am about what they've built here. This is the future!\n\nCan't wait to hear your thoughts!",
                    description: 'Pure enthusiasm',
                },
                {
                    id: '2',
                    subject: 'Game-changer alert: {product}',
                    body: "Hey!\n\nI've been exploring analytics tools lately and WOW - {product}'s {page} just set a whole new standard! 🚀\n\nThe way they've approached this is revolutionary. You have to see it to believe it.\n\n{url}\n\nThis is exactly the kind of innovation our industry needs. Prepare to be amazed!",
                    description: 'Industry excitement',
                },
                {
                    id: '3',
                    subject: 'Mind = blown by {product}',
                    body: "Hi there!\n\nJust spent the last hour going through {product}'s {page} and I'm still processing how amazing it is! ✨\n\nEverything from the design to the functionality is just *chef's kiss* perfect.\n\nYou absolutely must check this out: {url}\n\nTrust me, you'll thank me later! 😄",
                    description: 'Personal amazement',
                },
            ],
        },
        {
            name: 'Technical expert',
            description: 'Developer-focused and analytical',
            templates: [
                {
                    id: '1',
                    subject: "Technical excellence: {product}'s {page} architecture",
                    body: "Hi,\n\nI wanted to share an example of exceptional technical implementation. {product}'s {page} demonstrates sophisticated engineering with excellent user experience design.\n\nKey observations:\n• Clean, intuitive interface design\n• Thoughtful information architecture\n• Seamless user journey optimization\n\nView the implementation: {url}\n\nWorth studying for our own technical decisions.\n\nBest",
                    description: 'Technical analysis',
                },
                {
                    id: '2',
                    subject: 'Code quality showcase: {product}',
                    body: "Hey,\n\nCame across {product}'s {page} and the attention to technical detail is impressive. The performance optimization and clean architecture patterns are worth examining.\n\nFrom a development perspective, they've solved several complex UX challenges elegantly.\n\n{url}\n\nThought you'd appreciate the technical craftsmanship behind this.",
                    description: 'Development focus',
                },
                {
                    id: '3',
                    subject: 'API design inspiration: {product}',
                    body: "Hi,\n\nWhile reviewing analytics platforms, I found {product}'s {page} to be an excellent example of developer-first design philosophy. Their approach to documentation and user onboarding is particularly well-executed.\n\nThe technical implementation demonstrates:\n• Scalable architecture patterns\n• Intuitive developer experience\n• Performance-optimized delivery\n\n{url}\n\nRelevant for our upcoming API redesign project.",
                    description: 'Developer experience',
                },
            ],
        },
    ]

    const refreshEmail = () => {
        const newEmail = generateContextualEmail(emailPersonas[currentPersona], url, 'amazing page', 'content')
        setCurrentEmail(newEmail)
    }

    const copyToClipboard = async () => {
        try {
            const fullEmail = `Subject: ${currentEmail.subject}\n\n${currentEmail.body}`
            await navigator.clipboard.writeText(fullEmail)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error('Failed to copy:', err)
        }
    }

    const sendEmail = () => {
        const subject = encodeURIComponent(currentEmail.subject)
        const body = encodeURIComponent(currentEmail.body)
        window.open(`mailto:?subject=${subject}&body=${body}`)
    }

    // Generate initial email
    useEffect(() => {
        refreshEmail()
    }, [currentPersona])

    return (
        <div className="space-y-2 leading-none">
            <label className="text-sm font-semibold text-primary">Choose your email style:</label>
            <Select
                className="w-full text-left"
                value={currentPersona.toString()}
                onValueChange={(value) => setCurrentPersona(parseInt(value))}
                groups={[
                    {
                        label: 'Email personas',
                        items: emailPersonas.map((persona, index) => ({
                            label: `${persona.name} - ${persona.description}`,
                            value: index.toString(),
                        })),
                    },
                ]}
            />

            <div className="space-y-2">
                <div className="bg-accent px-4 py-2 rounded-md border border-primary relative">
                    <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                            <div className="text-sm text-muted mb-2 font-semibold">Your generated email:</div>
                            <div className="space-y-2">
                                <div>
                                    <div className="text-xs text-muted">Subject:</div>
                                    <input
                                        type="text"
                                        value={currentEmail.subject}
                                        onChange={(e) =>
                                            setCurrentEmail((prev) => ({ ...prev, subject: e.target.value }))
                                        }
                                        className="w-full text-primary font-medium border-none bg-transparent outline-none resize-none !p-0"
                                        placeholder="Email subject..."
                                    />
                                </div>
                                <div>
                                    <div className="text-xs text-muted">Body:</div>
                                    <textarea
                                        value={currentEmail.body}
                                        onChange={(e) => setCurrentEmail((prev) => ({ ...prev, body: e.target.value }))}
                                        className="w-full text-primary text-sm leading-relaxed border-none bg-transparent outline-none resize-none min-h-[120px] !p-0"
                                        placeholder="Email body..."
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="absolute right-1 top-1 flex">
                        <OSButton size="sm" icon={<IconRefresh />} onClick={refreshEmail} />
                        <OSButton size="sm" icon={copied ? <IconCheck /> : <IconCopy />} onClick={copyToClipboard} />
                    </div>
                </div>

                <div className="text-xs text-muted">
                    <strong>Current style:</strong> {emailPersonas[currentPersona].name} -{' '}
                    {emailPersonas[currentPersona].description}
                </div>
            </div>
        </div>
    )
}

const TweetGenerator = ({ url }: { url: string }) => {
    const [currentPersona, setCurrentPersona] = useState(0)
    const [currentTweet, setCurrentTweet] = useState('')
    const [copied, setCopied] = useState(false)

    const tweetPersonas: TweetPersona[] = [
        {
            name: 'Gen Z Casual',
            description: 'Trendy, casual language',
            templates: [
                { id: '1', content: 'OMG did you see this {page}? 🔥', description: 'Excited discovery' },
                { id: '2', content: 'yoooo {product} {page} is on fleek no cap 💯', description: 'Very casual praise' },
                { id: '3', content: 'bruh this {product} {page} is legit fire 🚀', description: 'Impressed reaction' },
                {
                    id: '4',
                    content: '{product} really said "let me show you how it\'s done" with this {page} 😤',
                    description: 'Admiring confidence',
                },
                {
                    id: '5',
                    content: "not me getting obsessed with {product}'s {page} at 2am again... 👀",
                    description: 'Late night browsing',
                },
            ],
        },
        {
            name: 'LinkedIn Influencer',
            description: 'Professional, thought leadership tone',
            templates: [
                {
                    id: '1',
                    content:
                        '5 things {product} does on their {page} that you should copy for your B2B SaaS business 🧵',
                    description: 'Educational thread starter',
                },
                {
                    id: '2',
                    content:
                        "After analyzing 100+ SaaS companies, {product}'s approach to {page} stands out. Here's why: 👇",
                    description: 'Analysis hook',
                },
                {
                    id: '3',
                    content:
                        'Most companies get {type} wrong. {product} gets it right. Their {page} is a masterclass in user experience.',
                    description: 'Contrarian take',
                },
                {
                    id: '4',
                    content:
                        "I've been studying successful SaaS companies for years. {product}'s {page} is textbook excellence. 📚",
                    description: 'Authority positioning',
                },
                {
                    id: '5',
                    content: 'The future of B2B SaaS is already here. Just look at how {product} handles {page}. 🚀',
                    description: 'Future-focused insight',
                },
            ],
        },
        {
            name: 'Tech Twitter',
            description: 'Developer-focused, technical appreciation',
            templates: [
                {
                    id: '1',
                    content:
                        "{product} is absolutely crushing it with their {page}. The attention to detail is *chef's kiss* 👨‍🍳💋",
                    description: 'Technical appreciation',
                },
                {
                    id: '2',
                    content:
                        "Just spent 30 minutes on {product}'s {page} and wow. This is how you build developer tools. 🛠️",
                    description: 'Developer perspective',
                },
                {
                    id: '3',
                    content:
                        "If you're building anything analytics-related, study {product}'s {page}. Peak product design right here.",
                    description: 'Learning recommendation',
                },
                {
                    id: '4',
                    content:
                        "Hot take: {product}'s {page} is setting the new standard for developer experience in analytics tools 🔥",
                    description: 'Industry opinion',
                },
                {
                    id: '5',
                    content:
                        "The engineering behind {product}'s {page} is beautiful. Someone really thought about the user journey here. 🎯",
                    description: 'Technical admiration',
                },
            ],
        },
        {
            name: 'Startup Founder',
            description: 'Business-focused, growth-minded',
            templates: [
                {
                    id: '1',
                    content: "Every startup should bookmark {product}'s {page}. This is how you communicate value. 💪",
                    description: 'Business advice',
                },
                {
                    id: '2',
                    content:
                        "Been looking for the perfect example of product-market fit communication. Found it: {product}'s {page} 🎯",
                    description: 'PMF example',
                },
                {
                    id: '3',
                    content:
                        "Scaling a startup? Take notes from {product}'s {page}. They understand their users deeply. 📝",
                    description: 'Scaling insights',
                },
                {
                    id: '4',
                    content:
                        "The way {product} presents {page} is exactly why they're winning in the analytics space. Clear, compelling, conversion-focused.",
                    description: 'Competitive analysis',
                },
                {
                    id: '5',
                    content:
                        'Reminder: Your {type} page is often the first impression. {product} nailed theirs. What about yours? 🤔',
                    description: 'Reflective question',
                },
            ],
        },
        {
            name: 'Shakespearean',
            description: 'Dramatic, classical language',
            templates: [
                {
                    id: '1',
                    content: "Hark! {product}'s {page} doth possess content most excellent and wondrous to behold! 🎭",
                    description: 'Classical praise',
                },
                {
                    id: '2',
                    content: 'By my troth, {product} hath crafted a {page} that would make the bards weep with joy! ✨',
                    description: 'Poetic admiration',
                },
                {
                    id: '3',
                    content:
                        "What noble craft is this? {product}'s {page} stands as a testament to digital artistry most fine! 🎨",
                    description: 'Artistic appreciation',
                },
                {
                    id: '4',
                    content:
                        "Verily, {product}'s approach to {page} is as beautiful as a summer's day, and twice as useful! ☀️",
                    description: 'Comparative praise',
                },
                {
                    id: '5',
                    content:
                        "Behold! {product} hath wrought a {page} that speaks to both mind and heart. 'Tis a wonder! 💫",
                    description: 'Emotional appeal',
                },
            ],
        },
        {
            name: 'Overly Enthusiastic',
            description: 'Maximum excitement and energy',
            templates: [
                {
                    id: '1',
                    content: "GUYS!!!! {product}'s {page} is LITERALLY THE BEST THING I'VE SEEN ALL WEEK!!!! 🤯🤯🤯",
                    description: 'Pure excitement',
                },
                {
                    id: '2',
                    content:
                        "I CANNOT EVEN HANDLE HOW AMAZING {product}'s {page} IS RIGHT NOW!!!! My mind = BLOWN 🤯💥",
                    description: 'Mind blown reaction',
                },
                {
                    id: '3',
                    content:
                        "STOP EVERYTHING!!! Go check out {product}'s {page} RIGHT NOW!!! You will NOT regret it!!! 🚨🚨🚨",
                    description: 'Urgent recommendation',
                },
                {
                    id: '4',
                    content: "OMG OMG OMG {product}'s {page} is SO GOOD I'm literally shaking with excitement!!! 😱⚡️",
                    description: 'Physical reaction',
                },
                {
                    id: '5',
                    content: "I've seen the future and it's {product}'s {page}!!! This is REVOLUTIONARY!!! 🌟💫✨",
                    description: 'Revolutionary claim',
                },
            ],
        },
    ]

    const refreshTweet = () => {
        // Get current page title from the Editor props (we'll need to pass this down)
        const newTweet = generateContextualTweet(tweetPersonas[currentPersona], 'amazing page', 'content')
        setCurrentTweet(newTweet)
    }

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(currentTweet)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error('Failed to copy:', err)
        }
    }

    // Generate initial tweet
    useEffect(() => {
        refreshTweet()
    }, [currentPersona])

    return (
        <div className="space-y-2 leading-none">
            <label className="text-sm font-semibold text-primary">Choose your persona:</label>
            <Select
                className="w-full text-left"
                value={currentPersona.toString()}
                onValueChange={(value) => setCurrentPersona(parseInt(value))}
                groups={[
                    {
                        label: 'Tweet personas',
                        items: tweetPersonas.map((persona, index) => ({
                            label: `${persona.name} - ${persona.description}`,
                            value: index.toString(),
                        })),
                    },
                ]}
            />

            <div className="space-y-2">
                <div className="bg-accent px-4 py-2 rounded-md border border-primary relative">
                    <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                            <div className="text-sm text-muted mb-2 font-semibold">Your generated tweet:</div>
                            <textarea
                                value={currentTweet}
                                onChange={(e) => setCurrentTweet(e.target.value)}
                                rows={2}
                                className="w-full text-primary font-medium leading-relaxed border-none bg-transparent outline-none resize-none !p-0"
                                placeholder="Your tweet will appear here..."
                            />
                            <div className="text-xs text-muted mt-2">{currentTweet.length}/280 characters</div>
                        </div>
                    </div>
                    <div className="absolute right-1 top-1">
                        <OSButton size="sm" icon={<IconRefresh />} onClick={refreshTweet} />
                        <OSButton size="sm" icon={copied ? <IconCheck /> : <IconCopy />} onClick={copyToClipboard} />
                    </div>
                </div>

                <div className="text-xs text-muted">
                    <strong>Current persona:</strong> {tweetPersonas[currentPersona].name} -{' '}
                    {tweetPersonas[currentPersona].description}
                </div>
            </div>
        </div>
    )
}

const generateContextualFax = (persona: FaxPersona, pageTitle?: string, pageType?: string): { message: string } => {
    const template = persona.templates[Math.floor(Math.random() * persona.templates.length)]
    let message = template.message

    // Replace placeholders with actual content
    if (pageTitle) {
        message = message.replace(/\{title\}/g, pageTitle)
        message = message.replace(/\{page\}/g, pageTitle)
    }

    if (pageType) {
        message = message.replace(/\{type\}/g, pageType)
    }

    // Add PostHog branding if not already present
    if (!message.toLowerCase().includes('posthog')) {
        message = message.replace(/\{product\}/g, 'PostHog')
    }

    return { message }
}

interface FaxTemplate {
    id: string
    message: string
    description: string
}

interface FaxPersona {
    name: string
    description: string
    templates: FaxTemplate[]
}

const FaxGenerator = ({ url }: { url: string }) => {
    const [currentPersona, setCurrentPersona] = useState(0)
    const [currentFax, setCurrentFax] = useState({ message: '' })
    const [copied, setCopied] = useState(false)

    const faxPersonas: FaxPersona[] = [
        {
            name: 'Corporate executive',
            description: 'Formal business communication',
            templates: [
                {
                    id: '1',
                    message:
                        'URGENT: Please review the attached {page} from {product}. This represents a significant opportunity for our organization to enhance our analytical capabilities.\n\nRequest immediate feedback for our upcoming board meeting.\n\nRegards,\nManagement',
                    description: 'Executive urgency',
                },
                {
                    id: '2',
                    message:
                        "TO ALL DEPARTMENT HEADS:\n\nFor your immediate attention - {product}'s {page} contains valuable insights relevant to our Q4 strategy.\n\nPlease distribute to your teams and provide summary by COB Friday.\n\nBest regards,\nExecutive Office",
                    description: 'Department directive',
                },
                {
                    id: '3',
                    message:
                        'CONFIDENTIAL MEMO:\n\nThe {page} from {product} contains proprietary information that may impact our competitive positioning.\n\nSchedule briefing with senior leadership immediately.\n\nRegards,\nStrategy Department',
                    description: 'Confidential briefing',
                },
            ],
        },
        {
            name: 'Enthusiastic colleague',
            description: 'Excited professional sharing',
            templates: [
                {
                    id: '1',
                    message:
                        "YOU HAVE TO SEE THIS!!!\n\nI discovered {product}'s {page} and it's EXACTLY what we've been looking for! This could revolutionize how we handle our data analytics.\n\nI'm faxing this because it's too important for email!\n\nCall me ASAP!\n\n- Your excited colleague",
                    description: 'Breakthrough discovery',
                },
                {
                    id: '2',
                    message:
                        "STOP THE PRESSES!\n\n{product}'s {page} is a game-changer! I know we usually use email, but this discovery deserved the formality of a FAX.\n\nThis is the solution we've been searching for!\n\nLet's discuss over coffee tomorrow!\n\n- The bearer of good news",
                    description: 'Game changer alert',
                },
                {
                    id: '3',
                    message:
                        "ATTENTION: AMAZING DISCOVERY!\n\nFound {product}'s {page} and had to share via fax for maximum impact! This is too good for regular communication channels.\n\nPrepare to be amazed!\n\nFaxing with excitement!\n\n- Your enthusiastic coworker",
                    description: 'Maximum impact sharing',
                },
            ],
        },
        {
            name: 'Retro tech enthusiast',
            description: 'Nostalgic technology lover',
            templates: [
                {
                    id: '1',
                    message:
                        "Greetings from 1987!\n\nJust discovered {product}'s {page} and thought it deserved the classic charm of FAX transmission!\n\nIn a world of instant messages, sometimes the old ways are the best ways.\n\nTransmitting knowledge through analog warmth!\n\n- A fax machine devotee",
                    description: 'Nostalgic charm',
                },
                {
                    id: '2',
                    message:
                        "TRANSMITTED VIA THERMAL PAPER:\n\n{product}'s {page} is so good, it deserves the authentic experience of fax communication!\n\nEnjoy the sweet sounds of dial-up transmission and the smell of fresh thermal paper.\n\nKeeping the fax dream alive!\n\n- Your analog friend",
                    description: 'Authentic experience',
                },
                {
                    id: '3',
                    message:
                        "BEEP BEEP SCREECH!\n\nThat's the sound of IMPORTANT INFORMATION arriving! {product}'s {page} is revolutionary enough to warrant this retro communication method.\n\nSometimes the old technology hits different.\n\nFaxing it forward!\n\n- The fax whisperer",
                    description: 'Retro revolution',
                },
            ],
        },
    ]

    const refreshFax = () => {
        const newFax = generateContextualFax(faxPersonas[currentPersona], 'amazing page', 'content')
        setCurrentFax(newFax)
    }

    const copyToClipboard = async () => {
        try {
            const currentDate = new Date().toLocaleDateString()
            const faxContent = `FAX TRANSMISSION

TO: Recipient
FROM: Your Name  
DATE: ${currentDate}
PAGES: 1

MESSAGE:
${currentFax.message}

URL: ${url}

--- END OF TRANSMISSION ---`
            await navigator.clipboard.writeText(faxContent)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error('Failed to copy:', err)
        }
    }

    // Generate initial fax
    useEffect(() => {
        refreshFax()
    }, [currentPersona])

    const currentDate = new Date().toLocaleDateString()
    const currentTime = new Date().toLocaleTimeString()

    return (
        <div>
            <ScrollArea>
                <div className="space-y-2">
                    <div className="space-y-2 leading-none">
                        <label className="text-sm font-semibold text-primary">Choose your fax style:</label>
                        <Select
                            className="w-full text-left"
                            value={currentPersona.toString()}
                            onValueChange={(value) => setCurrentPersona(parseInt(value))}
                            groups={[
                                {
                                    label: 'Fax personas',
                                    items: faxPersonas.map((persona, index) => ({
                                        label: `${persona.name} - ${persona.description}`,
                                        value: index.toString(),
                                    })),
                                },
                            ]}
                        />
                    </div>

                    <div className="space-y-2">
                        <div className="bg-white text-black px-4 py-2 rounded border-2 border-gray-400 font-mono text-xs leading-tight relative">
                            {/* Fax header */}
                            <div className="border-b border-black pb-2 mb-2">
                                <div className="text-center font-bold text-sm">FAX PREVIEW</div>
                                <div className="mt-2 grid grid-cols-2 gap-2">
                                    <div>TO: ________________</div>
                                    <div>FROM: Your Name</div>
                                    <div>DATE: {currentDate}</div>
                                    <div>TIME: {currentTime}</div>
                                    <div>PAGES: 1</div>
                                    <div>PHONE: (989) POSTHOG</div>
                                </div>
                            </div>

                            {/* Message content */}
                            <div className="mb-2">
                                <div className="font-bold mb-2">MESSAGE:</div>
                                <textarea
                                    value={currentFax.message}
                                    onChange={(e) => setCurrentFax((prev) => ({ ...prev, message: e.target.value }))}
                                    className="w-full bg-transparent border-none outline-none resize-none min-h-[120px] font-mono text-xs leading-tight !p-0"
                                    placeholder="Your fax message will appear here..."
                                />
                            </div>

                            {/* URL */}
                            <div className="border-t border-black pt-2">
                                <div className="font-bold">REFERENCE URL:</div>
                                <div className="break-all">{url}</div>
                            </div>

                            {/* Footer */}
                            <div className="text-center mt-2 border-t border-black pt-2 text-xs">
                                --- END OF TRANSMISSION ---
                            </div>
                            <div className="flex absolute top-1 right-1">
                                <OSButton size="sm" icon={<IconRefresh />} onClick={refreshFax} />
                                <OSButton
                                    size="sm"
                                    icon={copied ? <IconCheck /> : <IconCopy />}
                                    onClick={copyToClipboard}
                                />
                            </div>
                        </div>

                        <div className="text-xs text-muted">
                            <strong>Current style:</strong> {faxPersonas[currentPersona].name} -{' '}
                            {faxPersonas[currentPersona].description}
                        </div>
                    </div>
                </div>
            </ScrollArea>
        </div>
    )
}

export default function Share({ url, title }: { url: string; title: string }) {
    const { appWindow } = useWindow()
    const { setWindowTitle, siteSettings } = useApp()

    useEffect(() => {
        setWindowTitle(appWindow, `Share ${title || url}`)
    }, [])

    return (
        <div className={`${siteSettings.experience === 'boring' ? 'size-full' : 'w-[500px]'}`}>
            <OSTabs
                frame
                tabs={[
                    {
                        label: 'Tweet generator',
                        value: 'tweet-generator',
                        content: <TweetGenerator url={url} />,
                    },
                    {
                        label: 'Email generator',
                        value: 'email-generator',
                        content: <EmailGenerator url={url} />,
                    },
                    {
                        label: 'Fax generator',
                        value: 'fax-generator',
                        content: <FaxGenerator url={url} />,
                    },
                ]}
            />
        </div>
    )
}
