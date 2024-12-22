import { Cross } from '../assets/icons/Cross'
import { Transition } from '@headlessui/react'
import toast from "react-hot-toast"

export const NotificationToast = ({ t, message }) => {
    return (
        <Transition
            show={t.visible}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0"
            enterTo="translate-y-0 opacity-100"
            leave="transition ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
            <div className="max-w-md w-full bg-white shadow-xl rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5">
                <div className="flex-1 w-0 p-4" >
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <img
                                className="h-10 w-10 rounded-full border border-gray-200"
                                src={message?.sender?.avatar}
                                alt={message?.sender?.fullname}
                            />
                        </div>
                        <div className="ml-4 flex-1">
                            <p className="text-sm font-semibold text-gray-900">
                                {message?.sender?.fullname || 'Unknown User'}
                            </p>
                            <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                                {message?.message || 'No message content'}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex border-l border-gray-200">
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="w-full rounded-none rounded-r-lg p-4 flex items-center justify-center text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <Cross />
                    </button>
                </div>
            </div>
        </Transition>
    )
}
