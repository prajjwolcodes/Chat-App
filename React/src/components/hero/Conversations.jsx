import axios from "axios";
import Conversation from "./Conversation";
import { useEffect, useState } from "react";
import { setAllUsers } from "../../redux/authSlice";
import { useDispatch } from "react-redux";

const Conversations = () => {
    const dispatch = useDispatch()
    const [registeredUsers, setUser] = useState([])
    async function fetchUser() {
        const res = await axios.get("http://localhost:3000/api/users", {
            withCredentials: true
        })
        setUser(res.data)
        dispatch(setAllUsers(res.data))
    }

    useEffect(() => {
        fetchUser()
    }, [])
    return (
        <div className='py-2 flex flex-col overflow-auto hello'>
            {registeredUsers.map(users => {
                return (
                    <Conversation key={users._id} user={users} />
                )
            })}
        </div>
    );
};
export default Conversations;