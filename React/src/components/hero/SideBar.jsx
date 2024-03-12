import { useSelector } from "react-redux";
import Conversations from "./Conversations";
import SearchInput from "./SearchInput";


const Sidebar = () => {
    const { selectedConversation: selectedUser } = useSelector(state => state.convo)
    return (
        <div className={`border-r border-slate-500 p-4 flex flex-col bg-indigo-100 ${selectedUser ? "hide-sidebar" : "flex-1"}`}>
            <SearchInput />
            <div className='divider px-3'></div>
            <Conversations />
        </div>
    );
};
export default Sidebar;
