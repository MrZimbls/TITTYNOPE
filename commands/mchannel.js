module.exports = {
    name: 'mchannel',
    description: "Creates a channel with the imput name",
    async execute(message, Discord, client, args){

        let name = '├🤩┤' + args[0];
        let newchannel = await message.guild.channels.create(name, {type: 'voice'});

        newchannel.setParent('813702340950884382');

        message.member.voice.setChannel(newchannel.id)
            .then(() => console.log(`Moved ${message.author.tag}.`))
            .catch(console.error);
    }
}