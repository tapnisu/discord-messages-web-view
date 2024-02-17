import Router from "@koa/router";
import { Client } from "discord.js-selfbot-v13";
import Koa from "koa";

const router = new Router();

router.get("/getLatestMessages", async (ctx) => {
  if (!client.isReady()) return (ctx.response.status = 500);

  const channel = await client.channels.fetch(process.env.DISCORD_CHANNEL_ID!);
  if (channel == null || !channel.isText()) return (ctx.response.status = 500);

  const messages = await channel.messages.fetch({
    limit: 5
  });

  const messagesFetched = messages.map(async (message) => ({
    ...message,
    author: await message.author.fetch()
  }));

  ctx.response.body = JSON.stringify({
    messages: await Promise.all(messagesFetched)
  });
});

const app = new Koa();

app.use(router.routes());
app.use(router.allowedMethods());

const client = new Client();
client.login(process.env.DISCORD_TOKEN);

app.listen({ port: process.env.PORT || 8000 });
