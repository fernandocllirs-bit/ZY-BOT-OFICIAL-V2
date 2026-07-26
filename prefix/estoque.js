const {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    EmbedBuilder
} = require("discord.js");

module.exports = {

    name: "estoque",

    async execute(message) {

        await message.delete().catch(() => {});

        const embed = new EmbedBuilder()

            .setColor("#FFD1DC")

            .setDescription(`

# 📦﹒ESTOQUE DA LOJA
--
--
> 🍡 **Painel oficial de estoque da loja.**


୨୧ Confira abaixo todos os itens disponíveis em nosso estoque.

━━━━━━━━━━━━━━━━━━━━

> ♡ Visualize todos os produtos disponíveis.

> ♡ Consulte os valores atualizados.

> ♡ O estoque é atualizado automaticamente.

━━━━━━━━━━━━━━━━━━━━

> ⚠️ **AVISO**

> Utilize o **ticket de compra** apenas para compras realizadas diretamente com nossos lojistas.

━━━━━━━━━━━━━━━━━━━━

> 🌸 Escolha uma das opções utilizando os botões abaixo.

`)

            .setImage("https://files.catbox.moe/1b7s6v.jpg");

       const row1 = new ActionRowBuilder()

    .addComponents(

        new ButtonBuilder()
            .setCustomId("loja_comprar")
            .setLabel("Comprar")
            .setEmoji("🛒")
            .setStyle(ButtonStyle.Secondary),


        new ButtonBuilder()
            .setCustomId("loja_estoque")
            .setLabel("Visualizar Estoque")
            .setEmoji("📦")
            .setStyle(ButtonStyle.Secondary),


        new ButtonBuilder()
            .setCustomId("servicos_loja")
            .setLabel("Serviços")
            .setEmoji("🛠️")
            .setStyle(ButtonStyle.Secondary)

    );


const row2 = new ActionRowBuilder()

    .addComponents(

        new ButtonBuilder()
            .setCustomId("loja_historico")
            .setLabel("Histórico de compras")
            .setEmoji("📜")
            .setStyle(ButtonStyle.Secondary),


        new ButtonBuilder()
            .setCustomId("encomendas_loja")
            .setLabel("Encomendas")
            .setEmoji("📦")
            .setStyle(ButtonStyle.Secondary)

    );
        await message.channel.send({

            embeds: [embed],

            components: [row1, row2],

        });

    }

};