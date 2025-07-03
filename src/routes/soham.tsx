import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/soham')({
	component: RouteComponent,
});

function RouteComponent() {
	//
	if (typeof window !== 'undefined') {
		window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
	}

	return null;
}
