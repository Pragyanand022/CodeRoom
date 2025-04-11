import React, { useEffect, useState, useRef } from "react";
import { useSocket } from "../hooks/useSocket";
import Members_tile from "../components/Members_tile";
import Editor_box from "../components/Editor_box";
import Menu_box from "../components/Menu_box";
import { ACTIONS } from "../utils/Actions";
import {
	useNavigate,
	useLocation,
	Navigate,
	useParams,
} from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

function Editor() {
	const [members, setMembers] = useState([]);
	const Location = useLocation();

	const navigate = useNavigate();
	const { roomId } = useParams();

	const socketRef = useRef(null);

	useEffect(() => {
		const init = async () => {
			socketRef.current = await useSocket();
			socketRef.current.on("connect_error", (err) => handleErrors(err));
			socketRef.current.on("connect_failed", (err) => handleErrors(err));

			const handleErrors = (err) => {
				console.log("Error", err);
				toast.error("Socket connection failed, Try again later");
				navigate("/");
			};

			socketRef.current.emit(ACTIONS.JOIN, {
				roomId,
				username: Location.state?.username,
			});

			socketRef.current.on(
				ACTIONS.JOINED,
				({ clients, username, socketId }) => {
					if (username !== Location.state?.username) {
						toast.success(`${username} joined the room.`);
					}
					setMembers(clients);
					socketRef.current.emit(ACTIONS.SYNC_CODE, {
						code: codeRef.current,
						socketId,
					});
				}
			);

			socketRef.current.on(
				ACTIONS.DISCONNECTED,
				({ socketId, username }) => {
					toast.success(`${username} left the room`);
					setMembers((prev) => {
						return prev.filter(
							(member) => member.socketId !== socketId
						);
					});
				}
			);
		};
		init();

		return () => {
			socketRef.current && socketRef.current.disconnect();
			socketRef.current.off(ACTIONS.JOINED);
			socketRef.current.off(ACTIONS.DISCONNECTED);
		};
	}, []);

	if (!Location.state) {
		return <Navigate to="/" />;
	}

	return (
		<>
			<div className="editorPage flex">
				<div className="menu_bar w-[4vw] border-r-2 border-solid border-white min-h-[100vh] p-2 overflow-hidden">
					<div className="flex flex-col backdrop-blur-sms bg-white/10 min-h-[100vh] p-1 gap-2 items-center text-lg rounded-lg relative group">
						<Menu_box />
					</div>
				</div>
				<div className="menu_box w-[20vw] border-r-4 border-solid border-white min-h-[100vh] p-2 overflow-hidden">
					<div className="backdrop-blur-xs bg-white/10 min-h-[100vh] p-1 rounded-lg">
						<Members_tile />
					</div>
				</div>
				<div className="editor_box m-2">
					<Editor_box />
				</div>
			</div>
		</>
	);
}

export default Editor;
