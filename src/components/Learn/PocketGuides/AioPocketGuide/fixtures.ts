import { stays } from '@posthog/twig-components/catalog'
import type { CompactChatMessage } from '@posthog/twig-components/compact-ai-chat'

export const forest = stays.find((stay) => stay.id === 'stay-01')!
export const beach = stays.find((stay) => stay.id === 'stay-02')!
export const city = stays.find((stay) => stay.id === 'stay-03')!
export const forestRequest = 'Find me a forest getaway for four.'
export const beachRequest = 'Actually, I’d prefer somewhere with beach access.'
export const kitchenRequest = 'Does it have a full kitchen?'
export const cityRequest = 'Find me a city stay for four.'
export const cancellationRequest = 'I changed my mind. Can I get a full refund if I cancel 1 day before arrival?'
export const heatingRequest =
    'The heating is broken and cannot be repaired. I’m freezing and frustrated. Can you refund my stay?'
export const refusal =
    'A full refund requires at least 7 days’ notice before arrival. This request is inside that window, so I can’t offer a full refund.'
export const fixedRefund =
    'The usual 7 days’ notice rule does not apply when an essential amenity cannot be repaired promptly. Since your heating is broken and cannot be repaired, we can offer relocation or a refund.'
export const cityAnswer =
    'There isn’t a city stay for four in Twig’s current catalog. Try a different setting or a smaller group.'
export const conversation: CompactChatMessage[] = [
    { id: 'forest-request', speaker: 'visitor', content: forestRequest },
    {
        id: 'forest-answer',
        speaker: 'assistant',
        content: 'Adiron-shack has room for four.',
    },
    { id: 'beach-request', speaker: 'visitor', content: beachRequest },
    {
        id: 'beach-answer',
        speaker: 'assistant',
        content: '',
        recommendation: beach,
    },
    { id: 'kitchen-request', speaker: 'visitor', content: kitchenRequest },
    { id: 'kitchen-answer', speaker: 'assistant', content: 'Yes – Flamingo’s Envy has a full kitchen.' },
]
export const forestMessages: CompactChatMessage[] = [
    conversation[0],
    { ...conversation[1], content: 'Adiron-shack has room for four in the Adirondacks.', recommendation: forest },
]

/** Exact replies and catalog reasons observed on Twig for these three messages. */
const previewConversation: CompactChatMessage[] = [
    conversation[0],
    {
        id: 'preview-forest',
        speaker: 'assistant',
        content: 'Adiron-shack looks like a fit.',
        recommendation: forest,
        recommendationDescription: 'Adirondacks, New York. Room for 4.',
    },
    conversation[2],
    {
        id: 'preview-beach',
        speaker: 'assistant',
        content: "Flamingo's Envy looks like a fit.",
        recommendation: beach,
        recommendationDescription: 'Gold Coast, Queensland, Australia. Room for 5. Includes beach access.',
    },
    conversation[4],
    {
        id: 'preview-kitchen',
        speaker: 'assistant',
        content: "Flamingo's Envy looks like a fit.",
        recommendation: beach,
        recommendationDescription:
            'Gold Coast, Queensland, Australia. Room for 5. Includes beach access and full kitchen.',
    },
]
export function previewMessages(shown: number): CompactChatMessage[] {
    const visible = previewConversation.slice(0, shown)
    const latest = visible.map((message) => Boolean(message.recommendation)).lastIndexOf(true)
    return visible.map((message, index) => ({
        ...message,
        recommendation: index === latest ? message.recommendation : undefined,
    }))
}

export function cityMessages(fixed = true): CompactChatMessage[] {
    return [
        { id: 'city-request', speaker: 'visitor', content: cityRequest },
        {
            id: 'city-answer',
            speaker: 'assistant',
            content: fixed ? cityAnswer : 'Le Nid Chic is a city stay for your group of four.',
            recommendation: fixed ? undefined : city,
        },
    ]
}
export function supportMessages(heating = true, fixed = false): CompactChatMessage[] {
    return [
        { id: 'support-request', speaker: 'visitor', content: heating ? heatingRequest : cancellationRequest },
        { id: 'support-answer', speaker: 'assistant', content: heating && fixed ? fixedRefund : refusal },
    ]
}

/** Local teaching data, not production measurements. Integer microdollars avoid rounding drift. */
export const usage = [
    {
        name: 'Forest',
        input: { title: 'Adiron-shack', capacity: 4 },
        inputTokens: 800,
        outputTokens: 80,
        cost: 1200,
        duration: '0.9s',
    },
    {
        name: 'Beach',
        input: { guests: 4, title: 'Flamingo’s Envy', capacity: 5 },
        inputTokens: 1200,
        outputTokens: 90,
        cost: 1650,
        duration: '1.1s',
    },
    {
        name: 'Kitchen',
        input: {
            guests: 4,
            selectedStayId: 'stay-02',
            catalog: [{ title: 'Flamingo’s Envy', amenities: ['Full kitchen'] }],
        },
        inputTokens: 1600,
        outputTokens: 60,
        cost: 1900,
        duration: '0.7s',
    },
]
export const capacityCode = `let guests := ifNull(properties.requested_guests, -1)
let capacity := ifNull(properties.stay_capacity, -1)

if (guests < 0 or capacity < 0) {
    print('Missing guest count or catalog capacity')
    return null
}

print('Guests: ' + toString(guests))
print('Capacity: ' + toString(capacity))
return capacity >= guests`
export const capacitySamples = [
    { label: 'City', stay: city, requested_guests: 4, stay_capacity: 2 },
    { label: 'Forest', stay: forest, requested_guests: 4, stay_capacity: 4 },
    { label: 'Missing data', stay: forest, requested_guests: 4, stay_capacity: null },
]
export function evaluateCapacity(guests: number | null, capacity: number | null): boolean | null {
    if (guests == null || capacity == null || guests < 0 || capacity < 0) return null
    return capacity >= guests
}
export const recommendation = {
    visitor: 'visitor-01',
    stay: 'stay-02',
    generation: 'beach-answer',
    trace: 'beach-01',
    session: 'trip-01',
}
export function recommendationEvents(saved: boolean) {
    return [
        { event: 'recommendation_opened', time: '12:04', ...recommendation },
        { event: 'stay_viewed', time: '12:04', ...recommendation },
        ...(saved ? [{ event: 'stay_saved', time: '12:07', ...recommendation }] : []),
    ]
}

/** Prompt names and versions chosen by Twig’s engineers for this guide. */
export const supportPromptName = 'support-refunds'
export const supportPromptVersions = [
    'Use the cancellation policy to answer refund requests.',
    'Apply the broken-amenity exception before the ordinary cancellation window.',
]
export const cancellationTemplate = `Use Twig’s refund policy to answer the visitor.
Days before arrival: {{days_before_arrival}}`
export function renderCancellationPrompt(days: number): string {
    return cancellationTemplate.replace('{{days_before_arrival}}', String(days))
}

/** Illustrative seven-day cohort; saves match the same recommendation within 30 minutes. */
export const outcomeFunnel = [
    { label: 'Opened recommendation', event: 'recommendation_opened', visitors: 120 },
    { label: 'Saved stay', event: 'stay_saved', visitors: 48 },
]
