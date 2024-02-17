import { APIMessage } from "discord-api-types/v10";
import { useEffect, useState } from "react";

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
        <div key={message.id}>
          {message.author.avatar ? (
            <img
              src={`https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.webp`}
              alt={`${message.author.username}'s avatar`}
            />
          ) : null}
          <p>{message.author.username}</p>
          <p>{message.content}</p>
        </div>
      ))}
    </main>
  );
}
