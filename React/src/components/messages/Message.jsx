import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { extractTime } from '../../utils/fromatTime'

const Message = () => {
    const { selectedConversation, messages } = useSelector(state => state.convo)
    const { user } = useSelector(state => state.auth)
    const lastMsgRef = useRef(null)

    useEffect(() => {
        if (lastMsgRef.current) {
            lastMsgRef.current.scrollIntoView({ behavior: 'smooth' });
        }

    }, [messages])
    return (
        <>
            {
                messages?.length === 0 ?
                    <h1>Send a msg to start the chat</h1>
                    :
                    messages?.map(msg => {
                        const isMsgFromMe = user._id === msg.senderId ? true : false
                        const chatSide = isMsgFromMe ? "chat-end" : "chat-start"
                        const bubbleBgColor = isMsgFromMe ? "bg-blue-500" : "bg-brown-300"
                        const chatProfilePic = isMsgFromMe ? user.profilePic : selectedConversation.profilePic
                        const time = extractTime(msg.createdAt)
                        return (
                            <div className={`chat ${chatSide}`} key={msg._id}>
                                <div className='chat-image avatar'>
                                    <div className="w-10 rounded-full">
                                        <img src={chatProfilePic} alt="image" />
                                    </div>
                                </div>
                                <div className={`chat-bubble text-white ${bubbleBgColor}`}>{msg.message}</div>
                                <div className='chat-footer opacity-70 text-xs flex gap-1 items-center'>{time}</div>
                                <div ref={lastMsgRef}></div>
                            </div>
                        )
                    })
            }

        </>

    )
}

export default Message