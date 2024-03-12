import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from "react-redux";
import { selectConversation } from "../../redux/conversationSlice";


const SearchInput = () => {
    const [search, setSearch] = useState("")
    const dispatch = useDispatch()
    const { allUsers } = useSelector(state => state.auth)
    function handleSubmit(e) {
        e.preventDefault()
        if (!search) return
        if (search.length < 3)
            return toast.error("Search Character should be more than 3 characters")

        const searchedUser = allUsers.find((user) => user.fullName.toLowerCase().includes(search.toLowerCase()))
        if (!searchedUser)
            return toast.error("No User Found")
        dispatch(selectConversation(searchedUser))
        setSearch("")
    }

    return (
        <form className='flex items-center gap-2' onSubmit={handleSubmit}>
            <input type='text' placeholder='Search…' className='input input-bordered flex-1 rounded-full' value={search} onChange={(e) => setSearch(e.target.value)} />
            <button type='submit' className='btn btn-circle bg-sky-500 text-white'>
                <IoSearchSharp className='w-6 h-6 outline-none' />
            </button>
        </form>
    );
};
export default SearchInput;
