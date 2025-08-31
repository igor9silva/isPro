/// <reference types="vite/client" />
import { HeadContent, Outlet, Scripts, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Analytics } from '@vercel/analytics/react';
import * as React from 'react';
import { DefaultCatchBoundary } from '~/components/DefaultCatchBoundary';
import { NotFound } from '~/components/NotFound';
import appCss from '~/styles/app.css?url';
import { seo } from '~/utils/seo';

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{
				charSet: 'utf-8',
			},
			{
				name: 'viewport',
				content: 'width=device-width, initial-scale=1',
			},
			...seo({
				title: 'A path to infinite productivity | isPro',
				description: `We believe our research will lead to infinite productivity for all humankind. Building public, open and free AI systems.`,
				image: '/og.webp',
			}),
		],
		links: [
			{ rel: 'stylesheet', href: appCss },
			{
				rel: 'apple-touch-icon',
				sizes: '180x180',
				href: '/apple-touch-icon.png',
			},
			{ rel: 'manifest', href: '/site.webmanifest', color: '#fffff' },
			{ rel: 'icon', href: '/favicon.ico' },
		],
	}),
	errorComponent: (props) => {
		return (
			<RootDocument>
				<DefaultCatchBoundary {...props} />
			</RootDocument>
		);
	},
	notFoundComponent: () => <NotFound />,
	component: RootComponent,
});

function RootComponent() {
	return (
		<RootDocument>
			<Outlet />
		</RootDocument>
	);
}

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html>
			<head>
				<HeadContent />
				<script
					dangerouslySetInnerHTML={{
						// this is for dark/light mode detection
						__html: `
							try {
								if (typeof window !== 'undefined' && window.matchMedia) {
									const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
									const updateTheme = (e) => {
										document.documentElement.classList.toggle('dark', e.matches);
									};

									// Set initial theme
									updateTheme(mediaQuery);

									// Listen for changes
									mediaQuery.addEventListener('change', updateTheme);
								}
							} catch (e) {}
						`,
					}}
				/>
			</head>
			<body>
				{children}
				<TanStackRouterDevtools position="bottom-right" />
				<Scripts />
				<Analytics />
			</body>
		</html>
	);
}
