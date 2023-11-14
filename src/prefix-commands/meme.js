const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: 'meme',
    description: 'Sends a meme',
    async execute(client, message, args) {
        
        async function meme() {
            const fetchModule = await import('node-fetch'); // Dynamic import
            const fetch = fetchModule.default;

            await fetch(`https://www.reddit.com/r/comedyheaven/random/.json`)
            .then(async r => {

                const data = await r.json();

                let title = data[0].data.children[0].data.title;
                let image = data[0].data.children[0].data.url;
                let author = data[0].data.children[0].data.author;

                const embed = new EmbedBuilder()
                    .setTitle(`${title}`)
                    .setImage(`${image}`)
                    .setURL(`${image}`)
                    .setAuthor({ name: author });

                await message.reply({
                    embeds: [embed]
                });
            });
        }

        meme();
    }
}