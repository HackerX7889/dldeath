const fs = require('fs')
require('dotenv').config()
const OwnerID = process.env.OWNER;

module.exports = {
    name: 'add',
    description: 'Add a Mod in bot\'s memory',
    async execute(client, message, args) {

        const adminsData = JSON.parse(fs.readFileSync('./settings.json', 'utf8'));
        const admins = adminsData.mods;

        try {

            if (message.author.id !== OwnerID) {
                return message.reply({
                    content: 'only the lord of darkness can run this command'
                })
            }

            const lastArg = args[args.length - 1];
            if (lastArg !== 'G' && lastArg !== 'nig') {
                return message.reply('Invalid arguments passed. Please use `.add @user G // .add @user nig`.');
            }

            const targetUserID = args[0];
            const targetUser = await client.users.fetch(targetUserID);
            if (lastArg === 'G') {

                if (message.author.id !== OwnerID) {
                    return message.reply("Only The Bot's Chief Administrator or Owner Can Execute This Command!");
                }

                const adminsData = JSON.parse(fs.readFileSync('./settings.json', 'utf8'));
                const mods = adminsData.mods;
                if (mods.includes(targetUserID)) {
                    return message.reply(`${targetUser.username} is already a mod.`);
                }
                mods.push(targetUserID);
                adminsData.mods = mods;
                fs.writeFileSync('./settings.json', JSON.stringify(adminsData));
                message.reply(`${targetUser.username} has been added as a mod.`);
            } else if (lastArg === 'nig') {

                if (message.author.id !== OwnerID) {
                    return message.reply("Only The Bot's Chief Administrator or Owner Can Execute This Command!");
                }

                const adminsData = JSON.parse(fs.readFileSync('./settings.json', 'utf8'));
                const devs = adminsData.blacklisted;
                if (devs.includes(targetUserID)) {
                    return message.reply(`${targetUser.username} is already a nig bruh.`);
                }
                devs.push(targetUserID);
                // adminsData.devs = devs;
                fs.writeFileSync('./settings.json', JSON.stringify(adminsData));
                message.reply(`${targetUser.username} has been added as a nig, added to the db of shame :clown: :sob:`);

            }

        } catch (error) {
            console.error(error);
            message.reply('Something went wrong.');
        }
    }
}