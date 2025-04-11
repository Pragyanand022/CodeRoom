import React from "react";
// import Members from "./Members";
import Members from "./Members";

function Members_tile({members}) {
	// const members = [{
    //     'socketId':1,
    //     'username':'fsdfasd'
    // },
    // {
    //     'socketId':2,
    //     'username':'fsdfasd'
    // },
    // ];
	return (
		<>
			<div className="flex flex-col text-white font-bold text-2xl justify-center relative">
				<h2 className="text-3xl">Members</h2>
				<hr className="text-white font-extrabold mt-2	" />
				<div className="members_list flex flex-wrap mt-5 gap-6">
					{members.map((member) => (
						<Members
							key={member.socketId}
							username={member.username}
						/>
					))}
				</div>
			</div>
		</>
	);
}

export default Members_tile;
