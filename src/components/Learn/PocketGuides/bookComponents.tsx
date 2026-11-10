import React, { lazy, Suspense } from 'react'
import { RenderInClient } from '../../RenderInClient'
import AioChapterFooter from './AioPocketGuide/ChapterFooter'
import FigureErrorBoundary from './AioPocketGuide/FigureErrorBoundary'
import { ProductVideo } from '../../ProductVideo'

import Term from './terms'
import LessonFooter from './LessonFooter'
import TwigFilterFigure from '../TwigExhibits/TwigFilterFigure'
import TwigEventFigure from '../TwigExhibits/TwigEventFigure'
import {
    AutocaptureFigure,
    FilterPropertiesFigure,
    DestinationChartFigure,
} from '../TwigExhibits/ProductAnalyticsExhibits'
import {
    AutocapturedExceptionFigure,
    FingerprintCaptureFigure,
    TripDetailsErrorFigure,
} from '../TwigExhibits/ErrorTrackingExhibits'
import {
    IdentifySavedStayFigure,
    ResetIdentityFigure,
    SessionGroupingFigure,
    SessionReplayLinkFigure,
} from '../TwigExhibits/ProductAnalyticsIdentityExhibits'
import {
    FilterUsersTrendFigure,
    BookingStepsFigure,
    BookingFunnelFigure,
} from '../TwigExhibits/ProductAnalyticsTrendsFunnelsExhibits'
import {
    BookingRetentionFigure,
    RepeatBookingFigure,
    SavedCohortRetentionFigure,
    SavedStayJourneyFigure,
} from '../TwigExhibits/ProductAnalyticsRetentionExhibits'
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
    AssignmentRuleFigure,
    SqlBarChartFigure,
    DetailFigure,
    DivergenceFigure,
    EvalRunsFigure,
    ExampleFigure,
    ExternalIssueFigure,
    FactorSplitFigure,
    Fig,
    IssueSpikeFigure,
    IssueListFigure,
    LeakFigure,
    LedgerFigure,
    LoopFigure,
    PersonsModalFigure,
    RedirectLoopFigure,
    ReleaseConditionsFigure,
    ReportFigure,
    ScoutFigure,
    StackTraceFigure,
    StackTraceCompareFigure,
    TimelineFigure,
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
    AutocapturedExceptionFigure,
    TripDetailsErrorFigure,
    FingerprintCaptureFigure,
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
    AssignmentRuleFigure,
    SqlBarChartFigure,
    DetailFigure,
    DivergenceFigure,
    EvalRunsFigure,
    ExampleFigure,
    ExternalIssueFigure,
    FactorSplitFigure,
    LedgerFigure,
    LeakFigure,
    IssueSpikeFigure,
    IssueListFigure,
    ScoutFigure,
    StackTraceFigure,
    StackTraceCompareFigure,
    TimelineFigure,
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
