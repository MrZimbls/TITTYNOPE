module.exports = {
    name: 'moveback',
    description: "Moves users back to Waiting room",
    execute(message, Discord, client){
        const channels = message.guild.channels.cache.filter(c => c.parentID === '813390931801538570' && c.type === 'voice');

        for (const [channelID, channel] of channels) {
            for (const [memberID, member] of channel.members) {
                member.voice.setChannel('813365343212535818')
                    .then(() => console.log(`Moved ${member.user.tag}.`))
                    .catch(console.error);
            }
        }
    }
}