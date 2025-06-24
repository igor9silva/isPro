import { createFileRoute } from "@tanstack/react-router";
import { Expand, Shrink } from "lucide-react";
import { useEffect, useState } from "react";

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
			<button
				type="button"
				onClick={() => setIsFullWidth(!isFullWidth)}
				className="fixed top-4 right-4 p-3"
			>
				{isFullWidth ? <Shrink /> : <Expand />}
			</button>

			<main
				className="w-full mx-auto p-4 transition-[max-width] duration-150 ease-out"
				style={{ maxWidth: isFullWidth ? "100vw" : "64rem" }}
			>
				<h1>AGI achieved; now what?</h1>

				<p>
					Lets first address what AGI — Artificial General Intelligence — is.
				</p>

				<p>
					There is a wide range of definitions accross the tech industry, but
					they all seem to converge into a human-level sort of artificial
					intelligence.
				</p>

				<blockquote>
					<p>"[...] with capabilities that rival human cognitive functions"</p>
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
					Considering the focus on <strong>intelligence</strong>, it's natural
					to think of it as a model. More specifically a large language model,
					as those are the ones the feel intelligent today.
				</p>

				<p>
					But here is the thing: by that definition, it's been achieved long
					ago. Likely with the introduction of GPT-4, and it's easy to evidence
					that no single human could beat it on a wide test.
				</p>

				<p>
					By wide I mean on a mixed range of disciplines, industries, areas,
					whatever.
				</p>

				<p>In fact, lets exercise this now.</p>

				<p>
					I've asked 4 questions to GPT 4.1 mini (the worst currently available
					model on ChatGPT), plus a double check by o3 (which is a system, not a
					model — more on that below).
				</p>

				<ol>
					<li>
						Write Rust code (with unit tests) that applies SIMD-vectorized ReLU
						to a f32 slice using std::arch.
						<br />
						<a href="https://chatgpt.com/share/68593c5a-7eb4-8013-9967-96e84530d198">
							https://chatgpt.com/share/68593c5a-7eb4-8013-9967-96e84530d198
						</a>
					</li>

					<li>
						Create a decision flowchart for diagnosing iron-deficiency anemia in
						primary care using ferritin, transferrin saturation, CRP, and
						colonoscopy referral thresholds.
						<br />
						<a href="https://chatgpt.com/share/68593c75-a428-8013-9e92-287bd48e7780">
							https://chatgpt.com/share/68593c75-a428-8013-9e92-287bd48e7780
						</a>
					</li>

					<li>
						Prove every finite group of order p² is abelian.
						<br />
						<a href="https://chatgpt.com/share/68592f50-5edc-8013-bceb-30d5e85a1bc8">
							https://chatgpt.com/share/68592f50-5edc-8013-bceb-30d5e85a1bc8
						</a>
					</li>

					<li>
						Draft a GDPR-compliant privacy notice for a wearable glucose monitor
						that transfers data to U.S. servers, citing legal bases and
						retention limits.
						<br />
						<a href="https://chatgpt.com/share/68593909-03f4-8013-a411-27cf0a3664aa">
							https://chatgpt.com/share/68593909-03f4-8013-a411-27cf0a3664aa
						</a>
					</li>
				</ol>

				<p>
					<a href="/can-you.png">Can you</a> anwser them all?
				</p>

				<p>Can anyone?</p>

				<p>Speaking for myself, I can barely understand the questions.</p>

				<p>Maybe a PhD could anwser... one of them.</p>

				<p>
					Of course if I had an infinite amount of time and access to all human
					tools (like the internet), I could. But that's not what it did.
				</p>

				<p>
					All answers came in less than 3 seconds and on the first try. It's
					like if you replied instantly, word by word, with no prior search, no
					backspace, no drafting; nothing. Just pure instant answer like you do
					when asked what's 2+2.
				</p>

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
					Say I want to publish a book on software development, which is a topic
					I'm comfortable with since I've been doing it for ~15 years.
				</p>

				<p>
					Can I do it on a single session, like the GPT examples above? Can I
					sit down, open my preferred text editor, and just type it word by word
					until it's done?
				</p>

				<p>Of course not!</p>

				<p>I need to iterate (a lot!) on it.</p>

				<p>
					I'll write, re-write, research, change my mind, read it again and
					again, fix typos, and lot more, until it's done. And that takes time!
				</p>

				<p>
					In fact,{" "}
					<a href="https://reedsy.com/studio/resources/how-long-does-it-take-to-write-a-book">
						it's said
					</a>{" "}
					to take <strong>something between weeks and years</strong> to write
					any publishable book.
				</p>

				<p>
					Stephen King, a professional writer,{" "}
					<a href="https://www.masterclass.com/articles/how-long-does-it-take-to-write-a-book">
						strives to write 10 pages per day
					</a>
					.
				</p>

				<p>
					So <strong>intelligence</strong> — the abillity to coherently predict
					the future — plus the drive to achieve something,{" "}
					<strong>is not enough</strong>.
				</p>

				<p>
					You also need a <strong>feedback loop</strong>.
				</p>

				<h2>So... a loop, huh?</h2>

				<p>Let's break it down.</p>

				<p>
					The loop is a simple concept, repeating the same action until a
					condition is met.
				</p>

				<p>
					And the feedback is an evalutation of the current state — a judgement.
					It answers the question <code>is the condition met?</code>. Or, in
					other words <code>should the loop stop or continue?</code>.
				</p>

				<img src="../feedback-loop.png" alt="" />

				<p>
					If you are following AI progress, it might have rang a bell on you
					already, because that's what reasoning (a.k.a. Chain of Thoughts
					a.k.a. test-time compute) is all about. <strong>Iterating.</strong>
				</p>

				<p>
					There are "hard" tasks, like math, where the output is either right or
					wrong. But that's not true for most things. Creative things!
				</p>

				<p>
					On those, the more you iterate, the better it gets. Forever, but
					logarithmically. You can always keep going, but the improvement for
					each iteration gets lower.
				</p>

				<p>It's that simple.</p>

				<img src="../log-growth.png" alt="" />

				<p>Think about how you write an email.</p>

				<p>
					You start with a few words, read them, delete some, replace others,
					make it longer, then shorter. You change the tone, add details, add
					attachments... You essentially iterate until you evaluate it as "good
					enough".
				</p>

				<p>
					Sometimes it's not as good as you'd like, but your time is
					constrained, so you move on to the next task.
				</p>

				<p>That's also how it works for AIs.</p>

				<p>
					OpenAI's o1,{" "}
					<a href="https://openai.com/o1/">announced in Sep. 2024</a>, was the
					first model to introduce a feedback loop, along with the idea of a
					"thinking budget" — the analog of your time on the example above.
				</p>

				<p>
					Since then, all major LLM providers have introduced "reasoning
					models", setting it as an industry standard.
				</p>

				<img src="../arc-agi.png" alt="" />

				<p>
					Those are o3 results on a very popular benchmark for AGI —{" "}
					<a href="https://arcprize.org/leaderboard">ARC-AGI-1</a>. Note that
					adding more resources (budget) results in a better score, but each
					step improves it less — effectively getting more and more expensive
					the more you iterate.
				</p>

				<p>
					That leads us into the conclusion that virtually any task is doable,{" "}
					<strong>given enough resources</strong>.
				</p>

				<p>
					The real question is: <strong>is it viable?</strong>
				</p>

				<p>
					I should also mention that there is a second hidden cost:{" "}
					<strong>time</strong>. The ultimate nature currency!
				</p>

				<p>
					So from now on, I'll refer to the combined cost of time and money as{" "}
					<strong>energy</strong>.
				</p>

				<h2>Biological intelligence isn't different</h2>

				<p>
					This iterative pattern isn't unique to artificial systems. Humans
					follow the exact same principle.
				</p>

				<p>
					Consider any skill acquisition. A surgeon doesn't emerge fully formed
					— they iterate through years of education, practice, and refinement.
					Each procedure builds on the last, following that same logarithmic
					improvement curve. Early iterations (basic anatomy) yield massive
					gains. Later ones (perfecting techniques) cost exponentially more for
					marginal improvements.
				</p>

				<p>
					The same applies to any domain. Programming, law, medicine, creative
					writing — all require countless iterations of learning, practicing,
					and refining until competency emerges.
				</p>

				<p>
					What's fascinating is that humans can tackle virtually any task
					through this process. Give someone enough time and resources, and they
					could theoretically master anything from rocket science to brain
					surgery. The human brain is remarkably general-purpose when paired
					with sufficient iteration.
				</p>

				<p>
					But here's the kicker: <strong>it's prohibitively expensive</strong>.
				</p>

				<p>
					Learning complex skills requires years of focused effort, expensive
					education, and countless failed attempts. Most humans specialize in
					narrow domains precisely because the energy cost of iterating across
					multiple fields is unsustainable.
				</p>

				<p>
					Sound familiar? It's the same viability problem that constrains AI
					systems.
				</p>

				<p>
					Both biological and artificial intelligence are fundamentally limited
					by the same economics: infinite capability gated by finite resources.
				</p>

				<p>
					Gancho para falar sobre sociedade, compartilhamento de conhecimento,
					COLABORAÇÃO, etc.
				</p>

				<p>
					E evolução, linguagem como possibilitador de assimilação de ideias
					mais complexas.
				</p>
			</main>
		</>
	);
}
