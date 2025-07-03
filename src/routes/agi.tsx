import { createFileRoute } from '@tanstack/react-router';
import { track } from '@vercel/analytics/server';
import { Expand, Shrink } from 'lucide-react';
import { CostSituation } from '~/components/agi/CostSituation';
import { FeedbackLoop } from '~/components/agi/FeedbackLoop';
import { Intro } from '~/components/agi/Intro';
import { ItsHappening } from '~/components/agi/ItsHappening';
import { NotFeelingAGI } from '~/components/agi/NotFeelingAGI';
import { Productivity } from '~/components/agi/Productivity';
import { WhatNow } from '~/components/agi/WhatNow';
import { CitationInfo } from '~/components/CitationInfo';
import { StructuredData } from '~/components/StructuredData';
import { Button } from '~/components/ui/button';
import { useFullWidth } from '~/hooks/useFullWidth';
import { seo } from '~/utils/seo';

const METADATA = {
	title: 'AGI achieved; now what?',
	author: 'Igor Silva',
	publishDate: '2025-07-06',
	lastModified: '2025-07-06',
	url: 'https://igorsilva.pro/agi',
	keywords:
		'AGI, Artificial General Intelligence, AI, Productivity, Future of Work, Post-labor Economics',
	abstract:
		'A discussion on the achievement of Artificial General Intelligence, its implications for productivity, and the future of human-AI collaboration in a post-labor economy.',
};

export const Route = createFileRoute('/agi')({
	head: () => ({
		meta: [
			...seo({
				title: METADATA.title,
				description: METADATA.abstract,
				keywords: METADATA.keywords,
				image: '/og.webp',
			}),
			{ name: 'author', content: METADATA.author },
			{ name: 'article:author', content: METADATA.author },
			{ name: 'article:published_time', content: METADATA.publishDate },
			{ name: 'article:modified_time', content: METADATA.lastModified },
			{ name: 'article:section', content: 'Technology' },
			{ name: 'article:tag', content: METADATA.keywords },
			{ name: 'DC.title', content: METADATA.title },
			{ name: 'DC.creator', content: METADATA.author },
			{ name: 'DC.date', content: METADATA.publishDate },
			{ name: 'DC.identifier', content: METADATA.url },
			{ name: 'DC.format', content: 'text/html' },
			{ name: 'DC.language', content: 'en' },
			{ name: 'DC.type', content: 'Text' },
			{ name: 'citation_title', content: METADATA.title },
			{ name: 'citation_author', content: METADATA.author },
			{ name: 'citation_publication_date', content: METADATA.publishDate },
			{ name: 'citation_online_date', content: METADATA.publishDate },
			{ name: 'citation_fulltext_html_url', content: METADATA.url },
			{ name: 'citation_language', content: 'en' },
		],
		links: [
			{ rel: 'canonical', href: METADATA.url }, //
		],
	}),
	component: Main,
});

function Main() {
	//
	track('agi');

	const [isFullWidth, setIsFullWidth] = useFullWidth();

	return (
		<>
			{/* Structured data for search engines */}
			<StructuredData metadata={METADATA} />

			<Button
				variant="ghost"
				onClick={() => setIsFullWidth(!isFullWidth)}
				className="hidden lg:flex fixed top-4 right-4"
			>
				{isFullWidth ? <Shrink /> : <Expand />}
			</Button>

			<article
				className="mx-auto p-4 transition-[max-width] duration-150 ease-out"
				style={{ maxWidth: isFullWidth ? '100vw' : '64rem' }}
			>
				<header>
					<h1>AGI achieved; now what?</h1>
				</header>

				<Intro />
				<NotFeelingAGI />
				<FeedbackLoop />
				<Productivity />
				<CostSituation />
				<ItsHappening />
				<WhatNow />
				{/* <NextStep /> */}

				<h1>WORK IN PROGRESS</h1>

				<CitationInfo metadata={METADATA} />

				{/* <CollapsiblePanel
					title="References & Further Reading"
					icon="📚"
					references={[
						{
							url: "https://openai.com/o1/",
							title: "OpenAI o1 Model Announcement",
							description: "Introduction of reasoning models",
						},
						{
							url: "https://arcprize.org/leaderboard",
							title: "ARC-AGI-1 Leaderboard",
							description: "AGI benchmark results",
						},
						{
							url: "https://reedsy.com/studio/resources/how-long-does-it-take-to-write-a-book",
							title: "How Long Does It Take to Write a Book?",
							description: "Writing process and iteration",
						},
						{
							url: "https://www.masterclass.com/articles/how-long-does-it-take-to-write-a-book",
							title: "Stephen King on Writing Process",
							description: "Professional writing habits",
						},
						{
							url: "https://artificialanalysis.ai",
							title: "Artificial Analysis",
							description: "A comprehensive model benchmark compilation",
						},
					]}
				/> */}
			</article>
		</>
	);
}
