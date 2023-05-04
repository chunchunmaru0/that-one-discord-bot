const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require("discord.js")

const { prefix } = require('../../config.json');
const fs = require("fs");



module.exports = {

    name: "help",
    aliases: ["h", "halp", "commands"],
    usage: "!usage",
    category: "utility",
    description: "This is Help Description",
    accessableby: "Members",

    run: async (client, message, args) => {
        // const embed = new Discord.RichEmbed()
        //     .setColor("#0099ff")
        //     .setAuthor(`${message.guild.me.displayName} Help`, message.guild.iconURL)
        //     .setThumbnail(client.user.displayAvatarURL)

        // if(!args[0]) {
        //     const categories = fs.readdirSync("./commands/")

        //     embed.setDescription(`These are the avaliable commands for ${message.guild.me.displayName}\nThe bot prefix is: **${prefix}**`)
        //     embed.setFooter(`© ${message.guild.me.displayName} | Total Commands: ${client.commands.size}`, client.user.displayAvatarURL);

        //     categories.forEach(category => {
        //         const dir = client.commands.filter(c => c.config.category === category)
        //         const capitalise = category.slice(0, 1).toUpperCase() + category.slice(1)
        //         try {
        //             embed.addField(`❯ ${capitalise} [${dir.size}]:`, dir.map(c => `\`${c.config.name}\``).join(" "))
        //         } catch(e) {
        //             console.log(e)
        //         }
        //     })

        //     return message.channel.send(embed)
        // } else {
        //     let command = client.commands.get(client.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase())
        //     if(!command) return message.channel.send(embed.setTitle("Invalid Command.").setDescription(`Do \`${prefix}help\` for the list of the commands.`))
        //     command = command.config

        //     embed.setDescription(stripIndents`The bot's prefix is: \`${prefix}\`\n
        //     **Command:** ${command.name.slice(0, 1).toUpperCase() + command.name.slice(1)}
        //     **Description:** ${command.description || "No Description provided."}
        //     **Usage:** ${command.usage ? `\`${prefix}${command.name} ${command.usage}\`` : "No Usage"}
        //     **Accessible by:** ${command.accessableby || "Members"}
        //     **Aliases:** ${command.aliases ? command.aliases.join(", ") : "None."}`)

        //     return message.channel.send(embed)
        // }

        message.channel.send({ embeds: [sendEmbed(message, client, args)] });

    }
}

function sendEmbed(msgOrInter, client, args) {
    let guild = msgOrInter.guild;
    
    //console.log(guild.rulesChannel.name)
    const exampleEmbed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle("Server Name")
        .setThumbnail(client.user.avatarURL())
        .setAuthor({ name: `${client.user.username} Help!`, iconURL: client.user.avatarURL() })
        exampleEmbed.setFooter({
            text: `© ${client.user.username} | Total Commands: ${client.commands.size}`, iconURL: client.user.avatarURL()
        });


    if (msgOrInter.mentions.has(client.user.id) || !args[0]) { //not completed dont work with mentions
        const categories = fs.readdirSync("./commands/")
        //console.log(categories)
        exampleEmbed.setDescription(`These are the avaliable commands for ${client.user.username}\nThe bot prefix is: **${prefix}**`)

        categories.forEach(category => {
            //console.log(category)
            const dir = client.commands.filter(c => c.category === category)
            //console.log(dir)
            const capitalise = category.slice(0, 1).toUpperCase() + category.slice(1)
            try {
                exampleEmbed.addFields({
                    name: `❯ ${capitalise} [${dir.size}]:`, value: dir.map(c => `\`${c.name}\``).join(" ")
                })
            } catch (e) {
                console.log(e)
            }

        })
        return exampleEmbed;
    } else {
        let command = client.commands.get(client.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase())
        console.log(command)
        if (!command) return message.channel.send(embed.setTitle("Invalid Command.").setDescription(`Do \`${prefix}help\` for the list of the commands.`))


        exampleEmbed.setDescription(`The bot's prefix is: \`${prefix}\`\n
              **Command:** ${command.name.slice(0, 1).toUpperCase() + command.name.slice(1)}
             **Description:** ${command.description || "No Description provided."}
              **Usage:** ${command.usage ? `${prefix}${command.name} ${command.usage}` : "No Usage"}
              **Accessible by:** ${command.accessableby || "Members"}
             **Aliases:** ${command.aliases ? command.aliases.join(", ") : "None."}`)

        return exampleEmbed;
    }



}