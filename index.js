const { Client, GatewayIntentBits } = require("discord.js");
const { GoogleGenAI } = require("@google/genai");
const http = require("http");

const ai = new GoogleGenAI({
apiKey: process.env.GEMINI_API_KEY
});

const client = new Client({
intents: [
GatewayIntentBits.Guilds,
GatewayIntentBits.GuildMessages,
GatewayIntentBits.MessageContent
]
});

const server = http.createServer((req, res) => {
res.writeHead(200, { "Content-Type": "text/plain" });
res.end("Gem 3.6 Flash is online!");
});

server.listen(process.env.PORT || 3000, () => {
console.log("Web server is running.");
});

client.once("ready", () => {
console.log(client.user.tag + " is online!");

client.user.setPresence({
status: "online",
activities: [
{
name: "with Gem 3.6 Flash",
type: 0
}
]
});
});

client.on("messageCreate", async (message) => {
if (message.author.bot) return;

const mentioned = message.mentions.has(client.user);
const saysGem = message.content.toLowerCase().includes("gem");

if (!mentioned && !saysGem) return;

const prompt = message.content
.replace("<@" + client.user.id + ">", "")
.trim();

if (!prompt) {
await message.reply(
"Gem 3.6 Flash is online! What would you like to ask me?"
);
return;
}

try {
await message.channel.sendTyping();

```
const response = await ai.models.generateContent({
  model: "gemini-2.5-flash",
  contents: prompt
});

console.log("Gemini response:", response);

const reply = response.text;

if (!reply) {
  await message.reply("I couldn't generate a response right now.");
  return;
}

if (reply.length <= 2000) {
  await message.reply(reply);
} else {
  for (let i = 0; i < reply.length; i += 1900) {
    await message.channel.send(reply.substring(i, i + 1900));
  }
}
```

} catch (error) {
console.error("Gemini error:", error);
await message.reply(
"Something went wrong while talking to Gemini."
);
}
});

client.login(process.env.DISCORD_TOKEN);
