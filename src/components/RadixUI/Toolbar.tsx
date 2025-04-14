import * as React from "react";
import { Toolbar as RadixToolbar } from "radix-ui";


const ToolbarDemo = () => (
	<RadixToolbar.Root
		className="flex w-full min-w-max rounded-md bg-primary p-2.5 border border-primary"
		aria-label="Formatting options"
	>
		<RadixToolbar.ToggleGroup type="multiple" aria-label="Text formatting">
			<RadixToolbar.ToggleItem
				className="ml-0.5 inline-flex h-[25px] flex-shrink-0 flex-grow-0 basis-auto items-center justify-center rounded bg-white px-[5px] text-[13px] leading-none text-mauve11 outline-none first:ml-0 hover:bg-violet3 hover:text-violet11 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet7 data-[state=on]:bg-violet5 data-[state=on]:text-violet11"
				value="bold"
				aria-label="Bold"
			>
          B
			</RadixToolbar.ToggleItem>
			<RadixToolbar.ToggleItem
				className="ml-0.5 inline-flex h-[25px] flex-shrink-0 flex-grow-0 basis-auto items-center justify-center rounded bg-white px-[5px] text-[13px] leading-none text-mauve11 outline-none first:ml-0 hover:bg-violet3 hover:text-violet11 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet7 data-[state=on]:bg-violet5 data-[state=on]:text-violet11"
				value="italic"
				aria-label="Italic"
			>
				<em>I</em>
			</RadixToolbar.ToggleItem>
			<RadixToolbar.ToggleItem
				className="ml-0.5 inline-flex h-[25px] flex-shrink-0 flex-grow-0 basis-auto items-center justify-center rounded bg-white px-[5px] text-[13px] leading-none text-mauve11 outline-none first:ml-0 hover:bg-violet3 hover:text-violet11 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet7 data-[state=on]:bg-violet5 data-[state=on]:text-violet11"
				value="strikethrough"
				aria-label="Strike through"
			>
        <span className="line-through">S</span>
			</RadixToolbar.ToggleItem>
		</RadixToolbar.ToggleGroup>
		<RadixToolbar.Separator className="mx-2.5 w-px bg-mauve6" />
		<RadixToolbar.ToggleGroup
			type="single"
			defaultValue="center"
			aria-label="Text alignment"
		>
			<RadixToolbar.ToggleItem
				className="ml-0.5 inline-flex h-[25px] flex-shrink-0 flex-grow-0 basis-auto items-center justify-center rounded bg-white px-[5px] text-[13px] leading-none text-mauve11 outline-none first:ml-0 hover:bg-violet3 hover:text-violet11 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet7 data-[state=on]:bg-violet5 data-[state=on]:text-violet11"
				value="left"
				aria-label="Left aligned"
			>
        left
			</RadixToolbar.ToggleItem>
			<RadixToolbar.ToggleItem
				className="ml-0.5 inline-flex h-[25px] flex-shrink-0 flex-grow-0 basis-auto items-center justify-center rounded bg-white px-[5px] text-[13px] leading-none text-mauve11 outline-none first:ml-0 hover:bg-violet3 hover:text-violet11 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet7 data-[state=on]:bg-violet5 data-[state=on]:text-violet11"
				value="center"
				aria-label="Center aligned"
			>
				center
			</RadixToolbar.ToggleItem>
			<RadixToolbar.ToggleItem
				className="ml-0.5 inline-flex h-[25px] flex-shrink-0 flex-grow-0 basis-auto items-center justify-center rounded bg-white px-[5px] text-[13px] leading-none text-mauve11 outline-none first:ml-0 hover:bg-violet3 hover:text-violet11 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet7 data-[state=on]:bg-violet5 data-[state=on]:text-violet11"
				value="right"
				aria-label="Right aligned"
			>
				right
			</RadixToolbar.ToggleItem>
		</RadixToolbar.ToggleGroup>
		<RadixToolbar.Separator className="mx-2.5 w-px bg-mauve6" />
		<RadixToolbar.Link
			className="ml-0.5 hidden h-[25px] flex-shrink-0 flex-grow-0 basis-auto items-center justify-center rounded bg-transparent bg-white px-[5px] text-[13px] leading-none text-mauve11 outline-none first:ml-0 hover:cursor-pointer hover:bg-transparent hover:bg-violet3 hover:text-violet11 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet7 data-[state=on]:bg-violet5 data-[state=on]:text-violet11 sm:inline-flex"
			href="#"
			target="_blank"
			style={{ marginRight: 10 }}
		>
			Edited 2 hours ago
		</RadixToolbar.Link>
		<RadixToolbar.Button
			className="inline-flex h-[25px] flex-shrink-0 flex-grow-0 basis-auto items-center justify-center rounded bg-violet9 px-2.5 text-[13px] leading-none text-white outline-none hover:bg-violet10 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet7"
			style={{ marginLeft: "auto" }}
		>
			Share
		</RadixToolbar.Button>
	</RadixToolbar.Root>
);

export default ToolbarDemo;
