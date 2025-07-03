import { Link } from '~/components/Link';
import { Parenthetical } from '~/components/ui/parenthetical';

export function ItsHappening() {
	return (
		<section>
			<h2 id="its-happening">It is happening!</h2>

			<p>
				Whether I was able to convince you that current models are AGI or not, it doesn't
				really matter because <strong>it is happening!</strong>
			</p>

			<p>
				If you're waiting for a single, dramatic "AGI moment", <s>you're ngmi</s> you'll
				miss the real story.{' '}
				<strong>
					AGI isn't a switch that flips — but rather a continuum process that's happening
					right now
				</strong>{' '}
				— everywhere, every second.
			</p>

			<p>
				It doesn't look like this:{' '}
				<img src="../media/agi-bool.png" alt="boolean AGI" className="mt-1" />
			</p>

			<p>
				But like this:{' '}
				<img src="../media/agi-continuum.png" alt="continuum AGI" className="mt-1" />
			</p>

			<p>
				<strong>
					Every layer of every industry is getting unimaginable and unprecedented
					efficiency gains
				</strong>
				, and that's awesome!
			</p>

			<p>
				The best way to observe this effect right now is in the software industry. The
				energy required to develop and maintain almost any kind of software has dropped by{' '}
				<strong>~80% in the last two years</strong>. I'll say it again: building software is{' '}
				<strong>80% CHEAPER TODAY THAN IT WAS TWO YEARS AGO</strong>. That's not an
				exaggeration, specially for consumer software.
			</p>

			<p>
				It doesn't matter if there is a human in the loop or not. It doesn't matter how many
				engineering jobs were lost or not. It doesn't matter if you directly benefit from it
				or not.
			</p>

			<p>
				Just one thing matters: building software is getting much cheaper, and{' '}
				<strong>that's good for everybody</strong>, as that translates into more iterations,
				more features, more products, more libraries, more services,{' '}
				<strong>more value</strong>. For everyone.
			</p>

			<p>
				Coding is among the first industries to collect those gains, but not because it's{' '}
				<Parenthetical content="As in would require less intelligence.">easy</Parenthetical>
				, but due to:
				<ol>
					<li>Being mostly digital, making it easy to interface existing tools to AI.</li>
					<li>
						Having a{' '}
						<Parenthetical content="Developers used to make big bucks.">
							high aggregated value
						</Parenthetical>
						, making it worth even with{' '}
						<Link href="https://www.llm-prices.com/#sb=input&sd=descending">
							today's inference prices
						</Link>
						.
					</li>
					<li>
						Most industries run on software, making it universal. You can solve an
						untrackable and ever-growing amount of challenges with code.
					</li>
				</ol>
			</p>

			<p>
				A few examples of products driving such efficiency gains are{' '}
				<Link href="https://cursor.com">Cursor</Link>,{' '}
				<Link href="https://anthropic.com/claude-code">Claude Code</Link>,{' '}
				<Link href="https://openai.com/codex/">Codex</Link> and many others. All of them
				work in a{' '}
				<Parenthetical content="Loop, tools, knowledge, feedback.">
					similar fashion to what we have described so far
				</Parenthetical>
				.
			</p>

			<p>
				But it's not stopping with computer programs. <strong>Every</strong> production
				chain, <strong>every</strong> supply chain, <strong>every</strong> good or service
				being provided is already exponentially collecting those gains.
			</p>

			<p>
				ChatGPT, when paired with{' '}
				<Link href="https://openai.com/index/introducing-o3-and-o4-mini/">
					o3 or o4-mini
				</Link>
				, also works similarly. During it's <em>Chain of Thoughts</em>, it does way more
				than just reasoning. It searches the web, write and run code, zoom into images and
				much more. You can even plug in your own tools via{' '}
				<Link href="https://www.anthropic.com/news/model-context-protocol">MCP</Link>, which
				is another project allowing knowledge sharing among apps, and has been gaining a lot
				of traction!{' '}
				<span className="text-xs text-muted-foreground">
					That's why <Link href="/media/systems.mp4">o3 is a system</Link>, not just a
					model.
				</span>
			</p>

			{/* <p>cursor_spending.png</p>
						<p>creating interfaces to AI is a whole new industry</p> */}

			<p>
				Think with me. The highest cost on most industries is <strong>human labor</strong>,
				meaning that every human-second saved by using an AI system, from a simple
				copy/paste from/into ChatGPT up to a fully automated swarm of agents, saves energy
				and <strong>will eventually translate into cheaper and better products</strong>.
			</p>

			<p>
				As a software engineer, I can produce 5x more value per energy today than I could 2
				years ago. Mostly due to my direct usage of AI, but also due to everyone else's
				usage of AI. Every open-source library we rely on is evolving faster than ever.
				Every tool I use is getting better every week. And so on.
			</p>

			<p>
				To better visualize this process, I highly suggest thinking more of{' '}
				<code>tasks</code> and less of <code>roles</code>.
			</p>

			<p>
				There won't be a day where AI is suddenly capable of replacing your role entirely,
				but the tasks you do to fulfill your job are quickly getting cheaper and better.
				Picture how "everyone" has AI assistancy to write e-mails and documents, or how
				"everyone" have near-perfect translation for ~every language on earth. That affects
				everyone everywhere, and{' '}
				<Link
					href="https://blog.samaltman.com/productivity#:~:text=Compoundgrowth%20gets,difference%20is%20massive.%C2%A0"
					className="font-bold"
				>
					compounds
				</Link>
				.
			</p>

			<br />

			<blockquote>
				"They're not coming for me though, lol"
				<p>— my barber</p>
			</blockquote>

			<p className="text-sm text-muted-foreground">
				<img
					src="../media/jensen-and-the-robots.png"
					alt="Jensen Huang and an army of humanoid robots"
					className="my-1"
				/>
				This is Jensen Huang, CEO of Nvidia, showing <strong>just a few of</strong> the
				humanoid robots being developed.
			</p>

			<p>Sometimes an image is worth a million words.</p>

			{/* <p>
				They're coming. Trillions of them.
			</p> */}

			<p>
				As I said, <strong>every</strong> industry.
			</p>
		</section>
	);
}
