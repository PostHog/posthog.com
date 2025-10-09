import React, { useState } from 'react'
import Layout from 'components/Layout'
import Input from 'components/OSForm/input'
import Textarea from 'components/OSForm/textarea'

interface FormData {
    name: string
    email: string
    city: string
    location: string
    needLocationHelp: boolean
    dateTime: string
    mealType: string
    personality: string
    talkTopics: string[]
    activityType: string
    networkLearnRatio: string
    eventPurpose: string
    eventStructure: string
    expectedSize: string
    audienceType: string
}

const pastEvents = [
    {
        name: 'AGI Builders Meetup with PostHog',
        city: 'SF',
        date: 'July 22',
        format: 'Talks, Fireside',
        audience: 'SF AI Enthusiasts',
        size: 112,
    },
    {
        name: 'AI Product Breakfast: AI Decisioning',
        city: 'Austin',
        date: 'August 12',
        format: 'Breakfast + OST',
        audience: 'AI Engineers',
        size: 25,
    },
    {
        name: 'PostHog hardware hacknight',
        city: 'Vermont',
        date: 'September 16',
        format: 'Meetup',
        audience: 'Engineers and founders',
        size: 19,
    },
    {
        name: 'MCP Builders Breakfast',
        city: 'Amsterdam',
        date: 'September 25',
        format: 'Breakfast + OST',
        audience: 'MCP practitioners',
        size: 20,
    },
    {
        name: "From Open Source to Scale: A Conversation with PostHog's Tim Glaser",
        city: 'Dublin',
        date: 'September 26',
        format: 'Panel',
        audience: 'Founders',
        size: 55,
    },
    {
        name: 'Paellas and Agents with PostHog',
        city: 'Barcelona',
        date: 'September 28',
        format: 'Workshop',
        audience: 'AI engineers',
        size: 22,
    },
    {
        name: 'Valio Con',
        city: 'San Diego',
        date: 'September 14',
        format: 'Conf sponsorship',
        audience: 'Designers',
        size: 65,
    },
    {
        name: 'PostHog Founders Lunch',
        city: 'Cardiff',
        date: 'September 23',
        format: 'Lunch + OST',
        audience: 'Founders',
        size: 25,
    },
    {
        name: 'Jersey City Tech Meetup with PostHog',
        city: 'Jersey City',
        date: 'September 30',
        format: 'Talks, Panel, Networking',
        audience: 'Product managers and engineers',
        size: 70,
    },
    {
        name: 'MCP After Hours: AI Dev Tools Demo Night',
        city: 'SF',
        date: 'July 10',
        format: 'Talks',
        audience: 'Founders, engineers',
        size: 85,
    },
    {
        name: 'Building With and For AI: Developer Tools for Modern Apps',
        city: 'NYC',
        date: 'August 21',
        format: 'Talks, Networking',
        audience: 'Engineers, Engineering managers',
        size: 50,
    },
    {
        name: 'The Future of Developer Experience: Toronto Edition',
        city: 'Toronto',
        date: 'August 26',
        format: 'Talks, Networking',
        audience: 'Startup founders',
        size: 75,
    },
    {
        name: 'Stealth Mode Mornings with PostHog',
        city: 'NYC',
        date: 'July 24',
        format: 'Breakfast',
        audience: 'Stealth founders',
        size: 7,
    },
    {
        name: 'Pubquiz at Flutter & friends',
        city: 'Stockholm',
        date: 'August 31',
        format: 'Pub quiz',
        audience: 'Flutter engineers',
        size: 50,
    },
    {
        name: "München Hogtoberfest '25",
        city: 'Munich',
        date: 'September 24',
        format: 'Drinks',
        audience: 'Founders and engineers',
        size: 7,
    },
]

