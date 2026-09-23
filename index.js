const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
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
