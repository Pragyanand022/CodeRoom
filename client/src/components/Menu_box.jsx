import React,{useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUsers,
    faComments,
    faClose,
    faCopy,
} from "@fortawesome/free-solid-svg-icons";

function Menu_box() {
	const [curMenuItem, setCurMenuItem] = useState("members");

	return (
		<>
			<div className="flex flex-col gap-4 menu_bar_items absolute top-2">
				<div
					className={`menu-item transition-opacity duration-200 ${
						curMenuItem === "members" ? "opacity-100" : "opacity-70"
					} hover:opacity-100 hover:cursor-pointer`}
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
						curMenuItem === "chats" ? "opacity-100" : "opacity-70"
					} hover:opacity-100 hover:cursor-pointer`}
				>
					<FontAwesomeIcon
						name="chats"
						icon={faComments}
						title="Chats"
						onClick={(e) => setCurMenuItem("chats")}
					/>
				</div>
			</div>
			<div className="flex gap-4 text-2xl flex-col editor_room_options absolute bottom-6">
				<div className="copy_room opacity-70 hover:opacity-100 hover:cursor-pointer">
					<FontAwesomeIcon
						icon={faCopy}
						title="copy room id"
					/>
				</div>
				<div className="leave_room opacity-70 hover:opacity-100 hover:cursor-pointer">
					<FontAwesomeIcon
						icon={faClose}
						title="leave room"
					/>
				</div>
			</div>
		</>
	);
}

export default Menu_box;
