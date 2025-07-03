import { createFileRoute } from '@tanstack/react-router';
import { track } from '@vercel/analytics/react';

export const Route = createFileRoute('/soham')({
	component: RouteComponent,
});

function RouteComponent() {
	//
	track('soham');

	if (typeof window !== 'undefined') {
		window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
	}

	return null;
}
