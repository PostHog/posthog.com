import {
    IconActivity,
    IconCursorClick,
    IconDatabase,
    IconDecisionTree,
    IconEndpoints,
    IconEye,
    IconFlask,
    IconGanttChart,
    IconGraph,
    IconLlmAnalytics,
    IconMessage,
    IconPeople,
    IconPieChart,
    IconPlug,
    IconRewindPlay,
    IconSparkles,
    IconSupport,
    IconToggle,
    IconTrends,
    IconWarning,
} from '@posthog/icons'
import { getTool } from '../../data/tools'

/**
 * Name, slug, icon, and color for the taskbar menus.
 * This file does not import product pages.
 */
export const taskbarProducts = [
    { ...getTool('product_analytics'), Icon: IconGraph, color: 'blue' },
    { ...getTool('web_analytics'), Icon: IconPieChart, color: 'green-2' },
    { ...getTool('ai_observability'), Icon: IconLlmAnalytics, color: 'purple' },
    { ...getTool('session_replay'), Icon: IconRewindPlay, color: 'yellow' },
    { ...getTool('replay_vision'), Icon: IconEye, color: 'yellow' },
    { ...getTool('feature_flags'), Icon: IconToggle, color: 'seagreen' },
    { ...getTool('experiments'), Icon: IconFlask, color: 'purple' },
    { ...getTool('error_tracking'), Icon: IconWarning, color: 'orange' },
    { ...getTool('logs'), Icon: IconActivity, color: 'red' },
    { ...getTool('traces'), Icon: IconGanttChart, color: 'blue', docsSlug: 'distributed-tracing' },
    { ...getTool('data_warehouse'), Icon: IconDatabase, color: 'purple', docsSlug: 'data-warehouse' },
    { ...getTool('endpoints'), Icon: IconEndpoints, color: 'teal' },
    { ...getTool('workflows_emails'), Icon: IconDecisionTree, color: 'teal' },
    { ...getTool('surveys'), Icon: IconMessage, color: 'salmon' },
    { ...getTool('support'), Icon: IconSupport, color: 'blue' },
    { ...getTool('heatmaps'), Icon: IconCursorClick, color: 'green' },
    { ...getTool('group_analytics'), Icon: IconPeople, color: 'teal' },
    { ...getTool('mcp_analytics'), Icon: IconPlug, color: 'blue' },
    { ...getTool('posthog_ai'), Icon: IconSparkles, color: 'blue' },
    { ...getTool('metrics'), Icon: IconTrends, color: 'green' },
]
