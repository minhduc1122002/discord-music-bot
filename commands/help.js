module.exports = {
    name: 'help',
    description: "command list",
    execute(message, args, Discord, distube) {
        const Embed = new Discord.MessageEmbed()
        .setColor('#304281')
        .setTitle('Command List')
        .addFields(
            {name: 'Music', value: `\`play\` \`pause\` \`queue\`\n\`repeat\` \`stop\` \`volume\``}
        )
        .setThumbnail(distube.client.user.displayAvatarURL())
        message.channel.send(Embed);
    }
}