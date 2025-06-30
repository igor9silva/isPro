import { Link } from "~/components/Link";

export function Intro() {
	return (
		<section>
			<p>
				First of all, yes. I'm calling it.
			</p>

			<p>But...</p>

			<p>
				Let's first address what AGI — Artificial General Intelligence — is.
			</p>

			<p>
				There is a wide range of definitions across the tech industry, but
				they all seem to converge into a human-level sort of artificial
				intelligence.
			</p>

			<blockquote>
				"[...] with capabilities that rival human cognitive functions"
			</blockquote>

			<blockquote>
				"[...] can demonstrate human-like intelligence across multiple
				domains"
			</blockquote>

			<blockquote>
				"[...] that can match or exceed human reasoning abilities"
			</blockquote>

			<p>
				Considering just <strong>intelligence</strong>, it's natural
				to think of it as a model. More specifically, a large language model;
				as those are the ones that feel intelligent today.
			</p>

			<p>
				But here is the thing: by that definition, it's been achieved long
				ago. Likely with the introduction of GPT-4.
			</p>

			<p>
				No single human could beat no single large model on a wide test (as
				in a mixed range of disciplines, industries, areas, whatever).
			</p>

			<p>In fact, let's exercise this now.</p>

			<p>
				I've asked 4 questions to GPT 4.1 mini (the worst currently
				available model on ChatGPT), plus a double check by o3 (which is a
				system, not just a model — <em>more on that below</em>).
			</p>

			<ol>
				<li>
					Write Rust code (with unit tests) that applies SIMD-vectorized
					ReLU to a f32 slice using std::arch.
					<br />
					<Link href="https://chatgpt.com/share/68593c5a-7eb4-8013-9967-96e84530d198">
						https://chatgpt.com/share/68593c5a-7eb4-8013-9967-96e84530d198
					</Link>
				</li>

				<li>
					Create a decision flowchart for diagnosing iron-deficiency anemia
					in primary care using ferritin, transferrin saturation, CRP, and
					colonoscopy referral thresholds.
					<br />
					<Link href="https://chatgpt.com/share/68593c75-a428-8013-9e92-287bd48e7780">
						https://chatgpt.com/share/68593c75-a428-8013-9e92-287bd48e7780
					</Link>
				</li>

				<li>
					Prove every finite group of order p² is abelian.
					<br />
					<Link href="https://chatgpt.com/share/68592f50-5edc-8013-bceb-30d5e85a1bc8">
						https://chatgpt.com/share/68592f50-5edc-8013-bceb-30d5e85a1bc8
					</Link>
				</li>

				<li>
					Draft a GDPR-compliant privacy notice for a wearable glucose
					monitor that transfers data to U.S. servers, citing legal bases
					and retention limits.
					<br />
					<Link href="https://chatgpt.com/share/68593909-03f4-8013-a411-27cf0a3664aa">
						https://chatgpt.com/share/68593909-03f4-8013-a411-27cf0a3664aa
					</Link>
				</li>
			</ol>

			<p>
				<p><Link href="/media/can-you.png">Can you</Link> provide better answers to all of them?</p>
				<p>	To any of them?</p>
				<p>Can anyone?</p>
			</p>

			<p>
				Speaking for myself, I can barely understand the questions. Maybe a
				PhD could answer better... <strong>one of them.</strong>
			</p>

			<p>
				Of course if I had an infinite amount of time and access to all
				human tools (like the internet), I could. But that's not what it
				did.
			</p>

			<p>
				All answers came in less than 3 seconds and on the first try. It's
				like if you replied instantly, word by word, with no prior search,
				no backspace, no drafting; nothing. Just pure instant answer like
				you do when asked what's 2+2.
			</p>

			<p>Intelligence-wise, no single human beats a single GPT-4.</p>

			<p>
				<strong>AGI has been achieved.</strong>
			</p>

			<br />
			<br />

			<p>
				Right?
			</p>

		</section>
	);
}