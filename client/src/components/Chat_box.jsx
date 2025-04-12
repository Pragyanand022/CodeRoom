import React, { useState, useEffect } from "react";
import Chat_card from "./Chat_card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { ACTIONS } from "../utils/Actions";

function Chat_box({socketRef, username, roomId}) {

  const [msg, setMsg] = useState("");
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const socket = socketRef.current;
  
    const handleNewMessage = (message) => {
      setChats((prev) => [
        ...prev,
        { id: message.id, sender: message.sender, text: message.text, time: message.time },
      ]);
    };
  
    socket.on(ACTIONS.MSG_LISTENER, handleNewMessage);
  
    return () => {
      socket.off(ACTIONS.MSG_LISTENER, handleNewMessage);
    };
  }, []);

  const msgHandler = (e) =>{
    e.preventDefault();
    const time = new Date();
    const data = {
      id:time.getTime(),
      sender:username,
      text: msg,
      time:time.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      })
    };
    
    // console.log('Sending message:', data);
    socketRef.current.emit(ACTIONS.MSG,{data, roomId});
    setMsg("");
  }

	return (
		<>
			<div className="flex flex-col text-white font-bold text-2xl justify-center relative">
				<h2 className="text-3xl">Chats</h2>
				<hr className="text-white font-extrabold mt-2	" />
				<div className="members_list flex flex-col mt-5 gap-1">
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
				<div className="writeMsg fixed bottom-4 bg-[#1f7891] rounded-md h-max-[30vh] m-1 mr-2 w-[17vw]">
					<textarea
						rows={1}
            onChange={(e)=>setMsg(e.target.value)}
						className="outline-none custom_scroll resize-none max-h-[10rem] 
             p-1 text-sm font-medium text-black w-[80%] mt-1.5 ml-1.5 rounded-md bg-[#569fa9ce]"
						onInput={(e) => {
							e.target.style.height = "auto";
							e.target.style.height =
								e.target.scrollHeight + "px";
						}}

            placeholder="Type a message..."

            value={msg}
					/>
          <FontAwesomeIcon icon={faLocationArrow} className="ml-2 rotate-45 text-[#51cadbce] cursor-pointer mb-1" title="send" onClick={msgHandler}/>
				</div>
			</div>
		</>
	);
}

export default Chat_box;
