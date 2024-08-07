import { useContext } from "react";
import { UserContext } from "../../pages/Dashboard";
import { IoMdArrowRoundBack } from "react-icons/io";

export default function MessagebarHeader() {
    const { setIsStarter, currentUser } = useContext(UserContext);
    return (
        <div className="flex items-center p-4">
            <button
                className="text-lg font-semibold mr-4"
            >
                <IoMdArrowRoundBack onClick={() => setIsStarter(true)}/>
            </button>
            <div className="flex flex-col">
                <h2 className="text-xl font-bold">{currentUser.fullname}</h2>
                <span
                    className={`text-sm ${status === 'online' ? 'text-green-400' : 'text-gray-400'}`}
                >
                    offline
                </span>
            </div>
        </div>
    );
}