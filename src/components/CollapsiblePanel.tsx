import { ChevronDown } from "lucide-react";
import { type ReactNode, useState } from "react";
import { cn } from "~/lib/utils";

interface ReferenceLink {
	url: string;
	title: string;
	description: string;
}

interface CollapsiblePanelProps {
	title: string;
	icon?: string;
	children?: ReactNode;
	references?: ReferenceLink[];
	defaultOpen?: boolean;
	className?: string;
}

function ReferenceList({ references }: { references: ReferenceLink[] }) {
	return (
		<ul className="space-y-4">
			{references.map((ref) => (
				<li
					key={ref.url}
					className="border-l-2 border-gray-300 dark:border-gray-600 pl-4"
				>
					<a
						href={ref.url}
						target="_blank"
						rel="noopener noreferrer"
						className="font-medium text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-300 underline underline-offset-4 decoration-gray-500 dark:decoration-gray-400 hover:decoration-gray-700 dark:hover:decoration-gray-300 transition-colors"
					>
						{ref.title}
					</a>
					<p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
						{ref.description}
					</p>
				</li>
			))}
		</ul>
	);
}

export function CollapsiblePanel({
	title,
	icon,
	children,
	references,
	defaultOpen = false,
	className,
}: CollapsiblePanelProps) {
	const [isOpen, setIsOpen] = useState(defaultOpen);

	return (
		<div className={cn("my-8", className)}>
			<div className="border border-border rounded-lg overflow-hidden bg-gray-50 dark:bg-neutral-900">
				<button
					type="button"
					onClick={() => setIsOpen(!isOpen)}
					className="w-full px-6 py-4 text-left flex items-center justify-between bg-gray-100 dark:bg-neutral-800 hover:bg-gray-200 dark:hover:bg-neutral-700 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
				>
					<div className="flex items-center gap-3">
						{icon && <span className="text-xl">{icon}</span>}
						<span className="font-semibold text-gray-900 dark:text-gray-100">
							{title}
						</span>
					</div>
					<ChevronDown
						className={cn(
							"h-5 w-5 text-gray-600 dark:text-gray-400 transition-transform duration-200",
							isOpen && "rotate-180",
						)}
					/>
				</button>

				{isOpen && (
					<div className="px-6 py-4 bg-gray-50 dark:bg-neutral-900 border-t border-gray-200 dark:border-neutral-700">
						{references && <ReferenceList references={references} />}
						{children}
					</div>
				)}
			</div>
		</div>
	);
}
