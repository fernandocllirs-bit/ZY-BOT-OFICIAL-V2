const { EmbedBuilder } = require("discord.js");

function buildEmbed(data) {

    const embed = new EmbedBuilder();

    embed.setColor(data.color || "#FFD1DC");

    if (data.title)
        embed.setTitle(data.title);

    if (data.description)
        embed.setDescription(data.description);

    if (data.image)
        embed.setImage(data.image);

    if (data.footer)
        embed.setFooter({
            text: data.footer
        });

    return embed;

}

module.exports = buildEmbed;