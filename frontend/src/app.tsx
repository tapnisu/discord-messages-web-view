import { useEffect, useState } from "react";
import Avatar from "./components/Avatar";
import "./index.css";
import { Message } from "./lib/types";

const BASE_PATH = import.meta.env.API_URL ?? "http://localhost:8000";

export default function App() {
  const [messages, setMessages] = useState<Message[]>([]);

  function fetchMessages() {
    fetch(new URL("/getLatestMessages", BASE_PATH).href, { cache: "no-store" })
      .then((result) => result.json())
      .then((result) => setMessages(result.messages));
  }

  useEffect(() => {
    fetchMessages();
    setInterval(() => fetchMessages(), 20000);
  }, []);

  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-neutral-800 text-white">
      <h1 className="text-xl font-bold">Discord messages</h1>

      <div className="w-full max-w-[768px]">
        {messages.map((message) => (
          <div className="flex" key={message.id}>
            <Avatar author={message.author} className="p-2" />

            <div className="p-2">
              <b>{message.author.username}</b>

              <p>{message.content}</p>
            </div>
          </div>
        ))}
      </div>

      <p>
        Built by{" "}
        <a
          href="https://github.com/tapnisu"
          className="text-cyan-400 underline"
        >
          tapnisu
        </a>
      </p>
    </main>
  );
}
