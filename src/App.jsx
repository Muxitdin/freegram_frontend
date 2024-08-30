import { Route, Routes, useNavigate } from "react-router-dom"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import { useEffect } from "react"
import service from "./config/service"
import { authSuccess } from "./redux/slice/authSlice"
import { activeSuccess } from './redux/slice/userSlice'
import { useDispatch, useSelector } from "react-redux"
import { messageSuccess } from "./redux/slice/messageSlice"
import Cookies from "js-cookie"
import toast, { Toaster } from "react-hot-toast"
import NotFound from "./pages/NotFound"
import { io } from 'socket.io-client'
import { NotificationToast } from "./utils/NotificationToast"

export default function App() {
    const { auth } = useSelector(state => state.auth)
    const { user } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    console.log(user)
    useEffect(() => {
        if (Cookies.get("token")) {
            async function getCurrentAuthFunction() {
                try {
                    const { data } = await service.getCurrentAuth()
                    dispatch(authSuccess(data))
                } catch (error) {
                    console.log(error)
                    navigate('/')
                }
            };
            getCurrentAuthFunction()
        };
    }, [])

    useEffect(() => {
        if (auth?._id) {
            const socket = io("http://localhost:3000", { query: { authId: auth._id } })

            socket.on("getActiveUsers", (activeUsers) => {
                dispatch(activeSuccess(activeUsers))
            })

            socket.on("getNewMessage", (data) => {
                console.log(data)
                console.log(user)
                if (user?._id === data.sender) {
                    dispatch(messageSuccess({ data: data.newMessage, type: "push" }))
                } else {
                    toast.custom((t) => <NotificationToast t={t} message={data.newMessage} />)
                }
                // toast.custom((t) => <NotificationToast t={t} message={message} />)
                // if (user && user._id !== message && message.sender && message.sender._id) return
                // dispatch(messageSuccess({ data: message, type: "push" }))
                // console.log(message)
            })

            return () => {
                socket.off("getActiveUsers")
                socket.off("getNewMessage")
                socket.disconnect()
            }
        }
    }, [auth, user, dispatch])


    return (
        <main>
            <Toaster position="top-right" reverseOrder={true} />
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </main>
    )
}