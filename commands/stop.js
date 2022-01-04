module.exports = {
    name: 'stop',
    description: "stop song",
    execute(message, args, distube) {
        const queue = distube.getQueue(message)
        if (!message.member.voice.channel) return message.channel.send('You are not in voice channel')
        if (!queue) return message.channel.send(`There is nothing in the queue right now!`)
        queue.stop();
        message.channel.send(`Stopped!`)
    }
}