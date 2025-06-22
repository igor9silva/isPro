import { openai } from "@ai-sdk/openai";
import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { generateText } from "ai";
import { useState } from "react";
import { JSXPreview } from "~/components/ui/jsx-preview";

const generateJSX = createServerFn({ method: "POST" })
  .validator((data: { prompt: string; currentText: string }) => {
    if (typeof data.prompt !== "string" || !data.prompt.trim()) {
      throw new Error("Prompt must be a non-empty string");
    }
    if (typeof data.currentText !== "string") {
      throw new Error("Current text must be a string");
    }
    return {
      prompt: data.prompt.trim(),
      currentText: data.currentText
    };
  })
  .handler(async ({ data: { prompt, currentText } }) => {
    const { text } = await generateText({
      model: openai("gpt-4.1-nano"),
      system: `You are an expert React developer and UI designer. Generate clean, modern React JSX code based on user prompts.

Guidelines:
- Use Tailwind CSS classes for styling
- Return ONLY the JSX code, no explanations or markdown
- Make it responsive and visually appealing
- Use semantic HTML elements
- Include hover effects and transitions where appropriate
- Don't include import statements or function declarations, just the JSX
- Ensure all JSX is properly formatted and valid

Example format:
<div className="p-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg">
  <h1 className="text-white text-2xl font-bold">Hello World</h1>
</div>

${currentText ? `Current JSX code: \n\`\`\`jsx\n${currentText}\n\`\`\`` : 'No existing code provided.'}

Use the current JSX code as context to understand the current state and modify or enhance it accordingly based on the user's request.`,
      prompt: prompt,
    });

    return { jsx: text };
  });

export const Route = createFileRoute("/gen-ui")({
  component: RouteComponent,
});

function RouteComponent() {
  const [jsxCode, setJsxCode] = useState(`<div className="p-4 bg-blue-100 rounded-lg">
  <h2 className="text-xl font-bold mb-2">Hello JSX Preview!</h2>
  <p className="text-gray-700">
    Edit the code in the textarea to see live updates.
  </p>
  <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
    Click me!
  </button>
</div>`);
  
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showCodeEditor, setShowCodeEditor] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    try {
      const result = await generateJSX({ 
        data: { 
          prompt: prompt,
          currentText: jsxCode 
        } 
      });
      setJsxCode(result.jsx);
      setPrompt(""); // Clear the prompt field after successful generation
    } catch (error) {
      console.error("Error generating JSX:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <main className="w-full max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">UI Generator</h1>
      
      <div className="space-y-6">
        {/* AI Prompt Field */}
        <div className="w-full">
          <label htmlFor="ai-prompt" className="text-lg font-semibold mb-2 block">
            Describe what you want to build
          </label>
          <div className="flex gap-2">
            <input
              id="ai-prompt"
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., A modern pricing card with three tiers"
              className="flex-1 p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
            />
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !prompt.trim()}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isGenerating ? "Generating..." : "Generate"}
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Describe any UI component you want and AI will generate it for you
          </p>
        </div>

        {/* Toggle Code Editor */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowCodeEditor(!showCodeEditor)}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            {showCodeEditor ? "Hide" : "Show"} Code Editor
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-300px)]">
          {/* Code Editor - Conditionally Shown */}
          {showCodeEditor && (
            <div className="flex flex-col">
              <label htmlFor="jsx-input" className="text-lg font-semibold mb-2">
                JSX Code
              </label>
              <textarea
                id="jsx-input"
                value={jsxCode}
                onChange={(e) => setJsxCode(e.target.value)}
                className="flex-1 p-4 border border-gray-300 rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-900 text-gray-100"
                placeholder="Enter your JSX code here..."
              />
            </div>
          )}
          
          {/* Preview */}
          <div className={`flex flex-col ${!showCodeEditor ? 'lg:col-span-2' : ''}`}>
            <h2 className="text-lg font-semibold mb-2">Live Preview</h2>
            <div className="flex-1 p-4 border border-gray-300 rounded-lg bg-white overflow-auto">
              <JSXPreview jsx={jsxCode} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 