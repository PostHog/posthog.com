import React from 'react'
import { DecisionTree } from 'components/Docs/DecisionTree'
import type { DecisionTreeQuestion, DecisionTreeRecommendation } from 'components/Docs/DecisionTree'

const questions: DecisionTreeQuestion[] = [
    {
        id: 'version',
        question: 'Pick the right guide for you',
        description: 'Check your package.json file for the react-router version.',
        options: [
            { value: 'v7', label: '7.x.x (React Router V7)' },
            { value: 'v6', label: '6.x.x (React Router V6)' },
        ],
    },
    {
        id: 'v7-mode',
        question: 'Which React Router V7 mode are you using?',
        description: 'How are your routes configured and defined?',
        condition: (answers) => answers.version === 'v7',
        options: [
            { value: 'framework', label: 'Using react-router.config.ts' },
            { value: 'data', label: 'Using <RouterProvider>' },
            { value: 'declarative', label: 'Using <BrowserRouter>' },
        ],
    },
]

const getRecommendation = (answers: Record<string, string>): DecisionTreeRecommendation => {
    if (answers.version === 'v6') {
        return {
            title: 'React Router V6',
            path: '/docs/libraries/react-router/react-router-v6',
            reason: 'You are using React Router V6. Follow the React Router V6 guide for setup instructions.',
        }
    }

    if (answers['v7-mode'] === 'framework') {
        return {
            title: 'React Router V7 - Framework mode',
            path: '/docs/libraries/react-router/react-router-v7-framework-mode',
            reason: 'You are using React Router V7 in framework mode (Remix V3). This is the default mode and functions as an SSR framework.',
        }
    }

    if (answers['v7-mode'] === 'data') {
        return {
            title: 'React Router V7 - Data mode',
            path: '/docs/libraries/react-router/react-router-v7-data-mode',
            reason: 'You are using React Router V7 in data mode. This mode is for building SPAs with APIs like loader, action, and useFetcher.',
        }
    }

    if (answers['v7-mode'] === 'declarative') {
        return {
            title: 'React Router V7 - Declarative mode',
            path: '/docs/libraries/react-router/react-router-v7-declarative-mode',
            reason: 'You are using React Router V7 in declarative mode. This mode is for building SPAs with basic routing.',
        }
    }

    return {
        title: 'React Router setup',
        path: '/docs/libraries/react-router',
        reason: 'Follow the React Router docs to identify your version and mode.',
    }
}

const ReactRouterDecisionTree: React.FC = () => {
    return <DecisionTree questions={questions} getRecommendation={getRecommendation} />
}

export default ReactRouterDecisionTree
