module.exports = {
    name: 'play',
    description: "play song",
    execute(message, args, distube) {
        if (!message.member.voice.channel) return message.channel.send('You are not in voice channel');
        if (!args[0]) return message.channel.send('You must state something to play');
        distube.play(message, args.join(' '));
    }
}