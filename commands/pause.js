module.exports = {
    name: 'pause',
    description: "pause song",
    execute(message, args, distube) {
        if (!message.member.voice.channel) return message.channel.send('You are not in voice channel');
        const queue = distube.getQueue(message);
        if (!queue) return message.channel.send('There is nothing in the queue right now!');
        if (queue.paused) {
            queue.resume();
            return message.channel.send("Resumed the song for you :)");
        }
        queue.pause();
        message.channel.send("Paused the song for you :)");
    }
}