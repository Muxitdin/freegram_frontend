export default function Message({ sender, message, isOwnMessage, time, customRef }) {
    const extractTime = (time) => {
        const date = new Date(time);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`
    }

    return (
        <div ref={customRef} className={`flex my-2 ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex flex-col h-fit max-w-md px-2 py-1 rounded-xl overflow-hidden ${isOwnMessage ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
                <span className="flex justify-between items-end">
                    <div className="break-words max-w-full whitespace-pre-wrap">{message}</div>
                    <span className="text-xs text-right ml-2 whitespace-nowrap flex-shrink-0">{extractTime(time)}</span>
                </span>
            </div>
        </div>
    );
}