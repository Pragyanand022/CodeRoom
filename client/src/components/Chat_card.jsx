import React from 'react'

function Chat_card({sender, text, time, username}) {
  return (
    <div className={`w-[80%] m-1 flex flex-col rounded-md p-1 px-2 font-normal overflow-hidden ${sender === username?"self-end bg-[#1f7891] " : "self-start bg-gray-700"}`}>
        <h3 className='text-sm font-bold text-gray-400'>{sender===username?'You':sender}</h3>
        <p className='text-xl break-words leading-tight'>{text}</p>
        <p className='text-xs text-right'>{time}</p>
    </div>
  )
}

export default Chat_card