const EventGenerator = (): JSX.Element => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        city: '',
        location: '',
        needLocationHelp: false,
        dateTime: '',
        mealType: '',
        personality: '',
        talkTopics: [],
        activityType: '',
        networkLearnRatio: '',
        eventPurpose: '',
        eventStructure: '',
        expectedSize: '',
        audienceType: '',
    })

    const [recommendations, setRecommendations] = useState<string[]>([])

    const handleInputChange = (field: keyof FormData, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
        generateRecommendations({ ...formData, [field]: value })
    }

    const handleCheckboxChange = (field: keyof FormData, value: string, checked: boolean) => {
        const currentValues = formData[field] as string[]
        const newValues = checked ? [...currentValues, value] : currentValues.filter((v) => v !== value)
        setFormData((prev) => ({ ...prev, [field]: newValues }))
        generateRecommendations({ ...formData, [field]: newValues })
    }

    const generateRecommendations = (data: FormData) => {
        const recs: string[] = []

        // Meal type recommendations
        if (data.mealType === 'breakfast') {
            recs.push(
                'Breakfast events work great for intimate gatherings (15-25 people). Consider an "open space technology" format where attendees suggest and lead discussions.'
            )
        } else if (data.mealType === 'dinner') {
            recs.push(
                'Dinner events are perfect for 10-20 people. Consider a fireside chat or panel format to keep everyone engaged.'
            )
        } else if (data.mealType === 'lunch') {
            recs.push(
                'Lunch events work well for founders and professionals. Keep it to 20-30 people for good conversation flow.'
            )
        }

        // Activity type recommendations
        if (data.activityType === 'build') {
            recs.push(
                'For builder-focused events, consider a hacknight format. Hardware hacknights have worked well in smaller cities like Vermont.'
            )
        } else if (data.activityType === 'learn') {
            recs.push(
                'For learning-focused events, workshops or talk series work well. Plan for 50-75 attendees if you have good speakers.'
            )
        } else if (data.activityType === 'chat') {
            recs.push(
                'For networking events, informal formats like pub quizzes or drinks work great. These scale from 7 to 70 people depending on venue.'
            )
        }

        // Talk topic recommendations
        if (data.talkTopics.includes('ai')) {
            recs.push(
                'AI-focused events have been very successful. Consider formats like "AI Product Breakfast" or "AI Dev Tools Demo Night" which have drawn 25-85 attendees.'
            )
        }
        if (data.talkTopics.includes('founders')) {
            recs.push(
                'Founder events work best as intimate gatherings. "Stealth Mode Mornings" for 7 people or founder lunches for 25 work well.'
            )
        }
        if (data.talkTopics.includes('operations')) {
            recs.push(
                'Operations and DevOps themes work well combined with product discussions. Consider breakfast + open space format.'
            )
        }

        // City-specific recommendations
        const cityEvents = pastEvents.filter((e) => e.city.toLowerCase().includes(data.city.toLowerCase()))
        if (cityEvents.length > 0) {
            const avgSize = Math.round(cityEvents.reduce((sum, e) => sum + e.size, 0) / cityEvents.length)
            recs.push(
                `We've run ${cityEvents.length} event(s) in ${
                    data.city
                }. Average attendance was ${avgSize} people. Popular formats: ${cityEvents
                    .map((e) => e.format)
                    .join(', ')}.`
            )
        }

        setRecommendations(recs)
    }

    const generateGitHubIssueURL = () => {
        const supportNeeds: string[] = []
        if (!formData.location || formData.needLocationHelp) {
            supportNeeds.push('- [ ] Venue support')
        }
        if (!formData.dateTime) {
            supportNeeds.push('- [ ] Help identifying date and time')
        }
        if (!formData.expectedSize) {
            supportNeeds.push('- [ ] Help estimating expected audience size')
        }
        if (!formData.eventStructure) {
            supportNeeds.push('- [ ] Help planning event structure')
        }

        const talkTopicsText = formData.talkTopics.length > 0 ? formData.talkTopics.join(', ') : 'To be determined'

        const issueBody = `## 📝 Summary
A ${formData.mealType || 'community'} event focused on ${talkTopicsText.toLowerCase()}, designed for ${
            formData.audienceType || 'the local tech community'
        }.

${formData.eventPurpose ? `Purpose: ${formData.eventPurpose}` : ''}

## 📍 Key Details
- **Event name:** ${
            formData.city ? `PostHog ${formData.city} ${formData.activityType || 'Meetup'}` : 'To be determined'
        }
- **Organizer name + contact:** ${formData.name} (${formData.email})
- **Proposed date & time:** ${formData.dateTime || 'To be determined'}
- **Location:** ${
            formData.location || (formData.needLocationHelp ? 'Need help finding a location' : 'To be determined')
        }
- **Expected size / audience type:** ${formData.expectedSize || 'To be determined'} / ${
            formData.audienceType || 'To be determined'
        }
- **What's the purpose of the event?** ${formData.eventPurpose || 'PostHog community building and networking'}
- **What's the general structure?** ${formData.eventStructure || 'To be determined'}

## 🧰 What support would be helpful?
${supportNeeds.length > 0 ? supportNeeds.join('\n') : '- [ ] PostHog Merch\n- [ ] Promotion (e.g. repost on social)'}
- [ ] PostHog Merch
- [ ] Promotion
- [ ] Budget support

## 💭 Event Details
- **Meal type:** ${formData.mealType || 'Not specified'}
- **Personality:** ${formData.personality || 'Mixed group'}
- **Activity focus:** ${formData.activityType || 'To be determined'}
- **Network to learn ratio:** ${formData.networkLearnRatio || 'Balanced'}
- **Talk topics:** ${talkTopicsText}

## ✅ Pre-flight checklist
- [ ] I've read [this page](https://posthog.com/handbook/words-and-pictures/events) on how to run community events.
- [ ] I'll aim to create a welcoming environment and read [this page](https://posthog.com/handbook/company/grown-ups#things-we-do-to-create-a-welcoming-environment) for inspiration.
- [ ] I'll send a follow-up to everyone who RSVP'd with a thank you note, recap, and next steps.
- [ ] If I have speakers, I'll prioritize their experience with check-ins, talk prep/practice, and feedback.`

        const title = `Community Event: ${formData.city || 'New Event'}`
        const labels = 'marketing'
        const assignees = 'danielzaltsman'

        const baseURL = 'https://github.com/PostHog/posthog.com/issues/new'
        const params = new URLSearchParams({
            title,
            body: issueBody,
            labels,
            assignees,
        })

        return `${baseURL}?${params.toString()}`
    }

    const isFormValid = formData.name && formData.email && formData.city

    return (
        <Layout>
            <div className="max-w-5xl mx-auto px-4 py-12">
                <div className="mb-12">
                    <h1 className="text-4xl font-bold mb-4">Startup Event Generator</h1>
                    <p className="text-lg opacity-70">
                        Help us plan an awesome community event! Fill out the form below and we'll generate a GitHub
                        issue to get started.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <div className="bg-accent border border-primary p-6 rounded-lg">
                            <h2 className="text-2xl font-bold mb-6">Event Details</h2>

                            <div className="space-y-6">
                                {/* Basic Info */}
                                <div className="grid md:grid-cols-2 gap-4">
                                    <Input
                                        label="Your Name"
                                        type="text"
                                        size="md"
                                        direction="column"
                                        required
                                        value={formData.name}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                            handleInputChange('name', e.target.value)
                                        }
                                        name="name"
                                    />
                                    <Input
                                        label="Your Email"
                                        type="email"
                                        size="md"
                                        direction="column"
                                        required
                                        value={formData.email}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                            handleInputChange('email', e.target.value)
                                        }
                                        name="email"
                                    />
                                </div>

                                <Input
                                    label="City"
                                    type="text"
                                    size="md"
                                    direction="column"
                                    required
                                    value={formData.city}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        handleInputChange('city', e.target.value)
                                    }
                                    name="city"
                                    description="Where do you want to host this event?"
                                />

                                <div>
                                    <Input
                                        label="Location / Venue"
                                        type="text"
                                        size="md"
                                        direction="column"
                                        value={formData.location}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                            handleInputChange('location', e.target.value)
                                        }
                                        name="location"
                                        description="Specific venue name or address (optional)"
                                    />
                                    <label className="flex items-center mt-2 text-sm">
                                        <input
                                            type="checkbox"
                                            checked={formData.needLocationHelp}
                                            onChange={(e) => handleInputChange('needLocationHelp', e.target.checked)}
                                            className="mr-2"
                                        />
                                        I need help finding a location
                                    </label>
                                </div>

                                <Input
                                    label="Date and Time"
                                    type="text"
                                    size="md"
                                    direction="column"
                                    value={formData.dateTime}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        handleInputChange('dateTime', e.target.value)
                                    }
                                    name="dateTime"
                                    description="e.g., 'Morning + early afternoon one day in the week of August 11th'"
                                />

                                {/* Meal Type */}
                                <div>
                                    <label className="block text-sm font-medium mb-2">Meal Type</label>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                        {['breakfast', 'lunch', 'dinner', 'not hungry'].map((type) => (
                                            <label key={type} className="flex items-center space-x-2 text-sm">
                                                <input
                                                    type="radio"
                                                    name="mealType"
                                                    value={type}
                                                    checked={formData.mealType === type}
                                                    onChange={(e) => handleInputChange('mealType', e.target.value)}
                                                />
                                                <span className="capitalize">{type}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Personality */}
                                <div>
                                    <label className="block text-sm font-medium mb-2">Personality / Vibe</label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {['introvert', 'extrovert'].map((type) => (
                                            <label key={type} className="flex items-center space-x-2 text-sm">
                                                <input
                                                    type="radio"
                                                    name="personality"
                                                    value={type}
                                                    checked={formData.personality === type}
                                                    onChange={(e) => handleInputChange('personality', e.target.value)}
                                                />
                                                <span className="capitalize">{type}-friendly</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Talk Topics */}
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Talk Topics (select all that apply)
                                    </label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {['AI', 'operations', 'founders', 'other'].map((topic) => (
                                            <label key={topic} className="flex items-center space-x-2 text-sm">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.talkTopics.includes(topic)}
                                                    onChange={(e) =>
                                                        handleCheckboxChange('talkTopics', topic, e.target.checked)
                                                    }
                                                />
                                                <span className="capitalize">{topic}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Activity Type */}
                                <div>
                                    <label className="block text-sm font-medium mb-2">Activity Focus</label>
                                    <div className="grid grid-cols-3 gap-2">
                                        {['build', 'learn', 'chat'].map((type) => (
                                            <label key={type} className="flex items-center space-x-2 text-sm">
                                                <input
                                                    type="radio"
                                                    name="activityType"
                                                    value={type}
                                                    checked={formData.activityType === type}
                                                    onChange={(e) => handleInputChange('activityType', e.target.value)}
                                                />
                                                <span className="capitalize">{type}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Network to Learn Ratio */}
                                <div>
                                    <label className="block text-sm font-medium mb-2">Network to Learn Ratio</label>
                                    <div className="grid grid-cols-3 gap-2">
                                        {['mostly network', 'balanced', 'mostly learn'].map((ratio) => (
                                            <label key={ratio} className="flex items-center space-x-2 text-sm">
                                                <input
                                                    type="radio"
                                                    name="networkLearnRatio"
                                                    value={ratio}
                                                    checked={formData.networkLearnRatio === ratio}
                                                    onChange={(e) =>
                                                        handleInputChange('networkLearnRatio', e.target.value)
                                                    }
                                                />
                                                <span className="capitalize">{ratio}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Additional Details */}
                                <Textarea
                                    label="Event Purpose"
                                    rows={3}
                                    direction="column"
                                    value={formData.eventPurpose}
                                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                                        handleInputChange('eventPurpose', e.target.value)
                                    }
                                    name="eventPurpose"
                                    description="What's the goal of this event?"
                                />

                                <Textarea
                                    label="Event Structure"
                                    rows={3}
                                    direction="column"
                                    value={formData.eventStructure}
                                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                                        handleInputChange('eventStructure', e.target.value)
                                    }
                                    name="eventStructure"
                                    description="e.g., talks, panel, workshop, networking"
                                />

                                <div className="grid md:grid-cols-2 gap-4">
                                    <Input
                                        label="Expected Size"
                                        type="text"
                                        size="md"
                                        direction="column"
                                        value={formData.expectedSize}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                            handleInputChange('expectedSize', e.target.value)
                                        }
                                        name="expectedSize"
                                        description="How many attendees?"
                                    />
                                    <Input
                                        label="Audience Type"
                                        type="text"
                                        size="md"
                                        direction="column"
                                        value={formData.audienceType}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                            handleInputChange('audienceType', e.target.value)
                                        }
                                        name="audienceType"
                                        description="e.g., engineers, founders"
                                    />
                                </div>

                                <div className="pt-4">
                                    <a
                                        href={isFormValid ? generateGitHubIssueURL() : '#'}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`w-full inline-flex items-center justify-center px-4 py-2 text-sm font-bold rounded-lg border transition-colors ${
                                            isFormValid
                                                ? 'bg-orange text-black border-button hover:bg-orange-dark hover:text-black dark:bg-orange dark:text-black dark:hover:text-black cursor-pointer'
                                                : 'bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed'
                                        }`}
                                        onClick={!isFormValid ? (e) => e.preventDefault() : undefined}
                                    >
                                        Create GitHub Issue
                                        <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 24 24">
                                            <path
                                                fillRule="evenodd"
                                                d="M7.995 5.75a.75.75 0 0 1 .75-.75h8.505c.966 0 1.75.784 1.75 1.75v9.496a.75.75 0 0 1-1.5 0V7.56L7.03 18.03a.75.75 0 0 1-1.06-1.061L16.44 6.5H8.744a.75.75 0 0 1-.75-.75Z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </a>
                                    {!isFormValid && (
                                        <p className="text-sm text-red mt-2">
                                            Please fill in name, email, and city to continue.
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recommendations Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-accent border border-primary p-6 rounded-lg sticky top-4">
                            <h3 className="text-xl font-bold mb-4">Recommendations</h3>
                            {recommendations.length > 0 ? (
                                <div className="space-y-4">
                                    {recommendations.map((rec, index) => (
                                        <div key={index} className="text-sm bg-primary/5 p-3 rounded">
                                            {rec}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm opacity-70">
                                    Fill out the form to see personalized recommendations based on past events.
                                </p>
                            )}

                            <div className="mt-6 pt-6 border-t border-primary">
                                <h4 className="font-bold mb-2 text-sm">Past Events</h4>
                                <div className="text-xs opacity-70 space-y-2 max-h-96 overflow-y-auto">
                                    {pastEvents.map((event, index) => (
                                        <div key={index} className="pb-2 border-b border-primary/20">
                                            <p className="font-semibold mb-1">{event.name}</p>
                                            <p>
                                                {event.city} | {event.format} | {event.size} attendees
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default EventGenerator
