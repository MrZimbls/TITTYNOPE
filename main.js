const dotenv = require('dotenv');
dotenv.config();

const Discord = require('discord.js');
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });

const prefix = '.';

const fs = require('fs');


client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

//New Member role
client.on('guildMemberAdd', guildMember =>{
    let welcomeRole = guildMember.guild.roles.cache.find(role => role.name === 'welcome');

    guildMember.roles.add(welcomeRole);
    guildMember.guild.channels.cache.get('813115802819493890').send(`Welcome <@${guildMember.user.id}> to the dark Side!`)
});

client.once('ready', () => {
    console.log('Im online Bitches');
});

client.on('message', async message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'ping'){
        client.commands.get('ping').execute(message, args);
    }
    if(command === 'mchannel'){
        client.commands.get('mchannel').execute(message, Discord, client, args);
    }
    if(command === 'moveback'){
        if(message.member.roles.cache.some(r => r.name === "BotAcces")){
            console.log('admin comand executed!');
            client.commands.get('moveback').execute(message, Discord, client)
        }
        else {
            console.log('not correkt role');
            message.channel.send('Missing Privileges / Contact Zimbls or Izayoi!');
        }
    }
    if(command === 'randteams'){
        if(message.member.roles.cache.some(r => r.name === "BotAcces")){
            console.log('admin comand executed!');
            client.commands.get('randteams').execute(message, Discord, client)
        }
        else {
            console.log('not correkt role');
            message.channel.send('Missing Privileges / Contact Zimbls or Izayoi!');
        }
    }
    if(command === 'welcomemessage'){
        let embed = new Discord.MessageEmbed()
            .setTitle('Welcome to the Madness')
            .setDescription('Hi, nice you found the way to us. Please react to this Message to get started!')
            .setColor('PURPLE')
        let msgEmbed = await message.channel.send(embed)
            .then(function (msgEmbed) {
                msgEmbed.react("🤩")
            }).catch(function() {
            });
    }
});

client.on('messageReactionAdd', async (reaction, user) => {
    if (reaction.partial) {
        try {
            await reaction.fetch();
        } catch (error) {
            console.error('Something went wrong when fetching the message: ', error);
            return;
        }
    }
    if (user.bot) return;

    if (reaction.message.channel.id === "813352558072561715") {
        if (reaction.emoji.name === '🤩'){
            await reaction.message.guild.members.cache.get(user.id).roles.add('813312293969854464');
            await reaction.message.guild.members.cache.get(user.id).roles.remove('813320124924428299');
        }
    }
});

client.on('messageReactionRemove', async (reaction, user) => {
    if (reaction.partial) {
        try {
            await reaction.fetch();
        } catch (error) {
            console.error('Something went wrong when fetching the message: ', error);
            return;
        }
    }
    if (user.bot) return;

    if (reaction.message.channel.id === "813352558072561715") {
        if (reaction.emoji.name === '🤩'){
            await reaction.message.guild.members.cache.get(user.id).roles.remove('813312293969854464');
        }
    }
});

client.login(process.env.BOT_TOKEN);