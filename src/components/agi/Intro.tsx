import { Link } from '~/components/Link';
import { Parenthetical } from '~/components/ui/parenthetical';

export function Intro() {
	return (
		<section>
			<p>
				First of all, yes. I'm calling it.
				<p>But...</p>
			</p>

			<br />

			<p className="italic">
				<span>
					[This is a discussion on AI, the future of humankind, post-labor economics and
					our research on achieving infinite productivity.]
				</span>
			</p>

			<br />

			<p>Let's start by addressing what AGI — Artificial General Intelligence — means.</p>

			<p>
				There is a wide range of definitions across the tech industry, but they all seem to
				converge into a human-level sort of artificial intelligence.
			</p>

			<blockquote>"[...] with capabilities that rival human cognitive functions"</blockquote>

			<blockquote>
				"[...] can demonstrate human-like intelligence across multiple domains"
			</blockquote>

			<blockquote>"[...] that can match or exceed human reasoning abilities"</blockquote>

			<p>
				Considering just <strong>intelligence</strong>, it's natural to think of it as a
				model. More specifically, a large language model; as those are the ones that feel
				intelligent today.
			</p>

			<p>
				But here is the thing: by that definition, it's been achieved long ago. Likely with
				the <Link href="https://openai.com/index/gpt-4/">introduction of GPT-4</Link>, given
				that{' '}
				<span className="font-bold">
					no single human could beat it on a{' '}
					<Parenthetical
						content="As
				in a mixed range of disciplines, industries, areas, whatever."
					>
						wide test
					</Parenthetical>
				</span>
				.
			</p>

			<p>
				Consider this thought experiment: design a test covering 20 diverse domains -
				quantum physics, medieval history, contract law, protein folding, Mandarin
				translation, statistical analysis, creative writing, etc. Now find a single human
				who could outperform GPT-4 on that.
			</p>

			<p>In fact, let's exercise this now.</p>

			<p>
				I've asked 4 questions to GPT 4.1 mini (the worst currently available model on
				ChatGPT), plus a double check by o3 (which is a system, not just a model —{' '}
				<em>more on that below</em>).
			</p>

			<ol>
				<li>
					<Link href="https://chatgpt.com/share/68593c5a-7eb4-8013-9967-96e84530d198">
						Write Rust code (with unit tests) that applies SIMD-vectorized ReLU to a f32
						slice using std::arch.
					</Link>
				</li>

				<li>
					<Link href="https://chatgpt.com/share/68593c75-a428-8013-9e92-287bd48e7780">
						Create a decision flowchart for diagnosing iron-deficiency anemia in primary
						care using ferritin, transferrin saturation, CRP, and colonoscopy referral
						thresholds.
					</Link>
				</li>

				<li>
					<Link href="https://chatgpt.com/share/68592f50-5edc-8013-bceb-30d5e85a1bc8">
						Prove every finite group of order p² is abelian.
					</Link>
				</li>

				<li>
					<Link href="https://chatgpt.com/share/68593909-03f4-8013-a411-27cf0a3664aa">
						Draft a GDPR-compliant privacy notice for a wearable glucose monitor that
						transfers data to U.S. servers, citing legal bases and retention limits.
					</Link>
				</li>
			</ol>

			<p>
				<p>
					<Link href="/media/can-you.png">Can you</Link> provide better answers to all of
					them?
				</p>
				<p> To any of them?</p>
				<p>Can anyone?</p>
			</p>

			<p>
				Speaking for myself, I can barely understand the questions. Maybe a PhD could answer
				better... <strong>one of them.</strong>
			</p>

			<p>
				Of course if I had an infinite amount of time and access to all human tools (like
				the internet), I could. But that's not what it did.
			</p>

			<p>
				All answers came in less than 3 seconds and on the first try. It's like if you
				replied instantly, word by word, with no prior search, no backspace, no drafting;
				nothing. Just pure instant answer like you do when asked what's 2+2.
			</p>

			<p>
				While a domain expert might beat it on their specialty, no human possesses
				expert-level knowledge across the breadth that current LLMs demonstrate. This isn't
				about peak performance in narrow domains - it's about consistent competence across
				unlimited domains.
			</p>

			<p>
				Being 80% competent on everything is <strong>way more valuable</strong> than being
				100% competent on one thing. By far.
			</p>

			{/* <p>
				The 'hallucination problem' is frequently cited as a fundamental limitation of current AI systems. However, this framing reveals a misunderstanding of both the nature of intelligence and creativity itself.
				As Google DeepMind's Demis Hassabis noted, 'hallucination isn't always a bug - it can be a tool for creativity.' This insight cuts to the heart of the matter: the same mechanism that produces 'incorrect' outputs in factual contexts produces novel, creative outputs in generative contexts.
				What people call 'hallucinations' are often:
				Requests for information the model genuinely doesn't know (solution: tool access)
				Creative extrapolation beyond training data (this is actually desirable for many tasks)
				Ambiguous queries where multiple valid interpretations exist (solution: clarification)
				Outdated training data (solution: real-time information retrieval)
				The key insight: creativity and hallucination are the same underlying process. When you want an AI to write poetry, generate novel ideas, or think outside the box, you're explicitly asking it to 'hallucinate' in a controlled way. The challenge isn't eliminating this capability - it's directing it appropriately.
				When LLMs have access to verification tools, search capabilities, and clear feedback loops, unwanted 'hallucination' rates drop to negligible levels while preserving creative capability. The issue isn't the model - it's the system design and task specification.

				ref: https://www.youtube.com/watch?v=KUzuQpMdQZo (41:49 ~ 42:38)
			</p> */}

			<p>Intelligence-wise, no single human beats GPT-4.</p>

			<p>
				<strong>AGI has been achieved.</strong>
			</p>

			<br />
			<br />

			<p>Right?</p>
		</section>
	);
}
