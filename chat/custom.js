const Custom = require('../models/custom');
const ytdl = require('ytdl-core');

const custom = async (message, command) => {
    const data = await Custom.find({});
    let cmd = data.find(cc => cc.command === command);

    if(typeof cmd !== 'undefined'){
        if(cmd.type === 'text'){
            message.channel.send(cmd.response)
        } else if(cmd.type === 'voice'){
            const voice = await message.member.voice.channel;
            const connection = await voice.join();
            const dispatcher = connection.play(cmd.response.includes('youtube') ? ytdl(cmd.response, { filter: 'audioonly'}) : cmd.response);

            dispatcher.on('finish', () => {
                voice.leave();
            })
            dispatcher.on('error', err => console.log(err))
        }
    }

    // //message.content.starts 
    // // let result = data.find(msg => msg.userID === String(message.author.id))
    // console.log(data);
    // console.log(message);
}

module.exports = custom;