import React from 'react'
import { Select } from '../RadixUI/Select'
import HeaderBar from 'components/OSChrome/HeaderBar'
import * as Icons from '@posthog/icons'
import { Link, navigate } from 'gatsby'
import { useLocation } from '@reach/router'
import OSButton from 'components/OSButton'
import CloudinaryImage from 'components/CloudinaryImage'
import { DebugContainerQuery } from 'components/DebugContainerQuery'
import ScrollArea from 'components/RadixUI/ScrollArea'
import { productMenu } from '../../navs'
import { Accordion } from '../RadixUI/Accordion'
import { FileMenu } from '../RadixUI/FileMenu'
import { Toolbar, ToolbarElement } from '../RadixUI/Toolbar'
import {
  StrikethroughIcon,
  TextAlignLeftIcon,
  TextAlignCenterIcon,
  TextAlignRightIcon,
  FontBoldIcon,
  FontItalicIcon,
  ReloadIcon,
} from "@radix-ui/react-icons";
import { IconSearch, IconMessage } from "@posthog/icons";
import { IconLink } from '../OSIcons/Icons'
import useProduct from 'hooks/useProduct'

interface EditorProps {
    slug?: string
    title: string
    type?: string
    children?: React.ReactNode
    filters?: {
        products?: string[]
        [key: string]: any
    }
}

const baseFilterClass = "ml-auto mr-1 "
const selectedFilterClass = "font-bold !bg-accent-2 dark:!bg-accent-dark cursor-default"

const toolbarElementsBase: ToolbarElement[] = [
  {
    type: "multiple",
    label: "Text formatting",
    items: [
      {
        value: "search",
        label: "Search",
        icon: <IconSearch />,
        disabled: true
      },
      {
        value: "undo",
        label: "Undo",
        icon: <ReloadIcon className="scale-x-[-1]" />,
        disabled: true
      },
      {
        value: "redo",
        label: "Redo",
        icon: <ReloadIcon />,
        disabled: true
      }
    ]
  },
  { type: "separator" },
  {
    type: "select",
    placeholder: "Zoom",
    className: "!text-[13px] !pr-0 !py-0.5",
    disabled: true,
    groups: [
      {
        label: "Zoom Levels",
        items: [
          { value: "50", label: "50%", disabled: true },
          { value: "75", label: "75%", disabled: true },
          { value: "100", label: "100%", disabled: true },
          { value: "150", label: "150%", disabled: true },
          { value: "200", label: "200%", disabled: true }
        ]
      }
    ]
  },
  { type: "separator" },
  {
    type: "multiple",
    label: "Text formatting",
    items: [
      {
        value: "bold",
        label: "Bold",
        icon: <FontBoldIcon />,
        disabled: true
      },
      {
        value: "italic",
        label: "Italic",
        icon: <FontItalicIcon />,
        disabled: true
      },
      {
        value: "strikethrough",
        label: "Strikethrough",
        icon: <StrikethroughIcon />,
        disabled: true
      }
    ]
  },
  { type: "separator" },
  {
    type: "select",
    placeholder: "Font",
    className: "!text-[13px] !pr-0 !py-0.5",
    disabled: true,
    groups: [
      {
        label: "Fonts",
        items: [
          { value: "arial", label: "Arial", disabled: true },
          { value: "times", label: "Times New Roman", disabled: true },
          { value: "courier", label: "Courier New", disabled: true }
        ]
      }
    ]
  },
  { type: "separator" },
  {
    type: "single",
    label: "Text alignment",
    defaultValue: "left",
    items: [
      {
        value: "left",
        label: "Left",
        icon: <TextAlignLeftIcon />,
        disabled: true
      },
      {
        value: "center",
        label: "Center",
        icon: <TextAlignCenterIcon />,
        disabled: true
      },
      {
        value: "right",
        label: "Right",
        icon: <TextAlignRightIcon />,
        disabled: true
      }
    ]
  },
  { type: "separator" },
  {
    type: "button",
    icon: <IconLink />,
    label: "Link",
    hideLabel: true,
    disabled: true
  },
  {
    type: "button",
    icon: <IconMessage />,
    label: "Comment",
    hideLabel: true,
    disabled: true
  },
  {
    type: "button",
    icon: <Icons.IconFilter />,
    label: "Filter",
    hideLabel: true,
    className: baseFilterClass,
  },
  {
    type: "button",
    variant: "primary",
    label: "Share",
    size: "xs",
  }
];

export default function Editor({
    title,
    type,
    children,
    filters,
}: EditorProps) {
    const products = useProduct() as { slug: string; name: string; type: string }[]
    // take the product name passed in and check the useProduct hook to get the product's display name
    const getProductName = (type: string) => products.find((p) => p.type === type)?.name || type
    // if we're filtering to a product, show the filter button in an active/open state
    const filterKeys = filters ? Object.keys(filters).filter((k) => filters[k] !== undefined && filters[k] !== null && (Array.isArray(filters[k]) ? filters[k].length > 0 : true)) : []
    const toolbarElements = toolbarElementsBase.map(el =>
      el.type === "button" && el.label === "Filter"
        ? { ...el, className: filters ? `${baseFilterClass} ${selectedFilterClass}` : baseFilterClass }
        : el
    )
    return (
        <div className="@container w-full h-full flex flex-col min-h-1">
          <aside data-scheme="secondary" className="bg-primary p-2 border-b border-border">
            <Toolbar elements={toolbarElements} />
          </aside>
            <div className="flex flex-col flex-grow min-h-0">
                <main data-scheme="primary" className="@container flex-1 bg-primary relative h-full">
                  {filterKeys.length > 0 && (
                    <div className="bg-accent p-2 text-sm">
                      <span>where </span>
                      {filterKeys.map((key, i) => {
                        if (key === "products" && Array.isArray(filters?.products) && filters.products.length > 0) {
                          return (
                            <span key={key}>
                              <strong>product used</strong> <em>includes</em> {filters.products.map((type, idx) => (
                                <span key={type} className="bg-blue/20 text-blue font-semibold border border-blue rounded-sm px-1.5 py-0.5 mr-1">
                                  {getProductName(type)}
                                </span>
                              ))}
                              {i < filterKeys.length - 1 && <span> and </span>}
                            </span>
                          )
                        } else {
                          const value = filters?.[key]
                          return (
                            <span key={key}>
                              <strong>{key.replace(/([A-Z])/g, ' $1').toLowerCase()}</strong> <em>is</em> {typeof value === "boolean" ? (
                                <span className={value ? "bg-green/20 text-green font-semibold border border-green rounded-sm px-1.5 py-0.5" : "bg-red/20 text-red font-semibold border border-red rounded-sm px-1.5 py-0.5"}>
                                  {value ? "true" : "false"}
                                </span>
                              ) : (
                                <span className="bg-accent-2 px-1.5 py-0.5 rounded-sm border font-semibold">{String(value)}</span>
                              )}
                              {i < filterKeys.length - 1 && <span> and </span>}
                            </span>
                          )
                        }
                      })}
                    </div>
                  )}
                  <ScrollArea>
                    <div className="p-4 mx-auto max-w-3xl">
                      <h1 className="text-2xl font-bold">{title}{type && <span className="opacity-40">.{type}</span>}</h1>
                      {children}
                    </div>
                  </ScrollArea>
                </main>
            </div>
        </div>
    )
}