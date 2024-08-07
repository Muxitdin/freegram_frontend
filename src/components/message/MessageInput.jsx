import { useState } from "react";
import EmojiPicker from 'emoji-picker-react';

export default function MessageInput() {
    const [message, setMessage] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);


    const handleEmojiClick = (emojiObject) => {
        setMessage((prevMessage) => prevMessage + emojiObject.emoji);
        setShowEmojiPicker(false);
    };

    const toggleEmojiPicker = () => {
        setShowEmojiPicker((prev) => !prev);
    };

    return (
        <div className="absolute bottom-0 min-w-full flex items-center p-4 border-t border-gray-300">
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 p-3 border-none rounded-lg focus:outline-none bg-blue-100"
            />
            <button
                onClick={toggleEmojiPicker}
                className="ml-2 p-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 focus:outline-none"
            >
                😀
            </button>
            {showEmojiPicker && (
                <div className="absolute bottom-full right-4 mb-1 z-10">
                    <EmojiPicker onEmojiClick={handleEmojiClick} theme={"light"} autoFocusSearch={true} emojiStyle={"native"}/>
                </div>
            )}
            <button
                // onClick={handleSend}
                className="w-1/12 ml-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                Send
            </button>
        </div>
    )
}