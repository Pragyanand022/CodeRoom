import React, { useEffect, useState } from "react";
import { useSocket } from "../hooks/useSocket";

import Members_tile from "../components/Members_tile";
import Editor_box from "../components/Editor_box";
import Menu_box from "../components/Menu_box";

function Editor() {
	// const [curMenuItem, setCurMenuItem] = useState("members");

	// const socket = useSocket();
	// useEffect(()=>{
	//     if(!socket) return;

	//     // socket.emit('join_room', { roomId: 'room1' });

	// },[socket]);

	return (
		<>
			<div className="editorPage flex">
				<div className="menu_bar w-[4vw] border-r-2 border-solid border-white min-h-[100vh] p-2 overflow-hidden">
					<div className="flex flex-col backdrop-blur-sms bg-white/10 min-h-[100vh] p-1 gap-2 items-center text-lg rounded-lg relative group">
						<Menu_box/>
					</div>
				</div>
				<div className="menu_box w-[20vw] border-r-4 border-solid border-white min-h-[100vh] p-2 overflow-hidden">
					<div className="backdrop-blur-xs bg-white/10 min-h-[100vh] p-1 rounded-lg">
						<Members_tile />
					</div>
				</div>
				<div className="editor_box m-2">
					<Editor_box/>
				</div>
			</div>
		</>
	);
}

export default Editor;
