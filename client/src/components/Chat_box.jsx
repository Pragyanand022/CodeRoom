import React, { useState, useEffect, useCallback, useRef } from "react";
import Chat_card from "./Chat_card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faLocationArrow,
} from "@fortawesome/free-solid-svg-icons";
import { ACTIONS } from "../utils/Actions";

function Chat_box({ socketRef, username, roomId }) {
	const [msg, setMsg] = useState("");
	const [chats, setChats] = useState([]);

	// Ref to scroll to the last chat message
	const chatWrapperRef = useRef(null);

	// === Local Storage Utility Functions ===
	const saveMessageToLocal = (roomId, message) => {
		const localData = JSON.parse(localStorage.getItem("coderoom")) || {};
		if (!localData[roomId]) {
			localData[roomId] = [];
		}
		localData[roomId].push(message);
		localStorage.setItem("coderoom", JSON.stringify(localData));
	};

	const getMessagesFromLocal = (roomId) => {
		const localData = JSON.parse(localStorage.getItem("coderoom")) || {};
		return localData[roomId] || [];
	};

	// === Load previous messages on mount or room change ===
	useEffect(() => {
		const storedMessages = getMessagesFromLocal(roomId);
		setChats(storedMessages);
	}, [roomId]);

	// === Socket listener setup ===
	const handleNewMessage = useCallback(
		(message) => {
			let isNew = false;
			setChats((prev) => {
				if (prev.find((chat) => chat.id === message.id)) return prev;
				isNew = true;
				return [...prev,message];
			});
			if (isNew) {
				saveMessageToLocal(roomId, message);
			}
		},
		[roomId]
	);

	useEffect(() => {
		const socket = socketRef.current;
		socket.on(ACTIONS.MSG_LISTENER, handleNewMessage);

		return () => {
			socket.off(ACTIONS.MSG_LISTENER, handleNewMessage);
		};
	}, [handleNewMessage]);

	// === Send Message Handler ===
	const msgHandler = (e) => {
		e.preventDefault();
		if (!msg.trim()) return;

		const time = new Date();
		const data = {
			id: time.getTime(),
			sender: username,
			text: msg,
			time: time.toLocaleTimeString([], {
				hour: "2-digit",
				minute: "2-digit",
			}),
		};

		// Optimistically update UI & store
		setChats((prev) => {
			const updatedChats = [...prev, data];
			saveMessageToLocal(roomId, data);
			return updatedChats;
		});

		socketRef.current.emit(ACTIONS.MSG, { data, roomId });
		setMsg("");
	};

	// Scroll to the last chat message after any update in chats
	useEffect(() => {
		if (chatWrapperRef.current) {
			chatWrapperRef.current.scrollTo({
				top: chatWrapperRef.current.scrollHeight,
				behavior: "smooth",
			});
		}
	}, [chats]);

	return (
		<>
			<div className="flex flex-col text-white font-bold text-2xl justify-center h-[100vh]">
				<h2 className="text-3xl">Chats</h2>
				<hr className="text-white font-extrabold mt-2	" />
				<div
					ref={chatWrapperRef}
					className="chat-wrapper custom_scroll overflow-y-auto flex-1"
				>
					<div className="members_list flex flex-col mt-2 gap-1 ">
						{chats.map((chat) => (
							<Chat_card
								key={chat.id}
								sender={chat.sender}
								text={chat.text}
								time={chat.time}
								username={username}
							/>
						))}
					</div>
				</div>
				<div className="writeMsg bottom-4 bg-[#1f7891] rounded-md max-h-[12rem] mr-2 w-full flex items-end mb-5 mt-2">
					<textarea
						rows={1}
						onChange={(e) => setMsg(e.target.value)}
						className="outline-none custom_scroll resize-none overflow-y-auto max-h-[11.5rem] 
             p-1 mb-1.5 text-sm font-medium text-black w-[85%] mt-1.5 ml-1.5 rounded-md bg-[#569fa9ce]"
						onInput={(e) => {
							e.target.style.height = "auto";
							e.target.style.height =
								e.target.scrollHeight + "px";
						}}
						placeholder="Type a message..."
						value={msg}
					/>
					<FontAwesomeIcon
						icon={faLocationArrow}
						className="ml-2 rotate-45 text-[#51cadbce] cursor-pointer mb-2"
						title="send"
						onClick={msgHandler}
					/>
				</div>
			</div>
		</>
	);
}

export default Chat_box;
