import axios from "axios";
import Message from "./Message";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetMsg } from "../../redux/conversationSlice";

const Messages = () => {
    const dispatch = useDispatch()
    const { selectedConversation: selectedUser } = useSelector(state => state.convo)

    async function fetchMsg() {
        const res = await axios.get("/api/get/" + selectedUser._id, {
            withCredentials: true
        })
        dispatch(GetMsg(res.data))
    }

    useEffect(() => {
        fetchMsg()
    }, [selectedUser._id])
    return (
        <div className='px-4 flex-1 overflow-auto hello'>
            <Message />
        </div>
    );
};
export default Messages;