import React, { useMemo } from "react";
// import Members from "./Members";
import Members from "./Members";

function Members_tile({ members, username: primaryUser }) {
	// const members = [{
	//     'socketId':1,
	//     'username':'fsdfasd'
	// },
	// {
	//     'socketId':1,
	//     'username':'fsdfasd'
	// },
	// ];

	const sortedMembers = useMemo(() => {   // SortedMembers will have the primaryUser at index-0.
		return [...members].sort((a, b) => {
			if (a.username === primaryUser) return -1;
			if (b.username === primaryUser) return 1;
			return 0;
		});
	}, [members, primaryUser]);

	return (
		<>
			<div className="flex flex-col text-white font-bold text-2xl justify-center relative max-h-[100vh] pb-6">
				<h2 className="text-3xl">Members</h2>
				<hr className="text-white font-extrabold mt-2	" />
				<div className="members-wrapper custom_scroll overflow-y-auto flex-1">
					<div className="members_list flex flex-wrap mt-5 gap-6">
						{sortedMembers.map((member) => (
							<Members
								key={member.socketId}
								username={member.username}
								primaryUser={primaryUser}
							/>
						))}
					</div>
				</div>
			</div>
		</>
	);
}

export default Members_tile;
