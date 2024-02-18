import cors from "@koa/cors";
import Router from "@koa/router";
import { Client, IntentsBitField } from "discord.js";
import Koa from "koa";

const router = new Router();

interface Message {
  id: string;
  content: string;
  author: Author;
}

interface Author {
  username: string;
  avatarURL: string;
}

let messages: Message[] = [];

async function getLatestMessages(
  client: Client,
  limit = 5
): Promise<Message[]> {
  if (!client.isReady()) return;

  const channel = await client.channels.fetch(process.env.DISCORD_CHANNEL_ID!);

  if (channel == null) return;
  if (!channel.isTextBased()) return;

  const messages = await channel.messages.fetch({
    limit
  });

  const messagesFetched = await Promise.all(
    messages.map(async (message) => {
      const author = await message.author.fetch();

      return {
        id: message.id,
        content: message.content,
        author: {
          username: message.author.username ?? message.author.username,
          avatarURL: author.avatarURL()
        }
      };
    })
  );

  return messagesFetched.reverse();
}

router.get("/getLatestMessages", async (ctx) => {
  ctx.response.body = {
    messages
  };
});

const app = new Koa();

app.use(cors());
app.use(router.routes());
app.use(router.allowedMethods());

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildMessages
  ]
});

client.once("ready", async (ctx) => {
  console.log(`${ctx.user.username} is ready!`);

  messages = await getLatestMessages(client);
  setInterval(async () => (messages = await getLatestMessages(client)), 20000);
});

client.login(process.env.DISCORD_TOKEN);

app.listen({ port: process.env.PORT || 8000 });
