import React, { useEffect, useState, useRef } from "react";
import { initSocket } from "../services/Socket";
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
import Chat_box from "../components/Chat_box";
import Loader from "../components/Loader";

function Editor() {
	const [isLoading, setIsLoading] = useState(true);

	const [menuItem, setMenuItem] = useState(null);
	const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);
	const [members, setMembers] = useState([]);
	const Location = useLocation();

	const navigate = useNavigate();
	const { roomId } = useParams();
	const username = Location.state?.username;

	const socketRef = useRef(null);
	const codeRef = useRef(null);

	useEffect(() => {
		const init = async () => {
			socketRef.current = await initSocket();
			socketRef.current.on("connect_error", (err) => handleErrors(err));
			socketRef.current.on("connect_failed", (err) => handleErrors(err));

			const handleErrors = (err) => {
				console.log("Error", err);
				toast.error("Socket connection failed, Try again later");
				navigate("/");
			};

			socketRef.current.on("connect", () => {
				socketRef.current.emit(ACTIONS.JOIN, {
					roomId,
					username: Location.state?.username,
				});
			})

			socketRef.current.on(
				ACTIONS.JOINED,
				({ clients, username, socketId }) => {
					if (username !== Location.state?.username) {
						toast.success(`${username} joined the room.`);
					}
					setMembers(clients);
					// console.log(clients);
					setTimeout(() => {
						if (codeRef.current !== null) {
							socketRef.current.emit(ACTIONS.SYNC_CODE, {
								code: codeRef.current,
								socketId,
							});
						}
					}, 100);
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

	useEffect(() => {
		const handleResize = () => setIsMobile(window.innerWidth <= 900);

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	useEffect(() => {
		if (!isMobile) {
			setMenuItem("members");
		} else {
			setMenuItem(null);
		}
	}, [isMobile]);

	const handleMenuItem = (item) => {
		if (isMobile) {
			if (menuItem === item) {
				setMenuItem(null);
			} else {
				setMenuItem(item);
			}
		} else {
			setMenuItem(item);
		}
	};

	useEffect(() => {
		const connectToServer = async () => {
			try {
				await fetch(import.meta.env.VITE_CORS_ORIGIN);
			} catch (err) {
				console.error("Failed to connect to server", err);
			}finally{
				setIsLoading(false);
			}
		};

		connectToServer();
	}, []);

	return (
		<>
			<div className="editorPage h-screen flex overflow-hidden">
				{isLoading && <Loader />}{" "}
				<div className="menu_bar mobile-menu-bar w-[4vw] border-r-2 border-solid border-white relative min-h-[100vh] p-2 overflow-hidden">
					<div className="flex flex-col backdrop-blur-sms bg-white/10 min-h-[100vh] p-1 gap-2 items-center text-lg rounded-lg relative group">
						<Menu_box
							roomId={roomId}
							handleMenuItem={handleMenuItem}
							menuItem={menuItem}
							username={username}
						/>
					</div>
				</div>
				{(!isMobile || menuItem) && (
					<div className="menu_box mobile-menu-box w-[20vw] border-r-4 border-solid border-white relative min-h-[100vh] p-2 overflow-hidden">
						<div className="backdrop-blur-xs bg-white/10 min-h-[100vh] p-1 rounded-lg overflow-hidden">
							{menuItem === "members" && (
								<Members_tile
									members={members}
									username={username}
								/>
							)}
							{menuItem === "chats" && (
								<Chat_box
									socketRef={socketRef}
									username={username}
									roomId={roomId}
								/>
							)}
						</div>
					</div>
				)}
				{(!isMobile || menuItem === null) && (
					<div className="editor_box m-2 w-[75vw]">
						<Editor_box
							socketRef={socketRef}
							roomId={roomId}
							codeRef={codeRef}
						/>
					</div>
				)}
			</div>
		</>
	);
}

export default Editor;
