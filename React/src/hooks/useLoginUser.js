import axios from 'axios'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { login } from '../redux/authSlice'


const useLoginUser = () => {
    const dispatch = useDispatch()
    async function loginUser(userData) {
        const { username, password } = userData
        if (!username || !password) {
            toast.error("Please fill all the fields")
            return
        }
        try {
            const res = await axios.post("http://localhost:3000/api/auth/login", userData, {
                withCredentials: true
            })
            toast.success("Succesfully Logged In")
            localStorage.setItem("chat-user", JSON.stringify(res.data))
            dispatch(login(res.data))
        } catch (error) {
            toast.error(error.response.data.error)
        }
    }
    return { loginUser }
}

export default useLoginUser