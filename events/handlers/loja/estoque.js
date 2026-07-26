const {
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    StringSelectMenuBuilder
} = require("discord.js");

const produtos = require("../../../data/produtos.json");


const BANNER_LOJA = "https://images-ext-1.discordapp.net/external/v605jaiksmzfn25i2gB6Sbql3uNt4snFVTGBV5Cab0w/https/files.catbox.moe/1b7s6v.jpg?format=webp";


function formatarPreco(valor) {
    return valor.toFixed(2).replace(".", ",");
}



module.exports = async (interaction, jogo, tipo) => {


    // ==========================
    // MOSTRAR CATEGORIAS
    // ==========================

    if (!tipo) {


        const categorias = produtos

            .filter(item =>
                item.categoria === jogo &&
                item.ativo === true
            )

            .map(item => item.tipo);



        const categoriasUnicas = [
            ...new Set(categorias)
        ];


        if (!categoriasUnicas.length) {

    return interaction.editReply({

    content: "❌ Nenhuma categoria encontrada.",

    embeds: [],

    components: []

});

        }




        const embed = new EmbedBuilder()

            .setColor("#FFD1DC")

            .setDescription(`

# 🎮﹒${jogo}


> 🌸 Selecione uma categoria abaixo.

            `)

            .setImage(BANNER_LOJA);





        const menu = new StringSelectMenuBuilder()

            .setCustomId(
                `selecionar_estoque_${jogo}`
            )

            .setPlaceholder(
                "Selecione uma categoria"
            )

            .addOptions(

                categoriasUnicas.map(categoria => ({

                    label: categoria,

                    value: categoria

                }))

            );





        const row = new ActionRowBuilder()

            .addComponents(menu);





        return interaction.editReply({

            embeds: [embed],

            components: [row]

        });



    }




    // ==========================
    // MOSTRAR ITENS
    // ==========================


    const itens = produtos.filter(item =>

        item.categoria === jogo &&

        item.tipo === tipo &&

        item.ativo === true

    );

    if (!itens.length) {

    return interaction.editReply({

    content: "❌ Nenhum item disponível nessa categoria.",

    embeds: [],

    components: []

});

}
    let lista = "";

    itens.forEach(item => {

        const quantidade = item.quantidade > 1

            ? ` ×${item.quantidade}`

            : "";

        lista +=

`﹒${item.nome}${quantidade} ﹒ **R$ ${formatarPreco(item.preco)}**

`;

    });





    const embed = new EmbedBuilder()

        .setColor("#FFD1DC")

        .setDescription(`

# 🎮﹒${jogo}


## ${tipo}


${lista}


━━━━━━━━━━━━━━━━━━━━


📦 Itens disponíveis: ${itens.length}

        `)

        .setImage(BANNER_LOJA);






    const row = new ActionRowBuilder()

        .addComponents(

            new ButtonBuilder()

                .setCustomId(
                    `voltar_estoque_${jogo}`
                )

                .setLabel("Voltar")

                .setEmoji("◀️")

                .setStyle(ButtonStyle.Secondary)

        );





    return interaction.editReply({

        embeds:[embed],

        components:[row]

    });


};