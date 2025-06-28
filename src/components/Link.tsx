export function Link({
	href,
	inNewTab = true,
	children,
	className,
}: {
	href: string;
	inNewTab?: boolean;
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<a
			href={href}
			target={inNewTab ? "_blank" : undefined}
			rel="noopener noreferrer"
			className={className}
		>
			{children}
		</a>
	);
}
