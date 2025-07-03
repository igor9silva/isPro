import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { Link } from '~/components/Link';
import { cn } from '~/lib/utils';

interface ArticleMetadata {
	title: string;
	author: string;
	publishDate: string;
	lastModified: string;
	url: string;
	keywords: string;
	abstract: string;
}

interface CitationInfoProps {
	metadata: ArticleMetadata;
}

interface CitationFormatProps {
	title: string;
	children: React.ReactNode;
}

function CitationFormat({ title, children }: CitationFormatProps) {
	return (
		<div>
			<h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">{title}:</h3>
			<div className="text-sm bg-gray-100 dark:bg-neutral-800 border border-border p-3 rounded font-mono text-gray-900 dark:text-gray-100">
				{children}
			</div>
		</div>
	);
}

function BibTeXCitation({ metadata }: { metadata: ArticleMetadata }) {
	//
	const year = metadata.publishDate.split('-')[0];
	const month = new Date(metadata.publishDate)
		.toLocaleDateString('en-US', { month: 'long' })
		.toLowerCase();

	const accessDate = new Date().toISOString().split('T')[0];

	const bibTeX = `
@article{silva${year}agi,
  author       = {Silva, Igor},
  title        = {${metadata.title}},
  journal      = {igorsilva.pro},
  year         = {${year}},
  month        = {${month}},
  url          = {${metadata.url}},
  note         = {Accessed: ${accessDate}}
}`.trim();

	return (
		<CitationFormat title="BibTeX">
			<pre className="overflow-x-auto whitespace-pre-wrap">{bibTeX}</pre>
		</CitationFormat>
	);
}

function APACitation({ metadata }: { metadata: ArticleMetadata }) {
	//
	const year = metadata.publishDate.split('-')[0];

	return (
		<CitationFormat title="APA Style">
			<p>
				Silva, I. ({year}). {metadata.title}. <em>igorsilva.pro</em>. {metadata.url}
			</p>
		</CitationFormat>
	);
}

function MLACitation({ metadata }: { metadata: ArticleMetadata }) {
	//
	const publishedDate = new Date(metadata.publishDate).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});

	const accessedDate = new Date().toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});

	return (
		<CitationFormat title="MLA Style">
			<p>
				Silva, Igor. "{metadata.title}" <em>igorsilva.pro</em>, {publishedDate}. Web.{' '}
				{accessedDate}.
			</p>
		</CitationFormat>
	);
}

function ChicagoCitation({ metadata }: { metadata: ArticleMetadata }) {
	//
	const publishedDate = new Date(metadata.publishDate).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});

	return (
		<CitationFormat title="Chicago Style">
			<p>
				Silva, Igor. "{metadata.title}" igorsilva.pro. Published {publishedDate}.{' '}
				{metadata.url}.
			</p>
		</CitationFormat>
	);
}

function ArticleMetadataDisplay({ metadata }: { metadata: ArticleMetadata }) {
	//
	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		});
	};

	return (
		<div className="mt-6 pt-4 border-t border-gray-200 dark:border-neutral-700">
			<dl className="grid gap-2 text-sm">
				<div>
					<dt className="font-medium text-gray-900 dark:text-gray-100">Author:</dt>
					<dd className="text-gray-600 dark:text-gray-400">{metadata.author}</dd>
				</div>
				<div>
					<dt className="font-medium text-gray-900 dark:text-gray-100">Published:</dt>
					<dd className="text-gray-600 dark:text-gray-400">
						{formatDate(metadata.publishDate)}
					</dd>
				</div>
				<div>
					<dt className="font-medium text-gray-900 dark:text-gray-100">Last Modified:</dt>
					<dd className="text-gray-600 dark:text-gray-400">
						{formatDate(metadata.lastModified)}
					</dd>
				</div>
				<div>
					<dt className="font-medium text-gray-900 dark:text-gray-100">Permanent URL:</dt>
					<dd>
						<Link href={metadata.url}>{metadata.url}</Link>
					</dd>
				</div>
			</dl>
		</div>
	);
}

export function CitationInfo({ metadata }: CitationInfoProps) {
	//
	const [isExpanded, setIsExpanded] = useState(false);

	return (
		<section className="my-4">
			<div className="border border-border rounded-lg overflow-hidden bg-gray-50 dark:bg-neutral-900">
				<button
					type="button"
					onClick={() => setIsExpanded(!isExpanded)}
					className="w-full px-4 py-2 text-left flex items-center justify-between bg-gray-100 dark:bg-neutral-800 hover:bg-gray-200 dark:hover:bg-neutral-700 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
				>
					<span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
						Cite this article
					</span>
					<ChevronDown
						className={cn(
							'h-5 w-5 text-gray-600 dark:text-gray-400 transition-transform duration-200',
							isExpanded && 'rotate-180',
						)}
					/>
				</button>

				{isExpanded && (
					<div className="p-2 bg-gray-50 dark:bg-neutral-900 border-t border-gray-200 dark:border-neutral-700">
						<div className="p-4">
							<div className="space-y-4">
								<BibTeXCitation metadata={metadata} />
								<APACitation metadata={metadata} />
								<MLACitation metadata={metadata} />
								<ChicagoCitation metadata={metadata} />
							</div>

							<ArticleMetadataDisplay metadata={metadata} />
						</div>
					</div>
				)}
			</div>
		</section>
	);
}
