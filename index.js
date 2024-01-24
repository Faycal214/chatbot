import { Client, GatewayIntentBits } from 'discord.js';
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });


import { OpenAI } from "openai";

const openai = new OpenAI({
  apikey: "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",
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", async (msg) =>{
  if (msg.author.bot) return 

  if (!msg.mentions.has(client.user)) return 

  msg.content = msg.content.replace(/<@\d+>/g, "")

  let response = msg.reply("Genetrating response...")

  const completion = await openai.completions.create({
    model: "gpt-3.5-turbo-instruct",
    prompt: msg.content,
    max_tokens: 1000
  });
  console.log(completion.choices[0].text);
  (await response).edit(completion.choices[0].text);
})


client.login("MTE5OTM1OTM4MDI2NTYzOTk1Ng.GQrIwq.4xswI4I3_NUj_MwsVDh5JIyGX2SMUho5QFW4P8");
