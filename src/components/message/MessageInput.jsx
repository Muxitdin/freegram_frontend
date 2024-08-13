import { useState, useRef, useEffect, useContext } from "react";
import EmojiPicker from 'emoji-picker-react';
import { IoSend } from "react-icons/io5";
import service from "../../config/service";
import { UserContext } from "../../pages/Dashboard";
import { messageEnd, messageStart, messageSuccess } from "../../redux/slice/messageSlice";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";


export default function MessageInput() {
    const [message, setMessage] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const textareaRef = useRef(null);
    const { currentUser } = useContext(UserContext)
    const dispatch = useDispatch();

    useEffect(() => {
        const textarea = textareaRef.current;
        textarea.style.height = 'auto'; // Reset height to auto to calculate the scrollHeight
        if (textarea.scrollHeight > 150) {
            textarea.style.height = '150px'; // Set the max height
            textarea.style.overflowY = 'scroll'; // Enable scrolling
        } else {
            textarea.style.height = `${textarea.scrollHeight}px`; // Adjust height to fit content
            textarea.style.overflowY = 'hidden'; // Disable scrolling
        }
    }, [message]);

    const handleEmojiClick = (emojiObject) => {
        setMessage((prevMessage) => prevMessage + emojiObject.emoji);
    };

    const toggleEmojiPicker = () => {
        setShowEmojiPicker((prev) => !prev);
    };

    const handleSend = async (e) => {
        e?.preventDefault();
        try {
            console.log(message)
            if (message.trim() === "") return; // Prevent sending empty messages
            const { data } = await service.sendMessage(currentUser._id, message);
            console.log('Message sent successfully: ' + data);
            setMessage('');

            try {
                // dispatch(messageStart());
                const { data } = await service.getAllMessages(currentUser._id);
                dispatch(messageSuccess(data));
            } catch (error) {
                dispatch(messageEnd());
                toast.error(error.message);
                console.log(error);
            }
        } catch (error) {
            console.log(error)
        }
        setShowEmojiPicker(false);
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) { // Check if Enter key is pressed and Shift key is not held
            e.preventDefault();
            handleSend();
        }
    }

    return (
        <form onSubmit={handleSend} className="absolute bottom-0 min-w-full flex items-center p-4 border-t border-gray-300 bg-main-1">
            <textarea
                ref={textareaRef}
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message..."
                className="flex-1 p-3 border-none rounded-lg focus:outline-none bg-blue-100 resize-none"
                rows={1}
                style={{ maxHeight: '150px' }}
            />
            <button
                onClick={toggleEmojiPicker}
                className="ml-2 p-3 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 focus:outline-none"
            >
                😀
            </button>
            {showEmojiPicker && (
                <div className="absolute bottom-full right-4 mb-1 z-10">
                    <EmojiPicker onEmojiClick={handleEmojiClick} theme={"light"} autoFocusSearch={true} emojiStyle={"google"} width={300} height={450} searchDisabled={true} />
                </div>
            )}
            <button
                type="submit"
                className=" ml-2 p-3 text-2xl bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <IoSend />
            </button>
        </form>
    )
}