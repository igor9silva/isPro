import { CollapsiblePanel } from "~/components/CollapsiblePanel";
import { Link } from "~/components/Link";

export function WhatNow() {
	return (
		<section>
			<h2>What now?</h2>

			<p>
				I hope that at this point you're convinced that it's happening, and that there's no turning back; which leads to a lot of questions like "What will happen when humans are no longer employable?". And those are really important questions.
			</p>

			<p>
				For thousands of years (maybe millions), survival, status, and meaning flowed from productive contribution. Every major social form encoded this. Even our earliest hunter-gatherer ancestors <Link href="https://openstax.org/books/introduction-anthropology/pages/7-3-gathering-and-hunting">organized their entire social structures around work divisions</Link>.
			</p>

			<p>
				But I must tell you that this is extremely hard to predict. Impossible, to be honest. There are so many variables, so many interactions, so many actors that no one can tell you exactly what will happen nor when. <Link href="/media/naval-doesnt-get-it.mp4">Not even the most brilliant minds can.</Link>
			</p>

			<p>
				Me? <strong>Extremely optimistic.</strong>
			</p>

			<p>
				I believe that we'll live in a world where humans are free from boring work. When you don't have to labor for a living, you can work — word that will lose it's meaning overtime — on whatever you want.
			</p>

			<p>
				<strong>A purpose crisis is what really troubles me.</strong> I mean, humans will still be humans. We like to compete, we can create infinite entertainment, we'll be able to be full-time parents, visit every corner of the world, and so on. But will that fulfill us? Will our future children have enough motivation to study, given that there is no longer a reward for it?
			</p>
			{/* 
			<p>
				from https://www.youtube.com/watch?v=KZ9cYDeum4U
				people will:
				- compete, sports
				- entertainment
				- being great at stuff
				- full-time pareting, no conflicting with the work anymore
				- servants will be free
				- "Post labor economics"
			</p> */}

			{/* 
						<p>
							This is a whole new industry: <strong>creating interfaces for AI companions</strong>. Apps like Cursor, ChatGPT, Claude, and MCP are not just products—they're the closest things we have to digital collaborators, and they're getting better every day. Google is now just a tool for companions. Tavily, EXA, Perplexity, and many more are building the connective tissue for this new world.
						</p> */}
			{/* 
						<p>
							Sam Altman recently said we should stop thinking in terms of models and start thinking in terms of <strong>systems</strong>—integrated, evolving, tool-using, feedback-driven entities. In his words: <em>"In both ChatGPT and our API, we will release GPT-5 as a system that integrates a lot of our technology, including o3."</em> (<Link href="https://twitter.com/sama/status/1889755723078443244">source</Link>)
						</p> */}

			{/* <p>
				2. Instead, it's a continuous merge—<strong>humans and AI are merging</strong>. The best description is simply: <strong>The Merge</strong> (<Link href="https://blog.samaltman.com/the-merge">read more</Link>). This cannot be stopped. Even if all research stopped today, the efficiency gains from what we already have would keep compounding. The total energy required to accomplish any task—especially with a human+companion team—is dropping <strong>fast</strong>.
			</p>

			<p>
				TODO:
				Humans are powerful because we work as a single network. We orchestrate our behavior through communication. A language capable of representing complex ideas is what enables that.

				200000 years, same genes

				AIs are becoming part of that same network. It's like we were able to fabricate more humans.


			</p> */}

			{/* <p>
							We should stop worrying that "this process isn't fully automated because there's still a human in the loop." Instead, look at the total cost: how much energy does it take for a human to fulfill a task? How much for a human+companion? That number is dropping everywhere, and it's coming for every industry.
						</p> */}

			{/* <p>
							<strong>It will be fine.</strong> It doesn't matter exactly how, or even if we're right about every detail. We just have to move fast, learn from mistakes, and not repeat them. If we're wrong, we adjust. Otherwise, we keep accelerating.
						</p> */}

			{/* <p>
				3. AGI is happening everywhere, every day, evolving alongside humankind. We are merging. What today seems like sophisticated AI, tomorrow will seem like child's play. The future is one where humans are free from boring work, where anyone can create a world-class film, song, game, or app. The value of everything trends toward zero, and that's a good thing.
			</p> */}

			<CollapsiblePanel
				title="References"
				icon="🔗"
				references={[
					{
						url: "https://www.youtube.com/watch?v=3qHkcs3kG44&t=1988s",
						title: <>
							<Link href="https://twitter.com/naval">@naval</Link>{' '}
							<Link href="https://www.youtube.com/watch?v=3qHkcs3kG44&t=1988s">on Joe Rogan, 2019.</Link>
						</>,
					},
				]}
			/>

		</section>
	);
}
