import { useDispatch, useSelector } from "react-redux";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { IoArrowBack } from "react-icons/io5";
import { unSelectConversation } from "../../redux/conversationSlice";


const MessageContainer = () => {
    const dispatch = useDispatch()
    const { selectedConversation: selectedUser } = useSelector(state => state.convo)
    const { user } = useSelector(state => state.auth)
    return (
        <div className={`w-full flex flex-col ${selectedUser ? "" : "hide-msg-container w-full"}`}>
            {
                selectedUser ? <>
                    {/* Header */}
                    <div className='bg-indigo-400 px-2 py-2 mb-2'>
                        <span className='label-text'></span> <span className='text-gray-900 text-lg flex items-center gap-2 font-bold'><button className="text-lg" onClick={() => dispatch(unSelectConversation())}><IoArrowBack size={25} /></button> {selectedUser.fullName}</span>
                    </div>

                    <Messages />
                    <MessageInput />
                </>
                    :
                    <NoChatSelected user={user} />
            }

        </div >
    );
};
export default MessageContainer;

const NoChatSelected = ({ user }) => {
    return (
        <div className='flex items-center justify-center w-full h-full'>
            <div className='px-4 text-center sm:text-lg md:text-xl text-black font-semibold flex flex-col items-center gap-2'>
                <p>Welcome 👋 {user.username} ❄</p>
                <p>Select a chat to start messaging</p>
                <TiMessages className='text-3xl md:text-6xl text-center' />
            </div>
        </div>
    );
};
