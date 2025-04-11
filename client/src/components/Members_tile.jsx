import React from "react";
// import Members from "./Members";
import Avatar from 'boring-avatars';
import Members from "./Members";

function Members_tile() {
	const members = [{
        'socketId':1,
        'username':'fsdfasd'
    },
    {
        'socketId':1,
        'username':'fsdfasd'
    },
    {
        'socketId':1,
        'username':'fsdfasd'
    },
    {
        'socketId':1,
        'username':'fsdfasd'
    },{
        'socketId':1,
        'username':'fsdfasd'
    },{
        'socketId':1,
        'username':'fsdfasd'
    },{
        'socketId':1,
        'username':'fsdfasd'
    },
    {
        'socketId':1,
        'username':'fsdfasd'
    }];
	return (
		<>
			<div className="flex flex-col text-white font-extrabold text-2xl justify-center relative">
				<h2>Members</h2>
				<hr className="text-white font-extrabold" />
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
