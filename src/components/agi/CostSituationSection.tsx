
import { CollapsiblePanel } from "~/components/CollapsiblePanel";
import { Link } from "~/components/Link";

export function CostSituationSection() {
	return (
		<section>
			<h2>The cost situation</h2>

			<p>
				I could start with an elaborate argument on how the cost per unit of intelligence is already much lower on artificial intelligences than on biological ones, but it's not worth your time, given that <strong>inference cost is very quickly trending towards zero</strong>.
			</p>

			<p>
				What you should know:
				<ol>
					<li>
						You can run powerful models on your own hardware. Today.
					</li>
					<li>
						The cost to use AI falls about 10x every 12 months. It got 1000x cheaper in 3 years. <span className="text-[0.5rem] text-muted-foreground">(suck it, Moore)</span>
					</li>
					<li>
						Many companies are building specialized inference hardware, leading to faster and cheaper services.
					</li>
					<li>
						Open-source models are constantly serving Pareto efficiency, relative to state-of-the-art models.
					</li>
					<li>
						<Link href="https://x.com/elonmusk/status/1870900539367752111" className="no-underline">AI will ultimately render money out of value, so let's not overthink this 😄</Link>
					</li>
				</ol>
			</p>

			<p>
				Considering all that, any use cases that are not yet viable, will be very very soon.
			</p>

			<p>
				"Too cheap to meter", they say.
			</p>

			<CollapsiblePanel
				title="Further Reading"
				icon="📚"
				references={[
					{
						url: "https://blog.samaltman.com/three-observations#:~:text=The%20cost%20to%20use%20a%20given%20level%20of%20AI%20falls%20about%2010x%20every%2012%20months%2C%20and%20lower%20prices%20lead%20to%20much%20more%20use.",
						title: `"The cost to use a given level of AI falls about 10x every 12 months"`,
						description: `Sam Altman on AI Cost.`,
					},
					{
						url: "https://a16z.com/llmflation-llm-inference-cost/",
						title: "LLMflation – LLM inference cost is going down fast ⬇️",
						description: "from a16z.",
					},
					{
						url: "https://x.com/ivanfioravanti/status/1917297053576663121",
						title: "Qwen3 30B benchmark on Macs",
						description: "by @ivanfioravanti",
					},
					{
						url: "https://groq.com",
						title: "Groq",
						description: "Building specialized inference hardware for LLMs.",
					},
					{
						url: "https://www.cerebras.ai",
						title: "Cerebras",
						description: "Building specialized inference hardware for LLMs.",
					},
				]}
			/>

		</section>
	);
}