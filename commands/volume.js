module.exports = {
    name: 'volume',
    description: "change volume",
    execute(message, args, distube) {
        const queue = distube.getQueue(message)
        if (!queue) return message.channel.send(`There is nothing in the queue right now!`)
        const volume = parseInt(args[0])
        if (isNaN(volume)) return message.channel.send(`Please enter a valid number!`)
        queue.setVolume(volume)
        message.channel.send(`Volume set to \`${volume}\``)
    }
}