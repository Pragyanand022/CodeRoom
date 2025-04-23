import { useState } from "react";

const serverURI = import.meta.env.VITE_CORS_ORIGIN || "http://localhost:3000";

function Assist() {
	const [prompt, setPrompt] = useState("");
	const [response, setResponse] = useState("");
	const [loading, setLoading] = useState(false);

	const handleAsk = async () => {
		if (!prompt.trim()) return;
		setLoading(true);
		try {
			const res = await fetch(`${serverURI}/ask`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ prompt }),
			});
			const data = await res.json();
			console.log("AI response:", data);
			setResponse(data.answer || "No response from AI.");
		} catch (err) {
			setResponse("Something went wrong.");
		}
		setLoading(false);
	};

	return (
		<div className="assist_box p-4 max-w-xl mx-auto h-[75vh]">
			<textarea
				className="w-full p-3 border border-gray-300 rounded-md"
				rows={4}
				placeholder="Ask me anything..."
				value={prompt}
				onChange={(e) => setPrompt(e.target.value)}
			/>
			<button
				className="bg-[#1f7891] hover:bg-[#569fa9ce] text-white roundedbg-[#1f7891] hover:bg-[#569fa9ce] text-white font-bold py-1 px-4 rounded z-[1050] cursor-pointer w-[48%]"
				onClick={handleAsk}
				disabled={loading}
			>
				{loading ? "Thinking..." : "Ask"}
			</button>
			<button
				className="bg-[#1f7891] hover:bg-[#569fa9ce] text-white roundedbg-[#1f7891] hover:bg-[#569fa9ce] text-white font-bold py-1 px-4 rounded z-[1050] cursor-pointer w-[48%] ml-[4%]"
				onClick={() => {
					setResponse("");
					setPrompt("");
				}}
				disabled={loading}
			>
				Clear
			</button>

			{response && (
				<div className="mt-4 h-full rounded-md w-full border border-gray-300 bg-gray-700 overflow-hidden">
					<p className="custom_scroll p-4  whitespace-pre-wrap max-h-[100%] overflow-y-auto">
						{response}
					</p>
				</div>
			)}
		</div>
	);
}

export default Assist;
