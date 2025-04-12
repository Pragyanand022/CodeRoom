import React from "react";

function Members({ username, primaryUser }) {
	const getInitial = (name) => name.charAt(0).toUpperCase();

	return (
        <div title={username} className="member-card flex flex-col items-center overflow-hidden max-w-15 min-w-15 max-h-15">
            <div className={`w-10 h-10 ${username !== primaryUser ? "bg-gray-500" : "bg-[#1f7891]"} rounded-full flex items-center justify-center text-white font-bold hover:cursor-pointer`}>
                {getInitial(username)}
            </div>
            <p className="font-medium text-xs truncate text-center w-full hover:cursor-pointer ">
                {username}
            </p>

        </div>
	);
}

export default Members;
