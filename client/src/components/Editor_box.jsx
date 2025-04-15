import React, { useState, useEffect, useRef } from "react";
import Editor_panel from "./Editor_panel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faPlay } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const serverURI = import.meta.env.VITE_CORS_ORIGIN || 'http://localhost:3000';

const LANGUAGES = [
	"javascript",
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

function Editor_box({ socketRef, roomId, codeRef }) {
	const [selectedLanguage, setSelectedLanguage] = useState("javascript");
	const [output, setOutput] = useState("");
	const [isCompileWindowOpen, setIsCompileWindowOpen] = useState(false);
	const [isCompiling, setIsCompiling] = useState(false);

	const runCode = async () => {
		setIsCompiling(true);
		try {
			const response = await axios.post(
				`${serverURI}/compile`,
				{
					code: codeRef.current,
					language: selectedLanguage==='javascript'?'nodejs':selectedLanguage,
				}
			);
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

	const handleLanguageChange = (e) =>{
		setSelectedLanguage(e.target.value);
		setOutput("");
	}

	return (
		<div>
			<div className="col-span-10 text-white flex flex-col h-screen overflow-y-auto relative">
				<div className="editor-box-header flex gap-5 backdrop-blur-lg bg-white/10 w-[75vw] p-2 flex justify-end rounded-lg mb-2">
					{/* Compiler toggle button */}
					<button
						className="bg-[#1f7891] hover:bg-[#569fa9ce] text-white font-bold py-1 px-4 rounded z-[1050]"
						onClick={toggleCompileWindow}
						style={{ zIndex: 1050 }}
					>
						Compile
					</button>

					{/* Language selector */}
					<select
						className="w-auto bg-[#1f7891] text-white rounded border border-gray-700 p-1 outline-none font-bold text-md"
						value={selectedLanguage}
						onChange={handleLanguageChange}
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

				{/* Compiler section */}
				<div
					className={`w-full compiler-box backdrop-blur-lg bg-white/10 absolute bottom-2.5 rounded-lg text-white p-3 ${
						isCompileWindowOpen ? "block" : "hidden"
					}`}
					style={{
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
								className="bg-[#1f7891] hover:bg-[#569fa9ce] text-white font-bold w-[40px] h-[40px] rounded-full mr-2 text-xl"
								onClick={runCode}
								disabled={isCompiling}
								title="Run"
							>
								{/* {isCompiling ? "Compiling..." : "Run Code"}
								 */}
								<FontAwesomeIcon icon={faPlay} />
							</button>
							<button
								className="bg-gray-500 hover:bg-gray-700 text-white font-bold  rounded-full w-[40px] h-[40px] text-2xl"
								onClick={toggleCompileWindow}
							>
								<FontAwesomeIcon icon={faClose} />
							</button>
						</div>
					</div>
					<pre className="bg-gray-700 p-3 rounded whitespace-pre-wrap break-words">
						<p>
							{output ||
								"Output will appear here after compilation"}
						</p>
					</pre>
				</div>
			</div>
		</div>
	);
}

export default Editor_box;
