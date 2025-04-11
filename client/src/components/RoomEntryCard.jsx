import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function RoomEntryCard() {
	const navigate = useNavigate();

	const [roomId, setRoomId] = useState("");
	const [username, setUsername] = useState("");

	const roomGenerator = (e) => {
		e.preventDefault();
		setRoomId(uuid());
		toast.success("New room is created successfully!!");
	};

	const handleSubmit = () => {
		if (!roomId || !username) {
			toast.error("Both the fields are required");
			return;
		}

		navigate(`/editor/${roomId}`, {
			state: {
				username,
			},
		});
		toast.success("Welcome to the room");
	};

	return (
		<>
			<div className="border-white border-solid border-8 rounded-2xl w-[90%] h-[200px]">
				<form className="flex flex-col items-center justify-center text-black font-semibold">
					<input
						type="text"
						name="roomId"
						placeholder="Enter room id..."
						onChange={(e) => setRoomId(e.target.value)}
						value={roomId}
						className="text-2xl p-4 focus:outline-none bg-white rounded-xl opacity-40 w-[90%] items-center mt-4 overflow-hidden"
						required
					/>
					<input
						type="text"
						name="username"
						placeholder="Enter your name..."
						onChange={(e) => setUsername(e.target.value)}
						value={username}
						className="text-2xl p-4 focus:outline-none bg-white rounded-xl opacity-40 w-[90%] items-center mt-4 overflow-hidden"
						required
					/>
				</form>
			</div>
			<p
				className="underline cursor-pointer hover:text-shadow-[2px_2px_4px_black]"
				onClick={roomGenerator}
			>
				Create a new room
			</p>
			<button
				type="submit"
				onClick={handleSubmit}
				className="w-[90%] bg-[#1f7891] rounded-lg h-[50px] text-2xl font-bold mt-5 cursor-pointer hover:shadow-[2px_2px_4px_black] hover:text-shadow-[2px_2px_4px_black]"
			>
				Enter
			</button>
		</>
	);
}

export default RoomEntryCard;
