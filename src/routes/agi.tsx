import { createFileRoute } from "@tanstack/react-router";
import { Expand, Shrink } from "lucide-react";
import { useEffect, useState } from "react";
import { CostSituation } from "~/components/agi/CostSituation";
import { FeedbackLoop } from "~/components/agi/FeedbackLoop";
import { Intro } from "~/components/agi/Intro";
import { ItsHappening } from "~/components/agi/ItsHappening";
import { NextStep } from "~/components/agi/NextStep";
import { NotFeelingAGI } from "~/components/agi/NotFeelingAGI";
import { Productivity } from "~/components/agi/Productivity";
import { WhatNow } from "~/components/agi/WhatNow";
import { CollapsiblePanel } from "~/components/CollapsiblePanel";
import { Button } from "~/components/ui/button";

export const Route = createFileRoute("/agi")({
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
	})

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
				className="hidden lg:flex fixed top-4 right-4"
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

				<Intro />
				<NotFeelingAGI />
				<FeedbackLoop />
				<Productivity />
				<CostSituation />
				<ItsHappening />
				<WhatNow />
				<NextStep />

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
						{
							url: "https://artificialanalysis.ai",
							title: "Artificial Analysis",
							description: "A comprehensive model benchmark compilation",
						},
					]}
				/>
			</article >
		</>
	)
}
