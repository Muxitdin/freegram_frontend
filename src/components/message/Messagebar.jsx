import Message from "./Message";
import MessagebarHeader from "./MessagebarHeader";
import MessageInput from "./MessageInput";

export default function Messagebar() {
    return (
        <main className="relative flex-1 bg-main-1">
            <MessagebarHeader/>

            <section className="overflow-y-scroll flex-1 p-4">
                <Message />
                <Message />
                <Message />
                <Message />
                <Message />
                <Message />
                <Message />
                <Message />
            </section>

            <MessageInput />
        </main>
    )
}