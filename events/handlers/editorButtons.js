const {
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
    ActionRowBuilder
} = require("discord.js");


module.exports = (data = {}) => {


    const modal = new ModalBuilder()

        .setCustomId("editor_embed_modal")

        .setTitle("Criar Embed");


    const titulo = new TextInputBuilder()

        .setCustomId("titulo")

        .setLabel("Título")

        .setStyle(TextInputStyle.Short)

        .setRequired(false)

        .setValue(data.title || "");



    const descricao = new TextInputBuilder()

        .setCustomId("descricao")

        .setLabel("Descrição")

        .setStyle(TextInputStyle.Paragraph)

        .setRequired(false)

        .setValue(data.description || "");



    const cor = new TextInputBuilder()

        .setCustomId("cor")

        .setLabel("Cor HEX")

        .setPlaceholder("#FFD1DC")

        .setStyle(TextInputStyle.Short)

        .setRequired(false)

        .setValue(data.color || "");



    const imagem = new TextInputBuilder()

        .setCustomId("imagem")

        .setLabel("URL da imagem")

        .setStyle(TextInputStyle.Short)

        .setRequired(false)

        .setValue(data.image || "");



    modal.addComponents(

        new ActionRowBuilder()
            .addComponents(titulo),

        new ActionRowBuilder()
            .addComponents(descricao),

        new ActionRowBuilder()
            .addComponents(cor),

        new ActionRowBuilder()
            .addComponents(imagem)

    );


    return modal;

};