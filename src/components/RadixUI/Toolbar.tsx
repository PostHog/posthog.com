import * as React from "react";
import { Toolbar as RadixToolbar } from "radix-ui";
import OSButton from "components/OSButton";
import {
	StrikethroughIcon,
	TextAlignLeftIcon,
	TextAlignCenterIcon,
	TextAlignRightIcon,
	FontBoldIcon,
	FontItalicIcon,
	ReloadIcon,
} from "@radix-ui/react-icons";
import { IconSearch } from "@posthog/icons";

const buttonClasses = "bg-primary px-[5px] text-[13px] leading-none text-secondary outline-none hover:bg-accent hover:text-primary focus:relative focus-visible:shadow-[0_0_0_2px] focus-visible:shadow-primary data-[state=on]:bg-accent-2 hover:data-[state=on]:bg-accent-2 data-[state=on]:text-primary disabled:hover:bg-primary disabled:hover:text-secondary"

const ToolbarDemo = () => (
	<RadixToolbar.Root
    data-scheme="secondary"
		className="flex w-full min-w-max rounded bg-primary p-1 border border-border"
		aria-label="Formatting options"
	>

<RadixToolbar.ToggleGroup type="multiple" aria-label="Text formatting" className="flex items-center gap-px">
			<RadixToolbar.ToggleItem
				value="search"
				aria-label="Search"
        className={buttonClasses}
        asChild
        disabled
			>
        <OSButton
          variant="ghost"
          icon={<IconSearch />}
        />
			</RadixToolbar.ToggleItem>
			<RadixToolbar.ToggleItem
				value="undo"
				aria-label="Undo"
        className={buttonClasses}
        asChild
			>
        <OSButton
          variant="ghost"
          icon={<ReloadIcon className="scale-x-[-1]" />}
          className="[&_svg]:size-full"
          size="sm"
        />
			</RadixToolbar.ToggleItem>
			<RadixToolbar.ToggleItem
				value="redo"
				aria-label="Redo"
        className={buttonClasses}
        asChild
			>
        <OSButton
          variant="ghost"
          icon={<ReloadIcon />}
          className="[&_svg]:size-full"
          size="sm"
        />
			</RadixToolbar.ToggleItem>
		</RadixToolbar.ToggleGroup>

		<RadixToolbar.Separator className="mx-2.5 w-px bg-border" />
    
		<RadixToolbar.ToggleGroup type="multiple" aria-label="Text formatting" className="flex items-center gap-px">
			<RadixToolbar.ToggleItem
				value="bold"
				aria-label="Bold"
        asChild
        className={buttonClasses}
			>
        <OSButton
          variant="ghost"
          icon={<FontBoldIcon />}
          className="[&_svg]:size-full"
        />
			</RadixToolbar.ToggleItem>

			<RadixToolbar.ToggleItem
				value="italic"
				aria-label="Italic"
        asChild
        className={buttonClasses}
			>
        <OSButton
          variant="ghost"
          icon={<FontItalicIcon />}
          className="[&_svg]:size-full"
        />
			</RadixToolbar.ToggleItem>

			<RadixToolbar.ToggleItem
				value="strikethrough"
				aria-label="Strikethrough"
        asChild
        className={buttonClasses}
			>
        <OSButton
          variant="ghost"
          icon={<StrikethroughIcon />}
          className="[&_svg]:size-full"
        />
			</RadixToolbar.ToggleItem>
		</RadixToolbar.ToggleGroup>

		<RadixToolbar.Separator className="mx-2.5 w-px bg-border" />

		
    
		<RadixToolbar.ToggleGroup type="single" defaultValue="left" aria-label="Text alignment" className="flex items-center gap-px">
			<RadixToolbar.ToggleItem
				value="left"
				aria-label="Left"
        asChild
        className={buttonClasses}
			>
        <OSButton
          variant="ghost"
          icon={<TextAlignLeftIcon />}
          className="[&_svg]:size-full"
        />
			</RadixToolbar.ToggleItem>

			<RadixToolbar.ToggleItem
				value="center"
				aria-label="Center"
        asChild
        className={buttonClasses}
			>
        <OSButton
          variant="ghost"
          icon={<TextAlignCenterIcon />}
          className="[&_svg]:size-full"
        />
			</RadixToolbar.ToggleItem>

			<RadixToolbar.ToggleItem
				value="right"
				aria-label="Right"
        asChild
        className={buttonClasses}
			>
        <OSButton
          variant="ghost"
          icon={<TextAlignRightIcon />}
          className="[&_svg]:size-full"
        />
			</RadixToolbar.ToggleItem>
		</RadixToolbar.ToggleGroup>

		<RadixToolbar.Separator className="mx-2.5 w-px bg-secondary" />
		<RadixToolbar.Link
			className="ml-0.5 hidden h-[25px] flex-shrink-0 flex-grow-0 basis-auto items-center justify-center rounded bg-transparent bg-white px-[5px] text-[13px] leading-none text-secondary outline-none first:ml-0 hover:cursor-pointer hover:bg-transparent hover:bg-accent-2 hover:text-primary focus:relative focus:shadow-xl data-[state=on]:bg-accent-2 data-[state=on]:text-primary sm:inline-flex"
			href="#"
			target="_blank"
			style={{ marginRight: 10 }}
		>
			Edited 2 hours ago
		</RadixToolbar.Link>
		<RadixToolbar.Button
			className="inline-flex h-[25px] flex-shrink-0 flex-grow-0 basis-auto items-center justify-center rounded bg-primary px-2.5 text-[13px] leading-none text-white outline-none hover:bg-secondary focus:relative focus:shadow-xl"
			style={{ marginLeft: "auto" }}
		>
			Share
		</RadixToolbar.Button>
	</RadixToolbar.Root>
);

export default ToolbarDemo;
