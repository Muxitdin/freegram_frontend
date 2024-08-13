import { useEffect, useState, useContext } from "react"
import { useDispatch, useSelector } from "react-redux";
import { userEnd, userStart, userSuccess } from "../../redux/slice/userSlice";
import service from "../../config/service";
import toast from "react-hot-toast";
import { UserContext } from "../../pages/Dashboard";
import { messageEnd, messageStart, messageSuccess } from "../../redux/slice/messageSlice";


export default function UserComponent() {
    const { currentUser, setCurrentUser, setIsSelected } = useContext(UserContext);
    const { users, active } = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        const getAllUsersFunction = async () => {
            try {
                dispatch(userStart());
                const { data } = await service.getAllUsers();
                dispatch(userSuccess({ data, type: "b" }));
            } catch (error) {
                dispatch(userEnd());
                console.log(error);
            }
        }

        getAllUsersFunction();
    }, []);

    const getMessagesFunction = async (user) => {
        try {
            setCurrentUser(user)
            dispatch(messageStart());
            const { data } = await service.getAllMessages(user?._id);
            dispatch(messageSuccess(data));
            setIsSelected(user?._id);
        } catch (error) {
            dispatch(messageEnd());
            toast.error(error.message);
            console.log(error);
        }
    }

    return (
        <section className="overflow-y-auto">
            {
                users?.map(user => (
                    <div onClick={() => getMessagesFunction(user)} key={user?._id} className="flex items-start justify-between p-2 cursor-pointer hover:bg-gray-200 transition-all rounded-md">
                        <div className="flex gap-4">
                            <img src={user?.avatar} alt={user?.fullname} className="size-12" />
                            <div className="flex flex-col">
                                <h4 className="text-base">{user?.fullname}</h4>
                                {/* 30ta belgidan oshib ketsa, so'zni qirqish va ... qo'shish kerak! */}
                                <p className="text-sm text-gray-400">
                                    {active.includes(user?._id) ?
                                        <span className='text-blue-500'>online</span>
                                        : "offline"}
                                </p>
                            </div>
                        </div>
                        {/* <p className="text-xs text-gray-400">Mon, 7:41 AM</p> */}
                    </div>
                ))
            }
        </section>
    )
}