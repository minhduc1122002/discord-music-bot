const Discord = require('discord.js');

const client = new Discord.Client();

const DisTube = require('distube');

const distube = new DisTube.default(client, {
    leaveOnStop: false,
    emitNewSongOnly: true
});

const prefix = 't!';

const fs = require('fs');

client.commands = new Discord.Collection();

const commadFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for (const file of commadFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('Tunes is online');
    client.user.setActivity('t! help')
});

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (command === 'play') {
        client.commands.get('play').execute(message, args, distube);
    } else if (command === 'pause') {
        client.commands.get('pause').execute(message, args, distube);
    } else if (command === 'queue') {
        client.commands.get('queue').execute(message, args, distube);
    } else if (command === 'repeat' || command === 'loop') {
        client.commands.get('repeat').execute(message, args, distube);
    } else if (command === 'volume') {
        client.commands.get('volume').execute(message, args, distube);
    } else if (command === 'stop') {
        client.commands.get('stop').execute(message, args, distube);
    } else if (command === 'help') {
        client.commands.get('help').execute(message, args, Discord, distube);
    }
});

const status = queue =>
    `Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.join(", ") || "Off"}\` | Loop: \`${
        queue.repeatMode ? (queue.repeatMode === 2 ? "All Queue" : "This Song") : "Off"
    }\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``

distube
    .on("playSong", (queue, song) => {
            const Embed = new Discord.MessageEmbed()
            .setColor('#304281')
            .setTitle('Now Playing')
            .setDescription(`[${song.name}](${song.url})\n\`${song.formattedDuration}\`\n\nRequested by: ${song.user}`)
            .setThumbnail(song.thumbnail);
            queue.textChannel.send(Embed);
        }
    )
    .on("addSong", (queue, song) => {
        const Embed = new Discord.MessageEmbed()
        .setColor('#304281')
        .setTitle('Queued')
        .setDescription(`[${song.name}](${song.url})\n\`${song.formattedDuration}\`\n\nIn Position: ${queue.songs.length}`)
        .setThumbnail(song.thumbnail);
        queue.textChannel.send(Embed);
        }
    )
    .on("addList", (queue, playlist) =>
        queue.textChannel.send(
            `Added \`${playlist.name}\` playlist (${
                playlist.songs.length
            } songs) to queue`
        )
    )
    .on("error", (queue, e) => {
        console.error(e)
    })
    .on("finish", queue => queue.textChannel.send("Finished!"));

client.login('OTI3NDg5ODU0MDc2NTAyMDI3.YdK-PQ.z6pvzApf-6meDwiYsP4NM4y_Yd8');