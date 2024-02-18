import { APIMessage } from "discord-api-types/v10";
import { useEffect, useState } from "react";
import Avatar from "./components/Avatar";
import "./index.css";

export default function App() {
  const [messages, setMessages] = useState<APIMessage[]>([]);

  function fetchMessages() {
    fetch("http://localhost:8000/getLatestMessages", { cache: "no-store" })
      .then((result) => result.json())
      .then((result) => setMessages(result.messages));
  }

  useEffect(() => {
    fetchMessages();
    setInterval(() => fetchMessages(), 20000);
  }, []);

  return (
    <main>
      <h1>Discord messages</h1>

      {messages.map((message) => (
        <div className="flex">
          <Avatar user={message.author} className="p-2" />

          <div className="p-2">
            <b>{message.author.global_name ?? message.author.username}</b>

            <p>{message.content}</p>
          </div>
        </div>
      ))}
    </main>
  );
}
