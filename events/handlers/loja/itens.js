const {
    EmbedBuilder,
    ActionRowBuilder,
    StringSelectMenuBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");

const produtos = require("../../../data/produtos.json");


async function mostrarItens(interaction, categoria) {


    let jogo;


    // Descobre o jogo automaticamente pelo estoque

    const exemplo = produtos.find(item =>
        item.tipo.toLowerCase() === categoria.toLowerCase() &&
        item.ativo === true
    );


    if (exemplo) {

        jogo = exemplo.categoria;

    }



    const itens = produtos.filter(item =>

        item.tipo.toLowerCase() === categoria.toLowerCase() &&

        item.ativo === true

    );



    if (!itens.length) {

        return interaction.reply({

            content:"❌ Nenhum item encontrado.",

            ephemeral:true

        });

    }



    const menu = new StringSelectMenuBuilder()

        .setCustomId("selecionar_item")

        .setPlaceholder("▼ Selecionar item")

        .addOptions(

            itens.map(item => ({

                label:item.nome,

                description:
                `R$ ${item.preco.toFixed(2).replace(".", ",")}`,

                value:`item_${item.id}`

            }))

        );



    const rowMenu = new ActionRowBuilder()

        .addComponents(menu);



    const voltar = new ActionRowBuilder()

        .addComponents(

            new ButtonBuilder()

                .setCustomId("voltar_categoria")

                .setLabel("⬅️ Voltar")

                .setStyle(ButtonStyle.Secondary)

        );




    const embed = new EmbedBuilder()

        .setColor("#FFD1DC")

        .setDescription(`

# 🎮﹒${categoria}


> 🌸 Selecione o item desejado.


━━━━━━━━━━━━━━━━━━━━


Itens disponíveis: **${itens.length}**

        `);



    return interaction.update({

        embeds:[embed],

        components:[

            rowMenu,

            voltar

        ]

    });


}


module.exports = mostrarItens;