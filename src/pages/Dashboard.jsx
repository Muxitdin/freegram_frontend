import { useEffect, useState, createContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import Messagebar from "../components/message/Messagebar";
import Starter from "../components/message/Starter";
import HalfRingLoader from "../utils/HalfRingLoader";

export const UserContext = createContext()

export default function Dashboard() {
    const { isLoading, isLoggedIn } = useSelector(state => state.auth);
    const { isMessageLoading, messages } = useSelector(state => state.message);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(null)
    const [isSelected, setIsSelected] = useState(false);


    useEffect(() => {
        if (!isLoggedIn) navigate('/');
    }, [isLoggedIn, navigate]);

    return (
        <UserContext.Provider value={{ isSelected, setIsSelected, currentUser, setCurrentUser }}>
            <main className="w-full h-screen overflow-hidden flex">
                {isLoading && <HalfRingLoader />}
                <Sidebar />
                {
                    isMessageLoading ?
                        <div className="relative flex-1 z-0">
                            <HalfRingLoader />
                        </div>
                        : isSelected ? <Messagebar /> : <Starter txt={"Выберите кому хотели бы написать"}/>
                }
            </main>
        </UserContext.Provider>
    )
}