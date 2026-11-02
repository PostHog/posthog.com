import React, { lazy, Suspense } from 'react'
import { RenderInClient } from '../RenderInClient'
import AioChapterFooter from './AioPocketGuide/ChapterFooter'
import FigureErrorBoundary from './AioPocketGuide/FigureErrorBoundary'
import { ProductVideo } from '../ProductVideo'

import Term from './terms'
import LessonFooter from './LessonFooter'
import TwigFilterFigure from './TwigFilterFigure'
import TwigEventFigure from './TwigEventFigure'
import { AutocaptureFigure, FilterPropertiesFigure, DestinationChartFigure } from './ProductAnalyticsExhibits'
import {
    IdentifySavedStayFigure,
    ResetIdentityFigure,
    SessionGroupingFigure,
    SessionReplayLinkFigure,
} from './ProductAnalyticsIdentityExhibits'
import {
    FilterUsersTrendFigure,
    BookingStepsFigure,
    BookingFunnelFigure,
} from './ProductAnalyticsTrendsFunnelsExhibits'
import {
    BookingRetentionFigure,
    RepeatBookingFigure,
    SavedCohortRetentionFigure,
    SavedStayJourneyFigure,
} from './ProductAnalyticsRetentionExhibits'
import {
    BookingDashboardFigure,
    FindingStaysDashboardFigure,
    ReturningGuestsDashboardFigure,
} from './ProductAnalyticsDashboardExhibits'
import ProductAnalyticsDashboardNextSteps from './ProductAnalyticsDashboardNextSteps'

import Action, { Setup } from './Action'
import Callout from './Callout'
import ReaderWrapper, { LeftPage, RightPage } from './ReaderWrapper'
import {
    AnatomyFigure,
    DetailFigure,
    DivergenceFigure,
    EvalRunsFigure,
    ExampleFigure,
    FactorSplitFigure,
    Fig,
    LeakFigure,
    LedgerFigure,
    LoopFigure,
    PersonsModalFigure,
    RedirectLoopFigure,
    ReleaseConditionsFigure,
    ReportFigure,
    ScoutFigure,
    ScreenshotFigure,
    SkillFigure,
    TraceFigure,
    TriggerGroupFigure,
    VariantsFigure,
} from './figures'
import { Enable, Eyebrow, Frontispiece, SeeAlso, SeeFig, Watches, proseComponents } from './bookPieces'
import { AskAI, CTA, ScannerStarter, ViewRecording, ViewRecordings } from './UIButton'

// Keep AIO's Twig code, styles, and photos out of other guide downloads.
function aioFigure(name: keyof typeof import('./AioPocketGuide/figures')): () => JSX.Element {
    const Component = lazy(() => import('./AioPocketGuide/figures').then((figures) => ({ default: figures[name] })))
    return function AioFigure(): JSX.Element {
        return (
            <RenderInClient
                waitForFlags={false}
                render={() => (
                    <FigureErrorBoundary>
                        <Suspense fallback={null}>
                            <Component />
                        </Suspense>
                    </FigureErrorBoundary>
                )}
            />
        )
    }
}

const AioConversationPreview = aioFigure('AioConversationPreview')
const AioSupportConversationPreview = aioFigure('AioSupportConversationPreview')
const AioRequestFigure = aioFigure('AioRequestFigure')
const AioConversationFigure = aioFigure('AioConversationFigure')
const AioSearchFixFigure = aioFigure('AioSearchFixFigure')
const AioOnlineEvaluationFigure = aioFigure('AioOnlineEvaluationFigure')
const AioCodeEvaluationFigure = aioFigure('AioCodeEvaluationFigure')
const AioDatasetFigure = aioFigure('AioDatasetFigure')
const AioPromptComparisonFigure = aioFigure('AioPromptComparisonFigure')
const AioPromptVersionFigure = aioFigure('AioPromptVersionFigure')
const AioPromptTemplateFigure = aioFigure('AioPromptTemplateFigure')
const AioUsageFigure = aioFigure('AioUsageFigure')
const AioLatencyFigure = aioFigure('AioLatencyFigure')
const AioRecommendationFigure = aioFigure('AioRecommendationFigure')
const AioOutcomeFunnelFigure = aioFigure('AioOutcomeFunnelFigure')
const AioHumanReviewFigure = aioFigure('AioHumanReviewFigure')

export { EntryProvider } from './bookContext'

/**
 * The book's MDX vocabulary, assembled: the reader wrapper, the authoring markers, the figures,
 * the page furniture, and the prose defaults. One map so every page renders the same book.
 * The pieces live one file per concern – see the folder README.
 */
export const bookMdxComponents = {
    wrapper: ReaderWrapper,
    LeftPage,
    RightPage,
    SeeFig,
    Eyebrow,
    Frontispiece,
    Fig,
    TwigFilterFigure,
    TwigEventFigure,
    AutocaptureFigure,
    FilterPropertiesFigure,
    DestinationChartFigure,
    SessionGroupingFigure,
    IdentifySavedStayFigure,
    ResetIdentityFigure,
    SessionReplayLinkFigure,
    FilterUsersTrendFigure,
    BookingStepsFigure,
    BookingFunnelFigure,
    RepeatBookingFigure,
    BookingRetentionFigure,
    SavedStayJourneyFigure,
    SavedCohortRetentionFigure,
    BookingDashboardFigure,
    FindingStaysDashboardFigure,
    ReturningGuestsDashboardFigure,
    ProductAnalyticsDashboardNextSteps,
    LessonFooter,
    AioChapterFooter,
    AioConversationPreview,
    AioSupportConversationPreview,
    AioRequestFigure,
    AioConversationFigure,
    AioSearchFixFigure,
    AioOnlineEvaluationFigure,
    AioCodeEvaluationFigure,
    AioDatasetFigure,
    AioPromptComparisonFigure,
    AioPromptVersionFigure,
    AioPromptTemplateFigure,
    AioUsageFigure,
    AioLatencyFigure,
    AioRecommendationFigure,
    AioOutcomeFunnelFigure,
    AioHumanReviewFigure,

    ReportFigure,
    AnatomyFigure,
    DetailFigure,
    DivergenceFigure,
    EvalRunsFigure,
    ExampleFigure,
    FactorSplitFigure,
    LedgerFigure,
    LeakFigure,
    ScoutFigure,
    SkillFigure,
    TraceFigure,
    PersonsModalFigure,
    ScreenshotFigure,
    TriggerGroupFigure,
    ReleaseConditionsFigure,
    VariantsFigure,
    RedirectLoopFigure,
    LoopFigure,
    Watches,
    Enable,
    Action,
    Callout,
    ProductVideo,
    Setup,
    SeeAlso,
    ViewRecordings,
    ViewRecording,
    AskAI,
    CTA,
    ScannerStarter,
    Term,
    ...proseComponents,
}
