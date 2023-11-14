require("dotenv").config();
const { token } = process.env;
const { Client, Collection, GatewayIntentBits } = require("discord.js");
const fs = require("fs");

const client = new Client({
  // intents: [
  //   GatewayIntentBits.Guilds,
  //   GatewayIntentBits.GuildMessages,
  //   GatewayIntentBits.MessageContent,
  //   GatewayIntentBits.GuildMembers,
  // ],
  intents: 3276799
});

client.commands = new Collection();
client.buttons = new Collection();
client.selectMenus = new Collection();
client.modals = new Collection();
client.prefix = new Collection();
client.commandArray = [];

client.setMaxListeners(Infinity);

const functionFolders = fs.readdirSync(`./src/functions`);
for (const folder of functionFolders) {
  const functionFiles = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter((file) => file.endsWith(".js"));

  for (const file of functionFiles) {
    require(`./functions/${folder}/${file}`)(client);
  }
}

client.handleEvents();
client.handleCommands();
client.handleComponents();
client.login(token);

process.on("unhandledRejection", async (reason, promise) => {
  console.log('Unhandled Rejection At:', promise, 'Reason:', reason);
});

process.on("uncaughtException", (err, origin) => {
  console.log('Uncaught Exception:', err, origin);
})
