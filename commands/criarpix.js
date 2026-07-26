const {
    SlashCommandBuilder,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
    ActionRowBuilder
} = require("discord.js");


module.exports = {

    data: new SlashCommandBuilder()
        .setName("criarpix")
        .setDescription("Cria um pedido PIX"),


    async execute(interaction) {


        const modal = new ModalBuilder()
            .setCustomId("pix_form")
            .setTitle("Criar Pedido PIX");


        const cliente = new TextInputBuilder()
            .setCustomId("cliente")
            .setLabel("Nome do cliente")
            .setStyle(TextInputStyle.Short)
            .setPlaceholder("Ex: Fernando")
            .setRequired(true);


        const produto = new TextInputBuilder()
            .setCustomId("produto")
            .setLabel("Produto desejado")
            .setStyle(TextInputStyle.Short)
            .setPlaceholder("Ex: 1X Icewing")
            .setRequired(true);


        const valor = new TextInputBuilder()
            .setCustomId("valor")
            .setLabel("Valor do pedido")
            .setStyle(TextInputStyle.Short)
            .setPlaceholder("Ex: 25,00")
            .setRequired(true);



        modal.addComponents(

            new ActionRowBuilder()
                .addComponents(cliente),

            new ActionRowBuilder()
                .addComponents(produto),

            new ActionRowBuilder()
                .addComponents(valor)

        );


        await interaction.showModal(modal);

    }

};