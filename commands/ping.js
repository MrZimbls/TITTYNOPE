module.exports = {
    name: 'ping',
    description: "not what you expect!",
    execute(message, args){
        message.channel.send('pong!');
    }
}