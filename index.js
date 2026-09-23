const { Client, GatewayIntentBits } = require("discord.js");
const http = require("http");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// Small web server for Render
const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Gem 3.6 Flash is online! ⚡");
});

server.listen(process.env.PORT || 3000, () => {
  console.log("Web server is running.");
});

client.once("ready", () => {
  console.log(`⚡ ${client.user.tag} is online!`);
});

client.on("messageCreate", (message) => {
  if (message.author.bot) return;

  if (
    message.content.toLowerCase().includes("gem") ||
    message.mentions.has(client.user)
  ) {
    message.reply(
      "⚡ **Gem 3.6 Flash** is online! How can I help?"
    );
  }
});

client.login(process.env.DISCORD_TOKEN);
