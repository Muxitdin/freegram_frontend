import { useEffect, useRef } from "react";
import Message from "./Message";
import { useDispatch, useSelector } from "react-redux";
import MessagebarHeader from "./MessagebarHeader";
import MessageInput from "./MessageInput";
import Starter from "./Starter";

export default function Messagebar() {
    const { auth } = useSelector(state => state.auth);
    const { messages } = useSelector(state => state.message);
    const lastMessageRef = useRef();

    useEffect(() => {
        setTimeout(() => {
            lastMessageRef.current?.scrollIntoView({ behavior: "smooth" })
        }, 100)
    }, [messages])

    return (
        <main className="h-full relative flex-1 flex flex-col bg-main-1">
            <MessagebarHeader />
            {messages.length > 0 ? (
                <section className="overflow-y-auto flex-1 p-4 pb-20">
                    {
                        messages.map(msg => (
                            <Message
                                key={msg?._id}
                                sender={msg?.sender}
                                message={msg?.message}
                                time={msg?.createdAt}
                                isOwnMessage={msg?.sender?._id === auth?._id}
                                customRef={lastMessageRef}
                            />
                        ))
                    }
                </section>
            ) : <Starter txt={"Здесь пока ничего нет..."} extraStyle={"top-[40%]"} positioning={"absolute top-0"} />}


            <MessageInput />
        </main>
    )
}