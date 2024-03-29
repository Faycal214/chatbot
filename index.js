import { Client, GatewayIntentBits } from 'discord.js';
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });


import { OpenAI } from "openai";

const openai = new OpenAI({
  apikey: "YOU PUT YOUR AIP KEY HERE",
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


client.login("PUT YOUR BOT TOKEN HERE");
