const { Events } = require("discord.js");
const fs = require("fs");
const path = require("path");

module.exports = {
    name: Events.MessageCreate,
    async execute(message, client) {

        const prefixCommandsDir = path.join(__dirname, "../../prefix-commands");

        if (!fs.existsSync(prefixCommandsDir)) {
            console.log("No prefix commands found");
        }
        const prefixFolders = fs.readdirSync(prefixCommandsDir).filter((file) => file.endsWith(".js"));

        for (const arx of prefixFolders) {
            const Cmd = require(path.join(prefixCommandsDir, arx));
            client.prefix.set(Cmd.name, Cmd);
        }

            const prefix = JSON.parse(fs.readFileSync("./config.json", "utf8")).prefix;
          
            if (!message.content.startsWith(prefix) || message.author.bot) return;
            const args = message.content.slice(prefix.length).trim().split(/ +/);
            const command = args.shift().toLowerCase();
            const prefixCmd = client.prefix.get(command) || client.prefix.find(cmd => cmd.aliases && cmd.aliases.includes(command));
          
            if (prefixCmd) {
              prefixCmd.execute(client, message, args);
            }
    }
}