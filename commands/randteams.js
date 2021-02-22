module.exports = {
    name: 'randteams',
    description: "Moves People into random Teams",
    execute(message, Discord, client){
        const channels = message.guild.channels.cache.filter(c => c.parentID === '813390931801538570' && c.type === 'voice');

        let playercount = 0;
        let team1 = 0;
        let team2 = 0;

        for (const [channelID, channel] of channels) {
            for (const [memberID, member] of channel.members) {
                playercount++;
            }
        }

        let team1max = Math.floor(playercount/2) + (playercount%2);
        let team2max = Math.floor(playercount/2);
        let flip = 0;

        for (const [channelID, channel] of channels) {
            for (const [memberID, member] of channel.members) {
                flip = Math.round(Math.random(2)+1);
                console.log(flip);

                if ((flip === 1)&&(team1 < team1max)){
                    member.voice.setChannel('813365504843448361') //team1 channel
                        .then(() => console.log(`Moved ${member.user.tag}.`))
                        .catch(console.error);
                    team1++;
                    console.log('moved t1');
                }
                else if (flip === 1){
                    member.voice.setChannel('813365687497392149') //team2 channel
                        .then(() => console.log(`Moved ${member.user.tag}.`))
                        .catch(console.error);
                    team2++;
                    console.log('moved t2 e');
                }
                else if ((flip === 2)&&(team2 < team2max)){
                    member.voice.setChannel('813365687497392149') //team2 channel
                        .then(() => console.log(`Moved ${member.user.tag}.`))
                        .catch(console.error);
                    team2++;
                    console.log('moved t2');
                }
                else if (flip === 2){
                    member.voice.setChannel('813365504843448361') //team1 channel
                        .then(() => console.log(`Moved ${member.user.tag}.`))
                        .catch(console.error);
                    team1++;
                    console.log('moved t1 e');
                }
            }
        }
    }
}