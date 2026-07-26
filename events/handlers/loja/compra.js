// compra.js

const {
    ChannelType,
    PermissionFlagsBits,
    EmbedBuilder,
    ActionRowBuilder,
    StringSelectMenuBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");


module.exports = async (interaction, tipo = "itens") => {

    const guild = interaction.guild;
    const user = interaction.user;


    const existente = guild.channels.cache.find(channel =>
        channel.name === `🛒・carrinho-${user.username.toLowerCase()}`
    );


    if (existente) {

        return interaction.reply({
            content: `⚠️ Você já possui um carrinho aberto: ${existente}`,
            ephemeral: true
        });

    }


    let categoriaCarrinho;


    if (guild.id === "1522344152287805590") {
        categoriaCarrinho = "1522348328313032865";
    }


    if (guild.id === "1472328411421606093") {
        categoriaCarrinho = "1482784233692069929";
    }



    const canal = await guild.channels.create({

        name: `🛒・carrinho-${user.username.toLowerCase()}`,

        type: ChannelType.GuildText,

        parent: categoriaCarrinho,


        permissionOverwrites: [

            {
                id: guild.roles.everyone.id,

                deny: [
                    PermissionFlagsBits.ViewChannel
                ]

            },


            {
                id: user.id,

                allow: [
                    PermissionFlagsBits.ViewChannel,
                    PermissionFlagsBits.ReadMessageHistory
                ],

                deny: [
                    PermissionFlagsBits.SendMessages
                ]

            },


            {
                id: user.client.user.id,

                allow: [
                    PermissionFlagsBits.ViewChannel,
                    PermissionFlagsBits.SendMessages,
                    PermissionFlagsBits.ReadMessageHistory
                ]

            }

        ]

    });



    let descricaoCarrinho;


    if (tipo === "servicos") {


        descricaoCarrinho = `

# 🛠️﹒CARRINHO DE SERVIÇO


> 🌸 Bem-vindo ao seu carrinho!


━━━━━━━━━━━━━━━━━━━━


> 📝 Informe qual serviço deseja solicitar e explique como deseja que seja feito.


> ✨ Este atendimento é mais complexo, então um responsável irá realizar seu atendimento.


━━━━━━━━━━━━━━━━━━━━


> ♡ Aguarde um responsável.

`;



    } else if (tipo === "encomenda") {



        descricaoCarrinho = `

# 📦﹒CARRINHO DE ENCOMENDA


> 🌸 Bem-vindo ao seu carrinho!


━━━━━━━━━━━━━━━━━━━━


> 📝 Informe qual item deseja encomendar.


> Nossa equipe irá verificar disponibilidade e valores.


━━━━━━━━━━━━━━━━━━━━


> ♡ Aguarde um responsável.

`;



    } else {


        descricaoCarrinho = `

# 🛒﹒BEM VINDO AO SEU CARRINHO!


> 🌸 Você está a um passo de garantir seu item.


Selecione a categoria desejada abaixo.


> 🛒 Processo simples e fácil
> ✅ Entrega ágil e confiável

`;

    }



    const embed = new EmbedBuilder()

        .setColor("#FFD1DC")

        .setDescription(descricaoCarrinho)

        .setImage(
            "https://images-ext-1.discordapp.net/external/v605jaiksmzfn25i2gB6Sbql3uNt4snFVTGBV5Cab0w/https/files.catbox.moe/1b7s6v.jpg?format=webp"
        );



    let components = [];



    if (tipo === "itens") {


        const menuCategoria = new StringSelectMenuBuilder()

            .setCustomId("selecionar_categoria")

            .setPlaceholder("Selecione uma categoria")

            .addOptions([

                {
                    label: "MM2",
                    description: "Itens do Murder Mystery 2",
                    value: "categoria_mm2",
                },

                {
                    label: "FTF",
                    description: "Itens do Flee The Facility",
                    value: "categoria_ftf",
                }

            ]);



        components.push(

            new ActionRowBuilder()
                .addComponents(menuCategoria)

        );
        components.push(

    new ActionRowBuilder()

        .addComponents(

            new ButtonBuilder()

                .setCustomId("fechar_carrinho")

                .setLabel("Fechar Carrinho")

                .setEmoji("🛑")

                .setStyle(ButtonStyle.Danger)

        )

);
    }



    await canal.send({

        content: `<@${user.id}>`,

        embeds: [embed],

        components

    });



    return interaction.reply({

        content: `✅ Carrinho criado: ${canal}`,

        ephemeral: true

    });


};