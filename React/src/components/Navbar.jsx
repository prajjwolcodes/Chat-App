import React from 'react'
import { logout } from '../redux/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { unSelectConversation } from '../redux/conversationSlice'

const Navbar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    async function handleLogout() {
        const res = await axios.post("/api/auth/logout", {
            withCredentials: true
        })
        toast.success(res.data.message)
        dispatch(logout())
        dispatch(unSelectConversation())
    }

    const { user: isUserLoggedIn } = useSelector(state => state.auth)
    return (
        <div>
            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="flex flex-wrap items-center justify-between ">
                    <a href="" className="flex items-center space-x-1">
                        <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/c0840e59-db43-4681-ae7b-31a04dc4bc55/d7eqdvw-4e97ac92-e4b9-4498-9655-e4d612eb478b.png/v1/fill/w_1192,h_670/random_logo_by_criticl_d7eqdvw-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9OTAwIiwicGF0aCI6IlwvZlwvYzA4NDBlNTktZGI0My00NjgxLWFlN2ItMzFhMDRkYzRiYzU1XC9kN2VxZHZ3LTRlOTdhYzkyLWU0YjktNDQ5OC05NjU1LWU0ZDYxMmViNDc4Yi5wbmciLCJ3aWR0aCI6Ijw9MTYwMCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.X991O1jF5lTNZbbEoHEfoo6nlHEihBMHMIm5-uBCXcU" className="h-8 " alt="Connect Us" />
                        <span className="self-center text-2xl responsive-navbar font-semibold whitespace-nowrap dark:text-white">Connect Us</span>
                    </a>
                    <div className="flex items-center">
                        {isUserLoggedIn ?
                            <>
                                <button>
                                    <a onClick={handleLogout} className="block px-7 py-5 text-md text-black hover:bg-gray-100 dark:hover:bg-gray-600 responsive-signout-btn dark:text-gray-200 dark:hover:text-white">Sign out</a>
                                </button>
                                <button type="button" className="flex text-md bg-gray-800 rounded-full mr-3 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" >
                                    <img className="w-8 h-8 rounded-full hide-avatar" src={isUserLoggedIn.profilePic} alt="user photo" />
                                </button>
                            </>
                            :
                            <>
                                <button>
                                    <a onClick={() => navigate("/signup")} className="block px-4 py-5 text-md text-black hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign Up</a>
                                </button>
                                <button>
                                    <a onClick={() => navigate("/login")} className="block px-6 
                                    bg-slate-200 py-5 text-md text-black hover:bg-slate-300 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Login</a>
                                </button>
                            </>
                        }

                    </div>
                </div>
            </nav>

        </div>
    )
}

export default Navbar