import {
  DiscordMessage,
  DiscordMessages,
} from "@skyra/discord-components-react";
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

      <DiscordMessages>
        {messages.map((message) => (
          <DiscordMessage
            key={message.id}
            author={message.author.username}
            avatar={
              message.author.avatar
                ? `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.webp`
                : "https://cdn.discordapp.com/embed/avatars/0.png"
            }
          >
            {message.content}
          </DiscordMessage>
        ))}
      </DiscordMessages>
    </main>
  );
}
