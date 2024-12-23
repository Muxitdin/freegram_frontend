import { useContext } from "react";
import { UserContext } from "../../pages/Dashboard";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useSelector } from "react-redux";

export default function MessagebarHeader() {
    const { active } = useSelector(state => state.user);
    const { setIsSelected, currentUser } = useContext(UserContext);
    return (
        <div className="flex items-center p-4 pb-2 shadow-md bg-primary">
            <button
                className="text-lg text-text font-semibold mr-4"
            >
                <IoMdArrowRoundBack onClick={() => setIsSelected(prev => !prev)} />
            </button>
            <div className="flex">
                <img src={currentUser.avatar} alt={currentUser.fullname} className="size-12 mr-2" />
                <div>
                    <h2 className="text-base text-text font-semibold">{currentUser.fullname}</h2>
                    {active.includes(currentUser?._id) ? (
                        <span className={`text-sm text-blue-400`}>
                            online
                        </span>
                    ) : (
                        <span className={`text-sm text-gray-400`}>
                            offline
                        </span>
                    ) }
                                        
                </div>
            </div>
        </div>
    );
}