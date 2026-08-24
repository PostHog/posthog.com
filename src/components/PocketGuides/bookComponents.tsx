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
    ReportFigure,
    ScoutFigure,
    SkillFigure,
    TraceFigure,
} from './figures'
import { Contents, Enable, Eyebrow, SeeAlso, SeeFig, Watches, proseComponents } from './bookPieces'

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
    LoopFigure,
    Watches,
    Enable,
    Action,
    Callout,
    Setup,
    Contents,
    SeeAlso,
    Term,
    ...proseComponents,
}
