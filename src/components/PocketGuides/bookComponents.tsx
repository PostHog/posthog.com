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

import Action, { Setup } from './Action'
import Callout from './Callout'
import ReaderWrapper, { LeftPage, RightPage } from './ReaderWrapper'
import {
    AnatomyFigure,
    DetailFigure,
    DivergenceFigure,
    EvalRunsFigure,
    ExampleFigure,
    ExternalIssueFigure,
    FactorSplitFigure,
    Fig,
    IssueSpikeFigure,
    LeakFigure,
    LedgerFigure,
    LoopFigure,
    PersonsModalFigure,
    RedirectLoopFigure,
    ReleaseConditionsFigure,
    ReportFigure,
    ScoutFigure,
    StackTraceFigure,
    TimelineFigure,
    ScreenshotFigure,
    SkillFigure,
    TraceFigure,
    TriggerGroupFigure,
    VariantsFigure,
} from './figures'
import { Enable, Eyebrow, Frontispiece, SeeAlso, SeeFig, Watches, proseComponents } from './bookPieces'
import { AskAI, CTA, Prompt, ScannerTemplate, ViewRecording, ViewRecordings } from './UIButton'

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
    LessonFooter,
    ReportFigure,
    AnatomyFigure,
    DetailFigure,
    DivergenceFigure,
    EvalRunsFigure,
    ExampleFigure,
    ExternalIssueFigure,
    FactorSplitFigure,
    LedgerFigure,
    LeakFigure,
    IssueSpikeFigure,
    ScoutFigure,
    StackTraceFigure,
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
    Prompt,
    CTA,
    ScannerTemplate,
    Term,
    ...proseComponents,
}
