import React, { useState, useEffect, useRef } from "react";
import Editor_panel from "./Editor_panel";

const LANGUAGES = [
    "python3",
    "java",
    "cpp",
    "nodejs",
    "c",
    "ruby",
    "go",
    "scala",
    "bash",
    "sql",
    "pascal",
    "csharp",
    "php",
    "swift",
    "rust",
    "r",
  ];

function Editor_box({ socketRef, roomId, lang }) {

    const [selectedLanguage, setSelectedLanguage] = useState('javascript');
    const [output, setOutput] = useState("");
    const [isCompileWindowOpen, setIsCompileWindowOpen] = useState(false);
    const [isCompiling, setIsCompiling] = useState(false);

    const runCode = async () => {
        setIsCompiling(true);
        try {
          const response = await axios.post("http://localhost:5000/compile", {
            code: codeRef.current,
            language: selectedLanguage,
          });
          console.log("Backend response:", response.data);
          setOutput(response.data.output || JSON.stringify(response.data));
        } catch (error) {
          console.error("Error compiling code:", error);
          setOutput(error.response?.data?.error || "An error occurred");
        } finally {
          setIsCompiling(false);
        }
      };
    const toggleCompileWindow = () => {
        setIsCompileWindowOpen(!isCompileWindowOpen);
      };

	return (
		<div>
			<div className="col-span-10 text-white flex flex-col">
				{/* Language selector */}
				<div className="bg-dark p-2 flex justify-end">
					<select
						className="form-select w-auto bg-gray-800 text-white rounded border border-gray-700"
						value={selectedLanguage}
						onChange={(e) => setSelectedLanguage(e.target.value)}
					>
						{LANGUAGES.map((lang) => (
							<option key={lang} value={lang}>
								{lang}
							</option>
						))}
					</select>
				</div>

				<Editor_panel
					socketRef={socketRef}
					roomId={roomId}
					onCodeChange={(code) => {
						codeRef.current = code;
					}}
				/>
			</div>

			{/* Compiler toggle button */}
			<button
				className="btn btn-primary fixed bottom-3 right-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded z-[1050]"
				onClick={toggleCompileWindow}
				style={{ zIndex: 1050 }}
			>
				{isCompileWindowOpen ? "Close Compiler" : "Open Compiler"}
			</button>

			{/* Compiler section */}
			<div
				className={`bg-dark text-white p-3 ${
					isCompileWindowOpen ? "block" : "hidden"
				}`}
				style={{
					position: "fixed",
					bottom: 0,
					left: 0,
					right: 0,
					height: isCompileWindowOpen ? "30vh" : "0",
					transition: "height 0.3s ease-in-out",
					overflowY: "auto",
					zIndex: 1040,
				}}
			>
				<div className="flex justify-between items-center mb-3">
					<h5 className="m-0">
						Compiler Output ({selectedLanguage})
					</h5>
					<div>
						<button
							className="btn btn-success mr-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
							onClick={runCode}
							disabled={isCompiling}
						>
							{isCompiling ? "Compiling..." : "Run Code"}
						</button>
						<button
							className="btn btn-secondary bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
							onClick={toggleCompileWindow}
						>
							Close
						</button>
					</div>
				</div>
				<pre className="bg-gray-700 p-3 rounded">
					{output || "Output will appear here after compilation"}
				</pre>
			</div>
		</div>
	);
}

export default Editor_box;
