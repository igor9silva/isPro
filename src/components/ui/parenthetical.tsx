import * as React from "react"
import { cn } from "~/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip"

interface ParentheticalProps {
	children: React.ReactNode
	content: React.ReactNode
	className?: string
}

export function Parenthetical({ children, content, className }: ParentheticalProps) {
	//
	const [open, setOpen] = React.useState(false)

	return (
		<TooltipProvider>
			<Tooltip open={open} onOpenChange={setOpen}>
				<TooltipTrigger asChild>
					<span
						className={cn(
							// Base dotted underline styling similar to links
							"underline decoration-dotted decoration-neutral-600 dark:decoration-neutral-400",
							// Hover effects
							"hover:decoration-neutral-800 dark:hover:decoration-neutral-200",
							// Transition and spacing
							"transition-all duration-150 decoration-[0.08em] underline-offset-2",
							// Cursor to indicate interactivity
							"cursor-help",
							className
						)}
						onClick={() => setOpen(true)}
					>
						{children}
					</span>
				</TooltipTrigger>
				<TooltipContent>
					{content}
				</TooltipContent>
			</Tooltip>
		</TooltipProvider >
	)
} 