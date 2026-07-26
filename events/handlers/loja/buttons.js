const { 
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    StringSelectMenuBuilder
} = require("discord.js");

const mostrarEstoque = require("./estoque");
const criarCarrinho = require("./compra");
const produtos = require("../../../data/produtos.json");

async function mostrarItensCarrinho(interaction, categoria, pagina = 0) {

    const itens = produtos.filter(item =>
        item.categoria === categoria &&
        item.ativo === true
    );


    if (!itens.length) {

        return interaction.reply({
            content: "❌ Nenhum item disponível.",
            ephemeral: true
        });

    }


    const limite = 4;

    const totalPaginas = Math.ceil(itens.length / limite);


    const inicio = pagina * limite;


    const itensPagina = itens.slice(
        inicio,
        inicio + limite
    );


    const componentes = [];


    // Botões dos itens (1 por linha)

itensPagina.forEach(item => {

    componentes.push(

        new ActionRowBuilder()

            .addComponents(

                new ButtonBuilder()

                    .setCustomId(`item_${item.nome}`)

                    .setLabel(item.nome)

                    .setStyle(ButtonStyle.Secondary)

            )

    );

});

    // Botões de página

    const paginaRow = new ActionRowBuilder();



    if (pagina > 0) {

        paginaRow.addComponents(

            new ButtonBuilder()

                .setCustomId(
                    `pagina_anterior_${categoria}_${pagina}`
                )

                .setLabel("⬅️ Voltar")

                .setStyle(ButtonStyle.Secondary)

        );

    }



    if (pagina < totalPaginas - 1) {

        paginaRow.addComponents(

            new ButtonBuilder()

                .setCustomId(
                    `pagina_proxima_${categoria}_${pagina}`
                )

                .setLabel("Próxima ➡️")

                .setStyle(ButtonStyle.Secondary)

        );

    }


    componentes.push(paginaRow);



    const embed = new EmbedBuilder()

        .setColor("#FFD1DC")

        .setDescription(`

# 🎮﹒${categoria}


> 🌸 Escolha um item disponível:


${itensPagina.map(item =>

`**${item.nome}** — R$ ${item.preco.toFixed(2).replace(".", ",")}`

).join("\n")}


━━━━━━━━━━━━━━━━━━━━


Página ${pagina + 1}/${totalPaginas}

        `);



    return interaction.update({

        embeds: [embed],

        components: componentes

    });


}
module.exports = async (interaction) => {

    console.log("INTERAÇÃO:", interaction.customId);

    if (!interaction.isButton() && !interaction.isStringSelectMenu()) return;


    // FECHAR CARRINHO
    if (interaction.customId === "fechar_carrinho") {

        await interaction.reply({
            content: "🛑 Fechando carrinho...",
            ephemeral: true
        });


        setTimeout(() => {

            interaction.channel.delete()
                .catch(() => {});

        }, 1500);


        return;

    }


    console.log("PASSOU FILTRO");

    console.log("INTERAÇÃO:", interaction.customId);

    if (!interaction.isButton() && !interaction.isStringSelectMenu()) return;

    console.log("PASSOU FILTRO");

    if (interaction.isStringSelectMenu()) {

        console.log("ANTES DO DEFER");

        await interaction.deferUpdate();

        console.log("DEFER FEITO");

    if (interaction.customId === "selecionar_jogo") {

        const jogo = interaction.values[0];

        return mostrarEstoque(
            interaction,
            jogo
        );

    }

  if (interaction.customId === "selecionar_categoria") {



    const categoria = interaction.values[0];





    if (categoria === "categoria_mm2") {





        const embed = new EmbedBuilder()



            .setColor("#FFD1DC")



            .setDescription(`



# ﹒MM2 





> 🌸 Escolha o tipo de item que deseja comprar.





━━━━━━━━━━━━━━━━━━━━





Selecione uma categoria abaixo:



            `);





        const rowTipos = new ActionRowBuilder()



            .addComponents(



                new ButtonBuilder()



                    .setCustomId("tipo_mm2_godlys")



                    .setLabel("Godlys")



                    .setStyle(ButtonStyle.Secondary),





                new ButtonBuilder()



                    .setCustomId("tipo_mm2_sets")



                    .setLabel("Sets")



                    .setStyle(ButtonStyle.Secondary)



            );





        const rowAcoes = new ActionRowBuilder()



            .addComponents(



                new ButtonBuilder()



                    .setCustomId("voltar_categoria")



                    .setLabel("⬅️ Voltar")



                    .setStyle(ButtonStyle.Secondary),





                new ButtonBuilder()



                    .setCustomId("fechar_carrinho")



                    .setLabel("Fechar Carrinho")



                    .setStyle(ButtonStyle.Danger)



            );





        return interaction.editReply({



            embeds: [embed],



            components: [

                rowTipos,

                rowAcoes

            ]



        });



    }





    if (categoria === "categoria_ftf") {



        const embed = new EmbedBuilder()



            .setColor("#FFD1DC")



            .setDescription(`



# ﹒FTF 





> 🌸 Escolha o tipo de item que deseja comprar.





━━━━━━━━━━━━━━━━━━━━





Selecione uma categoria abaixo:



            `);





        const row = new ActionRowBuilder()



            .addComponents(



                new ButtonBuilder()



                    .setCustomId("tipo_ftf")



                    .setLabel("Itens FTF")



                    .setStyle(ButtonStyle.Secondary)



            );





        const rowAcoes = new ActionRowBuilder()



            .addComponents(



                new ButtonBuilder()



                    .setCustomId("voltar_categoria")



                    .setLabel("⬅️ Voltar")



                    .setStyle(ButtonStyle.Secondary),





                new ButtonBuilder()



                    .setCustomId("fechar_carrinho")



                    .setLabel("Fechar Carrinho")



                    .setStyle(ButtonStyle.Danger)



            );





        return interaction.editReply({



            embeds: [embed],



            components: [

                row,

                rowAcoes

            ]



        });



    }



} 

    if (interaction.customId.startsWith("selecionar_estoque_")) {

        const jogo = interaction.customId.split("_")[2];

        const tipo = interaction.values[0];

        return mostrarEstoque(
            interaction,
            jogo,
            tipo
        );

    }

}
    if (interaction.customId.startsWith("item_")) {

    const nomeItem = interaction.customId.replace("item_", "");

    const item = produtos.find(
        produto => produto.nome === nomeItem
    );


    if (!item) {

        return interaction.reply({
            content: "❌ Item não encontrado.",
            ephemeral: true
        });

    }


    const embed = new EmbedBuilder()

        .setColor("#FFD1DC")

        .setDescription(`

# 🛒﹒${item.nome}


🛒 **${item.nome} selecionado**


💰 Valor: R$ ${item.preco.toFixed(2).replace(".", ",")}


> Escolha a quantidade desejada.

        `);



    const row = new ActionRowBuilder()

        .addComponents(

            new ButtonBuilder()

                .setCustomId(`quantidade_menos_${item.nome}`)

                .setLabel("Diminuir quantidade")

                .setStyle(ButtonStyle.Secondary),


            new ButtonBuilder()

                .setCustomId(`quantidade_mais_${item.nome}`)

                .setLabel("Aumentar quantidade")

                .setStyle(ButtonStyle.Secondary),


            new ButtonBuilder()

                .setCustomId(`adicionar_${item.nome}`)

                .setLabel("Adicionar ao carrinho")

                .setStyle(ButtonStyle.Success)

        );


    return interaction.update({

        embeds:[embed],

        components:[row]

    });

}

if (interaction.customId.startsWith("pagina_proxima_")) {

    const dados = interaction.customId.split("_");

    const categoria = dados[2];

    const paginaAtual = Number(dados[3]);


    return mostrarItensCarrinho(
        interaction,
        categoria,
        paginaAtual + 1
    );

}


if (interaction.customId.startsWith("pagina_anterior_")) {

    const dados = interaction.customId.split("_");

    const categoria = dados[2];

    const paginaAtual = Number(dados[3]);


    return mostrarItensCarrinho(
        interaction,
        categoria,
        paginaAtual - 1
    );

}
if (interaction.customId.startsWith("voltar_estoque_")) {

    await interaction.deferUpdate();

    const jogo = interaction.customId.split("_")[2];

    return mostrarEstoque(
        interaction,
        jogo
    );

}
    switch (interaction.customId) {

        case "loja_comprar":

    const embedCarrinho = new EmbedBuilder()

        .setColor("#FFD1DC")

        .setDescription(`
# 🛒﹒TIPO DE CARRINHO


> 🌸 Selecione qual tipo de atendimento deseja abrir.


━━━━━━━━━━━━━━━━━━━━


> 🍡 Comprar itens disponíveis no estoque.

> 🛠️ Solicitar um serviço personalizado.

> 📦 Realizar uma encomenda de um item.


━━━━━━━━━━━━━━━━━━━━


> ♡ Nossa equipe irá auxiliar você durante todo o processo.
        `);



    const rowCarrinho = new ActionRowBuilder()

        .addComponents(

            new ButtonBuilder()

                .setCustomId("tipo_itens")

                .setLabel("Comprar Itens")

                .setEmoji("🍡")

                .setStyle(ButtonStyle.Secondary),


            new ButtonBuilder()

                .setCustomId("tipo_servicos")

                .setLabel("Serviços")

                .setEmoji("🛠️")

                .setStyle(ButtonStyle.Secondary),


            new ButtonBuilder()

                .setCustomId("tipo_encomenda")

                .setLabel("Encomendas")

                .setEmoji("📦")

                .setStyle(ButtonStyle.Secondary)

        );


    return interaction.reply({

        embeds: [embedCarrinho],

        components: [rowCarrinho],

        ephemeral: true

    });

case "tipo_itens":

    return criarCarrinho(interaction, "itens");


case "tipo_servicos":

    return criarCarrinho(interaction, "servicos");


case "tipo_encomenda":

    return criarCarrinho(interaction, "encomenda");

    case "servicos_loja":

    let mensagemServicos;


    if (interaction.guild.id === "1522344152287805590") {

        mensagemServicos = `

# 🛠️﹒SERVIÇOS DA LOJA


> 🌸 Encontre serviços personalizados feitos pela nossa equipe.


━━━━━━━━━━━━━━━━━━━━


> Design Gráfico, veja o valor em <#1522347841689882846>


> Sites Personalizados, veja o valor em <#1522348075849351342>


> Bots para Discord, veja o valor em <#1522426432465272996>


> Servidores de Discord, veja o valor em <#1522348939750281398>


> Para outros serviços abra um carrinho e explique que talvez iremos fazer se possível!


━━━━━━━━━━━━━━━━━━━━

`;

    }


    else if (interaction.guild.id === "1472328411421606093") {

        mensagemServicos = `

# 🛠️﹒SERVIÇOS DA LOJA
--
--
> 🌸 Encontre serviços personalizados que a loja faz.


━━━━━━━━━━━━━━━━━━━━


> Design Gráfico, veja o valor em <#1529329774001000448>


> Sites Personalizados, veja o valor em <#1522341441379106949>


> Bots para Discord, veja o valor em <#1529625913703268422>


> Servidores de Discord, veja o valor em <#1529954477816283218>


> Para outros serviços abra um carrinho e explique que talvez iremos fazer se possível!


━━━━━━━━━━━━━━━━━━━━

`;

    }


    return interaction.reply({

        embeds: [

            new EmbedBuilder()

                .setColor("#FFD1DC")

                .setDescription(mensagemServicos)

        ],

        ephemeral: true

    });

    case "encomendas_loja":

    return interaction.reply({

        embeds: [

            new EmbedBuilder()

                .setColor("#FFD1DC")

                .setDescription(`

# 📦﹒ENCOMENDAS


> 🌸 Algum item que deseja e não está disponível no estoque?


━━━━━━━━━━━━━━━━━━━━


> Peça uma encomenda tranquilamente.


> Para solicitar uma encomenda, clique em **Comprar** e selecione o tipo de carrinho.


━━━━━━━━━━━━━━━━━━━━


> ♡ Nossa equipe irá verificar disponibilidade e valores.

                `)

        ],

        ephemeral: true

    });

        case "loja_estoque":

const embed = new EmbedBuilder()

    .setColor("#FFD1DC")

    .setDescription(`
# 📦﹒VISUALIZAR ESTOQUE

> 🌸 Selecione uma categoria abaixo.
    `);


const row = new ActionRowBuilder()

.addComponents(

    new StringSelectMenuBuilder()

        .setCustomId("selecionar_jogo")

        .setPlaceholder("Selecione uma categoria")

        .addOptions(
            {
                label: "MM2",
                value: "MM2"
            },
            {
                label: "FTF",
                value: "FTF"
            }
        )

);

return interaction.reply({

    embeds: [embed],

    components: [row],

    ephemeral: true

});
case "estoque_mm2":

    return mostrarEstoque(
        interaction,
        "MM2"
    );


case "estoque_ftf":

    return mostrarEstoque(
        interaction,
        "FTF"
    );

case "carrinho_mm2":

    return mostrarItensCarrinho(interaction, "MM2");


case "carrinho_ftf":

    return mostrarItensCarrinho(interaction, "FTF");
    
case "voltar_estoque":

const embedVoltar = new EmbedBuilder()

    .setColor("#FFD1DC")

    .setDescription(`
# 📦﹒VISUALIZAR ESTOQUE

> 🌸 Selecione uma categoria abaixo.
    `);


const rowVoltar = new ActionRowBuilder()

.addComponents(

    new StringSelectMenuBuilder()

        .setCustomId("selecionar_jogo")

        .setPlaceholder("Selecione uma categoria")

        .addOptions(
            {
                label: "MM2",
                value: "MM2"
            },
            {
                label: "FTF",
                value: "FTF"
            }
        )

);


return interaction.update({

    embeds: [embedVoltar],

    components: [rowVoltar]

});
        case "loja_historico":

            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor("#FFD1DC")
                        .setDescription("📜 Histórico em desenvolvimento.")
                ],
                ephemeral: true
            });


        default:
            return;
    }

};