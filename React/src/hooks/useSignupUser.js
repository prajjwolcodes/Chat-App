import { useState } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { signUp } from '../redux/authSlice'

const useSignupUser = () => {
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    async function signupUser(userData) {
        const success = handleInputErrors(userData)
        if (!success) return

        setLoading(true)
        try {
            const res = await axios.post("http://localhost:3000/api/auth/signup", userData)
            toast.success("Succesfully Signed Up")
            localStorage.setItem("chat-user", JSON.stringify(res.data))
            dispatch(signUp(res.data))
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }
    return { loading, signupUser }
}

export default useSignupUser

function handleInputErrors(userData) {
    const { fullName, username, password, confirmPassword, gender } = userData
    if (!fullName || !username || !password || !confirmPassword || !gender) {
        toast.error("Please fill all the fields")
        return false
    }
    if (password !== confirmPassword) {
        toast.error("Password Do not match")
        return false
    }
    if (password.length < 6) {
        toast.error("Password must be longer than 6")
        return false
    }
    return true
}