import { Link } from '~/components/Link';
import { Parenthetical } from '~/components/ui/parenthetical';

export function NotFeelingAGI() {
	return (
		<section>
			<h2 id="not-feeling-agi">
				So why I'm not <em>feeling the AGI</em>?
			</h2>

			<p>...you'd ask me.</p>

			<p>Or, more importantly, why do I still have to work?!</p>

			<p>
				Well, let's picture what it takes to actually{' '}
				<Parenthetical content="i.e. supply a product or provide a service that helps someone.">
					<strong>produce value</strong>
				</Parenthetical>
				.
			</p>

			<p>
				Say I want to publish a book on software development, which is a topic I'm
				comfortable with since I've been doing it for ~15 years.
			</p>

			<p>
				Can I do it on a single session, like the GPT examples above? Can I sit down, open
				my preferred text editor, and just type it word by word until it's done?
			</p>

			<p>Of course not!</p>

			<p>I need to iterate (a lot!) on it.</p>

			<p>
				I'll write, re-write, research, change my mind, read it again and again, fix typos,
				and lot more, until it's done. And that takes time!
			</p>

			<p>
				In fact,{' '}
				<Link href="https://reedsy.com/studio/resources/how-long-does-it-take-to-write-a-book">
					it's said
				</Link>{' '}
				to take <strong>something between weeks and years</strong> to write any publishable
				book.
			</p>

			<p>
				Stephen King, a professional writer,{' '}
				<Link href="https://www.masterclass.com/articles/how-long-does-it-take-to-write-a-book">
					strives to write 10 pages per day
				</Link>
				.
			</p>

			<p>
				So <strong>intelligence</strong> — the ability to coherently predict the future —{' '}
				<strong>is not enough</strong>.
			</p>

			<p>
				You also need a <strong>feedback loop</strong>.
			</p>
		</section>
	);
}
