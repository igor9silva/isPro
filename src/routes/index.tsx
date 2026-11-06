import { createFileRoute } from '@tanstack/react-router';
import { Button } from '~/components/ui/button';

export const Route = createFileRoute('/')({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-background gap-4">
			<div className="text-4xl font-bold">isPro</div>
			<a href="/eleicoes-2026/" lang="pt-BR">
				Pesquisa: eleições de 2026
			</a>
			<Button variant="link" asChild>
				<a href="mailto:support@igorsilva.pro">Get Support</a>
			</Button>
		</div>
	);
}
