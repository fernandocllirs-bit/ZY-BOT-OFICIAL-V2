const {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    EmbedBuilder
} = require("discord.js");

module.exports = {

    name: "enviar",

    async execute(message) {

        // Apaga o comando
        await message.delete().catch(() => {});

        const embed = new EmbedBuilder()
            .setColor("#FF8FCF")
            .setTitle("📨 Editor de Mensagens")
            .setDescription(
`Escolha o tipo de mensagem que deseja criar.

Clique em um dos botões abaixo.`
            );

        const row = new ActionRowBuilder().addComponents(

            new ButtonBuilder()
                .setCustomId("editor_mensagem")
                .setLabel("Mensagem")
                .setEmoji("✉️")
                .setStyle(ButtonStyle.Primary),

            new ButtonBuilder()
                .setCustomId("editor_embed")
                .setLabel("Embed")
                .setEmoji("🎨")
                .setStyle(ButtonStyle.Secondary),

            new ButtonBuilder()
                .setCustomId("editor_cancelar")
                .setLabel("Cancelar")
                .setEmoji("❌")
                .setStyle(ButtonStyle.Danger)

        );

        await message.channel.send({
            embeds: [embed],
            components: [row]
        });

    }

};