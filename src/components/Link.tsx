export function Link({
	href,
	inNewTab = true,
	children,
}: {
	href: string;
	inNewTab?: boolean;
	children: React.ReactNode;
}) {
	return (
		<a
			href={href}
			target={inNewTab ? "_blank" : undefined}
			rel="noopener noreferrer"
		>
			{children}
		</a>
	);
}
