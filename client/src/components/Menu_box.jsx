import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faUsers,
	faComments,
	faClose,
	faCopy,
	faPlane,
	faRobot,
	faCircleQuestion,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Menu_box({roomId, handleMenuItem, menuItem}) {
	const navigate = useNavigate();

	const copyRoomId = async () => {
		try {
			await navigator.clipboard.writeText(roomId);
			toast.success(`Room ID is copied`);
		} catch (error) {
			console.log(error);
			toast.error("Unable to copy the room ID");
		}
	};

	const leaveRoom = async () => {
		navigate('/');
	};

	return (
		<>
			<div className="flex flex-col gap-4 menu_bar_items absolute top-2">
				<div
					className={`menu-item transition-opacity duration-200 ${
						menuItem === "members" ? "opacity-100" : "opacity-60"
					} hover:opacity-100 hover:cursor-pointer`}
				>
					<FontAwesomeIcon
						name="members"
						icon={faUsers}
						title="Members"
						onClick={()=>handleMenuItem('members')}
					/>
				</div>

				<div
					className={`menu-item transition-opacity duration-200 ${
						menuItem === "chats" ? "opacity-100" : "opacity-60"
					} hover:opacity-100 hover:cursor-pointer`}
				>
					<FontAwesomeIcon
						name="chats"
						icon={faComments}
						title="Chats"
						onClick={()=>handleMenuItem('chats')}
					/>
				</div>

				<div
					className={`menu-item transition-opacity duration-200 ${
						menuItem === "openAI" ? "opacity-100" : "opacity-60"
					} hover:opacity-100 hover:cursor-pointer`}
				>
					<FontAwesomeIcon
						name="openAI"
						icon={faRobot}
						title="AI Assistant"
						onClick={()=>handleMenuItem('openAI')}
					/>
				</div>
			</div>
			<div className="editor_room_options flex gap-4 text-2xl flex-col absolute bottom-6">
				<div className="copy_room opacity-60 hover:opacity-100 hover:cursor-pointer" onClick={copyRoomId}>
					<FontAwesomeIcon icon={faCopy} title="copy room id" />
				</div>
				<div className="leave_room opacity-60 hover:opacity-100 hover:cursor-pointer" onClick={leaveRoom}>
					<FontAwesomeIcon icon={faClose} title="leave room" />
				</div>
			</div>
		</>
	);
}

export default Menu_box;
