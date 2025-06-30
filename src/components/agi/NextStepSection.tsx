import { Link } from "~/components/Link";

export function NextStepSection() {
	return (
		<section>
			<h2>The next step</h2>

			<p>
				As we just saw, putting an LLM on a loop makes it infinitely intelligent; but we need more. <strong>We need results.</strong>
			</p>

			<p>
				We need actual products being created and distributed. Real services being provided, helping real people solve real problems.
			</p>

			<p>
				For that, we need a system that can <strong>act</strong>, rather than just think.
			</p>

			<p>
				A system that can learn continuously through it's interactions with the world. One that can <strong>adapt</strong> to any situation, learn new skills when needed, educate itself on new subjects, iterate on solutions for hours, days, maybe months!
			</p>

			<p>
				From now on, I'll refer to such systems as <strong>companions</strong>.
				<p className="text-xs text-muted-foreground">
					Hey it's <Link className="decoration-wavy" href="/media/companions.mov">not the best term ever</Link>, but bad naming is an industry standard by now, so <strong>companion</strong> it is 😁
				</p>
			</p>

			{/* ------------------------------------------------------------ */}

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
	);
}