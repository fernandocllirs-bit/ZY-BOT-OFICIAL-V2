const {
    EmbedBuilder,
    ActionRowBuilder,
    StringSelectMenuBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");


function mostrarCategorias(interaction, jogo) {


    let categorias = [];


    if (jogo === "MM2") {

        categorias = [
            "Godlys",
            "Guns",
            "Chromas",
            "Sets"
        ];

    }


    if (jogo === "FTF") {

        categorias = [
            "Legendarys"
        ];

    }



    const menu = new StringSelectMenuBuilder()

        .setCustomId(`selecionar_categoria_${jogo}`)

        .setPlaceholder("▼ Selecionar categoria")

        .addOptions(

            categorias.map(tipo => ({

                label: tipo,

                value: `categoria_${jogo}_${tipo}`

            }))

        );



    const rowMenu = new ActionRowBuilder()

        .addComponents(menu);



    const voltar = new ActionRowBuilder()

        .addComponents(

            new ButtonBuilder()

                .setCustomId("voltar_jogos")

                .setLabel("⬅️ Voltar")

                .setStyle(ButtonStyle.Secondary)

        );



    const embed = new EmbedBuilder()

        .setColor("#FFD1DC")

        .setDescription(`

# 🎮﹒${jogo}


> 🌸 Selecione a categoria do item que deseja comprar.

        `);



    return interaction.editReply({

        embeds:[embed],

        components:[

            rowMenu,

            voltar

        ]

    });


}


module.exports = mostrarCategorias;