import type { ComponentDoc } from '../types'
import { doc as accordion } from './accordion'
import { doc as alertDialog } from './alert-dialog'
import { doc as autocomplete } from './autocomplete'
import { doc as avatar } from './avatar'
import { doc as badge } from './badge'
import { doc as banner } from './banner'
import { doc as breadcrumbs } from './breadcrumbs'
import { doc as button } from './button'
import { doc as buttonLink } from './button-link'
import { doc as card } from './card'
import { doc as carousel } from './carousel'
import { doc as chart } from './chart'
import { doc as checkbox } from './checkbox'
import { doc as chip } from './chip'
import { doc as choicebox } from './choicebox'
import { doc as codeBlock } from './code-block'
import { doc as collapsible } from './collapsible'
import { doc as combobox } from './combobox'
import { doc as contextMenu } from './context-menu'
import { doc as copyButton } from './copy-button'
import { doc as dialog } from './dialog'
import { doc as drawer } from './drawer'
import { doc as emphasis } from './emphasis'
import { doc as emptyState } from './empty-state'
import { doc as featureTabs } from './feature-tabs'
import { doc as field } from './field'
import { doc as floatingButton } from './floating-button'
import { doc as form } from './form'
import { doc as foundations } from './foundations'
import { doc as gallery } from './gallery'
import { doc as gradientText } from './gradient-text'
import { doc as kbd } from './kbd'
import { doc as marquee } from './marquee'
import { doc as menu } from './menu'
import { doc as menubar } from './menubar'
import { doc as middleTruncate } from './middle-truncate'
import { doc as navigationMenu } from './navigation-menu'
import { doc as note } from './note'
import { doc as numberField } from './number-field'
import { doc as pagination } from './pagination'
import { doc as popover } from './popover'
import { doc as previewCard } from './preview-card'
import { doc as progress } from './progress'
import { doc as radio } from './radio'
import { doc as relativeTime } from './relative-time'
import { doc as rollingText } from './rolling-text'
import { doc as roughAnnotation } from './rough-annotation'
import { doc as scrollArea } from './scroll-area'
import { doc as searchInput } from './search-input'
import { doc as select } from './select'
import { doc as separator } from './separator'
import { doc as skeleton } from './skeleton'
import { doc as slider } from './slider'
import { doc as snippet } from './snippet'
import { doc as spinner } from './spinner'
import { doc as splitButton } from './split-button'
import { doc as switchDoc } from './switch'
import { doc as table } from './table'
import { doc as tabs } from './tabs'
import { doc as textarea } from './textarea'
import { doc as toast } from './toast'
import { doc as toggle } from './toggle'
import { doc as toolbar } from './toolbar'
import { doc as tooltip } from './tooltip'
import { doc as tree } from './tree'
import { doc as typography } from './typography'
import { doc as video } from './video'

export const docs: Record<string, ComponentDoc> = {
    accordion: accordion,
    'alert-dialog': alertDialog,
    autocomplete: autocomplete,
    avatar: avatar,
    badge: badge,
    banner: banner,
    breadcrumbs: breadcrumbs,
    button: button,
    'button-link': buttonLink,
    card: card,
    carousel: carousel,
    chart: chart,
    checkbox: checkbox,
    chip: chip,
    choicebox: choicebox,
    'code-block': codeBlock,
    collapsible: collapsible,
    combobox: combobox,
    'context-menu': contextMenu,
    'copy-button': copyButton,
    dialog: dialog,
    drawer: drawer,
    emphasis: emphasis,
    'empty-state': emptyState,
    'feature-tabs': featureTabs,
    field: field,
    'floating-button': floatingButton,
    form: form,
    foundations: foundations,
    gallery: gallery,
    'gradient-text': gradientText,
    kbd: kbd,
    marquee: marquee,
    menu: menu,
    menubar: menubar,
    'middle-truncate': middleTruncate,
    'navigation-menu': navigationMenu,
    note: note,
    'number-field': numberField,
    pagination: pagination,
    popover: popover,
    'preview-card': previewCard,
    progress: progress,
    radio: radio,
    'relative-time': relativeTime,
    'rolling-text': rollingText,
    'rough-annotation': roughAnnotation,
    'scroll-area': scrollArea,
    'search-input': searchInput,
    select: select,
    separator: separator,
    skeleton: skeleton,
    slider: slider,
    snippet: snippet,
    spinner: spinner,
    'split-button': splitButton,
    switch: switchDoc,
    table: table,
    tabs: tabs,
    textarea: textarea,
    toast: toast,
    toggle: toggle,
    toolbar: toolbar,
    tooltip: tooltip,
    tree: tree,
    typography: typography,
    video: video,
}
