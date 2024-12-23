import { useState, useRef, useEffect, useContext } from "react"
import EmojiPicker from 'emoji-picker-react'
import { IoSend } from "react-icons/io5"
import service from "../../config/service"
import { UserContext } from "../../pages/Dashboard"
import { messageEnd, messageStart, messageSuccess } from "../../redux/slice/messageSlice"
import toast from "react-hot-toast"
import { useDispatch } from "react-redux"


export default function MessageInput() {
    const [message, setMessage] = useState('')
    const [showEmojiPicker, setShowEmojiPicker] = useState(false)
    const textareaRef = useRef(null)
    const { currentUser, theme } = useContext(UserContext)
    const dispatch = useDispatch()

    useEffect(() => {
        const textarea = textareaRef.current
        textarea.style.height = 'auto' // Reset height to auto to calculate the scrollHeight
        if (textarea.scrollHeight > 150) {
            textarea.style.height = '150px' // Set the max height
            textarea.style.overflowY = 'scroll' // Enable scrolling
        } else {
            textarea.style.height = `${textarea.scrollHeight}px` // Adjust height to fit content
            textarea.style.overflowY = 'hidden' // Disable scrolling
        }
    }, [message])

    const handleEmojiClick = (emojiObject) => {
        setMessage((prevMessage) => prevMessage + emojiObject.emoji)
    }

    const toggleEmojiPicker = () => {
        setShowEmojiPicker((prev) => !prev)
    }

    const handleSend = async (e) => {
        e?.preventDefault()
        try {
            console.log(message)
            if (message.trim() === "") return
            const { data } = await service.sendMessage(currentUser._id, message)
            console.log(data)
            dispatch(messageSuccess({ data, type: "push" }))
            setMessage('')
        } catch (error) {
            console.log(error)
        }
        setShowEmojiPicker(false)
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) { // Check if Enter key is pressed and Shift key is not held
            e.preventDefault()
            handleSend()
        }
    }

    return (
        <form onSubmit={handleSend} className="absolute bottom-0 min-w-full flex items-center p-3 border-none bg-primary shadow-smooth">
            <textarea
                ref={textareaRef}
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message..."
                className="flex-1 p-3 border-none rounded-lg focus:outline-none resize-none text-text bg-secondary"
                rows={1}
                style={{ maxHeight: '150px' }}
            />
            <button
                type='button'
                onClick={toggleEmojiPicker}
                className="ml-2 p-3 bg-secondary text-gray-600 rounded-lg focus:outline-none"
            >
                😀
            </button>
            {showEmojiPicker && (
                <div className="absolute bottom-full right-4 mb-1 z-10">
                    <EmojiPicker onEmojiClick={handleEmojiClick} theme={theme} autoFocusSearch={true} emojiStyle={"google"} width={300} height={450} searchDisabled={true} />
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