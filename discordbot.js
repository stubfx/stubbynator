import Discord from "discord.js";
import axios from "axios";

const client = new Discord.Client({partials: ['MESSAGE', 'CHANNEL', 'REACTION']});
let amIReady = false;
const twitchTextChannelId = "900833263491354634" // mc-whitelist channel


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    amIReady = true
    client.channels.fetch(twitchTextChannelId)
        .then(channel => {

        })
        .catch(console.error);
});

client.on('guildMemberUpdate', (old_user, new_user) => {
    console.log(new_user)
    // axios.get(`https://discordapp.com/api/users/@me/connections`, {
    //     headers:{
    //         "Authorization" : "Bot " + process.env.discord_token
    //     }
    // })
    //     .then((res) => {
    //         console.log(res.data)
    //     }).catch((err) => {
    //     console.error(err)
    // });
});

export function sendTwitchMessage(target, username, message) {
    // if (target !== '#stubfx') return;
    // if (amIReady) {
    //     client.channels.fetch(twitchTextChannelId)
    //         .then(channel => {
    //             if (!(channel instanceof Discord.TextChannel)) return;
    //             // channel is type of TextChannel
    //             channel.send(username + " : " + message);
    //         })
    //         .catch(console.error);
    // }
}

client.login(process.env.discord_token).then();