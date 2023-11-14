const { EmbedBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
    name: 'mmuuttee',
    description: 'Mute a user',
    async execute(client, message, args) {
        let timeUser = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.guild.cache.members.find(x => x.user.username.toLowerCase() === args.slice(0).join(' ' || x.user.username === args[0]));
        let duration = args[1];

        if (!message.member.permissions.has(PermissionsBitField.Flags.BanMembers)) return message.reply('You do not have permission to use this command!');
        if (!timeUser) return message.reply('Please mention a user!');
        if (message.member === timeUser) return message.reply('You cannot mute yourself!');
        if (!duration) duration = '1h';
        if (!timeUser.kickable) return message.reply('You cannot mute this user!');
        if (duration > 604800) return message.reply('You cannot mute this user for more than 7 days!');

        if (!isNaN(duration)) {

            return message.channel.send('the passed duration is not any number!')
        }

        let reason = args.slice(2).join(' ') || 'No reason provided.';

        const embed = new EmbedBuilder()
            .setTitle('User Muted')
            .setDescription(`**Muted User:** ${timeUser}\n**Muted By:** ${message.author}\n**Reason:** ${reason}`)


        await message.guild.members.cache.get(timeUser.id).timeout(duration).catch(error => {
            return message.reply({ content: 'There was an error while trying to mute the user' });
        })

        message.channel.send({ embeds: [embed] });
    }
}