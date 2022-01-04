module.exports = {
    name: 'repeat',
    description: "repeat",
    execute(message, args, distube) {
        if (!message.member.voice.channel) return message.channel.send('You are not in voice channel');
        const queue = distube.getQueue(message)
        if (!queue) return message.channel.send(`There is nothing playing!`)
        let mode = null
        switch (args[0]) {
            case "off":
                mode = 0
                break
            case "one":
                mode = 1
                break
            case "all":
                mode = 2
                break
            default:
                return message.channel.send('Use \`repeat [off | one | all]\` to change.')
        }
        mode = queue.setRepeatMode(mode)
        mode = mode ? (mode === 2 ? "Repeat all" : "Repeat one") : "Off"
        message.channel.send(`Set repeat mode to \`${mode}\``)
    }
}