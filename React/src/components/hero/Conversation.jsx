import { useDispatch, useSelector } from "react-redux";
import { selectConversation } from "../../redux/conversationSlice";

const Conversation = ({ user }) => {
    const dispatch = useDispatch()
    const { selectedConversation: selectedUser } = useSelector(state => state.convo)
    const isSelected = selectedUser?._id === user._id
    return (
        <>
            <div onClick={() => dispatch(selectConversation(user))} className={`${isSelected ? "bg-sky-500" : ""} flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer `}>
                <div className='avatar online '>
                    <div className='w-12 rounded-full '>
                        <img
                            src={user.profilePic}
                            alt='user avatar'
                        />
                    </div>
                </div>

                <div className='flex flex-col flex-1 '>
                    <div className='flex gap-3 justify-between hello'>
                        <p className='font-semibold text-black'>{user.fullName}</p>
                    </div>
                </div>
            </div>

            <div className='divider my-0 py-0 h-1' />
        </>
    );
};
export default Conversation;