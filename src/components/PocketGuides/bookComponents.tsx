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
