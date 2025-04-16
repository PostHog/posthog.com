import * as React from "react";
import { Toast as RadixToast } from "radix-ui";
import OSButton from "components/OSButton";
import { IconCornerDownRight } from "@posthog/icons";

const Toast = ({ title, description, children, action, className = '' }: { title: string, description: string, children: React.ReactNode, action: string, className?: string }) => {
	const [open, setOpen] = React.useState(false);

	return (
		<RadixToast.Provider swipeDirection="right">

			<button
				className={`inline-flex h-[35px] items-center justify-center rounded outline-none focus-visible:shadow-[0_0_0_2px] focus-visible:shadow-black ${className}`}
				onClick={() => {
					setOpen(true);
				}}
			>
				{children}
			</button>

			<RadixToast.Root
				className="grid grid-cols-[auto_max-content] items-center gap-x-[15px] rounded-md bg-white p-[15px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] [grid-template-areas:_'title_action'_'description_action'] data-[swipe=cancel]:translate-x-0 data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[state=closed]:animate-hide data-[state=open]:animate-slideIn data-[swipe=end]:animate-swipeOut data-[swipe=cancel]:transition-[transform_200ms_ease-out]"
				open={open}
				onOpenChange={setOpen}
			>
				<RadixToast.Title className="text-[15px] font-semibold text-primary [grid-area:_title]">
					{title}
				</RadixToast.Title>
				<RadixToast.Description asChild>
          <p className="text-sm mb-0 text-secondary">{description}</p>
				</RadixToast.Description>
				<RadixToast.Action
					className="[grid-area:_action]"
					asChild
					altText="Goto schedule to undo"
				>
					<OSButton 
						variant="ghost"
						size="sm"
						icon={<IconCornerDownRight className="scale-x-[-1]" />}>
						{action}
					</OSButton>
				</RadixToast.Action>
			</RadixToast.Root>
			<RadixToast.Viewport className="fixed bottom-0 right-0 z-[2147483647] m-0 flex w-[390px] max-w-[100vw] list-none flex-col gap-2.5 p-[var(--viewport-padding)] outline-none [--viewport-padding:_25px]" />
		</RadixToast.Provider>
	);
};

export default Toast;
