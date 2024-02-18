import cors from "@koa/cors";
import Router from "@koa/router";
import { Client, IntentsBitField } from "discord.js";
import Koa from "koa";

const router = new Router();

router.get("/getLatestMessages", async (ctx) => {
  if (!client.isReady()) {
    ctx.response.body = "Client is not ready!";
    ctx.response.status = 500;

    return;
  }

  const channel = await client.channels.fetch(process.env.DISCORD_CHANNEL_ID!);

  if (channel == null) {
    ctx.response.body = "Channel not found!";
    ctx.response.status = 500;
    return;
  }
  if (!channel.isTextBased()) {
    ctx.response.body = "This is not a text channel!";
    ctx.response.status = 500;
    return;
  }

  const messages = await channel.messages.fetch({
    limit: 5
  });

  const messagesFetched = messages.map(async (message) => ({
    author: await message.author.fetch(),
    ...message
  }));

  ctx.response.body = {
    messages: (await Promise.all(messagesFetched)).reverse()
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
client.login(process.env.DISCORD_TOKEN);

app.listen({ port: process.env.PORT || 8000 });
