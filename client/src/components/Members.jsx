import React from "react";

function Members({ username }) {
	const getInitial = (name) => name.charAt(0).toUpperCase();

	return (
        <div className="member-card flex flex-col items-center overflow-hidden">
            <div className="w-10 h-10 bg-gray-500 rounded-full flex items-center justify-center text-white font-bold">
                {getInitial("Pragyanand")}
            </div>
            <p className="font-medium text-xs">
                Pragyanand
            </p>

        </div>
	);
}

export default Members;
