// Components every MDX page can use without importing them. Templates pass these to MDXProvider.

import AboutPostHog from './components/AboutPostHog'
import CountriesWeHireIn from './components/AMCharts/CountriesWeHireIn'
import { ArrayCTA } from './components/ArrayCTA'
import AskAIInput from './components/AskAIInput'
import AskMax from './components/AskMax'
import { BasicHedgehogImage } from './components/BasicHedgehogImage'
import { BorderWrapper } from './components/BorderWrapper'
import { BrandLogos } from './components/BrandLogos'
import { CallToAction } from './components/CallToAction'
import { Caption } from './components/Caption'
import { HearAboutUsCarousel } from './components/CardStackCarousel/HearAboutUsCarousel'
import CloudinaryImage from './components/CloudinaryImage'
import { ComparisonTable } from './components/ComparisonTable'
import ProductComparisonTable from './components/ProductComparisonTable'
import ProductList from './components/ProductList'
import Snippet from '../contents/docs/integrate/snippet.mdx'
import { CompensationCalculator } from './components/CompensationCalculator'
import { Step, Steps } from './components/Docs/Steps'
import EmbeddedSurvey from './components/Docs/EmbeddedSurvey'
import { Drawer } from './components/Drawer'
import { Emoji } from './components/Emoji'
import { FeatureAvailability } from './components/FeatureAvailability'
import FeatureOwnershipTable from './components/FeatureOwnershipTable'
import { FormulaScreenshot } from './components/FormulaScreenshot'
import { GDPRForm } from './components/GDPRForm'
import { AdvisoryAnchor } from './components/Heading'
import { HiddenSection } from './components/HiddenSection'
import ImageSlider from './components/ImageSlider'
import Link from './components/Link'
import LoopGame from './components/LoopGame'
import List from './components/List'
import { LPCTA } from './components/LPCTA'
import { MaxCTA } from './components/MaxCTA'
import OSButton from './components/OSButton'
import { OSQuote } from './components/OSQuote'
import { OverflowXSection } from './components/OverflowXSection'
import { Quote } from './components/Pricing/Quote'
import PricingCalculator from './components/Pricing/PricingCalculator/Embedded'
import { PrivateLink } from './components/PrivateLink'
import { ProductOS } from './components/Product/ProductOS'
import { FAQ } from './components/Products/FAQ'
import { Feature } from './components/Products/Feature'
import { Marquee } from './components/Products/Marquee'
import { PairsWith } from './components/Products/PairsWith'
import { Question } from './components/Products/Question'
import { SmoothScroll } from './components/Products/SmoothScroll'
import { Subfeature } from './components/Products/Subfeature'
import { TextCard } from './components/Products/TextCard'
import { TutorialCard } from './components/Products/TutorialCard'
import { ProductScreenshot } from './components/ProductScreenshot'
import { ProductVideo } from './components/ProductVideo'
import { Quote2 } from './components/Quote2'
import { RainbowText } from './components/RainbowText'
import SmallTeam from './components/SmallTeam'
import { Squeak } from './components/Squeak'
import { StarRepoButton } from './components/StarRepoButton'
import TaskOwnershipTable from './components/TaskOwnershipTable'
import TeamMember from './components/TeamMember'
import { TracksCTA } from './components/TracksCTA'
import { Tweet } from './components/Tweet'
import { CalloutBox } from './components/Docs/CalloutBox'
import SolvedQuestions from './components/Docs/SolvedQuestions'
import WistiaEmbed from './components/WistiaEmbed'
import WizardCommand from './components/WizardCommand'
import WizardCTA from './components/WizardCTA'

export const shortcodes = {
    AboutPostHog,
    ArrayCTA,
    BasicHedgehogImage,
    BorderWrapper,
    BrandLogos,
    CallToAction,
    CalloutBox,
    Caption,
    HearAboutUsCarousel,
    CloudinaryImage,
    ImageSlider,
    ComparisonTable,
    ProductComparisonTable,
    ProductList,
    Snippet,
    CompensationCalculator,
    Drawer,
    Emoji,
    FeatureAvailability,
    FormulaScreenshot,
    GDPRForm,
    AdvisoryAnchor,
    HiddenSection,
    LPCTA,
    List,
    OverflowXSection,
    Quote,
    PricingCalculator,
    OSQuote,
    OSButton,
    Link,
    LoopGame,
    PrivateLink,
    ProductOS,
    ProductScreenshot,
    ProductVideo,
    FAQ,
    Feature,
    Marquee,
    PairsWith,
    Question,
    SmoothScroll,
    Subfeature,
    TextCard,
    TutorialCard,
    Quote2,
    Squeak,
    StarRepoButton,
    TracksCTA,
    Tweet,
    MaxCTA,
    SmallTeam,
    TeamMember,
    Steps,
    Step,
    AskAIInput,
    AskMax,
    CountriesWeHireIn,
    FeatureOwnershipTable,
    TaskOwnershipTable,
    RainbowText,
    SolvedQuestions,
    WistiaEmbed,
    WizardCommand,
    WizardCTA,
    EmbeddedSurvey,
    // Wraps the parts of a CDP docs page that the CDP index (Product/Pipelines) hides; it provides its
    // own `HideOnCDPIndex` that renders nothing. On the docs page itself, the content shows.
    HideOnCDPIndex: ({ children }) => children,
}
