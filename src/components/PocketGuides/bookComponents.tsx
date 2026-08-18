import Term from 'components/SelfDrivingInbox/terms'

import ReaderWrapper, { LeftPage, RightPage } from './ReaderWrapper'
import {
    AnatomyFigure,
    DetailFigure,
    DivergenceFigure,
    Fig,
    LeakFigure,
    LedgerFigure,
    LoopFigure,
    PersonsModalFigure,
    RedirectLoopFigure,
    ReportFigure,
    ScoutFigure,
    ScreenshotFigure,
    TriggerGroupFigure,
} from './figures'
import { Contents, Enable, Eyebrow, Frontispiece, SeeAlso, SeeFig, Setup, Watches, proseComponents } from './bookPieces'
import SkillFile from './SkillFile'
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
    LedgerFigure,
    LeakFigure,
    ScoutFigure,
    PersonsModalFigure,
    ScreenshotFigure,
    TriggerGroupFigure,
    RedirectLoopFigure,
    LoopFigure,
    Watches,
    Enable,
    Setup,
    Contents,
    SeeAlso,
    ViewRecordings,
    ViewRecording,
    AskAI,
    CTA,
    ScannerTemplate,
    SkillFile,
    Term,
    ...proseComponents,
}
