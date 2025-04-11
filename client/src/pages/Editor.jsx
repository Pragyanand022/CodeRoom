import React, { useEffect, useState } from "react";
import { useSocket } from "../hooks/useSocket";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faUsers,
	faComments,
	faClose,
	faCopy,
} from "@fortawesome/free-solid-svg-icons";
import Members_tile from "../components/Members_tile";

function Editor() {
	const [curMenuItem, setCurMenuItem] = useState("members");

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
						<div className="flex flex-col gap-4 menu_bar_items top-0">
							<div
								className={`menu-item transition-opacity duration-200 ${
									curMenuItem === "members"
										? "opacity-100"
										: "opacity-70"
								} hover:opacity-100 `}
							>
								<FontAwesomeIcon
									name="members"
									icon={faUsers}
									title="Members"
									onClick={(e) => setCurMenuItem("members")}
								/>
							</div>

							<div
								className={`menu-item transition-opacity duration-200 ${
									curMenuItem === "chats"
										? "opacity-100"
										: "opacity-70"
								} hover:opacity-100 `}
							>
								<FontAwesomeIcon
									name="chats"
									icon={faComments}
									title="Chats"
									onClick={(e) => setCurMenuItem("chats")}
								/>
							</div>
						</div>
						<div className="flex gap-4 text-2xl flex-col editor_room_options absolute bottom-10">
							<div className="copy_room">
								<FontAwesomeIcon icon={faCopy} title="copy room id" className="opacity-70 hover:opacity-100"/>
							</div>
							<div className="leave_room">
								<FontAwesomeIcon icon={faClose} title="leave room" className="opacity-70 hover:opacity-100"/>
							</div>
						</div>
					</div>
				</div>
				<div className="menu_box w-[20vw] border-r-4 border-solid border-white min-h-[100vh] p-2 overflow-hidden">
					<div className="backdrop-blur-xs bg-white/10 min-h-[100vh] p-1 rounded-lg">
						<Members_tile />
					</div>
				</div>
				<div className="editor_box">this is the editor</div>
			</div>
		</>
	);
}

export default Editor;
