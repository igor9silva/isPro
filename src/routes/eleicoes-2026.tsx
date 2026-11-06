import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/eleicoes-2026')({
	beforeLoad: () => {
		throw redirect({ href: '/eleicoes-2026/index.html' });
	},
});
