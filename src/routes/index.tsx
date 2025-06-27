import { createFileRoute } from "@tanstack/react-router";
import { Expand, Shrink } from "lucide-react";
import { useEffect, useState } from "react";
import { CollapsiblePanel } from "~/components/CollapsiblePanel";
import { Link } from "~/components/Link";
import { Button } from "~/components/ui/button";

export const Route = createFileRoute("/")({
	component: Main,
});

function Main() {
	//
	const [isFullWidth, setIsFullWidth] = useState(() => {
		// Only access localStorage on the client side
		if (typeof window !== "undefined") {
			const saved = localStorage.getItem("isFullWidth");
			return saved ? JSON.parse(saved) : false;
		}
		return false; // Default value for SSR
	});

	// Persist to localStorage whenever the state changes
	useEffect(() => {
		if (typeof window !== "undefined") {
			localStorage.setItem("isFullWidth", JSON.stringify(isFullWidth));
		}
	}, [isFullWidth]);

	return (
		<>
			<Button
				variant="ghost"
				onClick={() => setIsFullWidth(!isFullWidth)}
				className="hidden md:flex fixed top-4 right-4"
			>
				{isFullWidth ? <Shrink /> : <Expand />}
			</Button>

			<article
				className="mx-auto p-4 transition-[max-width] duration-150 ease-out"
				style={{ maxWidth: isFullWidth ? "100vw" : "64rem" }}
			>
				<header>
					<h1>AGI achieved; now what?</h1>
				</header>

				<section>
					<p>
						First of all, yes. I'm calling it.
						<p>
							<strong>AGI has been achieved.</strong>
						</p>
					</p>

					<br />
					<br />

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
						<p>
							"[...] with capabilities that rival human cognitive functions"
						</p>
					</blockquote>

					<blockquote>
						<p>
							"[...] can demonstrate human-like intelligence across multiple
							domains"
						</p>
					</blockquote>

					<blockquote>
						<p>"[...] that can match or exceed human reasoning abilities"</p>
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

					<p>Intelligence-wise, no single human beats GPT-4.</p>

					<p>
						<strong>AGI has been achieved.</strong>
					</p>
				</section>

				<section>
					<h2>
						So why I'm not <em>feeling the AGI</em>?
					</h2>

					<p>Or more importantly, why do I still have to work?!</p>

					<p>
						Well, let's picture what it takes to actually{" "}
						<strong>create value</strong>. i.e. supply a product or provide a
						service that helps someone.
					</p>

					<p>
						Say I want to publish a book on software development, which is a
						topic I'm comfortable with since I've been doing it for ~15 years.
					</p>

					<p>
						Can I do it on a single session, like the GPT examples above? Can I
						sit down, open my preferred text editor, and just type it word by
						word until it's done?
					</p>

					<p>Of course not!</p>

					<p>I need to iterate (a lot!) on it.</p>

					<p>
						I'll write, re-write, research, change my mind, read it again and
						again, fix typos, and lot more, until it's done. And that takes
						time!
					</p>

					<p>
						In fact,{" "}
						<Link href="https://reedsy.com/studio/resources/how-long-does-it-take-to-write-a-book">
							it's said
						</Link>{" "}
						to take <strong>something between weeks and years</strong> to write
						any publishable book.
					</p>

					<p>
						Stephen King, a professional writer,{" "}
						<Link href="https://www.masterclass.com/articles/how-long-does-it-take-to-write-a-book">
							strives to write 10 pages per day
						</Link>
						.
					</p>

					<p>
						So <strong>intelligence</strong> — the ability to coherently predict
						the future — <strong>is not enough</strong>.
					</p>

					<p>
						You also need a <strong>feedback loop</strong>.
					</p>
				</section>

				<section>
					<h2>So... a loop, huh?</h2>

					<p>Let's break it down.</p>

					<p>
						The loop is a simple concept, repeating the same action until a
						condition is met.
					</p>

					<p>
						And the feedback is an evaluation of the current state — a
						judgement. It answers the question{" "}
						<code>is the condition met?</code>. Or, in other words{" "}
						<code>should the loop stop or continue?</code>.
					</p>

					<img src="../media/feedback-loop.png" alt="Feedback loop diagram" />

					<p>
						If you are following AI progress, it might have rang a bell on you
						already, because that's what reasoning (a.k.a. Chain of Thoughts
						a.k.a. test-time compute) is all about. <strong>Iterating.</strong>
					</p>

					<p>
						There are "hard" tasks, like math, where the output is either right
						or wrong. But that's not true for most things. Creative things!
					</p>

					<p>
						On those, the more you iterate, the better it gets. Forever, but
						logarithmically. You can always keep going, but the improvement for
						each iteration gets lower.
					</p>

					<p>It's that simple.</p>

					<img src="../media/log-growth.png" alt="Logarithmic growth curve" />

					<p>Think about how you write an email.</p>

					<p>
						You start with a few words, read them, delete some, replace others,
						make it longer, then shorter. You change the tone, add details, add
						attachments... You essentially iterate until you evaluate it as
						"good enough".
					</p>

					<p>
						Sometimes it's not as good as you'd like, but your time is
						constrained, so you move on to the next task.
					</p>

					<p>That's also how it works for AIs.</p>

					<p>
						OpenAI's o1,{" "}
						<Link href="https://openai.com/o1/">announced in Sep. 2024</Link>,
						was the first model to introduce a feedback loop, along with the
						idea of a "thinking budget" — the analog of your time on the example
						above.
					</p>

					<p>
						Since then, all major LLM providers have introduced "reasoning
						models", setting it as an industry standard.
					</p>

					<img src="../media/arc-agi.png" alt="ARC-AGI benchmark results" />

					<p>
						Those are o3 results on a very popular benchmark for AGI —{" "}
						<Link href="https://arcprize.org/leaderboard">ARC-AGI-1</Link>. Note
						that adding more budget (shown as <code>low</code>,{" "}
						<code>medium</code>, <code>high</code>) results in a better score,
						but each step improves it less — <strong>increasingly expensive, never
							capped</strong>.
					</p>

					<p>
						I should also mention that there is a second and hidden cost:{" "}
						<strong>time</strong>. The ultimate nature currency!
					</p>

					<p>
						So, from now on, I'll refer to the combined cost of time and money as{" "}
						<strong>energy</strong>.
					</p>

					<br />

					<blockquote>
						<p>
							"Ok so intelligence plus a loop. We have that. <strong>Can I quit my job?</strong>" — you rn
						</p>
					</blockquote>

					<p>
						Not yet, but we're getting there. Stay with me.
					</p>


					<section>
						<h2>On collaboration</h2>

						<p>
							Benchmarks, like ARC-AGI-1, are a set of tests to evaluate and compare models performance.
						</p>

						<p>
							Pretty much like how we test humans, they're usually performed with no access to external tools or help of any kind.
						</p>

						<p>
							It's the equivalent of sitting down with a pen and paper. You can think as much as you want (within the test limits), but you can't reach for a calculator or the internet or anyone else.
						</p>

						<p>
							While it makes sense for comparison, benchmarks are not a good representation of what a system can produce. Again, similarly to how one can do great on a test but fail miserably on an actual job.
						</p>

						<p>
							When we think of biological intelligences (<em>homo sapiens</em>),
							we are used to believe that virtually <strong>anything is achievable</strong>.
						</p>

						<p>
							I mean... I could do open heart surgery. Or design a reusable rocket. Or surf a monster wave.
						</p>

						<p>
							Anyone could, given enough <strong><em>energy</em></strong> to learn and iterate.
						</p>

						<p>
							I could go through college, residency, training... and, in about 10 years, perform such surgery. Just doesn't sound like a good deal.
						</p>

						<p>
							But I could.
						</p>

						<p>
						</p>
						{/* <TODO>
							- biological intelligences can do anything
							- https://artificialanalysis.ai
						</TODO> */}

						<p>
							That only works because of: <strong>knowledge</strong>.
						</p>

						<p>Knowledge is the foundation of intelligence.</p>
						<p>
							<strong>That also holds true for artificial intelligences.</strong>.
							Give it enough energy
						</p>

						<p>
							The real question is: <strong>is it viable?</strong>
						</p>


					</section>

					<h1>WORK IN PROGRESS</h1>

					<CollapsiblePanel
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
						]}
					/>
				</section>
			</article >
		</>
	);
}
