const {
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");

const cache = require("../utils/editorCache");
const editorModal = require("../utils/editorModal");
const lojaButtons = require("./handlers/loja/buttons");


module.exports = (client) => {


    client.on("interactionCreate", async interaction => {


        if (interaction.isChatInputCommand()) {

            const command = client.commands.get(interaction.commandName);

            if (!command) return;

            await command.execute(interaction);

        }


        // =======================
        // BOTÕES DO EDITOR
        // =======================

        if (interaction.isButton() || interaction.isStringSelectMenu()) {

        // =======================
        // interação da loja
       // =======================

        await lojaButtons(interaction);

        // =======================
        // BOTÕES DO EDITOR
       // =======================


            if (interaction.customId === "editor_cancelar") {

                return interaction.update({

                    content: "❌ Editor cancelado.",

                    embeds: [],

                    components: []

                });

            }
            if (interaction.customId === "embed_enviar") {

    const data = cache.get(interaction.user.id);

    if (!data) {

        return interaction.reply({

            content: "❌ Nenhuma embed encontrada.",

            ephemeral: true

        });

    }

const embed = new EmbedBuilder()

    .setColor(data.color)

    .setTitle(data.title || null)

    .setDescription(data.description || null);

if (data.image) {

    embed.setImage(data.image);

}

    await interaction.channel.send({

        embeds: [embed]

    });

    cache.delete(interaction.user.id);

    return interaction.update({

        content: "✅ Embed enviada com sucesso!",

        embeds: [],

        components: []

    });

}

if (interaction.customId === "embed_limpar") {

    cache.delete(interaction.user.id);

    return interaction.update({

        content: "🗑️ Editor limpo com sucesso!",

        embeds: [],

        components: []

    });

}

if (interaction.customId === "embed_editar") {

    const data = cache.get(interaction.user.id);

    if (!data) {

        return interaction.reply({

            content: "❌ Nenhuma embed encontrada.",

            ephemeral: true

        });

    }

    cache.update(interaction.user.id, {

        ...data,

        editing: true

    });

    return interaction.showModal(

        editorModal(data)

    );

}            

if (interaction.customId === "editor_embed") {

    return interaction.showModal(

        editorModal()

    );

}

 if (interaction.customId === "editor_mensagem") {

    const {
        ModalBuilder,
        TextInputBuilder,
        TextInputStyle,
        ActionRowBuilder
    } = require("discord.js");


    const modal = new ModalBuilder()

        .setCustomId("modal_mensagem")

        .setTitle("Criar Mensagem");


    const texto = new TextInputBuilder()

        .setCustomId("texto")

        .setLabel("Mensagem")

        .setStyle(TextInputStyle.Paragraph)

        .setPlaceholder("Digite sua mensagem...")

        .setRequired(true);


    modal.addComponents(

        new ActionRowBuilder()

            .addComponents(texto)

    );


    return interaction.showModal(modal);

}
       }

       if (interaction.isModalSubmit()) {

if (interaction.customId === "modal_mensagem") {

    const texto = interaction.fields.getTextInputValue("texto");

    await interaction.channel.send({
        content: texto
    });

    return interaction.reply({
        content: "✅ Mensagem enviada com sucesso!",
        ephemeral: true
    });

}

    if (interaction.customId === "editor_embed_modal") {


        const titulo = interaction.fields.getTextInputValue("titulo");

        const descricao = interaction.fields.getTextInputValue("descricao");

        const cor = interaction.fields.getTextInputValue("cor") || "#FFD1DC";

        const imagem = interaction.fields.getTextInputValue("imagem");

cache.create(interaction.user.id);

const data = cache.get(interaction.user.id);

cache.update(interaction.user.id, {

    title: titulo,

    description: descricao,

    color: cor,

    image: imagem,

    editing: data?.editing || false

});


        const embed = new EmbedBuilder()

            .setColor(cor)

            .setTitle(titulo || null)

            .setDescription(descricao || "Sem descrição");

            if (imagem) {

    embed.setImage(imagem);

}
        const buttons = new ActionRowBuilder()
.addComponents(

    new ButtonBuilder()

        .setCustomId("embed_enviar")

        .setLabel("Enviar")

        .setEmoji("📤")

        .setStyle(ButtonStyle.Success),


    new ButtonBuilder()

        .setCustomId("embed_editar")

        .setLabel("Editar")

        .setEmoji("✏️")

        .setStyle(ButtonStyle.Primary),


    new ButtonBuilder()

        .setCustomId("embed_limpar")

        .setLabel("Limpar")

        .setEmoji("🗑️")

        .setStyle(ButtonStyle.Danger),


    new ButtonBuilder()

        .setCustomId("editor_cancelar")

        .setLabel("Cancelar")

        .setEmoji("❌")

        .setStyle(ButtonStyle.Secondary)

);


return interaction.reply({

    embeds: [embed],

    components: [buttons],

    ephemeral: true

});


    }


    if (interaction.customId !== "pix_form") return;



            const cliente = interaction.fields.getTextInputValue("cliente");

            const produto = interaction.fields.getTextInputValue("produto");

            const valor = interaction.fields.getTextInputValue("valor");



            const embed = new EmbedBuilder()

                .setColor("#FFD1DC")

                .setDescription(`

ㅤ𖦹ㅤㅤㅤㅤ𝐏𝐄𝐃𝐈𝐃𝐎 𝐑𝐄𝐆𝐈𝐒𝐓𝐑𝐀𝐃𝐎ㅤㅤㅤㅤ𖩦

ഴㅤ𑊑ㅤSeu pedido foi criado com sucesso! Obrigado por comprar conosco! 𐑺

Cliente : ${cliente} ;

Produto : ${produto}

Valor : R$ ${valor}

𑣲ㅤㅤStatus : Aguardando pagamento ⏳

ㅤㅤ━━━━━━━━━━━━━━━━

Realize o pagamento utilizando a chave PIX enviada acima.

Após o pagamento, envie o comprovante para confirmarmos seu pedido.

𖹭ㅤAgradecemos sua preferência e confiança em nossa loja!
ㅤㅤVolte sempre para a loja 𖹭
                `)

                .setImage(
                    "https://i.postimg.cc/xC14r0WS/IMG-2580.jpg"
                )

                .setFooter({
                    text: "Volte sempre para a loja 𖹭"
                });

                        await interaction.reply({

                content:

`💳 **Chave PIX**

\`517.105.968-30\``,

                embeds: [embed]

            });

        }

    });

};