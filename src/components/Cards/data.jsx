import React from 'react'
import CloudinaryImage from 'components/CloudinaryImage'

export const PostHogAIExampleCards = [
    {
        top: 'What changed across my product this week?',
        bottom: (
            <>
                PostHog AI connects every data point to <strong>see the full picture.</strong>
            </>
        ),
        color: '#FFD89E',
        Image: (
            <CloudinaryImage
                width={132}
                src="https://res.cloudinary.com/dmukukwp6/image/upload/ai_magic_d9cff23d39.png"
            />
        ),
        // imageClassName: 'w-[calc(100%_+_5rem)] -mt-4',
    },
    {
        top: 'Find sessions where users got stuck',
        bottom: (
            <>
                PostHog AI can <strong>summarize recordings</strong> and suggest next steps.
            </>
        ),
        color: '#DCE7D0',
        Image: (
            <CloudinaryImage
                width={154}
                src="https://res.cloudinary.com/dmukukwp6/image/upload/recorder_replay_camera_playback_video_bec1d778fd.png"
            />
        ),
        imageClassName: '-mt-8',
    },
    {
        top: 'Build a dashboard for onboarding retention',
        bottom: (
            <>
                PostHog AI builds dashboards and insights <strong>from plain English.</strong>
            </>
        ),
        color: '#D9E1FC',
        Image: (
            <CloudinaryImage
                width={174}
                src="https://res.cloudinary.com/dmukukwp6/image/upload/dashboards_analyst_trends_insights_9f8aa9c1f3.png"
            />
        ),
        // imageClassName: 'w-[240px] -mt-4',
    },
    {
        top: 'Analyze LLM token usage over the past 7 days',
        bottom: (
            <>
                PostHog AI helps you <strong>build better AI products.</strong> (How meta.)
            </>
        ),
        color: '#FDBAF2',
        Image: (
            <CloudinaryImage
                width={167}
                src="https://res.cloudinary.com/dmukukwp6/image/upload/robot_science_scientist_engineer_ai_llm_56b6755e53.png"
            />
        ),
        // imageClassName: 'w-full mt-4',
    },
    {
        top: 'Find the most common user path from the blog',
        bottom: (
            <>
                PostHog AI <strong>analyzes web traffic</strong> faster than you can say "I miss GA3."
            </>
        ),
        color: '#FFD89E',
        Image: (
            <CloudinaryImage
                width={96}
                src="https://res.cloudinary.com/dmukukwp6/image/upload/donut_chart_pie_insight_analyst_ef600d50f2.png"
                imgClassName="w-[150px]"
            />
        ),
        imageClassName: '-mt-12',
    },
    {
        top: "What's the right SQL syntax for this query?",
        bottom: (
            <>
                PostHog AI <strong>writes and debugs SQL queries</strong> (so you don’t have to).
            </>
        ),
        color: '#DCE7D0',
        Image: (
            <CloudinaryImage
                width={125}
                src="https://res.cloudinary.com/dmukukwp6/image/upload/database_db_sql_53db9b69d6.png"
            />
        ),
        imageClassName: '-mt-8',
    },
    {
        top: 'Find the top 10 orgs by number of active users',
        bottom: (
            <>
                PostHog AI joins with <strong>external data sources</strong> for even more context.
            </>
        ),
        color: '#D9E1FC',
        Image: (
            <CloudinaryImage
                width={195}
                src="https://res.cloudinary.com/dmukukwp6/image/upload/desk_laptop_employee_fb674180cb.png"
            />
        ),
        imageClassName: '-mt-8',
    },
    {
        top: 'How do I set up a feature flag?',
        bottom: (
            <>
                PostHog AI is an expert on <strong>using PostHog products.</strong> (Duh!)
            </>
        ),
        color: '#FDBAF2',
        Image: (
            <CloudinaryImage
                width={140}
                src="https://res.cloudinary.com/dmukukwp6/image/upload/flag_flags_toggle_celebrate_e2224e0723.png"
                imgClassName="w-[160px]"
            />
        ),
        imageClassName: '-rotate-3',
    },
]
