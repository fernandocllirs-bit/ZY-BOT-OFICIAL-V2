const {
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");


function mostrarCategorias(interaction, jogo) {


    let categorias = [];


    if (jogo === "MM2") {

        categorias = [
            "Godlys",
            "Sets",
            "Ancients",
            "Vintages"
        ];

    }


    if (jogo === "FTF") {

        categorias = [
            "Armas",
            "Skins",
            "Outros"
        ];

    }


    const buttons = new ActionRowBuilder();


    categorias.forEach(tipo => {

        buttons.addComponents(

            new ButtonBuilder()

                .setCustomId(
                    `categoria_${jogo}_${tipo}`
                )

                .setLabel(tipo)

                .setStyle(ButtonStyle.Secondary)

        );

    });


    const embed = new EmbedBuilder()

        .setColor("#FFD1DC")

        .setDescription(`

# ﹒${jogo}


> 🌸 Selecione o tipo de item que deseja comprar.

        `);


    return interaction.editReply({

        embeds: [embed],

        components: [buttons]

    });

}


module.exports = mostrarCategorias;