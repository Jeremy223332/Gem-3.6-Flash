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
console.log("Gem 3.6 Flash is online!");

client.user.setPresence({
status: "online",
activities: [
{
name: "with Gemini",
type: 0
}
]
});
});

client.on("messageCreate", async (message) => {
if (message.author.bot) return;

if (!message.mentions.has(client.user)) return;

const prompt = message.content
.replace(new RegExp("<@!?"+client.user.id+">", "g"), "")
.trim();

if (!prompt) {
await message.reply(
"⚡ Gem 3.6 Flash is online! Ask me something."
);
return;
}

try {
await message.channel.sendTyping();

```
const result = await ai.models.generateContent({
  model: "gemini-2.5-flash",
  contents: prompt
});

const reply = result.text;

if (!reply) {
  await message.reply("Gemini didn't return a response.");
  return;
}

if (reply.length <= 2000) {
  await message.reply(reply);
} else {
  for (let i = 0; i < reply.length; i += 1900) {
    await message.channel.send(reply.slice(i, i + 1900));
  }
}
```

} catch (error) {
console.error("GEMINI ERROR:", error);
await message.reply(
"⚠️ Gemini couldn't respond. Check the Render logs."
);
}
});

client.login(process.env.DISCORD_TOKEN);
