import { Route, Routes, useNavigate } from "react-router-dom"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import { useEffect, useState } from "react"
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
import { baseURL } from './config/api'

export default function App() {
    const { auth } = useSelector(state => state.auth)
    const { user } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const [theme, setTheme] = useState("")

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
        if (localStorage.getItem("theme")) {
            setTheme(localStorage.getItem("theme"))
        } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            setTheme("dark")
        } else {
            setTheme("light")
        }
    }, [])

    useEffect(() => {
        const handleOnline = () => {
            toast.success("You are online", {
                icon: "🟢",
                style: {
                    background: "var(--primary)",
                    color: "var(--text)"
                },
                duration: 7000,
            })
        }

        const handleOffline = () => {
            toast.error(
                "You are offline, check your internet connection",
                {
                    icon: "⚠",
                    style: {
                        background: "var(--primary)",
                        color: "var(--text)"
                    },
                    duration: 7000,
                }
            )
        }

        window.addEventListener("online", handleOnline)
        window.addEventListener("offline", handleOffline)

        return () => {
            window.removeEventListener("online", handleOnline)
            window.removeEventListener("offline", handleOffline)
        }
    }, [])

    useEffect(() => {
        if (auth?._id) {
            const socket = io(baseURL, { query: { authId: auth._id } })

            socket.on("getActiveUsers", (activeUsers) => {
                dispatch(activeSuccess(activeUsers))
            })

            socket.on("getNewMessage", (data) => {
                console.log(data)
                console.log(user)
                if (user?._id === data.sender) {
                    dispatch(messageSuccess({ data: data.newMessage, type: "push" })) // вытягивание нового сообщения и добавление его в массив дабы сразу отобразилось у собеседника
                } else {
                    toast.custom((t) => <NotificationToast t={t} message={data.newMessage} />)
                }
            })

            return () => {
                socket.off("getActiveUsers")
                socket.off("getNewMessage")
                socket.disconnect()
            }
        }
    }, [auth, user, dispatch])


    return (
        <main className={theme}>
            <Toaster position="top-right" reverseOrder={true} />
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard theme={theme} setTheme={setTheme} />} />
            </Routes>
        </main>
    )
}