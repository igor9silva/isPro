interface ArticleMetadata {
	title: string;
	author: string;
	publishDate: string;
	lastModified: string;
	url: string;
	keywords: string;
	abstract: string;
}

interface StructuredDataProps {
	metadata: ArticleMetadata;
}

export function StructuredData({ metadata }: StructuredDataProps) {
	const structuredData = {
		'@context': 'https://schema.org',
		'@type': 'Article',
		'headline': metadata.title,
		'author': {
			'@type': 'Person',
			'name': metadata.author,
		},
		'publisher': {
			'@type': 'Organization',
			'name': 'igorsilva.pro',
			'url': 'https://igorsilva.pro',
		},
		'datePublished': metadata.publishDate,
		'dateModified': metadata.lastModified,
		'description': metadata.abstract,
		'keywords': metadata.keywords.split(', '),
		'url': metadata.url,
		'mainEntityOfPage': {
			'@type': 'WebPage',
			'@id': metadata.url,
		},
		'articleSection': 'Technology',
		'inLanguage': 'en-US',
	};

	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
		/>
	);
}
