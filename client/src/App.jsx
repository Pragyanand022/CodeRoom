import { io } from "socket.io-client";
import Home from "./pages/Home";
import Editor from "./pages/Editor";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function App() {

	return (
		<>
			<div>
				<Toaster position="top-right"></Toaster>
			</div>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/editor/:roomId" element={<Editor />} />
			</Routes>
		</>
	);
}

export default App;
