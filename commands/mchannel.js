module.exports = {
    name: 'mchannel',
    description: "Creates a channel with the imput name",
    execute(message, Discord, client, args){

        let name = '├🤩┤' + args[0];
        let newchannel = message.guild.channels.create(name, {type: 'voice'})
            .then((channel) => {
                channel.setParent('813702340950884382')
            }).then(() => {
                message.member.voice.setChannel(newchannel.id)
                    .then(() => console.log(`Moved ${message.author.tag}.`))
                    .catch(console.error);
            });
    }
}