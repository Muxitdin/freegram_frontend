import { Route, Routes, useNavigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { useEffect } from "react";
import service from "./config/service";
import { authSuccess } from "./redux/slice/authSlice";
import { activeSuccess } from './redux/slice/userSlice';
import { useDispatch, useSelector } from "react-redux";
import { activeMessageSuccess } from "./redux/slice/messageSlice";
import Cookies from "js-cookie";
import { Toaster } from "react-hot-toast";
import NotFound from "./pages/NotFound";
import { io } from 'socket.io-client'

export default function App() {
  const { auth } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (Cookies.get("token")) {
      async function getCurrentAuthFunction() {
        try {
          const { data } = await service.getCurrentAuth();
          dispatch(authSuccess(data));
        } catch (error) {
          console.log(error);
          navigate('/');
        }
      };
      getCurrentAuthFunction();
    };
  }, []);

  useEffect(() => {
    if (auth?._id) {
      const socket = io("http://localhost:3000", { query: { authId: auth._id } });

      socket.on("getActiveUsers", (activeUsers) => {
        dispatch(activeSuccess(activeUsers));
      });

      socket.on("getNewMessage", (message) => {
        dispatch(activeMessageSuccess(message));
        console.log(message);
      });

      return () => {
        socket.off("getActiveUsers");
        socket.off("getNewMessage");
        socket.disconnect();
      };
    }
  }, [auth, dispatch]);


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