import Term from './terms'

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
    ReportFigure,
    ScoutFigure,
    ScreenshotFigure,
    SkillFigure,
    TraceFigure,
    TriggerGroupFigure,
} from './figures'
import { Contents, Enable, Eyebrow, Frontispiece, SeeAlso, SeeFig, Watches, proseComponents } from './bookPieces'
import UnterFigure from './UnterFigure'
import { AskAI, CTA, ScannerTemplate, ViewRecording, ViewRecordings } from './UIButton'

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
    RedirectLoopFigure,
    LoopFigure,
    UnterFigure,
    Watches,
    Enable,
    Action,
    Callout,
    Setup,
    Contents,
    SeeAlso,
    ViewRecordings,
    ViewRecording,
    AskAI,
    CTA,
    ScannerTemplate,
    Term,
    ...proseComponents,
}
