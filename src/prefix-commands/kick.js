const { EmbedBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
    name: 'kick',
    description: 'Kick a user',
    async execute(client, message, args) {
        
        if (!message.member.permissions.has(PermissionsBitField.Flags.KickMembers)) return message.reply('You do not have permission to use this command!');
        const target = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.guild.cache.members.find(x => x.user.username.toLowerCase() === args.slice(0).join(' ' || x.user.username === args[0]));
        if (!target) return message.reply('Please mention a user!');
        if (message.member === target) {
            return message.reply('You cannot kick yourself!');
        } 

        if (!message.guild.members.cache.get(target.id).kickable) {
            return message.reply('You cannot kick this user!');
        }

        const reason = args.slice(1).join(' ') || 'No reason provided.';

        const embed = new EmbedBuilder()
            .setTitle('User Kicked')
            .setDescription(`**Kicked User:** ${target}\n**Kicked By:** ${message.author}\n**Reason:** ${reason}`)

        await message.guild.members.cache.get(target.id).kick().catch(error => {
            return message.reply({ content: 'There was an error while trying to kick the user' });
        });
        await message.channel.send({ embeds: [embed] });
    }
}