import { Link } from "~/components/Link";

export function ItIsHappeningSection() {
	return (
		<section>
			<h2>It is happening!</h2>

			<p>
				If you're waiting for a single, dramatic "AGI moment", <s>you're ngmi</s> you'll miss the real story. <strong>AGI isn't a switch that flips — but rather a continuum process that's happening right now</strong> — everywhere, every second.
			</p>

			<p>
				It's not: <img src="../media/agi-bool.png" alt="boolean AGI" className="mt-1" />
			</p>

			<p>
				But: <img src="../media/agi-continuum.png" alt="continuum AGI" className="mt-1" />
			</p>

			<p>
				Whether I was able to convince you that current models are AGI or not, it doesn't really matter.
			</p>

			<p>
				<strong>Every layer of every industry is getting unimaginable and unprecedented efficiency gains</strong>, and that's awesome!
			</p>


			{/* <p>
							Billions of human–AI and AI–AI interactions are happening every day, quietly adding efficiency to every layer of every industry.
						</p> */}

			<p>
				The best way to observe this effect right now is in the software industry. The energy required to develop and maintain almost any kind of software has dropped by <strong>~80% in the last two years</strong>. I'll say it again: building software is <strong>80% CHEAPER TODAY THAN IT WAS TWO YEARS AGO</strong>. That's not an exaggeration, specially for consumer software.
			</p>

			<p>
				It doesn't matter if there is a human in the loop or not. It doesn't matter how many engineering jobs were lost or not. It doesn't matter if you directly benefit from it or not.
			</p>

			<p>
				Just one thing matters: building software is getting much cheaper, and <strong>that's good for everybody</strong>, as that translates into more iterations, more features, more products, more services, <strong>more value</strong>. For everyone.
			</p>

			<p>
				Coding is among the first industries to collect those gains, but not because it's easy (as in would require less intelligence), but due to:
				<ol>
					<li>
						Being mostly digital, making it easy to interface existing tools to AI.
					</li>
					<li>
						Having a high aggregated value (developers used to make big bucks), making it worth even with today's inference prices.
					</li>
					<li>
						Most industries run on software, making it universal. You can solve an untrackable and ever-growing amount of challenges with code.
					</li>
				</ol>
			</p>

			<p>
				A few examples of products driving such efficiency gains are <Link href="https://cursor.com">Cursor</Link>, <Link href="https://anthropic.com/claude-code">Claude Code</Link>, <Link href="https://openai.com/codex/">Codex</Link> and many others. All of them work in a similar fashion to what we have described so far (loop, tools, knowledge, feedback).
			</p>

			<p>
				But it's not stopping with computer programs. <strong>Every</strong> production chain, <strong>every</strong> supply chain, <strong>every</strong> good or service being provided is already exponentially collecting those gains.
			</p>

			<p>ChatGPT, when paired with <Link href="https://openai.com/index/introducing-o3-and-o4-mini/">o3 or o4-mini</Link>, also works similarly. During it's <em>Chain of Thoughts</em>, it does way more than just reasoning. It searches the web, write and run code, zoom into images and much more. You can even plug in your own tools via <Link href="https://www.anthropic.com/news/model-context-protocol">MCP</Link>, which is another project allowing knowledge sharing among apps, and has been gaining a lot of traction! <span className="text-xs text-muted-foreground">That's why <Link href="/media/systems.mp4">o3 is a system</Link>, not just a model.</span></p>

			{/* <p>cursor_spending.png</p>
						<p>creating interfaces to AI is a whole new industry</p> */}

			<p>
				Think with me. The highest cost on most industries is <strong>human labor</strong>, meaning that every second saved by using an AI system, from a simple copy/paste from/into ChatGPT up to a fully automated swarm of agents, saves energy and <strong>will eventually translate into cheaper products</strong>.
			</p>

			<br />

			<blockquote>
				"They're not coming for me though, lol"
				<p>— my barber</p>
			</blockquote>

			<p>
				Sometimes an image is worth a million words.
				<img src="../media/jensen-and-the-robots.png" alt="Jensen Huang and an army of humanoid robots" className="my-1" />
				<span className="text-muted-foreground text-sm">This is Jensen Huang, CEO of Nvidia, showing <strong>just a few of</strong> the humanoid robots being developed. They're coming — trillions of them.</span>
			</p>

			<p>
				1. Think tasks, not jobs.
			</p>
			{/* 
						<p>
							This is a whole new industry: <strong>creating interfaces for AI companions</strong>. Apps like Cursor, ChatGPT, Claude, and MCP are not just products—they're the closest things we have to digital collaborators, and they're getting better every day. Google is now just a tool for companions. Tavily, EXA, Perplexity, and many more are building the connective tissue for this new world.
						</p> */}
			{/* 
						<p>
							Sam Altman recently said we should stop thinking in terms of models and start thinking in terms of <strong>systems</strong>—integrated, evolving, tool-using, feedback-driven entities. In his words: <em>"In both ChatGPT and our API, we will release GPT-5 as a system that integrates a lot of our technology, including o3."</em> (<Link href="https://x.com/sama/status/1889755723078443244">source</Link>)
						</p> */}

			<p>
				2. Instead, it's a continuous merge—<strong>humans and AI are merging</strong>. The best description is simply: <strong>The Merge</strong> (<Link href="https://blog.samaltman.com/the-merge">read more</Link>). This cannot be stopped. Even if all research stopped today, the efficiency gains from what we already have would keep compounding. The total energy required to accomplish any task—especially with a human+companion team—is dropping <strong>fast</strong>.
			</p>

			{/* <p>
							We should stop worrying that "this process isn't fully automated because there's still a human in the loop." Instead, look at the total cost: how much energy does it take for a human to fulfill a task? How much for a human+companion? That number is dropping everywhere, and it's coming for every industry.
						</p> */}

			{/* <p>
							<strong>It will be fine.</strong> It doesn't matter exactly how, or even if we're right about every detail. We just have to move fast, learn from mistakes, and not repeat them. If we're wrong, we adjust. Otherwise, we keep accelerating.
						</p> */}

			<p>
				3. AGI is happening everywhere, every day, evolving alongside humankind. We are merging. What today seems like sophisticated AI, tomorrow will seem like child's play. The future is one where humans are free from boring work, where anyone can create a world-class film, song, game, or app. The value of everything trends toward zero, and that's a good thing.
			</p>
		</section>
	);
}