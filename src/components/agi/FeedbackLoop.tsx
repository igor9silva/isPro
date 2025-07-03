import { CollapsiblePanel } from '~/components/CollapsiblePanel';
import { Link } from '~/components/Link';
import { Parenthetical } from '~/components/ui/parenthetical';

export function FeedbackLoop() {
	return (
		<section>
			<h2 id="feedback-loop">So... a loop, huh?</h2>

			<p>Let's break it down.</p>

			<p>The loop is a simple concept, repeating the same action until a condition is met.</p>

			<p>
				And the feedback is an evaluation of the current state — a judgement. It answers the
				question <code>is the condition met?</code>. Or, in other words{' '}
				<code>should the loop stop or continue?</code>.
			</p>

			<img src="../media/feedback-loop.png" alt="Feedback loop diagram" />

			<p>
				If you are following AI progress, it might have rang a bell on you already, because
				that's what{' '}
				<Parenthetical content="(a.k.a. Chain of Thoughts, a.k.a. test-time compute).">
					reasoning
				</Parenthetical>{' '}
				is all about. <strong>Iterating.</strong>
			</p>

			<p>
				There are "hard" tasks, like math, where the output is either right or wrong. But
				that's not true for most things. Creative things!
			</p>

			<p>
				On those, the more you iterate, the better it gets. Forever, but logarithmically.
				You can always keep going, but the improvement for each iteration gets lower.
			</p>

			<img src="../media/log-growth.png" alt="Logarithmic growth curve" />

			<p>Think about how you write an email.</p>

			<p>
				You start with a few words, read them, delete some, replace others, make it longer,
				then shorter. You change the tone, add details, add attachments... You essentially
				iterate until you evaluate it as "good enough".
			</p>

			<p>
				Sometimes it's not as good as you'd like, but your time is constrained, so you move
				on to the next task.
			</p>

			<p>That's also how it works for AIs.</p>

			<p>
				OpenAI's o1, <Link href="https://openai.com/o1/">announced in Sep. 2024</Link>, was
				the first model to introduce a feedback loop, along with the idea of a "thinking
				budget" — the analog of your time on the example above.
			</p>

			<p>
				Since then, all major LLM providers have introduced "reasoning models", setting it
				as an industry standard.
			</p>

			<img src="../media/arc-agi.png" alt="ARC-AGI benchmark results" />

			<p>
				Those are o3 (lastest OpenAI model) results on a very popular benchmark for AGI —{' '}
				<Link href="https://arcprize.org/leaderboard">ARC-AGI-1</Link>. Note that adding{' '}
				<Parenthetical content={`Shown as "low", "medium" and "high".`}>
					more budget
				</Parenthetical>{' '}
				results in a better score, but each step improves it less —{' '}
				<strong>increasingly expensive, never capped</strong>.
			</p>

			<p>
				In other words, <strong>unlimited intelligence</strong>.
			</p>

			<p>
				It's that simple, but keep in mind that "unlimited intelligence" is just as limited
				as your wallet, as it gets exponentially more expensive.
			</p>

			<p>
				I should also mention that there is a secondary hidden cost: <strong>time</strong> —
				the ultimate nature currency! So from now on, I'll refer to the combined cost of
				time and money as <strong>energy</strong>.
			</p>

			<br />

			{/* <blockquote>
						<p>
							"Unlimited? Can it do my taxes? lol" — you rn
						</p>
					</blockquote> */}
			<blockquote>
				<p>Until AI does my bookkeeping and files my taxes I don't give a shit about it.</p>
				<p>
					&mdash; @AtomicChild{' '}
					<Link href="https://twitter.com/AtomicChild/status/1839156050815070232?ref_src=twsrc%5Etfw">
						September 26, 2024
					</Link>
				</p>
			</blockquote>

			<p>We're getting there. Stay with me.</p>

			<CollapsiblePanel
				title="Related papers"
				icon="📚"
				references={[
					{
						url: 'https://arxiv.org/abs/2305.10601',
						title: `Tree of Thoughts: Deliberate Problem Solving with Large Language Models`,
					},
					{
						url: 'https://arxiv.org/abs/2303.17651',
						title: `Self-Refine: Iterative Refinement with Self-Feedback`,
					},
					{
						url: 'https://arxiv.org/abs/2303.11366',
						title: `Reflexion: Language Agents with Verbal Reinforcement Learning`,
					},
					{
						url: 'https://arxiv.org/abs/2502.18600',
						title: `Chain of Draft: Thinking Faster by Writing Less`,
					},
					{
						url: 'https://arxiv.org/abs/2412.18547',
						title: `Token-Budget-Aware LLM Reasoning`,
					},
					{
						url: 'https://arxiv.org/abs/2505.11274',
						title: `SelfBudgeter: Adaptive Token Allocation for Efficient LLM Reasoning`,
					},
				]}
			/>
		</section>
	);
}
