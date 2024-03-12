import { BsSend } from "react-icons/bs";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { sendMsg } from "../../redux/conversationSlice";

const MessageInput = () => {
    const { selectedConversation: selectedUser } = useSelector(state => state.convo)
    const [msg, setMsg] = useState("")
    const dispatch = useDispatch()

    async function handleSubmit(e) {
        e.preventDefault()
        const formdata = new FormData(e.currentTarget)
        const msg = Object.fromEntries(formdata)
        const { message } = msg
        if (!message)
            return
        const res = await axios.post("/api/send/" + selectedUser._id, msg, {
            withCredentials: true
        })
        setMsg("")
        dispatch(sendMsg(res.data))

    }
    return (
        <form className='px-4 my-3' onSubmit={handleSubmit}>
            <div className='w-full relative'>
                <input
                    type='text'
                    className='border text-sm rounded-lg block w-full p-2.5  bg-indigo-400 border-gray-300 font-bold sendMsg'
                    placeholder='Send a message'
                    name="message"
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                />
                <button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
                    <BsSend color="white" />
                </button>
            </div>
        </form>
    );
};
export default MessageInput;